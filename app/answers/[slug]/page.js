import { notFound } from 'next/navigation'
import { DocPage } from '../../../components/guide/GuideLayout'
import { pageLd, meta } from '../../../components/Content'
import { withOg } from '../../../components/guide/docMeta'
import { answerDocs } from '../../../lib/docs'
const get = (slug) => answerDocs().find((d) => d.route === `/answers/${slug}`)
export const dynamicParams = false
export function generateStaticParams() { return answerDocs().map((d) => ({ slug: d.route.split('/').pop() })) }
export async function generateMetadata({ params }) { const d = get((await params).slug); return withOg(meta(d.raw), d.route) }
export default async function Page({ params }) {
  const d = get((await params).slug)
  if (!d) notFound()
  return <DocPage p={d} data={pageLd(d.raw)} rel={d.related} />
}
