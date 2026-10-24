'use client'
import { useState } from 'react'
import { quiz } from '../_shared/data'
import s from './c2.module.css'
export default function Quiz() {
  const [on, setOn] = useState(() => new Set())
  const score = on.size, verdict = quiz.result(score)
  return (
    <div className={s.quiz} style={{ '--score': score }}>
      <ul className={s.qlist}>
        {quiz.questions.map((q, i) => (
          <li key={i}>
            <label className={s.qitem}>
              <input type="checkbox" className={s.qbox} onChange={() => setOn((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n })} />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className={s.meter} aria-hidden="true">{quiz.questions.map((_, i) => <i key={i} data-on={i < score || undefined} />)}</div>
      <p className={s.verdict} aria-live="polite" data-score={score}>{verdict ? <><span className={s.vnum}>{score}/8</span> {verdict}</> : null}</p>
    </div>
  )
}
