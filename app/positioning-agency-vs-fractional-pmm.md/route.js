import { guide, toMarkdown } from '../../lib/guides'
export const dynamic = 'force-static'
export function GET() {
  return new Response(toMarkdown(guide('positioning-agency-vs-fractional-pmm')), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Link': `<https://boundset.com/positioning-agency-vs-fractional-pmm>; rel="canonical"` } })
}
