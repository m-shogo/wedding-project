# Rurubu V6 IN — Gourmet / dining afterglow photo-bind QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem observed

After IM 1DAY promotion, a new common-scale comparison of `ID + IK + IL + IH + IE + IM` showed IE's right Gourmet page as the next weaker beat. Its large dining hero was strong, but the lower half reverted to stacked `03 / 04 / また行きたい / 3つの楽しみ` utility rows. The photographic momentum stopped abruptly after the hero.

## Root-cause hypothesis

The lower content did not need more information or a newly generated visual. IE already contained a verified but hidden replaceable support image for the `04 / 旅の余韻` role. Keeping 04 as text-only utility content made the hero-to-closing transition feel modular; binding the existing legitimate support image to 04 could turn the lower half into a continuous editorial sequence.

## Bounded clean-room test

1. Duplicate IE `2061:2` rollback-safely to IN `2091:2`.
2. Preserve the accepted left Café page and right dining hero.
3. Reweight only the right-page lower field `2091:33`.
4. Keep 03 as the strong left editorial text beat.
5. Reveal existing verified `PHOTO / TABLE_NOTE_SUPPORT_REPLACEABLE` and bind it to 04 as a visual afterglow/travel-memory beat.
6. Compress the lower `また行きたい` and `3つの楽しみ` material into a single native-text footer field instead of separate utility sections.
7. Remove only the redundant lower check label/kick; preserve meaningful native copy.
8. Add no card, shadow, gradient, generated asset, Drive master, upload or new image hash.

## Iteration / defect correction

The first structural pass found two text intersections:

- 03 headline against the large 04 numeral;
- 04 headline against its body copy.

The 04 numeral was separated horizontally and the body copy moved lower. QA was rerun before promotion and returned zero text intersections.

## Three-scale evidence

- whole spread / 500px: PASS; lower right now continues the photo-led editorial rhythm instead of falling back to utility rows.
- reading spread / 1400px: PASS.
- actual-size right page `2091:33 / 794×1123`: PASS.
- 03 → image-bound 04 → compact footer remains readable and intentionally asymmetric.

## Structure / print-adjacent QA

Final IN readback:

- preferred root: `2091:2` / `PREFERRED / V6_INSIDE_IN_GOURMET_DINING_AFTERGLOW_PHOTO_BIND_2026_08_21`;
- right page: `2091:33`;
- visible native text: `41` across spread;
- visible IMAGE fills: `4` across spread;
- text intersections: `0`;
- right-page 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- replaceable image roles preserved: YES;
- IE `2061:2`: hidden rollback, not deleted.

## Image provenance / hash continuity

No new asset lifecycle was started. Existing verified hashes were reused:

- left support skyline `2091:9`: `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- left café lead `2091:18`: `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- right dining hero `2091:35`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- right 04 support `2091:46`: `e3738476f760932bb5b09c9d60f174dd6c84049d`.

Drive V6 root was re-read immediately before promotion: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Current-run asset delta for IN:

- generated: `0`;
- newly adopted generated: `0`;
- new Drive save: `0`;
- new external binary placement: `0`;
- new image hash: `0`.

## Decision

`IN ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

IE remains a valid rollback, but IN is stronger at all three review scales because the already-authorized support photograph carries a real narrative role between the dominant dining hero and the closing native information field.

V7 remains HOLD. V6 remains NOT PRINT READY until final photography/copy, imposition, exact printer bleed/trim/fold/safe-area, PDF preflight and physical proof are verified.
