# 2026-08-16 — Rurubu V6 W / BT / BV composed Story pass

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Visible problem

W/BT/BS was coherent, but BS Story still looked quieter and more Figma-assembled than the cover, Q&A and chronology. Its lower-right cream field had correct copy and rules yet lacked print-native depth at whole-item scale.

## Principle/capability tested

Wedding hybrid authoring + bounded neutral capability test: fixed decoration may become one composed raster role while native text and replaceable photography remain independently editable.

## Bounded test

BU first added only one textless composed travel-map/paper texture raster behind the Story lower-right field. BU was a useful surface test but not a large enough hierarchy improvement.

BV then retained that single raster and changed only Story photo/type hierarchy:

- larger sunset hero;
- larger café support photo;
- existing small skyline support retained near intrinsic size;
- stronger native Japanese two-line anchor crossing the photo/texture transition;
- tighter body and travel-note metadata.

No new generated image, Drive save, external upload, final-copy rasterization, or V7 work occurred.

## Expected improvement

Reduce empty/template feeling and make Story read as a photo-led Japanese travel editorial page without bringing back cards or leaving hundreds of live ornament layers.

## Regression risk

Raster texture can become noise; headline overlap can collide with photo metadata; photo growth can exceed intrinsic source dimensions.

## Evidence and result

- 500px whole-item: PASS, BV stronger than BS;
- 1200px spread: PASS;
- Story 794×1123 actual-size: PASS;
- initial BV collision: Story anchor vs support-photo caption;
- correction: caption moved inside support photo and switched to small white metadata;
- final Story text collision: `0`;
- final Story 18px safe-area risk: `0`;
- Story photo intrinsic violations: `0`;
- Timeline unchanged from BS and still passes existing structure gate.

Adopted:

- W `1491:2` unchanged;
- BT `1488:2` unchanged;
- BV `1498:159` promoted.

Rejected/not promoted:

- BU `1498:2` as texture-only improvement;
- collision-bearing first BV state.

Rollback:

- BS `1486:81` hidden;
- BU `1498:2` hidden.

Start Here:

`V5 FU/FX · V6 W + BT/BV INSIDE STUDIES · V7 HOLD`

## Learning status

`RSL-052 / VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Only the capability may transfer. Rurubu texture, palette, photo geometry and travel-editorial styling remain Rurubu-specific.