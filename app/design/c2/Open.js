'use client'
import { useEffect } from 'react'
// Tap/click/Enter opens one artifact at a time; Escape or a second tap closes it.
export default function Open() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-art]')]
    const set = (el) => els.forEach((e) => { const on = e === el; e.toggleAttribute('data-open', on); e.setAttribute('aria-expanded', on) })
    els.forEach((e) => { e.setAttribute('role', 'button'); e.setAttribute('aria-expanded', 'false') })
    const click = (e) => { const el = e.target.closest('[data-art]'); if (!el) return; set(el.hasAttribute('data-open') ? null : el) }
    const key = (e) => { const el = e.target.closest && e.target.closest('[data-art]'); if (e.key === 'Escape') set(null); else if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); set(el.hasAttribute('data-open') ? null : el) } }
    document.addEventListener('click', click); document.addEventListener('keydown', key)
    return () => { document.removeEventListener('click', click); document.removeEventListener('keydown', key) }
  }, [])
  return null
}
