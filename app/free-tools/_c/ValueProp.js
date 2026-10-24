'use client'
import { useState } from 'react'
import t from '../tools.module.css'
import { Field, Check } from './ui'
import { JARGON, VAGUE, words, sentences, hits, highlight } from './text'
export default function ValueProp() {
  const [v, setV] = useState('')
  const w = words(v), s = sentences(v), j = hits(v, JARGON), vg = hits(v, VAGUE)
  const avg = s.length ? Math.round(w.length / s.length) : 0
  const you = w.filter((x) => ['you', 'your', "you're", 'you’re'].includes(x)).length, we = w.filter((x) => ['we', 'our', 'us', "we're", 'we’re'].includes(x)).length
  const c = [
    [w.length > 0 && w.length <= 40, 'Under 40 words', `${w.length} words`],
    [avg > 0 && avg <= 20, 'Average sentence under 20 words', avg ? `${avg} avg` : '–'],
    [!j.length, 'No jargon', j.length ? `${j.length} found` : 'none'],
    [vg.length <= 1, 'At most one vague word', vg.join(', ') || 'none'],
    [you >= we, 'Says "you" at least as often as "we"', `${you} you · ${we} we`],
    [/\d/.test(v), 'Contains a concrete number', /\d/.test(v) ? 'yes' : 'no'],
  ]
  const score = w.length ? Math.round((c.filter((x) => x[0]).length / c.length) * 100) : 0
  return (
    <div className={t.cols}>
      <div className={t.form}><Field id="vp" area label="Value proposition" placeholder="Paste your homepage subhead or value proposition" value={v} onChange={setV} rows={6} /></div>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}>
          <p className={t.pLbl}>Clarity score</p><p className={t.score}>{score}<span className={t.of}> / 100</span></p>
          <div className={t.bar}><i style={{ transform: `scaleX(${score / 100})` }} /></div>
          <ul className={t.checks}>{c.map(([ok, l, val]) => <Check key={l} ok={w.length ? ok : false} label={l} val={val} />)}</ul>
        </div>
        {!!v && <div className={t.panel}><p className={t.pLbl}>Jargon and vague words highlighted</p><p className={t.mid}>{highlight(v, [...JARGON, ...VAGUE]).map(([m, x], i) => m ? <mark key={i} className={t.mark}>{x}</mark> : <span key={i}>{x}</span>)}</p></div>}
      </div>
    </div>
  )
}
