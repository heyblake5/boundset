import Shell from '../../components/c2/Shell'
import IndexList from '../../components/c2/IndexList'
import TrackedLink from '../../components/TrackedLink'
import c from '../../app/design/c2/c2.module.css'
import g from '../../components/guide/guide.module.css'
import { compareDocs } from '../../lib/docs'
import { guide, BOOK } from '../../lib/guides'
import { WORKSHOP_LINK, SHOW_WORKSHOP } from '../../app/design/c2/workshop'
export const metadata = { title: 'Positioning options compared | Boundset', description: 'Side by side comparisons of the ways startups get positioning done.', alternates: { canonical: '/compare' } }
export default function Compare() {
  const items = [...['positioning-agency-vs-fractional-pmm', 'april-dunford-alternatives', 'positioning-sprint-cost'].map((s) => guide(s)).map((page) => ({ href: page.route, name: page.h1 })), ...compareDocs().map((d) => ({ href: d.route, name: d.h1 }))]
  return (
    <Shell>
      <IndexList title="Compare" items={items} />
      <section className={g.close}>
        <a href={BOOK} className={c.btn}>Book a call</a>
        {SHOW_WORKSHOP && (
          <p className="mt-6 text-white/85">
            Want to do it yourself with an expert alongside?{' '}
            <TrackedLink href={WORKSHOP_LINK} event="Workshop click" className="underline underline-offset-4 text-white focus-ring rounded">
              Start with the $2,000 workshop
            </TrackedLink>
          </p>
        )}
      </section>
    </Shell>
  )
}
