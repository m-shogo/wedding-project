# RSL-107 — Photo-scale variation can break module rhythm without new containment

Source scope/item: Rurubu WEDDING / V6 1DAY Plan
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A model-course page had correct native time/title/copy hierarchy and independent replaceable photo roles, but its four images still read as a repeated vertical module stack at whole-page scale.

## Root-cause hypothesis

The remaining template feeling came from insufficient visual responsibility differences between the existing photos, not from missing decoration, missing cards or missing imagery.

## Bounded test

On rollback-safe duplicate EJ `1784:2`, keep all facts, image sources/hashes and native copy, and vary only the four photo roles through size, position and very light rotation. Preserve semantic sequence through the existing native `01–04` and times.

A first skyline enlargement exceeded the known small source width and was rejected. The role was corrected to source-safe `238×210` before adoption.

## Expected improvement

A more editorial photo-diary rhythm with clearly different dominant/support roles, while retaining readable route order and editability.

## Regression risk

- source-size overreach can hide behind a visually attractive crop;
- rotation/overlap can collide with copy;
- over-variation can weaken sequence comprehension.

## Three-scale evidence

- whole-item/thumbnail: PASS and stronger than predecessor EI;
- reading scale: PASS;
- actual-size right page `794×1123`: PASS;
- native visible text `25`;
- replaceable photos `4`;
- text collision `0`;
- 18px text safe-area risk `0`.

## Evidence

- Figma source EI: `1752:2`;
- adopted EJ: `1784:2`;
- EJ right page: `1784:29`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EJ-1DAY-PHOTO-SCALE-RHYTHM-QA-2026-08-19.md`.

## Adopted / rejected status

`VERIFIED_LOCAL`: EJ adopted. EI preserved as hidden rollback. The first over-enlarged skyline geometry was rejected before promotion.

## What must remain Rurubu-specific

Do not transfer the Yokohama itinerary, exact photo sizes/angles, travel-magazine palette, typography, image choices, coordinates or page composition.

## Cross-item applicability hypothesis

When another print artifact is structurally correct but still looks like repeated media modules, independently test whether existing legitimate images can assume more distinct dominant/support roles through scale and placement **before** adding cards, shadows, decorative containers or new images. Re-run intrinsic-source and text-collision checks after the change.
