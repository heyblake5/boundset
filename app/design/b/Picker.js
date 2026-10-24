'use client'
import { useState } from 'react'
import s from './b.module.css'
import { assets } from '../_shared/data'
export default function Picker({ max }) {
  const [sel, setSel] = useState([])
  return (
    <ul className={s.chips}>
      {assets.map((a) => {
        const on = sel.includes(a); const off = !on && sel.length >= max
        return <li key={a}><button type="button" aria-pressed={on} disabled={off} className={s.chip}
          onClick={() => setSel((p) => on ? p.filter((x) => x !== a) : p.length < max ? [...p, a] : p)}>{a}</button></li>
      })}
    </ul>
  )
}
