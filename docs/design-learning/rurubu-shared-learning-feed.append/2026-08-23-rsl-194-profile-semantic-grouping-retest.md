# RSL-194 reinforcement — Profile facts semantic-grouping retest

Date: 2026-08-23
Scope: Rurubu WEDDING / V7 Profile+Q&A
Parent learning: `RSL-194 — equal row rhythm survives card subtraction`
State remains: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Why this is reinforcement

V7 Profile E showed the same deeper failure family in a different visual form. There were no visible card containers, but six biographical facts were still represented as six equal numbered records in a regular 2×3 layout. The result remained database/dashboard-like because semantic differences between basic facts, interests, routine and personality were visually flattened.

## Test

Baseline:
- `2059:50 / V7 Profile+Q&A E`.

Rollback-safe candidate:
- `2301:2 / V7 Profile+Q&A J / SEMANTIC GROUPING / TESTED_LOCAL`.

Method:
- preserve all six factual values as native text;
- remove only the six left-page numeric record markers;
- group/pace the facts by editorial meaning instead of equal slots;
- remove generic English schema furniture on the Profile/Q&A labels;
- preserve existing photo/Q&A structure;
- do not add cards, decoration or a fixed title simply for consistency with other V7 spreads.

QA:
- 500 px: PASS;
- 1400 px: PASS;
- actual-size 1587×1123: PASS;
- visible native text: 34;
- intersections: 0 after one text-box-width correction;
- 18 px safe risks: 0;
- explicit accidental one-character Japanese lines: 0.

## Learning refinement

RSL-194 is strengthened from “equal rows can remain UI-like after card subtraction” to a more general local hypothesis:

> Removing containers is insufficient when semantically different editorial facts are still assigned equal numbered slots, equal cadence and equal visual weight. Before adding asymmetry for style, group information by its actual reader/editorial job.

This does **not** mean all profile facts must be visually unequal. If the content genuinely has equal status, a regular list can be appropriate. The correction must be content-owned rather than random staggering.

## Production failure caught

The first J structure QA found overlapping text boxes for `神奈川県` and `1991年` even though visible glyphs were separated. Their inherited widths were narrowed and structure QA was rerun to 0 intersections. This reinforces the distinction between visual QA and editable-structure QA.

## Cross-item boundary

This is still evidence from the same Rurubu item. Do not promote to `VERIFIED_CROSS_ITEM` or a project-wide rule from this retest. The exact coordinates, scale hierarchy and coral/photo composition remain V7-specific.

Dedicated evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-PROFILE-J-SEMANTIC-GROUPING-QA-2026-08-23.md`.
