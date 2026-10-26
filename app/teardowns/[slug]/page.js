import { notFound } from 'next/navigation'
import Shell from '../../../components/c2/Shell'
import Blocks from '../../../components/teardown/Blocks'
import RunYours from '../../../components/teardown/RunYours'
import TrackedLink from '../../../components/TrackedLink'
import Icon from '../../design/c2/Icons'
import s from '../../../components/teardown/td.module.css'
import { BOOK_CALL_URL, withPlaceholders } from '../../../components/site'
import { COPY } from '../../../components/teardown/copy'
import { TEARDOWNS, TEARDOWNS_PUBLIC, teardownBySlug, footerLine } from '../../../lib/teardowns'
import { toResult, teardownLd } from '../../../components/teardown/ld'
export const dynamicParams = false
export function generateStaticParams() { return TEARDOWNS.map((t) => ({ slug: t.slug })) }
export async function generateMetadata({ params }) {
  const t = teardownBySlug((await params).slug)
  return { title: `${t.h1} | Boundset`, description: t.answer, alternates: { canonical: `/teardowns/${t.slug}` }, robots: { index: TEARDOWNS_PUBLIC, follow: true } }
}
export default async function Page({ params }) {
  const t = teardownBySlug((await params).slug)
  if (!t) notFound()
  const words = [t.hero.h1, t.hero.sub, t.strongest.quote, ...t.gaps.map((g) => g.quote)].filter(Boolean)
  const book = `${BOOK_CALL_URL}?notes=${encodeURIComponent(`Teardown: ${new URL(t.url).hostname}`)}`
  return (
    <Shell><article className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teardownLd(t)) }} />
      <nav aria-label="Breadcrumb" className={s.crumb}><a href="/">{COPY.crumbHome}</a><span aria-hidden="true">/</span><a href="/teardowns">{COPY.crumbIndex}</a><span aria-hidden="true">/</span><span aria-current="page">{t.company}</span></nav>
      <h1 className={s.h1}>{t.h1}</h1>
      <p className={s.answer}>{t.answer}</p>
      <div className={s.theirHero}><p className={s.q}>{'\u201c'}{t.hero.h1}{'\u201d'}</p><p className={s.q} style={{ marginTop: 12 }}>{'\u201c'}{t.hero.sub}{'\u201d'}</p></div>
      <section className={s.sec}><h2 className={s.h2}>{COPY.works}</h2><ul className={s.list}>{t.works.map((w) => <li key={w}><Icon name="check" size={18} />{w}</li>)}</ul></section>
      <Blocks r={toResult(t)} pageLines={words} sideLabel={COPY.theirWords} />
      <section className={s.sec}><h2 className={s.h2}>{COPY.faq}</h2><dl className={s.faq}>{t.faq.map((f) => <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>)}</dl></section>
      <section className={s.sec}><h2 className={s.h2}>{COPY.runYours}</h2><RunYours slug={t.slug} /></section>
      <div className={s.after}>
        <nav aria-label={COPY.related} className={s.rel}>{t.related.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <TrackedLink href={book} event="Book call" props={{ src: `teardown-page:${t.slug}` }} className={s.btn}>{COPY.book}</TrackedLink>
      </div>
      <p className={s.foot}>{footerLine(t).split(t.url).map((part, i) => <span key={i}>{i > 0 && <a href={t.url} rel="nofollow noopener">{t.url}</a>}{withPlaceholders(part)}</span>)}</p>
    </article></Shell>
  )
}
