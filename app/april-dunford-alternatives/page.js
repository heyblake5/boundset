import ComparePage from '../../components/ComparePage'

const data = {
  h1: 'Get sharp positioning at a startup budget',
  subhead: 'April Dunford wrote the book on positioning. This page compares her workshop with other ways startups get positioning done, including Boundset.',
  sections: [
    { h: 'April Dunford runs a three day workshop', body: 'Her Positioning + Sales Pitch Workshop is facilitated over three days, in person or remote. Her site lists $50,000 for companies with 10 to 50 people and $80,000 for 50 to 1,000+ people. She works mainly with B2B companies and does not take pre launch products. She books a few months ahead. Sources: aprildunford.com/consultant, aprildunford.com/contact (checked Oct 2026).' },
    { h: 'Startups have more options than ever', body: 'Published sprint prices start at $2,400 (Rethink GTM) and run to $7,500 at shops like EdgeWise. Sources: rethinkgtm.io/services/b2b-positioning-messaging-sprint, edgewiselabs.com/positioning-sprint (checked Oct 2026).' },
    { h: 'Boundset fits seed stage teams that need copy too', body: 'Boundset is a two week sprint. You get positioning locked and messaging documented. You also get homepage copy with variants plus a wireframe. Stake is $7,500. Stronghold is $12,000 and adds more pages.' },
    { h: 'Pick the one that fits your stage', body: 'Choose April Dunford if your leadership team needs her method in the room with her. Choose a sprint if you need positioning and finished copy in a few weeks.' },
  ],
  faq: [
    { q: 'How much does April Dunford charge?', a: 'Her site lists $50,000 for companies with 10 to 50 people and $80,000 for larger teams (aprildunford.com/consultant, Oct 2026).' },
    { q: 'Does April Dunford work with early stage startups?', a: 'Her site says she does not work with pre launch or very early release products.' },
    { q: 'What does Boundset cost?', a: 'Stake is $7,500. Stronghold is $12,000. Both run two weeks.' },
    {
      q: 'What do I get from a Boundset sprint?',
      a: {
        text: 'A positioning strategy grid, a messaging matrix, homepage copy with variants, a wireframe and more. See the full list on the homepage.',
        node: <>A positioning strategy grid, a messaging matrix, homepage copy with variants, a wireframe and more. See the full list on the <a href="/" className="text-brand underline underline-offset-2 hover:no-underline focus-ring rounded">homepage</a>.</>,
      },
    },
  ],
  close: 'See if Boundset fits in 15 minutes',
}

export const metadata = {
  title: `${data.h1} | Boundset`,
  description: data.subhead,
  alternates: { canonical: '/april-dunford-alternatives' },
}

export default function Page() {
  return <ComparePage data={data} />
}
