import PageFrame, { Crumb } from '../../components/guide/PageFrame'
import g from '../../components/guide/guide.module.css'
import c from '../design/c2/c2.module.css'
import m from './msg.module.css'
import CopyButton from '../../components/CopyButton'
import { H1, TITLE, DESCRIPTION, OPENING, CHECKED, DAYS, MATRIX_HEADERS, MATRIX_TSV, MATRIX_CSV, QUOTE, QUOTE_BY, messageLd } from '../../lib/messagingStrategy'

const URL = 'https://boundset.com/messaging-strategy'
const csvHref = 'data:text/csv;charset=utf-8,' + encodeURIComponent(MATRIX_CSV)

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

export default function MessagingStrategy() {
  return (
    <PageFrame data={messageLd()}>
      <article className={g.canvas}>
        <header className={g.head}>
          <Crumb name={H1} />
          <h1 className={g.h1}>{H1}</h1>
          <p className={g.byline}>By <a href="/about" rel="author">Blake Emal</a>, 3x Head of Marketing</p>
          <p className={g.def}>{OPENING}</p>
        </header>
        <div className={g.body}>
          <h2 id="days" className={g.h2}>Ten working days</h2>
          <p>Positioning is settled in the first week. The messaging matrix and the homepage come after that, not before.</p>
          <div className={m.tl}>
            <div className={m.row} role="radiogroup" aria-label="Ten working days">
              {DAYS.map((d) => (
                <div key={d.id} className={m.day}>
                  <input className={m.sr} type="radio" name="sprint-day" id={d.id} defaultChecked={d.n === '1'} />
                  <label htmlFor={d.id}><span className={m.num}>{d.n}</span><span className={m.dn}>{d.name}</span></label>
                </div>
              ))}
            </div>
            <div className={m.panels}>
              {DAYS.map((d) => (
                <div key={d.id} className={m.panel} id={`day-${d.n}`}>
                  <p>{d.you}</p>
                  <p>{d.get}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 id="matrix" className={g.h2}>Messaging matrix</h2>
          <p>One row per value theme. The last column is the words the company does not say. Copy it into a sheet and fill it after the positioning is settled.</p>
          <div className={g.tableWrap}>
            <table className={m.sheet}>
              <tbody>
                <tr>
                  <th scope="row">One-liner</th>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`${g.tableWrap} ${m.matrix}`}>
            <table className={m.sheet}>
              <thead>
                <tr>{MATRIX_HEADERS.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((n) => (
                  <tr key={n}>
                    <th scope="row">{n}</th>
                    {MATRIX_HEADERS.slice(1).map((h) => <td key={h}><span className={m.lab}>{h}</span></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={m.acts}>
            <CopyButton text={MATRIX_TSV} label="Copy" className={c.btnSm} />
            <a className={c.btnSm} href={csvHref} download="messaging-matrix.csv">Download</a>
          </p>

          <figure className={g.said}>
            <blockquote className={g.quote}><p>{QUOTE}</p></blockquote>
            <figcaption className={g.who}>{QUOTE_BY}</figcaption>
          </figure>

          <nav aria-labelledby="related" className={g.related}>
            <h2 id="related" className={g.h2s}>Related</h2>
            <ul>
              <li><a href="/answers/what-is-a-messaging-framework">What is a messaging framework</a></li>
              <li><a href="/answers/messaging-matrix-template">Messaging matrix template</a></li>
              <li><a href="/answers/positioning-vs-messaging">Positioning vs messaging</a></li>
              <li><a href="/templates/messaging-document">Messaging document template</a></li>
              <li><a href="/positioning">Product positioning</a></li>
              <li><a href="/sprint">Positioning sprint</a></li>
              <li><a href="/positioning-cost">What positioning work costs</a></li>
            </ul>
          </nav>

          <p className={g.cta}><a href="/sprint" className={c.btn}>See the sprint</a></p>
        </div>
      </article>
    </PageFrame>
  )
}
