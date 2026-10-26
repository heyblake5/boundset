// Plausible custom events (spec §6). Props only, no PII.
export const track = (event, props) => { if (typeof window !== 'undefined' && typeof window.plausible === 'function') window.plausible(event, props ? { props } : undefined) }
