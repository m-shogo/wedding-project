# Rurubu WEDDING V6 — O / AR / AQ QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Live authority

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Start Here `845:27`: `V5 FU/FX · V6 O + AR/AQ INSIDE STUDIES · V7 HOLD`
- Outer O: `1370:2`
- Profile / Q&A AR: `1389:2`
- Story / chronology AQ: `1387:2`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## Visible problem

AM's profile page remained visually split into a modest horizontal photo followed by a large information field. It was clean and editable, but at whole-spread scale it still read like a competent profile template rather than a photo-led Japanese travel-information magazine page. The cover and AQ had stronger photographic authority than the profile page.

## Root-cause hypothesis

The remaining weakness was not missing cards or decoration. The dominant profile image did not occupy enough page width to function as an editorial field. Enlarging the existing verified photo to a full-width horizontal role, then compacting profile facts below it and letting the three replaceable snapshots overlap asymmetrically, should improve magazine continuity without introducing UI geometry.

## Bounded rollback-safe test

AR was cloned from AM. AM was preserved and hidden as rollback.

Profile changes only:

- main replaceable photo moved to `x=0 / y=140 / 793.7×328`;
- profile-data rail compacted below the hero;
- existing six native profile fields redistributed into two compact columns;
- existing three replaceable snapshots enlarged/repositioned with small opposing rotations;
- existing native pullquote moved above the snapshot cluster in z-order;
- no new photo source, generated decoration, card, badge, gradient, shadow, or raster text was added.

Q&A geometry was intentionally left unchanged because AM's interview-column solution and long-answer stress evidence remained valid.

## Expected improvement

- stronger first-read photographic impact;
- less `header → image → form` template rhythm;
- better visual continuity with Outer O and AQ;
- retain native text and replaceable photo roles.

## Regression risks checked

- dominant photo softness from enlargement;
- profile field collision after compaction;
- snapshot/pullquote occlusion;
- trim/safe-area violations;
- fold crossing.

## Three-scale evidence

- whole spread at 1200 px: PASS; AR is visually stronger than AM because the profile photograph becomes a page-level editorial field;
- reading scale: PASS; facts remain legible and the lower snapshot cluster remains clearly secondary;
- actual profile page `794×1123`: PASS; photograph, profile values, snapshot cluster and pullquote remain readable.

## Structure readback

Profile page `1389:3`:

- native visible text: `18`;
- IMAGE roles: `4`;
- same-parent text collisions: `0`;
- 18 px text safe-area risks: `0`.

Q&A page:

- native visible text: `24`;
- IMAGE roles: `2`;
- same-parent text collisions: `0`;
- 18 px text safe-area risks: `0`.

AR was promoted as `PREFERRED / V6_INSIDE_AR_PROFILE_FULLBLEED_EDITORIAL_2026_08_16`.
AM `1380:18` is retained hidden as `ROLLBACK / V6_INSIDE_AM_VERTICAL_QA_EDITORIAL_2026_08_16`.

## Asset lifecycle truth

- newly generated image: `0`;
- new Drive save: `0`;
- new Figma binary transport: `0`;
- existing verified replaceable photography recomposed: `YES`;
- native editable copy preserved: `YES`;
- generated section decoration adopted: `NO`;
- V7 touched: `NO`.

The known generated-section-master transport fingerprint was not retried because no material environment capability change was observed.

## Decision

`AR ADOPTED AS PREFERRED V6 PROFILE/Q&A STUDY`.

This does not make V6 print-ready. Final content, final real photography, exact printer template, bleed/trim/fold/page-order verification, PDF preflight and physical proof remain required.