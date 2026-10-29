// Model layer: Vercel AI Gateway via the AI SDK, gated on env. TEARDOWN_MOCK=1 swaps in fixture output (tests/preview only).
import { SYSTEM, userMessage } from './prompt.js'
import { schema, SECTIONS } from './schema.js'
import { FIXTURE_RESULT } from './fixtures.js'

// Small, cheap default (~$0.001–0.002 per teardown at Gateway list price, Oct 2026); override with TEARDOWN_MODEL.
export const DEFAULT_MODEL = 'anthropic/claude-haiku-5.5'
export const modelId = () => process.env.TEARDOWN_MODEL || DEFAULT_MODEL
export const isMock = () => process.env.TEARDOWN_MOCK === '1' && process.env.VERCEL_ENV !== 'production'
// Vercel puts the AI Gateway OIDC token on the request context, not always in process.env.
function oidcFromRequest() {
  try {
    const ctx = globalThis[Symbol.for('@vercel/request-context')]?.get?.()
    return ctx?.headers?.['x-vercel-oidc-token'] || ''
  } catch { return '' }
}
export function modelStatus() {
  if (isMock()) return { available: true, mock: true }
  if (process.env.TEARDOWN_DISABLED === '1') return { available: false, mock: false }
  const auth = !!(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || oidcFromRequest())
  return { available: auth, mock: false }
}

// Yields completed top-level sections as they finish, then returns the full object.
export async function* runModel({ url, date, ex, extraNote, model }) {
  if (isMock()) {
    const r = globalThis.__tdMockResult || FIXTURE_RESULT
    for (const k of SECTIONS) { await new Promise((s) => setTimeout(s, Number(process.env.TEARDOWN_MOCK_DELAY ?? 250))); yield { key: k, value: r[k] } }
    return r
  }
  const { streamObject } = await import('ai')
  const res = streamObject({
    model: model || modelId(), schema, system: SYSTEM,
    prompt: userMessage({ url, date, ex }) + (extraNote ? `\n\n${extraNote}` : ''),
    maxRetries: 1, abortSignal: AbortSignal.timeout(45000),
  })
  let done = 0, last
  for await (const p of res.partialObjectStream) {
    last = p
    // a key is complete once the next key has started
    while (p && done < SECTIONS.length - 1 && p[SECTIONS[done + 1]] !== undefined) { yield { key: SECTIONS[done], value: p[SECTIONS[done]] }; done++ }
  }
  const full = await res.object
  for (; done < SECTIONS.length; done++) yield { key: SECTIONS[done], value: full[SECTIONS[done]] }
  return full ?? last
}
