import { Article, Sources, meta } from '../../../components/Content'
import StatementGenerator from '../../../components/StatementGenerator'
import { tool as p } from '../../../lib/content'
export const metadata = meta(p)
export default function Page() {
  return (
    <Article p={p} type="WebApplication">
      <section><StatementGenerator /><Sources keys={p.src} /></section>
      <p className="text-lg"><a href="/templates/positioning-canvas" className="text-brand underline underline-offset-4">Fill the full positioning canvas →</a></p>
    </Article>
  )
}
