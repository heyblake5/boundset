'use client'
import { useEffect } from 'react'
// Adds .in to [data-r] elements as they enter view. Content is visible by default;
// html.js gates the pre-reveal state so no-JS users see everything.
export default function Reveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    const els = document.querySelectorAll('[data-r]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -10% 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
  return null
}
