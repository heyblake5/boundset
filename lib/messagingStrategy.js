// The sprint method, from the public sprint page and the published client line. No client names.
export const CHECKED = '2026-11-13'

export const OPENING = 'A messaging strategy is the short set of approved messages every team at a startup reuses: a one-liner, three value themes with proof, and how each message changes by buyer. Build it after your positioning is settled. Boundset builds both in a two-week sprint: research, one workshop, then a messaging matrix and finished homepage copy.'

export const H1 = 'How to build a messaging strategy'
export const TITLE = 'How to build a messaging strategy | Boundset'
export const DESCRIPTION = 'A messaging strategy is the one-liner, three value themes, and the line for each buyer. Build it after positioning is settled.'

const words = (t) => (t.match(/[A-Za-z0-9$%][\w$%,.'’/-]*/g) || []).length
export const openingWords = words(OPENING)

export const QUOTE = "As an early stage AI company building something new, it's surprisingly difficult to succinctly explain what you do"
export const QUOTE_BY = 'The CEO of an early-stage AI company'

export const DAYS = [
  { id: 'd1', n: '1', name: 'Send files', you: 'You send a demo, one recorded sales call, the current site, and a competitor list. Gathering that takes about 30 minutes.', get: 'The sprint starts from those files.' },
  { id: 'd2', n: '2', name: 'Research', you: 'You have no meeting.', get: 'I read the product, the buyers, and the competitors before the workshop, so the first session does not start from zero.' },
  { id: 'd3', n: '3', name: 'Workshop', you: 'You answer questions for 90 minutes, about the customer, the alternatives, and the product. You do that before you see options.', get: 'A working session, not a deck. The choices are still to be written down.' },
  { id: 'd4', n: '4', name: 'Choices', you: 'You wait for the write-up.', get: 'The positioning choices go into a strategy grid: the statement, the problem, the value, and the arguments under them.' },
  { id: 'd5', n: '5', name: 'Lock it', you: 'You review the choices and say which one holds.', get: 'The position is settled. Messaging does not start before this.' },
  { id: 'd6', n: '6', name: 'Matrix', you: 'You have no meeting.', get: 'The messaging matrix starts: a one-liner, three value themes, and the proof for each.' },
  { id: 'd7', n: '7', name: 'The words', you: 'You mark the words the company will not say.', get: 'The matrix records how each message changes by buyer, and a column for the words you do not say.' },
  { id: 'd8', n: '8', name: 'Homepage', you: 'You have no meeting.', get: 'Homepage copy, with variants for the headings.' },
  { id: 'd9', n: '9', name: 'Wireframe', you: 'You have no meeting.', get: 'A wireframe with that copy in place, section by section. Your designer does the visual design.' },
  { id: 'd10', n: '10', name: 'Feedback', you: 'You send feedback. Across the two weeks your time is about four to five hours, including the workshop, the reviews, and notes like these.', get: 'Revisions from that feedback. You leave with the matrix and the homepage copy.' },
]

export const MATRIX_HEADERS = ['Value theme', 'Buyer', 'Claim', 'Proof', 'Words we do not say']

export const MATRIX_TSV = [
  'One-liner\t',
  '',
  MATRIX_HEADERS.join('\t'),
  '1\t\t\t\t',
  '2\t\t\t\t',
  '3\t\t\t\t',
  '',
].join('\n')

export const MATRIX_CSV = [
  'One-liner,',
  '',
  MATRIX_HEADERS.join(','),
  '1,,,,',
  '2,,,,',
  '3,,,,',
  '',
].join('\n')

export function messageLd() {
  const url = 'https://boundset.com/messaging-strategy'
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: H1, description: DESCRIPTION, url, mainEntityOfPage: url,
      datePublished: CHECKED, dateModified: CHECKED, inLanguage: 'en',
      author: { '@type': 'Person', name: 'Blake Emal', jobTitle: '3x Head of Marketing', url: 'https://boundset.com/about' },
      publisher: { '@id': 'https://boundset.com/#org' } },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How Boundset builds a messaging strategy in ten working days',
      description: OPENING, totalTime: 'P10D',
      step: DAYS.map((d, i) => ({ '@type': 'HowToStep', position: i + 1, name: `Day ${d.n}: ${d.name}`, text: `${d.you} ${d.get}`, url: `${url}#day-${d.n}` })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Boundset', item: 'https://boundset.com/' },
      { '@type': 'ListItem', position: 2, name: H1, item: url }] },
  ]
}

export function messageMarkdown() {
  const lines = [
    '---',
    `title: ${JSON.stringify(H1)}`,
    `description: ${JSON.stringify(DESCRIPTION)}`,
    `updated: ${CHECKED}`,
    'canonical: https://boundset.com/messaging-strategy',
    'author: Blake Emal, 3x Head of Marketing',
    '---',
    '',
    `# ${H1}`,
    '',
    OPENING,
    '',
    'Build the messaging strategy after the positioning is settled. The sprint below is ten working days.',
    '',
    '## Ten working days',
    '',
  ]
  for (const d of DAYS) lines.push(`### Day ${d.n}: ${d.name}`, '', d.you, '', d.get, '')
  lines.push('## Messaging matrix', '', 'Copy this into a sheet. One row per value theme.', '', '```', MATRIX_TSV.trimEnd(), '```', '')
  lines.push(`> ${QUOTE}`, '', QUOTE_BY, '')
  lines.push('## Related', '', '- [What is a messaging framework](https://boundset.com/answers/what-is-a-messaging-framework)', '- [Messaging matrix template](https://boundset.com/answers/messaging-matrix-template)', '- [Positioning vs messaging](https://boundset.com/answers/positioning-vs-messaging)', '- [Positioning sprint](https://boundset.com/sprint)', '- [What positioning work costs](https://boundset.com/positioning-cost)', '')
  return lines.join('\n')
}

export const messageLlms = {
  answer: OPENING,
  sections: [
    { h: 'Ten working days', list: DAYS.map((d) => [`Day ${d.n}: ${d.name}`, `${d.you} ${d.get}`]) },
    { h: 'Messaging matrix', body: `Columns: ${MATRIX_HEADERS.join(', ')}. ${QUOTE} ${QUOTE_BY}.` },
  ],
}
