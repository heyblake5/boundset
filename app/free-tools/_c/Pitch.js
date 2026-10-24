'use client'
import t from '../tools.module.css'
import { Field, Copy, useForm } from './ui'
const F = [['who', 'Who it is for', 'seed stage B2B founders'], ['problem', 'Their problem', 'their homepage does not explain what they do'], ['product', 'Product', 'Acme'], ['category', 'Category', 'positioning sprint'], ['outcome', 'Key outcome', 'a story buyers get on the first read'], ['how', 'How it works', 'a workshop, then finished messaging and copy in two weeks'], ['proof', 'Proof (optional)', 'a customer quote or result you can share'], ['ask', 'Ask', 'Want to see if it fits?']]
export default function Pitch() {
  const [v, set] = useForm({})
  const g = (k) => (v[k] || '').trim() || F.find((f) => f[0] === k)[2]
  const one = `${g('product')} is a ${g('category')} that helps ${g('who')} get ${g('outcome')}.`
  const thirty = `You know how ${g('who')} struggle because ${g('problem')}? ${g('product')} is a ${g('category')} that fixes that with ${g('how')}. The result is ${g('outcome')}. ${g('ask')}`
  const sixty = `${thirty.replace(g('ask'), '')}${(v.proof || '').trim() ? ` ${v.proof.trim()}.` : ''} We built it for ${g('who')} because the usual fix does not stick. ${g('ask')}`
  const out = [['One sentence', one], ['30 seconds', thirty], ['60 seconds', sixty.replace(/\s+/g, ' ')]]
  return (
    <div className={t.cols}>
      <form className={t.form} onSubmit={(e) => e.preventDefault()}>{F.map(([k, l, p]) => <Field key={k} id={k} label={l} placeholder={p} value={v[k]} onChange={set(k)} />)}</form>
      <div className={t.out} aria-live="polite">
        {out.map(([l, x]) => <div key={l} className={t.panel}><p className={t.pLbl}>{l} · {x.split(/\s+/).length} words</p><p className={t.mid}>{x}</p></div>)}
        <div className={t.btns}><Copy text={out.map(([l, x]) => `${l}\n${x}`).join('\n\n')} label="Copy all three" /></div>
      </div>
    </div>
  )
}
