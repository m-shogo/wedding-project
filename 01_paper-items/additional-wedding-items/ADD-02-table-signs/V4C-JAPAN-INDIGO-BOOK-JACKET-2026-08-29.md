# ADD-02 Japan — V4C Indigo Book Jacket

Date: 2026-08-29
Scope: non-Rurubu only
Status: `V4C_CANDIDATE / LONG_COPY_QA_PASS / NOT_PROMOTED / NOT_PRINT_READY`
Start latest-main SHA: `5a39ae886ac4fbb8bf4288925d2d56f502146a53`
Current authority at write: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`

## Authority

- Figma fileKey: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Figma page: `201:2` — `V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`
- retained comparison: `201:5` — `V4B / ADD-02 / TABLE 06 / JAPAN / EDITORIAL PRINT`
- new clean-room root: `234:2` — `V4C / ADD-02 / TABLE 06 / JAPAN / INDIGO BOOK JACKET / CLEANROOM`
- hidden long-copy proof: `234:55` — `QA / V4C / ADD-02 / JAPAN / LONG COPY STRESS`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r` — `ADD-02_11卓の国別テーブルサイン`
- Drive write: none; this direction requires no raster/generated asset.

## Visual diagnosis and clean-room direction

The retained V4B Japan is readable but still relies on a large indigo field, red disc, repeated waves, and a centered scenic abstraction. At thumbnail scale it reads more like a generic vector travel study than a destination-specific sellable print object.

V4C was created from a blank frame; no V4B/V2/V3/VNext production node was duplicated into the candidate. The new direction is an asymmetric Japanese book-jacket / washi editorial composition: deep indigo spine and top field, narrow vermilion index rule, warm paper field, offset blue paper block, restrained gold hairline, subtle fiber rules, and native Japanese/English typography. It intentionally avoids equal-card UI, generic travel icons, fake stamps, and decorative English filler.

## Authoring roles

- variable copy: native Figma text (`TABLE 06`, `JAPAN`, `日本`, `[国テーマ]`, `[国テーマ説明]`, `2026.10.24`)
- decorative art: native editable vector/primitives only
- replaceable photography: none required for this candidate
- raster/generated imagery: none
- reusable SVG: none required
- copy stack: native vertical Auto Layout `234:54` so theme/description reflow as one semantic block

## Structure / long-copy QA

Initial readback caught a real implementation defect: all native text boxes had been left at 10 px fixed height after creation. The candidate was corrected to `textAutoResize=HEIGHT` for every text role before QA.

The theme and description were then refactored into native vertical Auto Layout. Hidden proof `234:55` uses deliberately long Japanese theme and description copy. Final structural readback:

- proof text outside root: `0`
- proof text/text overlap: `0`
- raster IMAGE fills: `0`
- candidate text remains native/editable
- old V4B production remains untouched

## Three-scale visual QA

- thumbnail / 3-second scan: stronger destination identity and editorial hierarchy than retained V4B; large JAPAN header + asymmetric red/indigo registration reads immediately.
- reading scale: Japanese title, theme, description, date, and table number form a clear top-to-bottom path; no equal-card/dashboard impression.
- actual-size detail: decorative hairlines remain deliberately restrained; no raster detail is relied on.

This is a serious comparison candidate, not a production promotion. `SELLABLE_VISUAL_QA_PASS` is not yet claimed for ADD-02 family-wide until remaining V4C destinations and the complete 11-table family are compared together.

## Print-first QA

Working physical authority remains `100 × 148 mm` with Figma candidate `1000 × 1480 px` (= 10 px/mm working scale).

Approximate actual-size type from the candidate:

- `JAPAN` 112 px ≈ 31.7 pt
- `日本` 116 px ≈ 32.9 pt
- theme 30 px ≈ 8.5 pt
- description 27 px ≈ 7.7 pt
- date 28 px ≈ 7.9 pt
- TABLE 22 px ≈ 6.2 pt

Raster effective PPI: `N/A`; `RESOLUTION_WARNING`: none, because candidate contains no IMAGE fills.

CMYK risk remains for deep indigo/blue, vermilion red, warm cream paper, and muted gold. Grayscale hierarchy and actual printer-profile behavior still require final proof. The working file does not assert final rich-black/100K values.

`DEFERRED_FINALIZATION`:

- printer template and confirmed trim/bleed/safe geometry
- stand/easel occlusion or attachment measurements
- final CMYK/profile conversion
- PDF export / font embed / transparency / overprint-knockout checks
- preflight
- 100% printed proof or physical proof

Therefore `DESIGN_COMPLETE != PRINT_READY` remains in force.

## Next

Continue ADD-02 V4C clean-room comparison with Hong Kong, Singapore, Bali, and Maldives, then perform family-wide three-scale comparison before any promotion.
