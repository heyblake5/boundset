'use client'
import { useState } from 'react'
import t from '../tools.module.css'
export function Field({ id, label, value, onChange, placeholder, area, type = 'text', ...rest }) {
  const P = { id, className: t.in, value: value ?? '', placeholder, onChange: (e) => onChange(e.target.value), ...rest }
  return <div className={t.fld}><label htmlFor={id} className={t.lbl}>{label}</label>{area ? <textarea {...P} /> : <input type={type} {...P} />}</div>
}
export function Copy({ text, label = 'Copy' }) {
  const [done, setDone] = useState(false)
  return <button type="button" className={t.btn} onClick={() => { navigator.clipboard?.writeText(text); setDone(true); setTimeout(() => setDone(false), 1600) }} aria-live="polite">{done ? 'Copied' : label}</button>
}
export function Check({ ok, label, val }) {
  return <li><span className={ok ? t.ok : t.warn} aria-hidden="true" /><span>{label}<span className={t.sr}>{ok ? ' passes' : ' needs work'}</span></span><span className={t.val}>{val}</span></li>
}
export const useForm = (init) => { const [v, setV] = useState(init); return [v, (k) => (x) => setV((o) => ({ ...o, [k]: x }))] }
