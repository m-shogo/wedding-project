# WEDDING PASSPORT — Back Cover Semantic Placeholder Polish

Date: 2026-08-13
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before the Figma write: `6ef03294e0c444dbfc595a31120336c18ca4955b`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Current state: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- production back cover: `18:46 / FRAME_BACK_COVER`
- Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Fresh visual defect

A fresh full back-cover screenshot at 1480×2100 confirmed the graphic-editorial composition remains sellable, but the lower folio still exposed an internal authoring instruction:

`[正式文言・印刷仕様は最終確定時に差替え · LAYOUT DUMMY]`

The front-cover equivalent had already been normalized on 2026-08-12, so leaving the back unchanged created both an authoring-note leak and a front/back semantic inconsistency.

## Rollback-safe proof

Before editing production, the current back cover was cloned to `99_QA` as a hidden rollback:

- `124:2 / ROLLBACK_PASSPORT_BACK_PRE_ISSUE_NOTE_SEMANTIC_FIX_2026_08_13`

Production root `18:46` was preserved.

## Production change

Only native editable text was changed:

- `103:179 / V3_EDIT_NOTE`
- before: `[正式文言・印刷仕様は最終確定時に差替え · LAYOUT DUMMY]`
- after: `[発行情報 · LAYOUT DUMMY]`

No final issue wording, print specification, venue fact, or other unknown value was invented. Layout, typography, contour artwork, date rail, folio, and all other content were unchanged.

## Screenshot QA

Fresh post-write 1480×2100 screenshot: `PASS`.

- the lower-right note now reads as a concise semantic replaceable role rather than a production instruction;
- `旅のつづきへ` remains the dominant read;
- navy date rail, red edge, body copy, contour rhythm, and negative space remain unchanged;
- no new badge, stamp, UI, image, gradient, or decorative filler was introduced.

## Structural readback

Production back cover `18:46` after the write:

- size: `1480×2100`;
- `clipsContent=true`;
- native text nodes: `14`;
- IMAGE-fill nodes: `0` within the back-cover root;
- visible text outside root: `0`;
- edited text remains native editable text at `103:179`, `430×24`.

No raster flattening was introduced.

## Drive / image workstream

Drive metadata was re-read live before the Figma write:

- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`;
- Drive write: `0`;
- generated asset candidates: `0`.

Image generation was not needed for this screenshot-supported defect; adding imagery would not improve the semantic-authoring-note problem.

## Additional fresh spot-checks

After closing the back-cover defect:

- BOARDING PASS production front `P2PtpMyhyZqHYe1ZBBCD13 / 8:5` was re-rendered at its actual `1200×550` size. Its V2 Japanese-first editorial ticket composition and semantic placeholders remain visually coherent; no new material defect was found.
- 青春ふたりきっぷ production `v7rIRHv8YKQXG0LYD0I5OA / 11:2` was re-rendered at its actual `720×250` size. V3 remains readable and role-specific; no new material defect was found.

No cosmetic changes were made to either item.

## Decision

WEDDING PASSPORT remains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

The semantic-authoring-note leak on the back cover is closed. Continue the ordered non-Rurubu visual queue from the next target that shows a fresh screenshot-supported defect; do not reopen BOARDING PASS or 青春ふたりきっぷ merely to create activity.