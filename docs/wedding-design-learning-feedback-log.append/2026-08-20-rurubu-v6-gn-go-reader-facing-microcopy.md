# 2026-08-20 — Rurubu V6 GN / GO reader-facing microcopy

Scope: Rurubu WEDDING only.

## Visible problem

Two otherwise mature V6 spreads still carried small generic English role labels and duplicated closing helper copy. At actual size these details read less like finished Japanese travel-magazine editing and more like production-template residue.

## Principle tested

Before adding decoration or changing layout, test whether small non-factual role labels can be rewritten as reader-facing native editorial language, and whether duplicated helper copy can be removed while preserving the stronger editorial statement.

## Expected improvement

Reduce AI-template / work-in-progress residue, strengthen Japanese editorial voice, and keep the existing photo-led hierarchy intact.

## Regression risk

Over-localizing every English label could flatten the travel-magazine genre. Intentional brand/category English should remain when it has a visible editorial role.

## Experiment A — GN Profile/Q&A

- source GA `1922:2`;
- adopted GN `1957:2`;
- `TRAVEL PROFILE` → `ふたりの旅プロフィール`;
- `TRAVELER DATA / 6 NOTES` → `6つの旅メモ`;
- duplicate bottom kicker hidden; stronger native closing retained;
- 1200px whole PASS;
- left/right actual-size PASS;
- text collision 0;
- 18px safe-area risk 0;
- images/hash/geometry unchanged.

Status: `ADOPTED / VERIFIED_LOCAL`.

## Experiment B — GO Story/chronology

- source GI `1950:2`;
- adopted GO `1958:2`;
- converted six small role-like labels into reader-facing Japanese editorial microcopy;
- 500px thumbnail PASS;
- 1200px reading PASS;
- both 794×1123 actual-size pages PASS;
- text collision 0;
- 18px safe-area risk 0;
- images/hash/geometry unchanged.

Status: `ADOPTED / VERIFIED_LOCAL`.

## Evidence

`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GN-GO-READER-FACING-MICROCOPY-QA-2026-08-20.md`

## Next application

Continue auditing only reader-visible microcopy that still reads like an internal role name or generic template label. Do not mass-rewrite intentional English masthead/category language and do not use this as a reason to alter other Wedding items.