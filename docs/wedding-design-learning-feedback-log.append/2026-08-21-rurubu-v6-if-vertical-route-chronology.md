# 2026-08-21 — Rurubu V6 IF vertical-route chronology feedback

Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Visible problem

After IE improved Gourmet/Cafe, HT `2040:2` chronology became the next weak page in the common 500px preferred-set comparison. Its events were valid and collision-free, but the lower page still read as separate labels floating in cream space instead of one journey.

## Principle / capability tested

Use one functional binder for true sequential content: a vertical travel-route spine with asymmetric native event clusters and a strong photographic stop. The purpose is to improve reading order, not decorate a page or turn it into a rigid infographic.

## Bounded change

IF `2067:2` was created as a rollback-safe HT duplicate. The left story page was preserved. On chronology right `2067:28`:

- existing route rail/nodes were activated vertically;
- native 01–06 event structures were redistributed around the route;
- existing Event 03 photo became a larger secondary anchor;
- Event 03 white title/copy was returned to the photograph after cream-background contrast failed;
- no unresolved details were invented;
- no cards, rounded UI containers, gradients, shadows or page flattening were added.

## Expected improvement

Make the six moments read as one travel chronology, increase editorial rhythm and photo/type interplay, and reduce the impression of a sparse list while preserving native editability and rollback.

## Regression risk

Route graphics can become decorative noise; asymmetric positions can obscure event order; large numerals can collide with titles/dates; white image text can lose contrast off-image; an overly regular rail can become dashboard-like.

## Review evidence

- whole-item 500px: PASS;
- reading spread 1400px: PASS after contrast/spacing corrections;
- actual-size right `2067:28 / 794×1123`: PASS;
- visible native text `27`;
- visible IMAGE fills `2`;
- unintended text intersections `0`;
- 18px text safe-area risks `0`.

The first aggressive IF geometry produced seven unintended text intersections. They were corrected rather than normalized as “magazine overlap.” Event 03 also failed contrast when its white copy sat on cream; it was moved back onto the photo. Final geometry was re-rendered after both corrections.

## Adopted state

- preferred IF `2067:2`, x=`275600`, y=`0`;
- hidden rollback HT `2040:2`;
- no newly generated assets;
- no new Drive save;
- no new binary upload;
- no new image hash;
- native text and replaceable image roles preserved;
- V7 untouched.

## Evidence references

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IF-TIMELINE-VERTICAL-ROUTE-QA-2026-08-21.md`
- evidence commit `a2121e448548d8669f8321d7ccae0e9156caf0e3`
- status promotion commit `8cbbf04574e04cc317b72d5558afc02f58d6d7a4`
- shared lesson `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-21-rsl-162-functional-route-can-bind-floating-chronology.md`

## Next application

Compare the full preferred V6 set again and choose the next weakest page by common-scale evidence. Apply a binder elsewhere only where true sequence/relationship exists; do not transfer IF's rail, event geometry, images, colors or Rurubu visual treatment as a template.