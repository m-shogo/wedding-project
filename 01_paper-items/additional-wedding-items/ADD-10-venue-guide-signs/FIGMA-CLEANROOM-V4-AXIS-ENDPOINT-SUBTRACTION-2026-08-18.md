# ADD-10 Venue Guide V4 — Axis Endpoint Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED_IN_SELECTED_V4_FAMILY / LONG_COPY_REVALIDATED / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `b37d81d321958f7a2121a942886915d142cdb2a3`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- selected clean-room V4 left/right/forward: `32:3 / 32:15 / 32:27`
- long-copy stress: `33:3 / 33:15 / 33:27`
- retained legacy family: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`

## Visible problem

Fresh whole-item review of selected V4 left showed a small rust filled circle at the non-arrow end of the mint direction axis. The arrowhead and long mint line already communicate direction unambiguously. The rust dot added no trim, binding, route, destination, or installation semantics and made the axis read slightly like a slider/progress control.

The same endpoint dot existed in right and forward variants and their hidden long-copy stress roots.

## Bounded comparison

Rollback-safe comparison page:

- `41:2 / QA / ADD-10 / AXIS ENDPOINT SUBTRACTION / 2026-08-18`
- left candidate: `41:3`

The candidate hid only the 30×30 rust endpoint vector. It preserved:

- oversized Japanese destination hierarchy;
- English support destination;
- floor/room semantic placeholder;
- mint direction line and arrowhead;
- warm paper field;
- all native variable copy;
- all canvas/safe-area geometry.

Whole-item comparison was cleaner and more purely wayfinding-oriented, so the subtraction was adopted across all three selected directions and all three stress roots.

## Rollback

Pre-change hidden rollbacks:

- selected/stress family: `41:16 / 41:29 / 41:42 / 41:54 / 41:67 / 41:80`

## QA

After adoption:

- selected left/right/forward whole-item screenshots: PASS
- right `32:15`: direction remains immediate at 500px
- forward `32:27`: vertical direction remains immediate at 500px
- actual working canvas remains `1400×1980`
- IMAGE fills added: `0`
- all six direction-axis endpoint dots: hidden
- line + arrowhead remain editable vector roles

Long-copy stress `33:3 / 33:15 / 33:27` was temporarily exposed and revalidated:

- outside visible text: `0 / 0 / 0`
- text-to-text collisions: `0 / 0 / 0`
- endpoint dot visible: `false / false / false`
- actual-size left stress screenshot: PASS
- stress roots returned to hidden QA state after verification

## Drive / image decision

Drive authority was live-read before Git write. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED` — the defect was redundant axis decoration, not missing imagery.

## Decision

The selected V4 family retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

and gains `DIRECTION_AXIS_ENDPOINT_UI_SUBTRACTION_PASS`.

The exact arrow geometry and colors remain item-specific. The reusable principle is only that a secondary endpoint marker should be removed when the functional line/arrow already communicates direction and whole-item comparison shows no grouping/physical role is lost.
