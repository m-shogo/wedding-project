# ADD-12 — Actual-size factual date legibility QA

Date: 2026-08-22
State: `VERIFIED_LOCAL / CURRENT_RETAINED / ACTUAL_SIZE_MICROTYPE_REPAIRED / ROLLBACK_SAFE`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main observed before this run write: `028140b8104b61463e582a1f87b377b5a4c48982`

## Live authority

- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- Current front: `59:54 / CURRENT / ADD-12 / ANSWER PUNCH CARD / FRONT / FAMILY DIVERSITY 2026-08-21`
- Current back: `59:84 / CURRENT / ADD-12 / ANSWER PUNCH CARD / BACK / FAMILY DIVERSITY 2026-08-21`
- long-copy stress: `59:99 / 59:129`
- hidden pre-change rollback: `62:2 / 62:32`
- Drive authority verified live: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive write: `0`
- generated assets: `0`

## Visible / physical problem

The Current remained visually strong at whole and reading scale, but actual-size arithmetic exposed one factual microtype role that was too small for a professional A6 print artifact: the date `2026.10.24` was set at `12 px` on a `620 px`-wide canvas representing `105 mm` physical width.

That maps to approximately `2.03 mm`, or about `5.76 pt`, before printer/raster/output variability. The date is factual reader-facing copy, not optional decorative microcopy, so leaving it at this size was an unnecessary print-legibility risk even though Figma reported no overflow or collision.

## Bounded repair

No layout, question hierarchy, answer rules, punched binding, palette, copy, or physical metaphor changed.

Only the factual date role changed:

- front `59:83`: `12 px → 16 px`;
- back `59:98`: `12 px → 16 px`;
- stress front `59:128`: `12 px → 16 px`;
- stress back `59:143`: `12 px → 16 px`.

At the verified A6 scale, `16 px` maps to approximately `2.71 mm / 7.68 pt`.

Before the write, complete hidden rollback copies of the selected front/back were created:

- `62:2 / ROLLBACK / ADD-12 FRONT / PRE-DATE-LEGIBILITY 2026-08-22`
- `62:32 / ROLLBACK / ADD-12 BACK / PRE-DATE-LEGIBILITY 2026-08-22`

## Screenshot QA

Post-change native screenshots:

- front `620×875`: PASS — date is materially more legible without competing with the quiz content;
- back `620×875`: PASS — date remains subordinate but no longer reads as fragile microtype;
- long-copy front `59:99`: PASS after temporarily revealing the hidden proof;
- long-copy back `59:129`: PASS after temporarily revealing the hidden proof.

The stress roots were returned to hidden state after QA.

## Structure readback

Final readback:

- Current front: native text `10`, fixed-height `0`, outside-root text `0`, IMAGE fills `0`;
- Current back: native text `9`, fixed-height `0`, outside-root text `0`, IMAGE fills `0`;
- stress front/back: fixed-height `0`, outside-root text `0`, IMAGE fills `0`;
- all four date roles remain `textAutoResize=HEIGHT`.

No raster/SVG asset was introduced and no variable/factual copy was flattened.

## Decision

`CURRENT_RETAINED / ACTUAL_SIZE_DATE_LEGIBILITY_PASS`.

This is a physical-print legibility correction, not a visual redesign. The existing `ANSWER PUNCH CARD` art direction remains selected and keeps its prior Sellable Visual / Design QA states.

## Learning

Local fingerprint: `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE`.

Do not turn this single item into a universal hard minimum-point-size rule. The transferable QA method is to convert Figma canvas pixels back to the verified physical dimensions for factual microtype, then test a bounded enlargement at actual-size scale. Cross-item verification is recorded separately after ADD-13 independently reproduced the same defect class.