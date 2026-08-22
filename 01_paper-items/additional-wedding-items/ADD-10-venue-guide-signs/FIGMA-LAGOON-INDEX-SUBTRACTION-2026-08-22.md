# ADD-10 — decorative lagoon-index subtraction QA

Date: 2026-08-22
Start main: `eba69db5bbfa7dead10452868aac8af27d6cf1ac`
State: `CURRENT_RETAINED / BOUNDED_SUBTRACTION / PASS`

## Live authority

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- Current LEFT / RIGHT / FORWARD: `49:3 / 49:19 / 49:33`
- realistic long-copy stress: `49:47`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`

## Visible problem

Current `COLOR SIGNAL` already had a strong functional hierarchy: destination, floor/room, one oversized directional SVG, guidance band and date. A small rounded lagoon pill at the upper-right (`DECOR / LAGOON INDEX`) had no destination, direction, binding, trim, scan or other physical function. At whole-item scale it read as a generic UI/template accent and duplicated the suite's previously identified pill/capsule grammar.

## Bounded comparison

Rollback-safe LEFT comparison:

- `52:2 / QA / ADD10 / LEFT / NO DECORATIVE LAGOON INDEX / 2026-08-22`

Only the lagoon index was hidden. All text, arrow geometry, colors, guidance band, date and functional yellow/coral/lagoon lower accents remained unchanged.

The comparison was visually cleaner and preserved instant direction recognition. The removed pill did not bind any information or explain any state.

This applies the already cross-item-verified method from NRSL-002: retain a line/field only when it proves a real binding or physical function at whole-item scale. It does not create a new global `remove pills` rule.

## Production repair

Before the production edit, complete LEFT / RIGHT / FORWARD Current roots were cloned to hidden rollback copies.

`DECOR / LAGOON INDEX` was then hidden in:

- LEFT `49:5`;
- RIGHT `49:21`;
- FORWARD `49:35`;
- long-copy stress `49:49`.

No direction SVG or semantic text changed.

## QA

Fresh RIGHT screenshot after promotion: PASS.

Structure readback:

- LEFT / RIGHT / FORWARD / stress each retain native visible text `5`;
- fixed-height text `0` for all four roots;
- visible text outside root `0` for all four roots;
- IMAGE fills `0` for all four roots;
- lagoon index visible `false` for all four roots.

The large coral direction remains the unambiguous first-glance signal. Removing the nonfunctional upper-right pill gives the dark field more intentional negative space and reduces generic AI-template decoration.

Image generation: `0`.
Drive writes: `0`.

## Decision

`PASS / CURRENT_RETAINED`.

ADD-10 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`; this was a bounded subtraction within the existing selected COLOR SIGNAL direction, not a new version.