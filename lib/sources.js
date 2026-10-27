// Shared source registry + content date (no imports, so any lib can use it without cycles).
export const UPDATED = '2026-10-23'

export const SRC = {
  dunford: { label: 'April Dunford, Obviously Awesome', url: 'https://www.aprildunford.com/books' },
  dunfordEx: { label: 'April Dunford, A Product Positioning Exercise', url: 'https://www.aprildunford.com/post/a-product-positioning-exercise' },
  dunfordMsg: { label: 'April Dunford messaging document template (book notes)', url: 'https://abinoda.com/book_notes/obviously_awesome/messaging-template.pdf' },
  dunfordFrame: { label: 'April Dunford, Product framing can help grow your startup (or kill it)', url: 'https://www.aprildunford.com/post/product-framing-can-help-grow-your-startup-or-kill-it' },
  momTest: { label: 'Rob Fitzpatrick, The Mom Test', url: 'https://www.momtestbook.com/' },
  moore: { label: 'Geoffrey Moore, Crossing the Chasm', url: 'https://en.wikipedia.org/wiki/Crossing_the_Chasm' },
  dunfordConsult: { label: 'April Dunford, positioning consultant', url: 'https://www.aprildunford.com/consultant' },
  playBigger: { label: 'Play Bigger, What is category design', url: 'https://playbigger.com/what-is-category-design' },
  playBiggerBook: { label: 'Al Ramadan, Dave Peterson, Christopher Lochhead and Kevin Maney, Play Bigger', url: 'https://www.harperacademic.com/book/9780062407610/play-bigger/' },
  goFractionalPmm: { label: 'Go Fractional, Product Marketing Manager rates (checked 27 Oct 2026)', url: 'https://www.gofractional.com/insights/rates/product-marketing-manager' },
  firstPmm: { label: 'First PMM, fractional product marketing pricing', url: 'https://firstpmm.com/fractional-product-marketing-pricing/' },
  marketerHire: { label: 'MarketerHire, product marketing agency pricing ranges', url: 'https://marketerhire.com/blog/product-marketing-agency' },
}

// Meta descriptions: leading complete sentences that fit ~155 characters.
// Does not change the visible answer. Returns '' when the first sentence is too long
// (callers then require an explicit `meta` sentence).
export function metaDescription(text, max = 155) {
  const t = String(text || '').replace(/\s+/g, ' ').trim()
  const parts = t.match(/[^.!?]+[.!?]+/g) || []
  let out = ''
  for (const part of parts) {
    const s = part.trim()
    const next = out ? `${out} ${s}` : s
    if (next.length <= max) out = next
    else break
  }
  return out
}

export function pageDescription(p, label = '') {
  const max = 155
  const d = (p?.meta ? String(p.meta) : metaDescription(p?.answer || '', max)).replace(/\s+/g, ' ').trim()
  if (!d || d.length > max || !/[.!?]$/.test(d)) {
    throw new Error(`Meta description for ${label || p?.path || p?.title || 'page'} is ${d ? d.length : 0} chars: ${d}`)
  }
  return d
}
