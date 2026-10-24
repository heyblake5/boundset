import { TOOLS } from '../app/free-tools/tools'
// Single source for content pages: feeds pages, sitemaps, llms.txt and llms-full.txt.
export const SITE = 'https://boundset.com'
export const UPDATED = '2026-10-23'

export const SRC = {
  dunford: { label: 'April Dunford, Obviously Awesome', url: 'https://www.aprildunford.com/books' },
  dunfordEx: { label: 'April Dunford, A Product Positioning Exercise', url: 'https://www.aprildunford.com/post/a-product-positioning-exercise' },
  moore: { label: 'Geoffrey Moore, Crossing the Chasm', url: 'https://en.wikipedia.org/wiki/Crossing_the_Chasm' },
}

// Superseded Oct 24: the thin positioning / answer / canvas copy was replaced by the full guides in content/guides (lib/guides.js).

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

import { guides } from './guides'
export const PAGES = [
  { path: '/', title: 'Boundset positioning and messaging sprints', group: 'pages' },
  { path: '/free-tools', title: 'Free positioning and messaging tools', group: 'pages' },
  ...guides().map((g) => ({ path: g.route, title: g.h1, group: 'content', answer: g.definition, guide: g, lastmod: g.updated })),
  ...TOOLS.filter((t) => t.slug !== 'positioning-statement-generator').map((t) => ({ path: `/free-tools/${t.slug}`, title: t.name, group: 'content', answer: t.desc })),
  { path: tool.path, title: tool.title, group: 'content', answer: tool.answer, data: tool },
]
