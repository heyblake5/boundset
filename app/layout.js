import './globals.css'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://boundset.com'),
  title: 'Boundset | Positioning & Messaging for Startups',
  description: 'Stop rewriting your homepage. Get positioning that lasts, messaging that converts, and copy ready to use. 2-week sprints for B2B SaaS founders.',
  keywords: ['startup positioning', 'B2B SaaS messaging', 'positioning consultant', 'startup messaging', 'product positioning'],
  authors: [{ name: 'Blake Emal' }],
  creator: 'Boundset',
  verification: { google: 'MaJoNVVnv2xNFkPhQDXejztea13AfQLdVDZFJnefSZ8' },
  openGraph: {
    title: 'Boundset | Positioning & Messaging for Startups',
    description: 'Stop rewriting your homepage. Get positioning that lasts, messaging that converts, and copy ready to use. 2-week sprints for B2B SaaS founders.',
    url: 'https://boundset.com',
    siteName: 'Boundset',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/brand/og-mark-1200x630.png', width: 1200, height: 630, alt: 'Boundset' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boundset | Positioning & Messaging for Startups',
    description: 'Stop rewriting your homepage. Get positioning that lasts, messaging that converts, and copy ready to use. 2-week sprints for B2B SaaS founders.',
    creator: '@heyblake',
  },
  icons: { icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/favicon.ico', sizes: 'any' }, { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' }], apple: '/brand/apple-touch-icon.png' },
  robots: {
    index: true,
    follow: true,
  },
}

// Analytics off unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set; event calls check typeof window.plausible first.
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

const ORG_LD = [
  { '@context': 'https://schema.org', '@type': 'Organization', '@id': 'https://boundset.com/#org', name: 'Boundset', url: 'https://boundset.com', logo: 'https://boundset.com/brand/icon-512.png', email: 'blake@boundset.com', founder: { '@type': 'Person', name: 'Blake Emal' }, sameAs: ['https://twitter.com/heyblake', 'https://linkedin.com/in/blakeemal'] },
  { '@context': 'https://schema.org', '@type': 'WebSite', '@id': 'https://boundset.com/#site', name: 'Boundset', url: 'https://boundset.com', publisher: { '@id': 'https://boundset.com/#org' } },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {PLAUSIBLE && <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      </head>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />{children}</body>
    </html>
  )
}
