'use client'
import { CAL } from './data'
// Plain link (works without JS); upgrades to the cal.com popup on first click.
let loading
function loadCal() {
  if (loading) return loading
  loading = new Promise((res) => {
    ;(function (C, A, L) { let p = function (a, ar) { a.q.push(ar) }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true } if (ar[0] === L) { const api = function () { p(api, arguments) }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]) } else p(cal, ar); return } p(cal, ar) } })(window, 'https://app.cal.com/embed/embed.js', 'init')
    window.Cal('init', 'positioning', { origin: 'https://app.cal.com' })
    window.Cal.ns.positioning('ui', { layout: 'month_view' })
    res()
  })
  return loading
}
export default function Cal({ children, className }) {
  return (
    <a href={CAL} className={className} onClick={(e) => {
      if (e.metaKey || e.ctrlKey) return
      e.preventDefault()
      loadCal().then(() => window.Cal.ns.positioning('modal', { calLink: 'heyblake/positioning', config: { layout: 'month_view' } }))
    }}>{children}</a>
  )
}
