# V5 cover feature-index background subtraction

Date: 2026-08-09
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

The front-cover feature index beneath the hero used one intentional solid pink `01` marker plus five repeated white badge backgrounds for `02`–`06`. The white badges did not add navigation, contrast, provenance, or grouping beyond the already color-coded native number text. At whole-cover scale they introduced a repeated UI-control/bubble rhythm after earlier V5 card-density reductions.

## Principle tested

Attempt subtraction before adding or refining containers. Keep the one primary solid marker that establishes the index system, but test whether secondary entries can rely on direct color-coded native numbers, typography, alignment, and the existing route cue.

Expected improvement:
- quieter, more editorial feature index
- stronger distinction between primary `01` and secondary `02`–`06`
- reduced Web/UI-card silhouette
- no new decorative elements

Possible regression:
- secondary feature numbers could lose legibility or grouping
- the lower cover could become too sparse
- removing backgrounds could weaken the intended lively Rurubu density

Adoption evidence required:
- rollback-safe duplicate first
- whole-item and front-cover reading/actual-size screenshot comparison
- no text, crop, hero, semantic-node, fold, or rollback regression
- Current mutation limited to reversible visibility changes

## Prototype

Created rollback-safe duplicate:
- `534:2 / V5_OUTER_FEATURE_INDEX_DIRECT_TYPE_QA_2026_08_09`
- cloned front cover: `534:129`

Hidden only in the duplicate:
- `534:198 / FEATURE_NO_2`
- `534:202 / FEATURE_NO_3`
- `534:206 / FEATURE_NO_4`
- `534:210 / FEATURE_NO_5`
- `534:214 / FEATURE_NO_6`

All associated native number text and feature titles remained visible. `01` retained its solid pink background as the primary anchor.

## Three-scale result

### Whole item — PASS

The lower front cover reads less like six equal UI controls. The `01` entry remains the obvious first feature, while `02`–`06` become lighter secondary editorial navigation. The cover still retains sufficient Rurubu-like activity through the hero, cover lines, colored numerals, route line, logo, and date marker.

### Reading / front-cover scale — PASS

At the front cover's natural `794 × 1123` rendering, numbers `02`–`06` remain readable through color and alignment, and each still pairs unambiguously with its feature title. The `02` route line remains intact and no orphaned or floating geometry was introduced.

### Detail / actual-size plausibility — PASS for V5 dummy design

The direct numerals remain legible without the white backgrounds. No copy, font, line break, image crop, or feature title was altered. This is a containment subtraction, not a typography rewrite.

## Current promotion

After the duplicate passed, Current was changed only by setting these existing background nodes to hidden:
- `77:214 / FEATURE_NO_2`
- `77:218 / FEATURE_NO_3`
- `77:222 / FEATURE_NO_4`
- `77:226 / FEATURE_NO_5`
- `77:230 / FEATURE_NO_6`

No nodes were deleted.

Post-promotion live readback:
- all five background nodes: `visible=false`
- cover hero hash unchanged: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- comparison `534:2` preserved
- rollback `59:2` and `59:178` preserved
- fold guide remains visible
- Current visible native text count: `44`

A fresh Current whole-item screenshot matches the accepted duplicate.

## Result

`PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / GLOBAL_RULE_NOT_PROMOTED`

The lesson is contextual: a secondary number background can be removed when color, alignment, and text already provide sufficient navigation. This does **not** establish a universal ban on issue markers or badges. The solid `01` marker remains because it creates deliberate primary/secondary hierarchy.

## Cover hero status

This editorial gain does not change the photo-role gate. `77:148 / IMG_HERO` still uses hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` and remains below the dominant-photo quality target.

The Drive-readback Q60 derivative remains verified:
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- `1330 × 1220`
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

A raw streamed Drive fetch succeeded in this run, but the execution environment still cannot resolve the external Figma upload host. That repeated network fingerprint was not retried. An exploratory much smaller WebP derivative visibly softened/blockified the dominant image and was rejected rather than used to manufacture `11/11` completion.

Official counts therefore remain:
- intended source applied `11/11 active`
- PHOTO_ROLE_PASS `10/11 active`
- ROLE_COMPLETE `10/11 active`
- dominant `2/3`

V6 production remains gated.
