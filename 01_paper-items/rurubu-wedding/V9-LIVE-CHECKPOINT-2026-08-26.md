# Rurubu WEDDING V9 — Live Figma Checkpoint (2026-08-26)

## Scope

This checkpoint records only the dedicated V9 Rurubu production in the existing production Figma file.

- Figma file key: `bfM0d4c9dCeBv5pCkJ3TNM`
- V9 page: `08_RURUBU_V9_RURUBU_POP_PRODUCTION` (`2601:2`)
- Page format: six separate A4 portrait pages, `794 × 1123`
- Do not overwrite V6/V7/V8 controls or other paper items.
- V9 Drive authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup`

## Six current production frames

1. Cover — `2601:3`
2. Back cover — `2601:4`
3. Profile + Q&A — `2601:5`
4. Story + Timeline — `2601:6`
5. Memory + Gallery — `2601:7`
6. 1DAY + Cafe/Table — `2601:8`

## Structure verified in live Figma

- 22 `PHOTO_MASK / ... / REPLACEABLE` nodes remain independently replaceable in the six current production frames.
- Per-page mask counts are 4 / 3 / 2 / 2 / 6 / 5.
- Photo masks keep image fills; page-level images are not flattened.
- Generated Profile title remains a separate movable image layer: `2603:2`.
- Native editable title/chip treatments remain separate from photos.
- Existing V9 Drive placeholder layers remain separate, including Wedding Guide `2621:113` and Timeline `2621:114`.

## 2026-08-26 magazine parts pass

Before mutation, exact-name lookup re-confirmed the live V9 page and all six production frames. The Drive authority was re-listed and confirmed to contain a large asset pool, including three Rurubu WEDDING logo variants, BEST SHOT/PICK UP/date badges, generated section titles, and many newly generated PNG parts.

Six hidden rollback clones were created before this pass at canvas y=5100.

A coherent magazine micro-decoration pass then added 12 separate movable V9 parts, two per production page. These are native editable layers, not flattened into photos:

- Cover: `YOKOHAMA WEDDING TRIP`, `MUST SEE!`
- Back: `SPECIAL CONTENTS`, `KEEP THIS BOOK`
- Profile/Q&A: `COUPLE FILE`, `3 QUESTIONS`
- Story/Timeline: `OUR STORY`, `2019 → 2026`
- Memory/Gallery: `BEST SHOTS`, `6 MEMORIES`
- 1DAY/Cafe: `1 DAY ROUTE`, `CAFE & TABLE`

The treatment deliberately follows the approved Rurubu-pop language: compact rounded pills, high-contrast cyan/pink/yellow/blue accents, dense editorial signposting, and independent movable parts.

## QA evidence

Whole-page screenshots were regenerated for all six current production frames after the write.

A structural QA pass then re-read the live Figma and verified:

- all six current frames remain exactly `794 × 1123`;
- replaceable photo-mask counts remain exactly `4 / 3 / 2 / 2 / 6 / 5 = 22`;
- all 12 new `V9 PART / ... / MOVEABLE` frames are present and visible;
- no direct child exceeds the A4 bottom edge;
- no photo mask was replaced, merged, or flattened by this pass.

## Failure learning retained

`get_metadata` top-level page listing can omit the existing V9 page. Never conclude that V9 is absent solely from the top-level page list. Resolve `08_RURUBU_V9_RURUBU_POP_PRODUCTION` by exact name inside the Figma document before creating/replacing anything.

A Drive PNG can decode and still fail to render when transported through an unsuitable indexed-PNG route. Node creation or an `imageHash` is not visual success. Screenshot-QA the placed asset before hiding an editable fallback.

## Next pass

- Continue using the Drive folder as the visual/asset authority; inspect and place one-image-one-item assets only through a transport route proven to render.
- Build photo-frame compositions as `frame artwork above + replaceable masked dummy photo below`, so dummy photos never escape the decorative frame.
- Keep goal/reference imagery beside the production set for side-by-side comparison rather than flattening it into production.
- Refine page-specific hierarchy after whole-page and actual-size QA; remove any micro-decoration that competes with the primary reading order.
- Do not touch Passport, Boarding Pass, 青春ふたりきっぷ, ADD items, or V6/V7/V8 controls.
