'use client'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ITEMS, bandFor } from './quizData'

export default function QuizFlow() {
  const router = useRouter()
  const [checked, setChecked] = useState([])
  const [step, setStep] = useState('quiz')
  const [sending, setSending] = useState(false)
  const captureHeading = useRef(null)

  useEffect(() => {
    if (step === 'capture') captureHeading.current?.focus()
  }, [step])

  const toggle = (i) => setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].sort((a, b) => a - b)))

  async function onSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const score = checked.length
    const band = bandFor(score)
    setSending(true)
    try {
      await fetch('/api/quiz-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: form.get('firstName'), email: form.get('email'), score, band, checked }),
      })
    } catch (err) {
      console.error('quiz-lead failed', err)
    }
    if (typeof window.plausible === 'function') window.plausible('Quiz submit', { props: { band } })
    router.push(`/quiz/result?c=${checked.join(',')}`)
  }

  if (step === 'capture') {
    return (
      <section aria-labelledby="capture-h" className="bg-white rounded-2xl border border-stone-200 p-6 md:p-10 max-w-xl">
        <h2 id="capture-h" ref={captureHeading} tabIndex={-1} className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight mb-4 outline-none balance">Your score is ready</h2>
        <p className="text-lg text-stone-700 mb-8">Enter your email and we'll send your result with the fixes for your team.</p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-stone-900 mb-2">First name</label>
            <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 text-base focus:border-brand focus-ring" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-900 mb-2">Work email</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@yourcompany.com" className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 text-base focus:border-brand focus-ring placeholder:text-stone-500" />
          </div>
          <button type="submit" disabled={sending} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand text-white font-medium rounded-full hover:bg-brand/90 transition-colors text-lg focus-ring disabled:opacity-70">Send my result</button>
          <p className="text-sm text-stone-600">One email with your result, then one follow up. Unsubscribe anytime.</p>
        </form>
      </section>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setStep('capture') }}>
      <fieldset>
        <legend className="sr-only">Select all that apply.</legend>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {ITEMS.map((q, i) => {
            const on = checked.includes(i)
            return (
              <li key={i}>
                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors h-full bg-white focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 ${on ? 'border-brand bg-brand/5' : 'border-stone-200 hover:border-stone-400'}`}>
                  <input type="checkbox" checked={on} onChange={() => toggle(i)} className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#1B4332]" />
                  <span className="text-base text-stone-800">{q}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>
      <button type="submit" className="inline-flex items-center justify-center px-8 py-4 bg-brand text-white font-medium rounded-full hover:bg-brand/90 transition-colors text-lg focus-ring">See my score</button>
    </form>
  )
}
