import { NextResponse } from 'next/server'
import { ITEMS, BANDS, bandFor } from '../../../components/quizData'

/*
 * Positioning Debt quiz email capture.
 * Spec: Resend audience "boundset", brand sender, store score + band + checked items.
 *
 * ⚠️ PLACEHOLDER WIRING — needs these env vars on Vercel before it does anything:
 *   RESEND_API_KEY            Resend API key
 *   RESEND_AUDIENCE_ID        id of the Resend audience named "boundset"  [AUDIENCE ID NEEDED]
 *   QUIZ_FROM_EMAIL           brand sender, e.g. "Blake <...@boundset.com>" [BRAND SENDER ADDRESS NEEDED]
 * Without them the route accepts the submission, logs nothing sensitive, and returns { placeholder: true }
 * so the quiz flow still reaches the result page.
 * TODO: Email 2 (day 3, skip if call booked) needs a scheduler + cal.com booking check. Not built.
 * TODO: score/band/checked as Resend contact fields — confirm the audience has these properties.
 */
const BOOK_CALL_URL = 'https://cal.com/heyblake/positioning'

export async function POST(req) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }
  const email = String(body.email || '').trim()
  const firstName = String(body.firstName || '').trim().slice(0, 100)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: 'bad_email' }, { status: 400 })
  const checked = Array.isArray(body.checked) ? body.checked.filter((n) => Number.isInteger(n) && n >= 0 && n < ITEMS.length) : []
  const score = checked.length
  const bandKey = bandFor(score)

  const key = process.env.RESEND_API_KEY
  const audience = process.env.RESEND_AUDIENCE_ID
  const from = process.env.QUIZ_FROM_EMAIL
  if (!key || !audience) return NextResponse.json({ ok: true, placeholder: true })

  const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
  await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, first_name: firstName, unsubscribed: false }),
  })

  if (from) {
    const band = BANDS[bandKey]
    const label = { low: 'Low', medium: 'Medium', high: 'High' }[bandKey]
    const list = checked.map((i) => `- ${ITEMS[i]}`).join('\n')
    // Email 1 copy (Quill, verbatim, with merge fields filled)
    const text = `Hey ${firstName},\n\nYou checked ${score} of 16 red flags. That puts you in the ${label} band.\n\nHere's what you checked:\n${list}\n\nStart with these fixes:\n${band.fixes.join('\n')}\n\nWant a second set of eyes on it? Book a 15 minute call and we'll look at your homepage together.\n\nBook a call: ${BOOK_CALL_URL}\n\n~ Blake`
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({ from, to: email, subject: `Your positioning score: ${score} of 16`, text }),
    })
  }
  return NextResponse.json({ ok: true })
}
