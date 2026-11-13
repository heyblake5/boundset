import PageFrame, { Crumb } from '../../../components/guide/PageFrame'
import g from '../../../components/guide/guide.module.css'
import c from '../../design/c2/c2.module.css'
import s from './benchmark.module.css'
import { BENCHMARK as B } from '../../../lib/benchmark2026'

const PATH = '/research/homepage-positioning-benchmark-2026'
const URL = 'https://boundset.com' + PATH
const CSV = URL + '.csv'
const TITLE = 'Homepage positioning benchmark 2026'
const DESC = 'Of 100 seed and Series A homepages checked in 2026, 85 name a category, 21 name the alternative, and 34 show proof above the fold.'

export const metadata = {
  title: `${TITLE} | Boundset`,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESC, url: URL, type: 'article', siteName: 'Boundset' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
}

function ld() {
  const person = { '@type': 'Person', name: 'Blake Emal', jobTitle: '3x Head of Marketing', url: 'https://boundset.com/about' }
  return [
    { '@context': 'https://schema.org', '@type': 'Article', '@id': URL + '#article', headline: TITLE, description: DESC, url: URL,
      mainEntityOfPage: URL, datePublished: B.checked, dateModified: B.checked, inLanguage: 'en',
      author: person, publisher: { '@id': 'https://boundset.com/#org' },
      image: 'https://boundset.com/brand/og-mark-1200x630.png' },
    { '@context': 'https://schema.org', '@type': 'Dataset', '@id': URL + '#dataset', name: TITLE, description: B.opening, url: URL,
      creator: person, datePublished: B.checked, license: URL,
      distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: CSV },
      variableMeasured: B.checks.map((c) => c.name) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Boundset', item: 'https://boundset.com/' },
      { '@type': 'ListItem', position: 2, name: TITLE, item: URL }] },
  ]
}

const RELATED = [
  ['/positioning', 'What is product positioning'],
  ['/answers/homepage-messaging-audit', 'Homepage messaging audit'],
  ['/answers/how-to-fix-a-homepage-that-doesnt-convert', 'How to fix a homepage that doesn’t convert'],
  ['/answers/how-to-explain-what-an-ai-startup-does', 'How to explain what an AI startup does'],
  ['/answers/who-can-help-a-startup-with-positioning', 'Who can help a startup with positioning'],
  ['/teardown', 'Homepage teardown'],
]

export default function Page() {
  return (
    <PageFrame data={ld()}>
      <article className={`${g.grid} ${g.solo}`}>
        <header className={g.head}>
          <Crumb name={TITLE} />
          <h1 className={g.h1}>What 100 newly funded homepages actually say</h1>
          <p className={g.byline}>By <a href="/about" rel="author">Blake Emal</a>, 3x Head of Marketing · Checked <time dateTime={B.checked}>Nov 12, 2026</time></p>
          <p className={g.def}>{B.opening}</p>
        </header>
        <div className={g.body}>
          <h2 id="results" className={g.h2}>Six checks, one hundred homepages</h2>
          <p>{B.seed} had announced a seed round and {B.seriesA} a Series A. Each number is how many of the 100 passed. The checks run from the one most homepages passed to the one fewest passed.</p>
          <ol className={s.chart}>
            {B.checks.map((c) => (
              <li key={c.id} className={s.row}>
                <span className={s.name}>{c.name}</span>
                <span className={s.track}><span className={s.bar} style={{ width: c.n + '%' }} /></span>
                <span className={s.num}>{c.n}</span>
              </li>
            ))}
          </ol>
          {B.checks.map((c) => (
            <section key={c.id} aria-labelledby={c.id}>
              <h2 id={c.id} className={g.h2}>{c.name}</h2>
              <p>{c.n} of 100. {c.q}</p>
              <div className={s.pair}>
                <p><strong>A page that passes.</strong> {c.pass}</p>
                <p><strong>A page that fails.</strong> {c.fail}</p>
              </div>
            </section>
          ))}

          <h2 id="check" className={g.h2}>Check your homepage</h2>
          <div className={s.box}>
            <form className={s.form} action="/teardown" method="get">
              <input name="url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck="false" aria-label="Homepage URL" required />
              <button className={c.btn} type="submit">Check this homepage</button>
            </form>
          </div>
          <p className={s.note}>The address opens the <a href="/teardown">teardown</a>, which reads the page you send.</p>

          <h2 id="method" className={g.h2}>Method</h2>
          <p>The sample is 100 B2B software companies with a public seed or Series A announcement in 2026. {B.seed} are seed and {B.seriesA} are Series A. We started from Off Sand Hill&apos;s 2026 seed and Series A tables in software sectors, and from FinSMEs items whose first sentence named a software product and a seed or Series A round. A company stayed in only when we could open a news page or a sourced round page that states the round, and when the homepage loaded as a product page on {B.checked}.</p>
          <p>We left out hardware, biotech, consumer apps, insurers and brokerages that are not software, services firms, and pages that returned no readable headline. Boundset client sites were left out.</p>
          <p>Each check is yes or no. Category can sit in the headline or the line under it, and it has to be a noun a buyer would search. Customer has to be a role, a team, or a company type in the hero copy. A navigation label does not count. Teams, businesses, or enterprises, with nothing narrower, fails. Alternative has to name the tool, the file, or the manual step the product replaces. Outcome is judged on the headline alone, and an adjective does not pass. Proof has to be a customer name, a customer count, or a result number in the title, the headline, the description, or the first 1,800 characters of the page text. Investor logos and integration logos do not count. Plain passes only when the headline plus the line under it say what the product does in literal words. A metaphor or a slogan fails, even when a reader could guess the job.</p>
          <p>A script marked a first pass from keyword lists on the saved hero text. Every row was then read against the saved page. Ten rows, chosen with random seed 20261113 from the sorted company list, were read a second time. Those two readings agreed on 59 of 60 checks. Both readings were done by the same reviewer, an AI model, against saved copies of each page. The plain and customer checks were re-scored after a human spot-check of 10 rows. The numbers on this page are that re-score. Category, alternative, outcome, and proof were left as they were.</p>
          <p>Limits. Above the fold is the fetched text, not a scrolled browser. A page that paints its headline only after JavaScript was dropped, not scored as a fail. A few homepages are in German or Italian and were scored from the words on the page. The sample is companies with a public 2026 announcement and a working homepage. It is not every B2B software company.</p>
          <p><a href={PATH + '.csv'}>Download the scores</a>. The file has 100 rows and the six answers. It has no company names and no URLs.</p>

          <nav aria-labelledby="related" className={g.related}>
            <h2 id="related" className={g.h2s}>Related</h2>
            <ul>{RELATED.map(([href, name]) => <li key={href}><a href={href}>{name}</a></li>)}</ul>
          </nav>
        </div>
      </article>
    </PageFrame>
  )
}
