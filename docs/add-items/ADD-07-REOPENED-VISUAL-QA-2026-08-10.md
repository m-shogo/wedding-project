# ADD-07 エスコートカード案内ボード — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main` = `dccb1d3e8a769e4c004bf81d69aa94600819fb56`; Current remains `VISUAL_REOPENED`.

## Live authority

- Figma file: `Wedding Paper ADD 07 Escort Guide` / `rplj1IWXP4XVKjWDQRg3dU`
- page: `ADD-07_ESCORT_CARD_GUIDE`
- A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`
- A3 production/reflow: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`
- Drive folder: `ADD-07_エスコートカード案内ボード` / `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`
- RURUBU/るるぶ area was not read or written.

## Reopened diagnosis

The previous structural pass correctly removed the most literal airport-template cues, but the reopened visual screenshot still read as a sparse instruction sheet: one English header, one Japanese title, and three evenly spaced nodes on a vertical line. At thumbnail scale it remained too close to generic wayfinding/UI documentation and too dependent on empty space.

The existing `DESIGN_QA_PASS_WITH_PLACEHOLDERS` was retained only as structural evidence, not as proof of sellable visual completion.

## Clean-room comparison

Created a materially different Japanese-first pair:

- section: `3:2 / QA_ADD_07_REOPENED_CLEANROOM_2026_08_10`
- A2 candidate: `3:3 / QA_ADD_07_A2_V2_STAGGERED_EDITORIAL`
- A3 candidate: `3:23 / QA_ADD_07_A3_V2_STAGGERED_EDITORIAL`

Art direction:

- primary message changed from a label-like `エスコートカードのご案内` to a stronger physical instruction: `お名前のカードを / お取りください。`;
- native `Noto Serif JP` establishes a distinctly Japanese print/editorial hierarchy;
- 01 / 02 / 03 are no longer equal nodes on a UI-like route line; they form a staggered diagonal typographic choreography across the page;
- each action has a short hairline rather than a box/card container;
- a narrow navy physical edge and one restrained rust accent create family continuity without airport-roleplay;
- the footer remains native date plus explicit semantic location placeholder;
- A3 was independently reflowed rather than treated as a screenshot-scale clone.

No fake gate/seat/barcode data, fake QR, guest names, table numbers, venue directions, badges, pills, gradients, shadows, airplane icons, or generated people were introduced.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or saved. The concrete bottleneck was typography/composition rather than missing media, so the design was advanced natively. Drive writes: `0`.

## Visual decision

Whole-item/thumbnail, reading-scale and actual-size screenshots show the new direction clearly wins over the legacy production:

- Japanese instruction is now the dominant visual event;
- the diagonal 01→02→03 rhythm communicates sequence without looking like a web timeline;
- the page no longer relies on a large empty center to imply premium quality;
- A2 and A3 preserve the same family grammar without collisions or accidental overflow.

## Rollback-safe promotion

Before promotion, exact live copies were preserved:

- rollback section: `4:2 / ROLLBACK_ADD_07_PRE_REOPENED_EDITORIAL_2026_08_10`
- old A2: `4:3 / ROLLBACK_ADD07_A2_PRE_V2`
- old A3: `4:18 / ROLLBACK_ADD07_A3_PRE_V2`

Production IDs `1:2` and `1:17` were preserved while their contents were replaced with the approved clean-room pair.

## Post-promotion structure QA

A2 `1:2`:

- `1400 × 1980`
- native text count: `11`
- IMAGE fills: `0`
- text outside frame: `0`
- `clipsContent=true`
- hidden `GUIDE_SAFE`: `4:51`, `1300 × 1880`

A3 `1:17`:

- `990 × 1400`
- native text count: `11`
- IMAGE fills: `0`
- text outside frame: `0`
- `clipsContent=true`
- hidden `GUIDE_SAFE`: `4:70`, retained

Rollback A2/A3 remain intact with their previous 8 native text nodes and zero IMAGE fills.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / A3_REFLOW_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / ACTUAL_SIZE_QA_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

`DEFERRED_FINALIZATION`:

- final card arrangement and operational wording;
- final A2/A3 installation choice;
- easel/stand obstruction check;
- venue lighting and 2–4 m physical readability proof;
- printer bleed/template/profile;
- 100% physical print proof.

These do not block progression.

## Next

Proceed to ADD-08 メニュー補助サイン for the reopened visual-art-direction audit.
