'use client'
import { useState } from 'react'
import s from './c2.module.css'
import { assets } from '../_shared/data'
export default function Picker({ max }) {
  const [sel, setSel] = useState([])
  return (
    <ul className={s.chips} data-full={sel.length >= max || undefined}>
      {assets.map((a) => {
        const on = sel.includes(a), off = !on && sel.length >= max
        return <li key={a}><button type="button" aria-pressed={on} aria-disabled={off} className={s.chip}
          onClick={() => { if (off) return; setSel((p) => on ? p.filter((x) => x !== a) : [...p, a]) }}>{a}</button></li>
      })}
    </ul>
  )
}
