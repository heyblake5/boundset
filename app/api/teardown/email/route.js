import { load, admitEmail, chargeEmail } from '../../../../lib/teardown/limits'
import { emailEnabled, validEmail, sendTeardownEmail } from '../../../../lib/teardown/email'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const ipOf = (req) => (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
export async function POST(req) {
  let b = {}
  try { b = await req.json() } catch {}
  if (b.company_hp) return Response.json({ ok: true })
  if (!emailEnabled()) return Response.json({ ok: false, reason: 'disabled' }, { status: 503 })
  if (!validEmail(b.email)) return Response.json({ ok: false, reason: 'email' }, { status: 400 })
  const rec = load(String(b.id || ''))
  if (!rec) return Response.json({ ok: false, reason: 'missing' }, { status: 404 })
  const why = admitEmail(ipOf(req), rec.id); if (why) return Response.json({ ok: false, reason: why }, { status: 429 })
  const ok = await sendTeardownEmail(rec, b.email).catch(() => false)
  if (ok) chargeEmail(ipOf(req), rec.id)
  return Response.json({ ok }, { status: ok ? 200 : 502 })
}
