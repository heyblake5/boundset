'use client'
import { useEffect } from 'react'
// Workbook + page behaviour, attached to server-rendered markup. Answers live only in localStorage
// (key boundset:wb:<guide>, one entry per exercise id); nothing is sent anywhere.
export default function Workbook({ slug }) {
  useEffect(() => {
    const KEY = `boundset:wb:${slug}`, $$ = (s, r = document) => [...r.querySelectorAll(s)]
    const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }
    const write = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)) } catch {} }
    const exs = $$('[data-ex]'), meter = document.querySelector('[data-meter]'), count = document.querySelector('[data-count]')
    const state = (ex) => { const f = $$('textarea', ex), n = f.filter((t) => t.value.trim()).length; return n === 0 ? 'empty' : n === f.length ? 'done' : 'partial' }
    const LABEL = { empty: 'Not started', partial: 'In progress', done: 'Done' }
    const paint = () => {
      let done = 0
      for (const ex of exs) { const s = state(ex); ex.dataset.state = s; ex.querySelector('[data-state-label]').textContent = LABEL[s]; if (s === 'done') done++ }
      if (meter) meter.value = done
      if (count) count.textContent = `${done} of ${exs.length} exercises done`
    }
    const data = read()
    for (const ex of exs) for (const t of $$('textarea', ex)) t.value = data[ex.dataset.ex]?.[t.dataset.f] || ''
    paint()
    let tm
    const onInput = (e) => {
      const t = e.target, ex = t.closest?.('[data-ex]'); if (!ex || t.tagName !== 'TEXTAREA') return
      const d = read(); (d[ex.dataset.ex] ||= {})[t.dataset.f] = t.value
      clearTimeout(tm); tm = setTimeout(() => write(d), 250); write(d); paint()
    }
    const answers = () => {
      const title = document.querySelector('[data-guide]')?.dataset.title || slug
      const md = [`# ${title}: my workbook`, '', `Saved from ${location.origin}${location.pathname}`, '']
      exs.forEach((ex, i) => {
        md.push(`## ${i + 1}. ${ex.querySelector('h3').textContent}`, '', ex.querySelector('p:nth-of-type(2)')?.textContent || '', '')
        for (const t of $$('textarea', ex)) md.push(`**${t.dataset.label}**`, '', t.value.trim() || '_(blank)_', '')
      })
      return md.join('\n')
    }
    const onClick = (e) => {
      const a = e.target.closest('[data-act],[data-copy]'); if (!a) return
      if (a.hasAttribute('data-copy')) {
        const url = location.origin + location.pathname + a.getAttribute('href')
        navigator.clipboard?.writeText(url).then(() => { a.dataset.copied = ''; setTimeout(() => delete a.dataset.copied, 1500) }).catch(() => {})
        return
      }
      const act = a.dataset.act
      if (act === 'download') {
        const blob = new Blob([answers()], { type: 'text/markdown' }), u = URL.createObjectURL(blob), l = document.createElement('a')
        l.href = u; l.download = `${slug}-workbook.md`; document.body.appendChild(l); l.click(); l.remove(); setTimeout(() => URL.revokeObjectURL(u), 1000)
      } else if (act === 'print') {
        const box = document.getElementById('wbPrint'); box.textContent = ''
        const pre = document.createElement('pre'); pre.textContent = answers(); box.appendChild(pre)
        document.documentElement.classList.add('wbp'); window.print()
      } else if (act === 'reset') {
        if (!confirm('Clear all your answers on this page?')) return
        try { localStorage.removeItem(KEY) } catch {}
        for (const t of $$('[data-ex] textarea')) t.value = ''
        paint()
      }
    }
    const after = () => document.documentElement.classList.remove('wbp')
    // Scroll-spy for the table of contents.
    const links = new Map($$('[data-toc]').map((a) => [a.dataset.toc, $$(`[data-toc="${a.dataset.toc}"]`)]))
    const heads = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((es) => {
      const vis = es.filter((x) => x.isIntersecting); if (!vis.length) return
      const id = vis.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id
      for (const [k, as] of links) for (const a of as) k === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')
    }, { rootMargin: '-80px 0px -70% 0px' })
    heads.forEach((h) => io.observe(h))
    document.addEventListener('input', onInput); document.addEventListener('click', onClick); addEventListener('afterprint', after)
    return () => { document.removeEventListener('input', onInput); document.removeEventListener('click', onClick); removeEventListener('afterprint', after); io.disconnect() }
  }, [slug])
  return null
}
