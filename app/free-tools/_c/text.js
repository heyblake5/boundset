// Plain-language checks shared by the text tools. Word lists are editable heuristics, not research.
export const JARGON = ['synergy','synergies','leverage','leverages','leveraging','seamless','seamlessly','robust','cutting-edge','best-in-class','world-class','next-gen','next-generation','innovative','revolutionary','disruptive','game-changing','game changer','paradigm','holistic','scalable','end-to-end','turnkey','frictionless','empower','empowers','empowering','unlock','unlocks','supercharge','streamline','streamlines','optimize','optimizes','solution','solutions','platform','ecosystem','transform','transforms','transformative','state-of-the-art','mission-critical','enterprise-grade','ai-powered','all-in-one','one-stop','actionable','value-add','bleeding-edge']
export const VAGUE = ['better','faster','easier','smarter','more','simple','powerful','amazing','great','best','ultimate','modern','everything','anything','all','growth','success','results']
export const words = (s) => (s.toLowerCase().match(/[a-z0-9$%][a-z0-9'’$%-]*/g) || [])
export const sentences = (s) => s.split(/[.!?]+\s|[.!?]+$|\n+/).map((x) => x.trim()).filter(Boolean)
export const hits = (s, list) => { const w = ' ' + words(s).join(' ') + ' '; return list.filter((j) => w.includes(' ' + j + ' ')) }
export function highlight(s, list) {
  if (!s) return []
  const re = new RegExp(`\\b(${list.map((x) => x.replace(/[-]/g, '\\-')).join('|')})\\b`, 'gi')
  const out = []; let last = 0, m
  while ((m = re.exec(s))) { out.push([false, s.slice(last, m.index)], [true, m[0]]); last = m.index + m[0].length }
  out.push([false, s.slice(last)]); return out
}
