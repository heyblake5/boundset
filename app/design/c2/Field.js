'use client'
import { useEffect, useRef } from 'react'
import { animate } from './spring'
import s from './c2.module.css'
// Hero ground: drag across the grid to stake out a plot. One plot at a time,
// because positioning is choosing. Arrow keys move it, Shift+arrows resize it.
const G = 40
export default function Field() {
  const ref = useRef(null), plot = useRef(null)
  useEffect(() => {
    const el = ref.current, p = plot.current
    const st = { x: { x: 0, y: 0, w: 0, h: 0 }, v: {}, raf: 0 }
    const draw = (b) => { p.style.transform = `translate(${b.x}px,${b.y}px)`; p.style.width = `${Math.max(0, b.w)}px`; p.style.height = `${Math.max(0, b.h)}px` }
    const r = () => el.getBoundingClientRect()
    const snap = (v) => Math.round(v / G) * G
    let cur
    const place = (b, jump) => { cur = b; if (jump) { Object.assign(st.x, b); draw(b) } else animate(st, b, draw) }
    const init = () => { const { width, height } = r(); const w = width > 900 ? G * 5 : G * 3; place({ x: snap(width * (width > 900 ? 0.68 : 0.5)), y: snap(height * 0.18), w, h: w }, false) }
    st.x = { x: snap(r().width * 0.7) + G * 2.5, y: snap(r().height * 0.18) + G * 2.5, w: 0, h: 0 }
    const t0 = setTimeout(init, 350)
    let start = null, id
    const down = (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') { const b = r(); const x = snap(e.clientX - b.left - G), y = snap(e.clientY - b.top - G); place({ x, y, w: G * 2, h: G * 2 }); return }
      if (e.button !== 0 || e.target.closest('a,button')) return
      const b = r(); start = { x: snap(e.clientX - b.left), y: snap(e.clientY - b.top) }; id = e.pointerId; el.setPointerCapture(id); el.dataset.drag = ''
      place({ ...start, w: 0, h: 0 })
    }
    const move = (e) => {
      if (!start) return
      const b = r(); const x = snap(e.clientX - b.left), y = snap(e.clientY - b.top)
      place({ x: Math.min(x, start.x), y: Math.min(y, start.y), w: Math.max(G, Math.abs(x - start.x)), h: Math.max(G, Math.abs(y - start.y)) })
    }
    const up = () => { if (!start) return; start = null; delete el.dataset.drag; try { el.releasePointerCapture(id) } catch {} }
    const key = (e) => {
      const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (!d || !cur) return
      e.preventDefault(); const n = { ...cur }
      if (e.shiftKey) { n.w = Math.max(G, n.w + d[0] * G); n.h = Math.max(G, n.h + d[1] * G) } else { n.x += d[0] * G; n.y += d[1] * G }
      place(n)
    }
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('keydown', key)
    return () => { clearTimeout(t0); cancelAnimationFrame(st.raf); el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.removeEventListener('keydown', key) }
  }, [])
  return (
    <div ref={ref} className={s.field} tabIndex={0} role="application" aria-label="Positioning ground. Drag to claim a plot; arrow keys move it, Shift plus arrows resize it.">
      <div ref={plot} className={s.plot}><span className={s.flag} /></div>
    </div>
  )
}
