import s from '../app/design/c2/c2.module.css'
import { FIX_BEFORE, FIX_AFTER, FIX_SOURCE } from '../lib/fixCopy'

export default function FixCard() {
  return (
    <div className={s.fix}>
      <p className={s.fixBefore}>{FIX_BEFORE}</p>
      <p className={s.fixAfter}>{FIX_AFTER}</p>
      <p className={s.fixWhy}>This says CRM, which is what buyers search for, instead of <a href={FIX_SOURCE} rel="noopener noreferrer">Attio</a>&apos;s phrase.</p>
    </div>
  )
}
