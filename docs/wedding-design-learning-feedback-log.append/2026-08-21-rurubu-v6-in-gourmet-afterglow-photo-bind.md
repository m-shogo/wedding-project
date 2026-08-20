# Rurubu V6 IN — Gourmet afterglow photo-bind feedback

Date: 2026-08-21

## Visible problem

IE's dining hero was strong, but the lower right page fell back into stacked 03/04/footer utility modules, so the photo-led momentum ended too abruptly.

## Principle tested

Use an existing semantically legitimate support image as a narrative binder before generating more imagery or adding another container. Keep the closing information native and editable, but stop presenting every lower block as an equal utility section.

## Expected improvement

A more continuous hero → 03 → image-bound 04 → footer reading path, with stronger travel-magazine rhythm and less dashboard segmentation.

## Regression risk

The extra image could become decorative noise, crowd native text, or produce false attachment between 03 and 04. Large native numerals also create collision risk when image roles become denser.

## Experiment and correction

IN `2091:2` duplicated IE rollback-safely and rebuilt only right `2091:33`. Existing hidden support image hash `e3738476...` was revealed and bound to 04; lower repeated labels were compressed into one native closing field.

Initial structure QA found two intersections: 03 headline vs 04 numeral, and 04 headline vs body. The 04 numeral/body were moved and QA was repeated before promotion.

## Evidence

- 500px whole spread: PASS and stronger than IE.
- 1400px reading: PASS.
- 794×1123 right page: PASS.
- native text: 41 across spread.
- IMAGE fills: 4 across spread.
- text intersections: 0.
- right-page 18px safe-area risks: 0.
- generated/adopted new assets: 0 / 0.
- Drive saves/uploads/new hashes: 0 / 0 / 0.

## Decision

IN adopted as preferred; IE preserved hidden as rollback.

## Next application

When another V6 page has a strong hero but a weak modular close, first inspect existing authorized support-image roles and semantic fit. Do not add an image merely to fill space; require a binding narrative function at thumbnail scale and legibility at actual size.
