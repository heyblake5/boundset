import { SITE, PAGES } from '../../lib/content'
export const dynamic = 'force-static'
const line = (p) => {
  const md = p.md ? ` ([markdown](${SITE}${p.path}.md))` : ''
  return `- [${p.title}](${SITE}${p.path})${md}${p.answer ? ': ' + p.answer : ''}`
}
export function GET() {
  const gd = PAGES.filter((p) => p.guide), rest = PAGES.filter((p) => !p.guide && p.path !== '/guides')
  const guidesIndex = PAGES.find((p) => p.path === '/guides')
  const body = `# Boundset\n\n> Boundset runs two week positioning and messaging sprints for seed-stage startups and beyond, led by Blake Emal. Stake is $7,500. Stronghold is $12,000. Book a 15 minute call: https://cal.com/heyblake/positioning\n\n- Full text for models: ${SITE}/llms-full.txt\n- Every guide is also available as markdown: add .md to its URL\n\n## Guides\n` +
    (guidesIndex ? `- [${guidesIndex.title}](${SITE}${guidesIndex.path}): ${guidesIndex.answer}\n` : '') +
    gd.map((p) => `- [${p.title}](${SITE}${p.path}) ([markdown](${SITE}${p.path}.md)): ${p.answer}\n  Key takeaways: ${p.guide.takeaways.join(' ')}`).join('\n') +
    '\n\n## Pages and tools\n' + rest.map(line).join('\n') + '\n'
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
