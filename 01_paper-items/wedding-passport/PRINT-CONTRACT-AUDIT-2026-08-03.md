# WEDDING PASSPORT — Print Contract Audit 2026-08-03

Status: `LIVE_PRINT_GEOMETRY_AUDITED / VENDOR_TEMPLATE_UNRECORDED / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor
Starting main SHA: `f221c8edeb5da26dc4cffb1dedf48a0bbd098455`

## Live state checked

- GitHub `main` was re-read immediately before this write.
- Google Drive folder `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw` was searched for printer template, bleed, safe-area, trim, and fold records in English and Japanese.
- No vendor-authoritative printer template or print-spec record was found in the WEDDING PASSPORT Drive scope.
- Live Figma Plugin API inspection was used because the ordinary metadata endpoint currently exposes only `00_README`, while the live file contains `01_OUTSIDE`, `02_INSIDE`, and `99_QA` as well.
- No Figma or Drive write was performed in this audit.

## Live production geometry

All four Current production frames are `1480 × 2100` canvas units:

- `18:2` — `FRAME_FRONT_COVER`
- `18:46` — `FRAME_BACK_COVER`
- `18:90` — `FRAME_MENU_DRINK`
- `18:131` — `FRAME_SEATING`

Each frame contains the same hidden guide geometry:

- `GUIDE_BLEED`: `x=0`, `y=0`, `1480 × 2100`
- `GUIDE_TRIM`: `x=10`, `y=10`, `1460 × 2080`
- `GUIDE_SAFE`: `x=60`, `y=60`, `1360 × 1980`

All four production frames have `clipsContent=true` and currently have no frame-level export settings.

Smallest live numeric text sizes observed:

- front cover: `20`
- back cover: `18`
- menu/drink: `18`
- seating: `16`

These values are recorded as Figma canvas facts only. They are not converted to millimetres or print points because the authoritative scale and vendor template are not recorded.

## Findings

1. The four production pages use internally consistent guide geometry.
2. The current file does not contain a detected fold guide.
3. The guide names alone do not prove the intended physical trim size, bleed amount, binding method, imposition order, or vendor acceptance criteria.
4. No vendor-authoritative template was found in the scoped Drive search.
5. Because the exact physical scale is not documented, it would be unsafe to infer that `10` canvas units equals a specific millimetre value.
6. Because frame-level export settings are empty, final export format, page order, color handling, and PDF contract remain unresolved.

## Decision

No geometry was changed. The existing guides may be provisional or intentionally scaled, and changing them without the selected printer's official template could introduce a worse defect.

WEDDING PASSPORT remains:

`LIVE_STRUCTURE_CLEANUP_PASS / LIVE_STRESS_QA_PASS / LIVE_PRINT_GEOMETRY_AUDITED / FINAL_CONTENT_PENDING / VENDOR_TEMPLATE_UNRECORDED / NOT_PRINT_READY`

## Required external inputs before print-ready status

1. Selected printer/vendor and product name.
2. Official template or exact finished size.
3. Required bleed amount.
4. Safe-area requirement.
5. Binding/fold method and page order.
6. PDF preset, color profile, image-resolution requirement, and font handling.
7. Whether pages are supplied individually or as imposed spreads.

## Next safe priority

Do not alter bleed/trim/safe guides until the vendor contract is known. Continue WEDDING PASSPORT only with non-fabricated checks that do not depend on a vendor assumption; otherwise move to the next highest-value item while preserving this blocker.
