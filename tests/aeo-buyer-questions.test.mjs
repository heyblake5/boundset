import test from 'node:test'
import assert from 'node:assert/strict'
import { answerDocs, compareDocs } from '../lib/docs.js'
import { guide, slugify, plain } from '../lib/guides.js'

const banned = /—|–|Copy\.ai|Copy AI|Riverside|MarketerHire|\$4M|\$4 million|OriginalVoices|Dobrin/i
const sentences = (t) => (plain(t).match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim()).filter(Boolean)

const pages = [
  ['answer', 'who-can-help-a-startup-with-positioning', 'Who can help my startup with positioning', false],
  ['answer', 'how-to-hire-a-positioning-consultant', 'Best positioning consultant for B2B SaaS startups', false],
  ['answer', 'how-to-fix-a-homepage-that-doesnt-convert', 'How to fix a startup homepage that doesn’t convert', true],
  ['answer', 'who-writes-homepage-copy-for-b2b-saas', 'Who writes homepage copy for B2B SaaS startups', true],
  ['answer', 'what-is-a-messaging-framework', 'Messaging framework consultant for startups', false],
  ['answer', 'how-long-does-positioning-take', 'How long does a positioning project take', false],
  ['compare', 'fractional-pmm-vs-positioning-consultant', 'Best product marketing consultants for early stage startups', false],
  ['guide', 'positioning-vs-messaging', 'Positioning vs messaging difference', true],
  ['answer', 'website-doesnt-explain-what-we-do', 'Our website doesn’t explain what we do. Where does a startup get help?', true],
  ['answer', 'fractional-product-marketing-cost', 'What does fractional product marketing cost for a seed startup', false],
  ['answer', 'what-is-category-design', 'Who helps startups with category design', false],
  ['guide', 'positioning-canvas', 'Positioning canvas for startups', true],
  ['answer', 'brand-agency-vs-positioning-consultant', 'Should a seed startup hire a brand agency or a positioning consultant', false],
  ['answer', 'homepage-messaging-audit', 'Homepage messaging audit for SaaS', true],
]

const byKind = {
  answer: Object.fromEntries(answerDocs().map((d) => [d.route.split('/').pop(), d])),
  compare: Object.fromEntries(compareDocs().map((d) => [d.route.split('/').pop(), d])),
}

function section(doc, h2) {
  const i = doc.body.findIndex((b) => b.type === 'h2' && b.text === h2)
  assert.ok(i >= 0, h2)
  const parts = []
  for (let j = i + 1; j < doc.body.length && doc.body[j].type !== 'h2'; j++) {
    const b = doc.body[j]
    if (b.text) parts.push(b.text)
    if (b.items) parts.push(...b.items)
  }
  return { id: doc.body[i].id, first: doc.body[i + 1], text: parts.join('\n') }
}

test('each uncited buyer question has a direct section, FAQ, and tracked booking link', () => {
  assert.equal(pages.length, 14)
  for (const [kind, slug, h2, teardown] of pages) {
    const doc = kind === 'guide' ? guide(slug) : byKind[kind][slug]
    assert.ok(doc, slug)
    const block = section(doc, h2)
    assert.equal(block.id, slugify(h2), slug)
    assert.equal(block.first?.type, 'p', slug)
    const n = sentences(block.first.text).length
    assert.ok(n >= 2 && n <= 4, `${slug} lead sentences ${n}`)
    assert.ok((doc.faq || []).some((f) => f.q === h2), slug)
    assert.match(block.text, /src=aeo-[a-z0-9-]+/, slug)
    assert.match(block.text, new RegExp(`src=aeo-${slug}`), slug)
    if (teardown) assert.match(block.text, /\/teardown/, slug)
    assert.equal(banned.test(block.text), false, slug)
    assert.ok(doc.body.some((b) => b.type === 'h2' && b.text === 'Questions this page answers'), slug)
  }
})
