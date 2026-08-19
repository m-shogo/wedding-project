# RSL-126 — Align repeated-item visual mass with semantic responsibility

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Rurubu V6 1DAY Plan already used unequal photography, but STOP02/03/04 native numbering stayed nearly equal. The photo hierarchy said “feature / bridge / closing,” while the text hierarchy still said “four equal itinerary modules.”

## Root-cause hypothesis

Repeated information can retain UI/template character even after cards and rails are removed when native typography does not reflect the unequal editorial responsibility of each beat.

## Bounded test

On a rollback-safe duplicate of FI only:

- keep all photos, hashes, crops, times, titles, copy and metadata unchanged;
- promote native STOP02 and STOP04 numbers from 28px to 42px;
- leave STOP03 smaller as a bridge;
- do not add cards, rails, badges, photography or composed decoration;
- compare whole/thumbnail, reading and actual-size views;
- run absolute text-collision and 18px safe-area checks.

## Expected improvement

Make the itinerary read as start → mid-route feature → bridge → closing feature, matching the existing photo responsibility rather than appearing as four equal modules.

## Regression risk

- enlarged ordinals can compete with times/titles;
- hierarchy can become arbitrary if semantic responsibility is not real;
- long native copy may collide after type-scale changes;
- type hierarchy can become decorative rather than reader-facing.

## Evidence

Figma FM `1879:71`, right page `1879:102`:

- ≈500px thumbnail: PASS;
- reading scale: PASS;
- actual-size `794×1123`: PASS;
- native text `25`;
- text collisions `0`;
- 18px safe-area risks `0`;
- replaceable photos unchanged;
- new image hashes `0`.

Source FI `1863:18` remains hidden rollback.

One implementation attempt failed atomically because `/` was used inside a Figma query selector. No mutation occurred. Fingerprint: `FIGMA_QUERY_SELECTOR_SLASH_ATOMIC_FAILURE`. The successful method switched to `query('TEXT').toArray().find(...)`, rather than repeating the failed selector.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FL-FM-REVIEW-BOARD-AND-SEMANTIC-HIERARCHY-QA-2026-08-19.md`.

## What must remain Rurubu-specific

Stop numbering, colors, times, Yokohama route, exact type sizes, photo geometry and page coordinates are Rurubu-specific.

## Cross-item applicability

Candidate principle only: for repeated editorial items, visual mass should correspond to real semantic/editorial responsibility. If content is genuinely unequal, native typography may encode that inequality before adding more cards or decoration. Re-test actual-size readability and variable-copy safety after any type-scale change.
