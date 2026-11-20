'use client'
import { useState } from 'react'
import g from '../../components/guide/guide.module.css'
import s from './cost.module.css'
import { OPTIONS, SOURCES, TICKS, fits, logPct, money } from '../../lib/positioningCost'

const QUESTIONS = [
  ['stage', 'Stage', [['seed', 'Seed'], ['later', 'Series A or later']]],
  ['need', 'You need', [['decision', 'The decision'], ['copy', 'The decision and the copy']]],
  ['time', 'How long', [['once', 'Once'], ['ongoing', 'Ongoing']]],
]

function place(pct) {
  if (pct < 18) return 'translateX(0)'
  if (pct > 82) return 'translateX(-100%)'
  return 'translateX(-50%)'
}

export default function CostChart() {
  const [answers, setAnswers] = useState({ stage: '', need: '', time: '' })
  const asked = Object.values(answers).some(Boolean)
  const set = (key, value) => setAnswers((a) => ({ ...a, [key]: a[key] === value ? '' : value }))

  return (
    <>
      <div className={s.chart}>
        {OPTIONS.map((o, i) => {
          const low = logPct(o.low)
          const high = logPct(o.high)
          const on = !asked || fits(o, answers)
          const tight = high - low < 22
          const mid = Math.min(68, Math.max(32, (low + high) / 2))
          return (
            <div key={o.id} className={s.opt} data-on={asked ? String(on) : undefined} id={o.id}>
              <h3 className={s.name}>{o.name}</h3>
              <div className={s.plot}>
                <div className={s.labels}>
                  {tight ? (
                    <div className={s.pair} style={{ left: `${mid}%` }}>
                      <a href={SOURCES[o.lowSource].url} target="_blank" rel="noopener noreferrer" aria-label={`${money(o.low)}, ${SOURCES[o.lowSource].name}`}>{money(o.low)}</a>
                      <span>to</span>
                      <a href={SOURCES[o.highSource].url} target="_blank" rel="noopener noreferrer" aria-label={`${money(o.high)}, ${SOURCES[o.highSource].name}`}>{money(o.high)}</a>
                    </div>
                  ) : (
                    <>
                      <a className={s.cap} style={{ left: `${low}%`, transform: place(low) }} href={SOURCES[o.lowSource].url} target="_blank" rel="noopener noreferrer" aria-label={`${money(o.low)}, ${SOURCES[o.lowSource].name}`}>{money(o.low)}</a>
                      <a className={s.cap} style={{ left: `${high}%`, transform: place(high) }} href={SOURCES[o.highSource].url} target="_blank" rel="noopener noreferrer" aria-label={`${money(o.high)}, ${SOURCES[o.highSource].name}`}>{money(o.high)}</a>
                    </>
                  )}
                </div>
                <div className={s.track}>
                  <div className={s.bar} style={{ left: `${low}%`, width: `${Math.max(high - low, 0.6)}%`, animationDelay: `${i * 70}ms` }} />
                </div>
                <div className={s.axis} aria-hidden="true">
                  {TICKS.map((t) => <span key={t} className={s.tick} style={{ left: `${logPct(t)}%` }}>{money(t)}</span>)}
                </div>
              </div>
              <ul className={s.cites}>
                {o.prices.map(([label, id]) => <li key={label}><a href={SOURCES[id].url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
              </ul>
            </div>
          )
        })}
      </div>

      <h2 id="fit" className={g.h2}>Who each option suits</h2>
      <div className={`${g.tableWrap} ${s.fit}`} tabIndex={0} role="region" aria-label="Who each option suits">
        <table className={g.table}>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">You leave with</th>
              <th scope="col">Time</th>
              <th scope="col">Your time</th>
              <th scope="col">Fits</th>
            </tr>
          </thead>
          <tbody>
            {OPTIONS.map((o) => {
              const on = !asked || fits(o, answers)
              return (
                <tr key={o.id} data-on={asked ? String(on) : undefined}>
                  <th scope="row">{o.name}</th>
                  <td data-l="You leave with">{o.leave}</td>
                  <td data-l="Time">{o.time}</td>
                  <td data-l="Your time">{o.hours}</td>
                  <td data-l="Fits">{o.fits}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={s.pick}>
        {QUESTIONS.map(([key, legend, choices]) => (
          <div key={key} className={s.q} role="radiogroup" aria-label={legend}>
            <p className={s.legend}>{legend}</p>
            <div className={s.choices}>
              {choices.map(([value, label]) => (
                <button key={value} type="button" className={s.choice} role="radio" aria-checked={answers[key] === value} onClick={() => set(key, value)}>{label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
