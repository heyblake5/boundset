// Wave 5 answer pages (Oct 28, 2026). Same approved template as lib/answers.js.
// Facts only from the cited sources or plain practitioner guidance. Examples marked as illustrative. No invented stats.
const DE = ['dunfordEx'], DQ = ['dunfordQuick'], DI = ['dunfordIntro'], DS = ['dunfordStory']
const U = '2026-10-28'
const P = ['/positioning', 'What is product positioning']
export const WAVE5 = [
  { slug: 'positioning-for-vertical-saas', title: 'Positioning for vertical SaaS', updated: U,
    meta: 'Position vertical SaaS for one industry job, against the suite or spreadsheet buyers already use.',
    answer: 'Position a vertical SaaS product for one industry’s job, against the general tool and the spreadsheet buyers use now. The industry is the frame that makes your value obvious, not a slogan you add to a horizontal pitch. Geoffrey Moore’s beachhead is the same move: a segment incumbents do not finish, served with the whole product that segment needs.',
    sections: [
      { h: 'The industry belongs in the frame', body: 'April Dunford’s market category is the context that makes your value obvious to the buyers who care. A known category plus the industry does that. In her quickstart she describes shifting from enterprise CRM, a comparison her team could not win, to CRM for investment banks, the buyers who cared about the one capability that mattered. A vertical product is that kind of frame. Moore’s Crossing the Chasm tactic is a beachhead: choose a segment whose problem is specific enough that broad vendors have not finished it, and deliver the whole product that gives them a reason to buy.', src: [...DQ, 'mooreBook'] },
      { h: 'A public company in this shape', body: 'Veeva is a public example of the shape, not a template to copy. Peter Gassner and his co-founders started it in 2007 to build cloud software for life sciences. TechCrunch reported that they built the company on Salesforce’s platform, as software for that industry rather than a general CRM. Use the narrow job as the picture. Leave their later products, their price and their history out of your pitch.', src: ['veeva'] },
      { h: 'Steps', list: [
        ['Name the weekly job', 'The workflow a buyer in that industry would describe to a colleague.'],
        ['List real alternatives', 'The horizontal suite, a spreadsheet, a hire, or the work done by hand.'],
        ['Keep only the gap', 'What those alternatives still make the buyer assemble.'],
        ['Name who feels it', 'The role and the trigger. The industry alone is not the customer.'],
        ['Choose a known frame', 'A category they already understand, qualified by the industry.']] },
      { h: 'What you have to answer', table: { head: ['Alternative', 'What the buyer assumes', 'What your positioning must answer'], rows: [
        ['Horizontal suite', 'We can configure it', 'The industry work left after setup'],
        ['Spreadsheet or inbox', 'It is free and it is ours', 'The errors, the handoffs and the record'],
        ['A person who knows the trade', 'They already understand us', 'What breaks when that person is out'],
        ['Another vertical product', 'They look the same', 'The capability their buyers actually switch for']] } },
    ],
    faq: [
      { q: 'Is a vertical market too small?', a: 'Dunford’s test is whether the segment can support the business you want. Moore’s point runs the other way. A problem broad vendors do not finish is often where a new product can be the whole solution.' },
      { q: 'Should the homepage name the industry?', a: 'Yes. If a buyer in that industry cannot see their job on the first screen, the general tool stays the default.' },
      { q: 'Can one position serve two industries?', a: 'Only when both hire you for the same job against the same alternatives. A different workflow is a second position.' }],
    links: [P, ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/how-to-choose-a-market-category', 'How to choose a market category'], ['/answers/positioning-for-fintech-startups', 'Positioning for fintech startups'], ['/answers/how-to-position-against-incumbents', 'How to position a startup against incumbents'], ['/free-tools/category-picker', 'Pick your market category']] },

  { slug: 'positioning-for-fintech-startups', title: 'Positioning for fintech startups', updated: U,
    meta: 'Position a fintech startup against the bank, spreadsheet or processor buyers use, and name who must trust it.',
    answer: 'Position a fintech startup against how the buyer moves or tracks money today. That is often the bank, a spreadsheet, a processor or a person. Lead with the job and the risk you remove. Write a line for each person who must trust it. Put who holds the funds, and the control report you can show, next to the claim.',
    sections: [
      { h: 'The approver can stop a deal the user wants', body: 'The person who does the work and the person who owns the risk often want different things. Dunford’s best-fit step asks who cares a lot about the value, and why. Write that for both. A line that excites the user and worries the approver stalls. The alternative is often the status quo. Her quickstart says to count the spreadsheet, the manual process and the decision to do nothing, not only the vendors you fear.', src: DQ },
      { h: 'Steps', list: [
        ['Name the money job', 'Reconciliation, payouts, credit or a compliance check. One job.'],
        ['List what they do instead', 'The bank portal, a processor such as Stripe, a spreadsheet, an accountant, or no change.'],
        ['Separate user and approver', 'Each gets a line from the same position. Do not blend them into one vague sentence.'],
        ['State the missing capability', 'What you do that the alternative does not, then the result in their words.'],
        ['Put proof beside the claim', 'Who holds customer funds, and which report you can actually show.']] },
      { h: 'Who needs which line', table: { head: ['Who', 'What they need to hear', 'What they ask'], rows: [
        ['Person doing the work', 'The step that goes away', 'Will this fit how we close the books'],
        ['Finance owner', 'The outcome and the control', 'What happens when a number is wrong'],
        ['Risk or security', 'Who holds the funds, and what was examined', 'Can you show a SOC 2 report']] } },
      { h: 'What a SOC 2 report is', body: 'A SOC 2 report is an independent CPA examination of a service organization’s controls relevant to security, availability, processing integrity, confidentiality or privacy. That is how the AICPA describes the engagement. Finance approvers often ask for it. The report can support a trust claim. It does not choose your category, and it does not say what the product does.', src: ['aicpaSoc'] },
      { h: 'Illustrative lines', body: 'These lines are for a fictional product, Acme Payouts. They are not a client and not a result. The imagined product reconciles marketplace payouts. The alternative is a spreadsheet plus the bank portal. Say the third line only when it is true.', table: { head: ['Reader', 'Line'], rows: [
        ['Founder', 'You see which payouts cleared without rebuilding the sheet.'],
        ['Accountant they hired', 'Every payout ties to an order you can export.'],
        ['Person who signs for risk', 'Customer funds stay at the processor. We reconcile the record. The control report is on this page.']] } },
    ],
    faq: [
      { q: 'Should the homepage lead with a bank partner or a license?', a: 'Only when that is why the best-fit buyer picks you. Otherwise it is proof next to the job, not the category.' },
      { q: 'Is “AI for finance” a category?', a: 'Only if your buyers shop and budget that way. Most are replacing a bank portal, a spreadsheet or a person.' },
      { q: 'Do we name Stripe or the bank?', a: 'In the positioning document, name the alternative you actually see in deals. On the homepage, name it when buyers already compare you to it.' }],
    links: [P, ['/answers/what-is-a-best-fit-customer', 'What is a best-fit customer'], ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/positioning-for-vertical-saas', 'Positioning for vertical SaaS'], ['/answers/positioning-for-healthtech-startups', 'Positioning for healthtech startups'], ['/free-tools/competitive-alternatives-mapper', 'Map your competitive alternatives']] },

  { slug: 'positioning-for-healthtech-startups', title: 'Positioning for healthtech startups', updated: U,
    meta: 'Position a healthtech startup against today’s clinical workflow, and be plain about protected health information.',
    answer: 'Position a healthtech startup against the workflow buyers use today. That is often an electronic health record, a spreadsheet, or paper and fax. Separate the person who uses it from the person who can block it. Say the job in their words. If you touch protected health information, say whether a business associate agreement is part of the sale.',
    sections: [
      { h: 'The record they already run is often the alternative', body: 'Clinic and hospital buyers rarely start from a blank page. The alternative is often a workflow inside an electronic health record they already run, such as Epic or Oracle Health, formerly Cerner, or a workaround beside it. Dunford’s first step still applies. Ask what they would do if you did not exist. If the answer is a screen in that record, your position has to say what that screen does not finish.', src: DE },
      { h: 'Protected health information is a purchase question', body: 'Buyers will ask whether you create, receive, maintain or transmit protected health information, and whether a business associate agreement is in place. HHS describes a business associate, generally, as a person or entity that does that work on behalf of a covered entity, or on behalf of another business associate. The covered entity needs the written agreement before that disclosure. HHS also lists arrangements that are not business associates, including one provider sending information to another for treatment. Answer from what the product does. This is not legal advice, and it is not a headline until you know the answer.', src: ['hhsBa'] },
      { h: 'Steps', list: [
        ['List the people in the deal', 'The user, the sponsor, and the person in IT, security or compliance who can stop it.'],
        ['Ask about last week', 'What they did in the record, or beside it. A real week, not a wish list.'],
        ['Write one line per person', 'Same position. The user hears the workflow. The approver hears the risk and the agreement.'],
        ['Attach proof you can show', 'A workflow in their language, the agreement when one is required, a reference from a similar setting.'],
        ['Hold clinical claims', 'Until the product and counsel can stand behind them. A positioning line is not a regulatory filing.']] },
      { h: 'Illustrative lines', body: 'Fictional. Acme Schedule is not a client. It imagines scheduling for an outpatient clinic. Use the third line only when the agreement is real.', table: { head: ['Reader', 'Line'], rows: [
        ['Front desk', 'Today’s visits are confirmed before the huddle, without a separate call list.'],
        ['Clinic owner', 'No-shows sit on the same list you use to staff the day.'],
        ['Person who reviews vendors', 'Scheduling stays in your record. Here is the agreement we sign when we touch patient information.']] } },
    ],
    faq: [
      { q: 'Should HIPAA be in the headline?', a: 'No. Buyers need the job first. The agreement answers a question they will ask. It sits beside the claim.' },
      { q: 'What if we do not touch protected health information?', a: 'Say that if it is true. Do not offer a business associate agreement as a badge. HHS’s definition turns on what you do with the information.' },
      { q: 'Is the buyer the clinician?', a: 'The clinician may be the user. A practice owner, an administrator or a security reviewer may decide. Write for the people who show up in your deals.' }],
    links: [P, ['/answers/how-to-interview-customers-for-positioning', 'How to interview customers for positioning'], ['/answers/positioning-for-series-a', 'Positioning for Series A startups'], ['/answers/positioning-for-fintech-startups', 'Positioning for fintech startups'], ['/answers/what-is-a-best-fit-customer', 'What is a best-fit customer'], ['/free-tools/icp-sketcher', 'Sketch your best-fit customer']] },

  { slug: 'positioning-for-cybersecurity-startups', title: 'Positioning for cybersecurity startups', updated: U,
    meta: 'Position a cybersecurity startup against the tool buyers already use, and put proof they can check beside the claim.',
    answer: 'Position a cybersecurity startup against the tool, the platform feature or the manual review the buyer already uses. The person who pays is often a security leader who did not ask for another dashboard. Lead with the risk they own and the work you remove. Proof a buyer can check belongs beside the claim.',
    sections: [
      { h: 'The platform they already pay for is the comparison', body: 'A security buyer may already pay a platform from a company such as Microsoft, CrowdStrike or Palo Alto Networks. Expect to be set next to a feature of that platform, a queue of alerts, or an outside firm. Dunford notes that features which were once unique become table stakes, and a position built on them weakens. The difference that lasts is a job the suite does not finish: a workflow, a data source or a depth of review that team does not staff.', src: DE },
      { h: 'Steps', list: [
        ['Name the review they do today', 'The queue, the audit or the overnight check. One job.'],
        ['List the real alternative', 'The platform feature, the manual review, the outside firm, or leaving the gap.'],
        ['Separate user and buyer', 'An engineer may live in the product. A security leader may sign. Each needs a line.'],
        ['Say what you remove', 'Alerts they stop chasing, a review they stop staffing, or a question they can answer for the audit.'],
        ['Show proof they can inspect', 'A reference from a similar environment, how you fit the tools they run, and a control report if you have one.']] },
      { h: 'What the buyer is asking', table: { head: ['What they say', 'What they need'], rows: [
        ['We already have a platform', 'The job that platform does not finish for this team'],
        ['How are you different', 'One capability the alternative lacks, and the result'],
        ['Will this become the incident', 'What you do with their data, and what they can check'],
        ['Can my team run it', 'The workflow inside tools they already open']] } },
      { h: 'A control report is proof, not a position', body: 'A SOC 2 report is an independent CPA examination of controls relevant to security, availability, processing integrity, confidentiality or privacy, which is the AICPA’s description. Security approvers ask for it. It can support a trust claim. It does not explain the job, and you should not imply you have one when you do not.', src: ['aicpaSoc'] },
    ],
    faq: [
      { q: 'Should we claim we stop breaches?', a: 'Only with evidence a security buyer can check. An unsupported sentence is a claim they are trained to discount.' },
      { q: 'Do we name the incumbent platform?', a: 'In the positioning document, yes, when it shows up in deals. On the homepage, name it when buyers already use that comparison.' },
      { q: 'What if the platform ships our feature?', a: 'Expect it. Move the position to the customer, the data or the workflow they will not staff.' }],
    links: [P, ['/answers/how-to-differentiate-when-competitors-copy-you', 'How to differentiate when competitors copy you'], ['/answers/positioning-for-developer-tools', 'Positioning for developer tools'], ['/answers/how-to-position-against-incumbents', 'How to position a startup against incumbents'], ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/free-tools/competitive-alternatives-mapper', 'Map your competitive alternatives']] },

  { slug: 'jobs-to-be-done-vs-positioning', title: 'Jobs to be done vs positioning', updated: U,
    meta: 'Jobs to be done finds the progress and the alternatives. Positioning chooses the value, the customer and the category.',
    answer: 'Jobs to be done and positioning answer different questions. Clayton Christensen and colleagues define a job as the problem a customer needs to resolve in a situation. The alternatives are whatever else they hire for that progress. April Dunford starts positioning from those alternatives, then chooses the value, the best-fit customer and the category you intend to win.',
    sections: [
      { h: 'The job names the alternatives', body: 'Christensen, Scott Anthony, Gerald Berstell and Denise Nitterhouse, writing in MIT Sloan Management Review, define a job as the fundamental problem a customer needs to resolve in a given situation. Their milkshake account makes the alternative set concrete. Commuters hired a shake for a boring drive and to delay hunger. The competition was not only other milkshakes. It included donuts, bagels, bananas and boredom. Later in the day, parents hired a shake as a treat for a child, a different job. The unit of analysis is the situation. Dunford writes that reading jobs-to-be-done work is what convinced her to start positioning with competitive alternatives. Start anywhere else, she says, and the result can sound right in the office and still not be differentiated.', src: ['christensenJtbd', ...DQ] },
      { h: 'They answer different questions', table: { head: ['Question', 'Jobs to be done', 'Positioning'], rows: [
        ['What progress is underway?', 'The job in a situation', 'Why this alternative list, and not another'],
        ['What else could they hire?', 'Competition for the job', 'Competitive alternatives'],
        ['What do we have that those lack?', 'Outside the method', 'Unique attributes'],
        ['Who do we focus on?', 'People in that situation', 'Best-fit customers who care most'],
        ['What do we call it?', 'Not a category decision', 'Market category']] } },
      { h: 'A switch still has to overcome habit and anxiety', body: 'Bob Moesta, writing from Demand-Side Sales 101, describes four forces. The push of the situation and the magnetism of the new solution move someone toward a change. The anxiety of the new solution and the habit of the present hold them back. He argues that adding features feeds the magnetism, and that the sale still depends on reducing the anxiety. In positioning terms, habit is the status quo alternative, and anxiety is the objection your proof has to answer. The forces do not choose your category. Christensen and his coauthors also say that once a job is clear, you still define the functional, emotional and social experience of buying and using. That experience comes after the position. It does not choose the category.', src: ['moesta', 'christensenJtbd'] },
    ],
    faq: [
      { q: 'Should we replace positioning with jobs to be done?', a: 'No. Use the job to build an honest list of alternatives. Then work Dunford’s sequence. The job does not choose your category or write the homepage.' },
      { q: 'Is the milkshake example only for consumer products?', a: 'The published story is a consumer purchase. The definition still travels. A buyer hires a product for progress in a situation, and the alternatives include whatever else they use, spreadsheet and status quo included.' },
      { q: 'Do the four forces replace interviews?', a: 'No. They are a way to read an interview about a real switch. Ask what the buyer did. The customer interview page covers how.' }],
    links: [P, ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/answers/positioning-vs-icp', 'Positioning vs ICP'], ['/answers/what-are-competitive-alternatives', 'What are competitive alternatives'], ['/answers/how-to-find-unique-attributes', 'How to find your unique attributes'], ['/answers/how-to-interview-customers-for-positioning', 'How to interview customers for positioning']] },

  { slug: 'how-to-find-unique-attributes', title: 'How to find your unique attributes', updated: U,
    meta: 'Unique attributes are what the real alternatives lack. Find them in deals, then cut any claim a competitor can also make.',
    answer: 'Unique attributes are the capabilities the real alternatives lack. Find them in won and lost deals, not on the feature page. April Dunford’s sequence asks what you have that those alternatives do not, then what that lets a customer do. If an alternative can make the same claim, cross it out. Shared features do not decide the purchase.',
    sections: [
      { h: 'Differentiated means compared with an alternative', body: 'Dunford’s quickstart is a short chain. Start with what the customer would do if you did not exist. List what you have that those alternatives do not. Then ask what that capability lets the customer do. Her question is “so what for customers.” A product feature can be an attribute. So can another capability, when the alternative lacks it. Pride in a feature does not make it an attribute. The comparison does.', src: DQ },
      { h: 'Steps', list: [
        ['Pull recent deals', 'Won and lost. Write what they used before and what they chose instead.'],
        ['List capabilities against each', 'Features, data, process or delivery. Keep what that alternative lacks.'],
        ['Cross out the overlap', 'If they can claim it, it is not why someone picks you.'],
        ['Ask so what', 'Continue until you reach a result a buyer would pay for. If it is still a feature, keep going.'],
        ['Check the customer’s words', 'What they say they would miss. Use past deals, not a vote on your feature list.']] },
      { h: 'Illustrative cut', body: 'The rows are a fictional billing product, the same kind of worked example used elsewhere on this site. They are not a client. Your list comes from your deals.', table: { head: ['Claim', 'Versus a spreadsheet', 'Keep or cut'], rows: [
        ['Sends an invoice', 'The spreadsheet does not send it', 'Keep, then ask so what'],
        ['Stores client names', 'The spreadsheet stores them too', 'Cut'],
        ['Drafts the bill from the client email', 'The spreadsheet cannot', 'Keep'],
        ['AI-powered', 'A buyer cannot tell what changes', 'Cut, until the result is plain']] } },
    ],
    faq: [
      { q: 'Can a way of delivering be a unique attribute?', a: 'Yes, when the alternative does not have it and the customer would pay for the result. Dunford’s component is capabilities, not a feature list alone.' },
      { q: 'How many unique attributes should we keep?', a: 'As many as survive the comparison. A long list of shared features is not a stronger position.' },
      { q: 'What if nothing survives the cut?', a: 'Then the work is the product, not the sentence. Positioning can only make a real difference obvious.' }],
    links: [P, ['/answers/positioning-workshop-agenda', 'Positioning workshop agenda'], ['/answers/how-to-interview-customers-for-positioning', 'How to interview customers for positioning'], ['/answers/jobs-to-be-done-vs-positioning', 'Jobs to be done vs positioning'], ['/answers/value-themes-examples', 'Value themes examples'], ['/templates/positioning-canvas', 'Positioning canvas template']] },

  { slug: 'value-themes-examples', title: 'Value themes examples', updated: U,
    meta: 'Value themes group differentiated value into a few outcomes a buyer can remember, each with proof you can show.',
    answer: 'Value themes are the few outcomes you group your differentiated value into, so a buyer can remember why to pick you. Dunford’s value step asks what each capability lets a customer do, including what only a combination of capabilities creates. A theme is that outcome, in the customer’s words, with proof you can show. The examples below are illustrative.',
    sections: [
      { h: 'Group the value after you know it', body: 'Themes come after unique attributes. Dunford’s exercise says customers care what a feature does for them, and that a combination of features can deliver value none of them delivers alone. Cluster those results into a short list a buyer can repeat. Each theme needs proof you can put next to it. A theme with nothing beside it is a slogan.', src: DE },
      { h: 'Illustrative themes', body: 'Fictional. Acme Billing, for small accounting firms whose owners still send invoices, is not a client. The proof column names the kind of evidence you would attach. It is not a measured result.', table: { head: ['Theme', 'Comes from', 'Proof you would attach'], rows: [
        ['Invoices go out the day the work is done', 'Drafts the bill from the client email, which the spreadsheet cannot', 'One invoice, shown from email to sent'],
        ['You stop chasing late payments at night', 'Reminders run on the schedule the owner used to run by hand', 'The owner’s words, quoted with permission'],
        ['The month closes without a weekend rebuild', 'Drafts, reminders and the payment list live in one place', 'The owner describing their Friday, in their words']] } },
      { h: 'How to write one', list: [
        ['Start from attributes that survived', 'If the alternative has it, it cannot found a theme.'],
        ['Write the outcome', 'The customer’s words for what they can now do.'],
        ['One idea in the sentence', 'Three outcomes joined by “and” are three themes, or none yet.'],
        ['Attach proof you can show', 'A quote, a workflow or a sample. Not a number you do not have.'],
        ['Use the themes downstream', 'Pillars in a message house. Rows in the messaging document. Not a new position.']] },
    ],
    faq: [
      { q: 'How many value themes should we have?', a: 'Few enough that each one has proof. Three is common on a message house. It is not a rule. Two strong themes beat four you cannot show.' },
      { q: 'Is a value theme a value proposition?', a: 'A value proposition is one message for one audience. A theme is an outcome you reuse. The proposition for a given buyer is written from the themes they care about.' },
      { q: 'Can a theme mention a feature?', a: 'The feature can sit behind the theme as the reason it is true. The theme itself is the outcome the buyer would repeat.' }],
    links: [P, ['/answers/message-house-template', 'Message house template'], ['/answers/what-is-a-messaging-framework', 'What is a messaging framework'], ['/answers/how-to-find-unique-attributes', 'How to find your unique attributes'], ['/answers/value-proposition-vs-positioning', 'Value proposition vs positioning'], ['/free-tools/messaging-hierarchy-builder', 'Build your message house']] },

  { slug: 'elevator-pitch-examples-saas', title: 'Elevator pitch examples for SaaS', updated: U,
    meta: 'An elevator pitch names the customer, the category and one outcome in words you can say. These SaaS examples are illustrative.',
    answer: 'An elevator pitch is a short spoken version of your messaging. It names the customer, the category and one outcome, in words you can say out loud. It is not a positioning statement. April Dunford treats that fill-in-the-blank line as an internal check, and the story you tell needs the positioning first. The examples below are illustrative.',
    sections: [
      { h: 'Decide the position, then say a shorter version', body: 'Dunford’s point is that a story needs the positioning as an input. Alternatives, value, customer and category come first. A pitch written before that work can sound clear and still be wrong. The positioning statement is the wrong script for the room. She argues the fill-in-the-blank line is an awkward internal check, not copy a customer should hear. Say the category, the customer and one outcome, in their words.', src: [...DS, ...DE] },
      { h: 'Illustrative pitches', body: 'Each row is a fictional company. None of these are clients. The short line is one sentence. The longer line is what you can say in about half a minute.', table: { head: ['Fictional product', 'One sentence', 'About half a minute'], rows: [
        ['Acme Billing, for small accounting firms', 'Acme is billing software for accounting firms whose owners still send the invoices.', 'Firm owners write invoices at night from client emails. Acme reads the email, drafts the invoice and sends the reminder. The bill goes out the day the work is done, instead of another pass through a spreadsheet.'],
        ['Acme Queue, a developer tool', 'Acme Queue is the job queue for platform teams that still get paged when a task fails.', 'Platform teams lose hours to failed jobs they notice only when a customer writes in. Acme Queue retries the job, shows the failed step and pages a person only when a person has to act.'],
        ['Acme Review, a security tool', 'Acme Review is access review for security teams that still certify users in a spreadsheet.', 'Each quarter a security lead chases managers through a spreadsheet of who still has access. Acme Review opens that review in the tools managers already use and keeps the decision. The audit gets a finished list.']] } },
      { h: 'What to change', table: { head: ['If the pitch does this', 'Change it'], rows: [
        ['Says you are like a known product, with no job', 'Name the customer and what they do today'],
        ['Reads the for-who-unlike statement aloud', 'Keep that sentence internal. Say the category and one outcome'],
        ['Opens with the model or the architecture', 'Move the technology behind the outcome'],
        ['Could be said by a competitor', 'The capability is not unique yet. Go back to attributes']] } },
    ],
    faq: [
      { q: 'How long should a SaaS elevator pitch be?', a: 'One sentence for the short version, and about half a minute when you have the room. If you cannot say it in one breath, cut it. The elevator pitch builder on this site drafts three lengths from inputs you supply. Edit the result against real deals.' },
      { q: 'Should every rep use the same words?', a: 'They should name the same customer, category and outcome. Wording can flex. A second rep should not invent a second company.' },
      { q: 'Can the pitch open a sales call?', a: 'Yes. Then listen. You want them to repeat the job, and to compare you with the alternative you expected.' }],
    links: [P, ['/answers/what-is-a-one-liner', 'What is a one-liner'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline'], ['/answers/how-to-write-a-tagline', 'How to write a tagline'], ['/answers/positioning-statement-examples', 'Positioning statement examples'], ['/free-tools/elevator-pitch-builder', 'Build an elevator pitch']] },

  { slug: 'how-to-write-a-tagline', title: 'How to write a tagline', updated: U,
    meta: 'A tagline is a short brand line you write after positioning. Skip it when buyers still cannot tell what you do.',
    answer: 'A tagline is a short brand line, and it is not your positioning. April Dunford says positioning is not a tagline, and that you write one after the positioning is decided. Write one only when buyers can already see the category and the customer without it. If they cannot, publish the explanation and skip the line.',
    sections: [
      { h: 'A tagline comes after the decision', body: 'Dunford separates positioning from the lines that express it. Messaging, a tagline, a brand story and a vision all require the positioning as an input. A tagline cannot carry the alternatives, the value, the customer and the category. A one-liner can carry the category and the customer. Use that when the first screen still has to explain what you are. Add a tagline only beside an explanation that already works.', src: DI },
      { h: 'Steps', list: [
        ['Finish the five decisions', 'Alternatives, attributes, value, best-fit customer and category.'],
        ['Pick one outcome they already say', 'A value theme, in their words.'],
        ['Keep it short', 'It sits beside the one-liner. It does not replace the one-liner.'],
        ['Cover the line and reread', 'The category and the customer must still be obvious on the first screen.'],
        ['Drop it when the page gets worse', 'If the next paragraph has to explain the product, the line is not ready.']] },
      { h: 'Illustrative first screens', body: 'Fictional. Acme Billing is not a client. The test is what a stranger can say after the first screen alone.', table: { head: ['First screen', 'What a stranger can say'], rows: [
        ['“Get time back.”', 'Nothing yet about billing, or about accounting firms'],
        ['“Billing software for accounting firms whose owners still send the invoices.”', 'What it is, and who it is for'],
        ['That one-liner, plus “Invoices go out the day the work is done.”', 'What it is, who it is for, and one outcome']] } },
    ],
    faq: [
      { q: 'Is the homepage headline a tagline?', a: 'Not when it states the category or the outcome. A headline that only sets a mood, and needs a paragraph under it, leaves the visitor without an explanation.' },
      { q: 'Where does a tagline go if we write one?', a: 'Beside the explanation, once the explanation is clear. It does not replace the five decisions on the positioning canvas.' },
      { q: 'What if the team already loves a line?', a: 'Keep it if a stranger can still say what you sell with that line covered. If they cannot, the line is decoration.' }],
    links: [P, ['/answers/what-is-a-one-liner', 'What is a one-liner'], ['/answers/positioning-vs-branding', 'Positioning vs branding'], ['/answers/elevator-pitch-examples-saas', 'Elevator pitch examples for SaaS'], ['/answers/website-doesnt-explain-what-we-do', 'Website doesn’t explain what we do'], ['/answers/how-to-write-a-b2b-homepage-headline', 'How to write a B2B homepage headline']] },

  { slug: 'how-to-position-against-incumbents', title: 'How to position a startup against incumbents', updated: U,
    meta: 'Position against an incumbent by winning the segment and job their product does not finish, not their full checklist.',
    answer: 'Position a startup against an incumbent by refusing the comparison they are built to win. Name the segment and the job where their product is not the whole solution. Geoffrey Moore calls that a beachhead: a segment-specific problem incumbents do not serve. April Dunford’s category choice is the frame that makes your value obvious to buyers in that segment.',
    sections: [
      { h: 'Do not volunteer for their checklist', body: 'Head to head, buyers score you on criteria the leader already owns. Dunford’s quickstart describes a company she marketed that was positioned as enterprise CRM. The question in meetings was how they were better than Siebel, the leader, and on that comparison they were not. Investment banks cared about one difference: the product could model relationships in a way that showed who might influence a deal. They positioned as CRM for investment banks, the buyers who cared, instead of trying to win all of enterprise CRM. She writes that they planned to widen the category later, and did not get to test that step.', src: DQ },
      { h: 'Win a segment they have not finished', body: 'Moore’s way across the chasm is to target buyers who have an urgent problem conventional vendors have not finished, often because the problem is too specific to be their priority. Then deliver the whole product for that segment: the complete set of product and services that gives them a reason to buy. A partial product aimed at the incumbent’s entire market is the comparison you lose.', src: ['mooreBook'] },
      { h: 'Narrow a known category before you invent one', body: 'Dunford’s quickstart puts the category choice in two moves. You can take a category buyers already know and narrow it with a qualifier until your value is the obvious one. Or you can invent a frame, and then spend the sale teaching that frame before the value lands. She treats the invented frame as the expensive path.', src: DQ },
      { h: 'Three frames', table: { head: ['Frame', 'When it fits', 'What you accept'], rows: [
        ['Win the category as it is', 'You are the better choice on criteria buyers already use', 'A long comparison with the leader'],
        ['Narrow it with a qualifier', 'A group has a job the leader treats as an edge', 'You are not for the whole category yet'],
        ['Invent a new frame', 'No known category makes the value obvious', 'You teach the frame before anyone can buy']] } },
    ],
    faq: [
      { q: 'Should we name the incumbent?', a: 'In the positioning document, yes. On the homepage, name them when buyers already make that comparison. Otherwise name the job they do not finish.' },
      { q: 'Is a lower price a position against an incumbent?', a: 'Only when the model is something they cannot copy without hurting their own business. A discount is easy to match.' },
      { q: 'When do we widen the segment?', a: 'After you are the obvious choice for the beachhead, and the next group hires you for a job you can prove. In Dunford’s account, the wider category was a later test, not the opening move.' }],
    links: [P, ['/answers/how-to-reposition-a-product', 'How to reposition a product'], ['/answers/how-to-differentiate-when-competitors-copy-you', 'How to differentiate when competitors copy you'], ['/answers/positioning-for-vertical-saas', 'Positioning for vertical SaaS'], ['/answers/how-to-choose-a-market-category', 'How to choose a market category'], ['/free-tools/category-picker', 'Pick your market category']] },
]
