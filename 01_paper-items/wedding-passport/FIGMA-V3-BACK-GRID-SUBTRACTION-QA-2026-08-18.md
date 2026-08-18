# WEDDING PASSPORT — V3 back grid subtraction QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / BACK_GRID_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `0a16d06561c7f4ec664034ca669b9a8c4c238cbc`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected V3 front: `144:3`
- selected V3 back: `144:26`
- back long-copy stress: `145:29`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production remains untouched.

## Visible issue

Fresh whole-item and actual-size review found that the lower dark field on the selected clean-room V3 back used horizontal + vertical grid vectors behind the route trace. The route itself already communicated the journey metaphor, while the grid made the lower field read like a data chart/admin visualization rather than a physical passport/editorial artifact.

This is a bounded subtraction test under the existing selected clean-room direction, not a return to legacy production and not a new asset requirement.

## Bounded comparison

Rollback-safe comparison:

- `161:2 / QA / PASSPORT V3 BACK / ROUTE WITHOUT GRID / 2026-08-18`

Only the two decorative grid vectors inside `VECTOR / LOG GRID TRACE` were hidden. The orange route trace, both endpoint dots, `2026.10.24 / YOKOHAMA`, `[発行情報]`, Japanese headline/body/final-message placeholder, color fields and typography were unchanged.

The no-grid candidate was materially stronger at thumbnail and actual size: the lower panel reads as a quiet route field instead of a chart.

## Promotion / rollback

Promoted to selected clean-room V3 back:

- selected grid vectors hidden: `144:34`, `144:35`
- stress grid vectors hidden: `145:37`, `145:38`

Hidden rollback copies:

- selected back pre-change: `162:2`
- stress back pre-change: `162:19`

Comparison `161:2` was hidden after promotion.

## Three-scale / structure QA

- whole item / 500px: PASS
- reading scale: PASS
- actual size / native `1480×2100`: PASS
- selected visible native text: 5
- stress visible native text: 7
- outside visible text: `0 / 0`
- same-parent text collisions: `0 / 0`
- IMAGE fills: `0 / 0`
- decorative grid vectors: hidden in selected + stress
- route trace + semantic route/date/issue roles preserved

No image generation or Drive write was needed; imagery was not the bottleneck.

## Decision

`BACK_GRID_SUBTRACTION_PASS`.

This change removes a chart/UI signal while retaining the item-specific passport journey metaphor and all editable semantic content. The existing clean-room selected family remains current, with final factual/vendor proof deferred.
