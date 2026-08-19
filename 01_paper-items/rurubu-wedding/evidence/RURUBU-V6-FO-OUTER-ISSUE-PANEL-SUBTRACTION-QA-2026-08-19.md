# Rurubu WEDDING V6 — FO Outer Issue-Panel Subtraction QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
V7: HOLD

## Visible problem

Current Outer FH had a white tilted `YOKOHAMA / ISSUE 2026` card floating over the upper-right of the front-cover hero. The information was useful, but the visible rectangle read as an inserted UI/postcard module rather than native travel-magazine editorial information.

## Root-cause hypothesis

The issue label needed contrast and a relationship to the destination hero, not a separate physical card. Because the waterfront photo has a sufficiently dark upper-right region, the binding/contrast function can be carried by native text directly on the photo.

## Bounded rollback-safe test

Source: Outer FH `1854:2` / front `1854:51`.

Candidate: FO `1891:18` / front `1891:68`.

Changed only the issue-panel role:

- hid `DECOR / FRONT_YOKOHAMA_ISSUE_TEXTURE_PANEL`;
- retained `YOKOHAMA / ISSUE 2026` and `PHOTO / FOOD / MEMORY` as native Figma text;
- moved both text roles directly onto the hero photo;
- changed those text fills to white with a subtle text-only shadow for photo contrast;
- did not change hero image, crop, logo, title, lower collage, back cover, or image hashes.

The first structural QA found a 2px title/meta contact. The metadata was moved down and QA was rerun before adoption.

## Expected improvement

- reduce card/UI reading on the cover;
- let the hero photograph carry more editorial responsibility;
- keep issue metadata editable;
- preserve the same factual/non-final dummy content and replaceable photography.

## Regression risk

Direct-on-photo copy can fail on bright photography. This treatment is valid only while contrast is verified against the current crop and must be rechecked if the hero source changes.

## Three-scale evidence

- whole spread ≈700px: PASS and visually stronger than FH;
- whole spread 1200px: PASS;
- front actual-size `1891:68` = `794×1123`: PASS;
- final visible front native text: `13`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- page-level stray issue nodes: `0`;
- new image hashes: `0`.

## Adoption / rollback

- adopted preferred: FO `1891:18`;
- previous FH `1854:2` renamed rollback and hidden, not deleted;
- Start Here `845:27` updated to `V6 FO + FG/FL + EW MEMORY SPOTS + FN CAFE & TABLE + FM 1DAY PLAN · V7 HOLD`;
- six preferred review-board spreads remain visible;
- stale visible V6 studies `1286:18`, `1624:18`, `1626:99`, `1671:18`, `1747:18`, `1846:18` were hidden, not deleted.

## Drive / asset evidence

Drive authority re-read before the edit:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

No Drive writes or asset lifecycle changes were required:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- external binary placements: `0`;
- new raster/image hashes: `0`.

## Status

`VERIFIED_LOCAL / ADOPTED`.

What must remain Rurubu-specific: the exact cover title, logo treatment, Yokohama hero, issue-copy placement, palette, crop and travel-magazine grammar.

Cross-item applicability: only the method is a candidate — before retaining a visible card around short metadata, test whether the same information can remain readable and bound to an existing legitimate image field without a container.