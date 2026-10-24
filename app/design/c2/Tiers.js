'use client'
import { useEffect, useRef } from 'react'
import { animate } from './spring'
import s from './c2.module.css'
// Enhances the CSS-only radio switch: a sprung thumb and a plot that grows
// from one staked square into a walled stronghold.
export default function Tiers() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current.closest('[data-pricing]')
    const thumb = root.querySelector('[data-thumb]'), opts = [...root.querySelectorAll('input[name=tier]')]
    const plot = root.querySelector('[data-plot]'), wall = root.querySelector('[data-wall]')
    const st = { x: { tx: 0, tw: 0, g: 0 }, v: {}, raf: 0 }
    const frame = (x) => {
      thumb.style.transform = `translateX(${x.tx}px)`; thumb.style.width = `${x.tw}px`
      const size = 60 + x.g * 100, o = 100 - size / 2
      plot.setAttribute('x', o); plot.setAttribute('y', o); plot.setAttribute('width', size); plot.setAttribute('height', size)
      wall.style.opacity = Math.max(0, Math.min(1, x.g)); wall.style.transform = `scale(${0.85 + 0.15 * x.g})`
    }
    const go = (jump) => {
      const i = opts.findIndex((o) => o.checked), lab = opts[i].parentElement
      const t = { tx: lab.offsetLeft, tw: lab.offsetWidth, g: i }
      if (jump) { Object.assign(st.x, t); frame(st.x) } else animate(st, t, frame, 220, 20)
    }
    root.dataset.js = ''; go(true)
    const on = () => go(false); opts.forEach((o) => o.addEventListener('change', on))
    const ro = new ResizeObserver(() => go(true)); ro.observe(thumb.parentElement)
    return () => { opts.forEach((o) => o.removeEventListener('change', on)); ro.disconnect() }
  }, [])
  return <span ref={ref} hidden />
}
