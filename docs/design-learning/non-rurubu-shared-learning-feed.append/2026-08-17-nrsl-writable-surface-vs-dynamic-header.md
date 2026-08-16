# NRSL — Physical writable-area minimum must be tested together with dynamic header growth

Source scope/item: non-Rurubu / ADD-13 メッセージカード

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Date: 2026-08-17

## Visible problem

A clean-room message-card candidate could look visually calm while still failing the physical product requirement because the actual handwriting surface occupied less than the required share of the card. Increasing the handwriting field then reduced vertical tolerance for variable title/prompt copy.

## Root-cause hypothesis

Writable print artifacts have two coupled constraints:

1. a minimum physical interaction surface (writing/drawing/signature area);
2. dynamic semantic copy above/below that surface.

Checking only text overflow or only the apparent blank area misses the interaction. Independent absolute-position text can collide as copy grows even when all text technically remains inside the root.

## Bounded experiment

ADD-13 V5 was rebuilt from blank with a large ruled writing field. QA then found:

- initial front writing field ratio below the SPEC minimum;
- realistic title/prompt/name stress produced text-to-text collisions despite root overflow count being zero.

The bounded repair:

- widened both handwriting roles to `620×620` inside a `700×990` card;
- resulting writing-area ratio: `55.47%` on both sides;
- grouped title/meta/prompt into native vertical auto-layout header stacks;
- set header primary-axis sizing to AUTO;
- kept the handwriting field and footer as separate physical regions.

## Evidence

Figma file: `8ad7bEPAc8I88gs1JxsWhe`

V5:

- page `22:2`
- front `22:3`
- back `22:27`
- header stacks `25:2 / 25:3`
- final hidden stress `25:58 / 25:85`

Final stress:

- visible text outside root: `0 / 0`
- text-to-text collisions: `0 / 0`
- front header bottom `182`, writing top `250`
- back header bottom `208`, writing top `250`
- writing ratio `55.47% / 55.47%`

Item evidence:

`01_paper-items/additional-wedding-items/ADD-13-message-card/FIGMA-CLEANROOM-V5-INK-WASH-QA-2026-08-17.md`

Item evidence commit: `2b9519a759369a25a77afca3bc19cfbc3ed342ee`

## Result

`VERIFIED_LOCAL` for the QA method.

The visual candidate itself was not promoted because retained production remained stronger overall. The lesson is therefore about physical/dynamic QA, not about V5's exact styling.

## Regression risk

- maximizing writable area can make the product visually generic;
- auto-layout headers can consume too much of the card when unrealistic copy is used;
- a numeric writing-area pass does not prove sellable art direction.

## What must remain item-specific

Do not transfer ADD-13's exact 620×620 geometry, cream/navy/rust palette, ink-wash SVG, serif scale, ruled-line count, or front/back composition.

## Cross-item applicability hypothesis

For another print artifact with a required interaction surface — message card, quiz answer area, guest-book writing field, signature field, child activity/drawing area — verify the physical-area minimum and realistic dynamic-copy growth **in the same stress test**. Check text-to-text collisions as well as root overflow. Use native auto-layout for related variable-copy groups when absolute positioning causes collisions.

Do not promote this to a project-wide rule until a materially different artifact independently reproduces the benefit.