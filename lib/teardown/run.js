// The teardown pipeline, shared by the API route and tests. Emits NDJSON-style events via `emit`.
import crypto from 'node:crypto'
import { safeFetch, checkUrl, robotsDisallowsRoot, FetchBlocked } from './ssrf.js'
import { extract, corpus, norm } from './extract.js'
import { guard, SECTIONS } from './schema.js'
import { runModel, isMock, modelStatus, modelId } from './model.js'
import { FIXTURE_HTML } from './fixtures.js'
import * as L from './limits.js'
const ALPHA = '23456789abcdefghijkmnpqrstuvwxyz'
const nanoid = () => Array.from(crypto.randomBytes(10), (b) => ALPHA[b % 32]).join('')

export function normalize(input) {
  let s = String(input || '').trim(); if (!s) throw new FetchBlocked('blocked')
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = 'https://' + s
  const { u } = checkUrl(s); u.hostname = u.hostname.toLowerCase(); u.hash = ''
  return u.toString()
}

async function fetchPage(url, resolve) {
  if (isMock() && process.env.TEARDOWN_MOCK_FETCH !== 'live') return { body: FIXTURE_HTML, url, host: new URL(url).hostname }
  const res = await safeFetch(url, { resolve })
  const isRoot = new URL(res.url).pathname === '/'
  if (isRoot) {
    let robots = ''
    try { robots = (await safeFetch(new URL('/robots.txt', res.url).toString(), { resolve, html: false, accept: 'text/plain', maxBytes: 256 * 1024 })).body } catch { /* no robots.txt: allowed */ }
    if (robotsDisallowsRoot(robots)) throw new FetchBlocked('blocked')
  }
  return res
}

// Sections streamed before the full guard runs still never show an unverified quote.
const early = (key, v, text) => {
  if (!v || typeof v !== 'object') return null
  const real = (q) => q == null || text.includes(norm(q))
  if (key === 'strongest_claim') return real(v.quote) ? v : null
  if ('quote' in v && !real(v.quote)) return { ...v, quote: null }
  return v
}

export async function teardown({ url: input, ip, emit, resolve }) {
  if (!modelStatus().available) return emit({ type: 'error', reason: 'unavailable' })
  let url
  try { url = normalize(input) } catch { return emit({ type: 'error', reason: 'blocked' }) }
  const host = new URL(url).hostname.replace(/^www\./, '')
  const hit = L.cached(host)
  if (hit) { const r = L.load(hit); if (r) { emit({ type: 'page', title: r.page.title, h1: r.page.h1, headlines: r.page.headlines, text: r.page.text, host }); for (const k of SECTIONS) emit({ type: 'section', key: k, value: r.result[k] }); return emit({ type: 'done', id: r.id, cached: true, host }) } }
  const why = L.admit(ip); if (why) return emit({ type: 'error', reason: why })
  let page
  try { page = await fetchPage(url, resolve) } catch { return emit({ type: 'error', reason: 'blocked' }) }
  const ex = extract(page.body)
  if (ex.visibleChars < 300) return emit({ type: 'error', reason: 'thin' })
  L.charge(ip)
  emit({ type: 'page', title: ex.title, h1: ex.h1, headlines: ex.headlines, text: ex.text, host })
  const text = corpus(ex), date = new Date().toISOString().slice(0, 10)
  let final = null
  for (let attempt = 0; attempt < 2 && !final; attempt++) {
    try {
      const gen = runModel({ url, date, ex, extraNote: attempt ? 'Your previous answer quoted text that is not on the page. Every quote must be an exact substring of <homepage>.' : '' })
      let step, raw
      while (!(step = await gen.next()).done) { const { key, value } = step.value; if (attempt === 0 && key !== 'gaps' && key !== 'rewrite') { const v = early(key, value, text); if (v) emit({ type: 'section', key, value: v }) } }
      raw = step.value
      const g = guard(raw, text)
      if (g.ok || (attempt === 1 && g.result && g.result.gaps.length)) final = g.result
    } catch (err) {
      console.error('teardown model', modelId(), err?.name || err?.constructor?.name, err?.message)
    }
  }
  if (!final) return emit({ type: 'error', reason: 'model' })
  // re-emit sections the guard may have changed, then the rest
  for (const k of SECTIONS) emit({ type: 'section', key: k, value: final[k] })
  const id = nanoid()
  L.save({ id, host, url, extract_hash: crypto.createHash('sha256').update(ex.text).digest('hex'), result: final, page: { title: ex.title, h1: ex.h1, headlines: ex.headlines, text: ex.text } })
  emit({ type: 'done', id, cached: false, host })
}
