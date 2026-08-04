# WEDDING PASSPORT — Seating orbit-pattern reduction QA

Date: 2026-08-05 JST

## Authority and scope

- GitHub Current authority checked immediately before write: `main` at `543c76ec2bfb95dcd9467dd5abd5bd6e3be0cbbf`.
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`.
- Production page/frame: `02_INSIDE` / `18:131 FRAME_SEATING` (`1480 × 2100`).
- RURUBU/るるぶ files, pages, materials, and item-specific records were not read or modified.
- Google Drive authority folder was live-confirmed as `01_パスポート風_メニュー・ドリンク・座席表` (`1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`). No Drive write was required.

## Visible problem

The seating chart retained two decorative background systems:

- 8 central concentric watermark rings (`BG_PATTERN_RING_*`), and
- 18 outer orbit circles (`BG_PATTERN_ORBIT_0` through `17`).

The outer circles repeated behind the table-card field without carrying seating, zone, guest, or room-geometry meaning. At reading scale they created a faint but continuous halo across multiple cards and weakened whitespace separation. The central rings alone were sufficient to retain the passport-watermark character.

## Rollback-safe proof

A production duplicate was created on `99_QA`:

- `46:2 QA_SEATING_REDUCED_ORBIT_PATTERN_PROOF_2026_08_05`

Only the 18 cloned `BG_PATTERN_ORBIT_*` nodes were set to `visible=false`. The proof screenshot confirmed that table labels, guest placeholders, zones, head table, footer note, rule, guides, and central watermark remained intact.

## Production change

Within `18:131 FRAME_SEATING`:

- `18:144` through `18:161`
- `BG_PATTERN_ORBIT_0` through `BG_PATTERN_ORBIT_17`
- `visible=true` → `visible=false`

No node was deleted, flattened, rasterized, moved, resized, or renamed. All 18 production nodes remain available for rollback.

## Screenshot QA result

Post-write screenshot at `1269 × 1800` render (`1480 × 2100` natural size) confirmed:

- the outer halo no longer crosses the table-card field;
- the 8 central watermark rings remain visible and subdued;
- all 11 table cards and the BRIDE & GROOM block remain present;
- native text remains editable (`38` text nodes);
- no new clipping, overlap, missing content, or alignment regression was introduced;
- the final-name/actual-room-geometry disclaimer remains visible, so the proof layout is not misrepresented as final seating.

## Drive and asset result

- Drive change: none.
- Asset regeneration: none.
- Reason: the defect was confined to Figma-native decorative geometry; no source asset defect was identified.

## Status and remaining blocks

Status: `LIVE_VISUAL_FIX_APPLIED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include confirmed guest names, final table assignment, actual venue-room geometry, print-vendor template, bleed/safe/fold specification, 100% physical proof, and final PDF preflight. This change does not elevate the seating page to print-ready status.
