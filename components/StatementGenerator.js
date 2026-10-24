'use client'
import { useState } from 'react'
import CopyButton from './CopyButton'
const F = [
  ['customer', 'Best-fit customer', 'seed stage B2B SaaS founders'],
  ['need', 'Their need', 'need a homepage buyers understand'],
  ['product', 'Product', 'Boundset'],
  ['category', 'Category', 'positioning sprint'],
  ['value', 'Key value', 'locks positioning and ships copy in two weeks'],
  ['alternative', 'Main alternative', 'rewriting the homepage in house'],
  ['attribute', 'What you do differently', 'deliver finished copy, not just a strategy deck'],
]
export default function StatementGenerator() {
  const [v, setV] = useState({})
  const g = (k) => (v[k] || '').trim() || F.find((f) => f[0] === k)[2]
  const statement = `For ${g('customer')} who ${g('need')}, ${g('product')} is a ${g('category')} that ${g('value')}. Unlike ${g('alternative')}, we ${g('attribute')}.`
  const oneLiner = `${g('product')} is the ${g('category')} for ${g('customer')}.`
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {F.map(([k, label, ph]) => (
          <label key={k} className="block">
            <span className="block text-sm font-semibold text-stone-800 mb-1">{label}</span>
            <input value={v[k] || ''} placeholder={ph} onChange={(e) => setV({ ...v, [k]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </label>
        ))}
      </form>
      <div className="lg:sticky lg:top-6 self-start space-y-4" aria-live="polite">
        <div className="p-8 rounded-3xl bg-brand text-white">
          <h2 className="text-sm font-semibold text-white/70 mb-3">Positioning statement</h2>
          <p className="font-serif text-2xl leading-snug">{statement}</p>
        </div>
        <div className="p-8 rounded-3xl bg-white border border-stone-200">
          <h2 className="text-sm font-semibold text-stone-500 mb-3">One-liner</h2>
          <p className="font-serif text-2xl leading-snug">{oneLiner}</p>
        </div>
        <CopyButton text={`${statement}\n\n${oneLiner}`} label="Copy both" />
      </div>
    </div>
  )
}
