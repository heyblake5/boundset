// Markdown variants for answers, comparisons and the messaging template (rewritten from /<route>.md in next.config.js).
import { allDocs } from '../../../lib/docs'
import { toMarkdown, SITE } from '../../../lib/guides'
export const dynamic = 'force-static'
export const dynamicParams = false
export function generateStaticParams() { return allDocs().map((d) => ({ path: d.route.slice(1).split('/') })) }
export async function GET(_, { params }) {
  const route = '/' + (await params).path.join('/'), d = allDocs().find((x) => x.route === route)
  return new Response(toMarkdown(d), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Link: `<${SITE}${route}>; rel="canonical"` } })
}
