import t from './tools.module.css'
import Icon from '../design/c2/Icons'
import Cal from '../design/_shared/Cal'
import { TOOLS, bySlug } from './tools'
const SITE = 'https://boundset.com'
export const toolMeta = (slug) => { const x = bySlug(slug); return { title: `${x.name} | Free tool | Boundset`, description: x.desc, alternates: { canonical: `/free-tools/${slug}` }, openGraph: { title: x.name, description: x.desc, url: `/free-tools/${slug}` } } }
export default function ToolPage({ slug, children, after }) {
  const x = bySlug(slug), i = TOOLS.indexOf(x)
  const related = [1, 2, 3].map((k) => TOOLS[(i + k) % TOOLS.length])
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: x.name, url: `${SITE}/free-tools/${slug}`, description: x.desc, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: { '@id': `${SITE}/#org` } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Free tools', item: `${SITE}/free-tools` }, { '@type': 'ListItem', position: 2, name: x.name, item: `${SITE}/free-tools/${slug}` }] },
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className={t.head}>
        <nav aria-label="Breadcrumb" className={t.crumb}><a href="/free-tools">Free tools</a><span aria-hidden="true">/</span><span aria-current="page">{x.name}</span></nav>
        <div className={t.titleRow}><span className={t.bigIco}><Icon name={x.icon} size={28} /></span><h1 className={t.h1}>{x.name}</h1></div>
      </header>
      <section className={t.tool}>{children}</section>
      {after}
      <section className={t.more} aria-labelledby="more-h">
        <h2 id="more-h" className={t.h2}>More free tools</h2>
        <ul className={t.grid}>{related.map((r) => <li key={r.slug}><a href={`/free-tools/${r.slug}`} className={t.cardL}><span className={t.ico}><Icon name={r.icon} /></span><span className={t.cName}>{r.name}</span></a></li>)}</ul>
        <p className={t.moreRow}><a href="/free-tools" className={t.textLink}>All free tools →</a><Cal className={t.btnSm}>Book a call</Cal></p>
      </section>
    </>
  )
}
