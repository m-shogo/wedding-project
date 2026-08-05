# WEDDING PASSPORT — Seven-Guest Table Capacity QA

Date: 2026-08-05

## Authority and scope

- Start authority: `main@f451176557978e2848b822cf57b782bbd6f2a454`
- Write-time authority: `main@f451176557978e2848b822cf57b782bbd6f2a454`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production target: `02_INSIDE / 18:131 / FRAME_SEATING`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- RURUBU/るるぶ targets: not read or modified.

## Requirement

The confirmed design ceiling is seven guests per table. The seating proof must support eleven tables × seven editable guest-name rows without expanding to an eight-person assumption or blocking on final names.

## Rollback-safe proof

Created on `99_QA` before production mutation:

- Node: `74:2`
- Name: `QA_SEATING_7_GUEST_CAPACITY_PROOF_2026_08_05`
- Size: `1480 × 2100`
- Guest text nodes: 11
- Placeholder rows: 77 total

Each proof guest text node remained native editable text with `textAutoResize=HEIGHT`, width `336px`, font size `24px`, and seven semantic placeholder rows.

## Proof QA

All eleven table groups are `390 × 300px`. Each seven-line guest block measured:

- x: `28px`
- y: `72px`
- width: `336px`
- height: `182px`
- bottom edge: `254px`
- parent bottom edge: `300px`
- remaining internal clearance: `46px`

Machine readback confirmed:

- `allSeven=true`
- `allWithinParent=true`
- clipping: none
- total placeholder rows: 77
- native editable text retained

The proof screenshot showed all eleven tables preserved without missing rows, overlap, or table-frame clipping.

## Production change

Updated the retained native guest text nodes only:

- `18:171`
- `18:175`
- `18:179`
- `18:183`
- `18:187`
- `18:191`
- `18:195`
- `18:199`
- `18:203`
- `18:207`
- `18:211`

Each table now contains seven explicit semantic rows (`GUEST NAME 01` through `GUEST NAME 77`). No real or plausible guest names were invented.

No node deletion, flattening, image conversion, parent replacement, movement, resize, asset replacement, or Drive write was performed.

## Production readback

- Frame: `1480 × 2100`
- `clipsContent=true`
- Table count: 11
- Guest slots: 77
- Rows per table: 7
- Guest text height: `182px`
- Guest text bottom: `254px`
- Parent height: `300px`
- All guest blocks within parent: true
- Font size: `24px`
- `textAutoResize=HEIGHT`
- All guest fields remain native editable text.

## Google Drive

- Drive authority folder confirmed by live ID/title readback.
- Drive changes: 0
- Asset regeneration: 0

The requirement was resolved entirely in the Figma native text structure.

## Current status

`SEATING_7_GUEST_CAPACITY_VERIFIED / 77_NATIVE_PLACEHOLDERS / ROLLBACK_SAFE / FINAL_NAMES_PENDING / NOT_PRINT_READY`

The seven-person capacity requirement is no longer a blocker. Final names and table assignments remain deferred finalization inputs and must not prevent work from moving to the next item.

## Deferred finalization

- Confirmed guest names
- Final table assignments
- Actual venue room geometry
- Print-vendor template and confirmed bleed/trim/safe-area/fold specifications
- 100% actual-size print test
- Placeholder exclusion gate
- Final PDF preflight

## Next item

Proceed to BOARDING PASS live-state audit and the highest-value incomplete design defect. Do not continue micro-polishing the passport unless a new major visible or structural defect is evidenced.
