import { COPY } from './copy'
const SITE = 'https://boundset.com'
export const toResult = (t) => ({
  says_it_is: { summary: t.saysItIs, quote: null }, for_whom: { summary: t.forWhom, quote: null }, up_against: { summary: t.upAgainst },
  strongest_claim: t.strongest, gaps: t.gaps, rewrite: t.rewrite,
})
export const teardownLd = (t) => [
  { '@context': 'https://schema.org', '@type': 'Article', headline: t.h1, description: t.answer, url: `${SITE}/teardowns/${t.slug}`, about: { '@type': 'Organization', name: t.company, url: t.url }, author: { '@type': 'Person', name: 'Blake Emal' }, publisher: { '@id': `${SITE}/#org`, '@type': 'Organization', name: 'Boundset', url: SITE }, datePublished: t.fetched, dateModified: t.fetched, citation: t.url },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: COPY.crumbHome, item: SITE }, { '@type': 'ListItem', position: 2, name: COPY.crumbIndex, item: `${SITE}/teardowns` }, { '@type': 'ListItem', position: 3, name: t.company, item: `${SITE}/teardowns/${t.slug}` }] },
]
