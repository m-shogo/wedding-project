# RSL-084 — Repeated prompts can end with semantic closing weight, but variable copy must stack natively

Date: 2026-08-18
Source scope: Rurubu WEDDING V6 Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

After DJ solved Q01/Q04 feature hierarchy and preserved the contrast-critical Q02/Q03 binding, the final Q05/Q06 still carried nearly equal visual weight. At the end of the page this symmetry read slightly like two final form rows rather than an intentional magazine close.

## Root-cause hypothesis

The repeated-information pattern did not need another decorative container. The semantic ending itself lacked hierarchy: Q05 could behave as a quiet support beat while Q06 could carry the final editorial emphasis.

## Bounded test

Rollback-safe DK `1650:87` was created from DJ.

- Q05 hierarchy reduced;
- Q06 ordinal/question hierarchy increased;
- small native closing kicker added;
- no cards, rounded panels, shadows, gradients, generated decoration or new raster;
- Q01–Q04 and image roles retained;
- all variable copy remained native.

Expected improvement: reduce form-like symmetry and create a more deliberate editorial ending without harming editability.

Actual visual result: whole, reading and actual-size review favored DK. `VERIFIED_LOCAL`.

## Failure fingerprint and correction

The first realistic-copy proof exposed a fixed-Y collision in Q05 when the native question wrapped. Q06, already placed in a vertical auto-layout stack, remained stable.

Failure family:

`PHOTO_BOUND_NATIVE_COPY_FIXED_Y_COLLISION`

This repeats an already-known class: variable native question/answer pairs cannot be considered resilient solely because short placeholder copy fits.

Correction:

- Q05 → native vertical auto-layout stack with auto-height question/answer;
- Q06 → native vertical auto-layout stack with auto-height question/answer;
- do not retry cosmetic fixed-Y nudging when the same failure family recurs.

Second realistic-copy proof passed:

- text collisions: 0;
- 18px text safe-area risks: 0;
- page overflow: 0;
- Q05 stack bottom: 1005px;
- Q06 stack bottom: 1002px.

## Three-scale evidence

- preferred DK `1650:87`;
- Q&A actual-size `1650:127`, 794×1123 PASS;
- hidden failed proof `1650:174` retained;
- hidden passing proof `1650:262` retained;
- normal preferred Q&A: native text 27, IMAGE roles 3, collision 0, safe risk 0, overflow 0.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AD-DK-DE-QA-ASYMMETRIC-CLOSING-FEATURE-2026-08-18.md`.

Drive evidence:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read live;
- no Drive write;
- generated section masters remain unadopted.

## What remains Rurubu-specific

Do NOT transfer:

- exact Q05/Q06 wording;
- `OUR NEXT CHAPTER` wording;
- colors;
- exact font sizes;
- coordinates;
- photo choices;
- the Rurubu Q&A layout.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> When the end of a repeated-information page still reads like equal form rows, test whether the final semantically important item should become the closing feature while the preceding item becomes support. If the copy is variable, prove the hierarchy with native auto-height stacks and realistic long-copy stress rather than fixed-Y nudging.

This remains a hypothesis outside Rurubu until independently reproduced.