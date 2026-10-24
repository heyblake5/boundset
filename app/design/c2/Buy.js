'use client'
import { LINK, WORKSHOP_LINK } from './workshop'
export default function Buy({ className, children }) {
  return <a href={WORKSHOP_LINK} className={className} data-placeholder={!LINK || undefined}
    onClick={() => { try { typeof window.plausible === 'function' && window.plausible('Workshop checkout click') } catch {} }}>{children}</a>
}
