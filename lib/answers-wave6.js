// Wave 6 answer pages (Oct 29, 2026). Same approved template as lib/answers.js.
// Facts only from the cited sources or plain practitioner guidance. Examples marked as illustrative. No invented stats.
const DE = ['dunfordEx'], DF = ['dunfordFrame'], DQ = ['dunfordQuick'], DS = ['dunfordStory'], MT = ['momTest']
const U = '2026-10-29'
const P = ['/positioning', 'What is product positioning']
export const WAVE6 = [
  { slug: 'positioning-for-plg-products', title: 'Positioning for product-led products', updated: U,
    meta: 'Position a product-led product for the person who tries it, against what they would use if that trial did not exist.',
    answer: 'Position a product-led product for the person who tries it before a sales call. Blake Bartlett says OpenView coined product-led growth in 2016: a go-to-market strategy where the product itself drives acquisition, conversion and expansion. The trial is how they learn. Positioning still has to name the alternative, the job and who cares.',
    sections: [
      { h: 'The product is the way in, not the position', body: 'In a 2023 interview, Bartlett states that definition and contrasts it with a motion where people on the sales and marketing team are the primary driver. He says a conversation with a rep is not required to start, and that sales can still exist. It is optional. It is not the thing the product depends on. When a company later adds sales, he describes it as help for a journey the user already started in the product. None of that chooses your market, your alternative or your value. Those are still positioning decisions.', src: ['bartlettPlg'] },
      { h: 'The trial is where the alternative shows up', body: 'April Dunford starts with what the buyer would do if you did not exist. In a product-led motion, that comparison happens during the trial, often with no one from your company in the room. Her framing post says startups often lead with features or technology before a prospect knows what the product is. A signup that skips the job, the customer and the difference leaves them to guess the frame, then leave.', src: [...DE, ...DF] },
      { h: 'Steps', list: [
        ['Name who tries it', 'The person who can start without a call. A team, a role, a job. Not “users”.'],
        ['Name what they would do instead', 'A spreadsheet, a build, a suite they already pay for, or nothing.'],
        ['Say the job in the first screen', 'The trial confirms the sentence. It should not have to invent it.'],
        ['Separate the user and the buyer', 'The person who tries it and the person who pays may need two lines from the same position.'],
        ['Test it in the product', 'Can a new user repeat the value after one session, in your words?']], src: DE },
      { h: 'What the first screen owes them', table: { head: ['Who', 'What they need before they click', 'A line that fails'], rows: [
        ['Person who will try it', 'The job, and what they do today', 'Start free. No clue what it is'],
        ['Person who may pay later', 'Why this is worth a budget', 'A usage chart with no outcome'],
        ['Teammate they invite', 'What changes for that teammate', 'Invite your team, with no job attached']] } },
    ],
    faq: [
      { q: 'Is product-led growth the same as having no sales team?', a: 'No. Bartlett’s point is that a sales conversation is not required to start. Sales can still help a buyer who began in the product.' },
      { q: 'Should the homepage say there is no sales call?', a: 'Only if that is why your best-fit buyer picks you. The sentence they need first is what it is and who it is for.' },
      { q: 'Does a free trial replace positioning?', a: 'No. The trial is where a stranger tests the position. If the position is missing, the trial teaches them nothing you can repeat.' }],
    links: [P, ['/answers/positioning-for-seed-stage-startups', 'Positioning for seed stage startups'], ['/answers/how-to-test-positioning', 'How to test positioning'], ['/answers/pricing-page-messaging', 'Pricing page messaging'], ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/positioning-when-moving-upmarket', 'Positioning when moving upmarket']] },

  { slug: 'positioning-for-marketplaces', title: 'Positioning for marketplaces', updated: U,
    meta: 'Position a marketplace for both sides. Name what each side does today, and what they could not do before you.',
    answer: 'Position a marketplace for both sides of the market, not for a single user. Bill Gurley writes that a true marketplace needs natural pull from consumers and from suppliers, and that gathering suppliers is not enough on its own. Say what each side does today, and what they can do with you that they could not do before.',
    sections: [
      { h: 'One side is not a marketplace', body: 'Gurley’s 2012 essay says a true marketplace needs natural pull on both the consumer side and the supplier side. Aggregating suppliers is necessary and not sufficient. Demand has to show up too. He also says a strong marketplace does more than list the market. It makes an experience that was not possible before. His example is OpenTable: a diner searches reservation availability across many restaurants in seconds, instead of phoning them one by one. The position is that difference, for each side.', src: ['gurleyMkt'] },
      { h: 'Steps', list: [
        ['Name the two sides', 'Who asks, and who fulfills. Use their words for themselves.'],
        ['Write what each side does today', 'The phone call, the spreadsheet, the broker, the group chat.'],
        ['Write the experience they could not get', 'One concrete thing the old way could not do.'],
        ['Give each side its own line', 'Same marketplace. A homepage that speaks only to one side hides the other.'],
        ['Say which side you are winning first', 'From real supply and real demand, not from the slide that hopes both arrive together.']] },
      { h: 'A line for each side', body: 'Fictional. Acme Bench is not a client. It imagines a marketplace where small firms book bookkeepers. The rows are the kind of line each side needs. They are not a result.', table: { head: ['Side', 'What they do today', 'Line'], rows: [
        ['Firm owner', 'Asks in a group chat and waits', 'See who can close the books this month, with a time they have already opened'],
        ['Bookkeeper', 'Finds work by referral', 'Firms that need your month-end, without another intro call'],
        ['Either, if you blend them', 'Neither knows if this is for them', 'The marketplace for modern finance']] } },
    ],
    faq: [
      { q: 'Can the homepage speak to only one side?', a: 'It can lead with the side you are winning. The other side still needs a line, or they will not recognize themselves.' },
      { q: 'Is “we have network effects” a position?', a: 'No. Gurley’s test is pull on both sides, and an experience the old way could not offer. A label does not show either.' },
      { q: 'What if we only have supply so far?', a: 'Say so in the positioning document. A page that pretends both sides are here is a claim your first customers can check.' }],
    links: [P, ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/what-is-a-best-fit-customer', 'What is a best-fit customer'], ['/answers/positioning-for-fintech-startups', 'Positioning for fintech startups'], ['/answers/how-to-choose-a-market-category', 'How to choose a market category']] },

  { slug: 'positioning-for-open-source-companies', title: 'Positioning for open source companies', updated: U,
    meta: 'Position an open source company by separating the free project from the offer a customer pays for.',
    answer: 'Position an open source company by separating the free project from what a customer pays for. Peter Levine and Jennifer Li describe three stages that have to stay true together: developers who contribute, users who adopt the project, and a paid offer those users want. The page has to tell a visitor which of the three they are looking at.',
    sections: [
      { h: 'The project and the paid product are different offers', body: 'Levine and Li, writing for Andreessen Horowitz in 2019, describe three pillars that begin as stages. Project-community fit is developers who contribute. Product-market fit is people who adopt the project. Value-market fit is a paid offer those users want. They call the open source project a developer-driven way in, and the business the work of connecting that arrival to a commercial product. The free project is also a competitive alternative to your paid product. Dunford’s first step still applies: say what someone would do if the paid offer did not exist. Often the answer is your own project.', src: ['levineOss', ...DE] },
      { h: 'The line between free and paid has to be sayable', body: 'On an open-core model, Levine and Li warn that the community can turn on you when it is unclear which features stay in the project and which move into the paid product. The pitfall they name is a fork. Write the line in the positioning document before you write the homepage. A developer should be able to repeat what stays free, and a buyer should be able to repeat what they are paying for.', src: ['levineOss'] },
      { h: 'Steps', list: [
        ['Say what the project is', 'One sentence a developer can check against the repo.'],
        ['Say what the paid offer adds', 'Hosting, support, a control, a workflow. Something the project does not do.'],
        ['Name who pays', 'The person with the organizational problem, not every GitHub star.'],
        ['Name the other alternatives', 'Build it, a rival project, or a vendor that is not open source.'],
        ['Keep the two lines apart', 'The README and the pricing page should not tell different stories about the boundary.']], src: ['levineOss', ...DE] },
      { h: 'Who the line is for', table: { head: ['Reader', 'What they need', 'What fails'], rows: [
        ['Contributor or user', 'What the project does, and that they can run it', 'A pricing page where the repo should be'],
        ['Person who pays', 'The job the project leaves them to staff', '“Enterprise features” with no job'],
        ['Someone choosing a vendor', 'Why you, not the other project or a closed product', 'A list of GitHub stars']] } },
    ],
    faq: [
      { q: 'Should the homepage lead with the license?', a: 'Lead with the job. The license answers a question developers will ask. It does not say why a buyer pays.' },
      { q: 'Is the community the customer?', a: 'The community is how the project spreads, in Levine and Li’s account. The customer is whoever pays for the offer the project does not include.' },
      { q: 'What if we have not decided what is paid?', a: 'Then the homepage cannot say it. Decide the boundary, write it down, and expect the project’s users to read it.' }],
    links: [P, ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/how-to-differentiate-when-competitors-copy-you', 'How to differentiate when competitors copy you'], ['/answers/how-to-position-an-ai-product', 'How to position an AI product'], ['/answers/positioning-for-api-products', 'Positioning for API products'], ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives']] },

  { slug: 'positioning-for-api-products', title: 'Positioning for API products', updated: U,
    meta: 'Position an API product for the developer who tries the call, and for the person who approves the spend.',
    answer: 'Position an API product for the developer who will try the call, and for the person who approves the spend. The alternative is code they would write, a library, or a platform they already run. Twilio’s account of its own developer focus treats documentation as how that developer understands the product, before any pitch.',
    sections: [
      { h: 'The developer checks the product before the story', body: 'Twilio’s documentation team describes the company as built by developers, for developers, around APIs, and says documentation is critical when someone integrates an API. They point to reference pages and code a developer can run. That is a public picture of the buyer, not a template and not a result. Your version of the same test is local: can a developer tell what the call does, and what they would have built instead, from the docs and the first screen?', src: ['twilioDocs'] },
      { h: 'The alternative is often their own code', body: 'For a developer tool, Dunford’s alternatives step usually lands on building it, a free library, or the platform they already have. An API is the same shape. “API” is not a category a buyer budgets for until you name the job. The person who merges the code and the person who signs the invoice may need two lines. Both lines come from one position.', src: DE },
      { h: 'Steps', list: [
        ['Name the call', 'One job: send the message, move the record, check the identity.'],
        ['Name what they do without you', 'Their own code, a library, or a feature of a platform they run.'],
        ['Write the outcome', 'What the team stops staffing, in their words.'],
        ['Put something they can run beside it', 'A request, a response, a limit. Docs are part of the explanation.'],
        ['Write the buyer’s line', 'Cost, risk, or the work that leaves the team. Not a second product.']], src: [...DE, 'twilioDocs'] },
      { h: 'Illustrative lines', body: 'Fictional. Acme Ledger is not a client. It imagines an API that posts a payout to the ledger a finance team already keeps. Use a limit, a price or a guarantee only when it is true.', table: { head: ['Reader', 'Line'], rows: [
        ['Engineer', 'One call posts the payout. You stop writing the retry.'],
        ['Finance lead', 'The payout hits the same ledger you close the month on.'],
        ['Either, if you only say the protocol', 'A modern REST API for the programmable economy']] } },
    ],
    faq: [
      { q: 'Should the homepage show a code sample?', a: 'Often, yes. A short request can explain the job faster than a sentence, for the person who will try it.' },
      { q: 'Is “API-first” a category?', a: 'Only if your buyers shop that way. Most are replacing code, a library or a platform feature.' },
      { q: 'Who is the best-fit customer?', a: 'A team with the job and the stack, not developers in general. The developer-tools page on this site is the same cut.' }],
    links: [P, ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/value-proposition-for-developer-tools', 'Value proposition for developer tools'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/answers/how-to-explain-a-technical-product', 'How to explain a technical product'], ['/answers/positioning-for-ai-startups', 'Positioning for AI startups']] },

  { slug: 'how-to-explain-a-technical-product', title: 'How to explain a technical product', updated: U,
    meta: 'Explain a technical product in the buyer’s words for the job, then give a checker something they can verify.',
    answer: 'Explain a technical product by naming the job in the buyer’s words, then giving the person who will check you something they can verify. April Dunford’s framing point is that features and technology, offered before a frame, leave a prospect guessing what you are. Learn the words from their past work, which is the rule in The Mom Test.',
    sections: [
      { h: 'The frame comes before the mechanism', body: 'Dunford describes framing as the context that lets a prospect see what you are and why it matters. She writes that startups often skip it and open on features or technology, so the prospect guesses, or guesses wrong. The architecture can be the reason the outcome is true. It is a poor opening for someone who does not yet know the job.', src: DF },
      { h: 'Use their words for a week they already had', body: 'Rob Fitzpatrick’s The Mom Test puts the interview rules in one place: talk about their life rather than your idea, ask about specifics in the past rather than opinions about the future, and listen more than you talk. The explanation should reuse a phrase they used about last week’s work. A phrase you coined in the office is not yet an explanation. The [customer interview](/answers/how-to-interview-customers-for-positioning) page covers how to ask.', src: MT },
      { h: 'Steps', list: [
        ['Name the category and the customer', 'What it is, and who it is for, before any component.'],
        ['Use one phrase from their work', 'A step they did last week, in their words.'],
        ['One outcome', 'What they can now do, or what they stop doing.'],
        ['Then the mechanism', 'For the reader who will check you. After the frame, not instead of it.'],
        ['Put proof they can open', 'A sample, a request, a diagram, a doc. Next to the claim.']], src: [...DF, ...MT] },
      { h: 'What to move down', table: { head: ['If you lead with', 'A stranger can say', 'Move it'], rows: [
        ['The architecture', 'Nothing about the job yet', 'Behind the outcome'],
        ['A new category name', 'A word they cannot place', 'After a familiar frame'],
        ['The job in their words', 'What it is and who it is for', 'Leave it first'],
        ['A sample they can run', 'Whether the claim is checkable', 'Beside the outcome, not above it']] } },
    ],
    faq: [
      { q: 'How technical should the page be?', a: 'As technical as the reader who has to trust it. Precise terms, after the job is clear. Skip adjectives.' },
      { q: 'What if the buyer is not technical and the user is?', a: 'Two lines, one position. The buyer hears the outcome. The user hears how they would check it.' },
      { q: 'Can a diagram replace the sentence?', a: 'A diagram can carry the mechanism. The first sentence still has to say what it is and who it is for.' }],
    links: [P, ['/answers/website-doesnt-explain-what-we-do', 'Website doesn’t explain what we do'], ['/answers/what-is-a-one-liner', 'What is a one-liner'], ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/how-to-interview-customers-for-positioning', 'How to interview customers for positioning'], ['/answers/positioning-for-api-products', 'Positioning for API products'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline']] },

  { slug: 'strategic-narrative-vs-positioning', title: 'Strategic narrative vs positioning', updated: U,
    meta: 'A strategic narrative is the sales story. Positioning is the set of decisions that story has to be true to.',
    answer: 'A strategic narrative is the sales story. Positioning is the set of decisions that story has to be true to. April Dunford writes that a storytelling structure assumes you already know the customer, the competitors and the differentiated value, and that a story written before that work can sound strong and still be wrong.',
    sections: [
      { h: 'The story needs the positioning as an input', body: 'Dunford’s essay on storytelling and positioning says the two are easy to confuse and are not the same. She likes structured storytelling. She also writes that those structures assume a tight customer, differentiated value and a known set of competitors. A team can brainstorm a compelling story from guesses. Her sequence puts the inputs first: competitive alternatives, unique features, the value those features drive, the customers who care, and the market category. She is explicit that positioning is not the result of a story. The story requires the positioning. In her workshops, the storyboard that becomes the sales narrative comes after that work.', src: DS },
      { h: 'A sales narrative has an order', body: 'Andy Raskin’s essay on a Zuora sales deck names five elements, in this order. Name a big, relevant change in the world. Show there will be winners and losers. Tease the promised land, which he says is a future state, not your product. Introduce capabilities as what helps the buyer past the obstacles to that future. Present evidence you can make the story come true. He treats a line like “you will have the most innovative platform” as a failed promised land, because it is the product, not the life the product makes possible. Use the order after the positioning is true. Used first, it can invent a world your deals do not support.', src: ['raskinDeck', ...DS] },
      { h: 'Where each decision shows up', table: { head: ['Positioning decision', 'Where it shows up in the story'], rows: [
        ['Competitive alternatives', 'The old way the change makes costly'],
        ['Unique attributes', 'The capabilities, after the future state is clear'],
        ['Value', 'The promised land, in the customer’s outcome, not your feature'],
        ['Best-fit customer', 'Who the change is urgent for'],
        ['Market category', 'The frame that makes the value obvious once the story names you']] } },
      { h: 'Steps', list: [
        ['Finish the five decisions', 'Alternatives, attributes, value, customer, category. In writing.'],
        ['Then name the change', 'Only a shift your best-fit customer already feels.'],
        ['State the future without the product', 'If the sentence needs your name, it is a pitch, not a promised land.'],
        ['Attach capabilities to obstacles', 'Each one answers a reason they might not get there.'],
        ['End on evidence you can show', 'A deal like theirs, or a demo of the outcome. Not a logo wall at slide one.']], src: [...DS, 'raskinDeck'] },
    ],
    faq: [
      { q: 'Should we start the offsite with the narrative?', a: 'No. Dunford’s warning is that the story will sound finished before the inputs are real. Do the positioning first.' },
      { q: 'Is a strategic narrative the homepage?', a: 'It is the sales story. The homepage still has to say what you are in seconds. The narrative is too long to be that sentence.' },
      { q: 'Can the category be the name of the change?', a: 'Only when buyers already use that frame. A coined shift that your customers do not say is a story looking for a market.' }],
    links: [P, ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/answers/jobs-to-be-done-vs-positioning', 'Jobs to be done vs positioning'], ['/answers/positioning-vs-branding', 'Positioning vs branding'], ['/answers/elevator-pitch-examples-saas', 'Elevator pitch examples for SaaS'], ['/answers/positioning-vs-messaging', 'Positioning vs messaging']] },

  { slug: 'positioning-when-moving-upmarket', title: 'Positioning when moving upmarket', updated: U,
    meta: 'Moving upmarket means a larger buyer, a different alternative, and more people who can block the deal.',
    answer: 'Moving upmarket means selling to a larger buyer than the one you already win. That buyer brings a different alternative, often a suite they already pay for, and more people who can say no. A new frame, in April Dunford’s account, changes the buyer, the alternatives and the price they expect.',
    sections: [
      { h: 'A larger buyer is a different frame', body: 'Dunford’s framing essay uses a baker who can sell the same batter as cake or as muffins. The product does not change. The buyer, the alternatives, the price people expect and the features that matter all change with the frame. Moving from the team that buys you now to a larger company is that kind of change. The spreadsheet or the small tool stops being the comparison. A suite they already run, a security review and a person who did not use the product can all enter the deal.', src: DF },
      { h: 'Do not announce a market you have not won', body: 'Dunford’s quickstart describes a team that lost the “better than the category leader” comparison, then won by narrowing to the buyers who cared about one difference. She writes that they planned to widen the category later, and did not get to test that step. Treat a larger segment the same way. It is a later test. It is not a word you add to the homepage because the round was meant to get you there.', src: DQ },
      { h: 'Steps', list: [
        ['Split recent deals by who signed', 'The team you already win, and any larger company that actually bought.'],
        ['Write the larger buyer’s alternative', 'The suite, the incumbent, the team they would hire. From those deals, or say you do not have the deals yet.'],
        ['List who can block it', 'The user, the budget owner, security, procurement. Each can need a line.'],
        ['Cut value only the small team felt', 'If the larger buyer does not care, it is not the upmarket position.'],
        ['Keep the current page pointed at the win', 'Change it when the new frame is true in deals, not when the plan says it should be.']], src: [...DF, ...DQ] },
      { h: 'What changes', table: { head: ['Piece', 'The buyer you win now', 'A larger buyer'], rows: [
        ['Alternative', 'A spreadsheet, a small tool, doing it by hand', 'A suite or a vendor they already pay'],
        ['Who decides', 'Often the user', 'A user, plus people who can stop it'],
        ['What they assume about price', 'The price of the tool they replace', 'The price of the category you just claimed'],
        ['Proof', 'Their own trial, a peer they know', 'A reference like them, and answers to the review']] } },
    ],
    faq: [
      { q: 'Should we put “enterprise” in the headline?', a: 'When enterprise buyers are the ones choosing you, and they use that word. Before that, it is a frame you have not earned.' },
      { q: 'Is a higher price the same as moving upmarket?', a: 'A higher price without a new buyer and a new alternative is a pricing change. Dunford’s point is that the frame sets what price feels normal.' },
      { q: 'Do we throw out the position that got us here?', a: 'No. Keep it while it still wins. Widen only when the larger buyer’s deals support a new frame.' }],
    links: [P, ['/answers/positioning-for-series-a', 'Positioning for Series A startups'], ['/answers/how-to-reposition-a-product', 'How to reposition a product'], ['/answers/how-to-position-against-incumbents', 'How to position a startup against incumbents'], ['/answers/positioning-for-seed-stage-startups', 'Positioning for seed stage startups'], ['/answers/what-is-a-best-fit-customer', 'What is a best-fit customer'], ['/answers/positioning-for-plg-products', 'Positioning for product-led products']] },

  { slug: 'what-is-product-marketing-at-a-startup', title: 'What is product marketing at a startup', updated: U,
    meta: 'Product marketing brings a product to market and keeps the story current. At a startup the founder usually does it.',
    answer: 'Product marketing is the work of bringing a product to market and keeping that story current: the customer, the competition, the positioning, the sales materials and the launch. The Product Marketing Alliance calls it the intersection of product, sales and marketing. At a startup the founder usually does the work until a product marketing lead exists to run it.',
    sections: [
      { h: 'The work, before anyone has the title', body: 'The Product Marketing Alliance defines product marketing as bringing a product to market and overseeing its success, at the intersection of product, sales and marketing. It lists market intelligence, positioning and messaging, sales enablement and launches. It separates that from a marketing team focused on lead generation. The same guide notes that people mix the role up with product management, because both sit across product, sales and marketing and both touch launches. At a startup the distinction is practical. Someone still has to decide the position, write the story sales tells, and keep it from drifting. Until a product marketing lead exists, that someone is the founder. The page on [who owns positioning](/answers/who-owns-positioning-at-a-startup) is the same point.', src: ['pmaPmm'] },
      { h: 'What sits where', table: { head: ['Work', 'Before a product marketer', 'Once you have one'], rows: [
        ['Positioning decision', 'Founder', 'Founder still decides. The product marketer runs the process'],
        ['Messaging and the homepage', 'Founder, often rewritten ad hoc', 'Maintained from the agreed document'],
        ['Sales pitch and enablement', 'Founder on the call', 'Materials and deal reviews a rep can reuse'],
        ['Launch', 'A note in Slack', 'A plan the team ships once']] } },
      { h: 'When the hire helps', body: 'Hire when the story is settled enough to maintain and the ongoing work is launches, sales materials and keeping the message current. If the story still changes every week, the missing piece is the positioning decision, which a founder can make with or without the title. A sprint is a fixed project that ends in that decision and the copy. A product marketer is a role that stays. The [sprint versus a PMM hire](/compare/positioning-sprint-vs-hiring-a-pmm) comparison is that scope difference. Published fractional rates live on the [fractional product marketing cost](/answers/fractional-product-marketing-cost) page, next to their sources.', src: DE },
    ],
    faq: [
      { q: 'Do we need a product marketer at seed?', a: 'You need the work. You need the hire when the founder can no longer keep the story and the sales materials current. Many seed teams are not there yet.' },
      { q: 'Is product marketing the same as positioning?', a: 'Positioning is one decision inside the work. Product marketing also carries messaging, enablement and launches, which Dunford treats as downstream of that decision.' },
      { q: 'Is it the same as demand generation?', a: 'The Product Marketing Alliance draws that line. Demand generation hunts leads. Product marketing owns how the product is understood, adopted and kept.' }],
    links: [P, ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup'], ['/answers/what-is-a-messaging-framework', 'What is a messaging framework'], ['/answers/fractional-product-marketing-cost', 'Fractional product marketing cost'], ['/answers/do-you-need-a-positioning-consultant-after-seed', 'Do you need a positioning consultant after seed'], ['/compare/positioning-sprint-vs-hiring-a-pmm', 'Positioning sprint vs hiring a PMM'], ['/answers/how-to-roll-out-new-positioning', 'How to roll out new positioning']] },
]
