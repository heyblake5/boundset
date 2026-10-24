export const hero = {
  h1: 'Nail your positioning so your product sells itself.',
  sub: "A 2-week sprint for seed-stage startups and beyond. You'll walk away with your positioning locked, messaging documented, and copy ready to use across your site, sales calls, and outreach.",
}
export const logos = [
  { src: '/logo-provable.svg', alt: 'Provable', w: 195, h: 30 },
  { src: '/logo-athena.svg', alt: 'Athena', w: 185, h: 30 },
  { src: '/logo-gamma.svg', alt: 'Gamma', w: 175, h: 30 },
  { src: '/logo-originalvoices.svg', alt: 'OriginalVoices', w: 229, h: 31 },
  { src: '/logo-salus.svg', alt: 'Salus', w: 2617, h: 548, scale: 1.18 },
]
export const quiz = {
  h2: 'Red flags in your current strategy',
  body: 'Your product is gaining traction. Customers love it once they understand it. But getting them to that point takes too long. The homepage needs constant tweaking. Sales calls start with "let me explain what we do." If any of this sounds familiar, your positioning might be the bottleneck.',
  questions: [
    "We can't explain what we do in one sentence",
    'Sales cycles take longer than they should',
    'We lead with features instead of outcomes',
    'Prospects compare us to the wrong competitors',
    'We change our messaging every few months',
    "Investors ask us to 'simplify' our pitch",
    'New hires take weeks to learn how to describe us',
    'We sound like everyone else in our space',
  ],
  result(score) {
    if (score === 0) return null
    if (score <= 2) return 'A few cracks showing'
    if (score <= 4) return 'This is costing you deals'
    if (score <= 6) return 'Your messaging needs serious attention'
    return 'Red alert: messaging is broken'
  },
}
export const deliverablesH2 = "What's included in the 2-week sprint"
export const deliverables = [
  { title: 'Positioning workshop', desc: "We'll talk through past efforts, current thinking on audience, product, features, benefits, and outcomes, and strategize on your position in the market." },
  { title: 'Positioning strategy grid', desc: 'Your positioning statement, functional description, problem framing, value proposition, and supporting arguments in one doc.' },
  { title: 'Messaging matrix', desc: 'Core messages to use across all marketing assets. Makes the who, what, where, when, and why unmistakable.' },
  { title: 'Use case messaging doc', desc: 'Messaging tailored to each use case you sell into.' },
  { title: 'Minimum viable messaging', desc: 'The shortest version of your story that still lands.' },
  { title: 'Value proposition canvas', desc: 'What messages to say that are valuable to what audience.' },
  { title: 'Homepage copy with variants', desc: 'Every element written out, with variants to test for H1, H2, H3, and critical subtext.' },
  { title: 'Homepage wireframe', desc: 'Section-by-section layout with placeholders for visuals and all copy implemented.' },
  { title: 'Brand vs. founder guide', desc: 'Where the company voice ends and your personal voice begins.' },
  { title: 'Competitive positioning audit', desc: 'Where you win, where they win, and what to say when prospects bring them up.' },
  { title: '1 activation asset', desc: 'Cold email, landing page, ad copy, or objection scripts. You pick.' },
  { title: 'Ongoing Slack access', desc: 'Quick questions answered. No retainer.' },
]
export const timelineH2 = 'Your sprint will follow this timeline'
export const milestones = [
  { phase: 'Before', title: 'You send materials', desc: 'Demo, sales call recording, current site, competitor list. 30 minutes.' },
  { phase: 'Before', title: 'I do my homework', desc: 'I review everything and come to our first session with questions and hypotheses.' },
  { phase: 'Week 1', title: 'Positioning workshop', desc: '90-minute working session. We map audience, product, features, benefits, outcomes.' },
  { phase: 'Week 1', title: 'Strategy grid delivered', desc: 'Your positioning statement, problem framing, and value prop in writing.' },
  { phase: 'Week 1', title: 'Messaging matrix delivered', desc: 'Core messages locked. Who, what, where, when, why defined.' },
  { phase: 'Week 1', title: 'Competitive audit delivered', desc: 'Your top 3 competitors mapped. Where you win, where they win.' },
  { phase: 'Week 2', title: 'Homepage copy delivered', desc: 'Full page written with variants for every heading and subtext.' },
  { phase: 'Week 2', title: 'Wireframe delivered', desc: 'Section-by-section layout with copy in place.' },
  { phase: 'Week 2', title: 'Brand vs. founder guide', desc: 'Voice separation documented.' },
  { phase: 'Week 2', title: 'Activation asset delivered', desc: 'Your chosen asset written and ready.' },
  { phase: 'After', title: "You're in my Slack", desc: 'Questions come up. You ask. I answer. Ongoing.' },
]
export const phases = ['Before', 'Week 1', 'Week 2', 'After']
export const beforeAfterH2 = "Here's what changes when you have a strong position and message"
export const rows = [
  ['You rewrite your homepage every few months', "Homepage copy that lasts because it's built on real positioning"],
  ['Every team member explains the product differently', 'One messaging matrix everyone pulls from'],
  ['Sales calls start with long explanations', 'Prospects already get it before the demo'],
  ["Investors ask you to 'simplify' your pitch", 'Pitch language that lands in one sentence'],
  ['New hires take weeks to learn how to describe you', 'Onboarding doc that gets them fluent in days'],
  ['You sound like your competitors', 'Competitive positioning that carves out your space'],
  ['Features dominate your site, outcomes are buried', 'Value prop leads, features support'],
  ['Cold emails get ignored', 'Outbound that earns replies'],
  ['You second-guess every tagline', 'Variants tested, best one chosen, decision made'],
  ['Marketing and sales say different things', 'Aligned messaging across every channel'],
  ['You keep tweaking without a system', 'Messaging matrix you can build on for years'],
  ['Prospects compare you to the wrong competitors', 'Positioning that puts you in the right conversation'],
  ['Your founder voice and brand voice blur together', 'Documented guide for when to use each'],
  ["You avoid content because you don't know what to say", 'Angles and hooks ready to post'],
  ["You're not sure what to say on your features page", 'Use case messaging ready to deploy'],
]
export const pricingH2 = 'Two ways you can invest in your product'
export const tiers = [
  { id: 'stake', name: 'Stake', price: '$7,500', blurb: 'The full sprint. Everything you need to fix your messaging and start using it immediately.',
    items: ['Positioning workshop', 'Positioning strategy grid', 'Messaging matrix', 'Use case messaging doc', 'Minimum viable messaging doc', 'Value proposition canvas', 'Homepage copy with variants', 'Homepage wireframe', 'Brand vs. founder guide', 'Competitive positioning audit', '1 activation asset', 'Ongoing Slack access'], cta: 'Book Stake' },
  { id: 'stronghold', name: 'Stronghold', price: '$12,000', blurb: 'Everything in Stake, plus extended coverage for teams ready to roll messaging out everywhere.',
    items: ['Everything in Stake', '3 additional pages written', 'Product, features, or use case pages', '3 activation assets', '1 year of async coaching in Slack'], cta: 'Book Stronghold' },
]
export const assets = ['Cold email sequence', 'Welcome sequence', 'Landing page copy', 'Objection scripts', '30 days of hooks', 'Ad copy kit', 'Investor messaging', 'Case study framework']
export const testimonial = {
  paras: [
    [['b', 'We loved working with Blake.'], ['', " As an early stage AI company building something new, it's surprisingly difficult to succinctly explain what you do, the problem you're solving, and the solution you've built."]],
    [['b', 'Blake really took the time to understand our product'], ['', ', what we wanted to say and who we wanted to say it to. The sessions we did were productive - and in no time at all Blake sent us the copy and positioning we\'ve been looking for.']],
    [['', 'He was on hand to make tweaks and refinements based on our feedback, right up until we went live. '], ['b', "I've already had lots of positive comments"], ['', ' and we already feel more confident sharing our product, website and story.']],
    [['b', "If you're debating whether to work with Blake, I'd say just go for it. I'm glad we did."]],
  ],
  name: 'David Dobrin', role: 'CEO, OriginalVoices', img: '/david-dobrin.jpeg',
}
export const faqH2 = "Everything you're wondering"
export const faqs = {
  Process: [
    ['How much of my time does this take?', 'Around 4-5 hours across two weeks. One 90-minute positioning workshop, a few review sessions, and async feedback on deliverables.'],
    ['Who from my team needs to be involved?', 'You and one or two people who know the product and customers well. Keep it small. Too many voices slows everything down.'],
    ['What do I need to prepare before we start?', 'A product demo, a recorded sales call, your current website, and a list of competitors. Takes around 30 minutes to gather.'],
    ['How do the workshops work?', 'Video call. I come with questions and hypotheses. We work through positioning options together. You leave with clarity.'],
    ['What if my co-founder disagrees on positioning?', "Common. The workshop is designed to surface disagreements and resolve them. By the end of week one, you'll be aligned."],
  ],
  Deliverables: [
    ['What format are the deliverables in?', 'Google Docs and Slides. Easy to share, comment on, and use.'],
    ['Do you design the homepage or write the copy?', 'I write the copy and deliver a wireframe with sections laid out. Your designer handles the visual design.'],
    ['How many rounds of revisions are included?', "One formal round. But I'm in your Slack, so small tweaks happen naturally."],
    ['What counts as an activation asset?', 'Cold email sequence, landing page, ad copy kit, objection scripts, investor messaging, case study framework, or 30 days of content hooks.'],
  ],
  Pricing: [
    ['Why is this priced as a flat fee?', "Because scope creep kills projects. You know exactly what you're paying, I know exactly what I'm delivering."],
    ["What's the difference between Stake and Stronghold?", 'Stake covers your core messaging and homepage. Stronghold adds three more pages, three activation assets, and a full year of async coaching.'],
    ['Is there a payment plan?', '50% to start, 50% on delivery. Simple.'],
    ['What if I want to upgrade to Stronghold later?', "You can. We'll credit what you paid for Stake toward Stronghold if you upgrade within 30 days."],
  ],
  Fit: [
    ['Is this right for pre-seed companies?', "Sometimes. If you have a product and customers, yes. If you're still figuring out what to build, it's too early."],
    ["What if I already have positioning but it's not working?", "That's most of my clients. We'll audit what you have, find where it breaks, and rebuild."],
    ['What if my product is highly technical?', "Good. Technical products need simple messaging more than anyone. I'll ask a lot of questions."],
    ['How do I know if I\'m a good fit?', "You have a product that works. You have customers who love it. But you can't explain it well. That's the fit."],
  ],
  After: [
    ['What happens after the two weeks?', "You have everything you need to execute. I'm in your Slack for questions. You go build."],
    ['Can I come back for a refresh later?', 'Yes. Past clients get priority and a reduced rate for refresh projects.'],
    ['Will you work with my designer or developer?', 'Happy to answer their questions or clarify intent. I want this to ship correctly.'],
  ],
}
export const finalCta = {
  h2: "In 2 weeks, you'll have what most companies spend 2 years trying to build",
  sub: 'Book a call with Blake. Fifteen minutes to find out if Boundset is a fit. No pitch or pressure.',
}
export const CAL = 'https://cal.com/heyblake/positioning'
