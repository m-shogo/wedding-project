# WEDDING PASSPORT — Seating false-color coding removal QA

Date: 2026-08-05 JST

## Authority and scope

- GitHub Current authority checked at start and immediately before write: `main` at `04799aac5ded81ffb7bd6ebb0e21849cb594e3a2`.
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`.
- Production page/frame: `02_INSIDE` / `18:131 FRAME_SEATING` (`1480 × 2100`).
- RURUBU/るるぶ files, pages, materials, and item-specific records were not read or modified.
- Google Drive authority folder was live-confirmed as `01_パスポート風_メニュー・ドリンク・座席表` (`1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`). No Drive write was required.

## Visible problem

Each of the 11 table cards used a large red, blue, or gold circle before its table number. The colors cycled independently of the explicit `ZONE A` through `ZONE D` labels and had no legend, table-country meaning, guest classification, or room-geometry function.

At reading scale this implied a second color-coding system that did not exist. It also consumed the strongest area of every card and forced the editable table-number labels to begin at `x=105`, while the guest names began at `x=28`.

## Rollback-safe proof

A production duplicate was created on `99_QA`:

- `50:2 QA_SEATING_REMOVE_FALSE_COLOR_CODING_PROOF_2026_08_05`

Within the proof only:

- `TABLE_01_SHAPE` through `TABLE_11_SHAPE` were set to `visible=false`;
- `TABLE_01_LABEL` through `TABLE_11_LABEL` were moved from `x=105` to `x=28`;
- label widths were expanded from `250` to `336`, matching the editable guest-name field width.

The proof screenshot confirmed that the cards remained readable without inventing an alternate legend and that the table-number and guest-name columns formed one consistent left edge.

## Production change

Within `18:131 FRAME_SEATING`:

- 11 existing color-marker ellipses remain in place but are now `visible=false`;
- 11 native table-label text nodes remain editable at `x=28`, width `336`;
- no node was deleted, flattened, rasterized, or renamed;
- guest placeholders, zone labels, card geometry, head table, footnote, guides, and central watermark were not changed.

## Screenshot QA result

Post-write screenshot at `1269 × 1800` render (`1480 × 2100` natural size) confirmed:

- no unsupported red/blue/gold legend remains;
- table numbers and guest names share a consistent left alignment;
- all 11 table cards and the `BRIDE & GROOM` block remain present;
- `ZONE A` through `ZONE D` remain the only explicit grouping system;
- no new clipping, overlap, missing content, or card-spacing regression was introduced;
- the final-name/actual-room-geometry disclaimer remains visible.

## Structural readback

- production frame: `1480 × 2100`, `clipsContent=true`;
- native text count: `38`;
- 11 marker nodes retained with `visible=false` for rollback;
- 11 label nodes retained as native `TEXT`, each at `x=28`, width `336`;
- rollback proof `50:2` remains on `99_QA`.

## Drive and asset result

- Drive change: none.
- Asset regeneration: none.
- Reason: the defect was entirely Figma-native geometry and visual semantics; no source asset defect was identified.

## Status and remaining blocks

Status: `LIVE_VISUAL_FIX_APPLIED / FALSE_COLOR_CODING_REMOVED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include confirmed guest names, final table assignment, actual venue-room geometry, print-vendor template, bleed/safe/fold specification, 100% physical proof, and final PDF preflight. This change does not elevate the seating page to print-ready status.
