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

## 2026-08-26 13H editorial polish pass

The live six-page production was re-read before each write and refined as an editorial system rather than by flattening pages.

- Cover: retained the dense left-side index and hero hierarchy, completed the three lower photo-pick rhythm with `BEST SHOT! / MEMORY / PICK UP`, and added a compact `ISSUE 01` marker.
- Back cover: added independent `VENUE / CAFE / TABLE` photo labels, a `PAGE 02` marker, and one-line descriptions under all four contents entries so the page reads as a real magazine index rather than a bare list.
- Profile + Q&A: converted the three questions into white bordered editorial cards, changed the top photo labels to `GROOM / BRIDE`, added `COUPLE TALK`, and replaced production-facing answer placeholders with guest-facing dummy editorial copy. `PAGE 03` remains separate and movable.
- Story + Timeline: added scrapbook-style tape to the hero photo, `PHOTO 01`, short captions for all four timeline moments, and `PAGE 04`. The four 2019/2021/2023/2026 rows remain separate editable event cards.
- Memory + Gallery: completed photo numbering `01–06`, added `PHOTO 01`, and added `PAGE 05` while retaining all six independent photo masks.
- 1DAY + Cafe/Table: added `PHOTO 01–03`, `FOOD 01–02`, and `PAGE 06`; filled the previous dead space with a guest-facing `TRIP MEMO` card instead of production instructions.

Fresh hidden rollback clones were created around these polish passes before modifying the live frames.

## QA evidence

Whole-page screenshots were regenerated throughout the polish work, including final checks of Cover, Back, Profile, Story, Memory, and 1DAY at A4 reading scale.

A structural QA pass verified:

- all six current frames remain exactly `794 × 1123` and visible;
- replaceable photo-mask counts remain exactly `4 / 3 / 2 / 2 / 6 / 5 = 22`;
- photo masks remain independent and no page was flattened;
- new page/photo labels are separate movable layers;
- rollback snapshots remain hidden and outside current production frames.

## Failure learning retained

`get_metadata` top-level page listing can omit the existing V9 page. Never conclude that V9 is absent solely from the top-level page list. Resolve `08_RURUBU_V9_RURUBU_POP_PRODUCTION` by exact name inside the Figma document before creating/replacing anything.

A Drive PNG can decode and still fail to render when transported through an unsuitable indexed-PNG route. Node creation or an `imageHash` is not visual success. Screenshot-QA the placed asset before hiding an editable fallback.

A Figma helper in the 13H pass initially assumed six-digit hex and received `#fff`; the write failed atomically with a NaN paint validation error. No live changes were applied by the failed call. Re-read live state, then retry only after normalizing to `#ffffff` (or make future color parsers support three-digit hex explicitly).

## Next pass

- Continue using the Drive folder as the visual/asset authority; inspect and place one-image-one-item assets only through a transport route proven to render.
- Build photo-frame compositions as `frame artwork above + replaceable masked dummy photo below`, so dummy photos never escape the decorative frame.
- Keep goal/reference imagery beside the production set for side-by-side comparison rather than flattening it into production.
- Continue whole-page / reading-scale / actual-size QA and remove any micro-decoration that competes with the primary scan path.
- Replace dummy photos later without changing the mask geometry or the editorial layer structure.
- Do not touch Passport, Boarding Pass, 青春ふたりきっぷ, ADD items, or V6/V7/V8 controls.
