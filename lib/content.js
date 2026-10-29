import { TOOLS } from '../app/free-tools/tools.js'
// Single source for content pages: feeds pages, sitemaps, llms.txt and llms-full.txt.
export const SITE = 'https://boundset.com'
export { UPDATED, SRC } from './sources.js'
import { SRC } from './sources.js'

// Superseded Oct 24: the thin positioning / answer / canvas copy was replaced by the full guides in content/guides (lib/guides.js).

export const tool = {
  path: '/free-tools/positioning-statement-generator',
  title: 'Positioning statement generator',
  answer: 'Enter your best-fit customer, their need, your category, the main alternative and what you do differently. The generator writes a positioning statement in Geoffrey Moore\u2019s format and a one-liner. Everything runs in your browser. April Dunford treats that fill-in-the-blank line as an internal check you write after the positioning decisions, not as copy for the homepage.',
  faq: [
    { q: 'Is my input saved?', a: 'No. The generator runs in your browser and sends nothing.' },
    { q: 'Can I use the statement on my homepage?', a: 'No. April Dunford argues the fill-in-the-blank statement is an internal check, not customer-facing copy. Do the five positioning decisions first, then write shorter homepage copy in buyer language. https://www.aprildunford.com/post/a-product-positioning-exercise' },
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

import { guides } from './guides.js'
import { TEARDOWNS, TEARDOWNS_PUBLIC } from './teardowns.js'
import { allDocs } from './docs.js'
export const PAGES = [
  { path: '/', title: 'Boundset positioning and messaging sprints', group: 'pages' },
  { path: '/free-tools', title: 'Free positioning and messaging tools', group: 'pages' },
  { path: '/answers', title: 'Positioning and messaging answers', group: 'pages' },
  { path: '/compare', title: 'Positioning options compared', group: 'pages' },
  ...guides().map((g) => ({ path: g.route, title: g.h1, group: 'content', answer: g.definition, guide: g, lastmod: g.updated })),
  ...allDocs().map((d) => ({ path: d.route, title: d.h1, group: 'content', answer: d.definition, guide: d, lastmod: d.updated })),
  ...TOOLS.filter((t) => t.slug !== 'positioning-statement-generator').map((t) => ({ path: `/free-tools/${t.slug}`, title: t.name, group: 'content', answer: t.desc })),
  { path: tool.path, title: tool.title, group: 'content', answer: tool.answer, data: tool },
  // Teardowns join sitemap-content.xml and llms.txt only when TEARDOWNS_PUBLIC is flipped in lib/teardowns.js.
  ...(TEARDOWNS_PUBLIC ? [{ path: '/teardowns', title: 'Homepage positioning teardowns', group: 'pages' }, ...TEARDOWNS.map((t) => ({ path: `/teardowns/${t.slug}`, title: t.h1, group: 'content', answer: t.answer, lastmod: t.fetched }))] : []),
]
