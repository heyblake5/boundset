'use client'
import t from '../tools.module.css'
import { Field, Copy, useForm } from './ui'
const N = [0, 1, 2]
export default function Hierarchy() {
  const [v, set] = useForm({})
  const g = (k, d) => (v[k] || '').trim() || d
  const core = g('core', 'Core message')
  const pillars = N.map((i) => ({ name: g(`p${i}`, `Pillar ${i + 1}`), proof: [0, 1].map((j) => g(`p${i}x${j}`, `Proof point ${j + 1}`)) }))
  const text = `${core}\n\n` + pillars.map((p) => `- ${p.name}\n` + p.proof.map((x) => `  - ${x}`).join('\n')).join('\n')
  return (
    <div className={t.cols}>
      <form className={t.form} onSubmit={(e) => e.preventDefault()}>
        <Field id="core" area rows={3} label="Core message" placeholder="The one thing every asset should say" value={v.core} onChange={set('core')} />
        {N.map((i) => (
          <fieldset key={i} className={t.altRow}><legend className={t.lbl}>Pillar {i + 1}</legend>
            <Field id={`p${i}`} label="Pillar" placeholder="Supporting message" value={v[`p${i}`]} onChange={set(`p${i}`)} />
            <div className={t.row2}>{[0, 1].map((j) => <Field key={j} id={`p${i}x${j}`} label={`Proof point ${j + 1}`} placeholder="Feature, fact or example" value={v[`p${i}x${j}`]} onChange={set(`p${i}x${j}`)} />)}</div>
          </fieldset>
        ))}
      </form>
      <div className={t.out} aria-live="polite">
        <div className={`${t.panel} ${t.tree}`}>
          <div className={t.core}><p className={t.pLbl}>Core message</p><p className={t.big}>{core}</p></div>
          <div className={t.pillars}>{pillars.map((p, i) => <div key={i} className={t.pillar}><strong>{p.name}</strong><ul>{p.proof.map((x, j) => <li key={j}>{x}</li>)}</ul></div>)}</div>
        </div>
        <div className={t.btns}><Copy text={text} label="Copy as outline" /></div>
      </div>
    </div>
  )
}
