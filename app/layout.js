import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Boundset | Positioning & Messaging for Startups',
  description: 'Stop rewriting your homepage. Get positioning that lasts, messaging that converts, and copy ready to use. 2-week sprints for B2B SaaS founders.',
  keywords: ['startup positioning', 'B2B SaaS messaging', 'positioning consultant', 'startup messaging', 'product positioning'],
  authors: [{ name: 'Blake Emal' }],
  creator: 'Boundset',
  openGraph: {
    title: 'Boundset | Positioning & Messaging for Startups',
    description: 'Stop rewriting your homepage. Get positioning that lasts, messaging that converts, and copy ready to use. 2-week sprints for B2B SaaS founders.',
    url: 'https://boundset.com',
    siteName: 'Boundset',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boundset | Positioning & Messaging for Startups',
    description: 'Stop rewriting your homepage. Get positioning that lasts, messaging that converts, and copy ready to use. 2-week sprints for B2B SaaS founders.',
    creator: '@heyblake',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://plausible.io/js/pa--rAGPBkKVDnMKpIcGWDrv.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
