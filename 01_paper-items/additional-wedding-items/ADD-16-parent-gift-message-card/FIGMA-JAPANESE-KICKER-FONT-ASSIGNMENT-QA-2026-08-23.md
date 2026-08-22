# ADD-16 — Japanese kicker font-assignment QA — 2026-08-23

Status: `VERIFIED_LOCAL / CURRENT_REPAIRED / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_RETAINED`

Start main: `4a59a3fc3be104129aca3bd1727d8e0e634a78a9`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Current page: `57:2 / CURRENT_SELECTED / ADD-16 / HOME TEXTILE MAT / 2026-08-22`
- Current front: `57:3`
- Current back: `57:17`
- front long-copy stress: `57:36`
- exact Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- Drive write: `0`
- image generation: `0`

## Visible / structural problem

Fresh live readback found the Japanese front kicker `両親へ` was assigned `Inter Bold` on both the Current front and front stress:

- Current kicker `57:10`: `Inter / Bold / 16 px`
- stress kicker `57:43`: `Inter / Bold / 16 px`

The text still rendered because Figma/font fallback supplied Japanese glyphs. That made screenshot-only review look acceptable, but the authored font contract was wrong for Japanese editorial type and could change metrics or glyph character across environments/export paths.

This is not a request to replace Latin roles such as the numeric date or intentional English copy. The defect is specifically Japanese semantic copy assigned to a Latin-family role and relying on fallback.

## Bounded repair

Before mutation, complete hidden rollback copies were created:

- `66:2 / ROLLBACK / ADD16 / FRONT / PRE-JP-KICKER-FONT-REPAIR / 2026-08-23`
- `66:18 / ROLLBACK / ADD16 / FRONT STRESS / PRE-JP-KICKER-FONT-REPAIR / 2026-08-23`

After explicitly loading `Noto Sans JP Bold`, only the two kicker font assignments were changed:

- `57:10`: `Inter Bold → Noto Sans JP Bold`
- `57:43`: `Inter Bold → Noto Sans JP Bold`

Characters, 16 px size, 24 px line-height, x/y position, width, color, surrounding textile geometry, display/body/signature, date and all placeholders were unchanged.

## Screenshot QA

Current front `57:3` after repair:

- whole item: PASS;
- reading: PASS;
- native `700×1036`: PASS;
- `両親へ` now uses the intended Japanese family without changing hierarchy or spacing.

Front stress `57:36` was temporarily revealed after the repair and re-hidden after review:

- realistic long Japanese message: PASS;
- display/body/signature relationship unchanged;
- no new collision with the thread, lower weave, date or trim lanes.

## Structure readback

Post-repair Current front:

- visible native text: `5`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`;
- kicker: `Noto Sans JP Bold`.

Post-repair front stress:

- visible native text: `5`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`;
- kicker: `Noto Sans JP Bold`;
- stress root re-hidden after screenshot QA.

## Cross-item probe

The same normalized probe was run read-only on two materially different Current artifacts:

- WEDDING PASSPORT `181:52 / 181:80`: no Japanese text assigned to Inter found;
- BOARDING PASS `63:41 / 63:72`: no Japanese text assigned to Inter found;
- ADD-09 Guest Book `41:56 / 41:76`: no Japanese text assigned to Inter found.

Therefore the learning remains `VERIFIED_LOCAL`, not `VERIFIED_CROSS_ITEM`.

## Learning fingerprint

`JAPANESE_SEMANTIC_COPY_ASSIGNED_LATIN_FONT_FALLBACK`

Root-cause hypothesis: a helper or manual styling pass can assign a Latin font family to Japanese text while Figma still renders readable fallback glyphs, hiding the authored-type mismatch from screenshot-only QA.

Receiving-item hypothesis: when auditing Japanese native text, read back the actual assigned `fontName` for semantic roles instead of assuming visible glyphs prove the correct Japanese family is authored. Do not create a blanket rule that all mixed Latin/Japanese artifacts use one font; only repair Japanese semantic text that unintentionally depends on fallback.

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Result

`CURRENT_REPAIRED / JAPANESE_KICKER_FONT_ASSIGNMENT_PASS / LONG_COPY_PASS / AUTO_HEIGHT_PASS / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`.
