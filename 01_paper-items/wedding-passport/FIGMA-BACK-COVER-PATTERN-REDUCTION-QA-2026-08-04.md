# WEDDING PASSPORT — Back-cover pattern reduction QA 2026-08-04

Status: `LIVE_VISUAL_FIX_APPLIED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor
Starting and pre-write main SHA: `632b7ab280590998ab3bf310841dadecffb5e596`

## Live authority verification

- GitHub `main` was checked at run start and immediately before the production Figma write and GitHub record write.
- Live Figma root inspection confirmed `00_README`, `01_OUTSIDE`, `02_INSIDE`, and `99_QA` in file key `UbK8KmuWJcDeGScsN49Uor`.
- Production target was re-confirmed as `18:46 / FRAME_BACK_COVER` on `01_OUTSIDE`.
- Google Drive parent folder `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw` was read live; `20_制作素材` (`1G4b7Qhtj6Ng7RRREtN_us4eKnwvCbWA6`) and `10_参考画像・リサーチ` (`1w3o1GeLX1SgOFDxWHvhG9sg2KRxsleoH`) remain present.
- No RURUBU/るるぶ page, Drive item, asset, or item-specific Git document was read or modified.

## Visible defect

The live back-cover screenshot showed two overlapping decorative systems behind the content:

1. eight large concentric watermark rings (`BG_PATTERN_RING_*`), and
2. eighteen repeated outer circles (`BG_PATTERN_ORBIT_*`).

The eighteen outer circles formed a large bead-like halo across the itinerary, thank-you copy, stamp area, and surrounding negative space. Although low contrast, the repeated circles added visual noise without carrying information and weakened the document-like hierarchy. This directly conflicted with the project rule to remove meaningless decoration before adding more.

## Rollback-safe proof

A production duplicate was created on `99_QA`:

- `42:2 / QA_BACK_COVER_REDUCED_ORBIT_PATTERN_PROOF_2026_08_04`
- only the eighteen cloned `BG_PATTERN_ORBIT_*` nodes were set to `visible=false`
- the eight concentric `BG_PATTERN_RING_*` nodes remained visible as a restrained passport-watermark motif

Proof screenshot QA confirmed that the page retained depth and passport character while the itinerary, thank-you message, entry stamp, MRZ block, and folio gained clearer separation.

## Production change

Production frame `18:46 / FRAME_BACK_COVER`:

- set `18:59` through `18:76` (`BG_PATTERN_ORBIT_0` through `BG_PATTERN_ORBIT_17`) to `visible=false`
- retained all eighteen nodes for rollback
- retained `18:51` through `18:58` (`BG_PATTERN_RING_*`) as visible

No node was deleted, flattened, rasterized, renamed, moved, or resized. No native text, variable content, guide, stamp, frame geometry, crop, or source asset was changed.

## Post-write screenshot and structure QA

Verified on the live production back cover:

- the repeated outer-circle halo is absent
- the central concentric watermark remains subtle and legible as background structure
- itinerary and thank-you copy have cleaner negative space
- the red entry stamp remains dominant and unobstructed
- MRZ label, MRZ text, footer rule, and folio are unchanged
- all eighteen production orbit nodes remain present and rollback-safe with `visible=false`
- all eight production ring nodes remain present with `visible=true`
- production frame remains `1480 × 2100`, `clipsContent=true`

## Drive

Change count: `0`

No source-image defect, resolution problem, rights issue, crop problem, or regeneration need was found. The defect was confined to native Figma decoration visibility.

## Remaining blockers

1. Venue-authoritative menu/drink text and final seating data.
2. Selected printer template and exact page order.
3. Bleed, safe area, fold contract, and minimum printable type/line confirmation.
4. 100% actual-size print proof and navy/gold output review.
5. Final PDF export and physical proof approval.

## Next priority

Continue WEDDING PASSPORT. Audit `FRAME_MENU_DRINK` and `FRAME_SEATING` at whole-item, reading-scale, and detail scale for the next concrete visual or print-readiness defect. Do not declare print readiness until printer geometry and physical proof are complete.
