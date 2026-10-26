import { Fraunces, IBM_Plex_Mono } from 'next/font/google'
import s from './a.module.css'
import * as d from '../_shared/data'
import Cal from '../_shared/Cal'
import Quiz from '../_shared/Quiz'
import Faq from '../_shared/Faq'
import Reveal from '../_shared/Reveal'
import Scroll from '../_shared/Scroll'
import TerritoryMap from './Map'
import Picker from './Pricing'

const serif = Fraunces({ subsets: ['latin'], axes: ['opsz', 'SOFT'], variable: '--serif', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--mono', display: 'swap' })
export const metadata = { title: 'Boundset · Direction A · Territory', robots: { index: false, follow: false } }

export default function A() {
  return (
    <main className={`${s.root} ${serif.variable} ${mono.variable}`}>
      <Reveal /><Scroll />
      <nav className={s.nav}>
        <a href="/design/a" className={s.logo}>boundset</a>
        <div className={s.navR}><Cal className={s.btnSm}>Book a call</Cal></div>
      </nav>

      <header className={s.hero}>
        <div className={s.heroText}>
          <h1 className={s.h1}>{d.hero.h1}</h1>
          <p className={s.lede}>{d.hero.sub}</p>
          <div className={s.ctas}><Cal className={s.btn}>Book a free 1:1 consultation</Cal></div>
        </div>
        <TerritoryMap />
        <ul className={s.logos}>{d.logos.map((l) => <li key={l.alt}><img src={l.src} alt={l.alt} width="120" height="30" /></li>)}</ul>
      </header>

      <section className={s.split} data-r>
        <div><h2 className={s.h2}>{d.quiz.h2}</h2><p className={s.body}>{d.quiz.body}</p></div>
        <Quiz cls={s} />
      </section>

      <section className={s.sec}>
        <h2 className={s.h2} data-r>{d.deliverablesH2}</h2>
        <ol className={s.parcels}>
          {d.deliverables.map((x, i) => (
            <li key={x.title} className={s.parcel} data-r style={{ '--i': i }}>
              <span className={s.coord} aria-hidden="true">{String.fromCharCode(65 + Math.floor(i / 3))}{(i % 3) + 1}</span>
              <h3 className={s.h3}>{x.title}</h3><p className={s.small}>{x.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.sec} id="how">
        <h2 className={s.h2} data-r>{d.timelineH2}</h2>
        <div className={s.route} data-p>
          <div className={s.rail} aria-hidden="true" />
          <ol className={s.stops}>
            {d.milestones.map((m, i) => (
              <li key={i} className={s.stop} data-r>
                <span className={s.phase}>{m.phase}</span>
                <div><h3 className={s.h3}>{m.title}</h3><p className={s.small}>{m.desc}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2} data-r>{d.beforeAfterH2}</h2>
        <div className={s.ba} role="table">
          <div role="row" className={s.baHead}><span role="columnheader">Without Boundset</span><span role="columnheader">With Boundset</span></div>
          {d.rows.map(([b, a], i) => (
            <div role="row" key={i} className={s.baRow} tabIndex={0}><span role="cell" className={s.baB}>{b}</span><span role="cell" className={s.baA}>{a}</span></div>
          ))}
        </div>
      </section>

      <section className={s.sec} id="pricing">
        <h2 className={s.h2} data-r>{d.pricingH2}</h2>
        <div className={s.tiers}>
          {d.tiers.map((t, i) => (
            <article key={t.id} className={`${s.tier} ${i ? s.tierBig : ''}`} data-r>
              <h3 className={s.tierName}>{t.name}</h3>
              <p className={s.price}>{t.price}</p>
              <p className={s.body}>{t.blurb}</p>
              <ul className={s.ticks}>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <Picker max={i ? 3 : 1} />
              <Cal className={i ? s.btnInv : s.btn}>{t.cta}</Cal>
            </article>
          ))}
        </div>
      </section>

      <section className={s.quoteSec} data-r>
        <blockquote className={s.quote}>
          {d.testimonial.paras.map((p, i) => <p key={i}>{p.map(([b, t], j) => b ? <strong key={j}>{t}</strong> : <span key={j}>{t}</span>)}</p>)}
        </blockquote>
        <figure className={s.who}><img src={d.testimonial.img} alt="" width="64" height="64" /><figcaption><strong>{d.testimonial.name}</strong><span>{d.testimonial.role}</span></figcaption></figure>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2} data-r>{d.faqH2}</h2>
        <Faq cls={s} />
      </section>

      <section className={s.final} id="book">
        <svg className={s.finalLine} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true" data-p><path d="M0 80 C200 20 360 110 600 60 S1000 10 1200 70" pathLength="1" /></svg>
        <h2 className={s.h2xl}>{d.finalCta.h2}</h2>
        <p className={s.lede}>{d.finalCta.sub}</p>
        <Cal className={s.btnInv}>Book your call</Cal>
      </section>
      <footer className={s.foot}><span className={s.logo}>boundset</span><a href="mailto:blake@boundset.com">blake@boundset.com</a></footer>
    </main>
  )
}
