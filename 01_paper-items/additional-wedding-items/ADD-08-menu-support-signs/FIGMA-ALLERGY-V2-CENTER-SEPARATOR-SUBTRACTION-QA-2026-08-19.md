# ADD-08 メニュー補助サイン — Allergy/Dietary V2 Center Separator Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `a103352e1cceb8d502c67aca04c99a4d71648dd4`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- Allergy/Dietary selected: `18:19 / CLEANROOM_ADD08_V2_STRONG_A4_ALLERGY_DIETARY`
- long-copy proof: `18:64 / QA_CLEANROOM_ADD08_V2_A4_ALLERGY_DIETARY_LONG_COPY_STRESS_2026_08_15` — hidden after QA
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`

## Visible problem

Fresh whole-item review found that the two-column allergy/dietary information field still used a grey dashed vertical separator between `アレルギーについて` and `食事制限について`.

The role is already grouped by a shared mint top rule, shared mint bottom rule, aligned Japanese headings and two clear text columns. The dashed center rule therefore added little binding value and made the information area read closer to a form/table UI.

## Bounded comparison

Comparison candidate:

- `37:2 / QA_ADD08_ALLERGY_V2_NO_CENTER_DASHED_SEPARATOR_2026-08-19`

Only the center grey vector separator was hidden. Top/bottom mint rules, navy category field, headings, native placeholder text, CTA, date, spacing and typography remained unchanged.

The comparison was stronger at whole-item scale: the two categories remained immediately distinguishable while the information field became more editorial and less table-like.

## Adoption / rollback

Pre-change rollback copies:

- selected `37:16 / ROLLBACK_ADD08_ALLERGY_V2_PRE_CENTER_SEPARATOR_SUBTRACTION_SELECTED_2026-08-19`
- stress `37:30 / ...STRESS...`

Adopted hidden separator nodes:

- selected `18:23 / Vector`
- stress `18:68 / Vector`

The comparison root and rollback roots are hidden after adoption/QA.

## Stress-evidence cleanup

While the long-copy proof was opened for actual-size QA, two text nodes still contained internal `LAYOUT DUMMY` suffixes. The selected production had already been guest-facing clean, so this was evidence drift rather than a production-copy defect.

Before cleanup, another stress rollback was preserved:

- `37:44 / ROLLBACK_ADD08_ALLERGY_V2_STRESS_PRE_SEMANTIC_COPY_CLEANUP_2026-08-19`

Stress copy was changed without reducing the test role or text mass:

- `18:72 / TXT_ALLERGY_BODY` → `[アレルギーに関する正式なご案内が複数行になる場合の長文確認テキスト]`
- `18:74 / TXT_DIETARY_BODY` → `[食事制限・食事対応に関する正式なご案内が複数行になる場合の長文確認テキスト]`

Both remain native `textAutoResize=HEIGHT` roles.

## Three-scale / structure QA

Selected:

- whole / 500–700px: PASS;
- reading scale: PASS;
- actual/native `1400×1980`: PASS;
- visible native text `8`;
- outside visible text `0`;
- visible internal proof-language count `0`;
- center separator hidden;
- IMAGE fills added `0`.

Long-copy proof:

- temporarily shown after adoption at large scale;
- two-column long Japanese copy remains readable without the center separator;
- outside visible text `0`;
- internal proof-language count `0`;
- center separator hidden;
- returned to hidden state after QA.

## Decision

`ADOPTED`.

This is a binding-function decision, not a blanket separator-removal rule. The shared top/bottom mint rules and aligned column headings still group the two roles. If a future reflow loses that grouping, a functional divider may be justified again.

## Assets

- generated imagery required: `0`;
- Drive writes: `0`;
- no variable copy is baked into raster/SVG.

## Learning status

This independently applies the established binding-function / UI-containment QA method. It does not create a new project rule.
