# RSL-088 — Existing-anchor overlap + redundant-scaffolding subtraction

Date: 2026-08-18
Source scope: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problems

Two different V6 surfaces showed opposite symptoms of the same deeper issue:

1. Q&A DL: a high-priority native Q04 feature floated beside an already-valid replaceable photo, creating clean but template-like dead separation.
2. Outer AF: chronology order was already legible through native ordinals, spatial order and a WEDDING terminal, yet a thin rail plus ambient year-range text remained as redundant diagram scaffolding.

## Root-cause hypothesis

Editorial structure should be carried by the strongest legitimate existing roles first. When content floats, bind it to an existing anchor before adding a new container. When hierarchy already communicates the relationship, remove scaffolding that merely restates it.

This is not a rule to always overlap text with photos or always delete rails. The anchor/scaffolding must be tested in context.

## Bounded tests

### DN Q&A

- widened an existing replaceable support photo within intrinsic source limits;
- overlapped only the native `04` ordinal at the photo edge;
- retained Q04 question/answer on the cream field;
- rejected the first iteration where z-order hid the ordinal;
- no new card, image, generated decoration or image hash.

### AG back chronology

- removed only the thin chronology binding rail and redundant `201X — 2026` ghost;
- retained native 01–05 order, major/minor hierarchy, dates/copy, photos and WEDDING terminal;
- fixed two inherited 1px text contacts before adoption;
- no new visual module.

## Expected improvement

- stronger photo-led editorial rhythm;
- less UI/diagram residue;
- fewer invented containers;
- preserve native text, replaceable images, and reader sequence.

## Regression risks / stop conditions

- overlap that reduces copy contrast or hides editable text is a rejection;
- subtraction that makes sequence ambiguous or removes information-magazine energy is a rejection;
- if an anchor/scaffold performs real contrast, grouping, or reading-order work, keep it.

## Three-scale evidence

DN:
- 500px whole inside thumbnail PASS;
- 1200px reading PASS;
- Q&A `794×1123` actual-size PASS;
- native text collisions 0;
- 18px text safe risks 0;
- overflow 0.

AG:
- 500px whole outer thumbnail PASS;
- 1200px reading PASS;
- back cover `794×1123` actual-size PASS;
- native text collisions 0 after 6px correction;
- 18px text safe risks 0.

Figma:
- DN `1675:2`, Q&A `1675:42`;
- AG `1676:2`, back `1676:3`;
- Start Here `845:27`: `V5 FU/FX · V6 AG + DN/DM INSIDE STUDIES · V7 HOLD`.

Drive:
- V6 authority root confirmed: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- no new Drive asset was required.

GitHub evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DM-QA-PHOTO-BOUND-CHRONOLOGY-SUBTRACTION-QA-2026-08-18.md`.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

The generalizable candidate is the decision method: **bind floating high-priority content to an existing legitimate visual anchor before adding a container; remove relationship scaffolding only after hierarchy itself proves sufficient.**

## Must remain Rurubu-specific

- exact overlap amount;
- yellow/magenta/cyan/navy palette;
- photo choices and image hashes;
- chronology geometry;
- ordinals and wording;
- coordinates, sizes, masthead and Rurubu editorial art direction.

## Cross-item applicability hypothesis

Potentially applicable to other Wedding print artifacts where repeated information becomes card/UI-like or where copy floats away from a legitimate photo/visual anchor. It must be tested locally; do not copy Rurubu layout or decoration.
