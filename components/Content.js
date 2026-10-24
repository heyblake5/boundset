import { PageShell, CloseCta } from './site'
import { SITE, UPDATED, SRC } from '../lib/content'

export function Ld({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function pageLd(p, type = 'Article') {
  const url = SITE + p.path
  const out = [
    { '@context': 'https://schema.org', '@type': type, headline: p.title, name: p.title, url, dateModified: UPDATED, description: p.answer,
      author: { '@type': 'Person', name: 'Blake Emal', url: SITE }, publisher: { '@id': SITE + '/#org' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Boundset', item: SITE },
      { '@type': 'ListItem', position: 2, name: p.title, item: url } ] },
  ]
  if (p.faq) out.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })
  return out
}

export function meta(p) {
  return { title: `${p.title} | Boundset`, description: p.answer.slice(0, 158), alternates: { canonical: p.path }, openGraph: { title: p.title, description: p.answer.slice(0, 158), url: p.path, type: 'article' } }
}

export function Sources({ keys }) {
  if (!keys?.length) return null
  return (
    <p className="text-sm text-stone-600 mt-4">
      {keys.map((k, i) => (
        <span key={k}>{i > 0 && ' · '}<a href={SRC[k].url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand">{SRC[k].label}</a></span>
      ))}
    </p>
  )
}

export function Article({ p, type, children, close = 'Talk through your positioning in 15 minutes' }) {
  return (
    <PageShell>
      <Ld data={pageLd(p, type)} />
      <article>
        <header className="px-6 pt-16 md:pt-28 pb-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[1.05] tracking-tight balance">{p.title}</h1>
            <p className="mt-6 text-sm text-stone-500">By Blake Emal · <time dateTime={UPDATED}>Oct 23, 2026</time></p>
            <p className="mt-10 text-xl md:text-2xl text-stone-800 leading-relaxed border-l-4 border-brand pl-6">{p.answer}</p>
          </div>
        </header>
        <div className="px-6 pb-20">
          <div className="max-w-3xl mx-auto space-y-16">{children}</div>
        </div>
        {p.faq && (
          <section aria-labelledby="faq" className="px-6 py-20 bg-white border-t border-stone-200">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq" className="text-3xl md:text-4xl font-serif mb-8">What else do people ask</h2>
              <div className="divide-y divide-stone-200">
                {p.faq.map(({ q, a }) => (
                  <details key={q} className="group py-5" open>
                    <summary className="cursor-pointer list-none flex justify-between items-center text-lg font-semibold text-stone-900">
                      <h3>{q}</h3><span className="text-brand text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-3 text-stone-700 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
      <CloseCta headline={close} />
    </PageShell>
  )
}

export function Sections({ sections }) {
  return sections.map((s, i) => (
    <section key={s.h}>
      <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight mb-6 balance">{s.h}</h2>
      {s.list && (
        <ol className="grid gap-4 mb-6">
          {s.list.map(([t, d], j) => (
            <li key={t} className="flex gap-5 p-5 rounded-2xl bg-white border border-stone-200 hover:border-brand transition-colors">
              <span className="font-serif text-3xl text-brand/40 w-8 shrink-0">{j + 1}</span>
              <div><p className="font-semibold text-stone-900">{t}</p><p className="text-stone-700 mt-1">{d}</p></div>
            </li>
          ))}
        </ol>
      )}
      {s.body && <p className="text-lg text-stone-700 leading-relaxed">{s.body}</p>}
      <Sources keys={s.src} />
    </section>
  ))
}
