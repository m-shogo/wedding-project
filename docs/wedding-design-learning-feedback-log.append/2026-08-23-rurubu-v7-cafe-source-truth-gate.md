# 2026-08-23 — Rurubu V7 Cafe/Table SOURCE TRUTH gate

Scope: Rurubu WEDDING only.

## New knowledge that changed a live decision

Fresh primary-source research into D&DEPARTMENT's `d design travel` shifted the Cafe/Table photo decision from only `looks local / avoids fake text` to a stricter editorial question: **what documentary authority has actually been earned for this image?**

The useful principle was not copied visual style. `d design travel` explicitly grounds its recommendations in actual local use/research, local specificity and non-exaggerated photography. For Rurubu V7 this exposed a missing boundary in the generation brief: a plausible AI venue-like image could look like photographed local evidence even when the venue/building/landmark had never been verified.

## Live change

Figma authority `2305:2` now contains a `SOURCE TRUTH` gate.

- hidden rollback: `2371:2`
- label: `2371:27`
- body: `2371:28`
- candidate comparison `2305:26` now explicitly scores `source truth`
- production H3 `2311:2`: unchanged
- V6 control: unchanged
- V8: unchanged

Final authority-panel QA:

- 500 px: PASS
- native 1200×1098: PASS
- visible text: 26
- text-box intersections: 0
- bottom reserve: 88 px

## Failure-learning effect

The first structural readback showed label/body text boxes overlapping by 2–22 px even though glyphs did not visibly collide. Instead of accepting screenshot-only success, the label boxes were narrowed and the final structural intersection count returned to zero. This is not a new failure family; it reinforces the existing rule that screenshot readability and structure QA are separate evidence.

New domain fingerprint candidate:

`F-RSL-248-GENERATED-TRAVEL-PHOTO-IMPLIES-DOCUMENTARY-AUTHORITY-FOR-UNVERIFIED-SPECIFIC-PLACE`

State remains `TESTED_LOCAL (AUTHORITY-ONLY)`, because no real candidate photo has yet passed the full asset lifecycle.

## Asset truth

No image was generated, adopted, saved to Drive, placed into production, or newly hashed in this pass. This run improved the **selection authority before generation**; it did not pretend that photography itself was completed.
