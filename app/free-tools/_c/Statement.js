'use client'
import t from '../tools.module.css'
import { Field, Copy, useForm } from './ui'
const F = [
  ['customer', 'Best-fit customer', 'seed stage B2B SaaS founders'], ['need', 'Their need', 'need a homepage buyers understand'],
  ['product', 'Product', 'Boundset'], ['category', 'Category', 'positioning sprint'], ['value', 'Key value', 'locks positioning and ships copy in two weeks'],
  ['alternative', 'Main alternative', 'rewriting the homepage in house'], ['attribute', 'What you do differently', 'deliver finished copy, not just a strategy deck'],
]
export default function Statement() {
  const [v, set] = useForm({})
  const g = (k) => (v[k] || '').trim() || F.find((f) => f[0] === k)[2]
  const statement = `For ${g('customer')} who ${g('need')}, ${g('product')} is a ${g('category')} that ${g('value')}. Unlike ${g('alternative')}, we ${g('attribute')}.`
  const one = `${g('product')} is the ${g('category')} for ${g('customer')}.`
  return (
    <div className={t.cols}>
      <form className={t.form} onSubmit={(e) => e.preventDefault()}>{F.map(([k, l, p]) => <Field key={k} id={k} label={l} placeholder={p} value={v[k]} onChange={set(k)} />)}</form>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}><p className={t.pLbl}>Positioning statement</p><p className={t.big}>{statement}</p></div>
        <div className={t.panel}><p className={t.pLbl}>One-liner</p><p className={t.big}>{one}</p></div>
        <div className={t.btns}><Copy text={`${statement}\n\n${one}`} label="Copy both" /></div>
      </div>
    </div>
  )
}
