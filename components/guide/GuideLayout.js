import c from '../../app/design/c2/c2.module.css'
import g from './guide.module.css'
import TrackedLink from '../TrackedLink'
import { WORKSHOP_LINK, SHOW_WORKSHOP } from '../../app/design/c2/workshop'
import { serif, sans } from '../../app/design/c2/fonts'
import Nav from '../../app/design/c2/Nav'
import Logo from '../../app/design/c2/Logo'
import Footer from '../../app/design/c2/Footer'
import Inline from './Inline'
import Workbook from './Workbook'
import { guide, related, wordCount, plain, SITE, BOOK } from '../../lib/guides'
import CopyButton from '../CopyButton'

const fmt = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).replace(',', '')
const OG = '/brand/og-mark-1200x630.png'

export function guideMeta(slug) {
  const p = guide(slug), url = SITE + p.route
  return { title: p.title, description: p.description, alternates: { canonical: url },
    openGraph: { title: p.title, description: p.description, url, type: 'article', siteName: 'Boundset', modifiedTime: p.updated, images: [{ url: OG, width: 1200, height: 630, alt: 'Boundset' }] },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [OG] } }
}

function ld(p) {
  const url = SITE + p.route
  const out = [
    { '@context': 'https://schema.org', '@type': 'Article', '@id': url + '#article', headline: p.h1, description: p.description, url, mainEntityOfPage: url,
      datePublished: p.updated, dateModified: p.updated, image: SITE + OG, wordCount: wordCount(p), inLanguage: 'en',
      author: { '@type': 'Person', name: 'Blake Emal', url: SITE }, publisher: { '@id': SITE + '/#org' },
      citation: p.sources.map((s) => s.url), hasPart: p.exercises.map((e) => ({ '@type': 'CreativeWork', name: e.title, url: `${url}#${e.id}`, isAccessibleForFree: true })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Boundset', item: SITE + '/' }, { '@type': 'ListItem', position: 2, name: p.h1, item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) },
  ]
  const firstP = (i) => { for (let j = i + 1; j < p.body.length; j++) if (p.body[j].type === 'p') return plain(p.body[j].text) }
  const steps = (test, name) => p.body.map((b, i) => [b, i]).filter(([b]) => test(b)).map(([b, i], n) => ({ '@type': 'HowToStep', position: n + 1, name: name(b.text), text: firstP(i), url: `${url}#${b.id}` }))
  if (p.slug === 'positioning') {
    out.push({ '@context': 'https://schema.org', '@type': 'DefinedTerm', name: 'Product positioning', description: p.definition, url })
    out.push({ '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to do positioning step by step', step: steps((b) => b.type === 'h3' && /^Step \d+ /.test(b.text), (t) => t.replace(/^Step \d+ /, '')) })
  }
  if (p.slug === 'positioning-canvas') out.push({ '@context': 'https://schema.org', '@type': 'HowTo', name: p.h1, step: steps((b) => b.type === 'h2' && /^Box \d+ /.test(b.text), (t) => t.replace(/^Box \d+ /, '')) })
  if (p.slug === 'positioning-sprint-cost') out.push({ '@context': 'https://schema.org', '@type': 'Service', name: 'Boundset positioning sprint', provider: { '@id': SITE + '/#org' }, url: SITE + '/',
    offers: [['Stake', 7500], ['Stronghold', 12000]].map(([n, v]) => ({ '@type': 'Offer', name: n, price: v, priceCurrency: 'USD', url: SITE + '/#pricing' })) })
  return out
}

function Heading({ b, as: H }) {
  return <H id={b.id} className={H === 'h2' ? g.h2 : g.h3}>{b.text}<a href={`#${b.id}`} className={g.anchor} data-copy aria-label={`Copy link to ${b.text}`}><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 9.5a3 3 0 0 0 4.24 0l2.5-2.5a3 3 0 0 0-4.24-4.24l-.75.75M9.5 6.5a3 3 0 0 0-4.24 0l-2.5 2.5a3 3 0 0 0 4.24 4.24l.75-.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></a></H>
}

function Exercise({ e, n, total }) {
  return (
    <section className={g.ex} id={e.id} data-ex={e.id} data-state="empty" aria-labelledby={`${e.id}-h`}>
      <div className={g.exTop}><span className={g.exNum}>Exercise {n} of {total}</span><span className={g.exState} data-state-label aria-live="polite" /></div>
      <h3 id={`${e.id}-h`} className={g.exH}>{e.title}</h3>
      <p className={g.exWhy}>{e.why}</p>
      <p className={g.exPrompt}>{e.prompt}</p>
      <details className={g.exEg}><summary>Acme Billing example</summary><p>{e.example}</p></details>
      <div className={g.exFields}>
        {e.fields.map((f) => (
          <div key={f.id} className={g.field}>
            <label htmlFor={`${e.id}-${f.id}`}>{f.label || 'Your answer'}</label>
            <textarea id={`${e.id}-${f.id}`} data-f={f.id} data-label={f.label || 'Your answer'} rows={f.rows} spellCheck="true" />
          </div>
        ))}
      </div>
    </section>
  )
}

function Block({ b, i, ex }) {
  switch (b.type) {
    case 'h2': return <Heading b={b} as="h2" />
    case 'h3': return <Heading b={b} as="h3" />
    case 'p': return <p><Inline text={b.text} /></p>
    case 'ul': return <ul className={g.ul}>{b.items.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ul>
    case 'ol': return <ol className={g.ol}>{b.items.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ol>
    case 'code': return <pre className={g.pre}><code>{b.text}</code></pre>
    case 'table': return <div className={g.tableWrap} tabIndex={0} role="region" aria-label={b.head.join(', ')}><table className={g.table}><thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((x, k) => k ? <td key={k}><Inline text={x} /></td> : <th key={k} scope="row"><Inline text={x} /></th>)}</tr>)}</tbody></table></div>
    case 'cta': return <p className={g.cta}><a href={BOOK} className={c.btn}>{b.text}</a></p>
    case 'steps': return <ol className={g.steps}>{b.items.map(([t, d], j) => <li key={j}><span className={g.stepN} aria-hidden="true">{String(j + 1).padStart(2, '0')}</span><div><p className={g.stepT}>{t}</p><p>{d}</p></div></li>)}</ol>
    case 'cards': return <ol className={g.cards}>{b.items.map(([t, q], j) => <li key={t} className={j === b.items.length - 1 && b.items.length % 2 ? g.cardWide : undefined}><h2 id={b.ids[j]} className={g.cardH}>{t}</h2><p>{q}</p></li>)}</ol>
    case 'actions': return <p className={g.actions}><CopyButton text={b.copy} className={c.btnSm} />{b.links.map(([h, t]) => <a key={h} href={h} className={g.ghost}>{t}</a>)}</p>
    case 'exercise': return <Exercise e={b} n={ex.indexOf(b) + 1} total={ex.length} />
    default: return null
  }
}

function Toc({ p, mobile }) {
  const list = <ol className={g.tocList}>{p.toc.map((t) => <li key={t.id}><a href={`#${t.id}`} data-toc={t.id}>{t.text}</a></li>)}{!!p.faq?.length && <li><a href="#faq" data-toc="faq">FAQs</a></li>}</ol>
  return mobile
    ? <details className={g.tocM}><summary>On this page</summary>{list}</details>
    : <nav className={g.toc} aria-label="On this page"><p className={g.tocH}>On this page</p>{list}</nav>
}

export default function GuidePage({ slug }) { const p = guide(slug); return <DocPage p={p} data={ld(p)} rel={related(p)} /> }

export function DocPage({ p, data, rel = [] }) {
  const wc = wordCount(p), mins = Math.max(1, Math.round(wc / 230)), wb = p.exercises?.length > 0
  return (
    <div className={`${c.root} ${g.root} ${serif.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <a href="#main" className={g.skip}>Skip to content</a>
      <Nav logo={<Logo className={c.lock} />} />
      <main id="main" className={g.wrap}>
        <article className={`${g.grid} ${p.toc.length > 2 ? '' : g.solo}`} data-guide={p.slug} data-title={p.h1}>
          <header className={g.head}>
            <nav aria-label="Breadcrumb" className={g.crumb}><a href="/">Boundset</a><span aria-hidden="true">/</span><span aria-current="page">{p.h1}</span></nav>
            <h1 className={g.h1}>{p.h1}</h1>
            <p className={g.byline}>By Blake Emal · Updated <time dateTime={p.updated}>{fmt(p.updated)}</time> · {mins} min read</p>
            <p className={g.def}>{p.definition}</p>
          </header>
          {p.toc.length > 2 && <aside className={g.side}><Toc p={p} /></aside>}
          <div className={g.body}>
            {p.toc.length > 2 && <Toc p={p} mobile />}
            {!!p.takeaways?.length && <section className={g.keys} aria-labelledby="key-takeaways"><h2 id="key-takeaways" className={g.keysH}>Key takeaways</h2><ul>{p.takeaways.map((t) => <li key={t}>{t}</li>)}</ul></section>}
            {wb && <section className={g.wb} aria-labelledby="wb-h" data-wb>
              <h2 id="wb-h" className={g.wbH}>Your workbook</h2>
              <div className={g.meter}><progress max={p.exercises.length} value="0" data-meter aria-labelledby="wb-h wb-count" /><span id="wb-count" data-count>0 of {p.exercises.length} exercises done</span></div>
              <div className={g.wbBtns}>
                <button type="button" className={c.btnSm} data-act="download">Download my workbook</button>
                <button type="button" className={g.ghost} data-act="print">Print my answers</button>
                <button type="button" className={g.ghost} data-act="reset">Reset</button>
              </div>
            </section>}
            {p.body.map((b, i) => <Block key={i} b={b} i={i} ex={p.exercises} />)}
            {!!p.faq?.length && <section aria-labelledby="faq" className={g.faq}>
              <h2 id="faq" className={g.h2}>FAQs</h2>
              {p.faq.map(({ q, a }) => <details key={q} className={g.faqItem}><summary><h3 className={g.faqQ}>{q}</h3></summary><p><Inline text={a} /></p></details>)}
            </section>}
            {!!rel.length && <nav aria-labelledby="related" className={g.related}><h2 id="related" className={g.h2s}>Related guides and tools</h2><ul>{rel.map((r) => <li key={r.path}><a href={r.path}>{r.name}</a></li>)}</ul></nav>}
            {!!p.sources?.length && <section aria-labelledby="sources" className={g.sources}><h2 id="sources" className={g.h2s}>Sources</h2><ol>{p.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label || s.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a></li>)}</ol></section>}
          </div>
        </article>
        <section className={g.close} aria-labelledby={p.close ? 'close-h' : undefined}>
          {p.close && <h2 id="close-h" className={g.closeH}>{p.close}</h2>}
          <a href={BOOK} className={c.btn}>Book a call</a>
          {SHOW_WORKSHOP && (
            <p className="mt-6 text-white/85">
              Want to do it yourself with an expert alongside?{' '}
              <TrackedLink href={WORKSHOP_LINK} event="Workshop click" className="underline underline-offset-4 text-white focus-ring rounded">
                Start with the $2,000 workshop
              </TrackedLink>
            </p>
          )}
        </section>
        {wb && <div id="wbPrint" />}
      </main>
      <Footer />
      <Workbook slug={p.slug} />
    </div>
  )
}
