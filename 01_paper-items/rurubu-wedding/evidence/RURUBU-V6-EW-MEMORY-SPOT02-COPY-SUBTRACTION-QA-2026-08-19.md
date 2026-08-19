# Rurubu V6 EW — Memory Spot 02 copy-subtraction QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Memory Spots EM `1767:2` was structurally sound, but the left-page SPOT 02 area repeated essentially the same idea twice:

- body: `写真を見返すと、その日の会話まで思い出せる。`
- pullquote: `写真を見返すと、会話まで戻ってくる。`

At actual size this created helper-copy redundancy and made the lower-left region read more like a designed template than an edited travel-magazine beat.

## Hypothesis

If the stronger native pullquote already carries the emotional/editorial message, removing the weaker duplicate body copy and giving the existing replaceable photo slightly more responsibility should increase confidence and editorial density without adding decoration, cards, or imagery.

Neutral cross-scope input was limited to the general QA method in `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-19-nrsl-open-field-guidance-density.md`; no non-Rurubu item-specific Figma, Drive, layout, asset, palette, or production state was inspected or copied.

## Bounded rollback-safe test

Source: preferred EM `1767:2`.
Candidate: EW `1826:18`.
Lead page: `1826:19`.

Changed only SPOT 02:

1. hid native `TEXT / SPOT02_COPY`;
2. moved existing native `TEXT / SPOT02_PULLQUOTE` upward to `y=842`;
3. moved its existing small rule to `y=904`;
4. enlarged the existing replaceable SPOT02 photo from `405×335` to `430×355` and moved it to `x=340 / y=600`.

No image hash, source, title, deck, SPOT01, right-page content, generated asset, or new decoration was added.

## Image-source QA

SPOT02 photo:
- Figma node: `1826:31`
- image hash: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- display: `430×355`
- source: `810×552`
- intrinsic oversize: NO

All four visible Memory Spots image roles remain intrinsic-safe:
- lead `840×560 / 1356×560`
- spot02 `430×355 / 810×552`
- spot03 `238×218 / 240×220`
- spot04 `732×430 / 732×498`

## Three-scale / structure evidence

- whole spread / 500px: PASS; SPOT02 reads as one decisive text beat instead of duplicate explanatory copy.
- whole spread / 1200px: PASS; the left page is cleaner and remains balanced against the denser guide page.
- actual-size lead page / `794×1123`: PASS.
- lead native text count: 12.
- guide native text count: 14.
- absolute text collisions: 0 / 0.
- 18px text safe-area risks: 0 / 0.
- image intrinsic violations: 0 / 4.

## Decision

`VERIFIED_LOCAL` and adopted.

EW promoted as:
`PREFERRED / V6_INSIDE_EW_MEMORY_SPOTS_COPY_SUBTRACTION_PHOTO_BEAT_2026_08_19`

EM preserved as hidden rollback:
`ROLLBACK / V6_INSIDE_EM_MEMORY_SPOTS_EDGE_LED_04_FEATURE_2026_08_19`

Start Here updated to use `EW MEMORY SPOTS`.

## Asset lifecycle truth

- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image-source substitution: 0
- native variable text preserved: YES
- replaceable photo role preserved: YES
- rollback preserved: YES
- V7 touched: NO

## What remains Rurubu-specific

Exact copy, photo choice, photo scale, cream field, magenta/cyan/yellow editorial language, Japanese travel-guide grammar, coordinates, and SPOT numbering remain Rurubu-specific.

## Cross-item applicability

Candidate principle only: when an editorial print page repeats the same message as helper/body copy and a stronger pullquote, independently test whether subtracting the redundant copy and strengthening an already-legitimate visual role improves confidence. Do not globally delete supporting copy; preserve it when it adds factual, accessibility, instructional, or physical-use value.
