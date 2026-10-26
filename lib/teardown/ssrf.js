// URL safety for the teardown fetcher (spec §3.3). Server only.
// Every hop: parse → resolve → reject any non-public address → connect to the vetted IP (no second DNS lookup).
import net from 'node:net'
import dns from 'node:dns'
import http from 'node:http'
import https from 'node:https'
import ipaddr from 'ipaddr.js'

export const UA = 'BoundsetTeardown/1.0 (+https://boundset.com/teardown)'
export class FetchBlocked extends Error { constructor(reason) { super(reason); this.reason = reason } }

// Only globally routable unicast is allowed. ipaddr.js range() names everything else.
export function isPublicIp(addr) {
  if (!ipaddr.isValid(addr)) return false
  let ip = ipaddr.parse(addr)
  if (ip.kind() === 'ipv6' && ip.isIPv4MappedAddress()) ip = ip.toIPv4Address()
  const r = ip.range()
  if (r !== 'unicast') return false
  if (ip.kind() === 'ipv4') {
    // ranges ipaddr.js labels unicast but are not public
    const bad = [['100.64.0.0', 10], ['192.0.0.0', 24], ['198.18.0.0', 15], ['0.0.0.0', 8]]
    if (bad.some(([n, l]) => ip.match(ipaddr.parse(n), l))) return false
  } else if (ip.match(ipaddr.parse('64:ff9b::'), 96)) {
    return isPublicIp(ipaddr.fromByteArray(ip.toByteArray().slice(12)).toString())
  }
  return true
}

export function checkUrl(input, ports = ['80', '443']) {
  let u
  try { u = new URL(input) } catch { throw new FetchBlocked('blocked') }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new FetchBlocked('blocked')
  if (u.port && !ports.includes(u.port)) throw new FetchBlocked('blocked')
  if (u.username || u.password) throw new FetchBlocked('blocked')
  const host = u.hostname.replace(/^\[|\]$/g, '').replace(/\.$/, '').toLowerCase()
  if (!host || host.length > 253 || !host.includes('.') || net.isIP(host)) throw new FetchBlocked('blocked')
  if (/(^|\.)(localhost|local|internal|localdomain)$/.test(host)) throw new FetchBlocked('blocked')
  return { u, host }
}

const defaultResolve = (host) => dns.promises.lookup(host, { all: true, verbatim: true })

export async function vet(host, resolve = defaultResolve, ok = isPublicIp) {
  let addrs
  try { addrs = await resolve(host) } catch { throw new FetchBlocked('blocked') }
  if (!addrs?.length || addrs.some((a) => !ok(a.address))) throw new FetchBlocked('blocked')
  return addrs[0]
}

// One request to an already-vetted address. Returns { status, headers, body } (body capped).
function requestOnce(u, host, addr, { timeoutMs, maxBytes, signal, accept }) {
  return new Promise((resolve, reject) => {
    const mod = u.protocol === 'https:' ? https : http
    const req = mod.request({
      protocol: u.protocol, hostname: host, servername: net.isIP(host) ? undefined : host,
      port: u.port || (u.protocol === 'https:' ? 443 : 80), path: u.pathname + u.search, method: 'GET',
      headers: { 'user-agent': UA, accept: accept || 'text/html,application/xhtml+xml', 'accept-encoding': 'identity' },
      lookup: (_h, opts, cb) => (opts && opts.all ? cb(null, [addr]) : cb(null, addr.address, addr.family)),
      signal, timeout: timeoutMs,
    }, (res) => {
      const chunks = []; let n = 0
      res.on('data', (c) => { n += c.length; if (n > maxBytes) { req.destroy(); reject(new FetchBlocked('blocked')) } else chunks.push(c) })
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }))
      res.on('error', () => reject(new FetchBlocked('blocked')))
    })
    req.on('timeout', () => req.destroy(new Error('timeout')))
    req.on('error', (e) => reject(e instanceof FetchBlocked ? e : new FetchBlocked('blocked')))
    req.end()
  })
}

export async function safeFetch(input, opts = {}) {
  // `ports` and `allowIp` exist only so tests can stand up a local redirector; production callers never pass them.
  const { resolve = defaultResolve, maxRedirects = 3, timeoutMs = 8000, maxBytes = 1.5 * 1024 * 1024, html = true, accept, ports, allowIp } = opts
  const ac = new AbortController(); const timer = setTimeout(() => ac.abort(), timeoutMs)
  try {
    let url = input
    for (let hop = 0; hop <= maxRedirects; hop++) {
      const { u, host } = checkUrl(url, ports)
      const addr = await vet(host, resolve, allowIp ? (a) => allowIp(a, hop) : isPublicIp)
      const res = await requestOnce(u, host, addr, { timeoutMs, maxBytes, signal: ac.signal, accept })
      if (res.status >= 300 && res.status < 400 && res.headers.location) { url = new URL(res.headers.location, u).toString(); continue }
      if (res.status !== 200) throw new FetchBlocked('blocked')
      if (html && !/text\/html|application\/xhtml/i.test(res.headers['content-type'] || '')) throw new FetchBlocked('blocked')
      return { ...res, url: u.toString(), host }
    }
    throw new FetchBlocked('blocked')
  } finally { clearTimeout(timer) }
}

// Homepage only: is "/" disallowed for our UA or "*"?
export function robotsDisallowsRoot(txt) {
  const groups = []; let cur = null, lastUa = false
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim(); if (!line) continue
    const [k, ...rest] = line.split(':'); const key = k.trim().toLowerCase(); const v = rest.join(':').trim()
    if (key === 'user-agent') { if (!lastUa) { cur = { uas: [], rules: [] }; groups.push(cur) } cur.uas.push(v.toLowerCase()); lastUa = true }
    else { lastUa = false; if (cur && (key === 'disallow' || key === 'allow')) cur.rules.push([key, v]) }
  }
  const pick = groups.find((g) => g.uas.some((a) => a && 'boundsetteardown'.startsWith(a.replace(/\/.*$/, '')) && a !== '*')) || groups.find((g) => g.uas.includes('*'))
  if (!pick) return false
  if (pick.rules.some(([k, v]) => k === 'allow' && v === '/')) return false
  return pick.rules.some(([k, v]) => k === 'disallow' && (v === '/' || v === '/*'))
}
