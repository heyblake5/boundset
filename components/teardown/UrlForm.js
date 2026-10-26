'use client'
import { useState } from 'react'
import s from './td.module.css'
import Icon from '../../app/design/c2/Icons'
import { COPY } from './copy'

// Client-side check only (server re-checks everything). Returns normalized URL or null.
export function clientNormalize(v) {
  let s0 = String(v || '').trim(); if (!s0) return null
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s0)) s0 = 'https://' + s0
  let u; try { u = new URL(s0) } catch { return null }
  if (!/^https?:$/.test(u.protocol) || u.username || u.password) return null
  const h = u.hostname.toLowerCase().replace(/^\[|\]$/g, '')
  if (!h.includes('.') || /^[\d.]+$/.test(h) || h.includes(':') || /(^|\.)localhost$/.test(h)) return null
  u.hostname = h; return u.toString()
}

export function UrlForm({ onSubmit, disabled, initial = '', name }) {
  const [v, setV] = useState(initial), [bad, setBad] = useState(false)
  return (
    <form className={s.form} noValidate onSubmit={(e) => {
      e.preventDefault(); if (disabled) return
      const u = clientNormalize(v); if (!u) { setBad(false); requestAnimationFrame(() => setBad(true)); return }
      onSubmit(u, e.currentTarget.company_hp?.value || '')
    }}>
      <div className={s.field} data-bad={bad || undefined} onAnimationEnd={() => setBad(false)}>
        <input className={s.in} name={name || 'url'} type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck="false" placeholder={COPY.placeholder} aria-label={COPY.inputLabel} aria-invalid={bad || undefined} value={v} onChange={(e) => setV(e.target.value)} />
        <button className={s.go} type="submit" aria-label={COPY.submitLabel} aria-disabled={disabled || undefined}><Icon name="arrow" size={22} /></button>
      </div>
      <input className={s.hp} name="company_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </form>
  )
}


