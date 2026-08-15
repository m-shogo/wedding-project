# るるぶWEDDING V6 — AM Long Answer Stress

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production preferred: AM `1380:18`
Stress proof: `1381:18 / QA_HIDDEN / V6_AM_LONG_ANSWER_STRESS_2026_08_16`
Stress Q&A page: `1381:46`
Observed GitHub main before write: `973ba83c99caa96c4ea80a89f3e48f2ee97b6de7`

## Why this proof was required

AM changed the Q&A geometry materially from AL. Therefore the older AL/AK long-answer proof could not be treated as geometry-authoritative for the new vertical interview column.

## Test

A rollback-safe clone of AM was created. Only the six native answer strings were replaced with realistic longer Japanese answers covering:

- first impression;
- favorite qualities;
- activities enjoyed together;
- future challenges;
- gratitude;
- desired future household.

The production AM geometry, image roles, questions, title hierarchy and closing photo/quote structure were not changed.

The test strings intentionally exceed the short production placeholders and render as realistic multi-line Japanese copy.

## Rendered evidence

Actual Q&A page `1381:46` was reviewed at native `794×1123`.

Result: PASS.

Programmatic readback:

- text/text bounding-box collisions: `0`
- 18 px text safe-area risks: `0`
- no answer overlaps the next question group
- no answer collides with the photo anchor
- no bottom/footer overflow

The stress screenshot also confirms that longer Japanese copy remains readable and does not collapse the intended `01→06` vertical sequence.

## Cleanup

After verification, stress root `1381:18` was hidden and preserved as QA evidence. It was not promoted to production and does not modify AM production copy.

## Decision

`AM_LONG_ANSWER_STRESS_PASS / GEOMETRY_VERIFIED / ROLLBACK_SAFE`.

This closes the geometry-specific answer-copy uncertainty introduced by AM. Final real user copy must still be rerendered when available.