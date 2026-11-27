import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { answerDocs } from '../lib/docs.js'
import { slugify, plain, toMarkdown } from '../lib/guides.js'
import { PAGES, SITE } from '../lib/content.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const slug = 'fix-positioning-before-q1-planning'
const h1 = 'Should I fix my startup\u2019s positioning before Q1 planning'
const banned = /—|–|Copy\.ai|Copy AI|Thera|Riverside|MarketerHire|\$4M|\$4 million|OriginalVoices|Dobrin/i
const contrast = /\bnot\b[^.?!]{0,80}\bbut\b|\brather than\b/i
const sentences = (t) => (plain(t).match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim()).filter(Boolean)

const doc = answerDocs().find((d) => d.route === `/answers/${slug}`)

function section(h2) {
  const i = doc.body.findIndex((b) => b.type === 'h2' && b.text === h2)
  assert.ok(i >= 0, h2)
  const parts = []
  for (let j = i + 1; j < doc.body.length && doc.body[j].type !== 'h2'; j++) {
    const b = doc.body[j]
    if (b.text) parts.push(b.text)
    if (b.items) parts.push(...b.items.flat())
    if (b.rows) parts.push(...b.rows.flat())
  }
  return { id: doc.body[i].id, first: doc.body[i + 1], text: parts.join('\n') }
}

test('Q1 planning answer opens with the direct answer and a tracked booking link', () => {
  assert.ok(doc)
  assert.equal(doc.h1, h1)
  assert.equal(doc.route, `/answers/${slug}`)
  assert.equal(doc.noQuote, true)
  const words = doc.definition.split(/\s+/).length
  assert.ok(words >= 40 && words <= 60, words)
  const opening = sentences(doc.definition)
  assert.ok(opening.length >= 2 && opening.length <= 3, opening.length)
  assert.match(doc.definition, /^Q1 plans, hires, pricing, and campaigns all inherit/)
  const block = section(h1)
  assert.equal(block.id, slugify(h1))
  assert.equal(block.first?.type, 'p')
  const n = sentences(block.first.text).length
  assert.ok(n >= 2 && n <= 4, n)
  assert.equal(block.first.text, doc.definition)
  assert.ok((doc.faq || []).some((f) => f.q === h1 && f.a === doc.definition))
  assert.match(block.text, /https:\/\/cal\.com\/heyblake\/positioning\?src=aeo-q1/)
  assert.match(block.text, /\/sprint/)
  assert.match(block.text, /\/teardown/)
  assert.match(block.text, /\$7,500/)
  assert.match(block.text, /\$12,000/)
  assert.match(block.text, /3x Head of Marketing/)
  assert.equal(banned.test(block.text), false)
  assert.equal(contrast.test(block.text), false)
  assert.ok(doc.description.length <= 155 && /[.!?]$/.test(doc.description), `${doc.description.length}: ${doc.description}`)
  assert.ok(doc.body.some((b) => b.type === 'h2' && b.text === 'Questions this page answers'))
})

test('Q1 planning page has the December timeline, the signs, and what to bring', () => {
  const signs = section('Signs you should fix it first')
  assert.match(signs.text, /Hiring a first marketer in Q1/)
  assert.match(signs.text, /homepage explains features/i)
  assert.match(signs.text, /Sales calls re-explain the product/)
  assert.match(signs.text, /Win and loss reasons stay vague/)
  assert.match(signs.text, /\/answers\/homepage/)
  const weeks = section('A simple December timeline')
  assert.match(weeks.text, /Week 1/)
  assert.match(weeks.text, /Buyer and alternative interviews/)
  assert.match(weeks.text, /Week 2/)
  assert.match(weeks.text, /positioning decision/)
  assert.match(weeks.text, /Week 3/)
  assert.match(weeks.text, /homepage and the sales deck/)
  assert.match(weeks.text, /\/compare\/positioning-sprint-vs-hiring-a-pmm/)
  const bring = section('What to bring')
  assert.match(bring.text, /won deals and lost deals/)
  assert.match(bring.text, /homepage URL/)
  assert.match(bring.text, /sales deck/)
  assert.match(bring.text, /Q1 draft/)
  const flat = [doc.definition, ...doc.body.map((b) => b.text || ''), ...(doc.faq || []).map((f) => `${f.q} ${f.a}`)].join('\n')
  assert.equal(banned.test(flat), false)
  assert.equal(contrast.test(flat), false)
  const money = flat.match(/\$[\d,]+/g) || []
  assert.deepEqual([...new Set(money)].sort(), ['$12,000', '$7,500'])
})

test('Q1 planning answer is on the index, sitemap, and llms.txt like sibling answers', () => {
  const page = PAGES.find((p) => p.path === `/answers/${slug}`)
  const sample = PAGES.find((p) => p.path === '/answers/homepage')
  assert.ok(page)
  assert.equal(page.group, 'content')
  assert.equal(page.title, h1)
  assert.equal(page.lastmod, '2026-11-27')
  assert.equal(Boolean(page.guide), Boolean(sample.guide))
  assert.equal(page.group, sample.group)
  const line = `- [${page.title}](${SITE}${page.path}) ([markdown](${SITE}${page.path}.md)): ${page.answer}`
  assert.match(line, new RegExp(`https://boundset\\.com/answers/${slug}`))
  assert.ok(line.includes(page.answer.slice(0, 40)))
  for (const path of ['/sprint', '/teardown', '/compare/positioning-sprint-vs-hiring-a-pmm', '/answers/homepage']) {
    assert.ok(doc.related.some((r) => r.path === path), path)
    assert.equal(PAGES.some((p) => p.path === path), true, path)
  }
  const md = toMarkdown(doc)
  assert.match(md, new RegExp(`^# ${h1}`, 'm'))
  assert.match(md, /src=aeo-q1/)
  assert.match(md, /## FAQ/)
  assert.match(readFileSync(join(root, 'app/answers/[slug]/page.js'), 'utf8'), /pageLd\(d\.raw\)/)
  assert.equal(doc.raw.path, `/answers/${slug}`)
  assert.equal(doc.raw.title, h1)
  assert.ok(doc.raw.faq.length >= 4)
  assert.equal(doc.kind, 'answer')
})
