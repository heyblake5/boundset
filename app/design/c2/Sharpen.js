'use client'
import { useState } from 'react'
import s from './c2.module.css'
// Each vague claim is a button. Press (or hover with a fine pointer) to sharpen it.
export default function Sharpen({ rows }) {
  const [on, setOn] = useState(() => new Set())
  const set = (i, v) => setOn((p) => { if (p.has(i) === v) return p; const n = new Set(p); v ? n.add(i) : n.delete(i); return n })
  return (
    <ol className={s.morph}>
      {rows.map(([b, a], i) => (
        <li key={i} className={s.mRow} data-on={on.has(i) || undefined}>
          <button type="button" className={s.mBtn} aria-pressed={on.has(i)} onClick={() => set(i, !on.has(i))}
            onPointerEnter={(e) => e.pointerType === 'mouse' && set(i, true)}>
            <span className={s.mB}>{b}</span><span className={s.mA}>{a}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
