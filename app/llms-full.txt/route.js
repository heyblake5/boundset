import { SITE, PAGES, SRC } from '../../lib/content'
import { toMarkdown } from '../../lib/guides'
export const dynamic = 'force-static'
const block = ({ title, path, data: d }) => {
  const out = [`# ${title}`, `URL: ${SITE}${path}`, '', d.answer]
  if (d.table) out.push('', ...d.table.map((r) => '| ' + r.join(' | ') + ' |'))
  for (const s of d.sections || []) { out.push('', `## ${s.h}`); if (s.list) out.push(...s.list.map(([t, x], i) => `${i + 1}. ${t}: ${x}`)); if (s.body) out.push(s.body); if (s.src) out.push('Sources: ' + s.src.map((k) => `${SRC[k].label} (${SRC[k].url})`).join('; ')) }
  if (d.fields) out.push('', ...d.fields.map(([t, q]) => `- ${t}: ${q}`))
  if (d.quote) out.push('', `"${d.quote}" — ${d.person}, ${d.role}`)
  if (d.faq) out.push('', '## FAQ', ...d.faq.map(({ q, a }) => `Q: ${q}\nA: ${a}`))
  return out.join('\n')
}
export function GET() {
  return new Response(PAGES.filter((p) => p.guide || p.data).map((p) => p.guide ? toMarkdown(p.guide) : block(p)).join('\n\n---\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
