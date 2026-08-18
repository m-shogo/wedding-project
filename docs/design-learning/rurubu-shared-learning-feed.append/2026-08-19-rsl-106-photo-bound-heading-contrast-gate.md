# RSL-106 — Photo-bound heading subtraction requires a contrast gate

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: Rurubu WEDDING V6, 2026-08-19

## Visible problem

Outer EE used a full-width navy strip solely to carry `みんなとの思い出`. At whole-item scale the strip split an otherwise continuous photo-led back cover into a web-like section header.

## Root-cause hypothesis

A container that exists only for text contrast may be removable when the underlying image already provides a sufficiently dark/quiet text zone. The same subtraction is unsafe on busy/bright photography.

## Bounded test

- Rejected Q&A direct-text study `1778:2`: removing the navy Q02/Q03 binder made native white text too weak on the busy dining image.
- Rejected Q&A split-support study `1779:2`: two small navy supports restored readability but increased card/module reading.
- Adopted Outer EO `1780:2`: remove the full-width memory strip, place the native heading directly on the existing dark lower area of the dominant photo, move the chronology heading upward to reconnect the reading path.

No new photo, raster, generated asset, crop, image hash, or final copy was introduced.

## Evidence

- whole spread 1400px: EO stronger than EE;
- back actual size `794×1123`: PASS;
- native text collision: 0;
- 18px safe-area risk: 0;
- rollback EE preserved;
- Drive authority re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Expected improvement

Reduce UI-like containment while strengthening photo→heading→chronology continuity.

## Regression risk

Direct text on photography can lose readability or look synthetic when the image zone is busy, bright, or semantically unrelated. A shadow does not rescue a fundamentally bad contrast zone.

## What must remain Rurubu-specific

Exact photo, Japanese wording, navy/yellow palette, coordinates, typography scale, back-cover chronology and travel-magazine grammar.

## Cross-item applicability hypothesis

On another print artifact, independently compare container retained vs text bound directly to a legitimate image/texture field. Adopt subtraction only when whole-item and actual-size evidence proves both readability and stronger binding. Do not transfer the visual treatment itself.
