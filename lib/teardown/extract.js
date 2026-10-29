// HTML → ordered plain text (spec §3.4). The HTML is never rendered; only this text is kept.
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '\u2019', lsquo: '\u2018', rdquo: '\u201d', ldquo: '\u201c', mdash: '\u2014', ndash: '\u2013', hellip: '\u2026' }
export const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') { const n = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); try { return String.fromCodePoint(n) } catch { return '' } }
  return ENT[e.toLowerCase()] ?? m
})
const clean = (s) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
export const redact = (s) => s.replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, '').replace(/(\+?\d[\d\s().-]{7,}\d)/g, (m) => (m.replace(/\D/g, '').length >= 9 ? '' : m)).replace(/\s+/g, ' ').trim()
const meta = (html, re) => { const m = html.match(re); return m ? redact(clean(m[1])) : '' }

export function extract(html) {
  let h = html.replace(/<!--[\s\S]*?-->/g, ' ')
  h = h.replace(/<(script|style|svg|noscript|iframe|template|head)\b[\s\S]*?<\/\1\s*>/gi, (m, tag) => (tag.toLowerCase() === 'head' ? m : ' '))
  const title = meta(h, /<title[^>]*>([\s\S]*?)<\/title>/i)
  const metaContent = (name) => meta(h, new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i')) || meta(h, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, 'i'))
  const description = metaContent('description'), ogTitle = metaContent('og:title'), ogDescription = metaContent('og:description')
  const body = h.replace(/<head\b[\s\S]*?<\/head\s*>/i, ' ')
  const lines = [], headlines = [], seen = new Set()
  const re = /<(h[1-3]|p|li|button|a|blockquote|figcaption|dt|dd)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi
  let m, visible = 0
  while ((m = re.exec(body))) {
    const tag = m[1].toLowerCase(); const text = redact(clean(m[2]))
    if (!text || seen.has(tag + text)) continue
    if (/^(a|button)$/.test(tag) && (text.length > 80 || visible > 6000)) continue
    seen.add(tag + text)
    const hx = /^h[1-3]$/.test(tag)
    lines.push(hx ? `${tag.toUpperCase()}: ${text}` : text); visible += text.length
    if (hx) headlines.push({ level: +tag[1], text })
  }
  let textOut = lines.join('\n')
  if (textOut.length > 12000) textOut = textOut.slice(0, 12000)
  const h1 = headlines.find((x) => x.level === 1)?.text || ''
  return { title, description, ogTitle, ogDescription, h1, headlines: headlines.slice(0, 12).map((x) => x.text), text: textOut, visibleChars: visible }
}

// What the anti-fabrication guard compares against.
export const norm = (s) => String(s || '').toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim()
export const corpus = (ex) => norm([ex.title, ex.description, ex.ogTitle, ex.ogDescription, ex.text.replace(/^H[1-3]: /gm, '')].join('\n'))
