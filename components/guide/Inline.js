// Inline markdown -> React: **bold**, [text](url). Nothing else is used in the guides.
export default function Inline({ text }) {
  const out = []; const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g; let last = 0, m, k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) out.push(<strong key={k++}>{m[1]}</strong>)
    else { const ext = /^https?:/.test(m[3]); out.push(<a key={k++} href={m[3]} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{m[2]}</a>) }
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
