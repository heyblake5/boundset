import c from '../design/c2/c2.module.css'
import t from './tools.module.css'
import { serif, sans } from '../design/c2/fonts'
import Nav from '../design/c2/Nav'
import Logo from '../design/c2/Logo'
import Footer from '../design/c2/Footer'
export const metadata = {
  icons: { icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/favicon.ico', sizes: 'any' }], apple: '/brand/apple-touch-icon.png' },
  openGraph: { images: [{ url: '/brand/og-mark-1200x630.png', width: 1200, height: 630, alt: 'Boundset' }] },
}
export default function Layout({ children }) {
  return (
    <main className={`${c.root} ${serif.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <Nav logo={<Logo className={c.lock} />} />
      <div className={t.wrap}>{children}</div>
      <Footer />
    </main>
  )
}
