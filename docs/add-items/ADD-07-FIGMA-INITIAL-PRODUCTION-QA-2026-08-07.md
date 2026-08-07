# ADD-07 Figma Initial Production QA — 2026-08-07

Authority: GitHub `main`
Write-preflight main SHA: `a9bb08128e648a3c63e58c8b26a4deb4076868fd`

## Scope

ADD-07 エスコートカード案内ボード。BOARDING PASS正本および RURUBU / るるぶ領域は read/write していない。

## Live authority cross-check

- GitHub SPEC: A2 portrait primary, A3 portrait editorial reflow comparison, 15 mm+ safe area, 2–4 m viewing-distance target.
- Required action flow: `探す → 取る → 卓へ進む`.
- Drive production folder live readback: `ADD-07_エスコートカード案内ボード`, folder ID `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`.
- No raster or BOARDING PASS screenshot reuse is required.

## Figma production authority

- File: `Wedding Paper ADD 07 Escort Guide`
- File key: `rplj1IWXP4XVKjWDQRg3dU`
- Page: `ADD-07_ESCORT_CARD_GUIDE`
- A2 production: `FRAME_ADD07_A2_PORTRAIT` / `1:2`
- A3 reflow comparison: `FRAME_ADD07_A3_REFLOW_COMPARE` / `1:17`
- Rollback proof: `QA_ADD07_ROLLBACK_PROOF` / `1:32`

## Actual design change

Created an independent departure-hall / concierge guide rather than a blown-up boarding pass. The design uses a strong `BOARDING GATE` header, Japanese-first instruction, concise lead copy, and one connected vertical action route with three semantic nodes. The three actions are not placed in equal rounded cards.

Native editable copy includes:

- `BOARDING GATE`
- `エスコートカードをお取りください`
- `お名前のカードを見つけて、記載されたテーブルへお進みください。`
- `FIND YOUR NAME / お名前を探す`
- `PICK UP YOUR TICKET / カードを取る`
- `FIND YOUR DESTINATION / 行き先の卓へ`
- `2026.10.24`
- `YOKOHAMA`

No guest-name list, table-number list, alphabetical order, 五十音順, reception method, fake gate/seat/barcode data, airplane icon, or BOARDING PASS image was added.

## Screenshot QA

A2 whole-item screenshot captured at natural `1400 × 1980` working resolution. Visual readback confirmed:

- Japanese action intent is readable immediately below the main title;
- the three actions read in one continuous sequence rather than separate UI cards;
- destination node is visually distinguished with mint but does not dominate;
- large negative space remains, supporting 2–4 m signage rather than dense document reading;
- no boarding-pass stub, barcode, stamp collage, gradient, or shadow reuse appeared.

## Structure QA

A2 `1:2`:

- size `1400 × 1980`;
- 8 native editable text nodes;
- hidden `GUIDE_SAFE` retained;
- visible overflow: 0.

A3 reflow `1:17`:

- size `990 × 1400`;
- 8 native editable text nodes;
- hidden `GUIDE_SAFE` retained;
- visible overflow: 0.

Rollback proof `1:32` preserves the A2 production structure separately.

## Drive changes

None. No concrete raster defect or need was found.

## Status

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_SCREENSHOT_QA_PASS / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Do not wait for final installation or physical print checks. A final reading/detail pass can promote this to `DESIGN_QA_PASS_WITH_PLACEHOLDERS`, then advance to ADD-08.

## DEFERRED_FINALIZATION

- final card arrangement / operational method if any extra explanatory wording is later needed;
- final A2/A3 installation choice;
- easel / stand obstruction check;
- venue lighting and 2–4 m physical readability check;
- printer bleed/template/profile;
- 100% physical print proof.
