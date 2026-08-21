# RSL-200 — Destination identity can own the cover before weak generic atmosphere

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Outer G → U
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V8 Outer G had one legitimate generated visual role, but its abstract ocean-light atmosphere dominated the front cover while the actual destination identity `横浜 / YOKOHAMA` remained a small 22 px label. The cover was clean but could read as a generic restrained travel/book template rather than an issue owned by a specific place.

## Root-cause hypothesis

A dominant visual can be technically valid, well-composed and provenance-safe yet still be too semantically generic for the role. When that happens, adding more decorative location motifs is not the only answer: the article-owned place name itself can become the primary visual mass and the weakly specific atmosphere image can be demoted to a supporting field.

## Principle tested

Before generating or adding another location-themed decoration, test whether the destination's own native text can carry issue identity strongly enough to restore semantic ownership.

## Bounded test

Rollback-safe Outer U `2205:2`:

- native `横浜` promoted from a 22 px mixed destination label to 112 px / 122 px leading;
- small native `YOKOHAMA` retained as secondary place metadata;
- existing generated ocean-light role retained but demoted from `647×520` to `647×326`;
- existing native cover headline preserved on that supporting field;
- no new image generation, no new Drive asset, no V6/V7 image reuse, no new decorative card/sticker/map motif.

## Expected improvement

The first read should become `publication → destination → supporting atmosphere`, rather than `publication → generic atmosphere → small place label`.

## Regression risk

Oversized place type can become tourism-poster cliché, collide with masthead hierarchy, or crowd the supporting visual. A weak atmosphere image also remains weak photography even when demoted; this treatment does not convert it into legitimate destination photography.

## Three-scale evidence

- whole-item / 500 px: PASS; `横浜` remains the immediate destination anchor.
- reading / 1000 px: PASS; masthead → destination → supporting visual → deck is clear.
- actual-size / 1587×1123: PASS.
- visible native text: `13`.
- visible IMAGE roles: `1`.
- text intersections: `0`.
- 18 px text safe risks: `0`.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted current: Outer U `2205:2`
- rollback: Outer G `2174:2` hidden
- retained generated master: Drive `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-OUTER-U-PROFILE-V-DESTINATION-IDENTITY-ARTICLE-OWNED-CLOSE-QA-2026-08-22.md`

## Failure fingerprint

`F-RSL-200-GENERIC-ATMOSPHERE-VISUAL-DOMINATES-PLACE-IDENTITY`

Operation/capability: editorial cover hierarchy / generated-asset role assignment.

Symptom family: the cover's largest visual is generic atmosphere while the destination/story identity is visually subordinate.

Likely cause: asset scale was being used as a substitute for semantic ownership.

Replacement method: test article-owned place/story identity as primary visual mass and demote the generic asset; generate a new role-specific image only when the photography itself remains the bottleneck.

## What must remain Rurubu-specific

Do not transfer the word `横浜`, 112 px scale, exact placement, cream/navy/rust palette, ocean-light image, masthead relationship or Rurubu/book-cover grammar.

## Cross-item applicability hypothesis

Another print/editorial item with a semantically generic hero may independently test whether its own article-owned place/topic/title can reclaim primary hierarchy before adding decorative motifs or weak substitute imagery.

## Next receiving-item experiment

Only test in another item if a legitimate but semantically generic dominant visual is visibly overpowering the artifact's real topic/place identity. Do not use this as a blanket rule to make every title enormous.