// Guides: content/guides/*.md (Quill's files, verbatim) parsed at build. Single source for the guide pages,
// /<route>.md, llms.txt, llms-full.txt, JSON-LD and sitemap lastmod. Tiny parser, no deps.
import fs from 'fs'
import path from 'path'
import { TOOLS } from '../app/free-tools/tools.js'
import { GUIDE_NAV } from './guideNav.js'

export const SITE = 'https://boundset.com'
export const BOOK = '/#book'
export const ORDER = GUIDE_NAV.map((g) => g.slug)
const TOP = /^## (META|H1|DEFINITION|KEY TAKEAWAYS|BODY|WORKBOOK SUMMARY|FAQ|INTERNAL LINKS|SCHEMA NOTES|SOURCES)\b.*$/
const DIR = path.join(process.cwd(), 'content/guides')

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const BLANK = /_{3,}/
const isBlankOnly = (l) => /^_{3,}$/.test(l.trim())

function sections(src) {
  const out = {}; let cur = null
  for (const line of src.split('\n')) {
    const m = line.match(TOP)
    if (m) { cur = m[1]; out[cur] = []; continue }
    if (cur) out[cur].push(line)
  }
  for (const k in out) out[k] = out[k].join('\n').trim()
  return out
}

// Answer lines -> fields. Consecutive bare "______" lines form one field; "Label: ______" is its own field;
// a template line with several blanks is one field labelled with the template.
function fields(lines) {
  const f = []
  for (const l of lines) {
    const t = l.trim(); if (!t) continue
    if (isBlankOnly(t)) { const last = f[f.length - 1]; if (last && last.bare) last.rows++; else f.push({ bare: true, rows: 1, label: '' }); continue }
    const lab = t.match(/^([^_]+?):\s*_{3,}\s*$/)
    if (lab) f.push({ label: lab[1].trim(), rows: 2 })
    else f.push({ label: t, template: true, rows: 3 })
  }
  let n = 0
  return f.map((x) => ({ id: `f${++n}`, label: x.label, rows: Math.max(2, x.rows + (x.bare ? 1 : 0)), template: !!x.template }))
}

function exercise(id, body) {
  const get = (k) => (body.match(new RegExp(`^\\*\\*${k}:\\*\\*\\s*(.*)$`, 'm')) || [])[1]?.trim() || ''
  const ans = body.split(/^\*\*Your answer:\*\*\s*$/m)[1] || ''
  return { type: 'exercise', id, title: get('Title'), why: get('Why it matters'), prompt: get('Prompt'), example: get('Worked example \\(fictional\\)'), fields: fields(ans.split('\n')), answerLines: ans.trim().split('\n') }
}

function blocks(md) {
  const L = md.split('\n'), out = []; let i = 0
  const para = []
  const flush = () => { if (para.length) { out.push({ type: 'p', text: para.join(' ') }); para.length = 0 } }
  while (i < L.length) {
    const l = L[i]
    let m
    if (!l.trim()) { flush(); i++; continue }
    if ((m = l.match(/^\[EXERCISE ([\w-]+)\]/))) {
      flush(); const b = []; i++
      while (i < L.length && !/^\[\/EXERCISE\]/.test(L[i])) b.push(L[i++])
      i++; out.push(exercise(m[1], b.join('\n'))); continue
    }
    if ((m = l.match(/^(#{2,3}) (.*)$/))) { flush(); out.push({ type: m[1].length === 2 ? 'h2' : 'h3', text: m[2].trim(), id: slugify(m[2]) }); i++; continue }
    if (/^```/.test(l)) { flush(); const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; out.push({ type: 'code', text: b.join('\n') }); continue }
    if (/^\|/.test(l)) {
      flush(); const rows = []
      while (i < L.length && /^\|/.test(L[i])) { if (!/^\|[\s|:-]+\|$/.test(L[i].trim())) rows.push(L[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())); i++ }
      out.push({ type: 'table', head: rows[0], rows: rows.slice(1) }); continue
    }
    if (/^[-*] /.test(l)) { flush(); const items = []; while (i < L.length && /^[-*] /.test(L[i])) items.push(L[i++].slice(2).trim()); out.push({ type: 'ul', items }); continue }
    if (/^\d+\. /.test(l)) { flush(); const items = []; while (i < L.length && /^\d+\. /.test(L[i])) items.push(L[i++].replace(/^\d+\. /, '').trim()); out.push({ type: 'ol', items }); continue }
    if ((m = l.match(/^\*\*Primary CTA:\*\*\s*(.*)$/))) { flush(); out.push({ type: 'cta', text: m[1].trim() }); i++; continue }
    para.push(l.trim()); i++
  }
  flush(); return out
}

function faq(md) {
  const out = []; let cur
  for (const l of md.split('\n')) {
    let m
    if ((m = l.match(/^\*\*Q:\s*(.*?)\*\*\s*$/))) { cur = { q: m[1].trim(), a: '' }; out.push(cur) }
    else if (cur && (m = l.match(/^A:\s*(.*)$/))) cur.a = m[1].trim()
    else if (cur && cur.a && l.trim()) cur.a += ' ' + l.trim()
  }
  return out
}

function parse(file) {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8')
  const fm = Object.fromEntries((raw.match(/^---\n([\s\S]*?)\n---/) || [, ''])[1].split('\n').filter(Boolean).map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }))
  const s = sections(raw)
  const meta = Object.fromEntries(s.META.split('\n').map((l) => l.match(/^- (Meta title|Meta description)[^:]*:\s*(.*)$/)).filter(Boolean).map((m) => [m[1] === 'Meta title' ? 'title' : 'description', m[2].trim()]))
  const links = s['INTERNAL LINKS'].split('\n').filter((l) => /^\| \//.test(l)).map((l) => { const [p, a, w] = l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()); return { path: p, anchor: a, where: w } })
  const sources = s.SOURCES.split('\n').map((l) => l.match(/^- (https?:\/\/\S+)(?:\s+\((.*)\))?/)).filter(Boolean).map((m) => ({ url: m[1], note: m[2] || '' }))
  const body = blocks(s.BODY), faqs = faq(s.FAQ)
  const extra = fm.slug === 'april-dunford-alternatives' ? [{ path: 'https://www.aprildunford.com/consultant', anchor: 'April Dunford' }, { path: 'https://www.aprildunford.com/books', anchor: 'Obviously Awesome' }] : []
  const unplaced = linkify(body, [...extra, ...links.filter((l) => !l.path.startsWith('/#'))], faqs)
  return {
    slug: fm.slug, route: fm.route, updated: fm.updated || '2026-10-24', ...meta,
    h1: s.H1.trim(), definition: s.DEFINITION.trim(),
    takeaways: s['KEY TAKEAWAYS'].split('\n').filter((l) => /^- /.test(l)).map((l) => l.slice(2).trim()),
    body, faq: faqs, links, sources,
    unplaced,
    exercises: body.filter((b) => b.type === 'exercise'),
    toc: body.filter((b) => b.type === 'h2'),
  }
}

let cache
export function guides() { return cache ||= ORDER.map((slug) => parse(`${slug}.md`)) }
export const guide = (slug) => guides().find((g) => g.slug === slug)

// Insert each INTERNAL LINKS anchor as a markdown link at its first occurrence in body prose
// (paragraphs, list items, table cells; never headings, exercises or code). Returns anchors not found.
function linkify(body, links, faqs = []) {
  const miss = []
  for (const l of links) {
    const re = new RegExp(`(^|[^\\w])(${l.anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?=[^\\w]|$)`, 'i')
    let done = false
    const tryText = (t) => {
      if (done) return t
      // only search text outside existing [..](..) links
      const parts = t.split(/(\[[^\]]*\]\([^)]*\))/)
      for (let k = 0; k < parts.length; k += 2) {
        const m = parts[k].match(re); if (!m) continue
        const at = m.index + m[1].length
        parts[k] = parts[k].slice(0, at) + `[${m[2]}](${l.path})` + parts[k].slice(at + m[2].length)
        done = true; return parts.join('')
      }
      return t
    }
    for (const b of body) {
      if (done) break
      if (b.type === 'p') b.text = tryText(b.text)
      else if (b.type === 'ul' || b.type === 'ol') b.items = b.items.map(tryText)
      else if (b.type === 'table') b.rows = b.rows.map((r) => r.map(tryText))
    }
    for (const f of faqs) f.a = tryText(f.a)
    if (!done) miss.push(l)
  }
  return miss
}

// Plain text of inline markdown (for word counts, JSON-LD, llms files).
export const plain = (t) => t.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
const words = (t) => (plain(t).match(/[A-Za-z0-9$%][\w$%,.'’/-]*/g) || []).length

// Visible text (what the HTML renders), used for the word-count check.
export function visibleText(g) {
  const out = [g.h1, g.definition, ...g.takeaways]
  for (const b of g.body) {
    if (b.type === 'p' || b.type === 'h2' || b.type === 'h3' || b.type === 'cta' || b.type === 'code') out.push(b.text)
    if (b.type === 'ul' || b.type === 'ol') out.push(...b.items)
    if (b.type === 'table') out.push(...b.head, ...b.rows.flat())
    if (b.type === 'exercise') out.push(b.title, b.why, b.prompt, b.example, ...b.fields.map((f) => f.label))
  }
  for (const f of g.faq) out.push(f.q, f.a)
  return out.join('\n')
}
export const wordCount = (g) => words(visibleText(g))

const abs = (t) => t.replace(/\]\(\//g, `](${SITE}/`)

// Markdown export (agents): front matter + the guide as clean markdown, exercises as markdown.
export function toMarkdown(g) {
  const fm = ['---', `title: ${JSON.stringify(g.h1)}`, `description: ${JSON.stringify(g.description)}`, `updated: ${g.updated}`, `canonical: ${SITE}${g.route}`, 'sources:', ...g.sources.map((s) => `  - ${s.url}`), '---', '']
  const o = [`# ${g.h1}`, '', g.definition, '', '## Key takeaways', '', ...g.takeaways.map((t) => `- ${t}`), '']
  for (const b of g.body) {
    if (b.type === 'h2') o.push(`## ${b.text}`, '')
    else if (b.type === 'h3') o.push(`### ${b.text}`, '')
    else if (b.type === 'p') o.push(abs(b.text), '')
    else if (b.type === 'ul') o.push(...b.items.map((x) => `- ${abs(x)}`), '')
    else if (b.type === 'ol') o.push(...b.items.map((x, i) => `${i + 1}. ${abs(x)}`), '')
    else if (b.type === 'code') o.push('```', b.text, '```', '')
    else if (b.type === 'table') o.push(`| ${b.head.join(' | ')} |`, `|${b.head.map(() => '---').join('|')}|`, ...b.rows.map((r) => `| ${abs(r.join(' | '))} |`), '')
    else if (b.type === 'cta') o.push(`[${b.text}](${SITE}${BOOK})`, '')
    else if (b.type === 'exercise') o.push(`### Exercise: ${b.title}`, '', `Why it matters: ${b.why}`, '', `Prompt: ${b.prompt}`, '', `Worked example (fictional, Acme Billing): ${b.example}`, '', 'Your answer:', '', ...b.answerLines, '')
  }
  o.push('## FAQ', '', ...g.faq.flatMap((f) => [`### ${f.q}`, '', abs(f.a), '']))
  o.push('## Related', '', ...related(g).map((r) => `- [${r.name}](${SITE}${r.path})`), '', '## Sources', '', ...g.sources.map((s) => `- ${s.url}`), '')
  return fm.join('\n') + o.join('\n')
}

// Related guides and tools from INTERNAL LINKS (skip in-page anchors). Names: guide H1 or tool name.
export function related(g) {
  const seen = new Set(), out = []
  for (const l of g.links) {
    const p = l.path; if (p.startsWith('/#') || seen.has(p) || p === g.route) continue; seen.add(p)
    const gd = guides().find((x) => x.route === p), tl = TOOLS.find((t) => `/free-tools/${t.slug}` === p)
    out.push({ path: p, name: gd ? gd.h1 : tl ? tl.name : p === '/free-tools' ? 'All free tools' : l.anchor, kind: gd ? 'guide' : 'tool' })
  }
  return out
}
