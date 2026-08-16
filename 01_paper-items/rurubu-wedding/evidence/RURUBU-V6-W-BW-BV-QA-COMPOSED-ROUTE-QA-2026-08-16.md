# RURUBU WEDDING V6 — W + BW/BV Q&A composed-route QA — 2026-08-16

Status: `VERIFIED_LOCAL / BW_PROMOTED / OUTER_X_REJECTED / V7_HOLD / NOT_PRINT_READY`

Scope: **Rurubu WEDDING only**. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD production state was inspected or edited.

## Start authority

- Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
- Start Here before this pass: `V5 FU/FX · V6 W + BT/BV INSIDE STUDIES · V7 HOLD`
- Drive V6 root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- GitHub current status before write: `OUTER_W_CURRENT / INSIDE_BT_BV_PREFERRED_STUDIES`

## Observation

BT Q&A was structurally correct but still read as two disconnected systems:

- left: a vertical question list on mostly empty cream;
- right: two photo anchors;
- the lower-left/center cream field made the page feel closer to a Figma template than an authored travel-magazine spread.

The defect was not missing information. It was missing **editorial continuity across the question flow**.

## Root-cause hypothesis

A bounded, low-contrast composed travel-route texture can connect the left question sequence without turning each question into a card, as long as:

- all variable question/answer copy stays native text;
- both photographs stay independent replaceable IMAGE roles;
- the decoration remains one fixed raster role;
- the texture does not replace hierarchy; Q4–Q6 spacing still needs to be tightened;
- the page remains readable at thumbnail and actual-size scales.

This extends the already locally verified BV hybrid pattern but tests it in a different semantic role.

## Bounded test

Rollback-safe duplicate:

- source BT: `1488:2 / ROLLBACK / V6_INSIDE_BT_RURUBU_LABEL_SYSTEM_2026_08_16`
- candidate/promoted BW: `1502:2 / PREFERRED / V6_INSIDE_BW_QA_COMPOSED_ROUTE_2026_08_16`
- Q&A page: `1502:38`
- composed decoration: `1502:75 / DECOR / QA_ROUTE_TEXTURE_COMPOSED_RASTER`

The decoration reuses the already verified Rurubu composed travel texture hash from BV as a new **bounded Q&A crop/role**, rather than recreating live ornament micro-geometry.

Final BW decoration geometry:

- position approximately `x=-58 / y=360` within the Q&A page;
- display approximately `438×660`;
- opacity `0.28`;
- slight rotation `-2.2°`;
- source composed texture intrinsic authority remains `720×860`, therefore display is intrinsic-safe.

Q4–Q6 were pulled upward to reduce the dead field while preserving the right photo anchors.

## Intermediate failure caught before promotion

First BW screenshot exposed a real regression: the wide Q4 native headline extended underneath the hero photo and part of the question became visually occluded.

That state was **not promoted**.

Repair:

- Q4 native headline width reduced to `188px` while keeping it editable;
- Q4 answer width reduced to `184px`;
- composed texture moved/expanded so the route reads under Q3–Q6 rather than competing with the hero;
- screenshot QA rerun.

Failure class:

`TEXT_UNDER_PHOTO_DUE_TO_Z_ORDER_AND_OVERWIDE_COPY_BOX`

## Three-scale visual evidence

### Whole-item / thumbnail

BW at `500px` long-edge:

- Profile and Q&A remain readable as one spread;
- Q&A now has a visible but subordinate travel-route field rather than dead cream;
- Q1 and Q4 remain the strong beats;
- right photo anchors still dominate over the decoration;
- no card-grid/dashboard impression was introduced.

Result: `PASS`.

### Reading / spread scale

BW at `1200px` long-edge:

- Q4 question is fully visible after repair;
- Q4–Q6 reading rhythm is tighter than BT;
- route texture links the lower question field without overpowering copy;
- Profile page is visually unchanged from BT.

Result: `PASS`.

### Actual-size page

Q&A `1502:38` rendered at `794×1123`:

- all six question/answer groups readable;
- composed raster remains low-contrast background support;
- hero and support photographs remain visually dominant;
- no fake final text was baked into the decoration.

Result: `PASS`.

## Structure QA

Final BW Q&A structure readback:

- native text: `25`;
- replaceable photo IMAGE roles: `2`;
- composed/fixed DECOR roles visible: `6` total, including one reused composed raster role and existing flat labels;
- text/text collision: `0`;
- unintended text/photo collision: `0`;
- 18px text safe-area risk: `0`.

Photo roles/hashes remain independent:

- `PHOTO / QA_MEMORY_HERO_REPLACEABLE` — `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `PHOTO / QA_MEMORY_SUPPORT_REPLACEABLE` — `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

No new external binary transport was used.

## Promotion

Promoted:

- `1502:2 / PREFERRED / V6_INSIDE_BW_QA_COMPOSED_ROUTE_2026_08_16`

Preserved rollback:

- `1488:2 / ROLLBACK / V6_INSIDE_BT_RURUBU_LABEL_SYSTEM_2026_08_16` — hidden

Start Here after promotion:

`V5 FU/FX · V6 W + BW/BV INSIDE STUDIES · V7 HOLD`

## Second experiment — Outer X subtraction test

A separate rollback-safe Outer candidate tested whether removing the three colored year blocks from W would reduce UI-like appearance:

- `1506:2 / REJECTED / V6_OUTER_X_BACK_TIMELINE_TOO_QUIET_2026_08_16`

Test:

- remove the magenta/teal/yellow year blocks;
- keep the Wedding terminal;
- rely on varied year typography scale/color/position only.

Observed result:

- UI/block impression decreased;
- but thumbnail/reading-scale travel-magazine energy also decreased;
- the back cover became quieter and less information-magazine-like than W;
- the removal therefore weakened the intended Rurubu editorial grammar rather than improving it.

Decision: `REJECTED / HIDDEN`, Outer W remains preferred.

Failure fingerprint:

`OVER_SUBTRACTION_REMOVES_EDITORIAL_ENERGY`

## Asset lifecycle truth

- newly image-generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new distinct raster bytes: `0`
- reused verified composed raster in a new bounded Q&A role: `YES`
- native editable Q&A copy preserved: `YES`
- replaceable photo roles preserved: `YES`
- whole/read/actual-size visual verification: `YES`
- structure/safe-area verification: `PASS`
- rejected Outer comparison preserved: `YES`
- V7 touched: `NO`

## Result

Current preferred V6 becomes:

`Outer W + Profile/Q&A BW + Story/Chronology BV`.

This is still a verified dummy-design study, **not print-ready**. Final personal copy, final photography, exact printer template, PDF preflight, page order and physical proof remain separate completion gates.
