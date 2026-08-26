# Rurubu WEDDING V9 — Current Production Checkpoint

Updated: 2026-08-27
Scope: Rurubu WEDDING V9 only

## Live authorities

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Drive asset pool/reference authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup / RURUBU_V9`

## Six current production frames

- `2601:3` — Cover
- `2601:4` — Back Cover
- `2601:5` — Profile + Q&A
- `2601:6` — Story + Timeline
- `2601:7` — Memory + Gallery
- `2601:8` — 1DAY + Cafe/Table

All six remain `794×1123`.

## Current editorial state

V9 is now in publication-level refinement. Existing Drive assets are optional design material, not inventory that must be consumed. Readability, Japanese hierarchy, photo rhythm, page balance and authentic magazine pacing override decoration count.

Earlier passes removed redundant UI-like cards/pills, opened Profile Q&A and Story Timeline into print-editorial typography, narrowed the Story year rail, enlarged its hero field, editorialized Cover supporting-photo captions, removed empty helper shells, and retained only functional labels/routes.

## 2026-08-27 print-readability pass

A further whole-publication audit found several residual helper micro-labels that duplicated information already communicated by page titles, photography or editorial captions. These were hidden rather than deleted, after first cloning all six production frames as hidden rollback snapshots.

### Removed from the live reading layer

- Cover: redundant `YOKOHAMA / TRIP / PEOPLE`, `YOKOHAMA WEDDING TRIP`, `MUST SEE!` helper labels.
- Back Cover: redundant `SPECIAL CONTENTS` and `KEEP THIS BOOK` micro-labels; the actual contents hierarchy remains.
- Profile: `NEXT → STORY`, `COUPLE FILE`, `3 QUESTIONS`; functional `TRAVEL / FOOD / PHOTO` tags remain.
- Story: `FIRST MEET / FIRST TRIP / WEDDING DAY / OUR JOURNEY`; the actual year/event/caption chronology remains.
- Memory: `NEXT → 1DAY`, `BEST SHOTS`, `6 MEMORIES`; functional `PLACE / PEOPLE / FOOD` and photo captions remain.
- 1DAY: footer navigation/helper labels, duplicate `1 DAY ROUTE / CAFE & TABLE` micros, and `STOP 01–04` mini pills; the time-route, stop headings, editorial notes and main Cafe/Table section remain.

### Print-size readability improvements

- Back Cover photo captions `VENUE / CAFE / TABLE`: 11 px → 12 px.
- Memory lower photo captions `BEACH TRIP / DINNER / CAFE TIME`: 10.5 px → 12 px with slightly expanded text boxes.
- 1DAY travel-note body: 13 px → 14 px.

This pass intentionally does not add new generated assets. The goal is to make the current six-page dummy-content edition read like an edited publication rather than an asset showcase.

## Rollback evidence

All six production frames were cloned immediately before the print-readability pass as hidden nodes named:

`ROLLBACK / V9 READABILITY PASS / 1787777299849 / <production frame name>`

Earlier rollback snapshots also remain hidden. No rollback node is a production candidate.

## Structural QA after print-readability pass

PASS across all six current production frames:

- A4 size: `794×1123` × 6
- visible replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding visible frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- visible node overflow outside page bounds: 0
- visible text below 10.5 px: 0
- visible rollback nodes: 0
- pages remain editable; no whole-page flattening introduced

## Current design decision

`VERIFIED_LOCAL`: V9 benefits more from selective subtraction and print-size typography than from additional decorative assets at this stage. Magazine density should come from photography, headline hierarchy, asymmetry, captioning and useful indexing—not from exhausting the Drive asset inventory.

Do not remove functional labels merely to reduce count. Keep a line, tag, frame, route or container when it visibly improves binding, indexing, scan path or physical/editorial meaning.

## Next implementation target

1. inspect the six pages at actual reading scale for the weakest remaining Japanese headline/body spacing and photo crops;
2. refine photo hierarchy/crop only where the dummy image composition is visibly weak, preserving replaceable masks and frame-above/photo-below structure;
3. continue reducing web-UI grammar only when a concrete visual problem remains;
4. selectively use existing Drive artwork only when it solves a concrete editorial role;
5. generate missing assets later as one batch after the assembled six pages expose specific gaps.

Final real-content / print-ready remains blocked on final real photography/copy and printer bleed/trim/preflight/physical proof.