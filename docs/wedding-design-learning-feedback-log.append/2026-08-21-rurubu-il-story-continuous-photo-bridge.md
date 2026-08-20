# 2026-08-21 — Rurubu V6 IL story continuous photo bridge

Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

After IK promotion, the IJ story-left page still contained a broad cream band between its full-width hero and lower café/photo-text field. At actual size the gap had no clear semantic or physical role and made the page read like two horizontal web sections.

## Principle tested

When blank paper becomes an accidental section divider, first test moving an existing legitimate downstream image/text field closer rather than filling the space with a new card, badge, decoration or generated asset.

## Expected improvement

More continuous photo-led travel-magazine rhythm while retaining a small breathing transition, native text and replaceable image roles.

## Regression risk

Too little separation can create mechanical photo stacking or crowd the supporting overlap. The method is not a global instruction to eliminate whitespace; gaps with fold, scan, writing, variable-copy or chapter-pacing jobs must remain.

## Bounded experiment

- duplicated IJ `2080:2` into IL `2085:2`;
- changed only story left `2085:3`;
- moved lower café photo y=`660 → 585`, resized `545×370 → 525×420`;
- moved its bound texture, native headline/body and 3-scenes note group upward;
- hero, destination support image and chronology right page remained unchanged;
- no new image, generation, Drive save, hash, card, shadow or gradient.

## QA evidence

- 500px whole spread: PASS and more continuous than IJ;
- 1400px reading spread: PASS;
- actual-size left `2085:3` at `794×1123`: PASS;
- native text `39` across spread;
- IMAGE fills `6`;
- same-parent text intersections `0`;
- 18px page-edge safe risks `0`;
- whole-page flattening `NO`.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

- IL `2085:2` promoted at x=`275600`, y=`0`;
- IJ `2080:2` hidden as rollback, not deleted.

## Next application

Re-run the six-spread common-scale comparison from ID + IK + IL + IH + IE + IG. Do not continue editing IL merely because it is newest. Test any future blank-band repair against the gap's real physical/editorial function first.

Detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IL-STORY-CONTINUOUS-PHOTO-BRIDGE-QA-2026-08-21.md`.
