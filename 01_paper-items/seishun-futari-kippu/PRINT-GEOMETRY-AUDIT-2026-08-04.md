# 青春ふたりきっぷ — Live Print Geometry Audit 2026-08-04

Status: `LIVE_PRINT_GEOMETRY_AUDITED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/v7rIRHv8YKQXG0LYD0I5OA

## Grounding

This audit re-read the live systems rather than trusting the previous report.

- GitHub `main` at start and immediately before write: `8cf228b21508b1f0a97caaeca4d6a6c721c63fe1`
- Live Figma pages: `00_README`, `01_LABEL`, `99_QA`
- Current production frame: `11:2` / `FRAME_LABEL`
- Current frame size: `720 × 250` Figma units
- Current frame export settings: none
- `clipsContent=true`
- Archived legacy frame `1:4` remains hidden and separately named
- Drive Current authority and research documents remain accessible under the 青春ふたりきっぷ scope

The RURUBU/るるぶ item-specific scope was not read or written.

## Live visual and structural QA

A fresh natural-size screenshot of `11:2` was inspected after reading the current node tree.

Confirmed clean:

- one visible production frame only
- title, subtitle, route, date, issue number, class label, facts, train, red stamp, blue gate stamp, frame rules and guilloche remain visible
- the prior upper-right clearance correction remains present
- no new clipping, overlap, missing node or unintended visual regression was found
- normal copy remains native editable text
- no flattening, rasterization or asset regeneration is required by the current evidence

Figma write in this run: **none**. A visual change would not be evidence-driven while the physical application dimensions remain unverified.

## Print geometry finding

The repository's current preparation contract treats `720 × 250` as a provisional working size of approximately `72 × 25 mm`, or roughly `10 Figma units per mm`.

This ratio is **not a vendor or physical-product measurement**. It must not be promoted to final print geometry.

Under that provisional ratio only, current typography would correspond approximately to:

| Live role | Figma size | Provisional physical size |
|---|---:|---:|
| title | 34 | 3.4 mm / about 9.6 pt |
| date value | 15 | 1.5 mm / about 4.3 pt |
| route values | 14 | 1.4 mm / about 4.0 pt |
| FROM / DESTINATION values | 13 | 1.3 mm / about 3.7 pt |
| subtitle | 11 | 1.1 mm / about 3.1 pt |
| class | 10 | 1.0 mm / about 2.8 pt |
| fact labels and gate-stamp text | 9 | 0.9 mm / about 2.6 pt |

These conversions are diagnostic, not final specifications. They show that the smallest text is potentially below comfortable production readability if the provisional physical size is accurate. However, increasing text or rebuilding the geometry before measuring the actual MINTIA application face could create a false solution and force another redesign.

## Missing print contract

No verified source currently fixes all of the following:

1. actual usable flat application width and height on the purchased MINTIA case
2. corner radius and curved/non-adhesive exclusion zones
3. final finished sticker dimensions
4. bleed requirement
5. safe-zone requirement
6. stock, adhesive and finishing method
7. printer scaling and PDF preset
8. minimum reproducible type and line weight for the selected printer

Therefore the current frame must not be marked `PRINT_READY`, and the provisional mm conversion must not be used for final PDF delivery.

## Required physical gate

Before the next geometry-changing Figma pass:

1. measure the actual product face with a ruler or caliper
2. record maximum face size and the conservative rectangular adhesive area in mm
3. photograph the measured product face for evidence
4. obtain the printer/template bleed and safe-zone requirements
5. map the measured dimensions to the live frame without changing semantic node identities
6. re-run whole-item, reading-scale and 100%-print QA
7. apply one printed proof to the actual case and inspect corners, adhesion and normal-viewing readability

After the measurement is available, the first likely target is the 9–11-unit microtype layer. It must be evaluated at true 100% physical scale rather than enlarged screen scale.

## Drive and asset decision

Drive write: **none**.

No current screenshot or machine evidence shows an image-resolution, crop, rights, source, AI-quality or identity-risk defect. Existing assets were not regenerated.

## Declaration

Current status:

`LIVE_STRUCTURE_CLEANUP_PASS / MICROTYPE_LEGIBILITY_FIX_APPLIED / VARIABLE_TEXT_STRESS_QA_PASS / UPPER_RIGHT_CLEARANCE_FIX_APPLIED / LIVE_PRINT_GEOMETRY_AUDITED / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

The remaining blocker is physical and vendor-dependent. Repeated cosmetic Figma edits must not substitute for the missing measurement.