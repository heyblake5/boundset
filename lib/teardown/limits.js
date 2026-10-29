// In-memory limits, cache and result store (no new vendors, per Bond).
// NOTE: state lives per serverless instance and resets on cold start. Counts are best-effort, not global.
import crypto from 'node:crypto'
const DAY = 864e5
export const CFG = () => ({
  perIp: 3, ipWindow: DAY, hostTtl: 7 * DAY, resultTtl: 30 * DAY,
  daily: Number(process.env.TEARDOWN_DAILY_CAP || 15), monthly: Number(process.env.TEARDOWN_MONTHLY_CAP || 300),
  emailPerIp: 5,
  burst: 5, burstWindow: 60_000,
})
const g = globalThis.__td || (globalThis.__td = { ip: new Map(), host: new Map(), results: new Map(), day: {}, month: {}, emailIp: new Map(), emailed: new Set(), burst: new Map() })
export const _state = g
export const hashIp = (ip) => crypto.createHash('sha256').update(`${process.env.TEARDOWN_IP_SALT || 'td'}:${ip}`).digest('hex').slice(0, 32)
const hits = (map, key, now, win) => { const a = (map.get(key) || []).filter((t) => now - t < win); map.set(key, a); return a }
const keys = (now) => { const d = new Date(now).toISOString(); return { day: d.slice(0, 10), month: d.slice(0, 7) } }

export function cached(host, now = Date.now()) { const c = g.host.get(host); if (c && now - c.at < CFG().hostTtl) return c.id; return null }
// Call before running a fresh teardown. Returns null when allowed, else 'rate' | 'daily' | 'monthly'.
export function admit(ip, now = Date.now()) {
  const c = CFG(), k = keys(now), h = hashIp(ip)
  if (hits(g.ip, h, now, c.ipWindow).length >= c.perIp) return 'rate'
  if ((g.month[k.month] || 0) >= c.monthly) return 'monthly'
  if ((g.day[k.day] || 0) >= c.daily) return 'daily'
  return null
}
// Sliding window on every POST /api/teardown. In-memory per instance, same stopgap as the other caps.
// Returns null when allowed, else 'burst'. Counts the attempt, including ones that are rejected.
export function admitBurst(ip, now = Date.now()) {
  if (!g.burst) g.burst = new Map()
  const c = CFG()
  const a = hits(g.burst, hashIp(ip), now, c.burstWindow)
  a.push(now)
  return a.length > c.burst ? 'burst' : null
}
export function charge(ip, now = Date.now()) {
  const k = keys(now), h = hashIp(ip)
  hits(g.ip, h, now, CFG().ipWindow).push(now)
  g.day[k.day] = (g.day[k.day] || 0) + 1; g.month[k.month] = (g.month[k.month] || 0) + 1
}
export function save(rec, now = Date.now()) {
  g.results.set(rec.id, { ...rec, createdAt: now }); g.host.set(rec.host, { id: rec.id, at: now })
  for (const [id, r] of g.results) if (now - r.createdAt > CFG().resultTtl) g.results.delete(id)
}
export function load(id, now = Date.now()) { const r = g.results.get(id); return r && now - r.createdAt < CFG().resultTtl ? r : null }
export function admitEmail(ip, id, now = Date.now()) {
  if (g.emailed.has(id)) return 'duplicate'
  if (hits(g.emailIp, hashIp(ip), now, DAY).length >= CFG().emailPerIp) return 'rate'
  return null
}
export function chargeEmail(ip, id, now = Date.now()) { g.emailed.add(id); hits(g.emailIp, hashIp(ip), now, DAY).push(now) }
export function _reset() { g.ip.clear(); g.host.clear(); g.results.clear(); g.day = {}; g.month = {}; g.emailIp.clear(); g.emailed.clear(); if (!g.burst) g.burst = new Map(); g.burst.clear() }
