# ADD-17 子ども向けミニカード — Back Open-Writing Rule Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `a12bab593be3dc42f7ea138ec2d435c815e1dfd4`
Current: `docs/automation/non-rurubu-figma-quality-current.md`

## Authority

- Figma: `PAvkRggJiRuXVypi3RgZCN`
- selected front: `2:2` — already polished in the same run
- selected back: `2:5`
- Drive: `ADD-17_子ども向けミニカード_ぬりえ / 1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- final adoption remains `BLOCKED_REQUIRED_INPUT` pending actual child attendance/use requirements.

## Visible problem

The selected back retained one short rust horizontal rule between the four open writing lines and the lower optional-name area. The rule had no writing-baseline, trim, safe-area, name-field, route, or binding function. In a page whose role is intentionally open writing, it introduced a second visual divider that made the artifact feel segmented like a form/template.

## Bounded comparison

Rollback-safe comparison:

- `38:2 / QA_ADD17_BACK_OPEN_WRITING_NO_RUST_RULE_2026_08_19`

Only the visible short rust vector corresponding to selected node `15:58` was hidden. The four navy writing lines, teal left binding rule, top rust tick, Japanese title/prompt, optional name label + native name rule, and child-facing footer remained unchanged.

The no-rule candidate was stronger at whole-item scale: the writing field and optional name area read as one continuous paper surface rather than two UI-like modules.

## Adoption / rollback

Before selected mutation, hidden pre-change rollback `38:23 / ROLLBACK_ADD17_BACK_PRE_OPEN_WRITING_RULE_SUBTRACTION_2026_08_19` was saved.

Adopted change:

- selected `15:58 / Vector`: hidden;
- comparison `38:2`: hidden after adoption;
- front `2:2`: unchanged by this bounded back-side change;
- no child identity, age, count or interest was invented.

## Three-scale / structure QA

- whole/read screenshot at 700 px: PASS; writing page remains immediately understandable.
- native role remains `1110×1540`.
- selected visible native text: `6`.
- IMAGE fills: `0`.
- visible text outside root: `0`.
- text collision: `0`.
- visible short 200–300px zero-height accent rules in the back body: `0`.

## Asset decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_CHANGE`. No Drive write. Exact Drive authority was live read back before mutation.

## Result

`OPEN_WRITING_FIELD_RULE_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS_MAINTAINED / DESIGN_QA_PASS_WITH_PLACEHOLDERS_MAINTAINED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
