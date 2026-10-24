'use client'
import { useState } from 'react'
import { milestones } from '../_shared/data'
import s from './c2.module.css'
// A real two-week track: prep, ten working days, a weekend gap, then open-ended Slack.
// Each milestone is pinned to a block; hovering either side lights the other.
const COL = [1, 1, 2, 3, 5, 6, 8, 10, 11, 12, 14]   // grid column per milestone
const GROUPS = [[0, 1, 1, 1], [2, 5, 2, 6], [6, 9, 8, 12], [10, 10, 14, 14]] // [from,to,colStart,colEnd]
const BLOCKS = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14]
export default function Track() {
  const [hot, setHot] = useState(-1)
  const used = (c) => COL.some((x, i) => x === c && i > 1 && i < 10)
  return (
    <div className={s.track} onPointerLeave={() => setHot(-1)}>
      <div className={s.rail} aria-hidden="true">
        {BLOCKS.map((c) => (
          <i key={c} style={{ gridColumn: c }} className={c === 1 ? s.bPre : c === 14 ? s.bAfter : s.bDay}
            data-m={used(c) || undefined} data-hot={COL[hot] === c || undefined}
            onPointerEnter={() => setHot(COL.findIndex((x, i) => x === c && (c === 1 || c === 14 || (i > 1 && i < 10))))} />
        ))}
      </div>
      {GROUPS.map(([a, b, c0, c1]) => (
        <ol key={a} className={s.tGroup} style={{ gridColumn: `${c0} / ${c1 + 1}` }}>
          {milestones.slice(a, b + 1).map((m, j) => {
            const i = a + j
            return (
              <li key={m.title} className={s.tItem} data-hot={hot === i || undefined} tabIndex={0}
                onPointerEnter={() => setHot(i)} onFocus={() => setHot(i)} onBlur={() => setHot(-1)}>
                <h3 className={s.h4}>{m.title}</h3><p className={s.small}>{m.desc}</p>
              </li>
            )
          })}
        </ol>
      ))}
    </div>
  )
}
