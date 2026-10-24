import { TOOLS } from '../app/free-tools/tools'
// Single source for content pages: feeds pages, sitemaps, llms.txt and llms-full.txt.
export const SITE = 'https://boundset.com'
export const UPDATED = '2026-10-23'

export const SRC = {
  dunford: { label: 'April Dunford, Obviously Awesome', url: 'https://www.aprildunford.com/books' },
  dunfordEx: { label: 'April Dunford, A Product Positioning Exercise', url: 'https://www.aprildunford.com/post/a-product-positioning-exercise' },
  moore: { label: 'Geoffrey Moore, Crossing the Chasm', url: 'https://en.wikipedia.org/wiki/Crossing_the_Chasm' },
}

export const positioning = {
  path: '/positioning',
  title: 'What is product positioning',
  answer: 'Product positioning defines how your product is the best at something a specific set of customers cares about. It names the alternatives buyers would use instead, what you do that they cannot, the value that creates, who cares most, and the market category that makes all of it obvious.',
  sections: [
    { h: 'Positioning comes before messaging', body: 'Positioning is the strategy. Messaging is how you say it. When teams skip positioning, every page, deck and ad gets rewritten from scratch, and each version drifts. April Dunford describes the messaging document as an output that references positioning, not a replacement for it.', src: ['dunfordEx'] },
    { h: 'The five parts of positioning', list: [
      ['Competitive alternatives', 'What buyers would do if you did not exist. Often a spreadsheet, a hire, or nothing at all.'],
      ['Unique attributes', 'Capabilities you have that those alternatives lack.'],
      ['Value', 'What those attributes let customers achieve.'],
      ['Best-fit customers', 'The traits that make someone care a lot about that value.'],
      ['Market category', 'The frame that makes your value obvious to that customer.'],
    ], body: 'This order comes from April Dunford\u2019s Obviously Awesome. Start with alternatives because value only exists relative to something.', src: ['dunford'] },
    { h: 'The classic positioning statement', body: 'Geoffrey Moore\u2019s template from Crossing the Chasm is the most copied format: For [target customer] who [need], [product] is a [category] that [key benefit]. Unlike [alternative], we [differentiator]. It is useful as an internal check. It is not homepage copy.', src: ['moore'] },
    { h: 'Signs your positioning has drifted', list: [
      ['Every rewrite starts from zero', 'The homepage changes and nothing gets clearer.'],
      ['Sales tells a different story', 'Reps improvise because the site does not match calls.'],
      ['Buyers compare you to the wrong thing', 'Prospects ask how you differ from a tool you do not compete with.'],
      ['Nobody can say it in one line', 'Founders give three different answers to what the company does.'],
    ] },
    { h: 'How to do it', list: [
      ['List alternatives from real deals', 'Use won and lost deals, not a competitor grid.'],
      ['Write unique attributes against each', 'Cut anything an alternative also does.'],
      ['Turn attributes into value', 'One sentence each, in the customer\u2019s words.'],
      ['Find who cares most', 'Look at your fastest closes and best retention.'],
      ['Pick the category last', 'Choose the frame that makes the value obvious.'],
    ] },
  ],
  faq: [
    { q: 'What is the difference between positioning and messaging?', a: 'Positioning is the strategic choice of who you are best for and why. Messaging is the words that carry that choice to buyers.' },
    { q: 'How long does positioning take?', a: 'A focused team can draft it in days. Boundset runs it as a two week sprint that also produces messaging and homepage copy.' },
    { q: 'When should a startup work on positioning?', a: 'When sales cycles stall, buyers misread the category, or the homepage keeps getting rewritten.' },
  ],
}

export const answer = {
  path: '/answers/positioning-vs-messaging',
  title: 'Positioning vs messaging',
  answer: 'Positioning is the strategy: which customers you are best for, which alternatives you beat, and why. Messaging is the execution: the headlines, pitches and proof that carry that strategy to buyers. Positioning changes rarely and lives internally. Messaging changes often and shows up everywhere. Fix positioning first, or messaging keeps drifting.',
  table: [
    ['', 'Positioning', 'Messaging'],
    ['Answers', 'Who we are best for and why', 'How we say it'],
    ['Audience', 'Your team', 'Buyers'],
    ['Changes', 'Rarely', 'Often, by channel'],
    ['Output', 'Positioning canvas', 'Messaging doc, copy'],
  ],
  sections: [
    { h: 'Why the order matters', body: 'April Dunford treats the messaging document as something built from positioning. Write messaging first and each team invents its own strategy in the copy.', src: ['dunfordEx'] },
  ],
  faq: [
    { q: 'Is a value proposition positioning or messaging?', a: 'A value proposition is a messaging output. It should follow from the value and best-fit customer you chose in positioning.' },
    { q: 'Can good messaging fix weak positioning?', a: 'Rarely. Sharper words still describe an unclear choice, so buyers stay confused.' },
    { q: 'Who owns positioning at a startup?', a: 'Usually the founder, with product marketing once that role exists. Sales and product need to agree with it.' },
  ],
}

export const canvas = {
  path: '/templates/positioning-canvas',
  title: 'Positioning canvas template',
  answer: 'A positioning canvas is a one page worksheet that captures five choices in order: competitive alternatives, unique attributes, value, best-fit customers and market category. Fill it from real deal notes, then write messaging from it. Copy the template below or use the generator to draft a statement.',
  fields: [
    ['Competitive alternatives', 'What would buyers use if you did not exist?'],
    ['Unique attributes', 'What do you have that those alternatives lack?'],
    ['Value', 'What does each attribute let customers do?'],
    ['Best-fit customers', 'Who cares most about that value, and why?'],
    ['Market category', 'What frame makes the value obvious?'],
    ['Positioning statement', 'For [customer] who [need], [product] is a [category] that [value]. Unlike [alternative], we [attribute].'],
  ],
  faq: [
    { q: 'Where does this canvas come from?', a: 'The five parts follow April Dunford\u2019s Obviously Awesome. The statement line follows Geoffrey Moore\u2019s template.' },
    { q: 'How often should I update it?', a: 'When alternatives, best-fit customers or the product change meaningfully.' },
  ],
  src: ['dunford', 'moore'],
}

export const tool = {
  path: '/free-tools/positioning-statement-generator',
  title: 'Positioning statement generator',
  answer: 'Enter your best-fit customer, their need, your category, the main alternative and what you do differently. The generator writes a positioning statement in Geoffrey Moore\u2019s format and a one-liner. Everything runs in your browser.',
  faq: [
    { q: 'Is my input saved?', a: 'No. The generator runs in your browser and sends nothing.' },
    { q: 'Can I use the statement on my homepage?', a: 'Use it as an internal check. Homepage copy should be shorter and written in buyer language.' },
  ],
  src: ['moore', 'dunford'],
}

export const caseOV = {
  path: '/case-studies/originalvoices',
  title: 'OriginalVoices case study',
  answer: 'OriginalVoices, an early stage AI company, worked with Blake on positioning and website copy. CEO David Dobrin said the team now feels more confident sharing its product, website and story.',
  quote: "We loved working with Blake. As an early stage AI company building something new, it's surprisingly difficult to succinctly explain what you do, the problem you're solving, and the solution you've built. Blake really took the time to understand our product, what we wanted to say and who we wanted to say it to. The sessions we did were productive - and in no time at all Blake sent us the copy and positioning we've been looking for. He was on hand to make tweaks and refinements based on our feedback, right up until we went live. I've already had lots of positive comments and we already feel more confident sharing our product, website and story. If you're debating whether to work with Blake, I'd say just go for it. I'm glad we did.",
  person: 'David Dobrin', role: 'CEO, OriginalVoices',
}

export const PAGES = [
  { path: '/', title: 'Boundset positioning and messaging sprints', group: 'pages' },
  { path: '/free-tools', title: 'Free positioning and messaging tools', group: 'pages' },
  { path: '/positioning-sprint-cost', title: 'Positioning sprint cost', group: 'pages' },
  { path: '/april-dunford-alternatives', title: 'April Dunford alternatives', group: 'content' },
  { path: '/positioning-agency-vs-fractional-pmm', title: 'Positioning agency vs fractional PMM', group: 'content' },
  ...TOOLS.filter((t) => t.slug !== 'positioning-statement-generator').map((t) => ({ path: `/free-tools/${t.slug}`, title: t.name, group: 'content', answer: t.desc })),
  ...[positioning, answer, canvas, tool].map((p) => ({ path: p.path, title: p.title, group: 'content', answer: p.answer, data: p })),
]
