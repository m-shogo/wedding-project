# 2026-08-20 — Rurubu V6 HT timeline native-hierarchy subtraction

Scope: Rurubu WEDDING only
Status: ADOPTED / VERIFIED_LOCAL

## Visible problem

HR chronology remained stronger than earlier V6 studies, but three flat decorative bars/fields still read as leftover UI/timeline components after the photo and native-type hierarchy had matured.

## Principle tested

Subtract decorative containment only when photo + native text already preserve sequence, contrast and closure without it.

## Expected improvement

Less timeline-component reading; stronger original Japanese travel-magazine editorial confidence; no loss of editability or photo replaceability.

## Regression risk

Loss of grouping/contrast, weak page ending, or collisions newly exposed by larger native numerals.

## Experiment

Created rollback-safe HT `2040:2` from HR `2033:111`.

Removed/hid:
- timeline yellow kicker field;
- Event 05 editorial underline;
- WEDDING terminal rule;
- tiny kicker text after its background was removed and it no longer read at page scale.

Kept:
- Story left page;
- hero and Event 03 photo sources/hashes;
- native chronology copy;
- 02/04 minor beats;
- all photo replaceability.

Rebalanced 05/06 native typography to provide hierarchy without new boxes.

## Rejected/corrected state

First HT geometry visually improved the page, but actual-size structure QA found three Event 05 text contacts plus right-safe-area violations. That state was rejected. Event 05 number moved left; date/title/copy stack moved inward. Final structure QA returned zero collisions and zero 18px safe risks.

## Evidence

- HT spread: `2040:2`
- HT timeline page: `2040:28`
- HR rollback: `2033:111` hidden
- whole-spread visual comparison: HT preferred
- actual-size `794×1123`: PASS
- text collisions: `0`
- 18px safe-area risks: `0`
- stray text: `0`
- image roles: `2`, unchanged hashes
- generated/adopted generated/new Drive saves/new binary placement/new image hash: all `0`

## Decision

Adopt HT as live V6 Story/Chronology preferred. Preserve HR hidden as rollback. V7 remains HOLD.

## Next application

Continue comparing all six V6 spreads at the same scale. Prefer subtraction or stronger native-photo hierarchy over adding more cards/rules. Do not generalize the exact Rurubu layout to other wedding items.
