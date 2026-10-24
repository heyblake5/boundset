'use client'
import { useState } from 'react'
import t from '../tools.module.css'
import { Field, Check } from './ui'
import { words, hits, JARGON } from './text'
// Three market strategies (head-to-head, subcategory, new category) as described in April Dunford's
// "Obviously Awesome". Rules are a transparent decision aid, not a prediction.
const Q = [
  ['search', 'Buyers already use a category name to look for products like yours'],
  ['leader', 'There is a clear leader in that category'],
  ['win', 'You can beat the leader on the attributes buyers say matter most'],
  ['segment', 'A specific segment has needs the leader serves poorly'],
  ['new', 'Your approach solves the problem in a way no existing category describes'],
]
const R = {
  h2h: ['Compete head-to-head', 'Use the existing category name and win on the attributes buyers already rank first.'],
  sub: ['Own a subcategory', 'Keep the known category, narrow it to the segment you serve best, and say so in the name.'],
  new: ['Create a new category', 'Name the new approach and expect to spend effort teaching buyers why it matters.'],
}
export default function Category() {
  const [a, setA] = useState({}), [name, setName] = useState('')
  const pick = () => {
    if (a.new && !a.search) return 'new'
    if (a.search && (!a.leader || a.win)) return 'h2h'
    if (a.search && a.leader && a.segment) return 'sub'
    if (a.new) return 'new'
    return a.search ? 'sub' : 'new'
  }
  const done = Q.every(([k]) => k in a), r = R[pick()], w = words(name)
  return (
    <div className={t.cols}>
      <div className={t.form}>
        {Q.map(([k, q]) => (
          <fieldset key={k} className={t.fld}><legend className={t.lbl} style={{ marginBottom: 8 }}>{q}</legend>
            <div className={t.btns}>{[['Yes', true], ['No', false]].map(([l, val]) => (
              <label key={l} className={t.chk} style={{ border: 0, padding: '4px 16px 4px 0' }}><input type="radio" name={k} className={`${t.box} ${t.radio}`} checked={a[k] === val} onChange={() => setA({ ...a, [k]: val })} />{l}</label>))}</div>
          </fieldset>
        ))}
        <Field id="cat" label="Candidate category name" placeholder="e.g. positioning sprint" value={name} onChange={setName} />
      </div>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}><p className={t.pLbl}>{done ? 'Suggested strategy' : `Answer all ${Q.length} questions`}</p>
          {done ? <><p className={t.big}>{r[0]}</p><p className={t.mid} style={{ marginTop: 8, color: 'var(--mute)' }}>{r[1]}</p></> : <div className={t.bar}><i style={{ transform: `scaleX(${Object.keys(a).length / Q.length})` }} /></div>}
        </div>
        {!!name.trim() && <div className={t.panel}><p className={t.pLbl}>Category name check</p><p className={t.big}>{name}</p>
          <ul className={t.checks}>
            <Check ok={w.length >= 1 && w.length <= 3} label="One to three words" val={`${w.length} words`} />
            <Check ok={!hits(name, JARGON).length} label="No jargon" val={hits(name, JARGON).join(', ') || 'none'} />
            <Check ok={!/[A-Z]{2,}|™|®/.test(name)} label="No acronyms or trademarks" val="" />
          </ul></div>}
      </div>
    </div>
  )
}
