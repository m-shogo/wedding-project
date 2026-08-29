# ADD-02 Hawaii — V4C Pacific Postcard clean-room study

Date: 2026-08-29
Start/main authority immediately before Git write: `8e6b75055969a3067a663abe4c120e6d67297331`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
State: `V4C_CLEANROOM_CANDIDATE_CREATED / SCREENSHOT_DEFECT_FOUND_AND_FIXED / LONG_COPY_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority

- Figma fileKey: `LAZAZ0u3RGqtN4bYFPZ3pU`
- exact ADD-02 page: `201:2 / V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`
- retained V4B Hawaii comparison: `201:3 / V4B / ADD-02 / TABLE 01 / HAWAII / EDITORIAL PRINT`
- new V4C Hawaii root: `232:22 / V4C / ADD-02 / TABLE 01 / HAWAII / PACIFIC POSTCARD / CLEANROOM`
- hidden long-copy QA proof: `232:47 / QA / V4C / ADD-02 / HAWAII / LONG COPY STRESS`
- exact Drive authority live-confirmed: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive write: `0` — this direction needs no raster/generated asset
- Rurubu item-specific scope: not read or modified

## Visual diagnosis and clean-room direction

The retained V4B Hawaii is readable but still relies on large layered wave fields, a sun disc, repeated contour lines and a broad coral wave. At thumbnail scale it reads more like a generic vector illustration than a deliberate premium table-sign product.

A fresh blank `1000×1480` frame was therefore authored without cloning or restyling old production. V4C `PACIFIC POSTCARD` uses a strong navy side band, a single aqua ocean field, warm paper body, postcard registration stripes, a restrained sun disc, and an abstract editable hibiscus fragment. The composition changes from centered landscape illustration to an asymmetric editorial/postcard hierarchy.

Variable/factual copy remains native editable Figma text: table number, destination EN/JP, theme, description and date. Fixed artwork is native editable vector/shape construction. Raster IMAGE fills: `0`; effective raster PPI: `N/A`; `RESOLUTION_WARNING`: none.

## Screenshot QA and repair

The first live screenshot exposed two implementation defects even though the visual direction was viable:

1. all native text boxes had been reduced to fixed `10px` height during authoring, creating renderer/export risk and hiding the description;
2. decorative vertical `ISLAND` microcopy clipped at the navy band edge and added no necessary reader value.

The current fonts were loaded and all guest-facing native text nodes were changed to `textAutoResize=HEIGHT`. Readback after repair:

- TABLE: `24px` font / `32px` box;
- PACIFIC microcopy: `18px` / `26px`;
- HAWAII: `118px` / `118px`;
- ハワイ: `36px` / `48px`;
- theme: `28px` / `34px`;
- description: `25px` / `40px` for the normal placeholder;
- date: `25px` / `34px`.

The clipped decorative side word was hidden rather than repaired because it did not justify its visual cost. A fresh screenshot after the repair shows the description restored and no clipped guest-facing copy.

## Long-copy proof

A hidden QA proof of the current V4C candidate was created only to stress semantic copy. It is not a production alternative.

- proof root: `232:47`;
- long theme height: `68px`;
- long description height: `160px`;
- text outside root: `0`;
- text-to-text overlap: `0`.

Result: `LONG_COPY_QA_PASS` for this candidate.

## Print-first working state

Working physical authority remains `100×148mm` for a `1000×1480` Figma frame = `10px/mm`.

Approximate actual-size type:

- HAWAII `118px` ≈ `33.5pt`;
- JP destination `36px` ≈ `10.2pt`;
- theme `28px` ≈ `7.9pt`;
- description `25px` ≈ `7.1pt`;
- TABLE `24px` ≈ `6.8pt`;
- date `25px` ≈ `7.1pt`.

No raster is used, so effective PPI is not applicable and there is no resolution warning. The thin horizon/date rules are native vector geometry. Deep navy, aqua/cyan, coral, warm yellow and cream remain CMYK-conversion risks that require profile/proof review; hierarchy should also be rechecked after grayscale/CMYK conversion.

No bleed/trim/safe geometry was guessed. Final printer template, stand/easel occlusion, bleed/trim/safe, CMYK profile, PDF export/font embedding, overprint/knockout/transparency preflight and 100% physical proof remain `DEFERRED_FINALIZATION`.

`DESIGN_COMPLETE != PRINT_READY` remains in force.

## Promotion state / next

Hawaii V4C is a serious clean-room comparison candidate and has structural/long-copy evidence, but is **not** promoted and does not by itself establish family-level `SELLABLE_VISUAL_QA_PASS`.

Continue ADD-02 family review with the next V4B-only countries (`JAPAN`, `HONG KONG`, `SINGAPORE`, `BALI`, `MALDIVES`) and compare at thumbnail / reading / actual-size scales before any family promotion decision.
