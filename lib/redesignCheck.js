// Client-side route for the "Redesign or reposition?" check.
// An answer points at positioning when the story is still open.
// Three or more of those answers route to the discovery call. The rest route to the homepage teardown.
export const REDESIGN_CHECK = {
  id: 'redesign-or-reposition',
  title: 'Redesign or reposition?',
  lead: 'Five questions about your own company. Answer from recent sales calls, not from the homepage you hope people see.',
  questions: [
    { id: 'sentence', prompt: 'Can a new visitor say what you do in one sentence?', repositionWhen: 'no' },
    { id: 'calls', prompt: 'Do sales calls start by re-explaining the product?', repositionWhen: 'yes' },
    { id: 'customer', prompt: 'Has the target customer changed since the site was built?', repositionWhen: 'yes' },
    { id: 'alts', prompt: 'Do prospects compare you to the wrong alternatives?', repositionWhen: 'yes' },
    { id: 'looks', prompt: 'Is the main complaint about looks rather than meaning?', repositionWhen: 'no' },
  ],
  bookAt: 3,
  book: 'Positioning comes before a redesign when a stranger cannot say what you sell, who it is for, or what they would use instead. Your answers point there. A new layout would publish that open story again.',
  bookCta: 'Book a 15-minute call',
  teardown: 'A redesign is the right job when a stranger can already name the product, the customer, and the alternative, and the site itself is what gets in the way. Your answers point there. Read the first screen before you pay for a new one.',
  teardownCta: 'Run the homepage teardown',
  teardownHref: '/teardown',
  src: 'redesign-check',
}

export function redesignRoute(answers) {
  const qs = REDESIGN_CHECK.questions
  if (!answers || qs.some((q) => answers[q.id] !== 'yes' && answers[q.id] !== 'no')) return null
  const n = qs.filter((q) => answers[q.id] === q.repositionWhen).length
  return n >= REDESIGN_CHECK.bookAt ? 'book' : 'teardown'
}
