# 2026-08-21 — Rurubu V6 IG 1DAY photo-overlay editorial memo

Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Visible problem

HS `2019:2` used a legitimate full-width Yokohama photograph, but the first route beat was separated beneath it and the lower half behaved like a small note/data UI. At thumbnail scale the page still read as a sequence of sections rather than one magazine composition.

## Principle/capability tested

- clean-room role redistribution without new assets;
- let one legitimate photo carry atmosphere plus the first native information beat;
- compress secondary facts only when their meaning survives without field labels;
- keep native text, replaceable image role, rollback and structure QA intact.

## Bounded test

Created IG `2073:2` from HS and changed the left page only. The hero grew from 560px to 650px, the existing start label/time/title/copy moved onto its darker lower region, the lower field was rebuilt around the existing large `01 / 寄り道、歓迎。`, and four memo values were presented as one compact line. The right route page was not redesigned.

## Expected improvement

More continuous travel-magazine rhythm, stronger dominant-photo usage, less `hero → module → data grid` reading, and more deliberate scale contrast without adding decoration.

## Regression risk

Photo overlay can lose contrast; label subtraction can create ambiguity; a larger image role can expose low source quality; lowering information density can become empty whitespace if anchors are weak.

## Evidence

- whole-item 500px: PASS;
- reading 1400px: PASS;
- actual-size left `2073:3 / 794×1123`: PASS;
- actual-size right `2073:33 / 794×1123`: PASS;
- left native text `19`, IMAGE fills `1`, text intersections `0`, 18px safe risks `0`;
- right native text `25`, IMAGE fills `3`, text intersections `0`, 18px safe risks `0`.

The first structure pass found one memo-value intersection (`午後〜夜` vs `寄り道歓迎`); it was corrected before promotion.

## Figma / Drive / GitHub evidence

- preferred IG `2073:2`;
- hidden rollback HS `2019:2`;
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified;
- generated `0`, adopted generated `0`, Drive writes `0`, new uploads `0`, new image hashes `0`;
- left hero hash unchanged: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IG-1DAY-PHOTO-OVERLAY-EDITORIAL-MEMO-QA-2026-08-21.md`;
- shared lesson: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-21-rsl-163-photo-can-carry-the-first-information-beat.md`.

## What remains Rurubu-specific

Exact photo/crop, Japanese headline scale, overlay positions, memo geometry, palette and travel-magazine grammar must not transfer to other wedding items.

## Next application

Re-run the six-preferred common-scale comparison with IG replacing HS. Select the next weakest page by visual evidence rather than continuing to polish IG because it is newest.