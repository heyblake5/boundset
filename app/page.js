import Home from './design/c2/Home'
import * as d from './design/_shared/data'

const title = 'Boundset | Positioning and messaging sprints for B2B startups'
export const metadata = {
  title, description: d.hero.sub, alternates: { canonical: 'https://boundset.com/' },
  openGraph: { title, description: d.hero.sub, url: 'https://boundset.com/', siteName: 'Boundset', type: 'website', locale: 'en_US',
    images: [{ url: '/brand/og-mark-1200x630.png', width: 1200, height: 630, alt: 'Boundset' }] },
  twitter: { card: 'summary_large_image', title, description: d.hero.sub, creator: '@heyblake', images: ['/brand/og-mark-1200x630.png'] },
  robots: { index: true, follow: true },
}
export default Home
