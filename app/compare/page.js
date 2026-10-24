import Shell from '../../components/c2/Shell'
import IndexList from '../../components/c2/IndexList'
import { compareDocs } from '../../lib/docs'
import { guide } from '../../lib/guides'
export const metadata = { title: 'Positioning options compared | Boundset', description: 'Side by side comparisons of the ways startups get positioning done.', alternates: { canonical: '/compare' } }
export default function Compare() {
  const items = [...['positioning-agency-vs-fractional-pmm', 'april-dunford-alternatives', 'positioning-sprint-cost'].map((s) => guide(s)).map((g) => ({ href: g.route, name: g.h1 })), ...compareDocs().map((d) => ({ href: d.route, name: d.h1 }))]
  return <Shell><IndexList title="Compare" items={items} /></Shell>
}
