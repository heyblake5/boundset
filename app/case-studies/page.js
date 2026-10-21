import { PageShell, Hero, P, CloseCta } from '../../components/site'

export const metadata = {
  title: 'See how founders got their story straight | Boundset',
  description: 'Boundset runs a two week positioning sprint for startups. These teams finished one.',
  alternates: { canonical: '/case-studies' },
}

const DAVID_QUOTE =
  "We loved working with Blake. As an early stage AI company building something new, it's surprisingly difficult to succinctly explain what you do, the problem you're solving, and the solution you've built. Blake really took the time to understand our product , what we wanted to say and who we wanted to say it to. The sessions we did were productive - and in no time at all Blake sent us the copy and positioning we've been looking for. He was on hand to make tweaks and refinements based on our feedback, right up until we went live. I've already had lots of positive comments and we already feel more confident sharing our product, website and story. If you're debating whether to work with Blake, I'd say just go for it. I'm glad we did."

function Case({ id, name, headline, paras, quote, attribution, photo }) {
  return (
    <article aria-labelledby={id} className="bg-white rounded-2xl border border-stone-200 p-6 md:p-10">
      <P className="text-sm font-medium text-stone-700 mb-4">{name}</P>
      <h2 id={id} className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight mb-6 balance">{headline}</h2>
      <div className="space-y-4 text-lg text-stone-700 leading-relaxed">
        {paras.map((t) => <P key={t}>{t}</P>)}
      </div>
      <figure className="mt-8 border-l-4 border-brand pl-5">
        <blockquote className="text-lg md:text-xl font-serif text-stone-900 leading-relaxed"><P>{quote}</P></blockquote>
        <figcaption className="mt-4 flex items-center gap-3 text-stone-700">
          {photo && <img src={photo.src} alt={photo.alt} width="48" height="48" className="w-12 h-12 rounded-full object-cover" />}
          <P>{attribution}</P>
        </figcaption>
      </figure>
    </article>
  )
}

export default function Page() {
  return (
    <PageShell>
      <Hero title="See how founders got their story straight" subhead="Boundset runs a two week positioning sprint for startups. These teams finished one." />
      <div className="px-6 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">
          <Case
            id="salus"
            name="Salus [SALUS LOGO + PERMISSION TO NAME NEEDED]"
            headline="Salus needed a story for the buyers who pay"
            paras={[
              "Salus is a seed stage startup that runs single tenant cloud. [ONE LINE ON WHAT SALUS DOES, IN ANDREW'S WORDS]",
              'Salus ran a self serve motion that was not converting. Enterprise single tenant deals were where the revenue came from. The site and the pitch needed to say that. [CONFIRM WITH ANDREW WE CAN SAY THIS PUBLICLY]',
              'We ran the Boundset sprint and delivered it in two weeks. After the sprint, Salus brought us back to write their pricing page.',
              '[LIST OF SALUS DELIVERABLES TO SHOW, FROM THE PROJECT HUB]',
              '[CLIENT RESULT NEEDED]',
            ]}
            quote="{{ANDREW_QUOTE}}"
            attribution="Andrew Mori, CEO, Salus [CONFIRM TITLE]"
          />
          <Case
            id="originalvoices"
            name="OriginalVoices [LOGO NEEDED]"
            headline="OriginalVoices went live with copy they trust"
            paras={[
              'OriginalVoices is an early stage AI company. [ONE LINE ON WHAT ORIGINALVOICES DOES]',
              'They were building something new and found it hard to explain what they do in a few words.',
              '[CONFIRM ENGAGEMENT TYPE AND DELIVERABLES: Boundset sprint or other] We worked through working sessions, then delivered copy and positioning. We kept refining it from their feedback until they went live.',
              '[CLIENT RESULT NEEDED]',
            ]}
            quote={`“${DAVID_QUOTE}”`}
            attribution="David Dobrin, CEO, OriginalVoices"
            photo={{ src: '/david-dobrin.jpeg', alt: 'David Dobrin' }}
          />
        </div>
      </div>
      <CloseCta headline="Get your story straight in two weeks" body="Book a 15 minute call. We'll see if the sprint fits your team." />
    </PageShell>
  )
}
