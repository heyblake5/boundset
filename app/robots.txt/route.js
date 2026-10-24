import { SITE } from '../../lib/content'
const BOTS = ['*', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Googlebot', 'Bingbot', 'Applebot', 'Applebot-Extended', 'CCBot', 'DuckAssistBot', 'Meta-ExternalAgent']
export const dynamic = 'force-static'
export function GET() {
  const body = BOTS.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /api/\n`).join('\n') +
    `\nSitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/sitemap-pages.xml\nSitemap: ${SITE}/sitemap-content.xml\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
