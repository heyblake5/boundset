// Teardown email (spec §4). OFF unless TEARDOWN_EMAIL_ENABLED=1 AND Resend + sender are configured.
// Placeholders below must be filled by Blake before enabling. Never send from pagetear.com.
import { BOOK_CALL_URL } from '../../components/site'
export const SENDER_PLACEHOLDER = '[BRAND SENDER ADDRESS NEEDED]'
export const POSTAL_PLACEHOLDER = 'High Noon LLC, [ADDRESS NEEDED]'
export const REPLY_TO_PLACEHOLDER = '[NEEDED]'
export const emailEnabled = () => process.env.TEARDOWN_EMAIL_ENABLED === '1' && !!process.env.RESEND_API_KEY && !!process.env.TEARDOWN_FROM_EMAIL && !/pagetear\.com/i.test(process.env.TEARDOWN_FROM_EMAIL)
export const validEmail = (e) => typeof e === 'string' && e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export function renderEmail(rec, site = 'https://boundset.com') {
  const r = rec.result, book = `${BOOK_CALL_URL}?notes=${encodeURIComponent(`Teardown: ${rec.host}`)}&utm_source=teardown-email`
  const q = (s) => (s ? `<p style="font-family:Georgia,serif;color:#6E6A63">\u201c${esc(s)}\u201d</p>` : '')
  const block = (h, body) => `<h2 style="font:500 16px Arial">${esc(h)}</h2>${body}`
  const html = [
    block('What it says it is', `<p>${esc(r.says_it_is.summary)}</p>${q(r.says_it_is.quote)}`),
    block('Who it\u2019s for', `<p>${esc(r.for_whom.summary)}</p>${q(r.for_whom.quote)}`),
    block('What it\u2019s up against', `<p>${esc(r.up_against.summary)}</p>`),
    block('Strongest claim', `${q(r.strongest_claim.quote)}<p>${esc(r.strongest_claim.why)}</p>`),
    block('3 gaps', r.gaps.map((g) => `<h3 style="font:500 15px Arial">${esc(g.title)}</h3>${q(g.quote)}<p>${esc(g.problem)}</p><p>${esc(g.fix)}</p>`).join('')),
    block('Rewritten hero line', `<p style="font:22px Georgia,serif">${esc(r.rewrite.hero)}</p><p>${esc(r.rewrite.why)}</p>`),
    `<p><a href="${site}/teardown/r/${esc(rec.id)}">${site}/teardown/r/${esc(rec.id)}</a></p>`,
    `<p><a href="${esc(book)}" style="display:inline-block;padding:12px 20px;background:#0C0C0B;color:#EDEAE3;border-radius:999px;text-decoration:none">Book a 15-minute call</a></p>`,
    `<p style="font-size:12px;color:#6E6A63">${esc(POSTAL_PLACEHOLDER)} \u00b7 <a href="${site}/unsubscribe?e={{EMAIL}}">Unsubscribe</a></p>`,
  ].join('\n')
  return { subject: `Your homepage teardown: ${rec.host}`, html }
}

// Only called when emailEnabled(). Raw fetch, same pattern as the old quiz-lead route.
export async function sendTeardownEmail(rec, to) {
  const { subject, html } = renderEmail(rec)
  const key = process.env.RESEND_API_KEY, headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  if (process.env.RESEND_AUDIENCE_ID) await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, { method: 'POST', headers, body: JSON.stringify({ email: to, unsubscribed: false }) }).catch(() => {})
  const body = { from: process.env.TEARDOWN_FROM_EMAIL, to: [to], subject, html: html.replace('{{EMAIL}}', encodeURIComponent(to)) }
  if (process.env.TEARDOWN_REPLY_TO) body.reply_to = process.env.TEARDOWN_REPLY_TO
  const res = await fetch('https://api.resend.com/emails', { method: 'POST', headers, body: JSON.stringify(body) })
  return res.ok
}
