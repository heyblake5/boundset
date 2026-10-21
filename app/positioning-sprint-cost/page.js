import ComparePage from '../../components/ComparePage'

const data = {
  h1: 'Know what a positioning sprint costs before you call',
  subhead: 'Published prices for startup positioning sprints, with sources, plus what Boundset charges.',
  sections: [
    { h: 'Published sprint prices run from $2,400 to $20,000', body: 'Rethink GTM lists a three week sprint at $2,400. EdgeWise and SFMA list sprints at $7,500. [SOURCE NEEDED FOR $20,000 UPPER END, or change range to $2,400 to $12,000]. Sources: rethinkgtm.io, edgewiselabs.com/positioning-sprint, sfmarketing.agency/positioning-sprint (checked Oct 2026).' },
    { h: 'Price follows scope', body: 'Lower priced sprints cover one positioning strategy and one page. Higher priced sprints add more pages, more sessions or ongoing help. Ask each provider what you walk away with.' },
    { h: 'Boundset costs $7,500 or $12,000', body: 'Stake is $7,500 for the full two week sprint. Stronghold is $12,000. It adds more pages and keeps going on agreed assets after the two weeks.' },
    { h: 'Stake includes the copy, not just the strategy', body: 'You get a positioning strategy grid and a messaging matrix. You also get homepage copy with variants, a wireframe, a competitive audit and one activation asset you pick. Slack access stays open after.' },
  ],
  faq: [
    { q: 'How much does a positioning sprint cost?', a: 'Published startup sprints range from $2,400 to [UPPER END + SOURCE]. Boundset is $7,500 or $12,000.' },
    { q: 'How long does a positioning sprint take?', a: 'Two to four weeks for the ones listed here. Boundset takes two weeks.' },
    { q: 'Do I need a retainer after?', a: 'Boundset has no retainer. You keep Slack access for quick questions.' },
  ],
  close: 'Get a straight answer on fit in 15 minutes',
}

export const metadata = {
  title: `${data.h1} | Boundset`,
  description: data.subhead,
  alternates: { canonical: '/positioning-sprint-cost' },
}

export default function Page() {
  return <ComparePage data={data} />
}
