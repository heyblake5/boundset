#!/usr/bin/env node
// Ping IndexNow with every URL in the live sitemaps. Run after a production deploy:
//   node scripts/indexnow.mjs        (only URLs whose lastmod changed since last run)
//   node scripts/indexnow.mjs --all
// Pattern copied from modern-marketing/seo/indexnow.py.
import fs from 'node:fs'
const HOST = 'boundset.com', KEY = '71bea8f58841392a9d084667188ce62f', SENT = new URL('./indexnow-sent.json', import.meta.url)
const all = process.argv.includes('--all')
const sent = !all && fs.existsSync(SENT) ? JSON.parse(fs.readFileSync(SENT)) : {}
const urls = {}
for (const sm of ['sitemap-pages.xml', 'sitemap-content.xml']) {
  const x = await (await fetch(`https://${HOST}/${sm}`)).text()
  for (const m of x.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)) urls[m[1]] = m[2]
}
const list = Object.keys(urls).filter((u) => sent[u] !== urls[u])
if (!list.length) { console.log('IndexNow: nothing changed'); process.exit(0) }
const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: list }) })
console.log(`IndexNow: ${list.length} URLs -> HTTP ${r.status}`)
if ([200, 202].includes(r.status)) { for (const u of list) sent[u] = urls[u]; fs.writeFileSync(SENT, JSON.stringify(sent, null, 1)) }
