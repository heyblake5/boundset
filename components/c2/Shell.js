import c from '../../app/design/c2/c2.module.css'
import t from '../../app/free-tools/tools.module.css'
import { serif, sans } from '../../app/design/c2/fonts'
import Nav from '../../app/design/c2/Nav'
import Logo from '../../app/design/c2/Logo'
import Footer from '../../app/design/c2/Footer'
// C2 page chrome for index pages and the 404 (same shell as /free-tools).
export default function Shell({ children }) {
  return (
    <div className={`${c.root} ${serif.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <Nav logo={<Logo className={c.lock} />} />
      <main className={t.wrap}>{children}</main>
      <Footer />
    </div>
  )
}
