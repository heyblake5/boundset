'use client'
import { useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, MotionConfig, AnimatePresence } from 'framer-motion'
import s from './td.module.css'
import Icon from '../../app/design/c2/Icons'
import TrackedLink from '../TrackedLink'
import Blocks from './Blocks'
import { COPY } from './copy'
import { track } from './track'
import { UrlForm } from './UrlForm'

const NO_RETRY = new Set(['rate', 'daily', 'monthly', 'burst'])
function mailText(text, host) {
  const mail = COPY.mailto
  const i = text.indexOf(mail)
  if (i < 0) return text
  return <>{text.slice(0, i)}<a href={`mailto:${mail}?subject=${encodeURIComponent('Teardown: ' + (host || ''))}`}>{mail}</a>{text.slice(i + mail.length)}</>
}

export default function Tool({ available, emailOn, bookUrl, samples }) {
  const t0 = useRef(0), [initialUrl, setInit] = useState('')
  useEffect(() => { t0.current = Date.now(); const q = new URLSearchParams(location.search).get('url'); if (q) setInit(q.slice(0, 300)) }, [])
  const [phase, setPhase] = useState(available ? 'idle' : 'unavailable')
  const [page, setPage] = useState(null), [r, setR] = useState({}), [done, setDone] = useState(null), [err, setErr] = useState(null), [last, setLast] = useState(null)
  const live = useRef(null)

  async function run(url, hp) {
    setLast({ url, hp }); setErr(null); setPage(null); setR({}); setDone(null); setPhase('reading')
    track('Teardown start', { host: new URL(url).hostname })
    let res
    try { res = await fetch('/api/teardown', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url, company_hp: hp, elapsed: Date.now() - t0.current }) }) } catch { return fail('blocked') }
    const reader = res.body.getReader(), dec = new TextDecoder(); let buf = ''
    for (;;) {
      const { value, done: end } = await reader.read(); if (end) break
      buf += dec.decode(value, { stream: true }); let i
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 1); if (!line) continue
        const e = JSON.parse(line)
        if (e.type === 'page') setPage(e)
        else if (e.type === 'section') setR((p) => ({ ...p, [e.key]: e.value }))
        else if (e.type === 'done') { setDone(e); setPhase('result'); track('Teardown result', { host: e.host, cached: String(e.cached) }) }
        else if (e.type === 'error') return fail(e.reason)
      }
    }
  }
  function fail(reason) { setErr(reason); setPhase(reason === 'unavailable' ? 'unavailable' : 'error'); track('Teardown error', { reason: reason === 'unavailable' ? 'model' : reason }) }

  const lines = page?.text ? page.text.split('\n').map((l) => l.replace(/^H[1-3]: /, '')) : null
  const host = page?.host || (last && new URL(last.url).hostname)
  const book = `${bookUrl}?notes=${encodeURIComponent(`Teardown: ${host || ''}`)}`
  const showForm = phase === 'idle' || phase === 'error' || phase === 'unavailable'

  return (
    <MotionConfig reducedMotion="user"><LazyMotion features={domAnimation} strict>
      <div className={s.page}>
        <m.h1 layout="position" className={s.h1}>{COPY.h1}</m.h1>
        <AnimatePresence mode="popLayout" initial={false}>
          {showForm ? (
            <m.div key="form" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: .98 }}>
              <UrlForm key={initialUrl} onSubmit={run} disabled={phase === 'unavailable'} initial={initialUrl || last?.url?.replace(/^https:\/\//, '').replace(/\/$/, '') || ''} />
              <div ref={live} aria-live="polite">
                {phase === 'unavailable' && <p className={s.line}>{mailText(COPY.errors.unavailable, host)}</p>}
                {phase === 'error' && <p className={s.line}>
                  {mailText(COPY.errors[err] || COPY.errors.blocked, host)}
                  {!NO_RETRY.has(err) && <button type="button" className={s.icoBtn} aria-label={COPY.retry} onClick={() => run(last.url, last.hp)}><Icon name="retry" size={20} /></button>}
                </p>}
              </div>
            </m.div>
          ) : (
            <m.div key="read" layout className={s.reading} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} aria-busy={phase === 'reading'}>
              {page ? <><p className={s.title}>{page.title}</p>{page.h1 && <p className={s.pH1}>{page.h1}</p>}
                {phase === 'reading' && <ul className={s.heads}>{page.headlines?.slice(0, 6).map((h, i) => <m.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .08 }}>{h}</m.li>)}</ul>}</>
                : <div aria-hidden="true"><div className={s.skel} style={{ width: 220 }} /><div className={s.skel} style={{ width: '60%', height: 28 }} /></div>}
              <Blocks r={r} pageLines={phase === 'result' ? lines : null} onCopy={() => track('Teardown copy rewrite')} />
              {phase === 'result' && (
                <div className={s.after}>
                  {emailOn ? <Email id={done.id} book={book} /> : <span />}
                  <TrackedLink href={book} event="Book call" props={{ src: 'teardown-tool' }} className={s.btn}>{COPY.book}</TrackedLink>
                </div>
              )}
            </m.div>
          )}
        </AnimatePresence>
        {phase === 'idle' && samples?.length ? (
          <div className={s.samples}>{samples.map((x) => (
            <a key={x.slug} href={`/teardowns/${x.slug}`} className={s.card}>
              <span className={s.mark}>{x.company}</span><span className={s.q}>{'\u201c'}{x.hero.h1}{'\u201d'}</span><span className={s.rw}>{x.rewrite.hero}</span>
            </a>))}</div>
        ) : null}
      </div>
    </LazyMotion></MotionConfig>
  )
}

function Email({ id }) {
  const [v, setV] = useState(''), [sent, setSent] = useState(null), [bad, setBad] = useState(false)
  return (
    <div className={s.email}>
      <h2 className={s.bh}>{COPY.emailHeading}</h2>
      {sent ? <p className={s.sent} aria-live="polite"><Icon name="check" size={20} />{COPY.emailSent(sent)}</p> : (
        <form noValidate onSubmit={async (e) => {
          e.preventDefault(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setBad(true); return }
          const res = await fetch('/api/teardown/email', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, email: v, company_hp: e.currentTarget.company_hp.value }) }).catch(() => null)
          if (res?.ok) { setSent(v); track('Teardown email') } else setBad(true)
        }}>
          <div className={s.field} data-bad={bad || undefined} onAnimationEnd={() => setBad(false)}>
            <input className={s.in} type="email" autoComplete="email" aria-label={COPY.emailLabel} value={v} onChange={(e) => setV(e.target.value)} />
            <button className={s.go} type="submit" aria-label={COPY.emailSubmit}><Icon name="arrow" size={20} /></button>
          </div>
          <input className={s.hp} name="company_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </form>)}
    </div>
  )
}
