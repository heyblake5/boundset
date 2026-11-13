import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { BENCHMARK } from '../lib/benchmark2026.js'

const page = fs.readFileSync(new URL('../app/research/homepage-positioning-benchmark-2026/page.js', import.meta.url), 'utf8')
const pub = fs.readFileSync(new URL('../public/research/homepage-positioning-benchmark-2026.csv', import.meta.url), 'utf8')

test('opening is 40 to 60 words and the page uses it', () => {
  const words = BENCHMARK.opening.match(/[A-Za-z0-9]+(?:'[A-Za-z]+)?/g)
  assert.ok(words.length >= 40 && words.length <= 60, words.length)
  assert.match(page, /B\.opening/)
  assert.match(BENCHMARK.opening, /85 of 100/)
  assert.match(BENCHMARK.opening, /21 name the alternative/)
  assert.match(BENCHMARK.opening, /34 show proof/)
})

test('public file has scores only, and the totals match', () => {
  const lines = pub.trim().split('\n').map((l) => l.replace(/\r$/, ''))
  assert.equal(lines.length, 101)
  assert.equal(lines[0], 'row,stage,category,customer,alternative,outcome,proof,plain')
  assert.doesNotMatch(pub, /https?:/)
  const rows = lines.slice(1).map((l) => l.split(','))
  const col = (i) => rows.filter((r) => r[i] === 'Y').length
  const byId = Object.fromEntries(BENCHMARK.checks.map((c) => [c.id, c.n]))
  assert.equal(col(2), byId.category)
  assert.equal(col(3), byId.customer)
  assert.equal(col(4), byId.alternative)
  assert.equal(col(5), byId.outcome)
  assert.equal(col(6), byId.proof)
  assert.equal(col(7), byId.plain)
  assert.equal(BENCHMARK.n, 100)
  assert.equal(BENCHMARK.seed + BENCHMARK.seriesA, 100)
  assert.equal(byId.plain, 81)
  assert.equal(byId.customer, 49)
})

test('the public csv has no names or urls, and the check date is November 12', () => {
  assert.equal(BENCHMARK.checked, '2026-11-12')
  assert.match(page, /Nov 12, 2026/)
  assert.doesNotMatch(page, /Nov 13/)
  assert.doesNotMatch(pub, /https?:/)
  assert.doesNotMatch(page + pub, /data-private/)
})

test('new copy has no em dash, names the AI reviewer, and does not name old employers', () => {
  assert.doesNotMatch(page, /[—–]/)
  assert.doesNotMatch(page, /Copy\.ai|Riverside|MarketerHire/)
  assert.match(page, /3x Head of Marketing/)
  assert.match(page, /an AI model/)
  assert.match(page, /human spot-check of 10 rows/)
  assert.match(page, /literal words/)
  assert.doesNotMatch(page, /loosest check/)
  assert.match(page, /Dataset/)
})
