import s from './td.module.css'
import { COPY } from './copy'
import { BENCHMARK } from '../../lib/benchmark2026'

// Published totals only. The model supplies pass or miss and a reason. The counts come from the benchmark file.
export default function Scorecard({ checks }) {
  if (!Array.isArray(checks)) return null
  const byId = new Map(checks.map((c) => [c.id, c]))
  const rows = BENCHMARK.checks.map((def) => {
    const c = byId.get(def.id)
    if (!c || typeof c.pass !== 'boolean' || typeof c.reason !== 'string' || !c.reason.trim()) return null
    return { def, pass: c.pass, reason: c.reason.trim() }
  })
  if (rows.some((row) => !row)) return null
  const total = rows.filter((row) => row.pass).length
  return (
    <section className={s.score} aria-label={COPY.scoreOf(total)}>
      <h2 className={s.scoreTotal}>{COPY.scoreOf(total)}</h2>
      <ul className={s.scoreList}>
        {rows.map((row) => (
          <li key={row.def.id}>
            <p className={s.scoreQ}>{row.def.q}</p>
            <p className={s.scoreWhy}><span className={s.scoreMark}>{row.pass ? COPY.scorePass : COPY.scoreMiss}</span> {row.reason}</p>
            <p className={s.scoreN}>{COPY.scoreCompare(row.def.n)}</p>
          </li>
        ))}
      </ul>
      <p className={s.scoreLink}><a href="/research/homepage-positioning-benchmark-2026">{COPY.scoreBenchmark}</a></p>
    </section>
  )
}
