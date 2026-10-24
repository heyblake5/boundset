import Shell from '../components/c2/Shell'
import t from './free-tools/tools.module.css'
import c from './design/c2/c2.module.css'
export const metadata = { title: 'Page not found | Boundset', robots: { index: false } }
export default function NotFound() {
  return (
    <Shell>
      <header className={t.head}><h1 className={t.h1xl}>Page not found</h1></header>
      <p className={t.moreRow}><a href="/" className={c.btn}>Go to the homepage</a><a href="/free-tools" className={t.textLink}>Free tools →</a></p>
    </Shell>
  )
}
