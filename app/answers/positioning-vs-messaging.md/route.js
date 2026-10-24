import { guide, toMarkdown } from '../../../lib/guides'
export const dynamic = 'force-static'
export function GET() {
  return new Response(toMarkdown(guide('positioning-vs-messaging')), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Link': `<https://boundset.com/answers/positioning-vs-messaging>; rel="canonical"` } })
}
