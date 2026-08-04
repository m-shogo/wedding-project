# WEDDING PASSPORT — SEATING long-name capacity QA

Date: 2026-08-05
Authority at write: `main` SHA `4f237a71f50783bb240adc12d6384b3a394484f4`

## Scope

- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `02_INSIDE`
- Production frame: `18:131 / FRAME_SEATING`
- QA proof: `54:2 / QA_SEATING_LONG_NAME_CAPACITY_PROOF_2026_08_05`
- RURUBU/るるぶ targets: not read or modified

## Live problem observed

The production table cards reserved the guest-name region from `y=105` while leaving the `ZONE` label at the lower-right (`y=235`). With a 280 px card height and 24 px auto line height, the usable name area was effectively sized for roughly three to four short romanized names. This did not provide credible tolerance for long Japanese full names or normal six-to-eight-person table occupancy.

## Proof-first change

A full production duplicate was created on `99_QA` before the production edit.

In the proof only:

- all 11 `*_ZONE` labels were moved into the top-right header row (`x=250`, `y=31`);
- all 11 `*_GUESTS` text nodes were moved to `y=76`;
- guest text was set to `22 px` with explicit `24 px` line height;
- `TABLE_01_GUESTS` was temporarily replaced with eight long Japanese names to test wrapping, vertical capacity, clipping, and collision.

The proof screenshot showed all eight stress-test names inside the card without collision with the table label, zone label, border, or adjacent cards.

## Production change

Applied to all 11 table cards:

- `TABLE_##_GUESTS`: `y 105 → 76`, `fontSize 24 → 22`, `lineHeight AUTO → 24 px`;
- `TABLE_##_ZONE`: `y 235 → 31` (`x=250` retained).

No production guest names, table labels, zones, fills, dimensions, semantic names, hierarchy, or hidden rollback nodes were replaced or deleted.

## Visual QA

Production screenshot after the edit confirmed:

- the zone label now shares the header row with the table number;
- the guest list has materially more usable vertical capacity;
- existing short placeholder names remain clear and unclipped;
- no new overlap, clipping, missing text, or border collision;
- all 11 cards and the `BRIDE & GROOM` block remain intact;
- the final-data disclaimer remains visible.

## Structure and rollback

- native editable text retained;
- no flattening, rasterization, deletion, or whole-frame replacement;
- QA proof retained at node `54:2`;
- production frame remains `1480 × 2100`;
- prior hidden geometry remains available for rollback.

## Google Drive

Live parent folder confirmed:

- `01_パスポート風_メニュー・ドリンク・座席表`
- folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

No Drive file was changed because the defect and correction were Figma-native typography/layout only.

## Status

`LIVE_VISUAL_FIX_APPLIED / LONG_NAME_CAPACITY_IMPROVED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blocks include final guest names, final table allocation, actual room geometry, printer template and bleed/safe-area contract, 100% physical proof, and final PDF preflight.
