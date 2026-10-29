import c from '../../app/design/c2/c2.module.css'
import g from './guide.module.css'
import { serif, sans } from '../../app/design/c2/fonts'
import Nav from '../../app/design/c2/Nav'
import Logo from '../../app/design/c2/Logo'
import Footer from '../../app/design/c2/Footer'

export default function PageFrame({ children, data }) {
  return (
    <div className={`${c.root} ${g.root} ${serif.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      {data && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />}
      <a href="#main" className={g.skip}>Skip to content</a>
      <Nav logo={<Logo className={c.lock} />} />
      <main id="main" className={g.wrap}>{children}</main>
      <Footer />
    </div>
  )
}

export function Crumb({ name }) {
  return (
    <nav aria-label="Breadcrumb" className={g.crumb}>
      <a href="/">Boundset</a><span aria-hidden="true">/</span><span aria-current="page">{name}</span>
    </nav>
  )
}

function TocList({ items }) {
  return <ol className={g.tocList}>{items.map(([id, text]) => <li key={id}><a href={`#${id}`}>{text}</a></li>)}</ol>
}

export function TocSide({ items }) {
  return <aside className={g.side}><nav className={g.toc} aria-label="On this page"><p className={g.tocH}>On this page</p><TocList items={items} /></nav></aside>
}

export function TocMobile({ items }) {
  return <details className={g.tocM}><summary>On this page</summary><TocList items={items} /></details>
}
