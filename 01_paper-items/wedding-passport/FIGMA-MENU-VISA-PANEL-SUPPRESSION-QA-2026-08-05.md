# WEDDING PASSPORT — MENU VISA PANEL SUPPRESSION QA

Date: 2026-08-05
Current authority at write check: `main@1a32db73b3d10de591a63b6e52efd70eb9cdfa45`
Figma file key: `UbK8KmuWJcDeGScsN49Uor`
Production page/frame: `02_INSIDE / 18:90 / FRAME_MENU_DRINK`
Drive authority folder: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Problem

The lower half of the live menu page contained a 1300 × 500 px `CULINARY ENTRY VISA` panel. Its fields (`YOK / 24 OCT 2026`, `PURPOSE CELEBRATION`, `STATUS INVITED GUEST`, `ENTRIES UNLIMITED MEMORIES`) did not communicate menu or drink information, consumed substantial layout capacity, and presented decorative copy as document-like data. The visible `CONTENT PENDING` stamp further emphasized an unfinished state in the production composition.

## Rollback-safe proof

Created on `99_QA`:

- `68:2 / QA_MENU_VISA_PANEL_REMOVAL_PROOF_2026_08_05`

Proof-only changes:

- `MENU_VISA_PANEL`: `visible=true` → `visible=false`
- `MENU_NOTE`: `y=1840` → `y=1320`

The before state remains recoverable because the panel and all six descendants are retained, not deleted or flattened.

## Production change

Applied to `18:90 / FRAME_MENU_DRINK`:

- `21:23 / MENU_VISA_PANEL`: `visible=true` → `visible=false`
- `18:130 / MENU_NOTE`: `y=1840` → `y=1320`

No text content, semantic names, fonts, fills, course placeholders, drink placeholders, guides, frame dimensions, or parent-child relationships were changed.

## Screenshot QA

Validated both the proof and live production at the full 1480 × 2100 frame scale.

- MENU and DRINK hierarchy remains intact.
- Six course placeholders and five drink placeholders remain visible.
- No clipping, overlap, missing content, or new artifact was observed.
- The lower layout now provides expansion capacity for real menu descriptions and allergen/annotation content instead of reserving 500 px for nonessential decoration.
- `MENU_NOTE` remains within the safe content area and remains native editable text.

## Structure readback

- Production frame: 1480 × 2100
- `clipsContent=true`
- `MENU_VISA_PANEL` retained as a hidden FRAME
- Panel descendants retained: 6
- `MENU_NOTE`: Noto Sans JP Regular, 22 px, native TEXT, `textAutoResize=HEIGHT`
- Visible production text nodes outside the hidden parent remain editable.
- No deletion, flattening, rasterization, or asset replacement.

## Google Drive

No Drive change and no asset regeneration. The issue was confined to native Figma layout. The existing authority folder remains:

- `01_パスポート風_メニュー・ドリンク・座席表`
- Folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Status

`LIVE_VISUAL_FIX_APPLIED / NONESSENTIAL_VISA_PANEL_SUPPRESSED / CONTENT_CAPACITY_INCREASED / ROLLBACK_SAFE / FINAL_CONTENT_PENDING / NOT_PRINT_READY`

Remaining blockers include confirmed menu and drink content, actual course count, allergy-label policy, printer template, bleed/safe-area/fold specifications, 100% actual-size test print, placeholder removal gate, and final PDF preflight.
