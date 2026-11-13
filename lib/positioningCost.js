// Prices read on public pages, November 13, 2026. A number is here only when that page states it.
export const CHECKED = '2026-11-13'
export const CHECKED_LABEL = 'November 13, 2026'

export const OPENING = 'Published prices for outside positioning help run from $750 to $100,000 for a project. Checked November 13, 2026. Fixed-price sprints run from $2,000 to $30,000. April Dunford lists her workshop at $50,000, $80,000, and $80,000 to $100,000. Fractional product marketers bill by the month. A full-time marketing manager is paid a salary.'

export const H1 = 'What positioning work costs'
export const TITLE = 'What positioning work costs | Boundset'
export const DESCRIPTION = 'Published prices for outside positioning help, from a $750 assessment to a $100,000 workshop, each one linked to the page that states it.'

const words = (t) => (t.match(/[A-Za-z0-9$%][\w$%,.'’/-]*/g) || []).length
export const openingWords = words(OPENING)

export const SOURCES = {
  boundset: { name: 'Boundset', url: 'https://boundset.com/sprint', note: 'Workshop $2,000, credited in full toward a sprint if you start within 30 days. Stake $7,500. Stronghold $12,000.' },
  rethink: { name: 'Rethink GTM', url: 'https://rethinkgtm.io/services/b2b-positioning-messaging-sprint', note: 'B2B Positioning and Messaging Sprint, $2,400 one time. Three weeks, plus a fourth week for revisions if needed.' },
  hydra: { name: 'HuntingHydra', url: 'https://www.huntinghydra.com/positioning', note: 'Positioning sprint, $5,000, two weeks.' },
  sfma: { name: 'SF Marketing Agency', url: 'https://sfmarketing.agency/positioning-sprint/', note: 'Positioning and GTM Sprint, $7,500 flat, 14 business days.' },
  fletch: { name: 'FletchPMM', url: 'https://www.fletchpmm.com/pricing', note: 'Homepage Positioning Sprint: $10,000 under $2 million in revenue or funding, $20,000 from $2 million to $20 million, $30,000 above $20 million.' },
  dunford: { name: 'April Dunford', url: 'https://www.aprildunford.com/consultant', note: 'Positioning + Sales Pitch Workshop. $50,000 for 10 to 50 people. $80,000 for 50 to 1,000 or more, with advisory sessions. The flagship heading lists $80,000 to $100,000.' },
  bstrong: { name: 'BStrong Marketing', url: 'https://bstrongmarketing.com/positioning-services/', note: 'Positioning assessment $750, credited toward an engagement. Positioning Intensive $7,500. Authority Architecture $15,000 to $25,000. Authority Partnership $35,000 to $50,000.' },
  kerry: { name: 'Kerry Fitzmaurice', url: 'https://www.kerryfitzmaurice.com/pricing', note: 'Positioning Sprint $8,000. Strategy Intensive $12,000 to $15,000. She also lists a brand strategy audit at $3,000.' },
  first: { name: 'First PMM', url: 'https://firstpmm.com/fractional-product-marketing-pricing/', note: 'Workshop from $2,750. Scoped projects from $8,300. Embedded work $1,060 a day. The workshop page also lists from €2,500, excluding VAT.' },
  firstWorkshop: { name: 'First PMM workshop', url: 'https://firstpmm.com/workshops/positioning-differentiation/', note: 'Half-day positioning workshop from €2,500, excluding VAT. On-site in the Netherlands is €500 extra.' },
  intuitive: { name: 'Intuitive PMM', url: 'https://www.intuitivepmm.com/fractional-product-marketing', note: 'IC $5,000 to $8,000 a month. Senior $8,000 to $10,000. Director $10,000 to $14,000. VP $14,000 to $18,000. Three-month minimum.' },
  gofrac: { name: 'Go Fractional', url: 'https://www.gofractional.com/insights/rates/product-marketing-manager', note: 'Benchmark updated November 13, 2026. Typical month $5,600 to $10,000 at 14 hours a week. Average $152 an hour. Middle half $100 to $180 an hour. The page says the hours are a typical fractional scope across roles, not a product-marketing-specific figure yet.' },
  seek: { name: 'SeekThem', url: 'https://seekthem.com/brand-positioning-agency-b2b', note: 'Positioning package $1,500, about two weeks, priced separately from branding.' },
  noco: { name: 'Noco', url: 'https://noco.agency/services/sprints', note: 'Brand sprint $9,700, three weeks, including positioning, a messaging framework, and visual direction. Website builds on the same page are a separate service.' },
  speak: { name: 'Speak!', url: 'https://www.speakagency.com/brand-story-sprint', note: 'Brand Story Sprint, two weeks. $10,000 under $2 million in revenue, $15,000 from $2 million to $30 million, $20,000 from $30 million to $100 million, $25,000 above $100 million.' },
  bls: { name: 'U.S. Bureau of Labor Statistics', url: 'https://www.bls.gov/ooh/management/advertising-promotions-and-marketing-managers.htm', note: 'Occupational Outlook Handbook, read November 13, 2026. Marketing managers, May 2025: median annual wage $166,790. The lowest 10 percent earned less than $90,260, and the highest 10 percent earned more than $293,610. This is the marketing manager occupation, not a product marketing title. The handbook page was last modified August 27, 2026.' },
}

// Log axis. Chosen so the lowest and highest published figures sit on the scale with room at the edges.
export const AXIS_MIN = 400
export const AXIS_MAX = 500000
export const TICKS = [1000, 10000, 100000]

export const OPTIONS = [
  {
    id: 'sprints',
    name: 'Fixed-price sprints, one time',
    low: 2000,
    high: 30000,
    lowSource: 'boundset',
    highSource: 'fletch',
    prices: [
      ['Boundset workshop $2,000', 'boundset'],
      ['Rethink GTM $2,400', 'rethink'],
      ['HuntingHydra $5,000', 'hydra'],
      ['SF Marketing Agency $7,500', 'sfma'],
      ['Boundset Stake $7,500', 'boundset'],
      ['Boundset Stronghold $12,000', 'boundset'],
      ['FletchPMM $10,000, $20,000, and $30,000', 'fletch'],
    ],
    leave: 'A written position, the messaging, and usually homepage copy.',
    time: 'Two to four weeks.',
    hours: 'Boundset asks about four to five hours. FletchPMM asks about seven.',
    fits: 'A team with a product and customers, and a homepage that no longer explains it.',
    when: { stage: ['seed', 'later'], need: ['decision', 'copy'], time: ['once'] },
  },
  {
    id: 'solo',
    name: 'Solo consultants, one time',
    low: 750,
    high: 50000,
    lowSource: 'bstrong',
    highSource: 'bstrong',
    prices: [
      ['BStrong assessment $750', 'bstrong'],
      ['First PMM workshop from $2,750', 'first'],
      ['BStrong intensive $7,500', 'bstrong'],
      ['Kerry Fitzmaurice sprint $8,000', 'kerry'],
      ['First PMM projects from $8,300', 'first'],
      ['Kerry Fitzmaurice intensive $12,000 to $15,000', 'kerry'],
      ['BStrong architecture $15,000 to $25,000', 'bstrong'],
      ['BStrong partnership $35,000 to $50,000', 'bstrong'],
    ],
    leave: 'A written position and the language that follows. The $750 figure is an assessment, credited if you continue.',
    time: 'A few days for an assessment. Four to twelve weeks for a project. Up to a year on the longest published tier.',
    hours: 'Varies with the tier. Ask before you sign.',
    fits: 'A founder who wants one person to run the decision.',
    when: { stage: ['seed', 'later'], need: ['decision', 'copy'], time: ['once'] },
  },
  {
    id: 'dunford',
    name: "April Dunford's workshop, one time",
    low: 50000,
    high: 100000,
    lowSource: 'dunford',
    highSource: 'dunford',
    prices: [
      ['$50,000 for 10 to 50 people', 'dunford'],
      ['$80,000 for 50 to 1,000 or more', 'dunford'],
      ['Flagship heading $80,000 to $100,000', 'dunford'],
    ],
    leave: 'Positioning and a sales pitch the leadership team has worked through together.',
    time: 'Three days, in person or remote. The larger tier adds advisory sessions.',
    hours: 'The leadership team is in the workshop.',
    fits: 'A growth-stage company whose leaders can spend three days in the room. Her site says she does not take pre-launch products.',
    when: { stage: ['later'], need: ['decision'], time: ['once'] },
  },
  {
    id: 'fractional',
    name: 'Fractional product marketer, a month',
    low: 5000,
    high: 18000,
    lowSource: 'intuitive',
    highSource: 'intuitive',
    prices: [
      ['Intuitive PMM $5,000 to $18,000 a month', 'intuitive'],
      ['Go Fractional $5,600 to $10,000 a month', 'gofrac'],
      ['First PMM $1,060 a day', 'first'],
    ],
    leave: 'Ongoing product marketing. Not a single document and not a two-week project.',
    time: 'Months. Intuitive PMM lists a three-month minimum.',
    hours: 'Part of the week. Go Fractional uses 14 hours as a typical scope across roles, and says that figure is not specific to this role yet.',
    fits: 'A team whose story is settled and who needs launches, pages, and sales material every month.',
    when: { stage: ['seed', 'later'], need: ['decision', 'copy'], time: ['ongoing'] },
  },
  {
    id: 'agency',
    name: 'Brand or positioning agency, one time',
    low: 1500,
    high: 25000,
    lowSource: 'seek',
    highSource: 'speak',
    prices: [
      ['SeekThem positioning package $1,500', 'seek'],
      ['Noco brand sprint $9,700', 'noco'],
      ['Speak! $10,000, $15,000, $20,000, and $25,000', 'speak'],
    ],
    leave: 'Positioning plus the words, and often a visual direction or a homepage wireframe.',
    time: 'About two weeks at SeekThem and Speak!. Three weeks for the Noco brand sprint.',
    hours: 'Workshops and reviews. Speak! describes two live workshops in the two weeks.',
    fits: 'A team that wants the story and the brand work in one project.',
    when: { stage: ['seed', 'later'], need: ['copy'], time: ['once'] },
  },
  {
    id: 'hire',
    name: 'In-house marketing manager, a year',
    low: 90260,
    high: 293610,
    lowSource: 'bls',
    highSource: 'bls',
    prices: [
      ['Lowest 10 percent earned less than $90,260', 'bls'],
      ['Median $166,790', 'bls'],
      ['Highest 10 percent earned more than $293,610', 'bls'],
    ],
    leave: 'A person on salary who can keep the story current after someone else has made the positioning decision.',
    time: 'A hire, then a job. Not a project with an end date.',
    hours: 'Full time.',
    fits: 'A company ready to recruit and pay a salary. The figure is for marketing managers, not a product marketing title.',
    when: { stage: ['later'], need: ['decision', 'copy'], time: ['ongoing'] },
  },
]

export const FAQ = [
  { q: 'How much does positioning cost?', a: 'Where a provider prints a price, the project span checked on November 13, 2026 runs from $750 to $100,000. Fixed-price sprints run from $2,000 to $30,000. April Dunford lists $50,000, $80,000, and $80,000 to $100,000. A fractional product marketer bills by the month. A marketing manager is a salary.' },
  { q: 'What does Boundset charge?', a: 'The workshop is $2,000. That amount is credited in full toward a sprint if you start within 30 days. Stake is $7,500. Stronghold is $12,000. Stake and Stronghold are two-week sprints. Stronghold adds three more pages, three activation assets, and a year of async coaching in Slack.' },
  { q: 'Why does April Dunford cost more than a sprint?', a: 'Her page lists a three-day workshop for the leadership team, covering positioning and a sales pitch. The size tiers are $50,000 and $80,000. The flagship heading lists $80,000 to $100,000. A sprint is a shorter project and usually includes homepage copy.' },
  { q: 'What does a fractional product marketer cost?', a: 'Intuitive PMM lists $5,000 to $18,000 a month by seniority. Go Fractional, updated November 13, 2026, puts a typical month at $5,600 to $10,000. First PMM lists $1,060 a day, workshops from $2,750, and projects from $8,300.' },
  { q: 'Is an in-house hire cheaper?', a: 'It is a different bill. The Bureau of Labor Statistics reports a May 2025 median of $166,790 a year for marketing managers. The lowest 10 percent earned less than $90,260, and the highest 10 percent earned more than $293,610. That wage does not include the months spent hiring.' },
  { q: 'What if a provider does not list a price?', a: 'They are not on a bar. This page does not fill a missing number with a guess, a range from a roundup, or a quote someone else reported secondhand.' },
]

export function sourceList() {
  return Object.values(SOURCES)
}

export function money(n) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

export function logPct(n) {
  const a = Math.log10(AXIS_MIN)
  const b = Math.log10(AXIS_MAX)
  return ((Math.log10(n) - a) / (b - a)) * 100
}

export function fits(option, answers) {
  const keys = ['stage', 'need', 'time']
  return keys.every((k) => !answers[k] || option.when[k].includes(answers[k]))
}

export function costLd() {
  const url = 'https://boundset.com/positioning-cost'
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: H1, description: DESCRIPTION, url, mainEntityOfPage: url,
      datePublished: CHECKED, dateModified: CHECKED, inLanguage: 'en',
      author: { '@type': 'Person', name: 'Blake Emal', jobTitle: '3x Head of Marketing', url: 'https://boundset.com/about' },
      publisher: { '@id': 'https://boundset.com/#org' },
      citation: sourceList().map((s) => s.url) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Boundset', item: 'https://boundset.com/' },
      { '@type': 'ListItem', position: 2, name: H1, item: url }] },
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Boundset positioning sprint', provider: { '@id': 'https://boundset.com/#org' }, url: 'https://boundset.com/sprint', offers: [
      { '@type': 'Offer', name: 'Workshop', price: '2000', priceCurrency: 'USD', url: 'https://boundset.com/sprint#workshop' },
      { '@type': 'Offer', name: 'Stake', price: '7500', priceCurrency: 'USD', url: 'https://boundset.com/sprint#stake' },
      { '@type': 'Offer', name: 'Stronghold', price: '12000', priceCurrency: 'USD', url: 'https://boundset.com/sprint#stronghold' }] },
  ]
}

export function costMarkdown() {
  const lines = [
    '---',
    `title: ${JSON.stringify(H1)}`,
    `description: ${JSON.stringify(DESCRIPTION)}`,
    `updated: ${CHECKED}`,
    'canonical: https://boundset.com/positioning-cost',
    'author: Blake Emal, 3x Head of Marketing',
    '---',
    '',
    `# ${H1}`,
    '',
    OPENING,
    '',
    'Each bar runs from the lowest price that provider prints to the highest. A missing price is left off. Nothing here is a guess.',
    '',
  ]
  for (const o of OPTIONS) {
    lines.push(`## ${o.name}`, '', `${money(o.low)} to ${money(o.high)}.`, '')
    for (const [label, id] of o.prices) lines.push(`- ${label}: ${SOURCES[id].url}`)
    lines.push('', `You leave with: ${o.leave}`, '', `Time: ${o.time}`, '', `Your time: ${o.hours}`, '', `Fits: ${o.fits}`, '')
  }
  lines.push('## FAQ', '')
  for (const f of FAQ) lines.push(`### ${f.q}`, '', f.a, '')
  lines.push('## Sources', '', `Read ${CHECKED_LABEL}.`, '')
  for (const s of sourceList()) lines.push(`- [${s.name}](${s.url}): ${s.note}`)
  lines.push('', '## Related', '', '- [How much a positioning sprint costs](https://boundset.com/positioning-sprint-cost)', '- [April Dunford alternatives](https://boundset.com/april-dunford-alternatives)', '- [Positioning agency vs fractional PMM](https://boundset.com/positioning-agency-vs-fractional-pmm)', '- [Positioning sprint](https://boundset.com/sprint)', '')
  return lines.join('\n')
}

export const costLlms = {
  answer: OPENING,
  sections: OPTIONS.map((o) => ({
    h: o.name,
    body: `${money(o.low)} to ${money(o.high)}. ${o.prices.map(([label, id]) => `${label} (${SOURCES[id].url})`).join(' ')} ${o.leave} ${o.fits}`,
  })),
  faq: FAQ,
}
