# Homepage positioning benchmark rubric, 2026

Checked 2026-11-13. Each check is yes or no from the fetched homepage. The numbers on the site are the hand reading. `scripts/homepage-benchmark.py` records a keyword first pass in the private CSV and does not change the published totals.

1. Category. The headline or the line under it names a category a buyer would type into a search box. "AI platform" alone, a metaphor, or a coined phrase does not pass.

2. Customer. The first screen names a role, a kind of company, or a stage. "Teams", "businesses", or "enterprises" alone do not pass.

3. Alternative. The first screen names the tool, the file, or the manual step the product replaces. "Faster" with no object does not pass.

4. Outcome. The headline states a result a buyer could notice. An adjective or a category label does not pass. This check looks at the headline only.

5. Proof. The title, the headline, the description, or the first 1,800 characters include a customer name, a customer count, or a result number. Investor logos, integration logos, and a press mention do not count. This was judged from the fetched text, not from a browser window.

6. Plain. From the headline and the line under it, a stranger can say what the product does in one ordinary sentence. A coined term fails unless those same lines explain it.

Ten rows, chosen with random seed 20261113 from the sorted company list, were read a second time. The two readings agreed on 59 of 60 checks. Both readings were the same person.

The public CSV has the six answers and no names. The full file is `data-private/homepage-benchmark-2026.csv` and is not deployed.
