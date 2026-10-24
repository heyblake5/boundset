'use client'
import { useEffect } from 'react'
// Writes --p (0..1 progress through viewport) on [data-p] elements. One rAF-throttled listener.
export default function Scroll() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-p]')]
    let t = 0
    const run = () => { t = 0; const vh = innerHeight; els.forEach((el) => { const r = el.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))); el.style.setProperty('--p', p.toFixed(3)) }) }
    const on = () => { if (!t) t = requestAnimationFrame(run) }
    run(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
  return null
}
