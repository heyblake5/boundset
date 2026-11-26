import test from 'node:test'
import assert from 'node:assert/strict'
import { answerDocs } from '../lib/docs.js'
import { guide, slugify, plain } from '../lib/guides.js'
import { PAGES, SITE } from '../lib/content.js'

const banned = /—|–|Copy\.ai|Copy AI|Thera|Riverside|MarketerHire|\$4M|\$4 million|OriginalVoices|Dobrin/i
const sentences = (t) => (plain(t).match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim()).filter(Boolean)

const pages = [
  ['answer', 'how-to-reposition-a-product', 'How to reposition a B2B SaaS product', 'How to reposition a B2B SaaS product'],
  ['answer', 'positioning-workshop-agenda', 'Positioning workshop for startup founders', 'Positioning workshop for startup founders'],
  ['guide', 'positioning-sprint-cost', 'How much does a positioning sprint cost', 'How much a positioning sprint costs'],
]

const answers = Object.fromEntries(answerDocs().map((d) => [d.route.split('/').pop(), d]))

function section(doc, h2) {
  const i = doc.body.findIndex((b) => b.type === 'h2' && b.text === h2)
  assert.ok(i >= 0, h2)
  const parts = []
  for (let j = i + 1; j < doc.body.length && doc.body[j].type !== 'h2'; j++) {
    const b = doc.body[j]
    if (b.text) parts.push(b.text)
    if (b.items) parts.push(...b.items.flat())
  }
  return { id: doc.body[i].id, first: doc.body[i + 1], text: parts.join('\n') }
}

test('slipped buyer questions have a direct section, FAQ, and tracked booking link', () => {
  for (const [kind, slug, h2, h1] of pages) {
    const doc = kind === 'guide' ? guide(slug) : answers[slug]
    assert.equal(doc.h1, h1, slug)
    const block = section(doc, h2)
    assert.equal(block.id, slugify(h2), slug)
    assert.equal(block.first?.type, 'p', slug)
    const n = sentences(block.first.text).length
    assert.ok(n >= 2 && n <= 4, `${slug} lead sentences ${n}`)
    assert.ok((doc.faq || []).some((f) => f.q === h2), slug)
    assert.match(block.text, new RegExp(`src=aeo-${slug}`), slug)
    assert.equal(banned.test(block.text), false, slug)
    assert.ok(doc.description.length <= 155 && /[.!?]$/.test(doc.description), `${slug} meta ${doc.description.length}`)
  }
})

test('sprint cost states published Boundset prices and a date, and no new competitor prices', () => {
  const doc = guide('positioning-sprint-cost')
  const block = section(doc, 'How much does a positioning sprint cost')
  assert.match(block.first.text, /As of November 12, 2026/)
  assert.match(block.first.text, /\$7,500/)
  assert.match(block.first.text, /\$12,000/)
  assert.match(doc.definition, /As of November 12, 2026/)
  assert.match(doc.definition, /\$7,500/)
  assert.doesNotMatch(block.text, /\$2,400|\$5,000|\$10,000|\$30,000|\$50,000|\$80,000/)
  assert.equal(doc.title, 'How Much Does a Positioning Sprint Cost')
  assert.ok(doc.title.length <= 60)
  const words = doc.definition.split(/\s+/).length
  assert.ok(words >= 40 && words <= 60, words)
})

test('homepage hub links the four homepage answers and ends on the teardown', () => {
  const hub = answers.homepage
  assert.equal(hub.h1, 'Fix my startup homepage')
  assert.equal(hub.route, '/answers/homepage')
  assert.equal(hub.noQuote, true)
  const linked = hub.body.map((b) => b.text || (b.items || []).flat().join('\n')).join('\n')
  for (const slug of [
    'how-to-fix-a-homepage-that-doesnt-convert',
    'website-doesnt-explain-what-we-do',
    'homepage-messaging-audit',
    'who-writes-homepage-copy-for-b2b-saas',
  ]) {
    assert.match(linked, new RegExp(`/answers/${slug}`), slug)
  }
  const last = [...hub.body].reverse().find((b) => b.type === 'h2')
  assert.equal(last.text, 'Next step')
  const end = section(hub, 'Next step')
  assert.match(end.text, /\/teardown\?src=aeo-homepage/)
  assert.match(linked, /src=aeo-homepage/)
  assert.equal(banned.test(linked), false)
  const page = PAGES.find((p) => p.path === '/answers/homepage')
  assert.ok(page)
  assert.equal(page.group, 'content')
  assert.equal(page.title, 'Fix my startup homepage')
})

test('homepage hub is in llms.txt the same way as other answer pages', () => {
  const page = PAGES.find((p) => p.path === '/answers/homepage')
  const sample = PAGES.find((p) => p.path === '/answers/how-to-fix-a-homepage-that-doesnt-convert')
  assert.equal(Boolean(page.guide), Boolean(sample.guide))
  assert.equal(page.group, sample.group)
  const line = `- [${page.title}](${SITE}${page.path}) ([markdown](${SITE}${page.path}.md)): ${page.answer}`
  assert.match(line, /https:\/\/boundset\.com\/answers\/homepage/)
  assert.match(line, /Fix my startup homepage/)
  assert.ok(line.includes(page.answer.slice(0, 40)))
})
