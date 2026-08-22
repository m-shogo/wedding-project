# ADD-13 メッセージカード — Floating Desk Mark Subtraction QA

Date: 2026-08-23
State: `VERIFIED_LOCAL / CURRENT_ADOPTED / ROLLBACK_SAFE`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main observed before this write: `e251e6ce34f16fd29050982e2582e34b413d628d`

## Scope

Current ADD-13 front only. This is a bounded post-selection quality audit, not a new V2/V3 rebuild. The existing `RESORT DESK LETTER` concept, handwriting geometry, typography, semantic copy and back face remain unchanged.

Figma file: `8ad7bEPAc8I88gs1JxsWhe`
Drive authority verified live: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
Drive write: `0`
Image generation: `0`

## Visible problem

Current front `52:72` retained `52:90 / PAPER / SMALL DESK MARK`, a 100×4 butter-yellow rule floating in the lower-left information column.

At whole-item scale it did not bind the title, theme, name, date, handwriting area, trim, fold, or letterhead. The actual stationery identity was already carried by the green letterhead, terracotta paper edge, top-right folded corner, and large ruled writing field.

The short yellow mark therefore read as a generic final accent rather than a useful desk/stationery cue.

## Bounded test

Created:

- `57:2 / QA / ADD-13 / FRONT / NO FLOATING DESK MARK / 2026-08-23`

Only `PAPER / SMALL DESK MARK` was hidden. No text, handwriting rule, writing area, folded-corner SVG, letterhead, binding edge, date, name label, or variable role changed.

The comparison produced a calmer left information column and a clearer relationship between the title/theme block and the functional name/date footer.

## Promotion / rollback

Before Current mutation:

- front rollback: `57:21 / ROLLBACK / ADD-13 / FRONT / PRE-DESK-MARK-SUBTRACTION / 2026-08-23`
- front stress rollback: `57:40 / ROLLBACK / ADD-13 / FRONT STRESS / PRE-DESK-MARK-SUBTRACTION / 2026-08-23`

Adopted:

- Current `52:90 / PAPER / SMALL DESK MARK` → hidden
- stress `52:127 / PAPER / SMALL DESK MARK` → hidden
- comparison `57:2` retained hidden as evidence

Back `52:91 / LETTER 02` was not changed.

## Three-scale result

- whole-item: PASS — less template-like accent noise;
- reading: PASS — left title/theme/name/date hierarchy is clearer;
- native `1400×993`: PASS — handwriting field and physical stationery reading are unchanged.

## Structure / editability

No semantic or variable node changed.

- native text roles unchanged;
- semantic handwriting area remains `900×870`;
- handwriting-area ratio remains `56.32%` against the 55% minimum;
- writing rules unchanged;
- fixed-height text contract unchanged;
- IMAGE fills remain `0`;
- no raster/generated asset was introduced.

## Learning state

`VERIFIED_LOCAL` re-application of the existing binding-function/subtraction method. A small accent should be kept only when it performs a reader-facing, physical-production, or binding job at whole-item scale.

Do not transfer “remove small yellow rules” or “remove desk marks” as a visual rule. A rule can be correct when it binds content, marks trim/fold, forms a writing baseline, or carries another explicit artifact function.

## Result

`CURRENT_ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS MAINTAINED / HANDWRITING_AREA_55_PERCENT_PASS MAINTAINED / NOT_PRINT_READY`
