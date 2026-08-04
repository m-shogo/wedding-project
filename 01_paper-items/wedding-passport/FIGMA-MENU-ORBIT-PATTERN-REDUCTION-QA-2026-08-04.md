# WEDDING PASSPORT — Menu orbit-pattern reduction QA 2026-08-04

Status: `LIVE_VISUAL_FIX_APPLIED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor
Starting and pre-write main SHA: `51fd0579059d5c8fbb6c465a9bbf391b88abc2b7`

## Live authority verification

- GitHub `main` was checked at run start, immediately before the production Figma write, and immediately before this GitHub record write.
- Live Figma inspection confirmed `00_README`, `01_OUTSIDE`, `02_INSIDE`, and `99_QA` in file key `UbK8KmuWJcDeGScsN49Uor`.
- Production target was re-confirmed as `18:90 / FRAME_MENU_DRINK` on `02_INSIDE`.
- Google Drive parent folder `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw` was read live; `20_制作素材` (`1G4b7Qhtj6Ng7RRREtN_us4eKnwvCbWA6`) and `10_参考画像・リサーチ` (`1w3o1GeLX1SgOFDxWHvhG9sg2KRxsleoH`) remain present.
- No RURUBU/るるぶ page, Drive item, asset, or item-specific Git document was read or modified.

## Visible defect

The live MENU/DRINK screenshot showed two overlapping decorative systems behind the editable menu and drink copy:

1. eight large concentric watermark rings (`BG_PATTERN_RING_*`), and
2. eighteen repeated outer circles (`BG_PATTERN_ORBIT_*`).

The eighteen outer circles formed a bead-like halo across both text columns and the upper edge of the visa panel. The repeated circles added visual noise without communicating menu structure, reduced negative-space clarity, and made the page feel mechanically decorated. The eight central rings already provided sufficient passport-watermark character.

## Rollback-safe proof

A production duplicate was created on `99_QA`:

- `45:2 / QA_MENU_REDUCED_ORBIT_PATTERN_PROOF_2026_08_04`
- only the eighteen cloned `BG_PATTERN_ORBIT_*` nodes were set to `visible=false`
- all eight `BG_PATTERN_RING_*` nodes remained visible
- all menu, drink, visa, folio, divider, note, and guide nodes remained editable and structurally unchanged

Proof screenshot QA confirmed cleaner separation between the MENU and DRINK columns, reduced interference around the visa panel, and retained enough watermark depth through the central rings.

## Production change

Production frame `18:90 / FRAME_MENU_DRINK`:

- set `18:103` through `18:120` (`BG_PATTERN_ORBIT_0` through `BG_PATTERN_ORBIT_17`) to `visible=false`
- retained all eighteen nodes for rollback
- retained `18:95` through `18:102` (`BG_PATTERN_RING_*`) as visible

No node was deleted, flattened, rasterized, renamed, moved, or resized. No native text, menu content, drink content, visa content, frame geometry, crop, guide, or Drive source asset was changed.

## Post-write screenshot and structure QA

Verified on live production:

- the outer-circle halo is absent
- the central concentric watermark remains visible and restrained
- MENU and DRINK copy have cleaner negative space
- the visa panel is no longer visually crowded by repeated circles
- the folio, titles, subtitles, dividers, visa stamp, and footer note remain present
- all eighteen production orbit nodes remain present and rollback-safe with `visible=false`
- all eight production ring nodes remain present with `visible=true`
- all 12 text nodes remain native `TEXT`
- production frame remains `1480 × 2100`, `clipsContent=true`
- QA proof `45:2` remains on `99_QA`

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

Continue WEDDING PASSPORT. Audit `18:131 / FRAME_SEATING` at whole-item, reading-scale, and detail scale for the next concrete visual or print-readiness defect. Do not declare print readiness until printer geometry and physical proof are complete.
