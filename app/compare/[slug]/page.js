import { notFound } from 'next/navigation'
import { DocPage } from '../../../components/guide/GuideLayout'
import { withOg } from '../../../components/guide/docMeta'
import { compareDocs } from '../../../lib/docs'
const get = (slug) => compareDocs().find((d) => d.route === `/compare/${slug}`)
export const dynamicParams = false
export function generateStaticParams() { return compareDocs().map((d) => ({ slug: d.route.split('/').pop() })) }
export async function generateMetadata({ params }) { const d = get((await params).slug); return withOg({ title: `${d.h1} | Boundset`, description: d.raw.subhead, alternates: { canonical: d.route } }, d.route) }
// JSON-LD exactly as Bond's ComparePage: FAQPage only.
const faqLd = (data) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: data.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: typeof a === 'string' ? a : a.text } })) })
export default async function Page({ params }) {
  const d = get((await params).slug)
  if (!d) notFound()
  return <DocPage p={d} data={faqLd(d.raw)} rel={d.related} />
}
