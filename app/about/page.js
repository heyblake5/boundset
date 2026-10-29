import c from '../design/c2/c2.module.css'
import g from '../../components/guide/guide.module.css'
import Cal from '../design/_shared/Cal'
import PageFrame, { Crumb, TocSide, TocMobile } from '../../components/guide/PageFrame'
import { ABOUT_TITLE, ABOUT_DESCRIPTION, ABOUT_H1, ABOUT_OPENING, ABOUT_BACKGROUND, QUOTE, QUOTE_BY, WRITING, ELSEWHERE, BLAKE_ID } from '../../lib/aboutCopy'

const URL = 'https://boundset.com/about'
const TOC = [
  ['background', 'What I did before Boundset'],
  ['client', 'What a client said'],
  ['writing', "What I've written about positioning"],
  ['elsewhere', 'Where else to find me'],
]

export const metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: ABOUT_TITLE, description: ABOUT_DESCRIPTION, url: URL, siteName: 'Boundset', type: 'profile',
    images: [{ url: '/brand/blake.jpg', width: 640, height: 640, alt: 'Blake Emal' }],
  },
  twitter: { card: 'summary', title: ABOUT_TITLE, description: ABOUT_DESCRIPTION, images: ['/brand/blake.jpg'] },
}

const LD = [
  { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@id': BLAKE_ID }, url: URL },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Boundset', item: 'https://boundset.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blake Emal', item: URL },
  ] },
]

export default function About() {
  return (
    <PageFrame data={LD}>
      <article className={g.grid}>
        <header className={g.head}>
          <Crumb name="Blake Emal" />
          <img src="/brand/blake.jpg" alt="Blake Emal" width="160" height="160" className={g.portrait} />
          <h1 className={g.h1}>{ABOUT_H1}</h1>
          <p className={g.def}>{ABOUT_OPENING}</p>
        </header>
        <TocSide items={TOC} />
        <div className={g.body}>
          <TocMobile items={TOC} />
          <h2 id="background" className={g.h2}>What I did before Boundset</h2>
          <p>{ABOUT_BACKGROUND}</p>
          <h2 id="client" className={g.h2}>What a client said</h2>
          <blockquote className={g.quote}><p>{QUOTE}</p></blockquote>
          <p className={g.who}>{QUOTE_BY}</p>
          <h2 id="writing" className={g.h2}>What I&apos;ve written about positioning</h2>
          <ul className={g.ul}>{WRITING.map(([href, name]) => <li key={href}><a href={href}>{name}</a></li>)}</ul>
          <h2 id="elsewhere" className={g.h2}>Where else to find me</h2>
          <ul className={g.ul}>
            {ELSEWHERE.map(([href, name, note]) => (
              <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{name}</a>{note ? ` ${note}` : ''}</li>
            ))}
          </ul>
          <p className={g.cta}><Cal className={c.btn}>Book a 15 minute call</Cal></p>
        </div>
      </article>
    </PageFrame>
  )
}
