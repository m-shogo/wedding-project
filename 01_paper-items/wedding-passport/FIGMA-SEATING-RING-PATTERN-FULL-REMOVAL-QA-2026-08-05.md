# WEDDING PASSPORT — Seating Ring Pattern Full Removal QA

Date: 2026-08-05

## Authority and scope

- Start authority: `main@27447af785f1b374ca05edc3fa90f220c087d1f9`
- Write-time authority: `main@11e06ec66e63e6d3d774b70080869a0ccd1855fd`
- Concurrent change detected before Git write: yes; latest change was outside this item-specific path, so this record was added as a new file without overwriting existing content.
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production target: `02_INSIDE / 18:131 / FRAME_SEATING`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- RURUBU/るるぶ targets: not read or modified.

## Visible defect

The live seating chart retained eight evenly spaced concentric ellipses behind the table grid. They did not encode table count, room geometry, navigation, fold, trim, safe area, or any confirmed wedding information. In the whole-item screenshot they appeared as a faint target-like mechanical decoration behind TABLE 02/05/08, adding visual noise and AI-like ornament without improving hierarchy.

## Rollback-safe proof

Created on `99_QA` before production mutation:

- Node: `71:2`
- Name: `QA_SEATING_RING_PATTERN_REMOVAL_PROOF_2026_08_05`
- Size: `1480 × 2100`
- Ring nodes retained: 8
- Visible rings in proof: 0

The proof screenshot confirmed that removing the pattern did not cause clipping, overlap, hierarchy loss, table loss, or content loss.

## Production change

Changed only visibility on these retained ellipse nodes:

- `18:136 / BG_PATTERN_RING_80`
- `18:137 / BG_PATTERN_RING_125`
- `18:138 / BG_PATTERN_RING_170`
- `18:139 / BG_PATTERN_RING_215`
- `18:140 / BG_PATTERN_RING_260`
- `18:141 / BG_PATTERN_RING_305`
- `18:142 / BG_PATTERN_RING_350`
- `18:143 / BG_PATTERN_RING_395`

Change: `visible=true → false`.

No node deletion, flattening, image conversion, text mutation, renaming, movement, resize, material replacement, or Drive write was performed.

## Screenshot QA

Before:

- Eight concentric rings visible behind the central table grid.
- Target-like decoration competed faintly with TABLE 02/05/08.

After:

- Concentric ring visibility: `8 → 0`.
- Main-table hierarchy retained.
- Eleven table frames retained.
- Guest placeholders retained and readable.
- No clipping, overlap, missing content, or new artifact observed.
- The page reads as a restrained seating proof rather than a decorated UI canvas.

## Structural readback

- Production frame: `1480 × 2100`
- `clipsContent=true`
- Table frames: 11
- Native editable text nodes: 38
- Guest text nodes: 11
- Ring nodes retained: 8
- Visible ring nodes: 0
- Rollback proof retained on `99_QA`.

## Google Drive

- Drive changes: 0
- Asset regeneration: 0

The defect was confined to native Figma decoration; no concrete defect was found in the Drive authority folder or its assets.

## Current status

`LIVE_VISUAL_FIX_APPLIED / MEANINGLESS_SEATING_RING_PATTERN_REMOVED / NODES_RETAINED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

## Remaining blocks

- Confirmed guest names and final table assignments
- Actual venue room geometry
- Final guide/classification convention if needed
- Print-vendor template
- Confirmed bleed, trim, safe-area, and fold specifications
- 100% actual-size print test
- Placeholder exclusion gate
- Final PDF preflight
