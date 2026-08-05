# WEDDING PASSPORT — Seating Internal Footnote Suppression QA

Date: 2026-08-05

## Authority and scope

- Start authority: `main@38d275d10e954590965dbd5f02f3528aa3398d9b`
- Write-time authority: `main@38d275d10e954590965dbd5f02f3528aa3398d9b`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production target: `02_INSIDE / 18:131 / FRAME_SEATING`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- RURUBU/るるぶ targets: not read or modified.

## Visible defect

The live production seating chart still displayed the internal proof note `Final names and actual room geometry will replace this proof layout.` at the bottom edge. The sentence is process metadata for editors, not confirmed wedding content or guest-facing guidance. Keeping it visible in production creates a direct risk that an unfinished-proof disclaimer is exported into the final PDF.

## Rollback-safe proof

Created on `99_QA` before production mutation:

- Node: `73:2`
- Name: `QA_SEATING_INTERNAL_FOOTNOTE_SUPPRESSION_PROOF_2026_08_05`
- Size: `1480 × 2100`
- Proof footnote node: `73:94 / SEATING_FOOTNOTE`
- Change in proof: `visible=true → false`

The whole-item proof screenshot confirmed that hiding the note removes only internal process copy. The title, subtitle, head table, eleven guest-table frames, table labels, guest placeholders, spacing, and page balance remained intact with no clipping, overlap, or missing content.

## Production change

Changed only visibility on the retained native text node:

- `18:212 / SEATING_FOOTNOTE`
- Change: `visible=true → false`

The node retains its semantic name, original characters, position, dimensions, `Noto Sans JP Regular` font, `20px` size, `textAutoResize=HEIGHT`, and parent relationship. No node deletion, flattening, image conversion, text replacement, movement, resize, asset replacement, or Drive write was performed.

## Screenshot QA

Before:

- Internal editor-facing proof disclaimer visible at the bottom of the production seating chart.
- Risk of accidental inclusion in a guest-facing export.

After:

- Internal disclaimer no longer appears in the live production screenshot.
- Head-table hierarchy retained.
- Eleven table frames and all guest placeholders retained.
- No clipping, overlap, missing content, or new artifact observed.
- The lower margin now reads as intentional whitespace rather than unfinished production annotation.

## Structural readback

- Production frame: `1480 × 2100`
- `clipsContent=true`
- Production footnote node retained: `18:212`
- Production footnote visible: `false`
- Footnote remains native editable text and rollback-safe.
- QA proof retained on `99_QA` as `73:2`.

## Google Drive

- Drive authority folder confirmed live by ID and title.
- Drive changes: 0
- Asset regeneration: 0

The defect was confined to Figma native text visibility; no concrete defect was found in the Drive authority folder or existing assets.

## Current status

`LIVE_VISUAL_FIX_APPLIED / INTERNAL_PROOF_COPY_SUPPRESSED / NATIVE_TEXT_RETAINED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

## Remaining blocks

- Confirmed guest names and final table assignments
- Actual venue room geometry
- Print-vendor template
- Confirmed bleed, trim, safe-area, and fold specifications
- Long-name and full-capacity table stress test with final data
- 100% actual-size print test
- Placeholder exclusion gate
- Final PDF preflight
