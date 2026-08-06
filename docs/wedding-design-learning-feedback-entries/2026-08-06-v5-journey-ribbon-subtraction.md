# 2026-08-06 — V5 Journey Route Ribbon Subtraction

Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_YET_PROMOTED`

## Visible problem

The journey route already had a native section heading and complete six-event route structure, while a yellow ribbon repeated the same meaning and introduced another UI-like color field.

## Source and hypothesis

- Source: live V5 outer screenshot and nodes `77:47`, `77:98`, and `77:99`.
- Hypothesis: hiding the duplicated ribbon would strengthen editorial hierarchy while preserving route navigation, native text, semantic structure, editability, and rollback state.

## Experiment

- `77:98 / HISTORY_RIBBON`: `visible true → false`
- `77:99 / HISTORY_RIBBON_TXT`: `visible true → false`
- preserved `77:47 / BACK_VISUAL_HISTORY_TITLE` and all route content

## Result

Verified and adopted for current V5. Whole-item, reading-scale, and actual-size/structure QA found a quieter route module with no empty gap, collision, clipping, text reflow, image-hash change, fold-guide loss, or rollback damage.

## Failure / limit

This does not promote a blanket rule against ribbons. Keep a ribbon when it supplies unique navigation, necessary contrast, or a distinct magazine locator.

## Next application

Audit remaining ribbons, badges, color bars, and adjacent headings for duplicated semantic function. Do not let decorative subtraction outrank unresolved dominant-photo quality and provenance work.