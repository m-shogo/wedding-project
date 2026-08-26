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

V9 is in publication-level refinement. Existing Drive assets are optional design material, not inventory that must be consumed. Readability, Japanese hierarchy, photo rhythm, page balance and authentic magazine pacing override decoration count.

Earlier passes removed redundant UI-like cards/pills, opened Profile Q&A and Story Timeline into print-editorial typography, narrowed the Story year rail, enlarged its hero field, editorialized Cover supporting-photo captions, removed empty helper shells, and retained only functional labels/routes.

## 2026-08-27 print-readability pass

A whole-publication audit removed residual helper micro-labels that duplicated page titles, photography or editorial captions, while preserving functional indexing labels and chronology. Back Cover photo captions were raised to 12 px, Memory lower photo captions to 12 px, and the 1DAY travel-note body to 14 px. No new generated assets were added.

Rollback snapshot prefix:

`ROLLBACK / V9 READABILITY PASS / 1787777299849 / ...`

## 2026-08-27 editorial-rhythm pass

A new reading-scale review identified three concrete composition issues and corrected them without adding decorative inventory.

### Cover

- Tightened the layered `るるぶWEDDING` masthead upward by 12 px.
- Raised the main cover sub-head by 12 px.
- This reduces unused yellow-header space and strengthens the magazine masthead entry point without changing the hero/photo-mask structure.

### Back Cover

- Hid the remaining visually empty helper/index shell above `この本の中身`.
- The contents title now enters directly from the photo block, removing a residual empty UI-like pill.

### Story + Timeline

- Enlarged the replaceable supporting photo from `205×160` to `230×176` and kept its matching frame overlay geometrically identical.
- Shifted the `TIMELINE` title group to form a clearer two-column bridge beside the supporting photo.
- Added one plain editorial bridge line, `4つの出来事でたどる、ふたりの旅。`, plus a thin cyan rule. This is native editable text/geometry, not a badge/card.
- The bridge fills the previously weak transition between the upper photo/story lead and the year chronology while preserving the open editorial layout.

Rollback snapshot prefix for all three touched pages:

`ROLLBACK / V9 EDITORIAL RHYTHM PASS / 1787784699934 / ...`

## Structural QA after editorial-rhythm pass

PASS across all six current production frames:

- A4 size: `794×1123` × 6
- visible replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding visible frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- photo/frame geometry mismatches: 0
- visible node overflow outside page bounds: 0
- visible text below 10.5 px: 0
- visible rollback nodes: 0
- pages remain editable; no whole-page flattening introduced

## Current design decision

`VERIFIED_LOCAL`: V9 benefits more from selective subtraction, print-size typography, photo hierarchy and deliberate page-to-page pacing than from additional decorative assets at this stage. Magazine density should come from photography, headline hierarchy, asymmetry, captioning and useful indexing—not from exhausting the Drive asset inventory.

The Story test further supports a narrower principle: when a page becomes too empty after removing UI-like helpers, restore hierarchy with editorial text, crop/scale and simple rules before reintroducing badges/cards.

Do not remove functional labels merely to reduce count. Keep a line, tag, frame, route or container when it visibly improves binding, indexing, scan path or physical/editorial meaning.

## Next implementation target

1. inspect Cover / Profile / Memory / 1DAY at actual reading scale for remaining weak photo crops or headline/body spacing;
2. refine photo hierarchy only where the dummy composition is visibly weak, preserving replaceable masks and frame-above/photo-below structure;
3. continue reducing web-UI grammar only where a concrete visual problem remains;
4. selectively use existing Drive artwork only when it solves a concrete editorial role;
5. generate missing assets later as one batch after the assembled six pages expose specific gaps.

Final real-content / print-ready remains blocked on final real photography/copy and printer bleed/trim/preflight/physical proof.