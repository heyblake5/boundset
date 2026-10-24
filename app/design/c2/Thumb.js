// Abstracted document thumbnails: each one is drawn like the artifact it stands for.
// Pure SVG, server-rendered, currentColor + a single accent mark.
const L = (x, y, w, o = 1) => <rect x={x} y={y} width={w} height="3" rx="1.5" opacity={o} />
const lines = (x, y, n, w, gap = 8) => Array.from({ length: n }, (_, i) => L(x, y + i * gap, i === n - 1 ? w * 0.6 : w, 0.55))
const K = {
  workshop: <>{[0, 1, 2, 3].map((i) => <rect key={i} x={14 + (i % 2) * 48} y={14 + Math.floor(i / 2) * 36} width="44" height="32" rx="1.5" className="o" />)}<circle cx="36" cy="26" r="5" className="a" /><circle cx="84" cy="26" r="5" /><circle cx="36" cy="62" r="5" /><circle cx="84" cy="62" r="5" />{lines(14, 98, 3, 92)}</>,
  grid: <>{[0, 1, 2].map((r) => [0, 1].map((c) => <rect key={r + '' + c} x={14 + c * 47} y={14 + r * 40} width="45" height="38" className="o" />))}<rect x="14" y="14" width="45" height="38" className="af" />{[0, 1, 2].map((r) => [0, 1].map((c) => r + c === 0 ? null : <g key={'l' + r + c}>{lines(20 + c * 47, 24 + r * 40, 3, 32, 7)}</g>))}<rect x="20" y="24" width="26" height="3" className="ink" /><rect x="20" y="31" width="20" height="3" className="ink" /></>,
  matrix: <>{[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3].map((c) => <rect key={r + '' + c} x={14 + c * 23.5} y={14 + r * 24} width="21.5" height="22" className={r === 0 || c === 0 ? 'f' : 'o'} />))}<rect x="61" y="62" width="21.5" height="22" className="af" /></>,
  usecase: <>{[0, 1, 2].map((i) => <g key={i}><rect x={14 + i * 32} y="14" width="28" height="12" rx="6" className={i ? 'o' : 'af'} /></g>)}{lines(14, 40, 4, 92)}<rect x="14" y="80" width="92" height="44" className="o" />{lines(22, 90, 3, 60)}</>,
  mvm: <><rect x="14" y="54" width="92" height="22" className="o" />{L(22, 63, 76)}<rect x="20" y="60" width="4" height="10" className="a" />{lines(30, 96, 2, 60, 7)}</>,
  canvas: <><rect x="14" y="30" width="40" height="60" className="o" /><circle cx="86" cy="60" r="22" className="o" /><line x1="54" y1="60" x2="64" y2="60" className="s" /><circle cx="86" cy="60" r="6" className="a" />{lines(20, 40, 4, 26, 10)}</>,
  copy: <><rect x="14" y="17" width="70" height="6" className="f" /><rect x="14" y="30" width="54" height="5" className="o" /><rect x="14" y="40" width="62" height="5" className="o dash" />{lines(14, 56, 3, 90)}<rect x="14" y="88" width="26" height="9" rx="4.5" className="af" /></>,
  wire: <><rect x="14" y="14" width="92" height="8" className="f" /><rect x="14" y="28" width="56" height="30" className="o" /><line x1="14" y1="28" x2="70" y2="58" className="s" /><line x1="70" y1="28" x2="14" y2="58" className="s" />{lines(76, 30, 3, 30, 7)}{[0, 1, 2].map((i) => <rect key={i} x={14 + i * 31.3} y="66" width="29" height="24" className="o" />)}<rect x="14" y="98" width="92" height="22" className="o" /><rect x="48" y="104" width="24" height="9" rx="4.5" className="af" /></>,
  voice: <><circle cx="38" cy="40" r="16" className="o" /><rect x="66" y="24" width="40" height="32" className="o" />{lines(14, 72, 3, 40)}{lines(66, 72, 3, 40)}<line x1="60" y1="20" x2="60" y2="110" className="s a2" /></>,
  audit: <><line x1="60" y1="14" x2="60" y2="110" className="s" /><line x1="14" y1="62" x2="106" y2="62" className="s" /><circle cx="36" cy="40" r="4" /><circle cx="82" cy="84" r="4" /><circle cx="44" cy="88" r="4" /><circle cx="88" cy="34" r="6" className="a" /></>,
  asset: <><rect x="14" y="14" width="92" height="12" className="f" />{L(20, 19, 40)}{lines(14, 36, 6, 92)}<rect x="14" y="92" width="44" height="3" className="a" /></>,
  slack: <>{[[14, 18, 60], [34, 46, 72], [14, 74, 50], [34, 98, 56]].map(([x, y, w], i) => <g key={i}><rect x={x === 14 ? 14 : 92} y={y} width="10" height="10" rx="2" className={x === 14 ? 'f' : 'af'} /><rect x={x === 14 ? 28 : 92 - w - 4} y={y} width={w} height="18" rx="4" className="o" /></g>)}</>,
}
export const kinds = ['workshop', 'grid', 'matrix', 'usecase', 'mvm', 'canvas', 'copy', 'wire', 'voice', 'audit', 'asset', 'slack']
export default function Thumb({ kind, className }) {
  return <span className={className} aria-hidden="true"><svg viewBox="0 0 120 134" focusable="false">{K[kind]}</svg></span>
}
