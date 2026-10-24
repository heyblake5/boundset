# Placeholder copy for Quill (C2 v4, Oct 24 2026)

Everything below was written by Bo as a functional placeholder. None of it is approved marketing copy. Replace or approve.
No stats, proof, prices or client names were invented. Prices shown are the existing $7,500 / $12,000 / $2,000.

## Homepage (app/design/c2/page.js)
- Workshop button label: "Buy the workshop"
- Workshop button URL: `NEXT_PUBLIC_WORKSHOP_LINK` env var. **Not set: falls back to `#workshop` (in-page anchor).** No Stripe payment link for "Boundset Positioning Workshop" exists yet in High Noon LLC (checked read-only Oct 24). Heath owns creating it.
- Workshop headline, subtext and 3 checks are approved copy from handoffs/quill-atlas.md + heath.md (not placeholders).
- FAQ headline "FAQs about the sprint" is Blake's exact wording (not a placeholder).

## Navigation labels (app/design/c2/menu.js)
- Area names: Sprint, Work, Resources, Free Tools (Free Tools is Blake's wording)
- Link names: "Stake and Stronghold", "Timeline", "Pricing", "Workshop", "FAQs", "Case studies", "OriginalVoices", "Positioning guide", "Positioning vs messaging", "April Dunford alternatives", "Positioning sprint cost", "Agency vs fractional PMM", "Positioning canvas", "All free tools"

## Free tools (app/free-tools/)
- Index H1 "Free tools"; index meta description: "Free browser-based tools for founders working on positioning and messaging. No signup."
- Tool names and one-line meta descriptions: app/free-tools/tools.js (`name`, `desc`) — all 10 are placeholders
- Section heading "More free tools", link "All free tools →"
- Field labels, example placeholders and empty states in app/free-tools/_c/*.js (functional labels)
- Category picker strategy names and one-line explanations (app/free-tools/_c/Category.js `R`)
- Elevator pitch templates (app/free-tools/_c/Pitch.js), ICP sketch template (Icp.js)
- ROI calculator assumptions note (Roi.js) — formula only, no benchmarks
- Headline/value-prop checks use editable jargon/vague word lists (app/free-tools/_c/text.js) and rule-of-thumb thresholds (3–12 words, 70 chars, 40 words, 20 words/sentence). These are heuristics, not research.
- Positioning debt self-check reuses existing quiz copy (red flags + score bands) verbatim.
