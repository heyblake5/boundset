import { Article, meta } from '../../../components/Content'
import { caseOV as p } from '../../../lib/content'
export const metadata = meta(p)
export default function Page() {
  return (
    <Article p={p} close="Get your story straight in two weeks">
      <figure className="p-8 md:p-12 rounded-3xl bg-brand text-white">
        <img src="/logo-originalvoices.svg" alt="OriginalVoices" className="h-8 mb-8 brightness-0 invert" />
        <blockquote className="font-serif text-xl md:text-2xl leading-relaxed">{p.quote}</blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <img src="/david-dobrin.jpeg" alt="" width="56" height="56" className="w-14 h-14 rounded-full object-cover" />
          <span><span className="block font-semibold">{p.person}</span><span className="text-white/70">{p.role}</span></span>
        </figcaption>
      </figure>
      <p className="text-lg"><a href="/case-studies" className="text-brand underline underline-offset-4">All case studies →</a></p>
    </Article>
  )
}
