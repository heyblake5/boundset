import s from './c2.module.css'
import Logo from './Logo'
export default function Footer() {
  return (
    <footer className={s.foot}>
      <Logo className={s.lock} />
      <nav className={s.footNav} aria-label="Footer">
        <a href="/sprint" className={s.navLink}>Sprint</a>
        <a href="/about" className={s.navLink}>About</a>
      </nav>
      <a href="mailto:blake@boundset.com" className={s.navLink}>blake@boundset.com</a>
    </footer>
  )
}
