'use client'
import { useState } from 'react'
import { quiz } from './data'
// Checkbox list renders server-side; JS only adds the live verdict.
export default function Quiz({ cls = {} }) {
  const [on, setOn] = useState(() => new Set())
  const score = on.size
  const verdict = quiz.result(score)
  return (
    <div className={cls.quiz}>
      <ul className={cls.qlist}>
        {quiz.questions.map((q, i) => (
          <li key={i}>
            <label className={cls.qitem} data-on={on.has(i) || undefined}>
              <input type="checkbox" className={cls.qbox} onChange={() => setOn((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })} />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className={cls.verdict} aria-live="polite" data-score={score}>
        <span className={cls.vnum}>{score}/8</span> <span className={cls.vtxt}>{verdict || ''}</span>
      </p>
    </div>
  )
}
