// Every user-visible string on the teardown pages. Mirrored in TEARDOWN-COPY.md for Quill.
// Spec strings are verbatim from growth/teardown/spec-for-atlas.md. [BRACKETED] = placeholder, not final.
export const COPY = {
  h1: 'Your homepage should say who it\u2019s for and what it beats',
  placeholder: 'yourcompany.com',
  inputLabel: 'Website URL', // aria-label only
  submitLabel: 'Run teardown', // aria-label only [PLACEHOLDER]
  blocks: { says_it_is: 'What it says it is', for_whom: 'Who it\u2019s for', up_against: 'What it\u2019s up against', strongest_claim: 'Strongest claim', gaps: '3 gaps', rewrite: 'Rewritten hero line' },
  theirPage: 'Their page',
  copyRewrite: 'Copy rewrite', // aria-label only [PLACEHOLDER]
  copied: 'Copied', // aria-live only [PLACEHOLDER]
  emailHeading: 'Send this to my inbox',
  emailLabel: 'Email', // aria-label only
  emailSubmit: 'Send', // aria-label only [PLACEHOLDER]
  emailSent: (e) => `Sent to ${e}`,
  book: 'Book a 15-minute call',
  retry: 'Try again', // aria-label only [PLACEHOLDER]
  errors: {
    blocked: 'We couldn\u2019t read that page.',
    thin: 'That page renders without readable text. Try the full URL.',
    rate: 'You\u2019ve run three today.', rateLink: 'Email us the URL instead?',
    capacity: 'We\u2019re at capacity this month',
    model: 'We couldn\u2019t read that page.', // spec: model failure "shows the error state"; no separate line given [PLACEHOLDER]
    unavailable: '[TEARDOWN UNAVAILABLE LINE NEEDED]',
  },
  mailto: 'blake@boundset.com',
  // teardown pages
  indexTitle: 'Homepage positioning teardowns', // [PLACEHOLDER] page H1
  works: 'What works', // [PLACEHOLDER] heading, from template "what works"
  theirWords: 'Their words', // spec §5 "their words"
  faq: 'FAQ', // [PLACEHOLDER]
  runYours: 'Run yours',
  related: 'Related', // [PLACEHOLDER]
  crumbHome: 'Home', crumbIndex: 'Teardowns',
}
