'use client'
import { useState } from 'react'
import g from './guide.module.css'
import c from '../../app/design/c2/c2.module.css'
import TrackedLink from '../TrackedLink'
import { REDESIGN_CHECK, redesignRoute } from '../../lib/redesignCheck'
import { withParams } from '../../lib/bookHref'

export default function RedesignCheck({ bookUrl }) {
  const [answers, setAnswers] = useState({})
  const route = redesignRoute(answers)
  const bookHref = withParams(bookUrl, { src: REDESIGN_CHECK.src })
  return (
    <section className={g.check} aria-labelledby={REDESIGN_CHECK.id}>
      <h2 id={REDESIGN_CHECK.id} className={g.h2}>{REDESIGN_CHECK.title}</h2>
      <p className={g.checkLead}>{REDESIGN_CHECK.lead}</p>
      <ol className={g.checkList}>
        {REDESIGN_CHECK.questions.map((q) => (
          <li key={q.id}>
            <fieldset className={g.checkQ}>
              <legend className={g.checkLegend}>{q.prompt}</legend>
              <div className={g.checkYn}>
                {['yes', 'no'].map((v) => (
                  <label key={v} className={g.checkOpt} data-on={answers[q.id] === v || undefined}>
                    <input type="radio" name={`redesign-${q.id}`} value={v} checked={answers[q.id] === v} onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: v }))} />
                    <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <div className={g.checkOut} aria-live="polite">
        {route === 'book' && (
          <>
            <p>{REDESIGN_CHECK.book}</p>
            <TrackedLink href={bookHref} event="Book call" props={{ src: REDESIGN_CHECK.src }} className={c.btn}>{REDESIGN_CHECK.bookCta}</TrackedLink>
          </>
        )}
        {route === 'teardown' && (
          <>
            <p>{REDESIGN_CHECK.teardown}</p>
            <a className={c.btn} href={REDESIGN_CHECK.teardownHref}>{REDESIGN_CHECK.teardownCta}</a>
          </>
        )}
      </div>
    </section>
  )
}
