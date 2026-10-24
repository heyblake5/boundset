'use client'
import { useRef, useState, useCallback } from 'react'
import s from './a.module.css'
// Competitors cluster in the generic corner. Drag the pin to claim ground; the
// boundary grows as you move away from the crowd.
const crowd = [[22, 70], [30, 62], [26, 78], [36, 72], [18, 60], [40, 80], [32, 54]]
export default function Map() {
  const ref = useRef(null)
  const [pin, setPin] = useState([30, 68])
  const near = crowd.reduce((m, [x, y]) => Math.min(m, Math.hypot(x - pin[0], y - pin[1])), 99)
  const r = Math.max(4, Math.min(22, near * 0.55))
  const claimed = near > 18
  const move = useCallback((e) => {
    const b = ref.current.getBoundingClientRect()
    const x = Math.min(94, Math.max(6, ((e.clientX - b.left) / b.width) * 100))
    const y = Math.min(94, Math.max(6, ((e.clientY - b.top) / b.height) * 100))
    setPin([x, y])
  }, [])
  const key = (e) => {
    const d = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -4], ArrowDown: [0, 4] }[e.key]
    if (!d) return
    e.preventDefault(); setPin(([x, y]) => [Math.min(94, Math.max(6, x + d[0])), Math.min(94, Math.max(6, y + d[1]))])
  }
  // irregular boundary polygon around pin
  const pts = Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; const w = 1 + 0.18 * Math.sin(i * 2.3) + 0.1 * Math.cos(i * 3.7); return `${pin[0] + Math.cos(a) * r * w},${pin[1] + Math.sin(a) * r * w}` }).join(' ')
  return (
    <div className={s.mapWrap}>
      <svg ref={ref} viewBox="0 0 100 100" className={s.map} data-claimed={claimed || undefined}
        role="slider" tabIndex={0} aria-label="Your position on the market map" aria-valuetext={claimed ? 'Claimed ground' : 'In the crowd'}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e) }}
        onPointerMove={(e) => { if (e.buttons) move(e) }} onKeyDown={key}>
        {[18, 30, 42, 54, 66].map((c, i) => (
          <ellipse key={i} cx="28" cy="68" rx={c * 0.9} ry={c * 0.62} className={s.contour} transform={`rotate(-18 28 68)`} />
        ))}
        <path d="M0 50 H100 M50 0 V100" className={s.axis} />
        {crowd.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.5" className={s.rival} />)}
        <polygon points={pts} className={s.claim} />
        <g transform={`translate(${pin[0]} ${pin[1]})`} className={s.pinG}>
          <path d="M0 0 L0 -7" className={s.pole} /><path d="M0 -7 L5 -5.5 L0 -4 Z" className={s.flag} /><circle r="1.4" className={s.pinDot} />
        </g>
        <text x="3" y="97" className={s.axt}>Sounds like everyone</text>
        <text x="97" y="6" textAnchor="end" className={s.axt}>Only you</text>
      </svg>
      <p className={s.mapRead} aria-live="polite">{claimed ? 'Ground claimed.' : 'Drag the flag out of the crowd.'}</p>
    </div>
  )
}
