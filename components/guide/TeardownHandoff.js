'use client'
import { useState } from 'react'
import g from './guide.module.css'
import { COPY } from '../teardown/copy'
import { track } from '../teardown/track'

// Answer and compare pages only. Navigates to /teardown with the typed URL.
// The teardown page prefills and waits for a click, so the bot-trap timer still runs there.
export default function TeardownHandoff({ page }) {
  const [bad, setBad] = useState(false)
  return (
    <section className={g.handoff} aria-labelledby="teardown-handoff">
      <h2 id="teardown-handoff" className={g.h2}>See this on your own homepage</h2>
      <form className={g.handoffForm} action="/teardown" method="get" noValidate onSubmit={(e) => {
        const input = e.currentTarget.elements.url
        const v = String(input?.value || '').trim()
        if (input) input.value = v
        if (!v) {
          e.preventDefault()
          setBad(false)
          requestAnimationFrame(() => setBad(true))
          return
        }
        track('teardown_handoff', { page })
      }}>
        <div className={g.handoffField} data-bad={bad || undefined} onAnimationEnd={() => setBad(false)}>
          <input className={g.handoffIn} name="url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck="false" maxLength={300} placeholder={COPY.placeholder} aria-label={COPY.inputLabel} aria-invalid={bad || undefined} onInput={() => bad && setBad(false)} />
          <button className={g.handoffGo} type="submit" aria-label={COPY.submitLabel}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5.75 12h12.5M13.25 7l5 5-5 5" /></svg>
          </button>
        </div>
      </form>
    </section>
  )
}
