'use client'
import { useState } from 'react'
import t from '../tools.module.css'
import { Field, Copy } from './ui'
const TYPES = ['Direct competitor', 'Do it in house', 'Do nothing', 'Adjacent tool', 'Agency or freelancer']
const blank = () => ({ name: '', type: TYPES[0], they: '', you: '' })
export default function Alternatives() {
  const [rows, setRows] = useState([blank(), { ...blank(), type: TYPES[1] }, { ...blank(), type: TYPES[2] }])
  const up = (i, k) => (x) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: x } : r)))
  const filled = rows.filter((r) => r.name.trim())
  const text = filled.map((r) => `${r.name} (${r.type})\n  They win: ${r.they}\n  We win: ${r.you}\n  Line: Unlike ${r.name}, we ${r.you || '…'}`).join('\n\n')
  return (
    <div className={t.cols}>
      <form className={t.form} onSubmit={(e) => e.preventDefault()}>
        {rows.map((r, i) => (
          <fieldset key={i} className={t.altRow}><legend className={t.lbl}>Alternative {i + 1}</legend>
            <div className={t.row2}>
              <Field id={`n${i}`} label="Name" placeholder="What buyers would use instead" value={r.name} onChange={up(i, 'name')} />
              <div className={t.fld}><label htmlFor={`t${i}`} className={t.lbl}>Type</label><select id={`t${i}`} className={t.in} value={r.type} onChange={(e) => up(i, 'type')(e.target.value)}>{TYPES.map((x) => <option key={x}>{x}</option>)}</select></div>
            </div>
            <Field id={`th${i}`} label="Where they win" placeholder="Be honest" value={r.they} onChange={up(i, 'they')} />
            <Field id={`y${i}`} label="Where you win" placeholder="Specific and provable" value={r.you} onChange={up(i, 'you')} />
            {rows.length > 1 && <button type="button" className={t.rm} onClick={() => setRows(rows.filter((_, j) => j !== i))}>Remove</button>}
          </fieldset>
        ))}
        {rows.length < 6 && <div className={t.btns}><button type="button" className={t.btn} onClick={() => setRows([...rows, blank()])}>Add alternative</button></div>}
      </form>
      <div className={t.out} aria-live="polite">
        <div className={t.panel}>
          <p className={t.pLbl}>Alternatives map</p>
          {filled.length ? (
            <table className={t.table}><thead><tr><th scope="col">Alternative</th><th scope="col">They win</th><th scope="col">You win</th></tr></thead>
              <tbody>{filled.map((r, i) => <tr key={i}><td>{r.name}<br /><span className={t.note}>{r.type}</span></td><td>{r.they || '–'}</td><td>{r.you || '–'}</td></tr>)}</tbody></table>
          ) : <p className={t.note}>Name an alternative to start the map.</p>}
        </div>
        {!!filled.length && <div className={t.panel}><p className={t.pLbl}>Differentiation lines</p>{filled.map((r, i) => <p key={i} className={t.mid}>Unlike {r.name}, we {r.you || '…'}</p>)}</div>}
        {!!filled.length && <div className={t.btns}><Copy text={text} label="Copy map" /></div>}
      </div>
    </div>
  )
}
