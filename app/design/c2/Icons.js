// One icon family: 24 grid, 1.5 stroke, round joins, ink via currentColor, at most one accent (.ac) detail.
// Strokes sit on half-pixels (x.75 / x.25) so 1.5px lines land crisp at 1x and 2x.
const A = { fill: 'none', stroke: 'var(--sig)' }
const P = {
  workshop: <><rect x="3.75" y="4.75" width="16.5" height="11" rx="1.5" /><path d="M8.5 19.25 12 15.75l3.5 3.5" /><path d="M7.75 10.25h5" {...A} /></>,
  grid: <><rect x="4.75" y="4.75" width="14.5" height="14.5" rx="1.5" /><path d="M12 4.75v14.5M4.75 12h14.5" /><rect x="7" y="7" width="2.75" height="2.75" rx=".5" fill="var(--sig)" stroke="none" /></>,
  matrix: <><rect x="4.75" y="4.75" width="14.5" height="14.5" rx="1.5" /><path d="M9.58 4.75v14.5M14.42 4.75v14.5M4.75 9.58h14.5M4.75 14.42h14.5" /><rect x="10.83" y="10.83" width="2.34" height="2.34" rx=".4" fill="var(--sig)" stroke="none" /></>,
  usecase: <><rect x="4.75" y="8.75" width="14.5" height="10.5" rx="1.5" /><path d="M7.25 5.75h9.5" /><path d="M8.25 14h7.5" {...A} /></>,
  mvm: <><path d="M4.75 7.25h14.5M4.75 12h9.5" /><path d="M4.75 16.75h5" {...A} /></>,
  canvas: <><rect x="3.75" y="7.75" width="7.5" height="8.5" rx="1" /><circle cx="16.5" cy="12" r="3.75" /><circle cx="16.5" cy="12" r="1.1" fill="var(--sig)" stroke="none" /></>,
  copy: <><rect x="3.75" y="4.75" width="16.5" height="14.5" rx="1.5" /><path d="M3.75 8.25h16.5M7.25 15.25h5.5" /><path d="M7.25 12h9" {...A} /></>,
  wire: <><rect x="3.75" y="4.75" width="16.5" height="14.5" rx="1.5" /><path d="M3.75 8.25h16.5M11.25 8.25v11" /><rect x="5.75" y="10.25" width="3.5" height="3.5" rx=".5" fill="var(--sig)" stroke="none" /></>,
  voice: <><circle cx="9.5" cy="12" r="4.75" /><circle cx="14.5" cy="12" r="4.75" /><circle cx="12" cy="12" r="1" fill="var(--sig)" stroke="none" /></>,
  audit: <><path d="M12 4.75v14.5M4.75 12h14.5" /><circle cx="8" cy="15.75" r=".9" fill="currentColor" stroke="none" /><circle cx="15.5" cy="16" r=".9" fill="currentColor" stroke="none" /><circle cx="7.75" cy="8.25" r=".9" fill="currentColor" stroke="none" /><circle cx="16" cy="8" r="1.6" fill="var(--sig)" stroke="none" /></>,
  asset: <><path d="M19.75 4.25 4.25 10.5l6.5 2.75 2.75 6.5z" /><path d="m10.75 13.25 3.5-3.5" {...A} /></>,
  slack: <><path d="M5.75 5.75h12.5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H11l-3.75 3v-3h-1.5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" /><circle cx="9" cy="10.75" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="10.75" r=".9" fill="var(--sig)" stroke="none" /><circle cx="15" cy="10.75" r=".9" fill="currentColor" stroke="none" /></>,
  // free tools
  statement: <><path d="M5.75 4.75h9l3.5 3.5v11h-12.5z" /><path d="M14.75 4.75v3.5h3.5M8.75 12.25h6.5" /><path d="M8.75 15.75h4" {...A} /></>,
  headline: <><path d="M5.75 6.25h12.5M12 6.25v12" /><path d="M9.25 18.25h5.5" {...A} /></>,
  score: <><path d="M4.75 16.25a7.25 7.25 0 0 1 14.5 0" /><path d="M12 16.25l3.25-4.5" {...A} /><circle cx="12" cy="16.25" r="1" fill="currentColor" stroke="none" /></>,
  hierarchy: <><rect x="9.25" y="4.25" width="5.5" height="4" rx="1" /><path d="M12 8.25v3.5M6.5 11.75h11M6.5 11.75v3M17.5 11.75v3" /><rect x="4" y="14.75" width="5" height="4" rx="1" /><rect x="15" y="14.75" width="5" height="4" rx="1" stroke="var(--sig)" /></>,
  alternatives: <><circle cx="7.5" cy="8" r="2.75" /><circle cx="16.5" cy="8" r="2.75" /><circle cx="7.5" cy="16.5" r="2.75" /><circle cx="16.5" cy="16.5" r="2.75" {...A} /></>,
  icp: <><circle cx="12" cy="9" r="3.25" /><path d="M5.75 19.25a6.25 6.25 0 0 1 12.5 0" /><circle cx="18.25" cy="5.75" r="1.25" fill="var(--sig)" stroke="none" /></>,
  category: <><rect x="4.75" y="4.75" width="6" height="6" rx="1" /><rect x="13.25" y="4.75" width="6" height="6" rx="1" /><rect x="4.75" y="13.25" width="6" height="6" rx="1" /><rect x="13.25" y="13.25" width="6" height="6" rx="1" {...A} /></>,
  debt: <><rect x="4.75" y="4.75" width="14.5" height="14.5" rx="2" /><path d="m8.5 12.25 2.25 2.25 4.75-5" {...A} /></>,
  roi: <><path d="M4.75 19.25h14.5" /><path d="M7.25 16v-3M12 16V9.5" /><path d="M16.75 16V5.75" {...A} /></>,
  pitch: <><rect x="9" y="3.75" width="6" height="10" rx="3" /><path d="M6.25 11.25a5.75 5.75 0 0 0 11.5 0M12 17v3.25" /><path d="M9.5 20.25h5" {...A} /></>,
  teardown: <><path d="M5.75 4.75h12.5v14.5H5.75z" /><path d="M8.75 8.75h6.5M8.75 12h3" /><path d="m12.25 15.75 4 0" {...A} /></>,
  copyIcon: <><rect x="8.75" y="8.75" width="10.5" height="10.5" rx="1.5" /><path d="M15.25 5.75v-.5a.5.5 0 0 0-.5-.5h-9.5a.5.5 0 0 0-.5.5v9.5a.5.5 0 0 0 .5.5h.5" /></>,
  check: <><path d="m6.5 12.5 3.5 3.5 7.5-8" {...A} /></>,
  arrow: <><path d="M5.75 12h12.5M13.25 7l5 5-5 5" /></>,
  retry: <><path d="M18.25 12a6.25 6.25 0 1 1-1.83-4.42" /><path d="M18.25 4.75v3.5h-3.5" {...A} /></>,
  canvasTool: <><rect x="3.75" y="4.75" width="16.5" height="14.5" rx="1.5" /><path d="M9.25 4.75v14.5M9.25 12h11" /><path d="M5.75 8.25h1.5" {...A} /></>,
}
export default function Icon({ name, className, size = 24 }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{P[name]}</svg>
}
