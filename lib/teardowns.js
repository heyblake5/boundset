// Public homepage teardowns. Quotes are verbatim from the company's public homepage on `fetched`.
// No metrics or claims about the company beyond its own page. Re-fetch before publishing; update `fetched`.
// Publishing toggle: flip to true once Bond/Blake approve. Controls noindex, sitemap-content.xml and llms.txt listing.
import { COPY } from '../components/teardown/copy.js'
export const TEARDOWNS_PUBLIC = false
export const footerLine = (t) => `Quotes from ${t.url} on ${t.fetched}. Spot something out of date? Email ${COPY.mailto}.`
export const TEARDOWNS = [
  {
    slug: 'attio', company: 'Attio', url: 'https://attio.com', fetched: '2026-10-29',
    h1: 'Attio homepage positioning teardown',
    answer: 'Attio\'s homepage positions it as a CRM run by AI agents for revenue teams. It opens with a coined phrase, "agentic revenue," instead of the category buyers search for. It does not name the alternative it replaces. Its clearest message, speed to lead, sits in an H3 low on the page.',
    hero: { h1: 'Welcome to agentic revenue.', sub: 'Attio is the platform that builds pipeline, advances deals, and grows accounts around the clock.' },
    works: ['The subhead says what the product does in plain words.', 'The feature cards describe results a sales leader can picture.'],
    saysItIs: 'A CRM with AI agents that work leads, deals and renewals. The page title says CRM ("The CRM for agentic revenue"). The H1 does not.',
    forWhom: 'Revenue teams and "the people who own the number." The page gives no company stage or size.',
    upAgainst: 'The page does not name an alternative. "Never sleeps" compares Attio with people who work business hours. Buyers are comparing it with the CRM they use today.',
    strongest: { quote: 'New leads get enriched, scored, and routed to the right rep before they ever cool off.', why: 'A sales leader can picture this result and measure it.' },
    gaps: [
      { title: 'The H1 is a coined category', quote: 'Welcome to agentic revenue.', problem: 'Buyers have to learn a new term before they know what the product is.', fix: 'Say CRM in the H1 and let the agents be the difference.' },
      { title: 'No named alternative', quote: 'The intelligent system that never sleeps.', problem: 'Buyers choose between tools, and the page never says why Attio beats the one they have.', fix: 'Name the CRM buyers use today and show what Attio\'s agents add.' },
      { title: 'The most concrete line sits low on the page', quote: 'Speed to lead, every time.', problem: 'The most concrete promise is an H3 deep in the page.', fix: 'Move speed to lead into the subhead.' },
    ],
    rewrite: { hero: 'The CRM whose agents enrich and route every lead the minute it arrives.', why: 'It names the category buyers search for and states the difference in their terms.' },
    faq: [
      { q: 'What does Attio say it is?', a: 'On its homepage, "The CRM for agentic revenue." The subhead says "Attio is the platform that builds pipeline, advances deals, and grows accounts around the clock."' },
      { q: 'Who is Attio for?', a: 'Revenue teams, per its homepage. It does not name a company stage or size.' },
      { q: 'What is the biggest positioning gap on Attio\'s homepage?', a: 'It leads with a coined phrase instead of the CRM category, and it does not name the alternative it replaces.' },
    ],
    related: [['/answers/what-is-positioning-debt', 'what positioning debt is'], ['/teardown', 'tear down your homepage']],
  },
]
export const teardownBySlug = (s) => TEARDOWNS.find((t) => t.slug === s)
