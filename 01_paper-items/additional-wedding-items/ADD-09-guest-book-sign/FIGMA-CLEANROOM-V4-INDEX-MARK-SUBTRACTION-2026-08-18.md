# ADD-09 Guest Book V4 — Index Mark Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED_IN_SELECTED_V4 / LONG_COPY_REVALIDATED / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `f3cb5ecbe8ee007c424d8b0e8643325b69151878`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected clean-room V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy stress: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`
- retained legacy production: `1:3`
- Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

## Visible problem

Fresh whole-item review showed an isolated dark vertical rectangle at the upper-right edge (`VECTOR / INDEX MARK`). The red top rule already binds the title/date field and the large continuous journey line supplies the artifact's distinct fixed-art identity. The extra dark bar did not add a print, binding, writing, or wayfinding function and read as a stray tab/UI marker.

## Bounded comparison

Rollback-safe comparison page:

- `22:2 / QA / ADD-09 / INDEX MARK SUBTRACTION / 2026-08-18`
- candidate: `22:3`

The candidate changed only one thing:

- hide `VECTOR / INDEX MARK`.

Preserved without change:

- top red rule;
- native headline and date;
- continuous journey-line fixed art;
- lower instruction area and foot rule;
- semantic placeholders;
- canvas/safe area.

The candidate was visually cleaner at whole-item scale without weakening title/date binding or guest-book identity, so the subtraction was adopted.

## Rollback / adoption

Pre-change hidden rollbacks:

- selected: `22:23`
- long-copy stress: `22:43`

The matching index mark was hidden in both selected `16:3` and stress `17:4`.

## QA

After adoption:

- whole-item / 500–900px: PASS
- actual canvas: `1000×1419`
- raster IMAGE fills added: `0`
- selected fixed-art journey line remains intact
- long-copy stress text outside root: `0`
- long-copy screenshot: PASS
- headline/date bounding boxes are close in stress but visible glyphs do not collide
- stress returned to hidden QA state after verification

## Drive / image decision

Drive authority was live-read before the change. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED` — the defect was redundant fixed decoration, not missing imagery.

## Decision

The selected V4 retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

and gains `REDUNDANT_INDEX_MARK_SUBTRACTION_PASS`.

This exact visual treatment is item-specific. The reusable method is the already-established binding-function check: remove a visible mark only when whole-item comparison proves that no real grouping or physical role is lost.
