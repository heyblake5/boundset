import { guide, toMarkdown } from '../../lib/guides'
export const dynamic = 'force-static'
export function GET() {
  return new Response(toMarkdown(guide('positioning-sprint-cost')), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Link': `<https://boundset.com/positioning-sprint-cost>; rel="canonical"` } })
}
