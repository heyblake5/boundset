import { notFound } from 'next/navigation'
import Shell from '../../../../components/c2/Shell'
import Blocks from '../../../../components/teardown/Blocks'
import TrackedLink from '../../../../components/TrackedLink'
import s from '../../../../components/teardown/td.module.css'
import { BOOK_CALL_URL } from '../../../../components/site'
import { COPY } from '../../../../components/teardown/copy'
import { load } from '../../../../lib/teardown/limits'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Positioning teardown | Boundset', robots: { index: false, follow: false } }
// NOTE: results live in instance memory (no Redis per Bond), so a link can 404 on another instance or after a cold start.
export default async function Page({ params }) {
  const rec = load((await params).id)
  if (!rec) notFound()
  const book = `${BOOK_CALL_URL}?notes=${encodeURIComponent(`Teardown: ${rec.host}`)}`
  return (
    <Shell><div className={s.page}>
      <p className={s.title}>{rec.page.title}</p>{rec.page.h1 && <h1 className={s.pH1}>{rec.page.h1}</h1>}
      <Blocks r={rec.result} pageLines={rec.page.text.split('\n').map((l) => l.replace(/^H[1-3]: /, ''))} />
      <div className={s.after}><span /><TrackedLink href={book} event="Book call" props={{ src: 'teardown-tool' }} className={s.btn}>{COPY.book}</TrackedLink></div>
    </div></Shell>
  )
}
