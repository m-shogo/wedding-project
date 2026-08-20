# Rurubu V6 IM — 1DAY photo-mosaic route QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem observed

Common-scale comparison of the preferred V6 set (`ID + IK + IL + IH + IE + IG`) showed IG's right 1DAY page lagging behind the newer photo-led spreads. The left page already had a dominant Yokohama photo, but the right page still read primarily as a vertical time/list module with large cream gaps and only late secondary photography.

## Root-cause hypothesis

The problem was not missing imagery. Four verified replaceable destination/food images already existed in the right-page structure, but one was hidden and the other three were assigned to repeated row-like stops. The repeated stop rhythm made the page read like a route dashboard rather than an editorial travel itinerary.

## Bounded clean-room test

1. Duplicate IG `2073:2` rollback-safely to IM candidate `2087:2`.
2. Preserve the entire accepted left page unchanged.
3. Recompose only right page `2087:33` using the existing four verified right-page images as unequal editorial roles:
   - STOP 01: compact morning opener + previously hidden skyline image;
   - STOP 02: dominant upper-right café photo;
   - STOP 03: medium lower-left street photo;
   - STOP 04: smaller lower-right dining photo.
4. Keep all stop numbers, times, titles, copy and metadata as native editable Figma text.
5. Keep route rail/dots hidden; add no cards, shadows, gradients or new decoration.
6. Add no new image, upload, Drive master, binary placement or image hash.
7. First 1400px review found STOP 02 text occluded by z-order and STOP 04 timing visually attached to STOP 02 metadata; move those text roles outside the photo field.
8. Structural pre-promotion QA then found four text intersections (route title/deck 2px, plus STOP 04 number/time/meta overlaps); correct them and rerun QA to zero intersections.

## Three-scale visual evidence

- whole spread / 500px: PASS; IM is materially more photo-led and less list/dashboard-like than IG.
- reading spread / 1400px: PASS after the text-separation correction.
- actual-size right page `2087:33 / 794×1123`: PASS.
- asymmetric hierarchy remains legible: 01 morning opener → dominant 02 café → unequal 03/04 lower photo beats.
- no excessive rounded rectangles, card grid, generic gradients or shadow hierarchy introduced.

## Structure / print-adjacent QA

Final IM readback:

- preferred root: `2087:2` / `PREFERRED / V6_INSIDE_IM_1DAY_PHOTO_MOSAIC_ROUTE_2026_08_21`;
- right page: `2087:33`;
- visible native text: `43` across spread;
- visible IMAGE fills: `5` across spread (1 left hero + 4 right route photos);
- text intersections: `0`;
- right-page 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- replaceable image roles preserved: YES;
- IG `2073:2`: hidden rollback, not deleted.

## Image provenance / hash continuity

No new asset lifecycle was started. Existing verified hashes were reused:

- left hero `2087:5`: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- STOP 01 skyline `2087:45`: `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- STOP 02 café `2087:51`: `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- STOP 03 street `2087:57`: `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- STOP 04 dining `2087:63`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

Drive V6 root was re-read before the experiment: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Current-run asset delta:

- generated: `0`;
- newly adopted generated: `0`;
- new Drive save: `0`;
- new external binary placement: `0`;
- new image hash: `0`.

## Decision

`IM ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

IG was not visually broken, but IM is the stronger current V6 1DAY route candidate because it assigns unequal editorial roles to already-authorized photography instead of treating every stop as a repeated list row.

V7 remains HOLD. V6 remains NOT PRINT READY until final photography/copy, imposition, exact printer bleed/trim/fold/safe-area, PDF preflight and physical proof are verified.
