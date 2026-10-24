// Critically-damped-ish spring stepper shared by every motion on the page.
// One feel everywhere: stiffness 260, damping 28. Reduced motion snaps to target.
export const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
export function animate(state, targets, onFrame, k = 260, c = 28) {
  if (state.raf) cancelAnimationFrame(state.raf)
  if (reduced()) { Object.assign(state.x, targets); for (const key in targets) state.v[key] = 0; onFrame(state.x); return }
  let last = performance.now()
  const tick = (now) => {
    const dt = Math.min(0.032, (now - last) / 1000); last = now
    let moving = false
    for (const key in targets) {
      const x = state.x[key], v = state.v[key] || 0, t = targets[key]
      const a = -k * (x - t) - c * v
      const nv = v + a * dt, nx = x + nv * dt
      state.v[key] = nv; state.x[key] = nx
      if (Math.abs(nv) > 0.01 || Math.abs(nx - t) > 0.01) moving = true
      else { state.x[key] = t; state.v[key] = 0 }
    }
    onFrame(state.x)
    state.raf = moving ? requestAnimationFrame(tick) : 0
  }
  state.raf = requestAnimationFrame(tick)
}
