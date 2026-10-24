'use client'
import { useEffect } from 'react'
// One delegated pointer listener: writes --x/--y on the nearest [data-spot] element.
export default function Spot() {
  useEffect(() => {
    let t = 0, ev
    const run = () => { t = 0; const el = ev.target.closest && ev.target.closest('[data-spot]'); if (!el) return; const r = el.getBoundingClientRect(); el.style.setProperty('--x', `${ev.clientX - r.left}px`); el.style.setProperty('--y', `${ev.clientY - r.top}px`) }
    const on = (e) => { ev = e; if (!t) t = requestAnimationFrame(run) }
    addEventListener('pointermove', on, { passive: true })
    return () => removeEventListener('pointermove', on)
  }, [])
  return null
}
