// Shared chrome for the new content pages (quiz, case studies, comparison pages).
// Server components: no client JS needed except the tracked links below.
import TrackedLink from './TrackedLink'

export const BOOK_CALL_URL = 'https://cal.com/heyblake/positioning'

// Renders text with [BRACKETED] and {{BRACED}} placeholders highlighted so they stay visible.
export function P({ children, className = '' }) {
  return <p className={className}>{withPlaceholders(children)}</p>
}

export function withPlaceholders(text) {
  if (typeof text !== 'string') return text
  const parts = text.split(/(\[[^\]]+\]|\{\{[^}]+\}\})/g)
  return parts.map((part, i) =>
    /^(\[[^\]]+\]|\{\{[^}]+\}\})$/.test(part) ? (
      <mark key={i} className="placeholder">{part}</mark>
    ) : (
      part
    )
  )
}

export function BookCallButton({ className = '', variant = 'solid' }) {
  const base =
    'inline-flex items-center justify-center px-8 py-4 font-medium rounded-full transition-colors duration-300 text-lg focus-ring'
  const styles =
    variant === 'light'
      ? 'bg-white text-brand hover:bg-white/90'
      : 'bg-brand text-white hover:bg-brand/90'
  return (
    <TrackedLink href={BOOK_CALL_URL} event="Book call click" className={`${base} ${styles} ${className}`}>
      Book a call
    </TrackedLink>
  )
}

export function SiteHeader() {
  return (
    <header className="bg-white/95 border-b border-stone-200">
      <a href="#main" className="skip-link">Skip to content</a>
      <nav aria-label="Main" className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="/" className="font-serif text-2xl text-brand font-semibold tracking-tight focus-ring rounded">boundset</a>
        <div className="flex items-center gap-3">
          <a href="/quiz" className="hidden sm:inline-flex px-5 py-2.5 rounded-full font-medium text-sm border border-brand text-brand hover:bg-brand/5 transition-colors focus-ring">Take the quiz</a>
          <TrackedLink href={BOOK_CALL_URL} event="Book call click" className="px-5 py-2.5 rounded-full font-medium text-sm bg-brand text-white hover:bg-brand/90 transition-colors focus-ring">Book a call</TrackedLink>
        </div>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="py-12 px-6 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <a href="/" className="font-serif text-xl font-semibold focus-ring rounded">boundset</a>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="text-white/70 text-sm">Positioning for Startups</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:blake@boundset.com" className="text-white/70 hover:text-white transition-colors text-sm focus-ring rounded">blake@boundset.com</a>
          <a href="https://twitter.com/heyblake" target="_blank" rel="noopener noreferrer" aria-label="Blake on X" className="text-white/70 hover:text-white transition-colors focus-ring rounded">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://linkedin.com/in/blakeemal" target="_blank" rel="noopener noreferrer" aria-label="Blake on LinkedIn" className="text-white/70 hover:text-white transition-colors focus-ring rounded">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export function PageShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <SiteHeader />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

export function Hero({ title, subhead, children }) {
  return (
    <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-[1.1] mb-6 balance">{title}</h1>
        {subhead && <P className="text-xl md:text-2xl text-stone-700 leading-relaxed">{subhead}</P>}
        {children}
      </div>
    </section>
  )
}

export function CloseCta({ headline, body }) {
  return (
    <section className="py-20 md:py-28 px-6 bg-brand text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-6 balance">{headline}</h2>
        {body && <p className="text-xl text-white/85 mb-10">{body}</p>}
        <BookCallButton variant="light" />
      </div>
    </section>
  )
}
