'use client'
import t from '../tools.module.css'
import { Field, Copy, useForm } from './ui'
const F = [['stage', 'Company stage', 'Seed to Series A'], ['size', 'Team size', '10 to 50 people'], ['industry', 'Industry or market', 'B2B SaaS'], ['buyer', 'Buyer role', 'Founder or head of marketing'], ['trigger', 'Trigger event', 'Just raised or about to relaunch the site'], ['pain', 'Main pain', 'Prospects need a demo to understand the product'], ['workaround', 'Current workaround', 'Founder rewrites the homepage every quarter'], ['musthave', 'Must-have', 'A product with paying customers'], ['disq', 'Disqualifiers', 'Still searching for product-market fit']]
export default function Icp() {
  const [v, set] = useForm({})
  const g = (k) => (v[k] || '').trim() || F.find((f) => f[0] === k)[2]
  const para = `${g('buyer')} at a ${g('stage')} ${g('industry')} company with ${g('size')}. Usually shows up when: ${g('trigger')}. Pain: ${g('pain')}. Today they ${g('workaround').charAt(0).toLowerCase() + g('workaround').slice(1)}. Must have: ${g('musthave')}. Not a fit if: ${g('disq')}.`
  return (
    <div className={t.cols}>
      <form className={t.form} onSubmit={(e) => e.preventDefault()}><div className={t.row2}>{F.slice(0, 4).map(([k, l, p]) => <Field key={k} id={k} label={l} placeholder={p} value={v[k]} onChange={set(k)} />)}</div>{F.slice(4).map(([k, l, p]) => <Field key={k} id={k} label={l} placeholder={p} value={v[k]} onChange={set(k)} />)}</form>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}><p className={t.pLbl}>Best-fit customer</p><p className={t.big}>{g('buyer')}</p><p className={t.note}>{g('stage')} · {g('size')} · {g('industry')}</p>
          <ul className={t.checks}>{F.slice(4).map(([k, l]) => <li key={k}><span className={t.ok} aria-hidden="true" /><span>{l}</span><span className={t.val}>{g(k)}</span></li>)}</ul></div>
        <div className={t.panel}><p className={t.pLbl}>Sketch</p><p className={t.mid}>{para}</p></div>
        <div className={t.btns}><Copy text={para} label="Copy sketch" /></div>
      </div>
    </div>
  )
}
