import { Article, Sections, meta } from '../../components/Content'
import { positioning as p } from '../../lib/content'
export const metadata = meta(p)
export default function Page() {
  return (
    <Article p={p}>
      <Sections sections={p.sections} />
      <section className="grid sm:grid-cols-3 gap-4">
        {[['/free-tools/positioning-statement-generator', 'Draft your statement'], ['/templates/positioning-canvas', 'Positioning canvas'], ['/answers/positioning-vs-messaging', 'Positioning vs messaging']].map(([h, t]) => (
          <a key={h} href={h} className="p-6 rounded-2xl bg-brand text-white font-serif text-xl hover:bg-brand/90 transition-colors">{t} →</a>
        ))}
      </section>
    </Article>
  )
}
