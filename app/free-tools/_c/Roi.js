'use client'
import t from '../tools.module.css'
import { Field, useForm } from './ui'
import { tiers } from '../../design/_shared/data'
// Every number is user-entered. Prices are the published Stake, Stronghold and workshop prices. No benchmarks.
const OFFERS = [...tiers.map((x) => [x.name, Number(x.price.replace(/\D/g, ''))]), ['Workshop', 2000]]
const fmt = (n) => (isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '–')
export default function Roi() {
  const [v, set] = useForm({ offer: '0', hours: '', rate: '', deals: '', acv: '', lift: '' })
  const n = (k) => Math.max(0, parseFloat(v[k]) || 0)
  const cost = OFFERS[+v.offer][1]
  const time = n('hours') * n('rate'), rev = n('deals') * n('acv') * (n('lift') / 100)
  const monthly = time + rev, payback = monthly ? cost / monthly : Infinity, year = monthly * 12 - cost
  return (
    <div className={t.cols}>
      <form className={t.form} onSubmit={(e) => e.preventDefault()}>
        <div className={t.fld}><label htmlFor="offer" className={t.lbl}>Offer</label><select id="offer" className={t.in} value={v.offer} onChange={(e) => set('offer')(e.target.value)}>{OFFERS.map(([l, p], i) => <option key={l} value={i}>{l} · {fmt(p)}</option>)}</select></div>
        <div className={t.row2}>
          <Field id="hours" type="number" min="0" inputMode="decimal" label="Hours a month spent rewriting or explaining messaging" placeholder="0" value={v.hours} onChange={set('hours')} />
          <Field id="rate" type="number" min="0" inputMode="decimal" label="Loaded cost per hour (USD)" placeholder="0" value={v.rate} onChange={set('rate')} />
          <Field id="deals" type="number" min="0" inputMode="decimal" label="Qualified opportunities a month" placeholder="0" value={v.deals} onChange={set('deals')} />
          <Field id="acv" type="number" min="0" inputMode="decimal" label="Average first-year deal value (USD)" placeholder="0" value={v.acv} onChange={set('acv')} />
        </div>
        <Field id="lift" type="number" min="0" max="100" step="0.5" inputMode="decimal" label="Your assumed close-rate lift (percentage points)" placeholder="0" value={v.lift} onChange={set('lift')} />
      </form>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}>
          <p className={t.pLbl}>Payback</p><p className={t.score}>{isFinite(payback) ? payback.toFixed(1) : '–'}<span className={t.of}> months</span></p>
          <ul className={t.checks}>
            <li><span className={t.ok} aria-hidden="true" /><span>Time value a month</span><span className={t.val}>{fmt(time)}</span></li>
            <li><span className={t.ok} aria-hidden="true" /><span>Revenue from your assumed lift a month</span><span className={t.val}>{fmt(rev)}</span></li>
            <li><span className={t.ok} aria-hidden="true" /><span>Offer cost</span><span className={t.val}>{fmt(cost)}</span></li>
            <li><span className={year >= 0 ? t.ok : t.warn} aria-hidden="true" /><span>First-year net</span><span className={t.val}>{monthly ? fmt(year) : '–'}</span></li>
          </ul>
        </div>
        <p className={t.note}>Assumptions: only the numbers you enter. Revenue = opportunities × deal value × lift. Payback = cost ÷ monthly value. No benchmarks or averages are used.</p>
      </div>
    </div>
  )
}
