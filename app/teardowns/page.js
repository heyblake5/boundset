import Shell from '../../components/c2/Shell'
import s from '../../components/teardown/td.module.css'
import { TEARDOWNS, TEARDOWNS_PUBLIC } from '../../lib/teardowns'
import { COPY } from '../../components/teardown/copy'
export const metadata = { title: `${COPY.indexTitle} | Boundset`, alternates: { canonical: '/teardowns' }, robots: { index: TEARDOWNS_PUBLIC, follow: true } }
export default function Page() {
  return (
    <Shell><div className={s.page}>
      <h1 className={s.h1}>{COPY.indexTitle}</h1>
      <div className={s.samples}>{TEARDOWNS.map((x) => (
        <a key={x.slug} href={`/teardowns/${x.slug}`} className={s.card}>
          <span className={s.mark}>{x.company}</span><span className={s.q}>{'\u201c'}{x.hero.h1}{'\u201d'}</span><span className={s.rw}>{x.rewrite.hero}</span>
        </a>))}</div>
    </div></Shell>
  )
}
