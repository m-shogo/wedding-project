# ADD-13 メッセージカード — Placeholder Hierarchy Readback — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_HIERARCHY_FOLLOWUP_REQUIRED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` immediately before this evidence write: `0faa3a01c59dc395b0f803e933b0d2f6337434cc`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `8ad7bEPAc8I88gs1JxsWhe`
- production front: `1:3 / ADD13/A6/FRONT`
- production back: `1:13 / ADD13/A6/BACK`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- Drive metadata readback confirmed the exact folder ID and parent `1iJGIzmNSlzwqrcv7P6UsNbstwBki1523`.

## Fresh actual-size diagnosis

The correspondence art direction remains strong at full size, but fresh front screenshot and live text-range readback show that proof-only `LAYOUT DUMMY` metadata is still visually fused with several semantic fields.

Front production `1:3`:

- `［宛名 · LAYOUT DUMMY］` = 16 px one-style placeholder.
- `［書き出し · LAYOUT DUMMY］` = 22 px one-style placeholder.
- `［本文 · LAYOUT DUMMY］` = 27 px one-style placeholder and therefore especially prominent.
- `［差出人名 · LAYOUT DUMMY］` = 20 px one-style placeholder.

Back production `1:13`:

- `［自由記入の案内 · LAYOUT DUMMY］` = 20 px one-style placeholder.
- `［用途・記名方針等 · LAYOUT DUMMY］` = 13 px one-style placeholder.

The semantic labels themselves remain appropriate and must stay native editable. The visible defect is that proof metadata reads as part of the finished correspondence copy rather than subordinate authoring state.

## Rollback-safe preparation

A fresh hidden rollback was created before attempting any production hierarchy change:

- section `8:2 / ROLLBACK_ADD13_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- front rollback `8:3 / ROLLBACK_ADD13_FRONT_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`
- back rollback `8:17 / ROLLBACK_ADD13_BACK_PRE_PLACEHOLDER_HIERARCHY_2026_08_13`

Production roots remain `1:3 / 1:13`.

## Figma write status

The bounded production text-range mutation was blocked by an OpenAI write-safety gate before execution. No production hierarchy change is claimed. The write was not repeatedly retried.

Expected bounded follow-up when writes are available:

- preserve all wording, line positions, correspondence composition and native editable text
- demote only the `LAYOUT DUMMY` token ranges to small muted warm-gray proof metadata
- approximate token sizes: recipient `7 px`, intro `8 px`, body `9 px`, signature `8 px`, back guide `8 px`, back footer `6 px`
- capture full-size front/back screenshots and structural readback afterward

## Structure / image decision

Live front remains `700 × 990`, native text `8`, IMAGE fills `0`, `clipsContent=true`; live back remains `700 × 990`, native text `4`, IMAGE fills `0`, `clipsContent=true`. No flattening or raster replacement is needed.

`IMAGE_GENERATION_NOT_REQUIRED`. The current bottleneck is proof-metadata typography, not missing imagery. Drive writes: `0`.

## Result

ADD-13 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`, with a bounded placeholder-hierarchy follow-up now explicit and rollback-ready.
