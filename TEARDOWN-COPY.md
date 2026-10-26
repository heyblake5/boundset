# Teardown: every user-visible string (for Quill)
Source of truth in code: `components/teardown/copy.js` (UI), `lib/teardowns.js` (Attio page, verbatim from teardown-template.md), `lib/teardown/email.js` (email), `lib/answers.js` (FAQ), `app/free-tools/tools.js` (tool name).
Status key: **SPEC** = verbatim from spec-for-atlas.md / teardown-template.md · **FLAG** = written or edited by Atlas, needs Quill · **PH** = placeholder, must be replaced.

## /teardown (tool)
| String | Where | Status |
|---|---|---|
| Your homepage should say who it’s for and what it beats | H1, meta description | SPEC (period dropped as a heading) |
| yourcompany.com | input placeholder | SPEC |
| What it says it is · Who it’s for · What it’s up against · Strongest claim · 3 gaps · Rewritten hero line | result block headings | SPEC |
| Their page | collapsible column heading | SPEC (“their page”) |
| Send this to my inbox | email heading (only shown when email is enabled) | SPEC |
| Sent to {email} | email confirmation | SPEC |
| Book a 15-minute call | call button | SPEC |
| We couldn’t read that page. | fetch failed/blocked/non-HTML; also used for model failure | SPEC (reuse for model failure = FLAG) |
| That page renders without readable text. Try the full URL. | thin page | SPEC |
| You’ve run three today. + link “Email us the URL instead?” (mailto:blake@boundset.com) | per-IP limit | SPEC (mailto address = FLAG) |
| We’re at capacity this month | daily or monthly cap | SPEC (also shown for the 15/day cap = FLAG) |
| [TEARDOWN UNAVAILABLE LINE NEEDED] | model not configured | PH |
| Positioning teardown | page title “Positioning teardown \| Boundset”; /free-tools card name | FLAG |
| Website URL · Run teardown · Copy rewrite · Copied · Email · Send · Try again | aria-labels / screen-reader only | FLAG |
| Sample cards: “Attio”, “Welcome to agentic revenue.”, “The CRM whose agents enrich, route and follow up on every lead.” | idle state | SPEC (from lib/teardowns.js) |

## /teardowns and /teardowns/attio (noindex until approved)
| String | Where | Status |
|---|---|---|
| Homepage positioning teardowns | /teardowns H1 + title | FLAG |
| Home · Teardowns · Attio | breadcrumb | FLAG (Home/Teardowns from template JSON-LD note) |
| What works | section heading | FLAG (from template “what works”) |
| Their words | side column heading | SPEC (“their words”) |
| FAQ | section heading | FLAG |
| Run yours | inline tool heading | SPEC |
| Quotes from {url} on {date}. Spot something out of date? Email [BOUNDSET ADDRESS]. | footer | SPEC + PH |
| All Attio content (h1, answer, hero, works, saysItIs, forWhom, upAgainst, strongest, gaps, rewrite, faq, related labels) | page body | SPEC (verbatim lib/teardowns.js) |

## Email (disabled: TEARDOWN_EMAIL_ENABLED unset)
| String | Status |
|---|---|
| Subject: Your homepage teardown: {host} | SPEC |
| Six block headings, “Book a 15-minute call” | SPEC |
| From: [BRAND SENDER ADDRESS NEEDED] (env TEARDOWN_FROM_EMAIL) | PH |
| Footer: High Noon LLC, [ADDRESS NEEDED] · Unsubscribe | PH / FLAG (“Unsubscribe”) |
| Reply-to: [NEEDED] (env TEARDOWN_REPLY_TO) | PH |

## FAQ edits (lib/answers.js), minimal change from the pre-r2 originals
| Entry | Before (8ad4ab7) | After | Status |
|---|---|---|---|
| What is positioning debt → “How do I know if I have positioning debt?” | Take the Boundset positioning debt quiz. It scores common symptoms in a few minutes. | Take the Boundset positioning teardown. It scores common symptoms in a few minutes. | FLAG: the teardown gives no score; “scores common symptoms” is now inaccurate |
| …related link | /quiz “Take the positioning debt quiz” | /teardown “Take the positioning teardown” | FLAG |
| Signs your positioning is wrong → “Can I check this myself?” | Yes. The positioning debt quiz walks through these signs. | Yes. The positioning teardown walks through these signs. | FLAG |
| …related link | /quiz “Take the quiz” | /teardown “Take the teardown” | FLAG |
