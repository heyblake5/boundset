'use client'
import { useEffect } from 'react'
// Deliverables disclosure: one open at a time. Native buttons give Enter/Space; Escape closes.
export default function Open() {
  useEffect(() => {
    const btns = [...document.querySelectorAll('[data-art]')]
    const set = (b) => btns.forEach((x) => { const on = x === b; x.setAttribute('aria-expanded', on); x.closest('li').toggleAttribute('data-open', on) })
    const click = (e) => { const b = e.currentTarget; set(b.getAttribute('aria-expanded') === 'true' ? null : b) }
    const key = (e) => { if (e.key === 'Escape' && btns.some((b) => b.getAttribute('aria-expanded') === 'true')) set(null) }
    btns.forEach((b) => b.addEventListener('click', click)); document.addEventListener('keydown', key)
    return () => { btns.forEach((b) => b.removeEventListener('click', click)); document.removeEventListener('keydown', key) }
  }, [])
  return null
}
