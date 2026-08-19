# Rurubu WEDDING V6 — FP / FQ visual QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Baseline

Live preferred before this experiment:

- Outer FO `1891:18`
- Profile/Q&A FG `1851:2`
- Story/chronology FL `1874:2`
- Memory Spots EW `1826:18`
- Cafe/Table FN `1866:2`
- 1DAY Plan FM `1879:71`
- V7 HOLD

Drive authority was re-read before writes: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`. Existing generated section masters remain present and unadopted.

## FP — Profile 03 native closing column

### Visible problem

FG Profile lower-right `03 / NEXT DESTINATION` had no photo by design, but at whole-spread scale it read like a missing third image slot rather than an intentional editorial ending.

### Root-cause hypothesis

The defect was not missing photography. The photo-less role lacked enough native typographic responsibility to read as a deliberate closing feature.

### Bounded test

Rollback-safe duplicate from FG:

- kept all existing replaceable photos and hashes unchanged;
- kept all existing profile facts/native text unchanged;
- changed only the photo-less 03 role into a narrow right-side native closing column;
- final content: large native `03`, `NEXT TRIP / 03`, native headline `次の旅へ。`, short native body, and one thin magenta binding rule;
- added no new photo, generated asset, card, shadow, or raster.

The first FP treatment was rejected because the larger two-line headline and body invaded the photo area and lost clarity. The method was switched within the same rollback candidate to a narrow photo-safe column.

### Evidence

- whole spread screenshot 1000px: PASS and clearer than FG;
- Profile actual size `1895:19` = `794×1123`: PASS;
- visible Profile native text: `26`;
- absolute text collisions: `0`;
- 18px text safe-area risks: initial `1` (title right edge by ~0.3px), corrected to `0` after shifting the closing column 2px left;
- page-level stray 03 nodes: `0`;
- new image hashes: `0`.

### Adoption

- preferred FP `1895:18`;
- FG `1851:2` renamed rollback and hidden;
- Start Here updated to `FO + FP/FL` before FQ promotion.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## FQ — chronology event 05 native typography feature

### Visible problem

FL chronology had a strong dominant hero and one major event photo, but event 05 `入籍` sat over/near a low-impact bounded texture and still read as an under-resolved timeline module. The lower right was visually weaker than the 03 photo beat and the final WEDDING terminal.

### Root-cause hypothesis

Event 05 did not need another photo or stronger texture. It needed clearer typographic responsibility between the event-03 photo and event-06 WEDDING terminal.

### Bounded tests

1. Texture-strengthening variant: rejected. Increasing/repositioning the existing event-05 texture produced almost no meaningful visual improvement and looked like background decoration added for activity.
2. Native typography variant: adopted. The event-05 texture was hidden; `05`, `2026.02.11`, `入籍`, native body copy and one thin yellow rule were composed as a boxless typographic feature directly below the event-03 image.

One initial write attempt failed atomically before any mutation because `Noto Sans JP Bold` was not loaded before changing font size. The corrected call loaded existing fonts first, then mutated. This was an input-order error, not a persistent environment fingerprint.

### Evidence

- whole spread screenshot 1000px: PASS and stronger than FL;
- chronology actual size `1898:151` = `794×1123`: PASS;
- visible chronology native text: `31`;
- absolute text collisions: `0`;
- 18px text safe-area risks: initial `1` because the child event-05 body retained 330px width after parent resize; corrected to `0` by resizing the child to 240px;
- new image hashes: `0`;
- event-05 texture remains in rollback history but is hidden in FQ.

### Adoption

- preferred FQ `1898:125`;
- FL `1874:2` renamed rollback and hidden;
- Start Here updated to `V5 FU/FX · V6 FO + FP/FQ + EW MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Asset lifecycle state

- newly generated assets: `0`
- adopted generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new image hashes: `0`
- native variable text preserved: YES
- replaceable photography preserved: YES
- rollback history preserved: YES
- V7 touched: NO

## Completion boundary

FP/FQ are visually and structurally verified dummy-design improvements only. V6 remains NOT_PRINT_READY pending final legitimate photography, final copy, page count/imposition, exact printer template, PDF preflight, and physical proof.
