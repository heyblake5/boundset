'use client'
import { useEffect } from 'react'
// Shows the nav CTA only once the hero CTA has left the viewport (one primary CTA per view).
export default function Nav() {
  useEffect(() => {
    const t = document.querySelector('[data-hero-cta]'), n = document.querySelector('[data-nav]')
    document.documentElement.classList.add('js')
    const io = new IntersectionObserver(([e]) => n.toggleAttribute('data-cta', !e.isIntersecting))
    io.observe(t); return () => io.disconnect()
  }, [])
  return null
}
