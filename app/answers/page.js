import Shell from '../../components/c2/Shell'
import IndexList from '../../components/c2/IndexList'
import { answerDocs } from '../../lib/docs'
import { guide } from '../../lib/guides'
export const metadata = { title: 'Positioning and messaging answers | Boundset', description: 'Short, direct answers to common positioning and messaging questions for startup founders.', alternates: { canonical: '/answers' } }
export default function Answers() {
  const pvm = guide('positioning-vs-messaging')
  const items = [{ href: pvm.route, name: pvm.h1 }, ...answerDocs().map((d) => ({ href: d.route, name: d.h1 }))]
  return <Shell><IndexList title="Answers" items={items} /></Shell>
}
