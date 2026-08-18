# RSL-099 — Photo repetition should be reduced by role, not by count

Date: 2026-08-18
Source scope/item: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Publication-level photo repetition remained high. A naive count-only approach would suggest replacing any repeated photo role, but not every repeated role has the same editorial function.

## Root-cause hypothesis

Photo diversity is only an improvement when the removed/replaced role is not carrying essential editorial energy or factual/place evidence. A repeated photo can be safely subtracted when another legitimate visual field already performs its job; the same method can fail when the photo is the main source of magazine energy.

## Bounded tests

### Rejected — Profile ED `1727:2`

The Profile hero flatlay was replaced by the existing composed travel texture, while native title/pullquote hierarchy was strengthened. The page became too quiet and template-like at whole-spread scale.

Status: `REJECTED`.
Failure fingerprint: `PHOTO_REPETITION_SUBTRACTION_REMOVES_EDITORIAL_ENERGY`.

### Adopted — Outer EE `1730:2`

The duplicate back-cover cafe photo was removed. The already-legitimate flatlay photo was extended only to its known source height and bound directly to the existing memory-title strip. The front cover stayed unchanged.

Expected improvement: reduce one repeated cafe role while preserving or improving back-cover hierarchy.

Regression risk: dead space, weaker memory-section binding, or over-enlarged source raster.

## Three-scale / structural evidence

- EE whole spread 1200px: PASS and stronger than AH;
- EE back actual size 794×1123: PASS;
- text collisions: 0;
- 18px text safe-area risks: 0;
- flatlay display `793.7×608` vs known source `944×608`: PASS;
- preferred visible IMAGE roles after EE/EF: 36;
- cafe hash repetition reduced `6 → 5`.

## Evidence

- Figma preferred EE: `1730:2`
- hidden rollback AH: `1717:55`
- hidden rejected ED: `1727:2`
- QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EE-EF-PHOTO-REPETITION-AND-CAFE-DENSITY-QA-2026-08-18.md`
- Drive authority remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## What must remain Rurubu-specific

Do not transfer the cafe/flatlay choices, image hashes, exact crop, masthead, Yokohama issue grammar, palette, or outer-cover geometry.

## Cross-item applicability hypothesis

When another print item has repeated imagery, do not optimize repetition count blindly. First classify each role:

1. factual/evidentiary photo role;
2. dominant editorial-energy role;
3. support/decorative role;
4. redundant role already covered by another legitimate field.

Test subtraction or non-photo substitution only on a rollback-safe candidate. Adopt only when whole-item, reading and actual-size evidence shows no loss of editorial energy or semantic truth.
