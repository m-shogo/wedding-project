# ADD-16 — Japanese kicker polish QA

Date: 2026-08-22
Start main: `b450e38a111c9243b4a03c3c2c0062f89ed2e4f5`
State: `CURRENT_RETAINED / BOUNDED_TYPOGRAPHY_REPAIR / PASS`

## Live authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Current front: `57:3 / CURRENT_SELECTED / ADD16 / FRONT / HOME TEXTILE MAT`
- long-copy front proof: `57:36`
- exact Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`

## Visible problem

At actual-size review the small front kicker `A HOME TO CARRY WITH US` read as generic English editorial filler. It described the internal art-direction idea rather than helping the guest understand the object, and it weakened the Japanese-first hierarchy required by the current professional design standard.

The rest of HOME TEXTILE MAT remained strong and did not warrant a clean-room redesign.

## Bounded repair

Before the edit, the complete Current front was cloned to hidden rollback:

- `63:2 / ROLLBACK / ADD16 / FRONT / PRE-JAPANESE-KICKER / 2026-08-22`

Only `TEXT / KICKER` changed:

- Current `57:10`: `A HOME TO CARRY WITH US` → `両親へ`
- stress `57:43`: same change

The text remains native/editable. Existing position, width, size, hierarchy and HOME TEXTILE MAT composition were preserved. No decoration, color, spacing, body copy, signature or date geometry changed.

## QA

Fresh Current screenshot after repair: PASS.

- the small role now communicates a real recipient relationship rather than an internal design concept;
- the Japanese display remains the first emotional read;
- no new visual crowding or over-decoration was introduced;
- Current/stress each retain native visible text `5`, fixed-height text `0`, outside text `0`, IMAGE fills `0`;
- kicker remains `textAutoResize=HEIGHT`.

Image generation: `0`.
Drive writes: `0`.

## Decision

`PASS / CURRENT_RETAINED`.

This is a bounded editorial-language repair, not a new version. HOME TEXTILE MAT remains the selected Professional vNext direction and remains `NOT_PRINT_READY` pending the existing physical/final-content gates.