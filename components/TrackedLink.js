'use client'
// Link that fires a Plausible custom event (goal) on click. Plausible is loaded in app/layout.js.
export default function TrackedLink({ event, href, children, ...rest }) {
  return (
    <a
      href={href}
      onClick={() => {
        if (typeof window !== 'undefined' && typeof window.plausible === 'function') window.plausible(event)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
