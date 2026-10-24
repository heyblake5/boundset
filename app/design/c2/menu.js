import { TOOLS } from '../../free-tools/tools'
import { SHOW_WORKSHOP } from './workshop'
export const HOME = '/'
export const MENU = [
  { id: 'sprint', label: 'Sprint', links: [
    { href: `/#included`, name: 'Stake and Stronghold' }, { href: `/#how`, name: 'Timeline' },
    { href: `/#pricing`, name: 'Pricing' }, ...(SHOW_WORKSHOP ? [{ href: `/#workshop`, name: 'Workshop' }] : []), { href: `/#faq`, name: 'FAQs' } ] },
  { id: 'resources', label: 'Resources', links: [
    { href: '/positioning', name: 'Positioning guide' }, { href: '/answers/positioning-vs-messaging', name: 'Positioning vs messaging' },
    { href: '/april-dunford-alternatives', name: 'April Dunford alternatives' }, { href: '/positioning-sprint-cost', name: 'Positioning sprint cost' },
    { href: '/positioning-agency-vs-fractional-pmm', name: 'Agency vs fractional PMM' }, { href: '/templates/positioning-canvas', name: 'Positioning canvas' } ] },
  { id: 'tools', label: 'Free Tools', links: [
    ...TOOLS.slice(0, 6).map((t) => ({ href: `/free-tools/${t.slug}`, name: t.name, icon: t.icon })),
    { href: '/free-tools', name: 'All free tools', all: true } ] },
]
