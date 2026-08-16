# Rurubu V6 — BK photo-led Q&A experiment

Date: 2026-08-16
Scope: Rurubu WEDDING only

## Observation

BI Q&A was clean and editable but still read like a question list next to photography instead of one magazine page.

## Hypothesis

The defect was not lack of decoration. Photography and Q&A lacked a shared editorial hierarchy. Binding the existing pullquote to the hero photo and making Q4 a second major typographic beat should create stronger travel-magazine rhythm without cards or new ornament.

## Test

- BI `1458:2` duplicated safely.
- BJ `1462:128`: dominant hero + pullquote overlay + stronger support photo.
- BJ improved integration but left Q4 weak.
- BK `1462:191`: Q4 promoted, Q5/Q6 tightened, lower photo strengthened.
- Small deck/photo and Q2/Q3/photo bounding intersections were detected and corrected before adoption.
- No new generated asset, card, shadow, gradient, border system, or external binary transport.

## Expected improvement

- less questionnaire/form feeling;
- stronger thumbnail hierarchy;
- photo-led magazine reading order;
- preserve native copy and replaceable images.

## Regression risk

- oversized Q4 becoming web/landing-page-like;
- long-copy collision;
- rotated image bounds touching question text;
- pullquote readability over image.

## Evidence

Whole-item:
- BK 500 px: PASS, visually preferred to BI/BJ.

Reading scale:
- BK 900 px: PASS.

Actual size:
- Q&A `1462:222 / 794×1123`: PASS.
- native text `25`.
- replaceable IMAGE `2`.
- text/text collisions `0`.
- accidental text/image collisions `0`.
- 18 px safe-area risk `0`.

Long-copy proof:
- `1463:2 / 1463:33`.
- six realistic Japanese answers.
- collisions `0`.
- image collisions `0`.
- safe-area risk `0`.
- overflow `0`.
- hidden after PASS.

## Adoption

`ADOPTED / VERIFIED_LOCAL`

Promoted:
- `1462:191 / PREFERRED / V6_INSIDE_BK_FEATURE_Q4_PHOTO_LED_QA_2026_08_16`.

Rollback retained:
- BI `1458:2` hidden.
- BJ `1462:128` hidden.
- long-copy proof `1463:2` hidden.

Start Here:
- `V5 FU/FX · V6 T + BK/BH INSIDE STUDIES · V7 HOLD`.

## Next application

Continue comparing T + BK/BH as one magazine system. Prefer semantic/photo hierarchy and meaningful Japanese typography before adding decorative containers. Re-run answer stress whenever BK Q&A geometry or type size changes.

## Asset lifecycle truth

- generated: 0
- newly adopted binary: 0
- new Drive save: 0
- existing verified hashes reused: yes
- native text preserved: yes
- replaceable image roles preserved: yes
- visually verified: yes
- V7 touched: no
