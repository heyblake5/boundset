import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PAGES } from '../lib/content.js'
import { OPTIONS, SOURCES, FAQ, OPENING, openingWords, DESCRIPTION, costLd } from '../lib/positioningCost.js'
import { OPENING as MSG, openingWords as msgWords, DESCRIPTION as MSG_DESC, DAYS, MATRIX_HEADERS, MATRIX_TSV, QUOTE, messageLd } from '../lib/messagingStrategy.js'
import { guides } from '../lib/guides.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const banned = /—|–|Copy\.ai|Copy AI|Riverside|MarketerHire|\$4M|\$4 million/i

test('positioning cost opening is 40 to 60 words and every price has a source', () => {
  assert.ok(openingWords >= 40 && openingWords <= 60, openingWords)
  assert.ok(DESCRIPTION.length <= 155 && DESCRIPTION.endsWith('.'))
  assert.equal(Object.keys(SOURCES).length >= 15, true)
  for (const o of OPTIONS) {
    assert.ok(o.low > 0 && o.high >= o.low)
    assert.ok(SOURCES[o.lowSource].url.startsWith('https://'))
    assert.ok(SOURCES[o.highSource].url.startsWith('https://'))
    for (const [, id] of o.prices) assert.ok(SOURCES[id].url)
  }
  assert.equal(FAQ.length >= 4, true)
  const ld = JSON.stringify(costLd())
  assert.match(ld, /FAQPage/)
  assert.match(ld, /3x Head of Marketing/)
  assert.doesNotMatch(OPENING + DESCRIPTION + JSON.stringify(FAQ) + JSON.stringify(OPTIONS), banned)
})

test('messaging strategy opening, timeline, and matrix', () => {
  assert.ok(msgWords >= 40 && msgWords <= 60, msgWords)
  assert.ok(MSG_DESC.length <= 155 && MSG_DESC.endsWith('.'))
  assert.equal(DAYS.length, 10)
  assert.ok(MATRIX_HEADERS.includes('Words we do not say'))
  assert.match(MATRIX_TSV, /One-liner/)
  assert.match(QUOTE, /early stage AI company/)
  assert.doesNotMatch(QUOTE, /Dobrin|OriginalVoices/)
  const ld = JSON.stringify(messageLd())
  assert.match(ld, /HowTo/)
  assert.match(ld, /3x Head of Marketing/)
  assert.doesNotMatch(MSG + QUOTE + JSON.stringify(DAYS), banned)
})

test('sitemap, teardown, and inbound links', () => {
  for (const path of ['/positioning-cost', '/messaging-strategy', '/teardown']) {
    assert.equal(PAGES.some((p) => p.path === path), true, path)
  }
  const cost = guides().find((g) => g.slug === 'positioning-sprint-cost')
  const flat = JSON.stringify(cost.body)
  assert.match(flat, /\/positioning-cost/)
  assert.match(readFileSync(join(root, 'app/sprint/page.js'), 'utf8'), /\/messaging-strategy/)
  assert.match(readFileSync(join(root, 'app/llms.txt/route.js'), 'utf8'), /p\.md/)
})
