'use client'
import { useEffect, useRef } from 'react'
import { milestones, phases } from '../_shared/data'
import s from './c2.module.css'
import { reduced } from './spring'

// Sticky card stack. Each step is a sticky card; the next one slides over it as you scroll.
// rAF-throttled scroll handler writes the active step to the rail and a depth to each covered card
// (covered cards recede: scale + dim). Without JS or with reduced motion it is a plain list.
export default function Stack() {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current, cards = [...el.querySelectorAll('[data-card]')], ticks = [...el.querySelectorAll('[data-tick]')]
    const phaseEls = [...el.querySelectorAll('[data-phase]')]
    if (reduced()) return
    el.setAttribute('data-live', '')
    let raf = 0, cur = -1
    const run = () => {
      raf = 0
      const vh = innerHeight
      let active = 0
      const tops = cards.map((c) => c.getBoundingClientRect().top)
      cards.forEach((c, i) => { const stick = parseFloat(getComputedStyle(c).top); if (tops[i] <= stick + 2 || tops[i] < vh * 0.55) active = i })
      cards.forEach((c, i) => {
        // progress of the next card over this one (0..1) for a continuous recede
        const next = tops[i + 1], stick = parseFloat(getComputedStyle(c).top)
        const p = next === undefined ? 0 : Math.min(1, Math.max(0, 1 - (next - stick) / (vh * 0.6)))
        const depth = Math.max(0, active - i - 1) + p
        c.style.setProperty('--d', Math.min(depth, 3).toFixed(3))
      })
      if (active !== cur) {
        cur = active
        ticks.forEach((t, i) => { t.toggleAttribute('data-done', i < active); t.toggleAttribute('data-on', i === active) })
        const ph = milestones[active].phase
        phaseEls.forEach((p) => p.toggleAttribute('data-on', p.dataset.phase === ph))
        el.style.setProperty('--prog', (active / (cards.length - 1)).toFixed(4))
      }
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  const n = milestones.length
  return (
    <div className={s.tl} ref={root}>
      <div className={s.rail} aria-hidden="true">
        <div className={s.railIn}>
          {phases.map((p) => {
            const idx = milestones.map((m, i) => [m, i]).filter(([m]) => m.phase === p)
            return (
              <div key={p} className={s.rPhase} data-phase={p}>
                <span className={s.rLabel}>{p}</span>
                <span className={s.rTicks}>{idx.map(([, i]) => <i key={i} data-tick />)}</span>
              </div>
            )
          })}
        </div>
      </div>
      <ol className={s.cards}>
        {milestones.map((m, i) => (
          <li key={m.title} className={s.card} data-card style={{ '--i': i }}>
            <div className={s.cardIn}>
              <p className={s.cMeta}><span>{m.phase}</span><span className={s.cNum}>{String(i + 1).padStart(2, '0')}<span className={s.cOf}> / {n}</span></span></p>
              <h3 className={s.cT}>{m.title}</h3>
              <p className={s.cD}>{m.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
