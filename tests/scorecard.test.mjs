import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { extract, corpus } from '../lib/teardown/extract.js'
import { FIXTURE_HTML } from '../lib/teardown/fixtures.js'
import { guardScore, scoreHomepage } from '../lib/teardown/scorecard.js'
import { BENCHMARK } from '../lib/benchmark2026.js'
import { COPY } from '../components/teardown/copy.js'
import { teardown } from '../lib/teardown/run.js'
import * as L from '../lib/teardown/limits.js'

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const text = corpus(extract(FIXTURE_HTML))

function card(overrides = {}) {
  const checks = [
    { id: 'category', pass: false, quote: 'Welcome to agentic revenue.', reason: 'The headline is a coined phrase and names no category a buyer would search for.' },
    { id: 'plain', pass: false, quote: 'The intelligent system that never sleeps.', reason: 'The line under the headline is a metaphor.' },
    { id: 'customer', pass: true, quote: 'For the people who own the number.', reason: 'The first screen names the people who own the number.' },
    { id: 'proof', pass: false, quote: 'Welcome to agentic revenue.', reason: 'The first screen has no customer name and no result.' },
    { id: 'outcome', pass: false, quote: 'Welcome to agentic revenue.', reason: 'The headline names no change a buyer could notice.' },
    { id: 'alternative', pass: false, quote: 'The intelligent system that never sleeps.', reason: 'The first screen names no tool and no old way.' },
  ].map((c) => ({ ...c, ...(overrides[c.id] || {}) }))
  return { checks }
}

test('guard keeps a grounded card and drops a quote or a number that is not on the page', () => {
  const ok = guardScore(card(), text)
  assert.equal(ok.checks.length, 6)
  assert.deepEqual(ok.checks.map((c) => c.id), BENCHMARK.checks.map((c) => c.id))
  assert.equal(ok.checks.filter((c) => c.pass).length, 1)
  assert.equal(ok.checks[0].quote, undefined)
  assert.equal(guardScore(card({ category: { quote: 'The number one platform for every team.' } }), text), null)
  assert.equal(guardScore(card({ proof: { reason: 'The page claims 10000 customers.' } }), text), null)
  const missing = card()
  missing.checks = missing.checks.filter((c) => c.id !== 'plain')
  assert.equal(guardScore(missing, text), null)
  const dashed = guardScore(card({ plain: { reason: 'The line is a metaphor \u2014 not the job.' } }), text)
  assert.equal(dashed.checks.find((c) => c.id === 'plain').reason.includes('\u2014'), false)
  assert.match(dashed.checks.find((c) => c.id === 'plain').reason, /metaphor/)
})

test('published totals are the only comparison, and the benchmark link is src free', () => {
  assert.equal(COPY.scoreCompare(BENCHMARK.checks.find((c) => c.id === 'category').n), '85 of the 100 homepages passed this check.')
  assert.equal(COPY.scoreOf(4), '4 of 6')
  const ui = read('components/teardown/Scorecard.js')
  assert.match(ui, /BENCHMARK/)
  assert.match(ui, /row\.def\.n/)
  assert.match(ui, /href="\/research\/homepage-positioning-benchmark-2026"/)
  assert.doesNotMatch(ui, /src=/)
  assert.doesNotMatch(ui, /\.csv/)
  const page = read('app/research/homepage-positioning-benchmark-2026/page.js')
  assert.match(page, /<a href="\/teardown">Score your homepage on the same 6 checks<\/a>/)
  assert.doesNotMatch(page, /\/teardown\?/)
  for (const path of ['lib/teardown/scorecard.js', 'components/teardown/Scorecard.js', 'components/teardown/copy.js']) {
    assert.doesNotMatch(read(path), /[—–]/, path)
  }
})

test('the booking button under the result carries src=scorecard', () => {
  for (const path of ['components/teardown/Tool.js', 'app/teardown/r/[id]/page.js']) {
    assert.match(read(path), /withParams\(book, \{ src: 'scorecard' \}\)/, path)
  }
})

test('mock scorecard stays off the page when ungrounded, and a teardown still finishes', async () => {
  const keys = ['TEARDOWN_MOCK', 'TEARDOWN_MOCK_DELAY', 'VERCEL_ENV', 'TEARDOWN_DISABLED', 'AI_GATEWAY_API_KEY', 'VERCEL_OIDC_TOKEN']
  const prev = Object.fromEntries(keys.map((k) => [k, process.env[k]]))
  try {
    for (const k of keys) delete process.env[k]
    const ex = extract(FIXTURE_HTML)
    assert.equal(await scoreHomepage({ url: 'https://example.com/', date: '2026-11-16', ex }), null)
    process.env.TEARDOWN_MOCK = '1'
    process.env.TEARDOWN_MOCK_DELAY = '0'
    const other = extract('<html><head><title>Other product</title></head><body><h1>A completely different headline for this page.</h1><p>' + 'alpha '.repeat(80) + '</p></body></html>')
    assert.equal(await scoreHomepage({ url: 'https://example.com/', date: '2026-11-16', ex: other }), null)
    const scored = await scoreHomepage({ url: 'https://example.com/', date: '2026-11-16', ex })
    assert.equal(scored.checks.length, 6)
    L._reset()
    const events = []
    await teardown({ url: 'https://example.com/', ip: '203.0.113.9', emit: (e) => events.push(e) })
    const doneAt = events.findIndex((e) => e.type === 'done')
    const scoreAt = events.findIndex((e) => e.type === 'scorecard')
    assert.ok(doneAt >= 0 && scoreAt > doneAt)
    assert.equal(events[scoreAt].checks.length, 6)
    const again = []
    await teardown({ url: 'https://example.com/', ip: '203.0.113.10', emit: (e) => again.push(e) })
    assert.equal(again.find((e) => e.type === 'done').cached, true)
    assert.equal(again.filter((e) => e.type === 'scorecard').length, 1)
  } finally {
    for (const k of keys) {
      if (prev[k] === undefined) delete process.env[k]
      else process.env[k] = prev[k]
    }
  }
})
