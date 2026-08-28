# ADD-16 — Figma print-safe-area hardening QA — 2026-08-29

Status: `VERIFIED_LOCAL / PRINT_SAFE_AREA_HARDENED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Authority

- start GitHub main: `82bcbe1facc7b6a457e77b538ded2b55fc707a3a`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- item spec: `SPEC.md`
- authoritative primary finished size: `100 × 148 mm` portrait
- authoritative bleed: `3 mm` each edge
- authoritative safe area: `>= 8 mm` inward from finished edge
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected back: `57:17`
- hidden realistic long-copy back: `57:50`
- exact Drive authority folder: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive write: `0`

## Print-first diagnosis

The selected `700 × 1036` canvas maps to the authoritative `100 × 148 mm` primary format at `7 px/mm`.

Therefore the 8 mm finished-edge safe inset is `56 px`, and the right-side safe limit is canvas x=`644`.

Fresh live readback found the back display title at:

- Current `57:25`: x=`148`, width=`500`, right=`648`
- stress `57:58`: x=`148`, width=`500`, right=`648`

Both exceeded the authoritative right safe limit by `4 px`, equivalent to about `0.57 mm`.

This was not a general composition defect and did not justify a visual redesign. It was a concrete production-geometry defect revealed by the print-first audit.

## Rollback-safe correction

Complete hidden pre-change rollbacks were created before the write:

- `75:2 / ROLLBACK / ADD16 / BACK / PRE-PRINT-SAFE-TITLE-SHIFT / 2026-08-29`
- `75:21 / ROLLBACK / ADD16 / BACK STRESS / PRE-PRINT-SAFE-TITLE-SHIFT / 2026-08-29`

Only the native display-title x position changed:

- Current `57:25`: x `148 → 140`
- stress `57:58`: x `148 → 140`

Characters, font size, line height, width, vertical position, writing surface, rules, palette and decoration were not changed.

## Verification

Post-write live readback:

- Current display right edge: `640 px`
- stress display right edge: `640 px`
- authoritative right safe limit: `644 px`
- remaining safe-limit cushion: `4 px ≈ 0.57 mm`
- Current visible native text: `4`; outside frame: `0`
- stress visible native text: `4`; outside frame: `0`
- rollback copies exist and are hidden

Native screenshot at `700 × 1036` remains visually balanced after the shift: the display still anchors the writing mat, does not collide with the left textile selvage, and the correction is not perceptible as arbitrary micro-spacing.

## Actual-size / print implications

At `7 px/mm` the current key back typography is approximately:

- display 46 px ≈ `16.5 pt`
- prompt 23 px ≈ `8.3 pt`
- guide/signature 18 px ≈ `6.5 pt`

No raster production asset is present, so effective PPI is `N/A` and there is no `RESOLUTION_WARNING` from this correction.

The textile bands intentionally reach trim/bleed behavior and are decorative; the safe-area repair concerns semantic/native text, not intended edge decoration.

CMYK risk remains deferred: dark forest, rust, saffron and warm oat must be checked against the chosen printer profile/paper because deep green and warm muted accents may shift or lose separation in conversion.

## Remaining print gate

`DESIGN_COMPLETE != PRINT_READY`.

Still required before `PRINT_READY`:

- final printer template and confirmation that the 100 × 148 mm / 3 mm bleed / 8 mm safe spec matches the vendor;
- paper stock/finish;
- final copy/signatures/forms of address;
- actual gift/package/attachment method and physical interference check;
- CMYK/profile conversion;
- PDF export/preflight including font embedding, transparency and overprint/knockout behavior;
- 100% physical proof and actual attachment/handling proof.

## Result

`PRINT_SAFE_AREA_HARDENED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`.
