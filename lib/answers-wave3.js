// Wave 3 answer pages (Oct 26, 2026). Same approved template as lib/answers.js.
// Facts only from the cited sources or plain practitioner guidance. Examples marked as illustrative. No invented stats.
const D = ['dunford'], DE = ['dunfordEx'], DF = ['dunfordFrame'], MT = ['momTest']
const U = '2026-10-26'
const P = ['/positioning', 'What is product positioning']
export const WAVE3 = [
  { slug: 'positioning-for-ai-startups', title: 'Positioning for AI startups', updated: U,
    answer: 'Position an AI startup against how buyers get the job done today, not against other AI tools or the model underneath. Pick a narrow best-fit customer, lead with the outcome you deliver, and build on advantages that are hard to copy, like data or workflow depth, because model features become table stakes fast.',
    sections: [
      { h: 'Why AI positioning goes stale fast', body: 'April Dunford notes that features which were once unique become table stakes as a market shifts, and a strong position weakens with them. In AI that shift happens on release cycles you do not control. Positioning built on a model capability has a short life. Positioning built on a customer, a workflow and proof lasts.', src: DE },
      { h: 'Steps', list: [
        ['Name the real alternative', 'A person, an agency, a spreadsheet or a general purpose assistant.'],
        ['List what only you have', 'Data, integrations, workflow, accuracy on one job, or a service layer. Leave the model name out.'],
        ['Map each to value', 'What the buyer can now do, how much faster, or what they stop paying for.'],
        ['Pick who cares most', 'The segment where that value is urgent enough to buy now.'],
        ['Choose the frame', 'A category buyers already budget for, narrowed with a qualifier if needed.']], src: DE },
      { h: 'Weak vs strong AI positioning', table: { head: ['Element', 'Weak', 'Strong'], rows: [
        ['Alternative', 'Other AI startups', 'What the buyer does today'],
        ['Unique attribute', 'Built on the latest model', 'Works on data or workflow the alternative cannot reach'],
        ['Value', 'Saves time', 'Removes a named step from a named workflow'],
        ['Category', 'AI-powered platform', 'A category the buyer already budgets for']] } },
    ],
    faq: [
      { q: 'Should AI be in the headline?', a: 'Only if the buyer is shopping for AI. Most buyers are shopping for an outcome, and the label alone no longer sets you apart.' },
      { q: 'What if a bigger company ships our feature?', a: 'Expect it. Position on what they would struggle to copy: your focus on one customer, your data and your depth in one workflow.' },
      { q: 'Do AI startups need a new category?', a: 'Rarely. Dunford treats creating a new category as the hardest style of positioning. Start in a frame buyers already understand.' }],
    links: [P, ['/answers/how-to-position-an-ai-product', 'How to position an AI product'], ['/answers/how-to-differentiate-when-competitors-copy-you', 'How to differentiate when competitors copy you'], ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/free-tools/competitive-alternatives-mapper', 'Map your competitive alternatives']] },

  { slug: 'positioning-for-seed-stage-startups', title: 'Positioning for seed stage startups', updated: U,
    answer: 'At seed stage, positioning means choosing the customer segment that already loves your product and describing your value the way they would. Use your first deals to name the real alternative, the attributes that won and the value buyers felt. Stay narrow. A small segment you win beats a broad market nobody understands.',
    sections: [
      { h: 'Start from the customers you have', body: 'Dunford\u2019s exercise points out that customers well suited to your product understand the value easily, buy faster and ask for fewer discounts. That matters most when the budget is small. At seed stage your first customers are the best positioning data you will get.', src: DE },
      { h: 'Steps', list: [
        ['List your best customers', 'The ones who bought fastest and use the product most.'],
        ['Ask what they used before', 'That is your real competitive alternative.'],
        ['Find what won the deal', 'The attribute they mention without prompting.'],
        ['Write down who they are', 'The traits that made them care, not only size and industry.'],
        ['Pick a frame they recognize', 'A known category, narrowed to them if needed.']] },
      { h: 'Seed vs Series A', table: { head: ['Question', 'Seed', 'Series A and later'], rows: [
        ['Evidence', 'A handful of deals and calls', 'Pipeline, win and loss reviews, sales input'],
        ['Scope', 'One segment', 'One core segment, maybe a second'],
        ['Main risk', 'Positioning for the market you hope to reach', 'Every new hire telling a different story'],
        ['Output', 'Positioning canvas and homepage', 'Messaging document, sales pitch and full site']] } },
      { h: 'How narrow is too narrow', body: 'Dunford\u2019s view is that a niche is only a problem when it is too small to support your business goals. For a seed company that usually means: can this segment get you to the next round? If yes, go narrow.', src: DF },
    ],
    faq: [
      { q: 'Is it too early to do positioning at seed?', a: 'Not if customers are using the product. Before that, there is nothing to learn from yet, so you are guessing.' },
      { q: 'Should the pitch deck and homepage say the same thing?', a: 'They should share the same positioning. Investors also hear the vision and market size. Buyers hear what it does for them now.' },
      { q: 'Should I position for the market I want to grow into?', a: 'No. Position to win the segment in front of you, then expand. Broad positioning at seed tends to read as vague.' }],
    links: [P, ['/answers/when-should-a-startup-do-positioning', 'When should a startup do positioning'], ['/answers/positioning-for-series-a', 'Positioning for Series A startups'], ['/answers/what-is-a-best-fit-customer', 'What is a best-fit customer'], ['/free-tools/icp-sketcher', 'Sketch your best-fit customer']] },

  { slug: 'positioning-for-series-a', title: 'Positioning for Series A startups', updated: U,
    answer: 'At Series A, positioning has to move out of the founder\u2019s head and into a document the whole company uses. The round usually funds a sales and marketing team, and each new hire will invent their own story unless the alternatives, value, best-fit customer and category are written down, agreed and built into the pitch.',
    sections: [
      { h: 'What changes at Series A', body: 'Before the round, the founder sells and adjusts the story live on every call. After it, other people sell. Dunford recommends writing positioning down so there is a record of what was agreed, and dating it so you know when it was last reviewed.', src: DE },
      { h: 'Steps', list: [
        ['Review what won since seed', 'Which segment closed fastest and stayed.'],
        ['Check for drift', 'Has the product outgrown the category you started in?'],
        ['Write the positioning down', 'One dated document, agreed by founders, product and sales.'],
        ['Build messaging from it', 'Messaging document first, then homepage, then sales pitch.'],
        ['Train the new team', 'Rehearse it in deal reviews until reps pitch it without notes.']] },
      { h: 'Signs it is time to revisit', table: { head: ['Signal', 'What it usually means'], rows: [
        ['New reps pitch differently', 'Positioning lives only in the founder\u2019s head'],
        ['Buyers compare you to the wrong tools', 'The category frame is off'],
        ['Wins come from a segment you do not target', 'The best-fit customer has shifted'],
        ['The homepage keeps getting rewritten', 'There is no agreed positioning to write from']] } },
    ],
    faq: [
      { q: 'Should we reposition right after raising?', a: 'Only if the evidence says so. A raise is a good moment to check your positioning, not a reason to change it.' },
      { q: 'Who owns positioning at Series A?', a: 'The founder still makes the call. A product marketing lead, if you have one, runs the process and keeps the documents current.' },
      { q: 'Do we need outside help?', a: 'Not always. You need someone who can run the process in a fixed window and get the leadership team to agree. That can be in house or outside.' }],
    links: [P, ['/answers/positioning-for-seed-stage-startups', 'Positioning for seed stage startups'], ['/answers/how-to-roll-out-new-positioning', 'How to roll out new positioning'], ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup'], ['/free-tools/messaging-hierarchy-builder', 'Build your messaging hierarchy']] },

  { slug: 'how-to-reposition-a-product', title: 'How to reposition a product', updated: U,
    answer: 'Reposition a product by re-running positioning from scratch, not by editing the old copy. Let go of the market you started in, list today\u2019s real alternatives, isolate what only you do now, map it to value, find who cares most, and choose the frame that makes it obvious. Then roll it out as a company change.',
    sections: [
      { h: 'When to reposition', body: 'When the product has outgrown its original market, when your unique features have become table stakes, or when buyers keep comparing you to a competitor you were never built to beat. Dunford describes a startup she joined early in her career that built a fast database prospects would not buy, because they already had Oracle. Repositioning it as a business intelligence tool put its speed at the center.', src: DE },
      { h: 'Steps', list: [
        ['Let go of where you came from', 'The original idea is history, not a constraint.'],
        ['List current alternatives', 'From recent won and lost deals, not the first pitch deck.'],
        ['Isolate your uniqueness', 'What you have that alternatives do not, today.'],
        ['Map uniqueness to value', 'What each attribute lets customers do.'],
        ['Find who cares most', 'The buyers for whom that value is urgent.'],
        ['Choose a new frame of reference', 'The market that makes the value obvious.'],
        ['Roll it out everywhere', 'Roadmap, pricing, sales, partners and support, not only the website.']], src: DE },
      { h: 'Repositioning vs refreshing messaging', table: { head: ['Question', 'Refresh messaging', 'Reposition'], rows: [
        ['What changes', 'Words, order and proof', 'Market frame, alternatives and target customer'],
        ['Who is involved', 'Marketing', 'Founders, product, sales and marketing'],
        ['Typical trigger', 'Copy feels dated', 'Buyers misread what you are'],
        ['What it touches', 'Website and collateral', 'Pricing, roadmap and sales motion too']] },
        body: 'Dunford is blunt about the second column: change the market you compete in and buyer expectations about competitors, pricing and sales channels change with it.', src: DE },
    ],
    faq: [
      { q: 'How do I know the new positioning is better?', a: 'Pitch it to prospects before you rebuild the site. Listen for whether they repeat the value back and compare you to the alternative you expect.' },
      { q: 'Is a rebrand part of repositioning?', a: 'Not necessarily. Change the strategy first. Rebrand only if the old name or look contradicts the new position.' },
      { q: 'What do I tell existing customers?', a: 'Tell them directly what changed and what stays the same. They bought the product, not the old description of it.' }],
    links: [P, ['/answers/signs-your-positioning-is-wrong', 'Signs your positioning is wrong'], ['/answers/how-to-roll-out-new-positioning', 'How to roll out new positioning'], ['/answers/how-to-test-positioning', 'How to test positioning'], ['/free-tools/category-picker', 'Pick your market category']] },

  { slug: 'why-messaging-doesnt-convert', title: 'Why messaging doesn\u2019t convert', updated: U,
    answer: 'Messaging usually fails to convert because the positioning under it is unclear, not because the words are weak. If buyers cannot tell what the product is, who it is for, or why it beats what they use today, better copy will not fix it. Check the positioning first, then rewrite the page from it.',
    sections: [
      { h: 'Common causes', list: [
        ['No clear category', 'Visitors cannot place what you are, so they leave.'],
        ['Value with no alternative', 'Faster or easier means nothing without saying than what.'],
        ['Written for everyone', 'Copy that avoids excluding anyone speaks to no one.'],
        ['Features without value', 'Capabilities listed with no outcome attached.'],
        ['Claims without proof', 'Nothing a buyer can check.']] },
      { h: 'Symptom and likely cause', table: { head: ['Symptom', 'Likely cause', 'Fix first'], rows: [
        ['Visitors ask what you do', 'No market category', 'Choose a category'],
        ['Prospects compare you to the wrong tools', 'Wrong frame of reference', 'Redo alternatives and category'],
        ['Interest but no urgency', 'Weak value or wrong customer', 'Narrow the best-fit customer'],
        ['Sales calls re-explain the homepage', 'Messaging not built from positioning', 'Rebuild from a messaging document']] } },
      { h: 'Diagnose before you rewrite', body: 'Read your headline to someone in your target market and ask what the product is. If they cannot say, it is a positioning problem. Dunford makes the same split: positioning is an input to messaging, not the messaging itself.', src: DE },
    ],
    faq: [
      { q: 'Can A/B testing fix it?', a: 'Testing helps you choose between messages. It cannot choose your market or your customer for you.' },
      { q: 'How do I check my own homepage?', a: 'Run the headline through the Boundset headline tester, then ask a few target buyers what you do.' },
      { q: 'Is it ever just the copy?', a: 'Yes, when the positioning is clear and agreed but the page buries it. Then a rewrite is the right fix.' }],
    links: [P, ['/answers/signs-your-positioning-is-wrong', 'Signs your positioning is wrong'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/answers/positioning-vs-messaging', 'Positioning vs messaging'], ['/free-tools/headline-tester', 'Test your headline']] },

  { slug: 'how-to-interview-customers-for-positioning', title: 'How to interview customers for positioning', updated: U,
    answer: 'Interview recent customers who bought fast and love the product. Ask what they used before, what made them look, what else they considered, why they chose you and what they would miss. Ask about past behavior, not opinions or future plans. The answers give you your real alternatives, unique attributes and value.',
    sections: [
      { h: 'Who to talk to', body: 'Dunford starts positioning with the customers who love your product, because they show what you deliver at your best. Add a lost deal or two to hear what the buyer chose instead.', src: D },
      { h: 'Questions to ask', list: [
        ['What were you using before?', 'Names the real competitive alternative.'],
        ['What made you start looking?', 'Shows the trigger and the pain.'],
        ['What else did you consider?', 'Fills in the shortlist.'],
        ['Why did you choose us?', 'Points to unique attributes.'],
        ['What would you lose if we disappeared?', 'Points to value.'],
        ['How would you describe us to a colleague?', 'Gives you their words for category and value.']] },
      { h: 'Keep the answers honest', body: 'Rob Fitzpatrick\u2019s The Mom Test sums up the rules: talk about their life rather than your idea, ask about specifics in the past rather than opinions about the future, and listen more than you talk.', src: MT },
      { h: 'From answers to positioning', table: { head: ['What you hear', 'Positioning input'], rows: [
        ['What they used before', 'Competitive alternatives'],
        ['Why they switched', 'Unique attributes'],
        ['What they would lose', 'Value'],
        ['Who else on their team cares', 'Best-fit customer traits'],
        ['The words they use for you', 'Market category']] } },
    ],
    faq: [
      { q: 'How many interviews do I need?', a: 'Keep going until the answers start to repeat. Stop when new calls stop changing your list of alternatives and value.' },
      { q: 'Should I record them?', a: 'Yes, with permission. Exact customer words are the raw material for messaging.' },
      { q: 'Should the founder run them?', a: 'The founder learns the most, but customers can be polite to the person who sold them. A neutral interviewer often hears more candid answers.' }],
    links: [P, ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/how-to-test-positioning', 'How to test positioning'], ['/answers/positioning-workshop-agenda', 'Positioning workshop agenda'], ['/free-tools/competitive-alternatives-mapper', 'Map your competitive alternatives']] },

  { slug: 'positioning-workshop-agenda', title: 'Positioning workshop agenda', updated: U,
    answer: 'A positioning workshop agenda follows the order of the decisions: review the customers who love you, list competitive alternatives, isolate unique attributes, map them to value, define who cares most, choose a market category, then write it down. Send customer research beforehand and keep the room to people who will own the result.',
    sections: [
      { h: 'Before the workshop', body: 'Collect customer interviews, recent won and lost deals and the current pitch. Dunford\u2019s process starts by forming a positioning team of leaders from across the business, because everyone who has to live with the result should help make it.', src: D },
      { h: 'Agenda', list: [
        ['Ground rules', 'Agree on terms and let go of the market you started in.'],
        ['Customers who love you', 'Review interview notes and best accounts.'],
        ['Competitive alternatives', 'What those customers would use if you did not exist.'],
        ['Unique attributes', 'Only what alternatives lack.'],
        ['Value', 'What each attribute lets customers do.'],
        ['Who cares most', 'The traits of buyers who value that most.'],
        ['Market category', 'The frame that makes the value obvious.'],
        ['Write it down', 'One dated document everyone signs off on.']], src: [...D, ...DE] },
      { h: 'Who attends', table: { head: ['Role', 'Why they are in the room'], rows: [
        ['Founder or CEO', 'Makes the final call'],
        ['Sales lead', 'Knows what wins and loses deals'],
        ['Product lead', 'Knows what is truly unique and what is coming'],
        ['Marketing lead', 'Turns the result into messaging'],
        ['Customer success', 'Knows who stays and why']] } },
    ],
    faq: [
      { q: 'How long should a positioning workshop be?', a: 'A team that has done the research can work through the agenda in one or two long sessions. Messaging comes after, as separate work.' },
      { q: 'Should customers attend?', a: 'No. Bring their words in through interviews instead.' },
      { q: 'What should come out of it?', a: 'A written positioning canvas, then a messaging document built from it.' }],
    links: [P, ['/answers/how-to-interview-customers-for-positioning', 'How to interview customers for positioning'], ['/answers/how-long-does-positioning-take', 'How long does positioning take'], ['/answers/who-owns-positioning-at-a-startup', 'Who owns positioning at a startup'], ['/templates/positioning-canvas', 'Positioning canvas template']] },

  { slug: 'how-to-differentiate-when-competitors-copy-you', title: 'How to differentiate when competitors copy you', updated: U,
    answer: 'When competitors copy your features, move your differentiation to what they cannot easily copy: the customer you focus on, your data, your process, your business model, your service or your depth in one workflow. Features become table stakes over time. Positioning built on a specific customer and the value they get lasts longer.',
    sections: [
      { h: 'Why copying happens', body: 'Dunford notes that features which were once unique become table stakes as a market matures, and a clearly differentiated position weakens over time. Copying is normal. Building your positioning on a single feature is the mistake.', src: DE },
      { h: 'Where lasting differences come from', list: [
        ['Focus', 'A segment the bigger player will not prioritize.'],
        ['Data', 'Information that improves with every customer and is yours alone.'],
        ['Process or service', 'How you deliver, not only what the software does.'],
        ['Business model', 'Pricing or packaging a competitor cannot match without hurting their own.'],
        ['Depth', 'Being far better at one job than a broad tool is at many.']], src: DE },
      { h: 'Easy vs hard to copy', table: { head: ['Easy to copy', 'Harder to copy'], rows: [
        ['A feature', 'A focus on one customer segment'],
        ['A headline claim', 'Proof from customers in that segment'],
        ['A price cut', 'A business model built around the segment'],
        ['An integration', 'Data and workflow depth built over time']] } },
      { h: 'Change how buyers judge', body: 'Dunford describes positioning that reframes an existing category so buyers evaluate solutions on criteria that favor you rather than the leader. If the copy is matching your features, change what the buyer is scoring.', src: DF },
    ],
    faq: [
      { q: 'Should we just ship faster?', a: 'Ship what customers need, but do not build your positioning on a lead that lasts one release.' },
      { q: 'Should we name the competitor?', a: 'In sales and on comparison pages, yes, when buyers already compare you. On the homepage, compare against the alternative most buyers use.' },
      { q: 'What if there is no real difference left?', a: 'Then the work is product strategy, not messaging. Positioning can only make real differences obvious.' }],
    links: [P, ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/positioning-for-ai-startups', 'Positioning for AI startups'], ['/answers/how-to-reposition-a-product', 'How to reposition a product'], ['/free-tools/competitive-alternatives-mapper', 'Map your competitive alternatives']] },

  { slug: 'positioning-vs-icp', title: 'Positioning vs ICP', updated: U,
    answer: 'An ICP describes which companies to target, usually by industry, size, region and stack. Positioning is the broader strategy: the alternatives you compete with, what makes you unique, the value that creates, who cares most and your category. The ICP comes out of positioning and works best when it explains why those buyers care.',
    sections: [
      { h: 'How they fit together', body: 'In Dunford\u2019s exercise, deciding who cares a lot about your value comes after alternatives, uniqueness and value. She notes that industry, location and company size are a start, but you have to get specific about which prospects love you most and why.', src: DE },
      { h: 'ICP vs positioning', table: { head: ['Question', 'ICP', 'Positioning'], rows: [
        ['Answers', 'Who should we sell to?', 'Why do we win, against what, and for whom?'],
        ['Inputs', 'Firmographics, technographics, triggers', 'Alternatives, unique attributes, value, customer, category'],
        ['Used by', 'Sales and demand generation targeting', 'Every team, through messaging'],
        ['Changes when', 'A better converting segment shows up', 'The market, product or alternatives shift']] } },
      { h: 'Turn an ICP into a best-fit customer', list: [
        ['Start with firmographics', 'Industry, size, region, stack.'],
        ['Add the trigger', 'The event that makes them look now.'],
        ['Add why they care', 'The value that matters more to them than to anyone else.'],
        ['Add disqualifiers', 'Who looks right on paper but never buys.']] },
    ],
    faq: [
      { q: 'Is an ICP the same as a best-fit customer?', a: 'Close. A best-fit customer definition adds why those buyers care, which is what messaging needs.' },
      { q: 'Which do I define first?', a: 'Positioning. The ICP is clearer once you know the value you deliver and who it matters to most.' },
      { q: 'Can sales own the ICP?', a: 'Sales can maintain it, but it should come from the positioning so targeting and messaging match.' }],
    links: [P, ['/answers/what-is-a-best-fit-customer', 'What is a best-fit customer'], ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/answers/positioning-for-seed-stage-startups', 'Positioning for seed stage startups'], ['/free-tools/icp-sketcher', 'Sketch your best-fit customer']] },

  { slug: 'message-house-template', title: 'Message house template', updated: U,
    answer: 'A message house puts your core message on the roof, supporting pillars underneath and proof points as the foundation. Fill it from your positioning: the roof states your main value for your best-fit customer, each pillar is a value theme, and each proof point is evidence a buyer can check. Every line should be reusable.',
    sections: [
      { h: 'The template', table: { head: ['Part', 'What goes in it', 'Illustrative example'], rows: [
        ['Roof', 'One core message', 'Acme closes your books every month, so you always know your runway.'],
        ['Pillar 1', 'Value theme', 'Every account reconciled monthly.'],
        ['Pillar 2', 'Value theme', 'Investor-ready reports with no extra work.'],
        ['Pillar 3', 'Value theme', 'A named accountant, not a ticket queue.'],
        ['Foundation', 'Proof points', 'Customer quotes, case studies, data and certifications you can show.']] } },
      { h: 'How to fill it', list: [
        ['Start from positioning', 'Alternatives, unique attributes, value, customer and category.'],
        ['Pick your value themes', 'Usually two to four. Each becomes a pillar.'],
        ['Attach proof to each pillar', 'Only evidence you can show a buyer.'],
        ['Write the roof', 'One sentence the pillars support.'],
        ['Use it on a real page', 'Rebuild the homepage from it and see what is missing.']] },
      { h: 'Message house vs messaging document', body: 'A message house is a one page layout. A messaging document goes further, with descriptions of different lengths, messages by audience and approved boilerplate. Many teams start with the house and grow it into the document. Dunford keeps both downstream of positioning.', src: DE },
    ],
    faq: [
      { q: 'Why three pillars?', a: 'Three is common, not required. Use as many value themes as you can prove.' },
      { q: 'Is the roof a tagline?', a: 'No. It is an internal statement of your main value. Customer-facing copy is written from it.' },
      { q: 'Can I build one online?', a: 'Yes. The Boundset messaging hierarchy builder lays out a core message, three pillars and proof points.' }],
    links: [P, ['/answers/what-is-a-messaging-framework', 'What is a messaging framework'], ['/answers/what-is-a-one-liner', 'What is a one-liner'], ['/answers/positioning-vs-messaging', 'Positioning vs messaging'], ['/templates/messaging-document', 'Messaging document template'], ['/free-tools/messaging-hierarchy-builder', 'Build your message house']] },

  { slug: 'positioning-for-developer-tools', title: 'Positioning for developer tools', updated: U,
    answer: 'Position a developer tool against what developers would do without you: build it themselves, use an open source project or accept their platform\u2019s default. Lead with the job the tool does and how it fits their stack. Back every claim with docs, code and a fast way to try it, because developers check.',
    sections: [
      { h: 'The alternatives are different', body: 'For most developer tools the strongest competitor is not another vendor. It is an engineer who thinks they can build it in a weekend, a free library, or the option already bundled with their platform. Your positioning has to say why buying beats each one. This is Dunford\u2019s competitive alternatives step applied to a technical buyer.', src: D },
      { h: 'Steps', list: [
        ['Name the cost of building it', 'Maintenance, edge cases and on-call time, not only the first version.'],
        ['Say the job plainly', 'One sentence a developer would say to a teammate.'],
        ['Show how it fits', 'The languages, frameworks and infrastructure it works with.'],
        ['Separate user and buyer', 'The developer adopts it. A lead or manager often pays. Each needs its own message.'],
        ['Make proof checkable', 'Docs, a quickstart and real code samples.']] },
      { h: 'Alternative and what to answer', table: { head: ['Alternative', 'What the developer thinks', 'What your positioning must answer'], rows: [
        ['Build in house', 'We can do this ourselves', 'What it costs to maintain and why it is not their core work'],
        ['Open source library', 'It is free', 'What you add: hosting, support, scale or features'],
        ['Platform default', 'It is already there', 'Where the default falls short for their use case'],
        ['Another vendor', 'They look the same', 'The unique attribute that matters to this team']] } },
    ],
    faq: [
      { q: 'Should a developer tool homepage show code?', a: 'Often, yes. A short code sample can explain what the tool does faster than a sentence.' },
      { q: 'How technical should the copy be?', a: 'As technical as the reader. Use their terms precisely and skip marketing adjectives.' },
      { q: 'Who is the best-fit customer for a developer tool?', a: 'Usually a team with a specific stack and a specific pain, not developers in general.' }],
    links: [P, ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/positioning-for-ai-startups', 'Positioning for AI startups'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/free-tools/value-prop-scorer', 'Score your value proposition']] },

  { slug: 'pricing-page-messaging', title: 'Pricing page messaging', updated: U,
    answer: 'Pricing page messaging should make the choice easy, not just list prices. Say who each plan is for, lead with the value that justifies the price, show only what changes between plans, and answer the objections buyers have at that moment. Your positioning sets the price buyers expect, so the page has to match your category.',
    sections: [
      { h: 'Why positioning comes first', body: 'Dunford points out that once you name your market, buyers assume things about your competitors, your features and even your pricing based on what they already know about that market. A price that fits the category you claim feels fair. One that does not raises questions the page has to answer.', src: DE },
      { h: 'Steps', list: [
        ['Name each plan by who it is for', 'A buyer should find their plan in seconds.'],
        ['Lead with value', 'What the plan lets them do, then the features.'],
        ['Show the differences', 'Only what changes between plans.'],
        ['Answer objections nearby', 'Contracts, limits, switching and security.'],
        ['One next step per plan', 'Start, book a call or talk to sales.']] },
      { h: 'Common problems', table: { head: ['Problem', 'Fix'], rows: [
        ['Plans named by size only', 'Say who each plan is for'],
        ['Long feature grids', 'Lead with the few differences that drive the choice'],
        ['Price shown without context', 'Pair it with the value or the cost of the alternative'],
        ['No answer to is this for me', 'Add the best-fit customer for each plan']] } },
    ],
    faq: [
      { q: 'Should we show prices at all?', a: 'If buyers in your category expect to see them, yes. Hiding them fits when deals are custom and buyers expect a sales conversation.' },
      { q: 'How many plans should we have?', a: 'As few as cover your real segments. Each plan should map to a distinct buyer.' },
      { q: 'Should the pricing page repeat the homepage message?', a: 'Briefly. Visitors often land there directly, so restate what the product is in one line.' }],
    links: [P, ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/answers/how-to-choose-a-market-category', 'How to choose a market category'], ['/answers/why-messaging-doesnt-convert', 'Why messaging doesn\u2019t convert'], ['/free-tools/value-prop-scorer', 'Score your value proposition']] },
]
