import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPARE } from '../lib/compare.js'
import { compareDocs } from '../lib/docs.js'
import { guide, toMarkdown } from '../lib/guides.js'
import { PAGES } from '../lib/content.js'
import { CAL } from '../app/design/_shared/data.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dash = /[\u2014\u2013]/
const names = ['OriginalVoices', 'David Dobrin', 'Provable', 'Sirius', 'Salus', 'Copy AI', 'CopyAI']
const boundsetPrices = ['$2,000', '$7,500', '$12,000']

const compareSpecs = [
  {
    slug: 'positioning-consultant-vs-agency',
    h1: 'Positioning consultant vs agency',
    bookSrc: 'compare-consultant-agency',
    close: 'Talk it through in 15 minutes',
    links: [
      ['/answers/how-to-hire-a-positioning-consultant', 'How to hire a positioning consultant'],
      ['/answers/brand-agency-vs-positioning-consultant', 'Brand agency vs positioning consultant'],
      ['/compare/diy-positioning-vs-consultant', 'DIY positioning vs hiring a consultant'],
      ['/teardown', 'homepage teardown'],
    ],
  },
  {
    slug: 'positioning-vs-website-redesign',
    h1: 'Positioning vs a website redesign',
    bookSrc: 'compare-website-redesign',
    close: 'Talk through the order in 15 minutes',
    links: [
      ['/answers/signs-your-positioning-is-wrong', 'signs your positioning is wrong'],
      ['/answers/positioning-vs-branding', 'Positioning vs branding'],
      ['/compare/positioning-sprint-vs-brand-sprint', 'Positioning sprint vs a brand sprint'],
      ['/teardown', 'homepage teardown'],
    ],
  },
]

function flat(page) {
  return [page.h1, page.subhead, page.meta, page.close, ...page.sections.flatMap((s) => [s.h, s.lead, s.body, s.after, ...(s.bullets || [])]), ...page.faq.flatMap((f) => [f.q, f.a])].filter(Boolean).join('\n')
}

test('buyer pages stay registered, keep their H1s, and book with a page src', () => {
  const april = guide('april-dunford-alternatives')
  assert.equal(april.h1, 'April Dunford alternatives for startups')
  assert.equal(april.title, 'April Dunford alternatives for startups')
  assert.ok(april.title.length <= 60)
  assert.ok(april.description.length <= 160, april.description.length)
  assert.equal(april.bookSrc, 'april-dunford-alternatives')
  const listed = PAGES.find((p) => p.path === '/april-dunford-alternatives')
  assert.equal(listed.group, 'content')
  assert.equal(listed.guide.route, '/april-dunford-alternatives')
  const href = toMarkdown(april).match(/\[Book a 15 minute call\]\(([^)]+)\)/)[1]
  const url = new URL(href)
  assert.equal(`${url.origin}${url.pathname}`, CAL)
  assert.equal(url.searchParams.get('src'), 'april-dunford-alternatives')
  assert.match(readFileSync(join(root, 'components/guide/GuideLayout.js'), 'utf8'), /FAQPage/)
  assert.equal(april.faq.some((f) => f.q === 'How to decide'), false)
  assert.ok(april.body.some((b) => b.type === 'h2' && b.text === 'How to decide'))

  for (const spec of compareSpecs) {
    const page = COMPARE.find((c) => c.slug === spec.slug)
    const doc = compareDocs().find((d) => d.route === `/compare/${spec.slug}`)
    const row = PAGES.find((p) => p.path === `/compare/${spec.slug}`)
    assert.equal(page.h1, spec.h1)
    assert.equal(doc.h1, spec.h1)
    assert.ok(`${doc.h1} | Boundset`.length <= 60)
    assert.ok(page.meta.length >= 140 && page.meta.length <= 160, `${spec.slug} ${page.meta.length}`)
    assert.equal(doc.bookSrc, spec.bookSrc)
    assert.equal(doc.noQuote, true)
    assert.equal(page.close, spec.close)
    assert.match(page.close, /15 minutes/)
    assert.equal(row.group, 'content')
    assert.equal(row.guide.route, `/compare/${spec.slug}`)
    const book = new URL(toMarkdown(doc).match(/\[Book a call\]\(([^)]+)\)/)[1])
    assert.equal(`${book.origin}${book.pathname}`, CAL)
    assert.equal(book.searchParams.get('src'), spec.bookSrc)
    assert.ok(page.faq.length >= 4 && page.faq.length <= 6, `${spec.slug} faq ${page.faq.length}`)
    assert.equal(new Set(page.faq.map((f) => f.q)).size, page.faq.length)
    assert.ok(page.sections.some((s) => s.h === 'How to decide'))
  }
})

test('new buyer copy links the teardown and related pages, and follows the copy rules', () => {
  const april = guide('april-dunford-alternatives')
  const start = april.body.findIndex((b) => b.type === 'h2' && b.text === 'How to decide')
  const added = april.body.slice(start).flatMap((b) => b.type === 'ul' ? b.items : b.type === 'p' || b.type === 'h2' ? [b.text] : [])
  const addedFaq = april.faq.slice(-5).flatMap((f) => [f.q, f.a])
  const aprilText = [...added, ...addedFaq].join('\n')
  assert.equal(dash.test(aprilText), false)
  assert.match(aprilText, /homepage teardown/)
  assert.match(aprilText, /15 minute call/)
  assert.equal(aprilText.includes('$'), false)
  for (const name of names) assert.equal(aprilText.includes(name), false, name)
  assert.equal(new Set(april.faq.map((f) => f.q)).size, april.faq.length)
  assert.equal(april.faq.length, 15)
  for (const path of [
    '/compare/positioning-sprint-vs-positioning-workshop',
    '/answers/how-to-hire-a-positioning-consultant',
    '/answers/who-can-help-a-startup-with-positioning',
    '/compare/diy-positioning-vs-consultant',
    '/teardown',
  ]) {
    assert.match(aprilText, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    if (path !== '/teardown') assert.ok(PAGES.some((p) => p.path === path), path)
  }

  for (const spec of compareSpecs) {
    const page = COMPARE.find((c) => c.slug === spec.slug)
    const section = page.sections.find((s) => s.h === 'How to decide')
    const text = [section.lead, section.body, section.after, ...(section.bullets || []), ...page.faq.map((f) => `${f.q} ${f.a}`)].join('\n')
    assert.equal(dash.test(text), false, spec.slug)
    assert.match(text, /\/teardown/)
    assert.match(text, /15 minute/)
    for (const name of names) assert.equal(text.includes(name), false, `${spec.slug} ${name}`)
    const amounts = text.match(/\$\d{1,3}(?:,\d{3})*/g) || []
    for (const amount of amounts) assert.ok(boundsetPrices.includes(amount), `${spec.slug} ${amount}`)
    for (const [path, anchor] of spec.links) {
      assert.match(text, new RegExp(anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      assert.match(text, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      if (path !== '/teardown') assert.ok(PAGES.some((p) => p.path === path), path)
    }
  }

  const redesign = compareDocs().find((d) => d.route === '/compare/positioning-vs-website-redesign')
  assert.ok(redesign.body.some((b) => b.type === 'redesign-check'))
  assert.match(flat(COMPARE.find((c) => c.slug === 'positioning-vs-website-redesign')), /Acme Shift is fictional/)
  assert.match(flat(COMPARE.find((c) => c.slug === 'positioning-vs-website-redesign')), /It is not a client/)
})
