import { teardown } from '../../../lib/teardown/run'
import { modelStatus } from '../../../lib/teardown/model'
export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'
const ipOf = (req) => (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'

export function GET() { return Response.json({ available: modelStatus().available }) }

export async function POST(req) {
  let body = {}
  try { body = await req.json() } catch {}
  const enc = new TextEncoder()
  const bot = body.company_hp || !(Number(body.elapsed) >= 1500)
  const stream = new ReadableStream({
    async start(ctl) {
      const emit = (e) => ctl.enqueue(enc.encode(JSON.stringify(e) + '\n'))
      try {
        if (bot) emit({ type: 'error', reason: 'blocked' })
        else await teardown({ url: body.url, ip: ipOf(req), emit })
      } catch { emit({ type: 'error', reason: 'model' }) }
      ctl.close()
    },
  })
  return new Response(stream, { headers: { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-store' } })
}
