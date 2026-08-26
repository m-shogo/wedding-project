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

## Folio convention verified from live Figma

The current publication treats the cover as the implicit first page and does not print a numeric folio on the cover or back cover.

- Profile + Q&A: `PAGE 02`
- Story + Timeline: `PAGE 03`
- Memory + Gallery: `PAGE 04`
- 1DAY + Cafe/Table: `PAGE 05`
- Back cover: `BACK COVER`

Older checkpoint prose that referred to these as PAGE 03–06 was stale documentation; the live Figma labels above are the current authority.

## 2026-08-26 magazine parts pass

Before mutation, exact-name lookup re-confirmed the live V9 page and all six production frames. The Drive authority was re-listed and confirmed to contain a large asset pool, including three Rurubu WEDDING logo variants, BEST SHOT/PICK UP/date badges, generated section titles, and many newly generated PNG parts.

Six hidden rollback clones were created before this pass at canvas y=5100.

A coherent magazine micro-decoration pass then added separate movable V9 parts. These are native editable layers, not flattened into photos. The treatment follows the approved Rurubu-pop language: compact rounded pills, high-contrast cyan/pink/yellow/blue accents, dense editorial signposting, and independent movable parts.

## 2026-08-26 13H editorial polish pass

The live six-page production was re-read before each write and refined as an editorial system rather than by flattening pages.

- Cover: retained the dense left-side index and hero hierarchy, completed the three lower photo-pick rhythm with `BEST SHOT! / MEMORY / PICK UP`, and added a compact `ISSUE 01` marker.
- Back cover: added independent `VENUE / CAFE / TABLE` photo labels and one-line descriptions under all four contents entries so the page reads as a real magazine index rather than a bare list.
- Profile + Q&A: converted the three questions into white bordered editorial cards, changed the top photo labels to `GROOM / BRIDE`, added `COUPLE TALK`, and replaced production-facing answer placeholders with guest-facing dummy editorial copy.
- Story + Timeline: added scrapbook-style tape to the hero photo, `PHOTO 01`, short captions for all four timeline moments. The four 2019/2021/2023/2026 rows remain separate editable event cards.
- Memory + Gallery: completed photo numbering `01–06`, added `PHOTO 01`, while retaining all six independent photo masks.
- 1DAY + Cafe/Table: added `PHOTO 01–03`, `FOOD 01–02`; filled the previous dead space with a guest-facing `TRIP MEMO` card instead of production instructions.

Fresh hidden rollback clones were created around these polish passes before modifying the live frames.

## 2026-08-26 14H print-safe finalization pass

A six-page screenshot review identified a real finishing issue: several folio/date labels sat only 5–13 px from the A4 bottom edge. Without pretending that the final printer bleed/template is known, these labels were moved upward to give the current editable layout a safer working margin.

- Back cover `BACK COVER` badge moved upward to leave about 25 px bottom clearance.
- Profile `PAGE 02` badge moved upward to leave about 25 px bottom clearance.
- Story `PAGE 03` badge moved upward to leave about 25 px bottom clearance.
- 1DAY `PAGE 05` badge moved upward to leave about 25 px bottom clearance.
- Cover date was reduced to a tighter 24 px text box so it no longer sits within ~6 px of the trim edge while preserving the name/date footer hierarchy.
- The 1DAY closing copy was rewritten and resized from an awkward four-line wrap to the clean two-line guest-facing copy: `食べたものより、 / 食卓の時間を覚えている。`

Five fresh hidden rollback clones were created immediately before this pass.

## QA evidence

Whole-page screenshots were regenerated after the finalization pass for all six current production frames.

A final structural QA pass verified:

- all six current frames remain exactly `794 × 1123` and visible;
- replaceable photo-mask counts remain exactly `4 / 3 / 2 / 2 / 6 / 5 = 22`;
- no visible node overflows its A4 frame;
- no visible text node has a missing font;
- no visible production node name contains `PLACEHOLDER`, `DUMMY`, or `TEMP`;
- no page was flattened and all photo masks remain independently replaceable;
- rollback snapshots remain hidden and outside current production frames.

This is a strong `DESIGN / DUMMY-CONTENT QA` checkpoint, not final printer-ready evidence. Final photo selection, legitimate final copy, exact printer bleed/trim/safe template, export preflight, effective image resolution, and physical proof are still separate gates.

## Failure learning retained

`get_metadata` top-level page listing can omit the existing V9 page. Never conclude that V9 is absent solely from the top-level page list. Resolve `08_RURUBU_V9_RURUBU_POP_PRODUCTION` by exact name inside the Figma document before creating/replacing anything.

A Drive PNG can decode and still fail to render when transported through an unsuitable indexed-PNG route. Node creation or an `imageHash` is not visual success. Screenshot-QA the placed asset before hiding an editable fallback.

A Figma helper in the 13H pass initially assumed six-digit hex and received `#fff`; the write failed atomically with a NaN paint validation error. No live changes were applied by the failed call. Re-read live state, then retry only after normalizing to `#ffffff` (or make future color parsers support three-digit hex explicitly).

## Next pass

- Continue using the Drive folder as the visual/asset authority; inspect and place one-image-one-item assets only through a transport route proven to render.
- Build photo-frame compositions as `frame artwork above + replaceable masked dummy photo below`, so dummy photos never escape the decorative frame.
- Keep goal/reference imagery beside the production set for side-by-side comparison rather than flattening it into production.
- Replace dummy photos later without changing the mask geometry or the editorial layer structure.
- When printer/template information is available, run true trim/bleed/safe-area and export/preflight QA rather than treating the current 25 px working margin as a printer specification.
- Do not touch Passport, Boarding Pass, 青春ふたりきっぷ, ADD items, or V6/V7/V8 controls.
