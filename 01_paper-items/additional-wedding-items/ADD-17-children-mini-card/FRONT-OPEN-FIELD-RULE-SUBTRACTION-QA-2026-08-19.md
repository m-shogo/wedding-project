# ADD-17 子ども向けミニカード — Front Open-Field Rule Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `5fc59c9a4dbfbc5a92a92bf022e3a2f69eff80a7`
Current: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma: `PAvkRggJiRuXVypi3RgZCN`
- selected front: `2:2`
- selected back: `2:5` — unchanged
- Drive: `ADD-17_子ども向けミニカード_ぬりえ / 1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- final adoption remains `BLOCKED_REQUIRED_INPUT` pending actual child attendance/use requirements.

## Visible problem

The selected front already had its radar/target-like inner contour lines removed, but one short rust horizontal rule still floated inside the large pale mint open drawing field. It had no trim, writing, prompt, route, binding, or safe-area role. In the middle of a deliberately open child drawing area it read as a leftover template/accent control rather than useful print structure.

## Bounded comparison

Rollback-safe comparison:

- `37:2 / QA_ADD17_FRONT_OPEN_FIELD_NO_RUST_RULE_2026_08_19`

Only the visible short rust vector corresponding to selected node `15:40` was hidden. The large pale mint open field, left teal binding rule, top rust tick, Japanese title/prompt, bottom guidance copy and all semantic structure were unchanged.

The no-rule candidate was stronger at whole-item scale: the central mint field reads as a genuinely open drawing/activity area instead of a decorated module.

## Adoption / rollback

Before selected mutation, hidden pre-change rollback `37:19 / ROLLBACK_ADD17_FRONT_PRE_OPEN_FIELD_RULE_SUBTRACTION_2026_08_19` was saved.

Adopted change:

- selected `15:40 / Vector`: hidden;
- comparison `37:2`: hidden after adoption;
- back `2:5`: unchanged;
- no child identity, age, count or interest was invented.

## Three-scale / structure QA

- 500 px whole/thumbnail: PASS; open drawing field remains the dominant action.
- reading/native review up to `1110×1540`: PASS.
- selected visible native text: `5`.
- IMAGE fills: `0`.
- visible text outside root: `0`.
- text collision: `0`.
- visible short internal 150–260px zero-height vector rules in the front drawing field: `0`.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_CHANGE`. No Drive write. Exact Drive authority was live read back before mutation.

## Result

`OPEN_DRAWING_FIELD_RULE_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS_MAINTAINED / DESIGN_QA_PASS_WITH_PLACEHOLDERS_MAINTAINED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
