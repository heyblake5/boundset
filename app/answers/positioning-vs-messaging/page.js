import { Article, Sections, meta } from '../../../components/Content'
import { answer as p } from '../../../lib/content'
export const metadata = meta(p)
export default function Page() {
  const [head, ...rows] = p.table
  return (
    <Article p={p}>
      <section className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full text-left">
          <thead><tr>{head.map((h, i) => <th key={i} scope="col" className="p-4 md:p-5 font-serif text-xl border-b border-stone-200">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]} className="border-b border-stone-100 last:border-0">{r.map((c, i) => i === 0 ? <th key={i} scope="row" className="p-4 md:p-5 font-semibold text-stone-500 text-sm">{c}</th> : <td key={i} className="p-4 md:p-5 text-stone-800">{c}</td>)}</tr>)}</tbody>
        </table>
      </section>
      <Sections sections={p.sections} />
      <p className="text-lg"><a href="/positioning" className="text-brand underline underline-offset-4">What is product positioning →</a></p>
    </Article>
  )
}
