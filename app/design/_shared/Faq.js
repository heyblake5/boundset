import { faqs } from './data'
// Zero-JS FAQ: <details> per question, grouped.
export default function Faq({ cls = {} }) {
  return (
    <div className={cls.faq}>
      {Object.entries(faqs).map(([cat, items]) => (
        <div key={cat} className={cls.faqGroup}>
          <h3 className={cls.faqCat}>{cat}</h3>
          {items.map(([q, a]) => (
            <details key={q} className={cls.faqItem}>
              <summary className={cls.faqQ}>{q}</summary>
              <p className={cls.faqA}>{a}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  )
}
