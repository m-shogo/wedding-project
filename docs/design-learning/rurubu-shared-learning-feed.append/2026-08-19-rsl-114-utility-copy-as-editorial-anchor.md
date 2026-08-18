# RSL-114 — Utility copy can become an editorial anchor before adding another image

Source scope/item: Rurubu WEDDING / V6 1DAY Plan
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V6 1DAY Plan left page had a strong dominant photo, but its lower `POINT + TRIP DATA` region read as a small utility block floating in unused paper. The page was structurally correct yet still slightly template-like at same-scale whole-spread review.

## Root-cause hypothesis

The weak region did not lack content; it lacked editorial responsibility. Existing reader-facing utility copy could be promoted through native typography and scale hierarchy before introducing another photo, card or generated ornament.

## Bounded test

On rollback-safe EU `1818:2`:

- kept all existing photo roles and hashes unchanged;
- kept the point and trip-data facts native/editable;
- added a large native `01` anchor;
- strengthened the native point headline and trip-data values;
- added a native closing thought to finish the physical page rhythm;
- added no photo, card system, generated asset, raster or Drive asset.

## Expected improvement

Use the lower paper field intentionally, create a second editorial beat after the hero, and increase travel-guide scan density without fake photo diversity or UI-like containment.

## Regression risk

Larger native utility copy can collide with adjacent data or become decorative rather than informative. Any spatial/typographic promotion must be re-audited at actual size and with realistic copy length where variability exists.

## Three-scale evidence

- whole spread 1000px: PASS and stronger than EQ;
- left page actual-size 794×1123: PASS;
- initial candidate: two real text contacts detected and rejected;
- corrected EU: left text collision 0, right text collision 0, 18px safe-area risk 0 on both pages.

## Figma / Drive / GitHub evidence

- Figma EU: `1818:2`; left page `1818:3`;
- rollback EQ: `1803:2` hidden after promotion;
- Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EU-1DAY-LOWER-EDITORIAL-FEATURE-QA-2026-08-19.md`.

## What must remain Rurubu-specific

Do not transfer the exact `01`, Yokohama copy, positions, palette, 1DAY layout, type scale or travel-magazine grammar.

## Cross-item applicability hypothesis

When a print artifact has a structurally correct but visually underused utility/information region, another item may independently test whether existing reader-facing native copy can become a stronger editorial anchor before adding another image or visible container.

This is not a rule to enlarge all metadata. The promoted copy must remain meaningful to the reader and must pass actual-size collision/safe-area review.
