import { SITE, PAGES } from '../../lib/content'
export const dynamic = 'force-static'
export function GET() {
  const body = `# Boundset\n\n> Boundset runs two week positioning and messaging sprints for seed to Series A B2B startups, led by Blake Emal. Stake is $7,500. Stronghold is $12,000. Book a 15 minute call: https://cal.com/heyblake/positioning\n\n- Full text for models: ${SITE}/llms-full.txt\n\n## Pages\n` +
    PAGES.map((p) => `- [${p.title}](${SITE}${p.path})${p.answer ? ': ' + p.answer : ''}`).join('\n') + '\n'
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
