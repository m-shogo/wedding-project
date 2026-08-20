# 2026-08-21 — Rurubu V6 IK profile clean-room photo column

Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

The HU profile spread was readable and technically clean, but the left page still felt like a stacked legacy/web composition compared with the stronger current V6 spreads. The dominant photo, profile facts and lower snapshots behaved as separate horizontal sections.

## Principle tested

Before adding more decoration, test whether a legitimate dominant photograph can be reoriented and directly bound to compact native facts, with the lower snapshots acting as an asymmetric continuation rather than another module.

## Expected improvement

A more unmistakable Japanese travel-magazine rhythm: photo-first hierarchy, varied scale, compact fact density, stronger continuity, less card/section reading.

## Regression risk

Narrow factual columns can fail with longer production copy; photo-overlay text can lose contrast after repositioning; repeating the same vertical-photo geometry elsewhere would become another template.

## Bounded experiment

- duplicated HU `2044:2` into IK `2084:2`;
- rebuilt only the left profile page;
- reused existing verified replaceable imagery;
- hid the old generated route-texture raster;
- preserved all native factual text and Q&A right page;
- no new generated asset, Drive save, external binary placement or image hash.

## QA evidence

- 500px whole spread: PASS and visually stronger than HU;
- 1400px reading spread: PASS;
- actual-size left `2084:3` at `794×1123`: PASS;
- one low-contrast deck after moving white text onto cream was corrected using the existing dark text fill;
- local `03` metadata/number/title collisions were corrected before adoption;
- final visible native text `55`;
- final IMAGE fills `5`;
- same-parent text intersections `0`;
- 18px page-edge text safe risks `0`;
- whole-page flattening `NO`.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

- IK `2084:2` promoted to preferred at x=`273800`, y=`0`;
- HU `2044:2` hidden as rollback, not deleted.

## Next application

Re-run the six-spread common-scale comparison from the new preferred set. Do not polish IK merely because it is newest. Use this lesson only as a hierarchy hypothesis; keep exact Rurubu geometry, palette, imagery and travel-magazine treatment item-specific.

Detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IK-PROFILE-CLEANROOM-PHOTO-COLUMN-QA-2026-08-21.md`.
