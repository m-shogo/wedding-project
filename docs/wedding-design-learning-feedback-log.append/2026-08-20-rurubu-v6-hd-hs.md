# Wedding Design Learning / Feedback Log append — Rurubu V6 HD + HS

Date: 2026-08-20
Scope: Rurubu WEDDING only

This append fragment records the meaningful visual experiments from the run without rewriting the long-lived base log during concurrent hourly work.

---

## V6 Outer HB → HD — denser back chronology

### Visible problem

The back cover had a strong full-width travel-object photograph, but the cream chronology below it still looked like a sparse production study. The major/minor ordinal hierarchy existed, yet the lower half did not carry enough editorial responsibility to match the photographic upper half.

### Principle / capability tested

Test whether a few major chronology beats can carry short reader-facing native support copy and minimal functional binding marks before introducing cards or repeated photography.

### Expected improvement

- stronger photo → chronology continuity;
- clearer major/minor scan rhythm;
- more authentic travel-magazine density without adding photos or UI containment.

### Regression risk

- helper copy becoming filler;
- decorative rules losing a binding function;
- large background typography colliding with editable semantic text;
- type enlargement with stale text boxes creating wrap/contact defects.

### Bounded experiment

- source: HB `2010:2`, back `2010:3`;
- candidate/adopted: HD `2014:2`, back `2014:3`;
- `01 / 03 / 05 / 06` kept as major beats;
- `02 / 04` kept subordinate;
- added short native major-beat support lines;
- added three short functional color rules for 01/03/05;
- localized kicker to `6つの景色 / 01—06`;
- no new photo, generated asset, card, shadow, gradient, fact, page, or image hash.

### Failure evidence

1. `TEXT_GEOMETRY_DIRECT_ASSIGN_READONLY`
   - direct assignment to TextNode width failed atomically;
   - readback confirmed no mutation;
   - method changed to `resize()` after font loading.
2. `DECORATIVE_BACKGROUND_TYPE_COLLIDES_WITH_SEMANTIC_COPY`
   - large low-opacity native `旅は、つづく。` looked energetic but caused 11 semantic-text overlaps;
   - rejected/hidden rather than counted as progress.

### Three-scale / structure evidence

- whole `500px`: PASS;
- reading `1200px`: PASS;
- back actual-size `794×1123`: PASS;
- back visible native text: `26`;
- back same-parent collisions: `0`;
- back 18px text safe-area risks: `0`;
- front remains visually unchanged from HB and revalidated;
- new image hashes: `0`.

### Decision

`ADOPTED / VERIFIED_LOCAL`.

### Next application

Use the method only where major beats are semantically important but visually under-responsible. Do not generalize the exact colors, ordinal scale, wording, coordinates, or Rurubu chronology treatment.

---

## V6 1DAY Plan GR → HS — photo-led title field

### Visible problem

GR's left page began with a large cream title/deck field above the destination hero. Compared with the rest of V6, it still read as `paper header → hero module` instead of one confident photo-led travel feature.

### Principle / capability tested

Test whether the existing replaceable waterfront photo has sufficient real text-safe area and source capacity to absorb the native title/deck, removing a false header section without adding imagery.

### Expected improvement

- immediate destination-photo dominance at thumbnail scale;
- one continuous title/photo field;
- stronger Japanese travel-magazine energy;
- reclaimed vertical rhythm for the start/utility information below.

### Regression risk

- title contrast can fail when the replacement photo changes;
- expanded crop can exceed source dimensions;
- safe-area or z-order errors can hide native text;
- the method is invalid when the source has no credible text-safe zone.

### Bounded experiment

- source: GR `2007:2`;
- candidate/adopted: HS `2019:2`;
- left: `2019:3`;
- right: `2019:33` unchanged in content/photography;
- hero `2019:9`: `y 285 / 793.7×395 → y 70 / 793.7×560`;
- image hash unchanged: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- title/deck moved onto photo as native white text with subtle contrast shadow;
- start block and native utility content moved upward;
- no new image, generated decoration, card, gradient, page, or fact.

### Failure evidence

`PHOTO_LED_TITLE_Z_ORDER_OCCLUSION`

- first screenshot showed title/deck behind the enlarged photo;
- first correction attempt used unsupported `bringToFront()` and failed atomically;
- method switched to re-appending the existing text/label nodes to their existing parent, correctly restoring z-order without flattening or rebuilding text.

### Three-scale / structure evidence

- whole / ~500px: PASS and materially more photo-led than GR;
- reading `1200px`: PASS;
- left actual-size `794×1123`: PASS;
- left native text: `23`;
- left collisions: `0`;
- left 18px safe-area risks: `0`;
- right native text: `25`;
- right collisions: `0`;
- right 18px safe-area risks: `0`;
- new image hashes: `0`.

### Decision

`ADOPTED / VERIFIED_LOCAL`.

### Next application

Treat a false header as removable only when the existing photo itself can genuinely carry the title at actual size. Re-test contrast, source-size, crop, safe area, z-order, and replacement-photo variability every time.

---

## Asset / provenance state for this run

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- native text preserved: YES;
- replaceable photography preserved: YES;
- rollback history preserved: YES;
- V7 touched: NO.

Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Learning status

- RSL-154: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-155: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- neither is `VERIFIED_CROSS_ITEM` or `PROMOTED_PROJECT_RULE`.
