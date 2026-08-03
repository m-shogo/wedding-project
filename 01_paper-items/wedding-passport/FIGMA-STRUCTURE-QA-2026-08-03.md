# WEDDING PASSPORT — Figma Structure QA 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / DESIGN_QA_PASS / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor
Starting main SHA: `3161df082cf2c960e84e4b9c6e81e5fae0083c4e`

## Live state verified

The Figma Plugin API returned four live pages:

- `00_README` (`0:1`)
- `01_OUTSIDE` (`1:2`)
- `02_INSIDE` (`1:3`)
- `99_QA` (`1:4`)

The ordinary metadata endpoint initially listed only `00_README`, so page existence was not inferred from that partial response. The live Plugin API structure was used as the authority.

## Defect found

Both production pages contained overlapping duplicate semantic frames with the same production names:

### `01_OUTSIDE`

- Current front cover: `18:2`
- Current back cover: `18:46`
- Legacy duplicate back cover: `1:5`
- Legacy duplicate front cover: `1:6`

### `02_INSIDE`

- Current menu/drink: `18:90`
- Current seating: `18:131`
- Legacy duplicate menu/drink: `1:21`
- Legacy duplicate seating: `1:22`

The legacy frames were visible and overlapped the rebuilt Current frames. Although the Current frames visually covered them, identical semantic names created export, selection, automation, and future-edit ambiguity.

## Safe correction

No nodes were deleted, flattened, rasterized, or replaced.

The four legacy frames were preserved for rollback, renamed, and hidden:

- `1:5` → `ARCHIVE_LEGACY_FRAME_BACK_COVER`, `visible=false`
- `1:6` → `ARCHIVE_LEGACY_FRAME_FRONT_COVER`, `visible=false`
- `1:21` → `ARCHIVE_LEGACY_FRAME_MENU_DRINK`, `visible=false`
- `1:22` → `ARCHIVE_LEGACY_FRAME_SEATING`, `visible=false`

The Current semantic frame IDs remain unchanged.

## Screenshot QA after correction

Whole-spread screenshots were captured after the structure cleanup.

### Outside

Verified:

- only the intended Current back and front covers are visible
- cover hierarchy remains intact
- navy/gold front cover and ivory journey-record back cover render without clipping
- Current front emblem, native text, date, location, document number, and microcopy remain visible

### Inside

Verified:

- only the intended Current menu/drink and seating frames are visible
- menu/drink copy, visa panel, and approval stamp remain intact
- all 11 seating groups remain visible
- final two-table row remains centered
- no visible regression was introduced by the structure cleanup

## Drive

No Drive asset was changed or regenerated. No concrete raster defect was identified in this execution.

## Remaining blockers

1. Replace dummy menu and drink copy with venue-authoritative content.
2. Replace all table names and guest names with final data.
3. Run longest-name and longest-line stress QA.
4. Confirm actual room geometry and final seating arrangement.
5. Apply the selected printer template, exact page order, bleed, safe area, and fold contract.
6. Review navy/gold output and smallest text at 100% actual size.
7. Export final PDF and complete a physical proof review.

## Next priority

Continue WEDDING PASSPORT because it is not print-ready. The next highest-value safe slice is native-text stress QA using deliberately long temporary proof strings, with rollback after measurement and no final-data fabrication.
