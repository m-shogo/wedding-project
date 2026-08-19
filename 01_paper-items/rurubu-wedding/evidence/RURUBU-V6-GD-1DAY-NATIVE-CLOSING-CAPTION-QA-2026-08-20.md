# Rurubu V6 GD — 1DAY Native Closing Caption QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Candidate: `1938:2 / PREFERRED / V6_INSIDE_GD_1DAY_NATIVE_CLOSING_CAPTION_2026_08_20`
Rollback: `1879:71 / ROLLBACK / V6_INSIDE_FM_1DAY_SEMANTIC_STOP_HIERARCHY_2026_08_19`

## Visible problem

The FM 1DAY Plan right-page ending still used a yellow rectangular `END` tag plus tiny English `END / TABLE & TALK` copy over the final dining photo. At whole-item scale the element read like a UI/status tag rather than an editorial closing caption.

## Root-cause hypothesis

The final stop already has sufficient semantic hierarchy from native `04`, time, title, body, metadata and the dining photograph. A separate container/tag is no longer required for binding. Replacing it with reader-facing native copy directly on the existing photo should improve editorial finish without adding imagery or flattening editable content.

## Bounded test

Rollback-safe duplicate GD changed only the final closing role:

- hid `LABEL / END`;
- replaced `END / TABLE & TALK` with native Japanese `一日の終わりは、食卓で。`;
- placed the caption directly on the existing dining photograph;
- preserved all route copy, photography, crop, image hashes and stop hierarchy.

Structure QA also exposed two inherited 3px contacts between `02` / `12:30` and `04` / `19:00`. Those time nodes were moved from x=105 to x=116 before promotion.

## Three-scale / structure evidence

- 1200px whole spread: PASS; cleaner editorial ending than FM.
- right-page actual-size context: visually legible; final caption remains subordinate to Stop 04 title.
- visible right-page native text: `25`.
- absolute text collisions after inherited-contact correction: `0`.
- 18px text safe-area risks: `0`.
- page-level stray nodes: `0`.
- new images / generated assets / Drive saves / image hashes: `0`.

## Asset / editability state

- all existing replaceable Stop photographs remain independent image roles;
- no photo source/hash/crop was changed;
- final closing wording remains native Figma text;
- rollback FM remains preserved hidden.

## Adopted state

`VERIFIED_LOCAL / ADOPTED`

Start Here is updated to:

`V5 FU/FX · V6 GB + GA/FR + FT MEMORY SPOTS + GC CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

## Regression risk

Direct-on-photo text is valid only where actual contrast is sufficient. Do not generalize this into a rule to remove all labels or place all copy over photography. Re-run actual-size contrast/collision checks whenever the photo or crop changes.
