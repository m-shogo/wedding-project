# RSL-031 — Interview copy can form one editorial column instead of six floating modules

Date: 2026-08-16
Source scope/item: Rurubu WEDDING / V6 Profile-Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The verified AL Q&A page kept six editable question/answer groups as separate spatial islands above a large memories photograph. It was readable and structurally safe, but at thumbnail and reading scale it still read like individually positioned Figma modules rather than one magazine interview page.

## Root-cause hypothesis

When repeated semantic units belong to one reading sequence, giving every unit an independent spatial cell can create implicit card/grid semantics even if no visible cards exist. A single editorial column can preserve all editable copy while reducing module repetition, and a separate dominant image anchor can carry page-level visual mass.

## Bounded test

Rollback-safe duplicate AM `1380:18` was created from AL `1373:2`.

Only the Q&A page was recomposed:

- removed three nonessential native separator rules;
- kept six native question/answer groups;
- retained feature/support number hierarchy (`01/04` dominant);
- aligned all six Q&A groups into one continuous left reading column;
- reassigned the two existing verified photo roles into one large right image anchor plus one overlapping support image;
- added only native editable closing copy, not a fixed raster phrase.

No new image, Drive save, generated asset, card, badge, shadow or gradient was introduced.

## Expected improvement

Reduce implicit grid/dashboard reading, make the interview sequence easier to follow at thumbnail scale, and let photography participate in the page as a genuine editorial anchor rather than a lower-page content block.

## Regression risk

A vertical interview column can become too sparse, repetitive, or newspaper-like. Large number markers can collide with questions if text boxes are not explicitly separated. One dominant photo may also overtake the information hierarchy if its crop or source quality is weak.

## Three-scale evidence

- whole spread / 500 px: PASS; one interview column + one image anchor is more immediate than AL's six floating regions;
- reading spread / 1400 px: PASS;
- actual Q&A / native `794×1123`: PASS;
- final visible native text: `24`;
- replaceable IMAGE roles: `2`;
- text/text bounding-box collisions: `0` after correcting the first AM number-wrap/collision state;
- 18 px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted AM: `1380:18`
- actual Q&A: `1380:46`
- hero image: `1380:71`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, `340×460`
- support image: `1380:72`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, `185×215`
- rollback AL: `1373:2`, hidden and retained
- Start Here: `845:27` = `V5 FU/FX · V6 O + AM/AI INSIDE STUDIES · V7 HOLD`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- GitHub evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AM-AI-QA-2026-08-16.md`
- evidence commit: `67215d28ca8fc4cc691b6e327ce87e92eafcca7d`

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: AM promoted as current Profile/Q&A study.

The initial AM render exposed vertically wrapped `01/04/06` number boxes and text bounding overlap. That intermediate state was corrected before promotion and is not counted as success.

## What must remain Rurubu-specific

Do not transfer the exact left-column coordinates, number colors/sizes, Japanese questions, travel-photo choices, cream paper field, closing phrase, or Rurubu travel-magazine grammar.

## Cross-item applicability hypothesis

On another print artifact with repeated editable copy units, independently test whether repeated free-floating modules can be reorganized into one continuous reading column or rail before adding visible cards/containers. Preserve the target artifact's own physical and visual grammar.

## Next receiving-item experiment

A materially different print item with repeated facts/questions/steps can compare:

1. repeated spatial modules without visible containers;
2. one continuous semantic reading column plus a separate functional visual anchor.

Judge at whole-item scale first, then stress dynamic copy and collision tolerance. Do not promote this as a universal column layout rule until reproduced elsewhere.