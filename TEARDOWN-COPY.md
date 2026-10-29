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
| Book a 15 minute call | call button | Quill |
| We couldn't read that page. Try the full URL, starting with https. | blocked fetch | Quill |
| We found no text on that page. Try the full URL. | thin page | Quill |
| You've run three teardowns today. Email the URL to blake@boundset.com instead. | 3 per IP per day | Quill |
| We've hit today's limit. Try again tomorrow. | 15 per day cap | Quill |
| We've hit this month's limit. Email the URL to blake@boundset.com instead. | 300 per month cap | Quill |
| Too many requests. Try again in a minute. | 5 per IP per minute | added with the burst limit |
| Something broke on our end. Try again in a minute. | model failure | Quill |
| Teardowns are off right now. Email the URL to blake@boundset.com instead. | model not configured | Quill |
| Positioning teardown | page title “Positioning teardown \| Boundset”; /free-tools card name | FLAG |
| Website URL · Run teardown · Copy rewrite · Copied · Email · Send · Try again | aria-labels / screen-reader only | FLAG |
| Sample cards: “Attio”, “Welcome to agentic revenue.”, “The CRM whose agents enrich and route every lead the minute it arrives.” | idle state | Quill |

## /teardowns and /teardowns/attio (noindex until approved)
| String | Where | Status |
|---|---|---|
| Homepage positioning teardowns | /teardowns H1 + title | FLAG |
| Home · Teardowns · Attio | breadcrumb | FLAG (Home/Teardowns from template JSON-LD note) |
| What works | section heading | FLAG (from template “what works”) |
| Their words | side column heading | SPEC (“their words”) |
| FAQ | section heading | FLAG |
| Tear down your homepage | inline tool heading | Quill |
| Read what positioning debt is or tear down your homepage. | closing links, no heading | Quill |
| Quotes from {url} on {date}. Spot something out of date? Email blake@boundset.com. | footer | Quill |
| Attio body copy | page body | Quill, in lib/teardowns.js. FAQ quotes re-checked against attio.com on 2026-10-29. |

## Email (disabled: TEARDOWN_EMAIL_ENABLED unset)
| String | Status |
|---|---|
| Subject: Your homepage teardown: {host} | SPEC |
| Six block headings, “Book a 15 minute call” | Quill |
| From: env TEARDOWN_FROM_EMAIL | still required before send |
| Footer: postal line only when TEARDOWN_POSTAL_ADDRESS is a real address. No placeholder footer. Capture stays off without it. | Quill / CAN-SPAM |
| Reply-to: [NEEDED] (env TEARDOWN_REPLY_TO) | PH |

## FAQ edits (lib/answers.js), minimal change from the pre-r2 originals
| Entry | Before (8ad4ab7) | After | Status |
|---|---|---|---|
| What is positioning debt → “How do I know if I have positioning debt?” | Take the Boundset positioning teardown. It scores common symptoms in a few minutes. | Take the positioning debt self-check. It scores common symptoms in a few minutes. Or run the positioning teardown on your homepage. | Quill |
| …related links | /teardown “Take the positioning teardown” | /free-tools/positioning-debt-check “Take the self-check”, /teardown “Tear down your homepage” | Quill |
| Signs your positioning is wrong → “Can I check this myself?” | Yes. The positioning teardown walks through these signs. | Yes. The positioning debt self-check walks through these signs. | Quill |
| …related link | /teardown “Take the teardown” | /free-tools/positioning-debt-check “Take the self-check”, plus main’s other answer links | Quill |
