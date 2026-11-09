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
import { WORKSHOP_COPY, SPRINT_OPENING } from '../lib/sprintCopy.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const slug = 'positioning-sprint-vs-saas-copywriter'
const route = `/compare/${slug}`
const page = COMPARE.find((c) => c.slug === slug)
const flat = [
  page.h1, page.subhead, page.meta, page.close,
  ...page.sections.flatMap((s) => [s.h, s.lead, s.body, s.after, s.copy, ...(s.bullets || []), ...(s.table ? [...s.table.head, ...s.table.rows.flat()] : [])]),
  ...page.faq.flatMap((f) => [f.q, f.a]),
].filter(Boolean).join('\n')

const ANSWER = 'Hire a copywriter when you already know who you are for, what you replace, and why you win. Hire a positioning sprint when you do not, or when your team explains the product three ways. A sprint settles the decision and ships the homepage words. A copywriter makes settled words sharper.'

test('copywriter comparison is registered in PAGES, sitemap source, and llms source', () => {
  const doc = compareDocs().find((d) => d.route === route)
  assert.equal(doc.h1, 'Positioning sprint vs SaaS copywriter')
  assert.equal(doc.bookSrc, 'compare-copywriter')
  assert.equal(doc.noQuote, true)
  assert.equal(doc.kind, 'compare')
  const title = `${doc.h1} | Boundset`
  assert.ok(title.length <= 60, `${title.length}: ${title}`)
  const listed = PAGES.find((p) => p.path === route)
  assert.equal(listed.group, 'content')
  assert.equal(listed.lastmod, '2026-11-09')
  assert.equal(listed.guide.route, route)
  assert.equal(`${SITE}${listed.path}`, `https://boundset.com${route}`)
  const sitemap = readFileSync(join(root, 'lib/sitemap.js'), 'utf8')
  const llms = readFileSync(join(root, 'app/llms.txt/route.js'), 'utf8')
  assert.match(sitemap, /PAGES\.filter\(\(p\) => p\.group === group\)/)
  assert.match(llms, /PAGES\.filter\(\(p\) => p\.guide\)/)
  assert.match(toMarkdown(doc), new RegExp(route))
  assert.match(readFileSync(join(root, 'app/compare/[slug]/page.js'), 'utf8'), /canonical: d\.route/)
  assert.match(readFileSync(join(root, 'app/compare/page.js'), 'utf8'), /compareDocs\(\)/)
  assert.ok(compareDocs().some((d) => d.route === route))
})

test('direct answer, meta, and FAQ stay inside the length limits', () => {
  assert.equal(page.subhead, ANSWER)
  assert.ok(page.subhead.split(/\s+/).length <= 60)
  assert.ok(page.meta.length >= 140 && page.meta.length <= 155, String(page.meta.length))
  assert.match(page.meta, /[A-Za-z][.!?]$/)
  assert.equal(flat.includes('\u2014'), false)
  assert.equal(flat.includes('\u2013'), false)
  assert.equal(page.faq.length, 4)
  assert.match(page.close, /15 minutes/)
  const doc = compareDocs().find((d) => d.route === route)
  assert.ok(doc.body.some((b) => b.type === 'h2' && b.text === 'FAQs') === false)
  assert.deepEqual(page.faq.map((f) => f.q), [
    'Can a copywriter do positioning?',
    'Do I need both?',
    'How long does a sprint take?',
    'What if I already have a brief?',
  ])
})

test('copywriter page uses live sprint prices, a labeled fictional example, and no client proof', () => {
  const amounts = flat.match(/\$\d{1,3}(?:,\d{3})*/g)
  assert.deepEqual([...new Set(amounts)].sort(), ['$12,000', '$2,000', '$7,500'])
  assert.match(flat, /credited in full toward the sprint if you start within 30 days/)
  assert.match(flat, /rates vary widely/)
  assert.match(SPRINT_OPENING, /\$7,500/)
  assert.match(SPRINT_OPENING, /\$12,000/)
  assert.match(WORKSHOP_COPY, /\$2,000/)
  assert.match(WORKSHOP_COPY, /credited in full toward the sprint if you start within 30 days/)
  assert.match(flat, /Fictional\. Acme Parcel is not a client\./)
  for (const name of ['OriginalVoices', 'Provable', 'Sirius', 'Salus', 'Acme Draft']) assert.equal(flat.includes(name), false, name)
  assert.match(readFileSync(join(root, 'components/guide/GuideLayout.js'), 'utf8'), /!p\.noQuote/)
})

test('the handoff brief is copyable, blank, and points at the homepage teardown', () => {
  const section = page.sections.find((s) => s.copy)
  assert.equal(section.h, 'A brief to hand a copywriter')
  for (const line of ['Who it is for:', 'What they use today instead:', 'The one reason they switch:', 'Proof you can show:', 'Words customers use:', 'Words to avoid:']) {
    assert.ok(section.copy.includes(line), line)
  }
  assert.equal(/Acme|apparel|\$|example/i.test(section.copy), false)
  assert.match(section.after, /\/teardown/)
  const doc = compareDocs().find((d) => d.route === route)
  const code = doc.body.find((b) => b.type === 'code')
  const action = doc.body.find((b) => b.type === 'actions')
  assert.equal(code.text, section.copy)
  assert.equal(action.copy, section.copy)
  assert.equal(action.label, 'Copy')
  const md = toMarkdown(doc)
  assert.match(md, /Who it is for:/)
  assert.match(md, /\/teardown/)
  assert.match(md, /\/sprint/)
  assert.match(md, /\/free-tools\/headline-tester/)
})

test('booking link uses the cal.com positioning url and compare-copywriter src', () => {
  const doc = compareDocs().find((d) => d.route === route)
  const href = toMarkdown(doc).match(/\[Book a call\]\(([^)]+)\)/)[1]
  const url = new URL(href)
  assert.equal(`${url.origin}${url.pathname}`, CAL)
  assert.equal(CAL, 'https://cal.com/heyblake/positioning')
  assert.equal(url.searchParams.get('src'), 'compare-copywriter')
  const layout = readFileSync(join(root, 'components/guide/GuideLayout.js'), 'utf8')
  assert.match(layout, /withParams\(BOOK_CALL_URL, \{ src: p\.bookSrc \}\)/)
  assert.match(layout, /event="Book call"/)
  assert.match(layout, /props=\{\{ src: p\.bookSrc \}\}/)
})

test('inbound links exist on the four listed pages', () => {
  const who = readFileSync(join(root, 'lib/answers-wave7.js'), 'utf8')
  const fix = readFileSync(join(root, 'lib/answers-wave4.js'), 'utf8')
  const compare = readFileSync(join(root, 'lib/compare.js'), 'utf8')
  const hub = readFileSync(join(root, 'app/compare/page.js'), 'utf8')
  assert.match(who, /slug: 'who-writes-homepage-copy-for-b2b-saas'[\s\S]*\/compare\/positioning-sprint-vs-saas-copywriter/)
  assert.match(fix, /slug: 'how-to-fix-a-homepage-that-doesnt-convert'[\s\S]*\/compare\/positioning-sprint-vs-saas-copywriter/)
  assert.match(compare, /slug: 'positioning-sprint-vs-messaging-agency'[\s\S]*?\/compare\/positioning-sprint-vs-saas-copywriter/)
  assert.match(hub, /compareDocs\(\)/)
  assert.equal(PAGES.some((p) => p.path === '/compare'), true)
  assert.equal(PAGES.some((p) => p.path === '/answers/who-writes-homepage-copy-for-b2b-saas'), true)
  assert.equal(PAGES.some((p) => p.path === '/answers/how-to-fix-a-homepage-that-doesnt-convert'), true)
  assert.equal(PAGES.some((p) => p.path === '/compare/positioning-sprint-vs-messaging-agency'), true)
  assert.equal(readFileSync(join(root, 'app/teardown/page.js'), 'utf8').includes('export default'), true)
})
