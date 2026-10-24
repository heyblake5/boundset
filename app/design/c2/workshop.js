// Workshop checkout: Stripe payment link (one-time $2,000, redirects to /workshop/thanks).
// NEXT_PUBLIC_WORKSHOP_LINK overrides it. If the link is ever emptied, the panel and nav entry hide
// (no dead CTA) unless NEXT_PUBLIC_SHOW_WORKSHOP_PREVIEW=1.
const DEFAULT_LINK = 'https://pay.pagetear.com/b/28EdR9eVle3l51Y8q45sA0G'
export const LINK = process.env.NEXT_PUBLIC_WORKSHOP_LINK || DEFAULT_LINK
export const SHOW_WORKSHOP = !!LINK || process.env.NEXT_PUBLIC_SHOW_WORKSHOP_PREVIEW === '1'
export const WORKSHOP_LINK = LINK || '#workshop'
