#!/usr/bin/env python3
"""Homepage positioning benchmark, 2026.

Reads data-private/rows.json (company, homepage, funding source, reviewed scores,
and the hero text used for the first pass). Writes:

- data-private/homepage-benchmark-2026.csv  full file, not deployed
- public/research/homepage-positioning-benchmark-2026.csv  scores only
- lib/benchmark2026.js  totals and paraphrases for the page

The numbers on the site are the reading after the keyword pass. Both
readings were done by the same reviewer, an AI model. The script columns
are a keyword first pass over the saved hero text.

Rubric, each check is yes or no from the fetched homepage on 2026-11-12.

1. Category. The headline (the H1) or the line under it (the meta description,
   or the first sentence of body text) names a category a buyer would type
   into a search box. "CRM", "warranty software", "EV charging platform" pass.
   "AI platform" alone, a metaphor, or a coined phrase does not.

2. Customer. That same first screen names who it is for: a role, a kind of
   company, or a stage. "Benefits teams" and "manufacturers" pass. "Teams",
   "businesses", or "enterprises" alone do not.

3. Alternative. The first screen names the thing the product replaces or the
   old way of doing the job: a tool, a file format, a manual step, or a named
   status quo. "Faster" or "better" with no object does not pass.

4. Outcome. The headline states a result a buyer could notice. An adjective,
   a vibe, or a category label does not pass. This check looks at the H1 only.

5. Proof. Above the fold there is a customer logo, a result or customer-count
   number, or a customer quote. Above the fold here means the title, the H1,
   the meta description, and the first 1,800 characters of visible text.
   Investor logos, integration logos, a press mention, and a product price
   do not count. We did not open a browser window.

6. Plain. From the headline and the line under it, a stranger can say what
   the product does in one ordinary sentence. A coined term fails this check
   unless those same two lines explain it.

Reviewed scores use Y or N in rows.json field "scores", six characters in the
order above. Ten companies, chosen with random seed 20261113, were read a
second time. Their "rescore" field is that second reading.
"""
import csv, json, pathlib, random, re

ROOT = pathlib.Path(__file__).resolve().parents[1]
ROWS = ROOT / 'data-private' / 'rows.json'
FULL = ROOT / 'data-private' / 'homepage-benchmark-2026.csv'
PUBLIC = ROOT / 'public' / 'research' / 'homepage-positioning-benchmark-2026.csv'
JS = ROOT / 'lib' / 'benchmark2026.js'
KEYS = ['category', 'customer', 'alternative', 'outcome', 'proof', 'plain']
CHECKED = '2026-11-12'

# Keyword first pass. A hit is not a reading. It only flags the hero text.
CAT = r'\b(software|platform|crm|ats|security|compliance|analytics|runtime|warranty|procurement|accounting|kubernetes|localization|charging|testing|payments|recruit|fraud|desktop|messaging|benchmark|cad|gateway|monitoring|workspace)\b'
CUST = r'\b(manufacturers|accountants|teachers|clinicians|hospitals|recruiters|contractors|dealerships|insurers|payers|builders|advisors|brands|agencies|banks|fintechs|developers|cisos|operators|firms)\b'
ALT = r'\b(replace[sd]?|instead of|spreadsheet|legacy|without|alternative to|goodbye|manual)\b'
OUT = r'\b(faster|revenue|margin|save[sd]?|stop|less time|more revenue|sooner)\b'
PROOF = r'\b(\d[\d,.]*%|\d[\d,.]*\+|trusted by|customers include)\b'
PLAIN_BAD = r'\b(agentic|world model|atmosphere|operating system for the)\b'

def first_pass(hero):
    t = (hero or '').lower()
    if len(t) < 40:
        return 'NNNNNN'
    bits = [
        'Y' if re.search(CAT, t) else 'N',
        'Y' if re.search(CUST, t) else 'N',
        'Y' if re.search(ALT, t) else 'N',
        'Y' if re.search(OUT, t) else 'N',
        'Y' if re.search(PROOF, t) else 'N',
        'N' if re.search(PLAIN_BAD, t) else 'Y',
    ]
    return ''.join(bits)

def yn(s, i):
    return 1 if s[i] == 'Y' else 0

def main():
    rows = json.loads(ROWS.read_text())
    if len(rows) != 100:
        raise SystemExit(f'expected 100 rows, got {len(rows)}')
    names = [r['company'] for r in rows]
    if len(set(names)) != 100:
        raise SystemExit('duplicate company')
    # Seed is applied to the sorted company list so the ten rows stay fixed.
    picked = set(random.Random(20261113).sample(sorted(names), 10))
    for r in rows:
        sc = r['scores']
        if len(sc) != 6 or set(sc) - set('YN'):
            raise SystemExit(f'bad scores for {r["company"]}')
        r['script'] = first_pass(r.get('hero') or '')
        if r['company'] in picked:
            rs = r.get('rescore')
            if not rs or len(rs) != 6 or set(rs) - set('YN'):
                raise SystemExit(f'rescore missing for {r["company"]}')
        elif r.get('rescore'):
            raise SystemExit(f'unexpected rescore on {r["company"]}')
    agreed = 0
    for r in rows:
        if r['company'] not in picked:
            continue
        agreed += sum(1 for i in range(6) if r['scores'][i] == r['rescore'][i])
    totals = [sum(yn(r['scores'], i) for r in rows) for i in range(6)]
    FULL.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    fields = ['company', 'homepage_url', 'funding_source_url', 'date_checked', 'stage',
              'category', 'customer', 'alternative', 'outcome', 'proof', 'plain',
              'script_category', 'script_customer', 'script_alternative', 'script_outcome', 'script_proof', 'script_plain',
              'rescore_category', 'rescore_customer', 'rescore_alternative', 'rescore_outcome', 'rescore_proof', 'rescore_plain']
    with FULL.open('w', newline='') as f:
        w = csv.DictWriter(f, fields, lineterminator='\n')
        w.writeheader()
        for r in rows:
            row = {
                'company': r['company'],
                'homepage_url': r['homepage'],
                'funding_source_url': r['funding_source'],
                'date_checked': CHECKED,
                'stage': r['stage'],
            }
            for i, k in enumerate(KEYS):
                row[k] = r['scores'][i]
                row['script_' + k] = r['script'][i]
                row['rescore_' + k] = r['rescore'][i] if r.get('rescore') else ''
            w.writerow(row)
    with PUBLIC.open('w', newline='') as f:
        w = csv.writer(f, lineterminator='\n')
        w.writerow(['row', 'stage', *KEYS])
        for i, r in enumerate(rows, 1):
            w.writerow([i, r['stage'], *list(r['scores'])])
    # Public module: totals only. No company names.
    checks = [
        {'id': 'plain', 'name': 'Plain', 'n': totals[5],
         'q': 'The headline plus the line under it say what the product does in literal words, with no metaphor or slogan.',
         'pass': 'Those two lines name the job in literal words, such as an API for a named kind of payment.',
         'fail': 'Those two lines are a metaphor or a slogan, such as a living replica or beating someone at their own game.'},
        {'id': 'category', 'name': 'Category', 'n': totals[0],
         'q': 'The headline or the line under it names a category a buyer would search for.',
         'pass': 'The first line uses a noun a buyer already types, such as a kind of software or a kind of platform, and stops.',
         'fail': 'The first line is a mood or a made-up market, and the category shows up only after the reader scrolls.'},
        {'id': 'customer', 'name': 'Customer', 'n': totals[1],
         'q': 'The first screen names who it is for.',
         'pass': 'The first screen names a role or a kind of company, specific enough that the wrong reader would not see themselves.',
         'fail': 'The first screen says teams, businesses, or enterprises, and could be for anyone who buys software.'},
        {'id': 'proof', 'name': 'Proof', 'n': totals[4],
         'q': 'Proof sits above the fold.',
         'pass': 'A customer name, a customer count, or a result number sits in the first screen, next to the claim.',
         'fail': 'The first screen is a slogan and a button. The only logos are investors, or the press.'},
        {'id': 'outcome', 'name': 'Outcome', 'n': totals[3],
         'q': 'The headline states an outcome, not an adjective.',
         'pass': 'The headline says a change the buyer could notice, such as a job finished or money kept.',
         'fail': 'The headline is a stack of adjectives, or it only names the category.'},
        {'id': 'alternative', 'name': 'Alternative', 'n': totals[2],
         'q': 'The first screen names the alternative or the old way.',
         'pass': 'The first screen names the tool, the file, or the manual step the buyer would use if this product did not exist.',
         'fail': 'The page says faster or smarter, and never says faster than what.'},
    ]
    # sort chart most passed to least; keep the list order as the chart order
    checks.sort(key=lambda c: -c['n'])
    opening = (
        'We checked 100 homepages of B2B software companies that raised a seed or Series A in 2026. '
        f'{totals[0]} of 100 name a category buyers search for in the first lines. '
        f'{totals[2]} name the alternative they replace. '
        f'Only {totals[4]} show proof above the fold. '
        'The method and the scores are below.'
    )
    words = re.findall(r"[A-Za-z0-9$%]+(?:'[A-Za-z]+)?", opening)
    if not 40 <= len(words) <= 60:
        raise SystemExit(f'opening is {len(words)} words')
    seed_n = sum(1 for r in rows if r['stage'] == 'Seed')
    series_n = sum(1 for r in rows if r['stage'] == 'Series A')
    data = {
        'n': 100,
        'checked': CHECKED,
        'seed': seed_n,
        'seriesA': series_n,
        'opening': opening,
        'agreement': {'rows': 10, 'checks': 60, 'agreed': agreed},
        'checks': checks,
    }
    JS.write_text('// Generated by scripts/homepage-benchmark.py. Totals only.\nexport const BENCHMARK = ' + json.dumps(data, indent=2) + '\n')
    print('opening words', len(words))
    print('totals', dict(zip(KEYS, totals)))
    print('agreement', agreed, 'of 60')
    print('seed', seed_n, 'series A', series_n)

if __name__ == '__main__':
    main()
