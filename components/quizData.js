// Positioning Debt quiz content. Copy is Quill's final copy, verbatim.
export const ITEMS = [
  "We can't explain what we do in one sentence",
  'Sales cycles take longer than they should',
  'We lead with features instead of results',
  'Prospects compare us to the wrong competitors',
  'We change our messaging every few months',
  'Investors ask us to simplify our pitch',
  'New hires take weeks to learn how to describe us',
  'We sound like everyone else in our space',
  'Every person on our team explains the product differently',
  'Sales calls start with a long explanation',
  'Our cold emails get ignored',
  'We second guess every tagline',
  'Marketing and sales say different things',
  'Founder voice and brand voice blur together',
  "We skip content because we don't know what to say",
  "We don't know what to put on our features page",
]

export const BANDS = {
  low: {
    h1: 'Your story holds up well',
    body: 'A few cracks show. Fix them now while they stay small.',
    fixes: [
      "Write your one sentence. Say who it's for and what changes for them. Test it on a stranger.",
      'Ask two teammates to describe the product in writing. Compare the answers side by side.',
      'Pick the checked item that slows sales down worst. Fix that one first.',
    ],
  },
  medium: {
    h1: 'Your positioning is slowing your team down',
    body: 'Your product works. The way you describe it lags behind. That gap shows up in sales calls and on your homepage.',
    fixes: [
      'List the alternatives a buyer weighs before they find you. Position against those, not the logos you admire.',
      'Rewrite your homepage headline around the change your best customer saw. Move features lower on the page.',
      'Put one messaging doc in a shared folder. Ask sales and marketing to pull from it for a month.',
    ],
  },
  high: {
    h1: 'Your positioning debt is costing you deals',
    body: "Your team explains the product a dozen ways. A rewrite of the homepage won't fix it on its own.",
    fixes: [
      'Stop tweaking copy for now. Decide your market category and your best customer first.',
      'Pull three recent closed deals. Write down why each buyer said yes in their words.',
      'Get founders in one room until you agree on the one sentence. Write everything else from it.',
    ],
  },
}

// Low 0-4, Medium 5-9, High 10-16
export function bandFor(score) {
  if (score <= 4) return 'low'
  if (score <= 9) return 'medium'
  return 'high'
}

// Parse "?c=0,3,7" into a sorted, de-duplicated list of valid item indexes.
export function parseChecked(c) {
  if (!c || typeof c !== 'string') return []
  return [...new Set(c.split(',').map((n) => parseInt(n, 10)).filter((n) => Number.isInteger(n) && n >= 0 && n < ITEMS.length))].sort((a, b) => a - b)
}
