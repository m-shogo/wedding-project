# ADD-07 エスコートカード案内ボード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A2_A3_REFLOW_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-12

## Current authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- page: `0:1 / ADD-07_ESCORT_CARD_GUIDE`
- A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`
- A3 production: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`
- exact Drive authority: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- latest detailed visual evidence: `docs/add-items/ADD-07-REOPENED-VISUAL-QA-2026-08-10.md`
- latest placeholder polish evidence: `docs/add-items/ADD-07-PLACEHOLDER-POLISH-2026-08-12.md`

This file supersedes its old 2026-08-02 `PREPARED_FOR_FIGMA / SCREENSHOT_QA_PENDING` snapshot. It is now an item-level pointer to the verified live production state; physical/installation checks remain deferred.

## Verified live production

### A2

- canvas: `1400 × 1980`, `clipsContent=true`
- native editable text: `11`
- raster IMAGE fills: `0`
- text outside production root: `0`
- semantic location placeholder: `[カード設置場所 · LAYOUT DUMMY]`

### A3

- canvas: `990 × 1400`, `clipsContent=true`
- native editable text: `11`
- raster IMAGE fills: `0`
- text outside production root: `0`
- semantic location placeholder: `[カード設置場所 · LAYOUT DUMMY]`

## Fresh visual spot-check — 2026-08-12

Fresh live screenshots of both A2 and A3 were re-read after the latest placeholder polish.

- the large Japanese instruction remains the first visual read;
- `01 → 02 → 03` forms a clear staggered action sequence without equal cards or dashboard UI;
- English kicker remains subordinate;
- generous negative space reads as large-format signage rather than an empty web hero because the title, left-edge rail and stepped sequence provide a strong vertical/diagonal rhythm;
- the footer placeholder remains a single controlled line and does not look like accidental implementation copy;
- no generic airplane, stamp, barcode, fake gate data, raster decoration, shadow, gradient or badge was introduced;
- no image-generation asset is required by the current visual defect model.

Decision: keep current production. A materially different redesign is not justified by this fresh screenshot because the composition still meets the reopened sellable gate and new decoration would reduce rather than improve print authenticity.

## Content safety

- guest names and table-number lists are not baked into the sign;
- alphabetical / kana ordering is not asserted before the real operation is fixed;
- no QR code or fabricated gate/transport data is present;
- all unknown placement information remains native semantic placeholder text.

## Deferred finalization

Still `NOT_PRINT_READY` until the following are actually verified:

- 100% physical print proof;
- printer stock/profile and final trim/bleed confirmation;
- installation height / easel lip / viewing-distance check;
- venue lighting and wall/background contrast;
- final card placement operation and wording.

These are `DEFERRED_FINALIZATION`; they do not invalidate the current visual/structural pass.

## Final decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A2_A3_REFLOW_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
