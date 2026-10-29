// node --test tests/  (no extra deps). Covers SSRF, extraction, the quote guard and the in-memory limits.
import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { safeFetch, isPublicIp, checkUrl, robotsDisallowsRoot } from '../lib/teardown/ssrf.js'
import { extract, corpus } from '../lib/teardown/extract.js'
import { guard } from '../lib/teardown/schema.js'
import { FIXTURE_HTML, FIXTURE_RESULT } from '../lib/teardown/fixtures.js'
import * as L from '../lib/teardown/limits.js'
import { emailEnabled, postalAddress } from '../lib/teardown/email-gate.js'

const blocked = async (p) => assert.rejects(p, (e) => e.reason === 'blocked')
const pub = async () => [{ address: '93.184.216.34', family: 4 }]

test('SSRF: metadata IP literal', () => blocked(safeFetch('http://169.254.169.254/latest/meta-data/')))
test('SSRF: localhost:3000', () => blocked(safeFetch('http://localhost:3000')))
test('SSRF: [::1]', () => blocked(safeFetch('http://[::1]/')))
test('SSRF: host resolving to 10.x (stub resolver)', () => blocked(safeFetch('https://internal.example.com/', { resolve: async () => [{ address: '10.1.2.3', family: 4 }] })))
test('SSRF: any private address in the set blocks', () => blocked(safeFetch('https://mixed.example.com/', { resolve: async () => [{ address: '93.184.216.34', family: 4 }, { address: '192.168.1.1', family: 4 }] })))
test('SSRF: scheme, port, credentials, IP literal', async () => {
  for (const u of ['file:///etc/passwd', 'ftp://example.com/', 'https://example.com:8443/', 'https://user:pw@example.com/', 'http://2130706433/', 'http://0x7f000001/', 'http://127.0.0.1/', 'http://foo/'])
    assert.throws(() => checkUrl(u), (e) => e.reason === 'blocked', u)
})
test('isPublicIp ranges', () => {
  for (const a of ['127.0.0.1', '10.0.0.1', '172.16.0.1', '192.168.0.1', '169.254.169.254', '100.64.0.1', '224.0.0.1', '0.0.0.0', '::1', 'fc00::1', 'fd12::1', 'fe80::1', '::ffff:127.0.0.1', '::ffff:10.0.0.1', '64:ff9b::a00:1', '198.18.0.1']) assert.equal(isPublicIp(a), false, a)
  for (const a of ['93.184.216.34', '2606:4700::1111', '8.8.8.8']) assert.equal(isPublicIp(a), true, a)
})
test('SSRF: redirect to 127.0.0.1 is re-checked and blocked', async () => {
  const srv = http.createServer((req, res) => { res.writeHead(302, { location: 'http://127.0.0.1/admin' }); res.end() })
  await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const port = String(srv.address().port)
  let hops = 0
  try {
    // The first hop is allowed to reach the local redirector (test only); every later hop uses the real check.
    await blocked(safeFetch(`http://redirector.example.com:${port}/`, { ports: [port], resolve: async () => [{ address: '127.0.0.1', family: 4 }], allowIp: (a, hop) => { hops = Math.max(hops, hop); return hop === 0 ? true : isPublicIp(a) } }))
    assert.equal(hops, 0) // stopped by the IP-literal check before DNS on hop 1
    // same redirect via a hostname that resolves to 127.0.0.1 is stopped by the address check on hop 1
    srv.removeAllListeners('request'); srv.on('request', (q, r) => { r.writeHead(302, { location: 'http://sneaky.example.com/' }); r.end() })
    await blocked(safeFetch(`http://redirector.example.com:${port}/`, { ports: [port], resolve: async () => [{ address: '127.0.0.1', family: 4 }], allowIp: (a, hop) => { hops = Math.max(hops, hop); return hop === 0 ? true : isPublicIp(a) } }))
    assert.equal(hops, 1)
  } finally { srv.close() }
})
test('SSRF: redirect to a name resolving private is blocked; >3 redirects blocked', async () => {
  let n = 0
  const srv = http.createServer((req, res) => { n++; res.writeHead(301, { location: req.url === '/loop' ? '/loop' : 'http://evil.example.com/' }); res.end() })
  await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const port = String(srv.address().port)
  try {
    const resolve = async (h) => [{ address: h === 'evil.example.com' ? '10.0.0.5' : '127.0.0.1', family: 4 }]
    await blocked(safeFetch(`http://a.example.com:${port}/`, { ports: [port], resolve, allowIp: (a) => a === '127.0.0.1' || isPublicIp(a) }))
    n = 0; await blocked(safeFetch(`http://a.example.com:${port}/loop`, { ports: [port], resolve: async () => [{ address: '127.0.0.1', family: 4 }], allowIp: () => true }))
    assert.equal(n, 4) // 1 + 3 redirects, then stop
  } finally { srv.close() }
})
test('SSRF: size cap, content-type, timeout', async () => {
  const srv = http.createServer((req, res) => {
    if (req.url === '/big') { res.writeHead(200, { 'content-type': 'text/html' }); res.end('x'.repeat(2 * 1024 * 1024)) }
    else if (req.url === '/json') { res.writeHead(200, { 'content-type': 'application/json' }); res.end('{}') }
    else if (req.url === '/slow') { setTimeout(() => res.end('late'), 3000) }
    else { res.writeHead(200, { 'content-type': 'text/html' }); res.end('<h1>ok</h1>') }
  })
  await new Promise((r) => srv.listen(0, '127.0.0.1', r)); const port = String(srv.address().port)
  const o = { ports: [port], resolve: async () => [{ address: '127.0.0.1', family: 4 }], allowIp: () => true }
  try {
    await blocked(safeFetch(`http://t.example.com:${port}/big`, o))
    await blocked(safeFetch(`http://t.example.com:${port}/json`, o))
    await blocked(safeFetch(`http://t.example.com:${port}/slow`, { ...o, timeoutMs: 500 }))
    const ok = await safeFetch(`http://t.example.com:${port}/`, o); assert.match(ok.body, /ok/)
  } finally { srv.close() }
})
test('robots.txt root disallow', () => {
  assert.equal(robotsDisallowsRoot('User-agent: *\nDisallow: /'), true)
  assert.equal(robotsDisallowsRoot('User-agent: *\nDisallow: /admin'), false)
  assert.equal(robotsDisallowsRoot('User-agent: BoundsetTeardown\nDisallow: /\n\nUser-agent: *\nDisallow:'), true)
  assert.equal(robotsDisallowsRoot(''), false)
})
test('extract: strips scripts, redacts email/phone, marks headings', () => {
  const ex = extract(FIXTURE_HTML)
  assert.equal(ex.h1, 'Welcome to agentic revenue.')
  assert.ok(!ex.text.includes('evil()')); assert.ok(!ex.text.includes('@attio')); assert.ok(!ex.text.includes('555-0100'))
  assert.match(ex.text, /^H2: For the people who own the number\.$/m)
  assert.ok(ex.visibleChars >= 300)
})
test('quote guard: real quotes pass, fabricated gap is dropped, fabricated optional quote nulled', () => {
  const c = corpus(extract(FIXTURE_HTML))
  assert.equal(guard(FIXTURE_RESULT, c).ok, true)
  const bad = structuredClone(FIXTURE_RESULT)
  bad.gaps[1].quote = 'The #1 CRM trusted by 10,000 teams.'
  bad.says_it_is.quote = 'Made up tagline'
  const g = guard(bad, c)
  assert.equal(g.ok, false); assert.equal(g.result.gaps.length, 2); assert.equal(g.result.says_it_is.quote, null)
  assert.ok(!JSON.stringify(g.result).includes('10,000'))
  const fakeClaim = structuredClone(FIXTURE_RESULT); fakeClaim.strongest_claim.quote = 'Invented claim'
  assert.equal(guard(fakeClaim, c).ok, false)
  const long = structuredClone(FIXTURE_RESULT); long.rewrite.hero = Array(16).fill('word').join(' ')
  assert.equal(guard(long, c).ok, false)
})
test('limits: 3 per IP per 24h, then rate', () => {
  L._reset(); const t = Date.UTC(2026, 9, 26, 12)
  for (let i = 0; i < 3; i++) { assert.equal(L.admit('1.1.1.1', t + i), null); L.charge('1.1.1.1', t + i) }
  assert.equal(L.admit('1.1.1.1', t + 10), 'rate')
  assert.equal(L.admit('1.1.1.1', t + 864e5 + 10), null)
})
test('limits: global 15/day then capacity; monthly 300 then capacity', () => {
  L._reset(); const t = Date.UTC(2026, 9, 26, 12)
  for (let i = 0; i < 15; i++) { assert.equal(L.admit(`2.0.0.${i}`, t), null); L.charge(`2.0.0.${i}`, t) }
  assert.equal(L.admit('3.3.3.3', t), 'daily')
  assert.equal(L.admit('3.3.3.3', t + 864e5), null) // next day resets daily
  L._reset(); L._state.month['2026-10'] = 300
  assert.equal(L.admit('4.4.4.4', t), 'monthly')
  assert.equal(L.CFG().monthly, 300); assert.equal(L.CFG().daily, 15)
})
test('limits: host cache 7 days, results 30 days, IP never stored raw', () => {
  L._reset(); const t = Date.UTC(2026, 9, 1)
  L.save({ id: 'abc', host: 'attio.com', result: {}, page: {} }, t)
  assert.equal(L.cached('attio.com', t + 6 * 864e5), 'abc'); assert.equal(L.cached('attio.com', t + 8 * 864e5), null)
  assert.ok(L.load('abc', t + 29 * 864e5)); assert.equal(L.load('abc', t + 31 * 864e5), null)
  L.charge('9.9.9.9', t); assert.ok(![...L._state.ip.keys()].some((k) => k.includes('9.9.9.9')))
})
test('limits: 5 per IP per minute, then burst', () => {
  L._reset(); const t = Date.UTC(2026, 9, 26, 12)
  for (let i = 0; i < 5; i++) assert.equal(L.admitBurst('8.8.8.8', t), null)
  assert.equal(L.admitBurst('8.8.8.8', t), 'burst')
  assert.equal(L.admitBurst('8.8.4.4', t), null)
  assert.equal(L.admitBurst('8.8.8.8', t + 60_000), null)
  assert.ok(![...L._state.burst.keys()].some((k) => k.includes('8.8.8.8')))
})
test('email capture stays off without a real postal address', () => {
  const keys = ['TEARDOWN_EMAIL_ENABLED', 'TEARDOWN_POSTAL_ADDRESS', 'RESEND_API_KEY', 'TEARDOWN_FROM_EMAIL']
  const prev = Object.fromEntries(keys.map((k) => [k, process.env[k]]))
  try {
    for (const k of keys) delete process.env[k]
    assert.equal(emailEnabled(), false)
    process.env.TEARDOWN_EMAIL_ENABLED = '1'
    process.env.RESEND_API_KEY = 'test'
    process.env.TEARDOWN_FROM_EMAIL = 'blake@boundset.com'
    process.env.TEARDOWN_POSTAL_ADDRESS = 'High Noon LLC, [ADDRESS NEEDED]'
    assert.equal(postalAddress(), '')
    assert.equal(emailEnabled(), false)
    process.env.TEARDOWN_POSTAL_ADDRESS = 'High Noon LLC, 1 Main St, Austin TX 78701'
    assert.equal(emailEnabled(), true)
    assert.match(postalAddress(), /1 Main St/)
  } finally {
    for (const k of keys) {
      if (prev[k] === undefined) delete process.env[k]
      else process.env[k] = prev[k]
    }
  }
})
test('email: 1 per id, 5 per IP per day', () => {
  L._reset()
  for (let i = 0; i < 5; i++) { assert.equal(L.admitEmail('5.5.5.5', `id${i}`), null); L.chargeEmail('5.5.5.5', `id${i}`) }
  assert.equal(L.admitEmail('5.5.5.5', 'id9'), 'rate'); assert.equal(L.admitEmail('6.6.6.6', 'id0'), 'duplicate')
})
