import c from '../design/c2/c2.module.css'
import g from '../../components/guide/guide.module.css'
import Cal from '../design/_shared/Cal'
import Buy from '../design/c2/Buy'
import { WORKSHOP } from '../design/c2/workshop'
import PageFrame, { Crumb, TocSide, TocMobile } from '../../components/guide/PageFrame'
import * as d from '../design/_shared/data'
import {
  SPRINT_TITLE, SPRINT_DESCRIPTION, SPRINT_H1, SPRINT_OPENING, WORKSHOP_COPY, FIT, CHOOSE, QUOTE, QUOTE_BY, SPRINT_OFFERS,
} from '../../lib/sprintCopy'

const URL = 'https://boundset.com/sprint'
const TOC = [
  ['stake', 'What you get with Stake'],
  ['stronghold', 'What Stronghold adds'],
  ['timeline', 'How the two weeks run'],
  ['workshop', 'Start with the workshop if you want to test the fit first'],
  ['fit', 'Who the sprint is for'],
  ['choose', 'Consultant, agency or sprint'],
  ['client', 'What a client said'],
  ['faq', 'FAQs about the sprint'],
]
const faqs = Object.values(d.faqs).flat()
const stake = d.tiers.find((t) => t.id === 'stake')
const stronghold = d.tiers.find((t) => t.id === 'stronghold')

export const metadata = {
  title: SPRINT_TITLE,
  description: SPRINT_DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: SPRINT_TITLE, description: SPRINT_DESCRIPTION, url: URL, siteName: 'Boundset', type: 'website',
    images: [{ url: '/brand/og-mark-1200x630.png', width: 1200, height: 630, alt: 'Boundset' }],
  },
  twitter: { card: 'summary_large_image', title: SPRINT_TITLE, description: SPRINT_DESCRIPTION, images: ['/brand/og-mark-1200x630.png'] },
}

const LD = [
  {
    '@context': 'https://schema.org', '@type': 'Service', '@id': URL + '#service',
    name: 'Boundset positioning and messaging sprint', serviceType: 'Positioning and messaging consulting',
    provider: { '@id': 'https://boundset.com/#org' }, areaServed: 'Worldwide', url: URL,
    description: 'A two week positioning and messaging sprint for seed-stage startups and beyond. Stake costs $7,500. Stronghold costs $12,000.',
    offers: SPRINT_OFFERS,
  },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Boundset', item: 'https://boundset.com/' },
    { '@type': 'ListItem', position: 2, name: 'Positioning sprint', item: URL },
  ] },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
]

export default function Sprint() {
  return (
    <PageFrame data={LD}>
      <article className={g.grid}>
        <header className={g.head}>
          <Crumb name="Positioning sprint" />
          <h1 className={g.h1}>{SPRINT_H1}</h1>
          <p className={g.byline}>By <a href="/about" rel="author">Blake Emal</a></p>
          <p className={g.def}>{SPRINT_OPENING}</p>
        </header>
        <TocSide items={TOC} />
        <div className={g.body}>
          <TocMobile items={TOC} />

          <h2 id="stake" className={g.h2}>What you get with Stake</h2>
          <p className={g.price}>{stake.price}</p>
          <ul className={g.ul}>
            {d.deliverables.map((x) => <li key={x.title}><strong>{x.title}.</strong> {x.desc}</li>)}
          </ul>

          <h2 id="stronghold" className={g.h2}>What Stronghold adds</h2>
          <p className={g.price}>{stronghold.price}</p>
          <ul className={g.ul}>{stronghold.items.map((x) => <li key={x}>{x}</li>)}</ul>

          <h2 id="timeline" className={g.h2}>How the two weeks run</h2>
          <ol className={g.steps}>
            {d.milestones.map((m, i) => (
              <li key={m.title}>
                <span className={g.stepN} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div><p className={g.stepT}>{m.phase}: {m.title}</p><p>{m.desc}</p></div>
              </li>
            ))}
          </ol>

          <h2 id="workshop" className={g.h2}>Start with the workshop if you want to test the fit first</h2>
          <p>{WORKSHOP_COPY}</p>
          <ul className={g.ul}>{WORKSHOP.items.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className={g.cta}><Buy className={c.btn}>Buy the workshop</Buy></p>

          <h2 id="fit" className={g.h2}>Who the sprint is for</h2>
          {FIT.map((p) => <p key={p}>{p}</p>)}

          <h2 id="choose" className={g.h2}>Consultant, agency or sprint</h2>
          <p>{CHOOSE}</p>
          <p>Read <a href="/compare/positioning-consultant-vs-agency">positioning consultant vs agency</a>, <a href="/april-dunford-alternatives">April Dunford alternatives</a> and <a href="/positioning-sprint-cost">what a positioning sprint costs</a>.</p>

          <h2 id="client" className={g.h2}>What a client said</h2>
          <blockquote className={g.quote}><p>{QUOTE}</p></blockquote>
          <p className={g.who}>{QUOTE_BY}</p>

          <section aria-labelledby="faq" className={g.faq}>
            <h2 id="faq" className={g.h2}>FAQs about the sprint</h2>
            {faqs.map(([q, a]) => (
              <details key={q} className={g.faqItem}><summary><h3 className={g.faqQ}>{q}</h3></summary><p>{a}</p></details>
            ))}
          </section>

          <p className={g.cta}><Cal className={c.btn}>Book a 15 minute call</Cal></p>
        </div>
      </article>
    </PageFrame>
  )
}
