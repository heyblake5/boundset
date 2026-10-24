import ComparePage from '../../components/ComparePage'

const data = {
  h1: 'Choose the right help for your positioning',
  subhead: 'A side by side look at agencies, fractional product marketers and fixed sprints so you pick the one that matches your stage.',
  sections: [
    { h: 'Agencies take on the whole brand', body: 'A messaging agency pairs strategy with design and production. Teams pick one when they need a full brand and site at once.' },
    { h: 'A fractional PMM joins your team part time', body: 'A fractional PMM works inside your team for months. They run launches and enable sales as well as positioning.' },
    { h: 'A sprint locks positioning in a set window', body: 'A sprint has a fixed scope, a fixed price and an end date. Boundset runs two weeks and ends with copy your team uses right away.' },
    { h: 'Start with positioning, then hire for the rest', body: 'Lock your positioning first. Any agency or PMM you hire after gets a clear brief on day one.' },
  ],
  faq: [
    { q: 'Should a seed stage startup hire a fractional PMM?', a: 'Hire one when you need ongoing launches and sales help. Run a sprint first if the core story still shifts.' },
    { q: 'What does Boundset include?', a: 'Positioning, messaging docs, homepage copy with variants, a wireframe and one activation asset, all in two weeks.' },
  ],
  close: 'Talk through your options in 15 minutes',
}

export const metadata = {
  title: `${data.h1} | Boundset`,
  description: data.subhead,
  alternates: { canonical: '/positioning-agency-vs-fractional-pmm' },
}

export default function Page() {
  return <ComparePage data={data} />
}
