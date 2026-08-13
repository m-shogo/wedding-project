# ADD-12 新郎新婦クイズカード — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `3b90219dbc77c18130cb565b5c1169555e299472`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- production: front `1:2`, back `1:26`
- Drive folder: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- Drive metadata readback confirmed the exact folder ID and parent `0ADXt8irGMFGnUk9PVA`.

## Fresh live readback

The earlier follow-up is already present in live production. A fresh text-range readback confirmed that semantic field text remains prominent while only the proof-only `LAYOUT DUMMY` suffix is demoted to muted warm-gray metadata.

Front production `1:2`:

- `［設問本文 · LAYOUT DUMMY］`: semantic field `27 px`; suffix `11 px`, warm-gray, opacity about `0.76`.
- `［選択肢A/B/C/D · LAYOUT DUMMY］`: semantic fields `18 px`; suffixes `8 px`, warm-gray, opacity about `0.76`.
- `［回答方法・回収方法 · LAYOUT DUMMY］`: semantic field `13 px`; suffix `7 px`, warm-gray, opacity about `0.76`.

Back production `1:26`:

- `［回答方法・締切・回収場所 · LAYOUT DUMMY］`: semantic field `18 px`; suffix `8 px`, warm-gray, opacity about `0.76`.
- `［記名／匿名・景品・抽選等の案内 · LAYOUT DUMMY］`: semantic field `14 px`; suffix `7 px`, warm-gray, opacity about `0.76`.

This matches the bounded follow-up targets recorded previously and preserves native editable semantic placeholders.

## Screenshot QA

Fresh actual-size screenshots were captured for both production sides at their native `620 × 875` size.

- Front: the editorial-ballot hierarchy remains intact; question and choices read first, while `LAYOUT DUMMY` no longer competes with guest-facing content.
- Back: the title, answer-method line, open writing rules and date remain clear; proof metadata is visibly subordinate.
- No new collision, clipping, web-UI feel, or proof-sheet dominance was observed.

## Rollback / structure

The previously created hidden rollback remains available:

- section `14:2 / ROLLBACK_ADD12_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- front rollback `14:3 / ROLLBACK_ADD12_FRONT_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- back rollback `14:28 / ROLLBACK_ADD12_BACK_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production roots remain `1:2 / 1:26`.

Live structure remains:

- front `620 × 875`, native text `10`, IMAGE fills `0`, `clipsContent=true`
- back `620 × 875`, native text `7`, IMAGE fills `0`, `clipsContent=true`
- no flattening or raster replacement introduced

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The visible bottleneck was proof-metadata typography, not missing imagery. Drive writes: `0`.

## Result

ADD-12 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`, and the placeholder-hierarchy follow-up is now verified live as `PLACEHOLDER_HIERARCHY_PASS` rather than remaining falsely open in Git evidence.
