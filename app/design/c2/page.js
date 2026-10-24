import localFont from 'next/font/local'
import s from './c2.module.css'
import * as d from '../_shared/data'
import Cal from '../_shared/Cal'
import Scroll from '../_shared/Scroll'
import Field from './Field'
import Sharpen from './Sharpen'
import Quiz from './Quiz'
import Tiers from './Tiers'
import Picker from './Picker'
import Nav from './Nav'
import Logo from './Logo'
import Thumb, { kinds } from './Thumb'
import Open from './Open'
import Track from './Track'

// Newsreader (OFL), instanced to wght 400 with the opsz axis kept at 24–72 so every
// display size gets its true optical cut; Latin subset, 22KB. Inter (OFL) wght 400–500, 17KB.
// Both built from the Google Fonts variable files by fonts/README.
const serif = localFont({ src: './fonts/newsreader-display.woff2', weight: '400', variable: '--serif', display: 'swap', adjustFontFallback: 'Times New Roman', declarations: [{ prop: 'font-variation-settings', value: 'normal' }] })
const sans = localFont({ src: './fonts/inter-text.woff2', weight: '400 500', variable: '--sans', display: 'swap', adjustFontFallback: 'Arial' })
export const metadata = { title: 'Boundset · Direction C2 · Stronghold', robots: { index: false, follow: false },
  icons: { icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/brand/favicon-16.png', sizes: '16x16', type: 'image/png' }], apple: '/brand/apple-touch-icon.png' } }

export default function C2() {
  return (
    <main className={`${s.root} ${serif.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <Nav /><Scroll />
      <nav className={s.nav} data-nav>
        <a href="/design/c2" className={s.lockLink} aria-label="Boundset home"><Logo className={s.lock} /></a>
        <div className={s.navR}><a href="/quiz" className={s.navLink}>Take the quiz</a><Cal className={s.btnSm}>Book a call</Cal></div>
      </nav>

      <header className={s.hero}>
        <Field />
        <div className={s.heroIn}>
          <h1 className={s.h1}>{d.hero.h1}</h1>
          <div className={s.ctas} data-hero-cta><Cal className={s.btn}>Book a free 1:1 consultation</Cal></div>
        </div>
        <ul className={s.logos}>{d.logos.map((l) => <li key={l.alt}><img src={l.src} alt={l.alt} width="120" height="30" /></li>)}</ul>
      </header>

      <section className={s.intro}><p className={s.introP}>{d.hero.sub}</p></section>

      <section className={s.split}>
        <div><h2 className={s.h2}>{d.quiz.h2}</h2><p className={s.body}>{d.quiz.body}</p></div>
        <Quiz />
      </section>

      <section className={s.sec}>
        <h2 className={s.h2}>{d.deliverablesH2}</h2>
        <Open />
        {[[0, 1, 9, 5], [2, 3, 4, 8], [6, 7, 10, 11]].map((g, gi) => (
          <ol key={gi} className={s.stack} style={{ '--g': gi }}>
            {g.map((i) => { const x = d.deliverables[i]; return (
              <li key={x.title}><div className={s.art} data-art tabIndex={0}>
                <Thumb kind={kinds[i]} className={s.doc} />
                <h3 className={s.artT}>{x.title}</h3>
                <div className={s.artD}><p>{x.desc}</p></div>
              </div></li>) })}
          </ol>
        ))}
      </section>

      <section className={s.sec} id="how">
        <h2 className={s.h2}>{d.timelineH2}</h2>
        <Track />
      </section>

      <section className={s.sec}>
        <h2 className={s.h2}>{d.beforeAfterH2}</h2>
        <Sharpen rows={d.rows} />
      </section>

      <section className={s.sec} id="pricing">
        <h2 className={s.h2}>{d.pricingH2}</h2>
        <div className={s.pricing} data-pricing>
          <Tiers />
          <div className={s.switch} role="radiogroup" aria-label="Choose a sprint">
            <span className={s.thumb} data-thumb aria-hidden="true" />
            {d.tiers.map((t, i) => (
              <label key={t.id} className={s.opt}><input type="radio" name="tier" value={t.id} defaultChecked={!i} className={s.radio} /><span>{t.name}</span></label>
            ))}
          </div>
          <div className={s.tierWrap}>
            <svg viewBox="0 0 200 200" className={s.ground} aria-hidden="true">
              <defs><pattern id="g2" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" className={s.dot} /></pattern></defs>
              <rect width="200" height="200" fill="url(#g2)" />
              <rect x="10" y="10" width="180" height="180" className={s.wall} data-wall />
              <rect x="70" y="70" width="60" height="60" className={s.plotSvg} data-plot />
            </svg>
            {d.tiers.map((t, i) => (
              <article key={t.id} className={`${s.tier} ${i ? s.tierB : s.tierA}`}>
                <h3 className={s.tierName}>{t.name}</h3>
                <p className={s.price}>{t.price}</p>
                <p className={s.body}>{t.blurb}</p>
                <ul className={s.ticks}>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
                <Picker max={i ? 3 : 1} />
                <Cal className={s.btn}>{t.cta}</Cal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.quoteSec}>
        <figure className={s.fig}>
          <blockquote className={s.quote}>
            {d.testimonial.paras.map((p, i) => <p key={i}>{p.map(([b, t], j) => b ? <strong key={j}>{t}</strong> : <span key={j}>{t}</span>)}</p>)}
          </blockquote>
          <figcaption className={s.who}><img src={d.testimonial.img} alt="" width="48" height="48" /><span>{d.testimonial.name}, {d.testimonial.role}</span></figcaption>
        </figure>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2}>{d.faqH2}</h2>
        <div className={s.faq}>
          {Object.entries(d.faqs).map(([cat, items]) => (
            <div key={cat} className={s.faqGroup}>
              {items.map(([q, a]) => (
                <details key={q} className={s.faqItem}>
                  <summary className={s.faqQ}>{q}</summary>
                  <p className={s.faqA}>{a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={s.final} id="book">
        <h2 className={s.h2xl}>{d.finalCta.h2}</h2>
        <Cal className={s.btn}>Book your call</Cal>
      </section>
      <footer className={s.foot}><Logo className={s.lock} /><a href="mailto:blake@boundset.com" className={s.navLink}>blake@boundset.com</a></footer>
    </main>
  )
}
