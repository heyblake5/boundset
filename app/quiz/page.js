import { PageShell } from '../../components/site'
import QuizFlow from '../../components/QuizFlow'

export const metadata = {
  title: 'Find out what your positioning debt costs you | Boundset',
  description: 'Check every statement that sounds like your team. You get a score and the first fixes to make.',
  alternates: { canonical: '/quiz' },
}

export default function Page() {
  return (
    <PageShell>
      <section className="px-6 pt-16 pb-20 md:pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-[1.1] mb-6 balance">Find out what your positioning debt costs you</h1>
          <p className="text-xl md:text-2xl text-stone-700 leading-relaxed mb-4 max-w-3xl">Check every statement that sounds like your team. You get a score and the first fixes to make.</p>
          <p className="text-stone-600 mb-10">Takes two minutes. Select all that apply.</p>
          <QuizFlow />
        </div>
      </section>
    </PageShell>
  )
}
