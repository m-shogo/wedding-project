# ADD-17 Children Mini Card — Open Writing Field Polish

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT`
Date: 2026-08-18
Start authority SHA: `d8ec68c10de8064a0f001b8a86812fe6187c70fd`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PAvkRggJiRuXVypi3RgZCN`
- selected front: `2:2` (unchanged in this bounded change)
- selected back: `2:5`
- Drive authority: `ADD-17_子ども向けミニカード_ぬりえ / 1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- final adoption remains `BLOCKED_REQUIRED_INPUT` on real child attendance/count/age/use information.

## Visible problem

Fresh whole-item review of selected back found that the optional sketch cue still used two nested circular contour vectors plus the separate line `小さな絵も、ここに。`. Together with `えでもOK`, the cluster read like a target/radar widget placed beside an otherwise open handwriting page.

This repeated the same target-like signal that had already been removed from the selected front's large observation field, and it was not required to reserve writing/sketch space. The four curved writing lines, native `えでもOK`, optional name role and bottom guidance already communicate the open activity without a circular target graphic.

## Bounded comparison

Rollback-safe comparison:

- `31:2 / QA / ADD17 / BACK / OPEN WRITING FIELD / 2026-08-18`

Only the following were hidden in the comparison:

- the two nested sketch-circle vectors corresponding to selected `15:56 / 15:57`;
- `15:63 / TXT_MINI_LABEL / 小さな絵も、ここに。`.

Preserved unchanged:

- four large curved native/vector writing guides;
- `えでもOK` as a small child-facing hint;
- title, prompt, optional name field and footer;
- left binding rule/top tick;
- frame size `1110×1540`;
- all editable text/vector structure;
- no raster/person/child imagery.

The comparison was visibly calmer at 500–700px whole-item scale. The back reads as an open writing page rather than a writing page with a small target widget attached to it.

## Adoption / rollback

Before selected mutation, an exact hidden rollback was saved:

- `32:2 / ROLLBACK / ADD17 / BACK / PRE_OPEN_WRITING_FIELD / 2026-08-18`

The verified comparison was adopted only on selected back `2:5`. Comparison `31:2` was hidden after adoption. Selected front `2:2`, previous rollbacks, and any final-use requirement state remain unchanged.

## Structure / screenshot QA

After adoption:

- selected back remains `1110×1540`;
- visible native text count: `6`;
- visible text outside root: `0`;
- IMAGE fills introduced: `0`;
- the circular target-like sketch vectors are hidden;
- the redundant `小さな絵も、ここに。` helper line is hidden;
- native `えでもOK` remains visible as the minimal sketch permission cue;
- actual-size screenshot was re-rendered after adoption.

## Drive / image decision

Drive authority was live-read and matched exact folder `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`.
The defect was redundant target-like vector decoration and explanatory copy, not missing imagery. No child/person imagery was generated.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_POLISHED / OPEN_WRITING_FIELD_POLISHED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

The neutral age-independent template remains usable as a design candidate, but actual wedding adoption is still blocked until real child attendance/use requirements are authoritative.
