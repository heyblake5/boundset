import s from './c2.module.css'
import Logo from './Logo'
export default function Footer() {
  return <footer className={s.foot}><Logo className={s.lock} /><a href="mailto:blake@boundset.com" className={s.navLink}>blake@boundset.com</a></footer>
}
