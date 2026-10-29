// Capture stays off unless the flag, Resend, a non-Pagetear sender, and a real postal address are all set.
// A bracketed or "NEEDED" value is not a postal address, so the field and the email footer stay hidden.
export function postalAddress() {
  const a = (process.env.TEARDOWN_POSTAL_ADDRESS || '').trim()
  if (!a || /\[[^\]]+\]/.test(a) || /\b(NEEDED|placeholder)\b/i.test(a)) return ''
  return a
}
export const emailEnabled = () => process.env.TEARDOWN_EMAIL_ENABLED === '1' && !!process.env.RESEND_API_KEY && !!process.env.TEARDOWN_FROM_EMAIL && !/pagetear\.com/i.test(process.env.TEARDOWN_FROM_EMAIL) && !!postalAddress()
