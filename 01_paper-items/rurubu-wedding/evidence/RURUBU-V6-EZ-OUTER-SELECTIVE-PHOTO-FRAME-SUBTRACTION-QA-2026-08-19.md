# RURUBU V6 EZ — Outer selective photo-frame subtraction QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL / ADOPTED_PREFERRED / NOT_PRINT_READY`

## Source problem

Preferred EV `1821:2` had a strong photo-led front cover, but the two lower support photographs still read partly as two placed photo cards. Both carried 6px white strokes even though their editorial roles were different: the smaller rotated Cafe image needed separation while the larger Dining image already had enough scale/contrast to act as an edge-led field.

## Root-cause hypothesis

The remaining card/module feeling came from applying the same frame treatment to roles with different binding needs. Removing every frame would risk losing separation, but removing the redundant frame only from the dominant support photo could make the cover feel more like an edited magazine collage.

## Bounded test

Rollback-safe duplicate from EV:

- candidate node created from EV and promoted as EZ `1836:2`
- front page `1836:51`
- EV `1821:2` preserved hidden as rollback
- Dining support image source/hash unchanged
- Cafe support image source/hash unchanged
- Cafe retains its 6px white separation frame
- Dining white stroke removed; geometry adjusted slightly to `543.7×327`, rotation `0.6°`
- no new photo, raster, generated asset, Drive save, external binary placement, copy or image hash

## Expected improvement

Reduce the appearance of two equal photo cards and create a clearer dominant/support relationship while keeping the smaller overlapping Cafe photo visibly separated.

## Regression risks checked

- support-photo merge/loss of depth
- native cover copy collision
- bottom folio collision
- safe-area loss
- source over-enlargement
- masthead/hero hierarchy regression

## Evidence

Three-scale visual review:

- 500px whole-spread thumbnail: PASS
- 1200px whole-spread reading scale: PASS
- front cover actual-size `794×1123`: PASS

Structure QA on `1836:51`:

- visible native text: 13
- absolute text collisions: 0
- 18px safe-area risks: 0
- text page overflow: 0
- Dining support remains source-safe versus the previously reconciled `732×498` source
- Cafe support remains source-safe and keeps the functional 6px separation frame
- image hashes unchanged:
  - hero waterfront `539c259be8036b481d06b4f76db9a39b407d90e8`
  - dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - masthead `0bdbf47904ea5865c71b1555dc73689b2c7b2126`

Final live promotion:

- EZ `1836:2` = `PREFERRED / V6_OUTER_EZ_DINING_EDGE_LED_SUPPORT_2026_08_19`
- EV `1821:2` = hidden rollback

## Result

`VERIFIED_LOCAL → ADOPTED_PREFERRED`

EZ is visually stronger than EV at thumbnail, reading and actual-size scales: the large Dining support behaves as magazine photography while the smaller Cafe photo retains a frame only where it still performs a separation function.

## Rurubu-specific boundary

Exact photo roles, rotations, coordinates, cover composition, masthead and color system remain Rurubu-specific. The transferable hypothesis is only that repeated photo-frame treatment should be justified per role rather than applied uniformly.
