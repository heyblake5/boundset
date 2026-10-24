import { Instrument_Serif, Inter_Tight } from 'next/font/google'
import s from './c.module.css'
import * as d from '../_shared/data'
import Cal from '../_shared/Cal'
import Quiz from '../_shared/Quiz'
import Faq from '../_shared/Faq'
import Reveal from '../_shared/Reveal'
import Scroll from '../_shared/Scroll'
import Spot from './Spot'
import Picker from './Picker'

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--serif', display: 'swap' })
const sans = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--sans', display: 'swap' })
export const metadata = { title: 'Boundset · Direction C · Stronghold', robots: { index: false, follow: false } }

function Rings({ n }) {
  return (
    <svg viewBox="0 0 200 200" className={s.rings} aria-hidden="true">
      {[0, 1, 2].map((i) => <circle key={i} cx="100" cy="100" r={36 + i * 26} pathLength="1" className={i < n ? s.ringOn : s.ringOff} style={{ '--d': `${i * 160}ms` }} />)}
      <path d="M100 64 V100 M100 64 L118 70 L100 76" className={s.ringFlag} />
    </svg>
  )
}

export default function C() {
  const words = d.hero.h1.split(' ')
  return (
    <main className={`${s.root} ${serif.variable} ${sans.variable}`}>
      <Reveal /><Scroll /><Spot />
      <nav className={s.nav}>
        <a href="/design/c" className={s.logo}>boundset</a>
        <div className={s.navR}><a href="/quiz" className={s.navLink}>Take the quiz</a><Cal className={s.btnSm}>Book a call</Cal></div>
      </nav>

      <header className={s.hero} data-spot>
        <div className={s.topo} aria-hidden="true" />
        <div className={s.heroIn}>
          <h1 className={s.h1}>{words.map((w, i) => <span key={i}><span className={s.wm}><span className={s.w} style={{ '--i': i }}>{i === 5 || i === 6 ? <em>{w}</em> : w}</span></span>{' '}</span>)}</h1>
          <p className={s.lede}>{d.hero.sub}</p>
          <div className={s.ctas}><Cal className={s.btn}>Book a free 1:1 consultation</Cal><a href="/quiz" className={s.link}>Get your positioning score</a></div>
        </div>
        <ul className={s.logos}>{d.logos.map((l) => <li key={l.alt}><img src={l.src} alt={l.alt} width="120" height="30" /></li>)}</ul>
      </header>

      <section className={s.split}>
        <div data-r><h2 className={s.h2}>{d.quiz.h2}</h2><p className={s.body}>{d.quiz.body}</p></div>
        <Quiz cls={s} />
      </section>

      <section className={s.sec}>
        <h2 className={s.h2c} data-r>{d.deliverablesH2}</h2>
        <ul className={s.cards}>
          {d.deliverables.map((x, i) => (
            <li key={x.title} className={s.card} data-spot data-r style={{ '--i': i % 3 }}>
              <h3 className={s.h3}>{x.title}</h3><p className={s.small}>{x.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.sec} id="how">
        <h2 className={s.h2c} data-r>{d.timelineH2}</h2>
        <ol className={s.tl}>
          {d.phases.map((ph) => (
            <li key={ph} className={s.tlPhase} data-p>
              <h3 className={s.tlName}>{ph}</h3>
              <ol className={s.tlItems}>
                {d.milestones.filter((m) => m.phase === ph).map((m) => <li key={m.title} data-r><h4 className={s.h4}>{m.title}</h4><p className={s.small}>{m.desc}</p></li>)}
              </ol>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2c} data-r>{d.beforeAfterH2}</h2>
        <ol className={s.morph}>
          {d.rows.map(([b, a], i) => (
            <li key={i} className={s.mRow} data-p>
              <span className={s.mB}>{b}</span><span className={s.mA}>{a}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.sec} id="pricing">
        <h2 className={s.h2c} data-r>{d.pricingH2}</h2>
        <div className={s.pricing}>
          <div className={s.switch} role="radiogroup" aria-label="Choose a sprint">
            {d.tiers.map((t, i) => (
              <label key={t.id} className={s.opt}><input type="radio" name="tier" value={t.id} defaultChecked={!i} className={s.radio} /><span>{t.name} · {t.price}</span></label>
            ))}
          </div>
          {d.tiers.map((t, i) => (
            <article key={t.id} className={`${s.tier} ${i ? s.tierB : s.tierA}`}>
              <Rings n={i ? 3 : 1} />
              <div>
                <h3 className={s.tierName}>{t.name}</h3>
                <p className={s.price}>{t.price}</p>
                <p className={s.body}>{t.blurb}</p>
                <ul className={s.ticks}>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
                <Picker max={i ? 3 : 1} />
                <Cal className={s.btn}>{t.cta}</Cal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={s.quoteSec}>
        <blockquote className={s.quote} data-r>
          {d.testimonial.paras.map((p, i) => <p key={i}>{p.map(([b, t], j) => b ? <em key={j}>{t}</em> : <span key={j}>{t}</span>)}</p>)}
        </blockquote>
        <figure className={s.who}><img src={d.testimonial.img} alt="" width="56" height="56" /><figcaption><strong>{d.testimonial.name}</strong><span>{d.testimonial.role}</span></figcaption></figure>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2c} data-r>{d.faqH2}</h2>
        <Faq cls={s} />
      </section>

      <section className={s.final} id="book" data-spot>
        <div className={s.topo} aria-hidden="true" />
        <h2 className={s.h2xl}>{d.finalCta.h2}</h2>
        <p className={s.lede}>{d.finalCta.sub}</p>
        <Cal className={s.btn}>Book your call</Cal>
      </section>
      <footer className={s.foot}><span className={s.logo}>boundset</span><a href="mailto:blake@boundset.com">blake@boundset.com</a></footer>
    </main>
  )
}
