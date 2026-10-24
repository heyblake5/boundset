'use client'
import { useEffect, useRef, useState } from 'react'
import s from './c2.module.css'
import Cal from '../_shared/Cal'
import Icon from './Icons'
import { MENU, HOME } from './menu'

// Mega-menu. Desktop: hover-intent (open 60ms, close 200ms) on fine pointers, click/Enter/Space toggles,
// Escape closes and returns focus. Mobile: full-screen sheet. The CTA appears once the hero CTA scrolls away.
export default function Nav({ logo }) {
  const [open, setOpen] = useState(null)
  const [sheet, setSheet] = useState(false)
  const [hyd, setHyd] = useState(false)
  useEffect(() => setHyd(true), [])
  const t = useRef(0), root = useRef(null), burger = useRef(null)
  const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches
  const later = (fn, ms) => { clearTimeout(t.current); t.current = setTimeout(fn, ms) }

  useEffect(() => {
    const n = root.current, hero = document.querySelector('[data-hero-cta]')
    if (!hero) { n.setAttribute('data-cta', ''); return }
    const io = new IntersectionObserver(([e]) => n.toggleAttribute('data-cta', !e.isIntersecting))
    io.observe(hero); return () => io.disconnect()
  }, [])
  useEffect(() => {
    const key = (e) => {
      if (e.key !== 'Escape') return
      if (sheet) { setSheet(false); burger.current?.focus() }
      else if (open) { root.current.querySelector(`[aria-controls="m-${open}"]`)?.focus(); setOpen(null) }
    }
    const click = (e) => { if (!root.current.contains(e.target)) setOpen(null) }
    const blur = (e) => { if (open && !root.current.contains(e.relatedTarget) && e.relatedTarget) setOpen(null) }
    document.addEventListener('keydown', key); document.addEventListener('click', click); root.current.addEventListener('focusout', blur)
    const r = root.current
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('click', click); r.removeEventListener('focusout', blur) }
  }, [open, sheet])
  useEffect(() => { document.documentElement.style.overflow = sheet ? 'hidden' : ''; return () => { document.documentElement.style.overflow = '' } }, [sheet])

  return (
    <nav className={s.nav} data-nav ref={root} aria-label="Main" data-sheet={sheet || undefined}>
      <a href={HOME} className={s.lockLink} aria-label="Boundset home">{logo}</a>
      <ul className={s.menu}>
        {MENU.map((m) => (
          <li key={m.id} className={s.mi} data-open={open === m.id || undefined}
            onPointerEnter={(e) => e.pointerType === 'mouse' && fine() && later(() => setOpen(m.id), open ? 0 : 60)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && fine() && later(() => setOpen(null), 200)}>
            <button type="button" className={s.nBtn} aria-expanded={open === m.id} aria-controls={`m-${m.id}`}
              onClick={() => { clearTimeout(t.current); setOpen(open === m.id ? null : m.id) }}>
              {m.label}<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={s.chev}><path d="M2 3.75 5 6.75l3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div id={`m-${m.id}`} className={`${s.panel} ${m.id === 'tools' ? s.panelWide : ''}`}>
              {m.heading && <p className={s.pHead}>{m.heading}</p>}
              <ul className={s.pList}>
                {m.links.map((l) => (
                  <li key={l.href} className={l.all ? s.pAll : undefined}><a href={l.href} className={s.pLink} tabIndex={hyd && open !== m.id ? -1 : undefined} onClick={() => setOpen(null)}>
                    {l.icon && <span className={s.pIco}><Icon name={l.icon} size={20} /></span>}<span>{l.name}</span>{l.all && <span aria-hidden="true" className={s.arrow}>→</span>}
                  </a></li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className={s.navR}>
        <Cal className={s.btnSm}>Book a call</Cal>
        <button type="button" ref={burger} className={s.burger} aria-expanded={sheet} aria-controls="sheet" aria-label="Menu" onClick={() => setSheet(!sheet)}><i /><i /></button>
      </div>
      <div id="sheet" className={s.sheet}>
        {MENU.map((m) => (
          <section key={m.id} className={s.sGroup} aria-labelledby={`s-${m.id}`}>
            <p id={`s-${m.id}`} className={s.sLabel}>{m.heading ? `${m.label} · ${m.heading}` : m.label}</p>
            <ul>{m.links.map((l) => <li key={l.href}><a href={l.href} className={s.sLink} tabIndex={sheet ? 0 : -1} onClick={() => setSheet(false)}>{l.icon && <Icon name={l.icon} size={20} className={s.sIco} />}{l.name}</a></li>)}</ul>
          </section>
        ))}
        <Cal className={s.btn}>Book a call</Cal>
      </div>
    </nav>
  )
}
