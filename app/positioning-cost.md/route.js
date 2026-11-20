import { costMarkdown } from '../../lib/positioningCost'
export const dynamic = 'force-static'
export function GET() {
  return new Response(costMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Link: '<https://boundset.com/positioning-cost>; rel="canonical"' } })
}
