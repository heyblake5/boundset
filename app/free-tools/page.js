import t from './tools.module.css'
import Icon from '../design/c2/Icons'
import { TOOLS, CANVAS, TEARDOWN_TOOL } from './tools'
const SITE = 'https://boundset.com'
export const metadata = { title: 'Free positioning and messaging tools | Boundset', description: 'Free browser-based tools for founders working on positioning and messaging. No signup.', alternates: { canonical: '/free-tools' } }
export default function FreeTools() {
  const all = [TEARDOWN_TOOL, ...TOOLS.map((x) => ({ href: `/free-tools/${x.slug}`, name: x.name, icon: x.icon })), CANVAS]
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Free tools', itemListElement: all.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + x.href, name: x.name })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className={t.head}><h1 className={t.h1xl}>Free tools</h1></header>
      <ul className={`${t.grid} ${t.gridIdx}`}>
        {all.map((x) => <li key={x.href}><a href={x.href} className={t.cardL}><span className={t.ico}><Icon name={x.icon} /></span><span className={t.cName}>{x.name}</span><span className={t.go} aria-hidden="true">→</span></a></li>)}
      </ul>
    </>
  )
}
