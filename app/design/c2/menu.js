import { GUIDE_NAV } from '../../../lib/guideNav'
import { TOOLS } from '../../free-tools/tools'
import { SHOW_WORKSHOP } from './workshop'
export const HOME = '/'
export const MENU = [
  { id: 'sprint', label: 'Sprint', links: [
    { href: '/sprint', name: 'Positioning sprint' },
    { href: `/#included`, name: 'Stake and Stronghold' }, { href: `/#how`, name: 'Timeline' },
    { href: `/#pricing`, name: 'Pricing' }, ...(SHOW_WORKSHOP ? [{ href: `/#workshop`, name: 'Workshop' }] : []), { href: `/#faq`, name: 'FAQs' } ] },
  { id: 'resources', label: 'Resources', heading: 'Guides', links: [...GUIDE_NAV.map(({ href, name }) => ({ href, name })), { href: '/answers', name: 'All answers', all: true }, { href: '/compare', name: 'Compare', all: true }] },
  { id: 'tools', label: 'Free Tools', links: [
    ...TOOLS.slice(0, 6).map((t) => ({ href: `/free-tools/${t.slug}`, name: t.name, icon: t.icon })),
    { href: '/free-tools', name: 'All free tools', all: true } ] },
]
