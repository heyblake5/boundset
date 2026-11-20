import Shell from '../../components/c2/Shell'
import IndexList from '../../components/c2/IndexList'
import { guides } from '../../lib/guides'

export const metadata = {
  title: 'Positioning guides | Boundset',
  description: 'Guides on product positioning, messaging, and the positioning sprint.',
  alternates: { canonical: '/guides' },
}

export default function Guides() {
  const items = [
    ...guides().map((g) => ({ href: g.route, name: g.h1 })),
    { href: '/positioning-cost', name: 'What positioning work costs' },
    { href: '/messaging-strategy', name: 'How to build a messaging strategy' },
  ]
  return <Shell><IndexList title="Guides" items={items} /></Shell>
}
