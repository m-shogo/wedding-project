# ADD-07 Design QA Pass With Placeholders — 2026-08-09

Authority: GitHub `main`
Start / write-preflight main SHA: `71c6b643460b83b4df573913d6077c9551dae652`
Scope: ADD-07 エスコートカード案内ボード only. RURUBU / るるぶ territory was not read or written.

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`.
- Drive folder: `ADD-07_エスコートカード案内ボード`, ID `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`.
- Figma file: `Wedding Paper ADD 07 Escort Guide`, key `rplj1IWXP4XVKjWDQRg3dU`.
- A2 production: `1:2 / FRAME_ADD07_A2_PORTRAIT`.
- A3 reflow: `1:17 / FRAME_ADD07_A3_REFLOW_COMPARE`.

## Highest-value defect

The initial production was structurally sound but still read too literally as an airport template: `BOARDING GATE` dominated the hierarchy, all three actions repeated English transport-style labels, and the tall mint terminal edge acted as decorative airport UI. The A3 variant also needed independent title reflow rather than inheriting an oversized headline.

## Rollback-safe proof

Before the material edit, duplicated the live A2 production as `2:2 / QA_ADD07_PRE_EDITORIAL_REFINEMENT_2026_08_09`. Existing `1:32 / QA_ADD07_ROLLBACK_PROOF` also remains.

## Native Figma refinement

A2 and A3 were edited natively:

- `BOARDING GATE` → `ESCORT CARD / GUIDE`;
- primary Japanese headline → `エスコートカードのご案内`;
- lead copy → `お名前のカードを見つけて、カードに記載された卓へお進みください。`;
- action labels → `01 お名前を探す` / `02 カードを取る` / `03 記載された卓へ進む`;
- metadata normalized to `24 OCT 2026 / WELCOME DESK`;
- decorative terminal edge hidden;
- action route reduced to a restrained hairline and smaller semantic nodes;
- A3 title independently reflowed to avoid collision with date metadata.

No guest names, table numbers, fake gate/seat/barcode data, QR, or invented venue directions were introduced.

## Screenshot QA

A2 whole/reading/detail readback: Japanese instruction now dominates; English is subordinate metadata rather than airport-roleplay; the three actions read as one editorial sequence; negative space remains suitable for signage.

A3 post-edit screenshot initially exposed a title/date collision. This was fixed in the same run by reducing and repositioning the A3 title. Final A3 screenshot shows clear separation between title and right-side metadata and preserves the Japanese-first hierarchy.

## Structure QA

Post-edit programmatic readback:

- A2 `1400 × 1980`: 8 native text nodes, image fills 0, visible overflow 0.
- A3 `990 × 1400`: 8 native text nodes, image fills 0, visible overflow 0.
- rollback proof `2:2` present; previous proof `1:32` present.
- no flatten/raster replacement introduced.

## Drive

Drive authority was re-read immediately before Git write and still matched folder ID `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`. No Drive asset change: the defect was composition/typography, not source media.

## Status

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / WHOLE_READING_DETAIL_QA_PASS / A3_REFLOW_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Do not spend future hourly runs on minor decoration for ADD-07 unless new live evidence reveals a material defect. Advance to ADD-08.

## DEFERRED_FINALIZATION

- final card arrangement / operational method if additional explanatory wording becomes necessary;
- final A2/A3 installation choice;
- easel / stand obstruction check;
- venue lighting and 2–4 m physical readability check;
- printer bleed/template/profile;
- 100% physical print proof.
