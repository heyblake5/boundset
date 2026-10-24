const OG = [{ url: '/brand/og-mark-1200x630.png', width: 1200, height: 630, alt: 'Boundset' }]
// Bond's meta (title/description/canonical) kept as-is; OG/Twitter image added so shares get the C2 card.
export const withOg = (m, url) => ({ ...m, openGraph: { ...(m.openGraph || {}), title: m.openGraph?.title || m.title, description: m.description, url, type: 'article', siteName: 'Boundset', images: OG },
  twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [OG[0].url] } })
