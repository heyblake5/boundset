'use client'
import { useState } from 'react'
import t from '../tools.module.css'
import { quiz } from '../../design/_shared/data'
// The red flags and score bands are the existing site copy (data.quiz). No email, nothing sent.
export default function Debt() {
  const [on, setOn] = useState([])
  const n = on.length, verdict = quiz.result(n)
  return (
    <div className={t.cols}>
      <fieldset className={t.form}><legend className={t.sr}>Red flags</legend>
        <div>{quiz.questions.map((q, i) => (
          <label key={q} className={t.chk}><input type="checkbox" className={t.box} checked={on.includes(i)} onChange={(e) => setOn(e.target.checked ? [...on, i] : on.filter((x) => x !== i))} />{q}</label>
        ))}</div>
      </fieldset>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}>
          <p className={t.pLbl}>Red flags</p><p className={t.score}>{n}<span className={t.of}> / {quiz.questions.length}</span></p>
          <div className={t.bar}><i style={{ transform: `scaleX(${n / quiz.questions.length})` }} /></div>
          {verdict && <p className={t.big} style={{ marginTop: 24 }}>{verdict}</p>}
        </div>
      </div>
    </div>
  )
}
