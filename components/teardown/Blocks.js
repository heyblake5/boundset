'use client'
import { useState } from 'react'
import s from './td.module.css'
import Icon from '../../app/design/c2/Icons'
import { COPY } from './copy'
import { norm } from './norm'

const Q = ({ children }) => (children ? <blockquote className={s.quote}>{children}</blockquote> : null)
const Skel = () => <div aria-hidden="true"><div className={s.skel} style={{ width: '90%' }} /><div className={s.skel} style={{ width: '70%' }} /><div className={s.skel} style={{ width: '40%' }} /></div>

export function CopyBtn({ text, onCopy }) {
  const [ok, setOk] = useState(false)
  return (
    <button type="button" className={s.icoBtn} aria-label={COPY.copyRewrite} onClick={() => { navigator.clipboard?.writeText(text); setOk(true); onCopy?.(); setTimeout(() => setOk(false), 1600) }}>
      <Icon name={ok ? 'check' : 'copyIcon'} size={20} /><span className={s.sr} aria-live="polite">{ok ? COPY.copied : ''}</span>
    </button>
  )
}

// r: partial or full result in the prompt schema. pageLines: extracted text lines for the "their page" column.
export default function Blocks({ r = {}, pageLines, onCopy, sideLabel = COPY.theirPage }) {
  const [hot, setHot] = useState(null)
  const B = COPY.blocks
  const hotQ = hot != null && r.gaps?.[hot]?.quote ? norm(r.gaps[hot].quote) : null
  return (
    <div className={s.layout}>
      <div className={s.grid}>
        <section className={s.block}><h2 className={s.bh}>{B.says_it_is}</h2>{r.says_it_is ? <><p className={s.body}>{r.says_it_is.summary}</p><Q>{r.says_it_is.quote}</Q></> : <Skel />}</section>
        <section className={s.block}><h2 className={s.bh}>{B.for_whom}</h2>{r.for_whom ? <><p className={s.body}>{r.for_whom.summary}</p><Q>{r.for_whom.quote}</Q></> : <Skel />}</section>
        <section className={s.block}><h2 className={s.bh}>{B.up_against}</h2>{r.up_against ? <p className={s.body}>{r.up_against.summary}</p> : <Skel />}</section>
        <section className={s.block}><h2 className={s.bh}>{B.strongest_claim}</h2>{r.strongest_claim ? <><Q>{r.strongest_claim.quote}</Q><p className={s.body} style={{ marginTop: 16 }}>{r.strongest_claim.why}</p></> : <Skel />}</section>
        <section className={`${s.block} ${s.wide}`}><h2 className={s.bh}>{B.gaps}</h2>
          {r.gaps ? <ol className={s.gaps}>{r.gaps.map((g, i) => (
            <li key={i} className={s.gap} tabIndex={0} data-on={hot === i || undefined} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(i)} onBlur={() => setHot(null)}>
              <h3 className={s.gt}><span className={s.n} aria-hidden="true">{i + 1}</span>{g.title}</h3>
              <Q>{g.quote}</Q><p className={s.prob}>{g.problem}</p>
              <p className={s.fix}><Icon name="arrow" size={18} />{g.fix}</p>
            </li>))}</ol> : <Skel />}
        </section>
        <section className={`${s.block} ${s.wide}`}><h2 className={s.bh}>{B.rewrite}</h2>
          {r.rewrite ? <><p className={s.hero}><span>{r.rewrite.hero}</span><CopyBtn text={r.rewrite.hero} onCopy={onCopy} /></p><p className={s.prob} style={{ marginTop: 16 }}>{r.rewrite.why}</p></> : <Skel />}
        </section>
      </div>
      {pageLines?.length ? (
        <details className={s.side} open>
          <summary>{sideLabel}</summary>
          <div className={s.pageText}>{pageLines.map((l, i) => {
            const hit = hotQ && norm(l).includes(hotQ)
            return <p key={i} data-hit={hit || undefined}>{hit ? <mark>{l}</mark> : l}</p>
          })}</div>
        </details>
      ) : null}
    </div>
  )
}
