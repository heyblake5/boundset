import { TOOLS } from '../../free-tools/tools'
export const HOME = '/design/c2'
export const MENU = [
  { id: 'sprint', label: 'Sprint', links: [
    { href: `${HOME}#included`, name: 'Stake and Stronghold' }, { href: `${HOME}#how`, name: 'Timeline' },
    { href: `${HOME}#pricing`, name: 'Pricing' }, { href: `${HOME}#workshop`, name: 'Workshop' }, { href: `${HOME}#faq`, name: 'FAQs' } ] },
  { id: 'work', label: 'Work', links: [ { href: '/case-studies', name: 'Case studies' }, { href: '/case-studies/originalvoices', name: 'OriginalVoices' } ] },
  { id: 'resources', label: 'Resources', links: [
    { href: '/positioning', name: 'Positioning guide' }, { href: '/answers/positioning-vs-messaging', name: 'Positioning vs messaging' },
    { href: '/april-dunford-alternatives', name: 'April Dunford alternatives' }, { href: '/positioning-sprint-cost', name: 'Positioning sprint cost' },
    { href: '/positioning-agency-vs-fractional-pmm', name: 'Agency vs fractional PMM' }, { href: '/templates/positioning-canvas', name: 'Positioning canvas' } ] },
  { id: 'tools', label: 'Free Tools', links: [
    ...TOOLS.slice(0, 6).map((t) => ({ href: `/free-tools/${t.slug}`, name: t.name, icon: t.icon })),
    { href: '/free-tools', name: 'All free tools', all: true } ] },
]
