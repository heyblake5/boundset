import PageFrame, { Crumb } from '../../components/guide/PageFrame'
import g from '../../components/guide/guide.module.css'
import c from '../design/c2/c2.module.css'
import s from './cost.module.css'
import CostChart from './CostChart'
import { H1, TITLE, DESCRIPTION, OPENING, CHECKED, CHECKED_LABEL, FAQ, sourceList, costLd } from '../../lib/positioningCost'

const URL = 'https://boundset.com/positioning-cost'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE, description: DESCRIPTION, url: URL, siteName: 'Boundset', type: 'article', modifiedTime: CHECKED,
    images: [{ url: '/brand/og-mark-1200x630.png', width: 1200, height: 630, alt: 'Boundset' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/brand/og-mark-1200x630.png'] },
}

export default function PositioningCost() {
  return (
    <PageFrame data={costLd()}>
      <article className={g.canvas}>
        <header className={g.head}>
          <Crumb name={H1} />
          <h1 className={g.h1}>{H1}</h1>
          <p className={g.byline}>By <a href="/about" rel="author">Blake Emal</a>, 3x Head of Marketing · <time dateTime={CHECKED}>{CHECKED_LABEL}</time></p>
          <p className={g.def}>{OPENING}</p>
        </header>
        <div className={g.body}>
          <h2 id="prices" className={g.h2}>Published prices</h2>
          <p>Each bar runs from the lowest number on that provider's page to the highest. The scale is logarithmic. Read where the bar sits, not how long it is. The ends are the links. A price that is not printed on the page is not on the chart.</p>
          <CostChart />

          <h2 id="faq" className={g.h2}>FAQs</h2>
          <section className={g.faq} aria-labelledby="faq">
            {FAQ.map(({ q, a }) => (
              <details key={q} className={g.faqItem}><summary><h3 className={g.faqQ}>{q}</h3></summary><p>{a}</p></details>
            ))}
          </section>

          <nav aria-labelledby="related" className={g.related}>
            <h2 id="related" className={g.h2s}>Related</h2>
            <ul>
              <li><a href="/positioning-sprint-cost">How much a positioning sprint costs</a></li>
              <li><a href="/april-dunford-alternatives">April Dunford alternatives</a></li>
              <li><a href="/positioning-agency-vs-fractional-pmm">Positioning agency vs fractional PMM</a></li>
              <li><a href="/compare/positioning-consultant-vs-agency">Positioning consultant vs agency</a></li>
              <li><a href="/compare/fractional-pmm-vs-positioning-consultant">Fractional product marketer vs a positioning consultant</a></li>
              <li><a href="/sprint">Positioning sprint</a></li>
              <li><a href="/messaging-strategy">How to build a messaging strategy</a></li>
            </ul>
          </nav>

          <section aria-labelledby="sources" className={g.sources}>
            <h2 id="sources" className={g.h2s}>Sources</h2>
            <p className={s.srcNote}>Read {CHECKED_LABEL}.</p>
            <ol>
              {sourceList().map((src) => (
                <li key={src.url}><a href={src.url} target="_blank" rel="noopener noreferrer">{src.name}</a>. {src.note}</li>
              ))}
            </ol>
          </section>

          <p className={g.cta}><a href="/sprint" className={c.btn}>See the sprint</a></p>
        </div>
      </article>
    </PageFrame>
  )
}
