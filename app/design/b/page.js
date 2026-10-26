import { Archivo, JetBrains_Mono } from 'next/font/google'
import s from './b.module.css'
import * as d from '../_shared/data'
import Cal from '../_shared/Cal'
import Quiz from '../_shared/Quiz'
import Faq from '../_shared/Faq'
import Reveal from '../_shared/Reveal'
import Scroll from '../_shared/Scroll'
import Cut from './Cut'
import Picker from './Picker'

const sans = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--mono', display: 'swap' })
export const metadata = { title: 'Boundset · Direction B · Ground Rules', robots: { index: false, follow: false } }
const span = { Before: [0, 1], 'Week 1': [1, 2], 'Week 2': [2, 3], After: [3, 4] }

export default function B() {
  return (
    <main className={`${s.root} ${sans.variable} ${mono.variable}`}>
      <Reveal /><Scroll />
      <nav className={s.nav}>
        <a href="/design/b" className={s.logo}>boundset</a>
        <div className={s.navR}><Cal className={s.navCta}>Book a call</Cal></div>
      </nav>

      <header className={s.hero}>
        <h1 className={s.h1}>{d.hero.h1.split(' ').map((w, i) => <span key={i}><span className={s.hw}>{w}</span>{' '}</span>)}</h1>
        <div className={s.heroGrid}>
          <p className={s.lede}>{d.hero.sub}</p>
          <div className={s.ctas}><Cal className={s.btn}>Book a free 1:1 consultation <span aria-hidden="true">→</span></Cal></div>
        </div>
        <ul className={s.logos}>{d.logos.map((l) => <li key={l.alt}><img src={l.src} alt={l.alt} width="120" height="30" /></li>)}</ul>
      </header>

      <section className={s.cutSec}>
        <Cut />
      </section>

      <section className={s.sec}>
        <div className={s.cols}>
          <h2 className={s.h2}>{d.quiz.h2}</h2>
          <div><p className={s.body}>{d.quiz.body}</p><Quiz cls={s} /></div>
        </div>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2big} data-r>{d.deliverablesH2}</h2>
        <ol className={s.index}>
          {d.deliverables.map((x, i) => (
            <li key={x.title} className={s.idx} tabIndex={0}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={s.h3}>{x.title}</h3>
              <p className={s.idxDesc}>{x.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.sec} id="how">
        <h2 className={s.h2big} data-r>{d.timelineH2}</h2>
        <div className={s.gantt} data-p>
          <div className={s.gHead}>{d.phases.map((p) => <span key={p}>{p}</span>)}</div>
          {d.milestones.map((m, i) => (
            <div key={i} className={s.gRow} style={{ '--a': span[m.phase][0], '--n': i }}>
              <div className={s.gBar}><h3 className={s.gTitle}>{m.title}</h3><p className={s.gDesc}>{m.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2big} data-r>{d.beforeAfterH2}</h2>
        <div className={s.ba} role="table">
          <div role="row" className={s.baHead}><span role="columnheader">Without Boundset</span><span role="columnheader">With Boundset</span></div>
          {d.rows.map(([b, a], i) => <div role="row" key={i} className={s.baRow} tabIndex={0}><span role="cell">{b}</span><span role="cell">{a}</span></div>)}
        </div>
      </section>

      <section className={s.sec} id="pricing">
        <h2 className={s.h2big} data-r>{d.pricingH2}</h2>
        <div className={s.tiers}>
          {d.tiers.map((t, i) => (
            <article key={t.id} className={`${s.tier} ${i ? s.tierB : ''}`}>
              <h3 className={s.tierName}>{t.name}</h3>
              <p className={s.price}>{t.price}</p>
              <p className={s.body}>{t.blurb}</p>
              <ul className={s.ticks}>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <Picker max={i ? 3 : 1} />
              <Cal className={s.btn}>{t.cta} <span aria-hidden="true">→</span></Cal>
            </article>
          ))}
        </div>
      </section>

      <section className={s.quoteSec}>
        <blockquote className={s.quote}>
          {d.testimonial.paras.map((p, i) => <p key={i}>{p.map(([b, t], j) => b ? <strong key={j}>{t}</strong> : <span key={j}>{t}</span>)}</p>)}
        </blockquote>
        <figure className={s.who}><img src={d.testimonial.img} alt="" width="72" height="72" /><figcaption><strong>{d.testimonial.name}</strong> {d.testimonial.role}</figcaption></figure>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2big} data-r>{d.faqH2}</h2>
        <Faq cls={s} />
      </section>

      <section className={s.final} id="book">
        <h2 className={s.h2final}>{d.finalCta.h2}</h2>
        <div className={s.heroGrid}><p className={s.lede}>{d.finalCta.sub}</p><div className={s.ctas}><Cal className={s.btnInv}>Book your call <span aria-hidden="true">→</span></Cal></div></div>
      </section>
      <footer className={s.foot}><span>boundset</span><a href="mailto:blake@boundset.com">blake@boundset.com</a></footer>
    </main>
  )
}
