// Wave 4 answer pages (Oct 27, 2026). Same approved template as lib/answers.js.
// Facts only from the cited sources or plain practitioner guidance. Examples marked as illustrative. No invented stats.
const D = ['dunford'], DE = ['dunfordEx'], DC = ['dunfordConsult'], DM = ['dunfordMsg']
const PB = ['playBigger', 'playBiggerBook']
const U = '2026-10-27'
const P = ['/positioning', 'What is product positioning']
const GF = 'https://www.gofractional.com/insights/rates/product-marketing-manager'
const FP = 'https://firstpmm.com/fractional-product-marketing-pricing/'
const MH = 'https://marketerhire.com/blog/product-marketing-agency'
export const WAVE4 = [
  { slug: 'how-to-fix-a-homepage-that-doesnt-convert', title: 'How to fix a homepage that doesn’t convert', updated: U,
    answer: 'A homepage that does not convert is usually unclear, not under-designed. Buyers leave when they cannot tell what you sell, who it is for, or why it beats what they already use. Check the positioning under the page before you rewrite it. Then put the category, the customer and one outcome on the first screen.',
    sections: [
      { h: 'Fix the decision before the sentences', body: 'April Dunford separates positioning from messaging. Positioning is the input. The homepage is one place that input shows up. A redesign on an unclear story gives you a better-looking version of the same problem.', src: DE },
      { h: 'Steps', list: [
        ['Read it as a stranger', 'Cover the logo. Say what the product is, in one sentence, from the first screen only.'],
        ['Name the alternative', 'Value only means something next to what the buyer would do instead.'],
        ['Put three things first', 'The category, the customer and one outcome, before the feature list.'],
        ['Match the sales story', 'If calls re-explain the page, the page is not the pitch the team agreed.'],
        ['Test the line, then the layout', 'Use the new headline in real conversations before you pay for a redesign.']], src: DE },
      { h: 'What the symptom points to', table: { head: ['What you see', 'Fix first'], rows: [
        ['Visitors ask what you do', 'Category and a plain explanation'],
        ['They compare you to the wrong product', 'Alternatives and the market frame'],
        ['They understand it and still do not act', 'Proof next to the claim, and one next step'],
        ['Sales rewrites the page on every call', 'An agreed positioning document, then a rewrite from it']] } },
    ],
    faq: [
      { q: 'Should I start with a visual redesign?', a: 'No. Agree the positioning, rewrite the first screen from it, then design around that copy.' },
      { q: 'Can testing fix a homepage that does not convert?', a: 'Testing helps you choose between messages. It does not choose your market or your customer.' },
      { q: 'What if the positioning is already clear?', a: 'Then it is a writing problem. Lead with the outcome, cut the slogan and put proof beside the claim.' }],
    links: [P, ['/answers/why-messaging-doesnt-convert', 'Why messaging doesn’t convert'], ['/answers/homepage-messaging-audit', 'Homepage messaging audit'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/answers/website-doesnt-explain-what-we-do', 'Website doesn’t explain what we do'], ['/free-tools/headline-tester', 'Test your headline']] },

  { slug: 'website-doesnt-explain-what-we-do', title: 'Website doesn’t explain what we do', updated: U,
    answer: 'When a website does not explain what you do, visitors cannot place you in a market they know. Say the category and the customer in the first screen, in their words. A clever line that needs a paragraph under it is not an explanation. Decide that sentence in positioning, then publish it.',
    sections: [
      { h: 'Why the clever line fails', body: 'Dunford’s point on market frame is simple. When you name the market, buyers place you and make assumptions about competitors, features and price. If the frame is missing, they have nothing to place, so the rest of the page does not land.', src: DE },
      { h: 'Steps', list: [
        ['Say the category out loud', 'A noun a buyer already uses, plus a qualifier if you need one.'],
        ['Name who it is for', 'The best-fit customer, not everyone who might someday care.'],
        ['Add one outcome', 'What they can now do, or what they stop doing.'],
        ['Cut the warmup', 'The explanation belongs in the first screen, not under the fold.'],
        ['Use their words', 'If a customer would not say it, it is not an explanation yet.']], src: DE },
      { h: 'First screen', table: { head: ['A visitor should know', 'A line that fails', 'A line that explains'], rows: [
        ['What it is', 'A new way to work', 'Billing software for small accounting firms'],
        ['Who it is for', 'Teams of the future', 'Owners who still send invoices by email'],
        ['Why it matters', 'Built different', 'Invoices go out the day the work is done']] } },
    ],
    faq: [
      { q: 'Is a tagline an explanation?', a: 'No. A tagline can sit beside an explanation. It cannot replace the category and the customer.' },
      { q: 'What if we are creating a new category?', a: 'You still owe the visitor a plain description of the job. A new name with no familiar frame is not an explanation.' },
      { q: 'Where else does this sentence go?', a: 'The homepage, the sales opener and the one-liner should share it. If they differ, you do not have one explanation yet.' }],
    links: [P, ['/answers/how-to-choose-a-market-category', 'How to choose a market category'], ['/answers/what-is-a-one-liner', 'What is a one-liner'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/answers/signs-your-positioning-is-wrong', 'Signs your positioning is wrong'], ['/free-tools/headline-tester', 'Test your headline'], ['/answers/how-to-explain-a-technical-product', 'How to explain a technical product']] },

  { slug: 'homepage-messaging-audit', title: 'Homepage messaging audit', updated: U,
    answer: 'A homepage messaging audit checks the page against your positioning, not against taste. Read only the first screen and ask what you sell, who it is for, and why a buyer would switch. If a stranger cannot answer, the gap is a decision, not a sentence. Fix that decision, then rewrite the lines that depend on it.',
    sections: [
      { h: 'What you need before you start', body: 'You need the positioning written down: alternatives, unique attributes, value, best-fit customer and category. Dunford treats that document as the input to messaging. Without it, the audit becomes a debate about wording.', src: DE },
      { h: 'Steps', list: [
        ['Read only the first screen', 'Ignore the rest until this part stands alone.'],
        ['Ask three questions', 'What is it, who is it for, and why switch from the real alternative.'],
        ['Mark each claim', 'Category, customer, value, proof, or decoration. Decoration goes.'],
        ['Compare with sales', 'Note every line a rep has to unsay on a call.'],
        ['Rewrite from the gaps', 'One missing decision at a time, then the lines that depend on it.']], src: DE },
      { h: 'Audit checks', table: { head: ['Check', 'Pass', 'Fail'], rows: [
        ['Category', 'A buyer can name the market', 'They need the next paragraph'],
        ['Customer', 'The right reader sees themselves', 'It could be for anyone'],
        ['Alternative', 'The line beats a real option', 'Faster, with no than what'],
        ['Proof', 'A claim has evidence beside it', 'Adjectives stand alone'],
        ['Next step', 'One action is obvious', 'Several competing buttons']] } },
    ],
    faq: [
      { q: 'How long should an audit take?', a: 'A first pass is one sitting if the positioning is written down. If it is not, stop and make those decisions first.' },
      { q: 'Should I score the page with a number?', a: 'A number hides which decision is missing. Keep the checklist and fix the failed rows.' },
      { q: 'Who should do the reading?', a: 'Someone who did not write the page, plus one person who matches the best-fit customer if you can get them.' }],
    links: [P, ['/answers/how-to-fix-a-homepage-that-doesnt-convert', 'How to fix a homepage that doesn’t convert'], ['/answers/why-messaging-doesnt-convert', 'Why messaging doesn’t convert'], ['/answers/how-to-test-positioning', 'How to test positioning'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/free-tools/headline-tester', 'Test your headline']] },

  { slug: 'messaging-matrix-template', title: 'Messaging matrix template', updated: U,
    answer: 'A messaging matrix is a grid of approved lines by audience. Each row is a buyer. The columns hold the one-liner, the value, the proof and the objection you answer. Fill every cell from your positioning, not from a blank page. A teammate should be able to paste any cell into a page, a deck or a call.',
    sections: [
      { h: 'Where it sits', body: 'Dunford’s messaging document references the positioning and goes a level deeper, with value statements for different buyers and boilerplate for sales and marketing. A matrix is one layout for that. It is not a substitute for the positioning decisions.', src: [...DE, ...DM] },
      { h: 'Illustrative matrix', table: { head: ['Audience', 'One-liner', 'Value', 'Proof', 'Objection'], rows: [
        ['Firm owner', 'Billing software that sends the invoice the day the work is done', 'You stop chasing invoices at night', 'A before-and-after of days to get paid', 'We already have a spreadsheet'],
        ['Staff accountant', 'The same, said as less retyping', 'Client emails become a draft invoice', 'A two-minute workflow, shown', 'It will not match how we work'],
        ['Buyer at a larger firm', 'Billing for firms that have outgrown email', 'One place for every client invoice', 'A security note and a data export', 'We will have to rip out our suite']] } },
      { h: 'How to fill it', list: [
        ['Start from positioning', 'Alternatives, value, best-fit customer and category are already decided.'],
        ['One row per buyer who hears a different story', 'Usually the user and the person who pays, if those are different people.'],
        ['Write lines you can paste', 'If a cell needs a paragraph, it is not ready.'],
        ['Attach proof you can show', 'A quote, a number from your own product, a screenshot. No borrowed claims.'],
        ['Retire old lines', 'A matrix nobody opens does not stop the drift.']], src: DE },
    ],
    faq: [
      { q: 'Is a messaging matrix the same as a message house?', a: 'No. A message house is one core message with pillars. A matrix repeats the story by audience. Many teams use both.' },
      { q: 'How many rows should it have?', a: 'As many buyers as actually hear a different message. Two or three is common. More than that is usually a sign the customer is not chosen yet.' },
      { q: 'Can I put the matrix on the website?', a: 'No. It is an internal source. Pages, decks and calls are written from the cells.' }],
    links: [P, ['/answers/what-is-a-messaging-framework', 'What is a messaging framework'], ['/answers/message-house-template', 'Message house template'], ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/templates/messaging-document', 'Messaging document template'], ['/free-tools/messaging-hierarchy-builder', 'Build your message house']] },

  { slug: 'value-proposition-for-developer-tools', title: 'Value proposition for developer tools', updated: U,
    answer: 'A value proposition for a developer tool names the outcome one team gets, set against building it, a free library or the platform default. Say the job and the cost you remove. Leave the stack brag and the adjective out. The line has to match something a developer can try.',
    sections: [
      { h: 'Positioning first, then the line', body: 'The value proposition is one message. Positioning chooses the alternative, the customer and the category it depends on. Dunford’s sequence puts value after unique attributes: customers care what those attributes let them do, not the feature list. Write the line after that work. The page on positioning for developer tools covers the alternatives.', src: DE },
      { h: 'Steps', list: [
        ['Name one team', 'A stack and a job, not developers in general.'],
        ['Name what they do today', 'Build it, use a free library, or live with the default.'],
        ['State the outcome', 'Time returned, incidents avoided, or a job they stop owning.'],
        ['Separate user and buyer', 'The developer adopts it. A lead often pays. Each gets a line.'],
        ['Attach proof they can check', 'Docs, a quickstart, or a number from your own product.']], src: DE },
      { h: 'Weak and strong lines', table: { head: ['Weak', 'Strong', 'Why'], rows: [
        ['The modern developer platform', 'Stop maintaining the admin tool your team rebuilds every quarter', 'A job and a cost, not a label'],
        ['Blazing fast APIs', 'Queries that finish while the support call is still open', 'Speed tied to a moment they know'],
        ['Built for developers', 'A CLI your platform team can ship without waiting on us', 'Says who and what they can do'],
        ['AI-powered workflows', 'The on-call engineer gets the diff, not a dashboard', 'The outcome, not the technique']] } },
    ],
    faq: [
      { q: 'Should the value proposition mention the architecture?', a: 'Only when the architecture is the reason the outcome is true, and the reader is the person who cares.' },
      { q: 'Is the value proposition the homepage headline?', a: 'Often a shorter version of it. The headline still has to stand alone in a few seconds.' },
      { q: 'What if the developer and the buyer want different things?', a: 'Write two lines from the same positioning. Do not average them into one vague sentence.' }],
    links: [P, ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/answers/what-is-a-one-liner', 'What is a one-liner'], ['/free-tools/value-prop-scorer', 'Score your value proposition'], ['/answers/positioning-for-api-products', 'Positioning for API products']] },

  { slug: 'do-you-need-a-positioning-consultant-after-seed', title: 'Do you need a positioning consultant after seed', updated: U,
    answer: 'You do not need a positioning consultant just because you raised a seed round. You need one when the team cannot agree, or when the founder is too close to see the real alternative. After seed you usually have customers. Their deals are the evidence. Use it yourself if you can make the tradeoffs.',
    sections: [
      { h: 'What the round does not change', body: 'Dunford’s exercise says customers who fit your product understand the value, buy faster and ask for fewer discounts. That is the point of focusing a small budget. A seed round does not create that focus. The deals you already have do. Her workshop page frames outside help as the move for a team that cannot agree on why customers choose you.', src: [...DE, ...DC] },
      { h: 'Steps', list: [
        ['List the customers who bought fast', 'They are the positioning data a seed company actually has.'],
        ['Write the alternative they replaced', 'A tool, a spreadsheet, a hire, or doing nothing.'],
        ['See if the founders agree', 'If the story changes by who is in the room, you are stuck.'],
        ['Choose the kind of help', 'A facilitator for the decision, a fixed sprint if you also need copy, a fractional marketer only if the story is already settled.'],
        ['Leave with it in writing', 'A dated document the next hire can use.']], src: DE },
      { h: 'Which kind of help', table: { head: ['Situation after seed', 'A fit', 'A poor fit'], rows: [
        ['Founders disagree on the story', 'A positioning consultant or a sprint', 'A brand agency or a campaign'],
        ['The story is clear and the site is not', 'A sprint that includes copy, or a rewrite from the doc', 'Another round of strategy slides'],
        ['You ship every month and sales needs materials', 'A fractional product marketer', 'A one-off workshop with no owner after'],
        ['You have no customers yet', 'More customer conversations', 'A positioning engagement with nothing to learn from']] } },
    ],
    faq: [
      { q: 'Is seed too early for positioning?', a: 'Not if customers are using the product. Before that, the work is a guess.' },
      { q: 'Should we wait until Series A?', a: 'Wait if you have no deals to learn from. Do not wait if the homepage and the pitch already disagree.' },
      { q: 'Do we have to hire someone?', a: 'No. A team that can gather the deal evidence and agree on the tradeoffs can run the process itself.' }],
    links: [P, ['/answers/positioning-for-seed-stage-startups', 'Positioning for seed stage startups'], ['/answers/when-should-a-startup-do-positioning', 'When should a startup do positioning'], ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup'], ['/answers/how-to-hire-a-positioning-consultant', 'How to hire a positioning consultant'], ['/answers/positioning-for-series-a', 'Positioning for Series A startups'], ['/answers/what-is-product-marketing-at-a-startup', 'What is product marketing at a startup']] },

  { slug: 'fractional-product-marketing-cost', title: 'Fractional product marketing cost', updated: U,
    answer: 'Fractional product marketing is priced by the month or the day, and published rates depend on hours and seniority. Go Fractional’s October 2026 benchmark puts the average product marketing manager rate at $145 an hour, with the middle half from $110 to $180. One senior practitioner lists €960 a day. Compare the hours, not only the fee.',
    sections: [
      { h: 'What the published pages actually say', body: 'These are other people’s published figures, not a Boundset survey. [Go Fractional](' + GF + ') says that on 27 October 2026 its product marketing manager benchmark averaged $145 an hour, with a median of $125 and a middle half from $110 to $180, from 4 job posts and 100 candidate profiles over 90 days. The same page estimates $5,700 to $9,300 a month, about $7,500 at the average rate, using 13 hours a week. It says those hours are a typical fractional scope across roles, not a product-marketing-specific figure yet. [First PMM](' + FP + ') publishes its own rate, not a market average: €960 a day ($1,060), about €8,300 a month ($9,200) at two days a week and about €12,500 ($13,800) at three, excluding VAT, with scoped projects from €7,500 ($8,300). It also says senior B2B SaaS product marketing is often about €900 to €1,200 a day ($1,000 to $1,350). [MarketerHire](' + MH + ') states a fractional product marketer range of $5,000 to $15,000 a month, and $100 to $200 an hour for an independent freelancer.', src: ['goFractionalPmm', 'firstPmm', 'marketerHire'] },
      { h: 'Published figures', table: { head: ['Source', 'Figure they publish', 'What it is'], rows: [
        ['[Go Fractional](' + GF + ')', '$145/hr average; $110 to $180 middle half', 'Benchmark, 27 Oct 2026. Thin job-post sample.'],
        ['[Go Fractional](' + GF + ')', '$5,700 to $9,300 a month', 'Their estimate at 13 hrs/week. Hours are not PMM-specific yet.'],
        ['[First PMM](' + FP + ')', '€960/day ($1,060); from €7,500 a project', 'That practitioner’s own prices, ex VAT.'],
        ['[MarketerHire](' + MH + ')', '$5,000 to $15,000 a month', 'Their stated range for a fractional PMM.']] } },
      { h: 'What changes the number', list: [
        ['Hours', 'A day a week and three days a week are different jobs. Ask for the hours before you compare fees.'],
        ['Scope', 'Positioning, launches and sales materials are not the same month of work.'],
        ['Who does it', 'A named senior person and a rotating bench should not be priced as the same thing.'],
        ['Length', 'A monthly retainer that runs for months is not a two-week project fee.']], src: ['firstPmm'] },
      { h: 'A sprint is a different purchase', body: 'A positioning sprint is a fixed scope and a fixed fee, then it ends. Boundset publishes Stake at $7,500 and Stronghold at $12,000 for a two-week sprint. Those are one-time fees, not monthly retainers. The [positioning sprint cost](/positioning-sprint-cost) page lists them next to other published sprint prices. Hire a fractional product marketer when you need product marketing every month. Use a sprint when the story itself is the problem.', src: DE },
    ],
    faq: [
      { q: 'Is a fractional product marketer cheaper than a full-time hire?', a: 'The monthly fee is for part of a week, not for a discounted full-time role. Compare hours and scope. This page does not estimate salaries.' },
      { q: 'Why do quotes differ so much?', a: 'Hours, seniority and whether the month is strategy, launches or sales materials. A day rate with no hour count is not comparable to a retainer.' },
      { q: 'Should a seed startup start with a fractional product marketer?', a: 'If the story still changes every week, settle positioning first. A fractional marketer is a better fit once there is ongoing work to own.' }],
    links: [P, ['/positioning-sprint-cost', 'Positioning sprint cost'], ['/positioning-agency-vs-fractional-pmm', 'Positioning agency vs fractional PMM'], ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup'], ['/answers/how-to-hire-a-positioning-consultant', 'How to hire a positioning consultant'], ['/answers/positioning-for-series-a', 'Positioning for Series A startups'], ['/answers/what-is-product-marketing-at-a-startup', 'What is product marketing at a startup']] },

  { slug: 'brand-agency-vs-positioning-consultant', title: 'Brand agency vs positioning consultant', updated: U,
    answer: 'A brand agency builds the identity buyers see: the name, the design, the voice and the site. A positioning consultant decides the market, the customer and why you win, and writes that decision down. Hire a consultant when buyers cannot tell what you do. Hire an agency when that choice is made and you need it designed. Positioning comes first.',
    sections: [
      { h: 'They do different jobs', body: 'Dunford is blunt that positioning is not messaging. The positioning work is an input. Messaging, and the brand that carries it, come after. A market frame also sets what buyers assume about competitors, features and price. Design cannot choose that frame for you.', src: DE },
      { h: 'Steps', list: [
        ['Name the problem', 'Buyers do not understand you, or the story is set and looks unfinished.'],
        ['See if the decision exists', 'If the founders tell different stories, you do not have a brief yet.'],
        ['Buy the decision first', 'A consultant or a sprint, with the result in writing.'],
        ['Then buy production', 'An agency can design and build from a settled brief.'],
        ['Keep one story', 'The identity, the homepage and the sales pitch should use the same positioning.']], src: DE },
      { h: 'Side by side', table: { head: ['Question', 'Positioning consultant', 'Brand agency'], rows: [
        ['Decides', 'Market, alternatives, value, customer, category', 'Name, visual identity, voice, production'],
        ['You leave with', 'A written positioning decision and messaging direction', 'A brand system and, often, a designed site'],
        ['Hire when', 'The story is unclear or the team disagrees', 'The story is set and needs to be made'],
        ['Watch for', 'A decision nobody turns into pages', 'Design that has to be redone when the story changes']] } },
    ],
    faq: [
      { q: 'Can an agency do the positioning too?', a: 'Some will. Ask who makes the market decision, and whether design waits until that decision is signed off.' },
      { q: 'Is a rebrand a substitute for positioning?', a: 'No. A new look on the same unclear story leaves the same problem.' },
      { q: 'What if we need both?', a: 'Do positioning first, then hand the agency a written brief. The design work goes faster and is less likely to be thrown out.' }],
    links: [P, ['/answers/positioning-vs-branding', 'Positioning vs branding'], ['/compare/positioning-consultant-vs-agency', 'Positioning consultant vs agency'], ['/positioning-agency-vs-fractional-pmm', 'Positioning agency vs fractional PMM'], ['/answers/how-to-roll-out-new-positioning', 'How to roll out new positioning'], ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup']] },

  { slug: 'what-is-category-design', title: 'What is category design', updated: U,
    answer: 'Category design creates and names a new market, then teaches buyers to want it. It is not competing for share in a market that already exists. Play Bigger describes it as designing the category, the product and the company together. It is a harder bet than positioning in a frame buyers already know.',
    sections: [
      { h: 'The definition', body: 'Play Bigger calls category design the discipline of creating, naming and dominating new markets. The work starts with a problem buyers do not already have a budget line for, then a category name, a point of view and a company lined up behind that problem. Their book, by Al Ramadan, Dave Peterson, Christopher Lochhead and Kevin Maney, makes the same case: winning by designing the market, not only by beating rivals inside one. Their site also says that in the dominate phase a category king controls roughly 76% of the category’s economics. That figure is their claim.', src: PB },
      { h: 'How it differs from positioning', body: 'Positioning chooses the frame that makes your value obvious. One option is a new category. Dunford calls creating a new market category the most difficult style of positioning, because you have to teach buyers the frame before the value can land. The other styles use a market they already understand, head to head or as a slice you can own.', src: DE },
      { h: 'Category design and ordinary positioning', table: { head: ['Question', 'Category design', 'Positioning in a known market'], rows: [
        ['The bet', 'Buyers will learn a new market', 'Buyers already have a place to put you'],
        ['The cost', 'Years of teaching the problem', 'A clearer claim inside a frame they know'],
        ['The failure mode', 'A name nobody searches for', 'Looking like every other vendor in the category'],
        ['A startup default', 'Rarely', 'Usually']] } },
    ],
    faq: [
      { q: 'Should a seed startup design a category?', a: 'Usually no. You would be spending scarce time teaching a market before you can sell. Start in a frame buyers already understand.' },
      { q: 'Is a subcategory the same thing?', a: 'No. A subcategory borrows a known market and adds a qualifier. Category design aims to create the market.' },
      { q: 'Is category design the same as positioning?', a: 'Positioning is the choice of frame. Category design is one style of that choice, and the hardest one.' }],
    links: [P, ['/answers/how-to-choose-a-market-category', 'How to choose a market category'], ['/answers/positioning-for-ai-startups', 'Positioning for AI startups'], ['/answers/how-to-reposition-a-product', 'How to reposition a product'], ['/answers/how-to-differentiate-when-competitors-copy-you', 'How to differentiate when competitors copy you'], ['/free-tools/category-picker', 'Pick your market category']] },

  { slug: 'how-to-hire-a-positioning-consultant', title: 'How to hire a positioning consultant', updated: U,
    answer: 'Hire a positioning consultant to make the decision, not to invent a tagline. Ask how they find the real alternatives, the value, the best-fit customer and the category, and what you will hold in writing when they leave. The test is whether they can run that process with your founders and get them to agree.',
    sections: [
      { h: 'What you are buying', body: 'You are buying a process that ends in an agreed position. Dunford’s workshop page describes the work as aligning a team that cannot agree on why customers choose you, then turning that into a sales story. If a proposal skips the alternatives and jumps to headlines, it is a copy project.', src: DC },
      { h: 'Steps', list: [
        ['Write the problem', 'Disagreement, a homepage nobody understands, or a pitch that changes by rep.'],
        ['Ask for the process', 'Alternatives, unique attributes, value, best-fit customer, category, in that kind of order.'],
        ['Ask who does the work', 'The person who sells it should be in the room.'],
        ['Ask for the file you keep', 'A dated positioning document, then messaging. Not only a slide.'],
        ['Talk to them yourself', 'A founder has to live with the decision. Do not delegate the first conversation.'],
        ['Compare like with like', 'A workshop, a fixed sprint and a monthly retainer are different purchases.']], src: [...D, ...DC] },
      { h: 'Questions that matter', table: { head: ['Ask', 'A useful answer'], rows: [
        ['What will we hold at the end?', 'A written position and the messaging that follows'],
        ['What do you need from us?', 'Customers, won and lost deals, and the decision makers in the room'],
        ['What do you do if we disagree?', 'A way to choose, with a deadline'],
        ['What happens after the last day?', 'You own the document, and you know who uses it']] }, src: DE },
      { h: 'Price is a scope question', body: 'Published prices are not interchangeable. April Dunford lists workshop prices by company size on her [consultant page](https://www.aprildunford.com/consultant). Sprint prices, including Boundset’s, are on the [positioning sprint cost](/positioning-sprint-cost) page. Monthly fractional rates are on the [fractional product marketing cost](/answers/fractional-product-marketing-cost) page, with links to each source. Compare the file you leave with, and the hours your team will spend.', src: DC },
    ],
    faq: [
      { q: 'Can we do this ourselves?', a: 'Yes, if you can gather the deal evidence and the founders can agree. Outside help is for the tie, or for a deadline.' },
      { q: 'How is this different from a fractional product marketer?', a: 'A consultant or a sprint settles the decision and stops. A fractional product marketer stays for launches and sales materials month after month.' },
      { q: 'What should I refuse?', a: 'A proposal that starts with a tagline, a new logo, or a category name, before anyone has listed what buyers do today.' }],
    links: [P, ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup'], ['/answers/do-you-need-a-positioning-consultant-after-seed', 'Do you need a positioning consultant after seed'], ['/answers/positioning-workshop-agenda', 'Positioning workshop agenda'], ['/compare/diy-positioning-vs-consultant', 'DIY positioning vs hiring a consultant'], ['/positioning-sprint-cost', 'Positioning sprint cost'], ['/april-dunford-alternatives', 'April Dunford alternatives']] },
]
