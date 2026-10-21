import { PageShell, BookCallButton } from '../../../components/site'
import { ITEMS, BANDS, bandFor, parseChecked } from '../../../components/quizData'

export const metadata = {
  title: 'Your positioning score | Boundset',
  robots: { index: false, follow: true },
}

export default function Page({ searchParams }) {
  const checked = parseChecked(searchParams?.c)
  const band = BANDS[bandFor(checked.length)]
  return (
    <PageShell>
      <section className="px-6 pt-16 pb-16 md:pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-[1.1] mb-6 balance">{band.h1}</h1>
          <p className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-10">{band.body}</p>
          <ol className="space-y-4 mb-12">
            {band.fixes.map((f, i) => (
              <li key={i} className="flex gap-4 bg-white border border-stone-200 rounded-2xl p-5">
                <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-medium">{i + 1}</span>
                <span className="text-lg text-stone-800">{f}</span>
              </li>
            ))}
          </ol>
          <p className="text-lg font-semibold text-stone-900 mb-3">Here's what you checked:</p>
          {checked.length > 0 && (
            <ul className="list-disc pl-6 space-y-1 text-stone-700">
              {checked.map((i) => <li key={i}>{ITEMS[i]}</li>)}
            </ul>
          )}
        </div>
      </section>
      <section aria-labelledby="cta-h" className="py-20 md:py-28 px-6 bg-brand text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="cta-h" className="text-3xl md:text-5xl font-serif leading-tight mb-6 balance">Fix it in two weeks</h2>
          <p className="text-xl text-white/85 mb-10">The Boundset sprint locks your positioning and writes the copy your team uses on your site and in sales calls. Start with a 15 minute call to see if it fits.</p>
          <BookCallButton variant="light" />
        </div>
      </section>
    </PageShell>
  )
}
