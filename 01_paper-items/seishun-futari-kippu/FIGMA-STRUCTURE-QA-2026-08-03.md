# 青春ふたりきっぷ — Figma Structure QA 2026-08-03

Status: `LIVE_STRUCTURE_CLEANUP_PASS / DESIGN_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`

Current authority checked live before write:
- GitHub `main`: `ab55749587e9da008cfe6bbdc846941e0f0db763`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Drive: current 青春ふたりきっぷ research/authority documents and production folder references remain accessible

## Live grounding

The normal Figma metadata endpoint initially listed only `00_README`. A programmatic live inspection confirmed that the file actually contains:

- `00_README`
- `01_LABEL`
- `99_QA`

The production page contained two visible top-level frames with the same semantic name:

- legacy `1:4` — `FRAME_LABEL`, `780 × 310`
- current `11:2` — `FRAME_LABEL`, `720 × 250`

This duplicate visible semantic target created a concrete risk of selecting or exporting the wrong frame. The current frame is the live rebuilt production design documented in `FIGMA-LIVE-CHECKPOINT-2026-08-01.md`.

## Safe Figma change

Applied a non-destructive archive operation only to the legacy frame:

- `1:4` renamed to `ARCHIVE_LEGACY_FRAME_LABEL`
- `1:4` set to `visible=false`

Preserved without modification:

- current production frame `11:2`
- all native editable text
- semantic node names inside the current frame
- vector and decorative geometry
- crop/editability and rollback capability

No node was deleted, flattened, rasterized, or fully replaced.

## Screenshot QA

Post-change screenshot of `11:2` at its natural `720 × 250` size confirmed:

- title, subtitle, route, date, issue number, train, red `祝`, and blue gate stamp remain visible
- no clipping, overlap, missing content, or unintended visual regression
- the production page now has exactly one visible `FRAME_LABEL` semantic target

## Drive

Drive writes: `0`

No asset regeneration was justified. The observed defect was Figma structure ambiguity, not an asset-quality defect.

## Remaining blockers

Before `PRINT_READY`:

1. Measure the real MINTIA application area.
2. Confirm final mm dimensions, bleed, trim, safe area, and corner behavior.
3. Print at 100% scale and apply to the actual case.
4. Verify normal viewing-distance legibility and adhesion.
5. Export and inspect the final print PDF.

## Declaration

Current state:

`LIVE_STRUCTURE_CLEANUP_PASS / DESIGN_QA_PASS / PHYSICAL_MEASUREMENT_PENDING / NOT_PRINT_READY`
