import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPARE } from '../lib/compare.js'
import { compareDocs } from '../lib/docs.js'
import { PAGES, SITE } from '../lib/content.js'
import { toMarkdown } from '../lib/guides.js'
import { CAL } from '../app/design/_shared/data.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pages = [
  {
    slug: 'positioning-sprint-vs-messaging-workshop',
    h1: 'Positioning sprint vs a messaging workshop',
    bookSrc: 'compare-messaging-workshop',
    inbound: [
      'lib/compare.js',
      'lib/answers.js',
      'lib/answers-wave3.js',
    ],
  },
  {
    slug: 'positioning-sprint-vs-brand-sprint',
    h1: 'Positioning sprint vs a brand sprint',
    bookSrc: 'compare-brand-sprint',
    inbound: [
      'lib/compare.js',
      'lib/answers.js',
      'lib/answers-wave4.js',
    ],
  },
]

const flat = (page) => [page.h1, page.subhead, page.meta, page.close, ...page.sections.flatMap((s) => [s.h, s.body]), ...page.faq.flatMap((f) => [f.q, f.a])].join('\n')

test('buyer-intent comparisons are registered in the compare index, sitemap, and llms source', () => {
  const sitemap = readFileSync(join(root, 'lib/sitemap.js'), 'utf8')
  const llms = readFileSync(join(root, 'app/llms.txt/route.js'), 'utf8')
  const llmsFull = readFileSync(join(root, 'app/llms-full.txt/route.js'), 'utf8')
  const index = readFileSync(join(root, 'app/compare/page.js'), 'utf8')
  assert.match(sitemap, /PAGES\.filter\(\(p\) => p\.group === group\)/)
  assert.match(llms, /PAGES\.filter\(\(p\) => p\.guide\)/)
  assert.match(llmsFull, /toMarkdown\(p\.guide\)/)
  assert.match(index, /compareDocs\(\)/)
  for (const spec of pages) {
    const page = COMPARE.find((c) => c.slug === spec.slug)
    assert.ok(page, spec.slug)
    const doc = compareDocs().find((d) => d.route === `/compare/${spec.slug}`)
    assert.equal(doc.h1, spec.h1)
    assert.equal(doc.bookSrc, spec.bookSrc)
    assert.equal(doc.kind, 'compare')
    assert.ok(`${doc.h1} | Boundset`.length <= 65, `${doc.h1} | Boundset`)
    const listed = PAGES.find((p) => p.path === `/compare/${spec.slug}`)
    assert.equal(listed.group, 'content')
    assert.equal(listed.lastmod, '2026-11-06')
    assert.equal(listed.guide.route, `/compare/${spec.slug}`)
    assert.equal(`${SITE}${listed.path}`, `https://boundset.com/compare/${spec.slug}`)
    assert.match(toMarkdown(doc), new RegExp(`/compare/${spec.slug}`))
  }
  assert.equal(COMPARE.some((c) => c.slug === 'positioning-consultant-vs-brand-agency'), false)
})

test('buyer-intent meta stays within 155 characters and avoids dashes used as punctuation', () => {
  for (const spec of pages) {
    const page = COMPARE.find((c) => c.slug === spec.slug)
    const text = flat(page)
    assert.ok(page.meta.length >= 140 && page.meta.length <= 155, `${spec.slug} ${page.meta.length}`)
    assert.match(page.meta, /[A-Za-z][.!?]$/)
    assert.equal(text.includes('\u2014'), false, spec.slug)
    assert.equal(text.includes('\u2013'), false, spec.slug)
    assert.match(page.close, /15 minutes/)
  }
})

test('buyer-intent pages use Boundset prices only and name when Boundset is the wrong buy', () => {
  for (const spec of pages) {
    const text = flat(COMPARE.find((c) => c.slug === spec.slug))
    const amounts = text.match(/\$\d{1,3}(?:,\d{3})*/g)
    assert.deepEqual([...new Set(amounts)].sort(), ['$12,000', '$2,000', '$7,500'], spec.slug)
    assert.match(text, /credited in full toward the sprint if you start within 30 days/)
    assert.match(text, /When Boundset is the wrong buy/)
    assert.equal(text.includes('Fictional'), false, spec.slug)
    for (const name of ['OriginalVoices', 'Provable', 'Sirius', 'Salus', 'Acme']) assert.equal(text.includes(name), false, `${spec.slug} ${name}`)
  }
})

test('buyer-intent booking links use the cal.com positioning url and a Book call src', () => {
  const layout = readFileSync(join(root, 'components/guide/GuideLayout.js'), 'utf8')
  assert.match(layout, /withParams\(BOOK_CALL_URL, \{ src: p\.bookSrc \}\)/)
  assert.match(layout, /event="Book call"/)
  assert.match(layout, /props=\{\{ src: p\.bookSrc \}\}/)
  for (const spec of pages) {
    const doc = compareDocs().find((d) => d.route === `/compare/${spec.slug}`)
    const href = toMarkdown(doc).match(/\[Book a call\]\(([^)]+)\)/)[1]
    const url = new URL(href)
    assert.equal(`${url.origin}${url.pathname}`, CAL)
    assert.equal(url.searchParams.get('src'), spec.bookSrc)
  }
})

test('each new comparison is linked from two or three existing pages', () => {
  for (const spec of pages) {
    const hits = spec.inbound.filter((file) => readFileSync(join(root, file), 'utf8').includes(`/compare/${spec.slug}`))
    assert.ok(hits.length >= 2 && hits.length <= 3, `${spec.slug}: ${hits.join(', ')}`)
  }
})
