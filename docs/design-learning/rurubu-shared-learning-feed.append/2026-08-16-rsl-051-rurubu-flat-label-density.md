# RSL-051 — Role-bound flat labels can restore thumbnail-scale editorial energy without rebuilding cards

Source scope/item: Rurubu WEDDING V6

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The prior preferred V6 set V/BR/BQ had already passed native-text, replaceable-image, collision and safe-area checks and had removed much of the earlier card/dashboard geometry. However, at 500px whole-item scale the beige/cream surfaces and restrained metadata still made the issue feel more like a polished template than an energetic Japanese travel-information magazine.

## Evidence before change

- Outer V `1477:2`;
- Profile/Q&A BR `1482:2`;
- Story/Chronology BQ `1468:2`;
- all were live preferred and structurally valid before the bounded test;
- no missing information required a new content module.

## Root-cause hypothesis

The remaining defect was **editorial anchoring at thumbnail scale**, not insufficient container count. A small number of high-contrast flat fields can increase information-magazine energy when each field is bound to an actual role — section kicker, major event number, photo caption or final milestone — while repeating full cards/stickers for every item would recreate UI/template rhythm.

## Bounded test

Rollback-safe duplicates were built without new imagery or generated decoration:

- Outer W `1491:2` from V;
- Profile/Q&A BT `1488:2` from BR;
- Story/Chronology BS `1486:81` from BQ.

Only existing verified Figma image hashes, native/editable text and simple flat magenta/cyan/yellow/navy fields/rules were used.

Examples of the bounded treatment:

- yellow kick tabs for `TRAVEL LOG`, Q&A and timeline roles;
- magenta/cyan/yellow blocks only for selected major chronology/Q&A numbers;
- compact photo-caption fields bound directly to existing photographs;
- thin colored rules that bind title/event/terminal regions;
- support events remain plain native typography instead of receiving matching cards.

## Expected improvement

- stronger issue identity at 500px whole-item scale;
- clearer differentiation between major and support information;
- more Japanese travel-guide-magazine energy without adding new card grids, generic shadows, gradients or arbitrary stickers;
- preserve human editability and photo replacement.

## Regression risk

Flat blocks can become another repeated template signature if every item receives one. They can also collide with variable/native copy or consume safe-area reserve. Therefore the treatment must remain selective and must be structure-QA'd after placement.

The regression risk occurred during the test: initial BS Story had safe-area/text collisions, and initial BT Q&A number blocks touched question/answer text. Those states were not adopted. Widths/positions were corrected and QA rerun.

## Three-scale evidence

Whole-item / thumbnail:

- W 500px PASS and stronger than V;
- BT 500px PASS and less wireframe-like than BR;
- BS 500px PASS and major chronology beats remain visible.

Reading scale:

- W ≈1200px PASS;
- BT ≈1200px PASS;
- BS ≈1200px PASS.

Actual-size/detail:

- W back `1491:3` 794×1123 PASS;
- BT Profile `1488:3` 794×1123 PASS;
- BT Q&A `1488:33` 794×1123 PASS;
- BS Story `1486:82` 794×1123 PASS;
- BS Timeline `1486:100` 794×1123 PASS.

Final structure readback:

- W back: 18 native text / 3 IMAGE / collision 0 / 18px safe risk 0;
- W front: 12 native text / 5 IMAGE / collision 0 / 18px safe risk 0;
- BT Profile: 17 native text / 4 IMAGE / collision 0 / 18px safe risk 0;
- BT Q&A: 25 native text / 2 IMAGE / collision 0 / 18px safe risk 0;
- BS Story: 11 native text / 3 IMAGE / collision 0 / 18px safe risk 0;
- BS Timeline: 30 native text / 5 IMAGE / collision 0 / 18px safe risk 0.

## Figma / Drive / GitHub evidence

Figma:

- W `1491:2`;
- BT `1488:2`;
- BS `1486:81`;
- hidden rollbacks V `1477:2`, BR `1482:2`, BQ `1468:2`;
- Start Here `845:27`: `V5 FU/FX · V6 W + BT/BS INSIDE STUDIES · V7 HOLD`.

Drive:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read live;
- no Drive write or new generated-master adoption in this experiment.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BT-BS-RURUBU-LABEL-SYSTEM-QA-2026-08-16.md`;
- `01_paper-items/rurubu-wedding/RURUBU-V6-W-BT-BS-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: W/BT/BS promoted to preferred after corrected structure QA and three-scale screenshot review.

No generated image was created or adopted. No external binary transport was retried.

## What must remain Rurubu-specific

Do not transfer:

- the exact magenta/cyan/yellow/navy palette;
- specific Japanese travel-guide visual grammar;
- exact label sizes/coordinates;
- chronology geometry;
- Yokohama imagery;
- title wording, Q&A wording or issue-specific editorial copy.

## Cross-item applicability hypothesis

On another materially different print artifact that is structurally correct but too visually quiet at thumbnail scale, independently test **one or a few role-bound flat labels/rules** before adding a repeated card system. Promote only if the element performs a real hierarchy/binding function and passes actual copy, safe-area and whole-item QA.

This is a method hypothesis, not a visual-style default.