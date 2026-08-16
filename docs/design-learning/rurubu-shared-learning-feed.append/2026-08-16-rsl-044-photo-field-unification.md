# RSL-044 — Extend a legitimate photo field before adding another section container

Source scope/item: Rurubu WEDDING V6 / Outer back cover

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Outer S front was already photo-led, while the back still read at thumbnail scale as a top photo block followed by a separate beige information/timeline section.

## Root-cause hypothesis

The split was caused by the dominant image's bounded role, not by missing content. A verified photo already had enough intrinsic resolution and semantic fit to become a larger page field. Extending it behind a compact contrast overlay could unify the page more effectively than adding decoration, another card, or another generated asset.

## Bounded test

On rollback-safe Outer T `1447:2`:

- expand the existing verified flatlay to `793.7×490` from intrinsic `944×608`;
- move the existing navy title field into a top-left overlay;
- keep native title/subline, existing café and skyline replaceable images, native chronology facts, and final WEDDING field;
- add no new asset/container/gradient/sticker/shadow.

The first render exposed a headline/subline collision; the subline was repositioned and the candidate was rechecked before promotion.

## Expected improvement

One continuous photographic reading field on the back, stronger front/back magazine-system cohesion, and less stacked-section reading without losing editability.

## Regression risk

A larger photo can expose source weakness; a contrast overlay can become UI-like if oversized; text over photography can fail at actual size; lower information may become compressed.

## Three-scale evidence

- whole item 500px: PASS and preferred over S;
- reading spread 900px: PASS;
- actual-size back 794×1123: PASS after subline correction;
- final native text collisions `0`;
- final 18px text safe-area risks `0`;
- dominant source remains within registered intrinsic size.

## Figma / Drive / GitHub evidence

- Figma file `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted Outer T `1447:2`, back `1447:3`
- previous Outer S `1439:2` preserved hidden
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- QA `01_paper-items/rurubu-wedding/RURUBU-V6-T-BG-BE-PHOTO-LED-BACK-QA-2026-08-16.md`
- reconciliation `01_paper-items/rurubu-wedding/RURUBU-V6-T-BG-BE-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## What must remain Rurubu-specific

Do not transfer the navy overlay, flatlay imagery, café/skyline collage, Yokohama/Hawaii editorial direction, chronology placement, colors, or exact dimensions.

## Cross-item applicability hypothesis

When another print artifact looks like stacked sections even though the content belongs to one narrative, independently test whether an existing legitimate image/texture field can be extended to bind those regions before adding another container. Apply only when source fidelity, semantics, text contrast, and physical safe-area gates pass.
