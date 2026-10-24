// Registry for /free-tools. Names are functional labels; descriptions are placeholder SEO copy (see PLACEHOLDER-COPY.md).
export const TOOLS = [
  { slug: 'positioning-statement-generator', name: 'Positioning statement generator', icon: 'statement', desc: 'Write a positioning statement and one-liner from your best-fit customer, category, alternative and difference.' },
  { slug: 'headline-tester', name: 'Headline tester', icon: 'headline', desc: 'Check headlines for length, punctuation, jargon and vague words.' },
  { slug: 'value-prop-scorer', name: 'Value prop clarity scorer', icon: 'score', desc: 'Score a value proposition for jargon, length, sentence size and customer focus.' },
  { slug: 'messaging-hierarchy-builder', name: 'Messaging hierarchy builder', icon: 'hierarchy', desc: 'Lay out a core message, three pillars and proof points as a messaging hierarchy.' },
  { slug: 'positioning-debt-check', name: 'Positioning debt self-check', icon: 'debt', desc: 'Tick the red flags that apply to your company and see where your positioning stands.' },
  { slug: 'elevator-pitch-builder', name: 'Elevator pitch builder', icon: 'pitch', desc: 'Turn a few inputs into a one-sentence, 30-second and 60-second pitch.' },
  { slug: 'competitive-alternatives-mapper', name: 'Competitive alternatives mapper', icon: 'alternatives', desc: 'Map what buyers would use instead of you and where you win against each.' },
  { slug: 'icp-sketcher', name: 'Best-fit customer sketcher', icon: 'icp', desc: 'Sketch your best-fit customer: stage, buyer, trigger, pain and disqualifiers.' },
  { slug: 'category-picker', name: 'Market category picker', icon: 'category', desc: 'Answer five questions to choose between an existing category, a subcategory or a new one.' },
  { slug: 'sprint-roi-calculator', name: 'Sprint ROI calculator', icon: 'roi', desc: 'Estimate payback on a positioning sprint using only numbers you enter.' },
]
export const CANVAS = { href: '/templates/positioning-canvas', name: 'Positioning canvas', icon: 'canvasTool' }
export const bySlug = (s) => TOOLS.find((t) => t.slug === s)
