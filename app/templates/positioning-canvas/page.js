import { Article, Sources, meta } from '../../../components/Content'
import { canvas as p } from '../../../lib/content'
import CopyButton from '../../../components/CopyButton'
export const metadata = meta(p)
export default function Page() {
  const text = p.fields.map(([t, q]) => `${t}\n${q}\n`).join('\n')
  return (
    <Article p={p} type="HowTo">
      <section>
        <div className="grid md:grid-cols-2 gap-4">
          {p.fields.map(([t, q], i) => (
            <div key={t} className={`p-6 rounded-2xl border-2 border-dashed border-stone-300 bg-white min-h-40 ${i === 5 ? 'md:col-span-2 border-brand' : ''}`}>
              <h2 className="font-serif text-2xl text-stone-900">{t}</h2>
              <p className="mt-2 text-stone-600">{q}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <CopyButton text={text} />
          <a href="/tools/positioning-statement-generator" className="px-6 py-3 rounded-full border border-brand text-brand font-medium hover:bg-brand/5">Use the generator</a>
        </div>
        <Sources keys={p.src} />
      </section>
    </Article>
  )
}
