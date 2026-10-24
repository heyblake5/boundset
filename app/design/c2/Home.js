import s from './c2.module.css'
import { serif, sans } from './fonts'
import * as d from '../_shared/data'
import Cal from '../_shared/Cal'
import Scroll from '../_shared/Scroll'
import Field from './Field'
import Sharpen from './Sharpen'
import Tiers from './Tiers'
import Picker from './Picker'
import Nav from './Nav'
import Logo from './Logo'
import Icon from './Icons'
import Open from './Open'
import Stack from './Stack'
import Buy from './Buy'
import { SHOW_WORKSHOP } from './workshop'
import Footer from './Footer'

// Headlines carry no periods or commas (Blake, Oct 24). Applied at render so shared data stays intact.
const H = (t) => t.replace(/[.,]/g, '')
const ICONS = ['workshop', 'grid', 'matrix', 'usecase', 'mvm', 'canvas', 'copy', 'wire', 'voice', 'audit', 'asset', 'slack']
const GROUPS = [[0, 1, 9, 5], [2, 3, 4, 8], [6, 7, 10, 11]] // strategy · messaging · assets
// Workshop offer copy: quill-atlas.md / heath.md (approved Oct 21).
const WORKSHOP = { h: 'Start with the workshop', sub: '$2,000, credited in full to the sprint if you continue within 30 days.', items: ['Research', '90-minute positioning workshop', 'Written positioning brief'] }


const FAQ_LD = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: Object.values(d.faqs).flat().map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }

export default function C2() {
  return (
    <main className={`${s.root} ${serif.variable} ${sans.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <Nav logo={<Logo className={s.lock} />} /><Scroll />

      <header className={s.hero}>
        <Field />
        <div className={s.heroIn}>
          <h1 className={s.h1}>{H(d.hero.h1)}</h1>
          <div className={s.ctas} data-hero-cta><Cal className={s.btn}>Book a free 1:1 consultation</Cal></div>
        </div>
        <ul className={s.logos}>{d.logos.map((l) => <li key={l.alt}><img src={l.src} alt={l.alt} width="120" height="30" /></li>)}</ul>
      </header>

      <section className={s.intro}><p className={s.introP}>{d.hero.sub}</p></section>

      <section className={s.sec} id="included">
        <h2 className={s.h2}>{H(d.deliverablesH2)}</h2>
        <Open />
        <div className={s.dGrid}>
          {GROUPS.map((g, gi) => (
            <ol key={gi} className={s.dCol} style={{ '--g': gi }}>
              {g.map((i) => { const x = d.deliverables[i]; return (
                <li key={x.title} className={s.dItem}>
                  <h3 className={s.dH}><button type="button" className={s.dBtn} data-art aria-expanded="false" aria-controls={`dl-${i}`}>
                    <span className={s.dIco}><Icon name={ICONS[i]} /></span><span className={s.dT}>{H(x.title)}</span><span className={s.plus} aria-hidden="true" />
                  </button></h3>
                  <div className={s.artD} id={`dl-${i}`}><p>{x.desc}</p></div>
                </li>) })}
            </ol>
          ))}
        </div>
      </section>

      <section className={`${s.sec} ${s.tlSec}`} id="how">
        <h2 className={s.h2}>{H(d.timelineH2)}</h2>
        <Stack />
      </section>

      <section className={s.quoteSec}>
        <figure className={s.fig}>
          <blockquote className={s.quote}>
            {d.testimonial.paras.map((p, i) => <p key={i}>{p.map(([b, t], j) => b ? <strong key={j}>{t}</strong> : <span key={j}>{t}</span>)}</p>)}
          </blockquote>
          <figcaption className={s.who}><img src={d.testimonial.img} alt="" width="48" height="48" loading="lazy" /><span>{d.testimonial.name}, {d.testimonial.role}</span></figcaption>
        </figure>
      </section>

      <section className={s.sec}>
        <h2 className={s.h2}>{H(d.beforeAfterH2)}</h2>
        <Sharpen rows={d.rows} />
      </section>

      <section className={s.sec} id="pricing">
        <h2 className={s.h2}>{H(d.pricingH2)}</h2>
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
        {SHOW_WORKSHOP && <aside className={s.ws} id="workshop" aria-labelledby="ws-h">
          <div className={s.wsHead}>
            <h3 id="ws-h" className={s.wsH}>{WORKSHOP.h}</h3>
            <p className={s.wsSub}>{WORKSHOP.sub}</p>
          </div>
          <ul className={s.wsList}>{WORKSHOP.items.map((x) => <li key={x}><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.25 3 3 6-6.5" fill="none" stroke="var(--sig)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{x}</li>)}</ul>
          <Buy className={s.btn}>Buy the workshop</Buy>
        </aside>}
      </section>

      <section className={`${s.sec} ${s.faqSec}`} id="faq">
        <h2 className={`${s.h2} ${s.faqH}`}>FAQs about the sprint</h2>
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
        <h2 className={s.h2xl}>{H(d.finalCta.h2)}</h2>
        <Cal className={s.btn}>Book your call</Cal>
      </section>
      <Footer />
    </main>
  )
}
