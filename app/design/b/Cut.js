'use client'
import { useState } from 'react'
import s from './b.module.css'
// Positioning is subtraction. Tap the filler; what's left is the claim.
const parts = [
  ['We are ', 1], ['an ', 1], ['innovative, ', 1], ['AI-powered ', 1], ['all-in-one ', 1], ['platform ', 1], ['that ', 1], ['helps ', 0], ['seed-stage B2B founders ', 0],
  ['leverage ', 1], ['cutting-edge solutions to ', 1], ['explain what they do ', 0], ['and unlock ', 1], ['synergies, ', 1], ['in one sentence.', 0],
]
export default function Cut() {
  const [cut, setCut] = useState(() => new Set())
  const total = parts.filter((p) => p[1]).length
  const done = cut.size === total
  return (
    <div className={s.cut} data-done={done || undefined}>
      <p className={s.cutText}>
        {parts.map(([w, filler], i) => {
          const t = w.trim(), sp = /\s$/.test(w) ? ' ' : ''
          return filler
            ? <span key={i}><button type="button" className={s.word} aria-pressed={cut.has(i)} onClick={() => setCut((c) => { const n = new Set(c); n.has(i) ? n.delete(i) : n.add(i); return n })}>{t}</button>{sp}</span>
            : <span key={i} className={s.keep}>{t}{sp}</span>
        })}
      </p>
      <div className={s.meter} style={{ '--m': cut.size / total }} aria-hidden="true" />
      <p className={s.cutOut} aria-live="polite">{done ? 'Helps seed-stage B2B founders explain what they do in one sentence.' : `${total - cut.size} words left to cut`}</p>
      {done && <button type="button" className={s.reset} onClick={() => setCut(new Set())}>Again</button>}
    </div>
  )
}
