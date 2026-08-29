# ADD-02 Hong Kong — V4C Harbour Broadsheet

Date: 2026-08-29
Scope: non-Rurubu only
Status: `V4C_CANDIDATE / LONG_COPY_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`
Start latest-main SHA for this sub-pass: `13dd4607b9f19020e0f35ceecec44d2d042bbbbf`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`

## Authority

- Figma fileKey: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Figma page: `201:2` — `V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`
- retained comparison: `201:6` — `V4B / ADD-02 / TABLE 07 / HONG KONG / EDITORIAL PRINT`
- new clean-room root: `235:2` — `V4C / ADD-02 / TABLE 07 / HONG KONG / HARBOUR BROADSHEET / CLEANROOM`
- hidden long-copy proof: `235:41` — `QA / V4C / ADD-02 / HONG KONG / LONG COPY STRESS`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r` — `ADD-02_11卓の国別テーブルサイン`
- Drive write: none; no raster/generated asset needed.

## Visual diagnosis and clean-room direction

The retained V4B Hong Kong uses a dark vertical slab, broad red bar, diagonal color wedges, a red circle, and a window-light pattern. It is readable but still resembles a stylized generic vector poster.

V4C was rebuilt from a blank frame without copying old production nodes. The direction is a bilingual harbour broadsheet: hard charcoal header, jade side column, narrow red/amber register rules, large native `香港`, an offset night-window editorial panel, and restrained harbour/grid rules. No fake transport data, fake stamps, equal-card UI, or decorative English filler is used.

## Authoring roles

- variable copy: native Figma text (`TABLE 07`, `HONG KONG`, `香港`, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`)
- theme/description: native vertical Auto Layout copy stack
- decorative support: editable native vector/primitives
- raster/generated imagery: none
- replaceable photography: none required

## QA findings and fixes

The first structural proof deliberately failed and exposed two real defects:

1. `TABLE 07` intersected the large English destination header.
2. the rotated side mark extended outside the 1000×1480 root.

Both candidate and hidden proof were corrected: TABLE and headline positions were separated, and the side mark was changed to native stacked `香\n港` instead of rotation.

Final hidden proof readback:

- text outside root: `0`
- text/text overlap: `0`
- theme long-copy height: `80 px`
- description long-copy height: `308 px`
- candidate IMAGE fills: `0`
- retained V4B remains untouched

## Three-scale visual QA

- thumbnail / 3-second scan: materially stronger single headline and bilingual hierarchy; no dashboard/card feel.
- reading scale: Hong Kong identity comes from typography, register colors, density, and night-window rhythm rather than literal tourism icons.
- actual-size detail: thin harbour rules are secondary only; core hierarchy does not depend on micro-detail.

This is a serious comparison candidate, not a production promotion. Family-wide `SELLABLE_VISUAL_QA_PASS` remains unclaimed.

## Print-first QA

Working physical authority: `100 × 148 mm`; candidate size `1000 × 1480 px` (= 10 px/mm working scale).

Approximate actual-size type:

- `HONG KONG` 92 px ≈ 26.1 pt
- `香港` 92 px ≈ 26.1 pt
- theme 30 px ≈ 8.5 pt
- description 27 px ≈ 7.7 pt
- date 28 px ≈ 7.9 pt
- TABLE 22 px ≈ 6.2 pt

Raster effective PPI: `N/A`; `RESOLUTION_WARNING`: none.

CMYK risk remains for charcoal/deep green, jade, vermilion, amber, and warm cream. Final printer profile and grayscale hierarchy require proof. Final rich-black/100K values are intentionally not asserted yet.

`DEFERRED_FINALIZATION`: printer template; confirmed trim/bleed/safe; stand/easel occlusion; CMYK/profile conversion; PDF export/font embed/transparency/overprint-knockout; preflight; 100% print/physical proof.

`DESIGN_COMPLETE != PRINT_READY` remains in force.

## Next

Continue ADD-02 V4C clean-room work with Singapore, Bali, and Maldives, then run the complete 11-table family comparison before promotion.
