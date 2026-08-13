# ADD-12 新郎新婦クイズカード — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_FOLLOWUP_REQUIRED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `72a4e1df35953a26c2ef4a96adc5bc290d5548a1`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- production: front `1:2`, back `1:26`
- Drive folder: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- Drive metadata readback confirmed the exact folder ID and parent `0ADXt8irGMFGnUk9PVA`.

## Fresh actual-size diagnosis

Fresh full-size front/back screenshots show the V3 editorial-ballot composition remains strong and structurally sellable, but proof-only `LAYOUT DUMMY` metadata is still rendered at the same visual strength as its semantic field on several high-salience lines.

Front:

- `［設問本文 · LAYOUT DUMMY］` is 27 px as one style.
- `［選択肢A/B/C/D · LAYOUT DUMMY］` are 18 px as one style.
- `［回答方法・回収方法 · LAYOUT DUMMY］` is 13 px as one style.

Back:

- `［回答方法・締切・回収場所 · LAYOUT DUMMY］` is 18 px as one style and visually competes with the title.
- `［記名／匿名・景品・抽選等の案内 · LAYOUT DUMMY］` is 14 px as one style.

The field labels themselves are appropriate semantic placeholders and must remain visible/editable. The defect is only that proof metadata reads as guest-facing copy rather than subordinate production state.

## Rollback-safe preparation

Before attempting the bounded hierarchy change, a new hidden rollback was successfully created on `99_QA`:

- section `14:2 / ROLLBACK_ADD12_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- front rollback `14:3 / ROLLBACK_ADD12_FRONT_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- back rollback `14:28 / ROLLBACK_ADD12_BACK_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production roots remain `1:2 / 1:26`.

## Figma write status

The intended production text-range mutation was blocked by an OpenAI write-safety gate before execution. No production typography change is claimed in this run. The write was not repeatedly retried.

Expected bounded follow-up when writes are available:

- preserve the V3 composition, ballot marks, line rhythm and all native semantic field copy
- demote only the `LAYOUT DUMMY` token ranges to small muted warm-gray proof metadata
- front target sizes: question token ~11 px, choice tokens ~8 px, answer-method token ~7 px
- back target sizes: method token ~8 px, optional-note token ~7 px
- capture front/back actual-size screenshots and native-text/overflow readback after the write

## Structure / image decision

Live readback remains front `620 × 875`, native text `10`, IMAGE fills `0`, `clipsContent=true`; back `620 × 875`, native text `7`, IMAGE fills `0`, `clipsContent=true`. No rasterization or generated imagery is required for this defect.

`IMAGE_GENERATION_NOT_REQUIRED`. Drive writes: `0`.

## Result

ADD-12 remains structurally and compositionally `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, with a bounded placeholder-hierarchy follow-up now explicitly recorded and rollback-ready instead of being silently treated as complete.
