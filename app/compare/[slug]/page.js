import { notFound } from 'next/navigation'
import { DocPage } from '../../../components/guide/GuideLayout'
import { withOg } from '../../../components/guide/docMeta'
import { pageLd } from '../../../components/Content'
import { compareDocs } from '../../../lib/docs'
const get = (slug) => compareDocs().find((d) => d.route === `/compare/${slug}`)
export const dynamicParams = false
export function generateStaticParams() { return compareDocs().map((d) => ({ slug: d.route.split('/').pop() })) }
export async function generateMetadata({ params }) { const d = get((await params).slug); return withOg({ title: `${d.h1} | Boundset`, description: d.raw.meta, alternates: { canonical: d.route } }, d.route) }
export default async function Page({ params }) {
  const d = get((await params).slug)
  if (!d) notFound()
  const faq = d.raw.faq.map(({ q, a }) => ({ q, a: typeof a === 'string' ? a : a.text }))
  return <DocPage p={d} data={pageLd({ path: d.route, title: d.h1, answer: d.definition, updated: d.updated, faq })} rel={d.related} />
}
