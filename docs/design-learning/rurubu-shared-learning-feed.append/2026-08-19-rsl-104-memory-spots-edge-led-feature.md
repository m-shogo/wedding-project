# RSL-104 — Legitimate secondary photography can become a page-level feature before adding another asset

Source scope/item: Rurubu WEDDING / V6 Memory Spots
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Memory Spots EJ `1759:2` had correct destination semantics and valid replaceable imagery, but its right guide page still left a large cream band between Spot 03 and Spot 04. Spot 04 remained a medium `493×344` photo module despite using a legitimate `732×498` dining source, so the page retained a mild template/card rhythm.

## Root-cause hypothesis

The page did not need another image or decorative container. One existing evidence-bearing secondary photo had enough intrinsic resolution and semantic value to carry more of the physical page. Promoting it to an edge-led feature, then binding native title/copy directly to the photograph, should increase editorial density while preserving truthful imagery and editability.

## Bounded test

On rollback-safe EM `1767:2`:

- enlarged only Spot 04 to `732×430` within its verified `732×498` source limit;
- preserved its image hash and replaceable IMAGE role;
- moved its existing native title and supporting copy onto the photo with white high-contrast treatment;
- moved the existing magenta Spot 04 label into the photo;
- left Spot 03, the left page, guide metadata, image hashes and all final wording editability unchanged;
- added no new photo, card, generated decoration or raster.

Two pre-adoption failures were caught and corrected:

1. Spot 04 label overlapped the bottom guide rule → label moved upward.
2. photo width was `733px` against `732px` verified source width → corrected to `732px` before promotion.

## Expected improvement

Reduce dead paper, make Spot 04 read as a true second travel-guide feature, and strengthen photo-led magazine rhythm without increasing asset count.

## Regression risk

- overlay copy can lose contrast;
- a promoted photo can exceed intrinsic source size;
- a label moved into photography can collide with other binding rules;
- the technique can become generic full-bleed styling if used without semantic importance.

## Three-scale evidence

- EJ whole spread before: 1200px reviewed.
- EM whole spread after: 1200px PASS and visually stronger.
- EM right page `1767:24`: native `794×1123` PASS.
- native text: `14`.
- text collisions: `0`.
- 18px safe-area risks: `0`.
- Spot 04 display/source: `732×430 / 732×498`, PASS.

## Figma / Drive / GitHub evidence

- Figma preferred EM: `1767:2`;
- right page: `1767:24`;
- Spot 04 photo: `1767:36`;
- hidden rollback EJ: `1759:2`;
- Start Here: `845:27`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EM-MEMORY-SPOTS-EDGE-LED-FEATURE-QA-2026-08-19.md`.

## Adopted status

`VERIFIED_LOCAL / ADOPTED` in Rurubu V6.

## What must remain Rurubu-specific

Do not transfer the Yokohama/dining imagery, page coordinates, exact photo scale, magenta/yellow/navy treatment, copy, or Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

When another print artifact has a visually weak area but already contains a legitimate secondary photo with strong semantic value and enough source resolution, independently test whether that existing photo can assume a larger editorial role before generating or adding another asset. Promotion must pass actual-size readability, source-size, safe-area and binding checks.

## Next receiving-item experiment

On a materially different print artifact, test the method only where a photo is already evidence-bearing or semantically necessary. Reject it if enlarging the photo creates false dominance, weak contrast, source softness, or removes a useful information region.
