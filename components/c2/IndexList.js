import t from '../../app/free-tools/tools.module.css'
const SITE = 'https://boundset.com'
export default function IndexList({ title, items }) {
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: title, itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + x.href, name: x.name })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className={t.head}><h1 className={t.h1xl}>{title}</h1></header>
      <ul className={`${t.grid} ${t.gridIdx}`}>
        {items.map((x) => <li key={x.href}><a href={x.href} className={t.cardL}><span className={t.cName}>{x.name}</span><span className={t.go} aria-hidden="true">→</span></a></li>)}
      </ul>
    </>
  )
}
