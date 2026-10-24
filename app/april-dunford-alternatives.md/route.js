import { guide, toMarkdown } from '../../lib/guides'
export const dynamic = 'force-static'
export function GET() {
  return new Response(toMarkdown(guide('april-dunford-alternatives')), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Link': `<https://boundset.com/april-dunford-alternatives>; rel="canonical"` } })
}
