// Test-only fixtures (TEARDOWN_MOCK=1). Attio output is the internal test output from teardown-prompt.md.
export const FIXTURE_HTML = "<!doctype html><html><head><title>Attio: The CRM for agentic revenue</title><meta name=\"description\" content=\"Attio is the CRM for agentic revenue.\"></head><body>\n<nav><a href=\"/pricing\">Pricing</a><a href=\"/login\">Sign in</a></nav>\n<h1>Welcome to agentic revenue.</h1><p>The intelligent system that never sleeps. Picks up leads at 2am. Catches renewals before they slip. Hands you the answer before you ask.</p>\n<h2>For the people who own the number.</h2><p>Build pipeline, accelerate deals, and grow accounts.</p>\n<h3>Speed to lead, every time.</h3><p>New leads get enriched, scored, and routed to the right rep before they ever cool off.</p>\n<h3>Renewals that never slip</h3><p>Agents watch every account and flag risk early, so your team acts before the quarter ends.</p>\n<h3>Answers before you ask</h3><p>Ask about any deal and get the context, history and next step in one place, written from your own data.</p>\n<p>Contact sales@attio.example or call +1 (415) 555-0100.</p><script>evil()</script></body></html>"
export const FIXTURE_RESULT = {
 "says_it_is": {
  "summary": "A CRM with AI agents that work leads, deals and renewals for revenue teams.",
  "quote": "The CRM for agentic revenue"
 },
 "for_whom": {
  "summary": "Revenue teams and the people who own the number. Stated, but no company stage or size is given.",
  "quote": "For the people who own the number.",
  "clear": true
 },
 "up_against": {
  "summary": "Legacy CRMs and the reps' manual follow-up work. Neither is named; \"never sleeps\" implies the alternative is a human team working business hours.",
  "named_on_page": false
 },
 "strongest_claim": {
  "quote": "New leads get enriched, scored, and routed to the right rep before they ever cool off.",
  "why": "It's a specific outcome a sales leader can picture and measure."
 },
 "gaps": [
  {
   "title": "The H1 is a category you coined",
   "quote": "Welcome to agentic revenue.",
   "problem": "A new term asks the buyer to learn your vocabulary before they know what you do. The CRM, which is the thing they're shopping for, only appears in the title tag.",
   "fix": "Say CRM in the H1 and let agents be the difference."
  },
  {
   "title": "The alternative is unnamed",
   "quote": "The intelligent system that never sleeps.",
   "problem": "\"Never sleeps\" compares you to humans, not to the CRM the buyer would otherwise use. Buyers decide between tools, and the page doesn't say why this beats the one they have.",
   "fix": "Name what they're leaving, such as a CRM that only records what reps type in, and show what agents do instead."
  },
  {
   "title": "The best line sits in an H3",
   "quote": "Speed to lead, every time.",
   "problem": "Your most concrete outcomes are buried in feature cards below the fold, while the top of the page carries the abstract claims.",
   "fix": "Promote speed-to-lead to the subhead."
  }
 ],
 "rewrite": {
  "hero": "The CRM whose agents enrich, route and follow up on every lead.",
  "why": "It names the category buyers search for and puts the difference in their terms."
 }
}
