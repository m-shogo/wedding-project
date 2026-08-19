# ADD-16 両親贈呈品メッセージカード — Origin Dot Subtraction QA

Date: 2026-08-19
Status: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE`
Start authority SHA: `937efef7003e30ad070b79488b36ab5b06d3b158`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected front: `18:3`
- selected back: `18:14` unchanged
- hidden long-copy front: `18:26`
- Drive folder: `ADD-16_両親贈呈品メッセージカード / 1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- Drive live readback: PASS; write count `0`

## Visible problem

Fresh actual-size review found that the rust `DECOR_ORIGIN_MARK` circle at the left edge of the mint horizon line no longer carried a clear reader-facing function after the earlier `HOME PORT` microcopy was removed. The line already provides the intended quiet horizon/home metaphor, while the isolated dot read increasingly like an endpoint/progress control.

This was evaluated as a bounded fixed-decoration issue, not as permission to remove all circular marks globally. A semantic station, destination, punch hole, or other real physical/information role would still justify a circle.

## Bounded comparison

- comparison: `35:2 / QA_ADD16_FRONT_NO_ORIGIN_DOT_2026_08_19`
- changed only `DECOR_ORIGIN_MARK` visibility;
- native recipient, gratitude headline, optional metaphor, horizon line, date and signature remained unchanged;
- no image/generation/Drive mutation.

The no-dot version was stronger at thumbnail and native actual size: the horizon reads as a quiet editorial divider/metaphor instead of a slider-like control.

## Adoption / rollback

Adopted:

- selected `18:3 / 18:10 DECOR_ORIGIN_MARK`: hidden;
- hidden stress `18:26 / 18:33 DECOR_ORIGIN_MARK`: hidden.

Preserved before mutation:

- `36:2 / ROLLBACK_ADD16_FRONT_PRE_ORIGIN_DOT_SUBTRACTION_2026_08_19`;
- `36:13 / ROLLBACK_ADD16_FRONT_STRESS_PRE_ORIGIN_DOT_SUBTRACTION_2026_08_19`.

Comparison `35:2` was hidden after adoption.

## Three-scale / structure QA

- whole/thumbnail 500px: PASS;
- reading scale: PASS;
- actual size `700×1036`: PASS;
- selected visible native text: `5`;
- stress visible native text: `5`;
- visible text outside root: `0` selected / `0` stress;
- text collision: `0` selected / `0` stress;
- proof-language leakage: `0` selected / `0` stress;
- IMAGE fills: `0` selected / `0` stress.

## Result

`ORIGIN_DOT_UI_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS_MAINTAINED / DESIGN_QA_PASS_WITH_PLACEHOLDERS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`

No new shared-learning record was created because this is a direct local application of the already-promoted endpoint/checkpoint UI-subtraction principle, not a new transferable finding.
