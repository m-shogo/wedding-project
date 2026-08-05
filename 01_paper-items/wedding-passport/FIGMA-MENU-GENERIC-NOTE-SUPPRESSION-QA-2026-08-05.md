# WEDDING PASSPORT — GENERIC MENU NOTE SUPPRESSION QA

Date: 2026-08-05
Current authority at write check: `main@dd5511dfd43e697e1e1bc48562c48198f72d6679`
Figma file key: `UbK8KmuWJcDeGScsN49Uor`
Production page/frame: `02_INSIDE / 18:90 / FRAME_MENU_DRINK`
Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Problem

After the nonessential VISA panel was suppressed, the live menu retained a single generic English sentence at `y=1320`:

`Please enjoy each course as part of the journey.`

The sentence was not confirmed event information, did not provide allergy or service guidance, and appeared as an isolated orphan line far below the actual MENU/DRINK content. It added decorative filler rather than useful print information and weakened the edited-document hierarchy.

## Rollback-safe proof

Created on `99_QA`:

- `69:2 / QA_MENU_GENERIC_NOTE_SUPPRESSION_PROOF_2026_08_05`

Proof-only change:

- cloned `MENU_NOTE / 69:42`: `visible=true` → `visible=false`

The proof screenshot preserved the six course placeholders, five drink placeholders, folio, titles, subtitles, dividers, safe production frame, and all native editable text. No clipping, overlap, or content loss was observed.

## Production change

Applied to `18:90 / FRAME_MENU_DRINK`:

- `18:130 / MENU_NOTE`: `visible=true` → `visible=false`

The node was retained with its original semantic name, text content, position, dimensions, font, and parent relationship. No deletion, flattening, rasterization, movement, resizing, or asset replacement occurred.

## Screenshot QA

Validated the rollback proof and live production at whole-item scale after the change.

- MENU and DRINK hierarchy remains intact.
- Six course placeholders remain visible.
- Five drink placeholders remain visible.
- No clipping, overlap, missing content, or new artifact was observed.
- The generic orphan sentence no longer competes with the actual editable content area.
- The lower page remains intentionally available for confirmed long-form menu, allergy, or service information rather than filler copy.

## Structure readback

- Production frame: `1480 × 2100`
- `clipsContent=true`
- Visible production text nodes: `11`
- `MENU_NOTE` retained as native TEXT
- Original note value retained: `Please enjoy each course as part of the journey.`
- `MENU_NOTE visible=false`
- Rollback proof retained on `99_QA`

## Google Drive

No Drive change and no asset regeneration. The defect was confined to native Figma copy visibility. Live authority folder readback:

- `01_パスポート風_メニュー・ドリンク・座席表`
- Folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Status

`LIVE_VISUAL_FIX_APPLIED / GENERIC_ORPHAN_NOTE_SUPPRESSED / NATIVE_TEXT_RETAINED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blockers include confirmed menu and drink content, actual course count, allergy-label policy, printer template, bleed/safe-area/fold specifications, 100% actual-size test print, placeholder-removal gate, and final PDF preflight.
