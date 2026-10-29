import { z } from 'zod'
import { norm } from './extract.js'
const q = z.string().nullable()
export const schema = z.object({
  says_it_is: z.object({ summary: z.string().max(220), quote: q }),
  for_whom: z.object({ summary: z.string().max(220), quote: q, clear: z.boolean() }),
  up_against: z.object({ summary: z.string().max(260), named_on_page: z.boolean() }),
  strongest_claim: z.object({ quote: z.string(), why: z.string().max(240) }),
  gaps: z.array(z.object({ title: z.string().max(70), quote: q, problem: z.string().max(300), fix: z.string().max(260) })).min(3).max(3),
  rewrite: z.object({ hero: z.string(), why: z.string().max(200) }),
})
export const SECTIONS = ['says_it_is', 'for_whom', 'up_against', 'strongest_claim', 'gaps', 'rewrite']
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length

// Anti-fabrication guard (spec §3.6). Returns { result, ok, problems }.
// Fabricated optional quotes become null; a gap with a fabricated quote is dropped; the claim must be real.
export function guard(raw, corpusText) {
  const parsed = schema.safeParse(raw)
  if (!parsed.success) return { ok: false, problems: ['schema'], result: null }
  const r = structuredClone(parsed.data); const problems = []
  const real = (s) => s == null || corpusText.includes(norm(s))
  for (const k of ['says_it_is', 'for_whom']) if (!real(r[k].quote)) { r[k].quote = null; problems.push(`${k}.quote`) }
  if (!real(r.strongest_claim.quote)) problems.push('strongest_claim.quote')
  const kept = r.gaps.filter((g) => real(g.quote)); if (kept.length < r.gaps.length) problems.push('gaps'); r.gaps = kept
  if (words(r.rewrite.hero) > 14) problems.push('rewrite.length')
  return { ok: problems.filter((p) => !p.endsWith('_is.quote') && !p.startsWith('for_whom')).length === 0, problems, result: r }
}
