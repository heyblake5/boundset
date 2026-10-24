'use client'
import { useState } from 'react'
import t from '../tools.module.css'
import { Field, Check } from './ui'
import { JARGON, VAGUE, words, hits } from './text'
function test(h) {
  const w = words(h), j = hits(h, JARGON), v = hits(h, VAGUE)
  const c = [
    [w.length >= 3 && w.length <= 12, 'Between 3 and 12 words', `${w.length} words`],
    [h.length <= 70, 'Under 70 characters', `${h.length} chars`],
    [!/[.,]/.test(h), 'No periods or commas', /[.,]/.test(h) ? 'found' : 'none'],
    [!j.length, 'No jargon', j.join(', ') || 'none'],
    [v.length <= 1, 'At most one vague word', v.join(', ') || 'none'],
    [!/^(we|our|the best|welcome)\b/i.test(h.trim()), 'Does not open with "We", "Our", "The best" or "Welcome"', ''],
    [!/!/.test(h), 'No exclamation marks', ''],
  ]
  return { c, score: c.filter((x) => x[0]).length }
}
export default function Headline() {
  const [v, setV] = useState('')
  const lines = v.split('\n').map((x) => x.trim()).filter(Boolean).slice(0, 5)
  return (
    <div className={t.cols}>
      <div className={t.form}><Field id="h" area label="Headlines, one per line" placeholder={'Nail your positioning so your product sells itself'} value={v} onChange={setV} /></div>
      <div className={t.out} aria-live="polite">
        {!lines.length && <div className={t.panel}><p className={t.note}>Results appear here.</p></div>}
        {lines.map((h, i) => { const r = test(h); return (
          <div key={i} className={t.panel}>
            <p className={t.pLbl}>{r.score} / {r.c.length} checks</p><p className={t.big}>{h}</p>
            <div className={t.bar}><i style={{ transform: `scaleX(${r.score / r.c.length})` }} /></div>
            <ul className={t.checks}>{r.c.map(([ok, l, val]) => <Check key={l} ok={ok} label={l} val={val} />)}</ul>
          </div>) })}
      </div>
    </div>
  )
}
