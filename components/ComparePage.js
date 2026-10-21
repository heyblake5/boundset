import { PageShell, Hero, P, CloseCta, withPlaceholders } from './site'

// Linkify "Sources:" domains without changing the words.
function Body({ text }) {
  const idx = text.indexOf('Sources:')
  if (idx === -1) return <P className="text-lg text-stone-700 leading-relaxed">{text}</P>
  const before = text.slice(0, idx)
  const rest = text.slice(idx + 'Sources:'.length)
  const m = rest.match(/^(.*?)(\s*\(checked [^)]*\)\.?)$/)
  const list = (m ? m[1] : rest).split(',').map((s) => s.trim())
  const tail = m ? m[2] : ''
  return (
    <p className="text-lg text-stone-700 leading-relaxed">
      {withPlaceholders(before)}Sources:{' '}
      {list.map((d, i) => (
        <span key={d}>
          <a href={`https://${d}`} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2 hover:no-underline focus-ring rounded">{d}</a>
          {i < list.length - 1 ? ', ' : ''}
        </span>
      ))}
      {tail}
    </p>
  )
}

export default function ComparePage({ data }) {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: typeof a === 'string' ? a : a.text },
    })),
  }
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Hero title={data.h1} subhead={data.subhead} />
      <div className="px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {data.sections.map((s) => (
            <section key={s.h} aria-labelledby={slug(s.h)}>
              <h2 id={slug(s.h)} className="text-2xl md:text-4xl font-serif text-stone-900 leading-tight mb-4 balance">{s.h}</h2>
              <Body text={s.body} />
            </section>
          ))}
        </div>
      </div>
      <section aria-labelledby="faq" className="px-6 py-16 bg-white border-t border-stone-200">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq" className="sr-only">FAQ</h2>
          <dl className="divide-y divide-stone-200">
            {data.faq.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="text-lg font-semibold text-stone-900 mb-2">{q}</dt>
                <dd className="text-stone-700 leading-relaxed">
                  {typeof a === 'string' ? withPlaceholders(a) : a.node}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <CloseCta headline={data.close} />
    </PageShell>
  )
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
