# Rurubu WEDDING V6 — P + BA/AZ Visual QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Baseline GitHub main before this evidence write: `f28f315216df28b8c11b1e34f55d819d25f4c498`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Current live declaration

Start Here `845:27`:

`V5 FU/FX · V6 P + BA/AZ INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer P `1397:64`
- Profile / Q&A BA `1411:2 / PREFERRED / V6_INSIDE_BA_ASYMMETRIC_INTERVIEW_FLOW_2026_08_16`
- Story / chronology AZ `1409:2 / PREFERRED / V6_INSIDE_AZ_STORY_EDITORIAL_FIELD_2026_08_16`

Preserved comparison / rollback:

- AX `1406:2` → hidden rollback after BA promotion
- AS `1392:2` → hidden rollback after AZ promotion
- AY `1408:2` → hidden `REJECTED_VISUAL`; vertical `INTERVIEW` anchor added decoration without enough editorial value
- BA long-answer proof `1412:2` → hidden after PASS

## Why BA replaced AX

Visible AX problem:

- structurally safe but the right Q&A page still read as six independently placed prompts around a photograph;
- the repeated questions remained closer to a clean template than a travel-magazine interview page;
- lower-page rhythm was weaker than Outer P and the chronology page.

Bounded BA test:

- no new asset and no new decorative raster;
- existing native question/answer text retained;
- existing replaceable dining hero enlarged to `465×480` and kept inside its `732×498` intrinsic source;
- existing support image kept replaceable at `238×210`, inside its `240×220` intrinsic source;
- Q01–Q03 compacted into one left reading flow;
- Q04 promoted to the feature question;
- Q05/Q06 continued vertically instead of forming another grid row;
- the existing native closing pullquote was moved to bridge the interview and photography;
- no card, shadow, gradient or new fixed graphic decoration was introduced.

Expected improvement:

- reduce questionnaire/template reading;
- create a single interview rhythm;
- increase photo-led magazine hierarchy while preserving editable text.

Regression risk:

- closing pullquote could collide with Q05/Q06;
- larger hero could exceed source resolution;
- realistic answers could overflow fixed spacing.

### BA QA

Whole spread / thumbnail:

- `500 px` screenshot: PASS; the right page now reads as interview column + dominant memory photo + closing beat.

Reading / page scale:

- full `1400×990` spread: PASS.

Actual-size:

- Q&A page `794×1123`: PASS.
- native visible text: `24`
- replaceable IMAGE roles: `2`
- text/text collision after correction: `0`
- 18 px text safe-area risk: `0`
- outside visible nodes: `0`
- only intentional photo-caption overlap remains.

Intrinsic readback:

- Q&A hero `465×480` / source `732×498`: PASS
- Q&A support `238×210` / source `240×220`: PASS

### Fresh BA long-answer stress

Proof:

- `1412:2 / QA_EVIDENCE / V6_BA_LONG_ANSWER_STRESS_2026_08_16`

Six realistic Japanese answers were inserted on an auto-height proof clone.

Result:

- text/text collision `0`
- accidental text/image collision `0`
- 18 px safe-area risk `0`
- page overflow `0`
- actual-size screenshot PASS.

The proof is hidden after evidence capture and must be rerun if BA Q&A geometry materially changes.

## Why AZ replaced AS

Visible AS Story problem:

- AS chronology was already strong, but the left Story page still became quiet below the hero;
- support photography and body copy read as a restrained layout rather than one continuous photo-led editorial field.

Bounded AZ test:

- chronology subtree left unchanged from verified AS;
- Story hero enlarged to `700×470` with slight controlled bleed/crop;
- skyline support retained at `220×202`;
- cafe support enlarged to `430×330`;
- the existing native two-line story anchor increased to `38 px` and bridged the photo field and copy;
- utility-like `PHOTO MEMO` text was removed from the visible hierarchy;
- a weak decorative `01` trial was removed after screenshot review rather than retained as filler;
- no new cards, generated decoration, shadows or gradients.

Expected improvement:

- let the Story page read from dominant scene → overlapping destination photo → cafe memory → editorial quote without falling into empty template space.

Regression risk:

- enlarged photos could exceed intrinsic dimensions;
- pullquote could collide with support photos/body copy;
- controlled hero bleed could become an unintended text-safe-area issue.

### AZ QA

Whole spread / thumbnail:

- `500 px` screenshot: PASS; Story has stronger continuity and remains coherent with the unchanged chronology.

Reading scale:

- full spread comparison against AS: PASS; AZ selected.

Actual-size:

- Story page `794×1123`: PASS
- native visible text: `11`
- replaceable IMAGE roles: `3`
- text/text collision: `0`
- 18 px text safe-area risk: `0`
- outside-page text: `0`
- hero image only uses a small intentional clipped bleed; text remains inside safe bounds.

Intrinsic readback:

- Story hero `700×470` / source `1356×560`: PASS
- Story support 1 `220×202` / source `240×220`: PASS
- Story support 2 `430×330` / source `810×552`: PASS

Chronology remains byte/geometrically inherited from AS for this pass and keeps its prior verified event sequence, replaceable images, endpoint and safe-area state.

## Drive / generated asset truth

Fresh Drive root readback confirms the existing Rurubu V6 section masters remain present:

- Profile `1MfLObNcvsWhQ8nQqgZHeFiDBdjPzj1w8`
- Q&A `1M4X4ELmau3_GrCDb6n72xv13R_CszDKR`
- Timeline `1KzAiPYc3HrvUL75Kkv9cPcAN2blQt8MV`
- Memories `1WhO8iIIx1G9oAxU5-lWSnBEHx_AQpZe0`

This run did not retry the unchanged generated-master submit path because the known transport fingerprint has no material environment change.

Asset lifecycle truth for this pass:

- new image generation: `0`
- new Drive saves: `0`
- new external binary Figma placement: `0`
- existing verified replaceable photos recomposed: `YES`
- generated/fixed decoration adopted: `NO`
- native editable copy preserved: `YES`
- three-scale visual QA: `YES`
- fresh Q&A long-copy proof: `PASS`
- intrinsic source gate: `PASS`
- rollback history preserved: `YES`
- V7 touched: `NO`

## Decision

`P + BA/AZ` becomes the current V6 preferred dummy-design study.

This is not print-ready. Final photography/copy, exact printer template, bleed/trim/fold/page order, PDF preflight and physical proof remain open gates.
