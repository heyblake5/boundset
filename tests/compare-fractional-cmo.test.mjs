import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPARE } from '../lib/compare.js'
import { compareDocs } from '../lib/docs.js'
import { PAGES } from '../lib/content.js'
import { toMarkdown } from '../lib/guides.js'
import { WAVE7 } from '../lib/answers-wave7.js'
import { CAL } from '../app/design/_shared/data.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const page = COMPARE.find((c) => c.slug === 'positioning-sprint-vs-fractional-cmo')
const text = [page.h1, page.subhead, page.meta, page.close, ...page.sections.flatMap((s) => [s.h, s.body]), ...page.faq.flatMap((f) => [f.q, f.a])].join('\n')

test('fractional CMO comparison is registered like the other compare pages', () => {
  assert.ok(page)
  const doc = compareDocs().find((d) => d.route === '/compare/positioning-sprint-vs-fractional-cmo')
  assert.equal(doc.h1, 'Positioning sprint vs a fractional CMO')
  assert.equal(doc.bookSrc, 'compare-fractional-cmo')
  assert.equal(`${doc.h1} | Boundset`.length <= 65, true)
  const listed = PAGES.find((p) => p.path === '/compare/positioning-sprint-vs-fractional-cmo')
  assert.equal(listed.group, 'content')
  assert.equal(listed.lastmod, '2026-11-06')
})

test('fractional CMO meta stays within 155 characters and avoids an em dash', () => {
  assert.ok(page.meta.length >= 140 && page.meta.length <= 155, String(page.meta.length))
  assert.match(page.meta, /[A-Za-z][.!?]$/)
  assert.equal(text.includes('\u2014'), false)
  assert.equal(text.includes('\u2013'), false)
})

test('fractional CMO page uses Boundset prices only and a labeled fictional example', () => {
  const amounts = text.match(/\$\d{1,3}(?:,\d{3})*/g)
  assert.deepEqual([...new Set(amounts)].sort(), ['$12,000', '$2,000', '$7,500'])
  assert.match(text, /Fictional\. Acme Draft is not a client\./)
  for (const name of ['OriginalVoices', 'Provable', 'Sirius', 'Salus']) assert.equal(text.includes(name), false, name)
})

test('fractional CMO booking link uses the existing cal.com url and src marker', () => {
  const doc = compareDocs().find((d) => d.route === '/compare/positioning-sprint-vs-fractional-cmo')
  const md = toMarkdown(doc)
  const href = md.match(/\[Book a call\]\(([^)]+)\)/)[1]
  const url = new URL(href)
  assert.equal(`${url.origin}${url.pathname}`, CAL)
  assert.equal(url.searchParams.get('src'), 'compare-fractional-cmo')
  const layout = readFileSync(join(root, 'components/guide/GuideLayout.js'), 'utf8')
  assert.match(layout, /withParams\(BOOK_CALL_URL, \{ src: p\.bookSrc \}\)/)
  assert.match(layout, /event="Book call"/)
  assert.match(layout, /props=\{\{ src: p\.bookSrc \}\}/)
  const peer = toMarkdown(compareDocs().find((d) => d.route === '/compare/positioning-sprint-vs-hiring-a-pmm'))
  assert.match(peer, /\[Book a call\]\(https:\/\/boundset.com\/#book\)/)
  assert.equal(peer.includes('compare-fractional-cmo'), false)
})

test('recent answer titles shipped after the free-features shorten stay within 65 characters', () => {
  for (const a of WAVE7) {
    const full = `${a.title} | Boundset`
    assert.ok(full.length <= 65, `${full.length}: ${full}`)
  }
})
