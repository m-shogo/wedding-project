# RSL-115 — A natural surface inside a dominant photo can replace a repeated support-photo role

Source scope/item: Rurubu WEDDING / V6 Outer
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred V6 set reused the same Yokohama skyline source across five visible roles. On the Outer back cover, the small skyline postcard was not essential destination evidence; it mainly acted as supporting editorial punctuation beside a dominant travel flatlay.

## Root-cause hypothesis

Reducing photo repetition does not always require finding another photograph. When a dominant legitimate image already contains a natural, high-contrast physical surface, reader-facing native editorial copy can sometimes occupy that surface and replace a redundant support-photo role without lowering print/editorial energy.

## Bounded test

On rollback-safe EV `1821:2`:

- hid only the repeated small skyline support;
- retained the dominant flatlay and chronology;
- placed native `YOKOHAMA / MEMORY ROUTE / 6 SCENES` over an existing maroon notebook surface inside the photo;
- added no new raster, image, card system, generated asset or Drive file.

## Expected improvement

Reduce duplicate-photo feeling while strengthening integration between photography and native editorial metadata rather than creating a new empty gap.

## Regression risk

Text placed on photography can fail contrast, look artificially overlaid, or depend on source content that disappears when the image is replaced. This method is valid only when the role is explicitly tied to a verified crop/text-safe zone, or when the photo role is not expected to be freely replaced without rechecking the overlay.

## Three-scale evidence

- whole spread 1000px: PASS and stronger than ES;
- back actual-size 794×1123: PASS;
- text collision 0;
- 18px safe-area risk 0;
- no new image/hash introduced.

## Figma / Drive / GitHub evidence

- Figma EV `1821:2`, back `1821:3`;
- rollback ES `1815:2` hidden after promotion;
- Drive root reverified this run: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EV-OUTER-TEXT-ONLY-MEMORY-ROUTE-QA-2026-08-19.md`.

## What must remain Rurubu-specific

Do not transfer the exact flatlay, notebook surface, wording, coordinates, colors, chronology or Rurubu-like cover grammar.

## Cross-item applicability hypothesis

When another print artifact has a repeated support photo whose job is mainly editorial punctuation, independently test whether a legitimate dominant image already provides a natural text-safe surface for native reader-facing copy. Adopt only if whole-item and actual-size review show equal or stronger visual cohesion, and revalidate replacement semantics if the underlying photo is intended to change.

This is not permission to write arbitrarily on photos or to reduce photography where the image itself is evidence/content.
