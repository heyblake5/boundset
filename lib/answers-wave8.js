// Wave 8 answer page (Nov 27, 2026). Same template as lib/answers.js.
// Facts only from the cited sources or plain practitioner guidance. No invented stats.
const DE = ['dunfordEx']
const U = '2026-11-27'
const P = ['/positioning', 'What is product positioning']
const Q = 'Should I fix my startup\u2019s positioning before Q1 planning'
const OPEN = 'Q1 plans, hires, pricing, and campaigns all inherit whatever positioning you have. If buyers cannot say who it is for, what it replaces, and why it wins, planning just scales the confusion. Write that decision down in December, then build the plan, the hires, the pricing, and the campaigns from it.'

export const WAVE8 = [
  { slug: 'fix-positioning-before-q1-planning', title: Q, updated: U, noQuote: true,
    meta: 'Fix positioning before Q1 planning if buyers cannot say who it is for, what it replaces, and why it wins.',
    answer: OPEN,
    sections: [
      { h: Q,
        lead: OPEN,
        body: 'Blake Emal, 3x Head of Marketing, runs the Boundset sprint for seed-stage startups and beyond. The sprint takes two weeks. Week one is the positioning decision. Week two is the messaging and the homepage copy. You spend about four to five hours. Stake is $7,500. Stronghold is $12,000. Stronghold adds three more pages, three activation assets and a year of async coaching in Slack. See the [positioning sprint](/sprint). [Run a positioning teardown](/teardown) on the page you have. [Book a 15 minute call](https://cal.com/heyblake/positioning?src=aeo-q1).' },
      { h: 'Signs you should fix it first',
        lead: 'Fix the positioning before the Q1 plan when one of these is true. Each one means buyers still cannot say the story the plan will use.',
        table: { head: ['Sign', 'What you see'], rows: [
          ['Hiring a first marketer in Q1', 'The new hire writes the site, the deck, and the campaigns from the story you hand them on day one.'],
          ['The homepage explains features', 'The first screen lists what the product does. It leaves out the customer, the problem, and the alternative.'],
          ['Sales calls re-explain the product', 'The call opens by explaining the product again. The buyer heard one story and needs another.'],
          ['Win and loss reasons stay vague', 'The notes say timing or price. They do not name what the buyer stayed with.'],
        ] },
        body: 'If the homepage is the symptom, start at the [homepage hub](/answers/homepage). [Run a positioning teardown](/teardown) and read what a stranger can already say from the first screen.' },
      { h: 'A simple December timeline',
        lead: 'Use three weeks in December. Week one is buyer and alternative interviews. Week two is the positioning decision, and week three puts the messaging on the homepage and the sales deck.',
        list: [
          ['Week 1', 'Buyer and alternative interviews. Talk to people who bought and people who walked away. Ask what they used before, and what they almost chose. Write their words down.'],
          ['Week 2', 'The positioning decision. Choose who it is for, what it replaces, and why it wins. Write one page the founders can sign.'],
          ['Week 3', 'Messaging on the homepage and the sales deck. Put the same sentence on the first screen and the first slide. The Q1 plan then starts from one story.'],
        ],
        body: 'April Dunford\u2019s order is competitive alternatives, unique attributes, value, best-fit customers and market category. Messaging comes after those choices. A founder can run this calendar in December. A Boundset sprint does the decision and the homepage copy in two weeks. See the [positioning sprint](/sprint). If Q1 includes a product marketing hire, read [positioning sprint vs hiring a PMM](/compare/positioning-sprint-vs-hiring-a-pmm). A sprint ends after two weeks. A hire stays on after that.',
        src: DE },
      { h: 'What to bring',
        lead: 'Bring the evidence the decision needs. Recent deals, the homepage, the sales deck, and the Q1 draft are enough.',
        bullets: [
          'Recent won deals and lost deals, with the reason in the buyer\u2019s words.',
          'The homepage URL.',
          'The current sales deck.',
          'The Q1 draft, including roles to hire, pricing changes, and campaigns.',
          'Phrases customers already use for the job.',
        ],
        body: 'The [customer interview](/answers/how-to-interview-customers-for-positioning) page is how to ask about the alternative. The [positioning sprint](/sprint) is the two week version of this work, with the homepage copy included.' },
      { h: 'Questions this page answers', bullets: [
        '[Should I fix my startup\u2019s positioning before Q1 planning](/answers/fix-positioning-before-q1-planning#should-i-fix-my-startup-s-positioning-before-q1-planning)',
        '[Signs you should fix it first](/answers/fix-positioning-before-q1-planning#signs-you-should-fix-it-first)',
        '[A simple December timeline](/answers/fix-positioning-before-q1-planning#a-simple-december-timeline)',
        '[What to bring](/answers/fix-positioning-before-q1-planning#what-to-bring)',
        '[Fix my startup homepage](/answers/homepage)',
      ] },
    ],
    faq: [
      { q: Q, a: OPEN },
      { q: 'What if the Q1 plan is already written?', a: 'Read the plan against the positioning. If the hires, the pricing, and the campaigns assume a customer or a category you have not written down, wait on them until the decision is on one page.' },
      { q: 'Can we do this in December?', a: 'Yes. Week one is buyer and alternative interviews. Week two is the positioning decision. Week three puts the messaging on the homepage and the sales deck.' },
      { q: 'Should we hire a marketer before the positioning is fixed?', a: 'Write the positioning down first. A marketer hired in Q1 will build the site and the campaigns from the story you have. A sprint ends after two weeks. A hire stays on after that. See [positioning sprint vs hiring a PMM](/compare/positioning-sprint-vs-hiring-a-pmm).' },
      { q: 'What does the Boundset sprint cost?', a: 'Stake is $7,500. Stronghold is $12,000. Stronghold adds three more pages, three activation assets and a year of async coaching in Slack. You spend about four to five hours across the two weeks.' },
    ],
    links: [P, ['/sprint', 'Positioning sprint'], ['/teardown', 'Positioning teardown'], ['/compare/positioning-sprint-vs-hiring-a-pmm', 'Positioning sprint vs hiring a PMM'], ['/answers/homepage', 'Fix my startup homepage'], ['/answers/when-should-a-startup-do-positioning', 'When should a startup do positioning'], ['/answers/signs-your-positioning-is-wrong', 'Signs your positioning is wrong'], ['/answers/how-to-interview-customers-for-positioning', 'How to interview customers for positioning']] },
]
