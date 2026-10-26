// Public homepage teardowns. Quotes are verbatim from the company's public homepage on `fetched`.
// No metrics or claims about the company beyond its own page. Re-fetch before publishing; update `fetched`.
// Publishing toggle: flip to true once Bond/Blake approve. Controls noindex, sitemap-content.xml and llms.txt listing.
export const TEARDOWNS_PUBLIC = false
// Footer line verbatim from teardown-template.md; [BOUNDSET ADDRESS] is an open placeholder.
export const footerLine = (t) => `Quotes from ${t.url} on ${t.fetched}. Spot something out of date? Email [BOUNDSET ADDRESS].`
export const TEARDOWNS = [
  {
    slug: 'attio', company: 'Attio', url: 'https://attio.com', fetched: '2026-10-26',
    h1: 'Attio homepage positioning teardown',
    answer: 'Attio\u2019s homepage positions it as a CRM run by AI agents for revenue teams. It opens with a coined phrase, \u201cagentic revenue,\u201d instead of the category buyers search for, and it never names the alternative it replaces. Its clearest message, speed to lead, sits in a feature card below the fold.',
    hero: { h1: 'Welcome to agentic revenue.', sub: 'The intelligent system that never sleeps. Picks up leads at 2am. Catches renewals before they slip. Hands you the answer before you ask.' },
    works: ['The subhead is concrete: three things the product does, in plain words.', 'Feature cards are written as outcomes, not features.'],
    saysItIs: 'A CRM with AI agents that work leads, deals and renewals. The word CRM appears in the page title (\u201cThe CRM for agentic revenue\u201d) but not in the H1.',
    forWhom: 'Revenue teams and \u201cthe people who own the number.\u201d No company stage or size is given.',
    upAgainst: 'Not named. \u201cNever sleeps\u201d compares the product to people working business hours, not to the CRM a buyer already uses.',
    strongest: { quote: 'New leads get enriched, scored, and routed to the right rep before they ever cool off.', why: 'A specific outcome a sales leader can picture and measure.' },
    gaps: [
      { title: 'The H1 is a coined category', quote: 'Welcome to agentic revenue.', problem: 'A new term asks buyers to learn a word before they know what the product is.', fix: 'Say CRM in the H1 and let agents be the difference.' },
      { title: 'No named alternative', quote: 'The intelligent system that never sleeps.', problem: 'Buyers choose between tools. The page never says why this beats the CRM they have.', fix: 'Name what they leave behind, a CRM that only records what reps type, and show what agents do instead.' },
      { title: 'The best line is buried', quote: 'Speed to lead, every time.', problem: 'The most concrete promise is an H3 deep in the page.', fix: 'Promote speed to lead into the subhead.' },
    ],
    rewrite: { hero: 'The CRM whose agents enrich, route and follow up on every lead.', why: 'Names the searched category and puts the difference in buyer terms.' },
    faq: [
      { q: 'What does Attio say it is?', a: 'On its homepage, \u201cThe CRM for agentic revenue,\u201d a system for revenue teams to build pipeline, accelerate deals, and grow accounts.' },
      { q: 'Who is Attio for?', a: 'Revenue teams, per its homepage. It does not name a company stage or size.' },
      { q: 'What is the biggest positioning gap on Attio\u2019s homepage?', a: 'It leads with a coined phrase instead of the CRM category, and it never names the alternative it replaces.' },
    ],
    related: [['/answers/what-is-positioning-debt', 'What is positioning debt'], ['/teardown', 'Tear down your homepage']],
  },
]
export const teardownBySlug = (s) => TEARDOWNS.find((t) => t.slug === s)
