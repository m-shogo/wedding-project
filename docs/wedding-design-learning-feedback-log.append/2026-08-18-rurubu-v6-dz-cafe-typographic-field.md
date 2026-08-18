# 2026-08-18 — Rurubu V6 DZ Cafe Typographic Field

Scope: Rurubu WEDDING only. V7 remained HOLD.

## Observation

DY correctly reduced repeated cafe photography, but its Cafe page became too quiet: the composed texture carried insufficient visual mass and the page still read as an under-filled template at actual size.

## Hypothesis

The missing quality was not another photo. Stronger native Japanese typography inside the existing bounded composed texture could restore editorial energy while preserving truth, photo diversity, and editability.

## Bounded test

Rollback-safe DZ `1719:2` cloned from DY.

- existing travel texture widened to 720×430, opacity 0.20;
- native feature headline changed to `甘いものと、窓ぎわの席。` at 50px;
- native `01` enlarged to 92px;
- support label changed to `CAFE NOTE / 01`;
- body/meta stayed native;
- existing Yokohama view photo remained replaceable and unchanged in hash;
- right Table travel-object photo enlarged to 320×235 and rotated −2.5°, same hash.

## Expected improvement

Make the Cafe page read as an intentionally art-directed travel-magazine feature rather than a photo-deprived fallback, without restoring repetitive photography.

## Regression risk

Poster-like headline scale, over-strong texture, support-photo collision/safe-area issues, or raster enlargement beyond source quality.

## Evidence

- whole spread 1200px: DZ stronger than DY;
- Cafe actual-size `1719:3` 794×1123: PASS;
- left text 14 / IMAGE 2 / absolute collisions 0 / 18px safe risks 0;
- right text 19 / IMAGE 2 / absolute collisions 0 / 18px safe risks 0;
- no new image hash, generated asset, Drive save or binary transport.

## Result

`VERIFIED_LOCAL / ADOPTED`.

DZ promoted to `PREFERRED / V6_INSIDE_DZ_CAFE_TYPOGRAPHIC_FIELD_2026_08_18`.
DY `1717:2` retained hidden as rollback.
Start Here changed to `... + DZ CAFE & TABLE + DX 1DAY PLAN · V7 HOLD`.

## What must remain Rurubu-specific

Exact Japanese copy, 50/92px hierarchy, palette, travel texture, rotation, Cafe/Table geometry and travel-magazine visual grammar.

## Next application

Continue V6 by auditing weak-but-semantically-correct roles for hierarchy first. Do not restore repeated or destination-wrong photography merely because a page feels quiet.
