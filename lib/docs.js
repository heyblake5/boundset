// Adapters: Bond's wave-2 answers, comparison pages and the messaging document template -> the shared
// DocPage shape used by guides (C2 layout, .md routes, llms files, sitemap). Copy is passed through verbatim.
import { ANSWERS as A1 } from './answers.js'
import { WAVE3 } from './answers-wave3.js'
import { WAVE4 } from './answers-wave4.js'
import { WAVE5 } from './answers-wave5.js'
import { WAVE6 } from './answers-wave6.js'
import { COMPARE } from './compare.js'
import { SRC, UPDATED, pageDescription } from './sources.js'
import { slugify } from './guides.js'

const ANSWERS = [...A1, ...WAVE3, ...WAVE4, ...WAVE5, ...WAVE6]

// Links to hidden/dead routes are dropped; the old /tools URL points at its /free-tools home.
const fixLink = (h) => h.replace(/^\/tools\//, '/free-tools/')
const dead = (h) => /^\/(quiz|case-studies)(\/|$)/.test(h)
const srcs = (keys) => [...new Set(keys)].map((k) => ({ url: SRC[k].url, label: SRC[k].label }))
const h2 = (text) => ({ type: 'h2', text, id: slugify(text) })

function sectionBlocks(sections) {
  const out = []
  for (const s of sections) {
    out.push(h2(s.h))
    if (s.list) out.push({ type: 'steps', items: s.list })
    if (s.table) out.push({ type: 'table', head: s.table.head, rows: s.table.rows })
    if (s.body) out.push({ type: 'p', text: s.body.replace(/Sources: (.*?)(\.?)$/, (_, l, dot) => 'Sources: ' + l.split(',').map((d) => d.trim()).map((d) => `[${d}](https://${d})`).join(', ') + dot) })
  }
  return out
}
const base = (o) => ({ exercises: [], takeaways: [], ...o, updated: o.updated || UPDATED, toc: o.body.filter((b) => b.type === 'h2') })

export const msgdoc = {
  path: '/templates/messaging-document',
  title: 'Messaging document template',
  meta: 'A messaging document is approved boilerplate a company reuses, built from positioning so teams stop rewriting every page and deck.',
  answer: 'A messaging document is the approved boilerplate a company reuses everywhere: a positioning summary, one-liner, short and long descriptions, value themes with proof, and messages by audience. Build it from your positioning canvas, get it signed off once, then copy from it instead of rewriting for each page, deck or campaign.',
  fields: [
    ['Positioning summary', 'Alternatives, unique attributes, value, best-fit customers, category.'],
    ['One-liner', '[Product] is the [category] for [best-fit customer].'],
    ['25 word description', 'What it is, who it is for, the main value.'],
    ['100 word description', 'Add how it works and why it beats the alternative.'],
    ['Value themes', 'Two to four themes, each with proof you can show.'],
    ['Messages by audience', 'What each buyer role needs to hear first.'],
    ['Boilerplate', 'Approved company description for press, bios and listings.'],
  ],
  faq: [
    { q: 'Why have a messaging document?', a: 'It stops teams recreating messages for every tactic, keeps materials consistent, helps new hires understand positioning and cuts executive copy reviews.' },
    { q: 'Who approves it?', a: 'The founder or marketing lead, with sales and product agreeing.' },
  ],
  src: ['dunfordMsg', 'dunfordEx'],
}

// Build guard (Bond): answer pages need a 40-60 word direct answer.
for (const a of ANSWERS) {
  const n = a.answer.split(/\s+/).length
  if (n < 40 || n > 60) throw new Error(`Direct answer for ${a.title} is ${n} words`)
  pageDescription(a, a.slug)
}
for (const c of COMPARE) {
  const m = String(c.meta || '').replace(/\s+/g, ' ').trim()
  if (m.length < 140 || m.length > 160 || !/[A-Za-z][.!?]$/.test(m)) {
    throw new Error(`Compare meta for ${c.slug} is ${m.length} chars: ${m}`)
  }
}

export const answerDocs = () => ANSWERS.map((a) => base({
  kind: 'answer', slug: `answer-${a.slug}`, updated: a.updated, route: `/answers/${a.slug}`, h1: a.title, title: `${a.title} | Boundset`, description: pageDescription(a, a.slug),
  definition: a.answer, body: sectionBlocks(a.sections), faq: a.faq,
  related: a.links.filter(([h]) => !dead(h)).map(([h, t]) => ({ path: fixLink(h), name: t })),
  sources: srcs(a.sections.flatMap((s) => s.src || [])), close: 'Talk through your positioning in 15 minutes', raw: { ...a, path: `/answers/${a.slug}` },
}))

export const compareDocs = () => COMPARE.map((c) => base({
  kind: 'compare', slug: `compare-${c.slug}`, route: `/compare/${c.slug}`, h1: c.h1, title: `${c.h1} | Boundset`, description: c.meta,
  definition: c.subhead, body: sectionBlocks(c.sections), faq: c.faq, related: (c.links || []).map(([path, name]) => ({ path, name })), sources: [], close: c.close, raw: c,
}))

export function msgDoc() {
  const p = msgdoc, copy = p.fields.map(([t, q]) => `${t}\n${q}\n`).join('\n')
  return base({
    kind: 'template', slug: 'messaging-document', route: p.path, h1: p.title, title: `${p.title} | Boundset`, description: pageDescription(p, p.path),
    definition: p.answer, faq: p.faq, related: [], sources: srcs(p.src), close: 'Talk through your positioning in 15 minutes', raw: p,
    body: [{ type: 'cards', items: p.fields, ids: p.fields.map(([t]) => slugify(t)) }, { type: 'actions', copy, links: [['/free-tools/positioning-statement-generator', 'Use the generator']] }],
  })
}

export const allDocs = () => [...answerDocs(), msgDoc(), ...compareDocs()]
