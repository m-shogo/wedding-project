# ADD-09 Guest Book V4 — Secondary Route Subtraction QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PjFWBpDwaQM5LfvgdqSFvU`
- selected V4: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy proof: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`
- Drive: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- retained legacy production remains unchanged.

## Visible problem

Fresh whole-item review found that V4 contained two independent journey-route gestures inside the same fixed-art field:

1. the dominant continuous navy journey line with three open journey nodes;
2. a second lower dotted route with two small rust endpoint dots.

The primary line already established the item-specific `journey / record` identity. The second route did not bind new information and introduced extra map/infographic semantics below the main art.

## Bounded comparison

Rollback-safe comparison `23:2 / QA_ADD09_V4_PRIMARY_JOURNEY_LINE_ONLY_2026_08_18` removed only:

- the secondary dotted route vector;
- its two small endpoint dots.

The primary continuous journey line, its three open journey nodes, headline, date, top rule, instruction rail, native semantic placeholders, canvas and safe area were unchanged.

Whole-item comparison was stronger with the secondary route removed: the fixed art reads as one deliberate handwritten journey gesture rather than two competing route systems.

## Adopted change

The same subtraction was applied to selected `16:3` and long-copy proof `17:4`.

Hidden pre-change rollbacks:

- selected: `23:22`
- long-copy: `23:42`

Hidden comparison retained: `23:2`.

Exact hidden fixed-art nodes in selected:

- secondary route: `16:11`
- secondary endpoint dots: `16:15`, `16:16`

Stress proof synchronized:

- `17:12`, `17:16`, `17:17` hidden.

## Three-scale / structure QA

- selected whole-item at 700px: PASS; the Japanese headline and one continuous route remain the dominant read;
- reading/native `1000×1419`: PASS;
- guest instructions and date remain unchanged;
- variable/operational copy remains native editable text;
- IMAGE fills remain `0`;
- no factual or final copy was added;
- long-copy proof remains separate/hidden after synchronization.

## Hybrid / asset decision

`IMAGE_GENERATION_NOT_REQUIRED`.

This was a fixed-vector subtraction problem, not an asset-quality problem. Drive write: `0`.

## Decision

The selected clean-room V4 remains current with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`. The change reduces infographic/UI-like route duplication while preserving the item-specific journey-line identity.