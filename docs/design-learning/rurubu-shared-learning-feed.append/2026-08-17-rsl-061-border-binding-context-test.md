# RSL-061 — Border subtraction must be tested per overlap context

Source scope/item: Rurubu WEDDING / V6 Story + Profile comparison

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred V6 Story page still used 6px white postcard-style frames around two support photographs. At whole-spread scale those borders added scrapbook/template semantics that were weaker than the adjacent photo-led pages.

A superficially similar white-frame treatment also existed on the Profile snapshot cluster.

## Root-cause hypothesis

The same visual treatment can have different functional value in different overlap contexts. A border that is redundant around an isolated support image may be essential when several photographs overlap and need optical separation.

Therefore `remove photo borders` is not a transferable style rule. The transferable method is to test the border's binding/separation function at whole-item and actual-size scales.

## Bounded test

1. Story CH `1548:2` duplicated CE and removed only the 6px white strokes from the two Story support photos; native text, image sources, replaceable roles, composed texture, chronology and provenance were preserved.
2. Profile CJ `1549:2` duplicated CG and removed only the 6px white strokes from the three overlapping snapshot photos, with minimal overlap tightening.

Expected improvement: less template/scrapbook containment while retaining readable photo hierarchy.

Regression risk: overlapping photos can visually merge when their edge contrast is similar; border subtraction can therefore destroy the separation role that made the cluster readable.

## Three-scale evidence

Story CH:
- 500px whole spread: PASS and stronger than CE;
- 1400×990 reading: PASS;
- actual-size Story `794×1123`: PASS;
- native text `12`;
- IMAGE fills `4`;
- text collision `0`;
- 18px text safe-area risk `0`.

Profile CJ:
- whole-spread comparison: REJECTED;
- borderless snapshots visually merged and weakened overlap order despite preserving structure and sources.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted CH: `1548:2`;
- hidden rollback CE: `1535:78`;
- rejected hidden CJ: `1549:2`;
- unchanged Profile/Q&A preferred: CG `1545:2`;
- unchanged Outer preferred: Y `1542:2`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CG-CH-STORY-FRAME-SUBTRACTION-QA-2026-08-17.md`.

## Adopted / rejected status

- CH Story frame subtraction: `VERIFIED_LOCAL`, adopted.
- CJ Profile frame subtraction: `REJECTED`, hidden.

## What must remain Rurubu-specific

Do not transfer the exact white-stroke width, photo positions, rotations, destination imagery, palette, headline geometry, or Rurubu editorial grammar.

## Cross-item applicability hypothesis

When another print artifact has borders/frames around images, do not globally keep or remove them. Test whether each border performs a real separation, binding, crop, caption, or physical-print function in its own overlap context. Remove it only when whole-item and actual-size QA prove that the image relationship remains clear without it.

This extends the already cross-item-verified binding-function method from rules/rails to photo framing, but the photo-specific treatment is not yet `VERIFIED_CROSS_ITEM`.