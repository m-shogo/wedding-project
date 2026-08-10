# ADD-12 新郎新婦クイズカード — Reopened Visual QA 2026-08-10

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Live authority

- Start latest main for this promotion run: `1429cb604b0d3f030ef66af578d30efdb7ad0458`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- Production: front `1:2`, back `1:26`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`; live metadata readback name `ADD-12_新郎新婦クイズカード`

## Reopened visual diagnosis

The previous production was structurally strong but visually read as a restrained field-note template with a generic English kicker, large unused lower field, and thin mint edge. It remained functional, but did not satisfy the reopened sellable visual gate by itself.

## Clean-room comparison

Created rollback-safe section `2:2` — `QA_ADD12_REOPENED_EDITORIAL_BALLOT_V2_2026_08_10`.

- front `2:3` — `QA_ADD12_FRONT_V2_BALLOT_EDITORIAL`
- back `2:28` — `QA_ADD12_BACK_V2_BALLOT_EDITORIAL`

Direction: Japanese-first editorial ballot / travel notebook rather than quiz-show UI. Warm ivory remains, but the grammar changes to a narrow deep-navy book-edge rail, rust editorial hierarchy, stronger Japanese headline, and compact ballot rhythm. No planes, passport stamps, quiz-show icons, gradients, shadows, rounded web cards, or generated people.

The first V2 screenshot exposed a real defect: the initial 96 px navy rail clipped the title/question area and alternating mark colors weakened answer-choice fairness. Both were corrected before promotion: rail reduced to 18 px and all four marks returned to identical teal treatment.

## Long-copy stress

Created isolated stress section `3:2` — `QA_ADD12_REOPENED_V2_LONG_COPY_STRESS_2026_08_10`, front `3:3`, back `3:28`.

Stress used materially longer Japanese question copy, four two-line answer choices, a longer answer-method line, a two-to-three-line back method, and extended optional-note copy. Whole-card screenshots confirmed:

- the front question expands to multiple lines without colliding with the answer choices;
- all four long answer choices reflow to two lines without mark/row collisions;
- answer-method copy remains within the card and does not collide with the footer date;
- back method expands to multiple lines without touching the rule, name field, or message field;
- extended optional-note copy remains above the footer date with no collision.

## Promotion / rollback

Before production replacement, preserved the previous production pair under rollback section `4:2` — `ROLLBACK_ADD12_PRE_REOPENED_PROMOTION_2026_08_10`, with rollback front `4:3` and back `4:28`.

Then promoted the clean-room V2 into the existing production frame IDs:

- production front remains `1:2`
- production back remains `1:26`

Post-promotion screenshots confirm the Japanese-first editorial hierarchy at actual 620 × 875 scale. The old generic English-led field-note composition is no longer production.

## Structure readback

- production front `1:2`: 620 × 875, native text 10, IMAGE fill nodes 0, trim/bleed guides 2, clipsContent true
- production back `1:26`: 620 × 875, native text 7, IMAGE fill nodes 0, trim/bleed guides 2, clipsContent true
- answer marks remain equal and non-directive
- no flatten/raster replacement introduced
- variable quiz/answer/instruction text remains native editable text

## Image generation / Drive

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`. The screenshot-supported bottleneck was typography/composition rather than missing hero imagery. Drive changes: 0. No generated people or raster-variable copy were introduced.

## Decision

The reopened second-pass comparison, long-copy stress, rollback-safe promotion, final screenshot QA, and structural readback all passed. ADD-12 is now `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

`DEFERRED_FINALIZATION / NOT_PRINT_READY`: final question/choices, answer/recovery rules, prize/lottery policy if any, final date/copy, paper stock, printer template/profile, and physical proof remain pending.

Next target: ADD-13 メッセージカード.
