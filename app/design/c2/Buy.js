'use client'
// Workshop checkout. URL comes from NEXT_PUBLIC_WORKSHOP_LINK (Heath's Stripe payment link).
// PLACEHOLDER: until it is set, the button points at the in-page #workshop anchor.
export const WORKSHOP_LINK = process.env.NEXT_PUBLIC_WORKSHOP_LINK || '#workshop'
export default function Buy({ className, children }) {
  return <a href={WORKSHOP_LINK} className={className} data-placeholder={WORKSHOP_LINK === '#workshop' || undefined}
    onClick={() => { try { window.plausible && window.plausible('Workshop checkout click') } catch {} }}>{children}</a>
}
