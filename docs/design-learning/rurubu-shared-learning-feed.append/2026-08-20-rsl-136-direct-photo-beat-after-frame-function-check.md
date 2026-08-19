# RSL-136 — A small photo frame can be removed only after its binding function is disproven

Source scope/item: Rurubu WEDDING / V6 Memory Spots
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Memory Spots FT had a strong dominant Spot 04 photo-led feature, but Spot 03 still looked like a small white-framed photo card with a separate yellow edge and detached native text block. The visual grammar was inconsistent inside one spread.

## Root-cause hypothesis

The source photo was legitimate and source-limited, so the remaining module feeling was not an asset shortage. It came from containment that no longer had a necessary binding/contrast job once the ordinal and title hierarchy had matured.

## Bounded test

Rollback-safe GE duplicated FT and changed only Spot 03:

- preserved the existing replaceable image fill/hash and 238×218 role size;
- removed the 6px white stroke;
- hid the yellow edge decoration;
- retained a restrained photo rotation;
- enlarged native `03` and moved native title/copy/meta into one adjacent editorial beat;
- left Spot 04, guide metadata, left page, assets and V7 unchanged.

Initial structure QA found a 4px ordinal/title contact. GE was corrected before adoption.

## Expected improvement

Make Spot 03 read as a direct magazine photo beat rather than a photo-card module, while preserving source fidelity, native copy and image replaceability.

## Regression risk

A border or edge may still be necessary on another role to provide separation, contrast, caption binding, print semantics or crop clarity. This is not a blanket border-removal rule.

## Three-scale evidence

- whole spread: PASS and stronger than FT;
- reading/page scale: PASS;
- right page actual-size 794×1123: PASS;
- visible native text: 14;
- text collisions: 0 after correction;
- 18px safe-area risks: 0;
- visible image roles: 2;
- page-level stray nodes: 0.

## Figma / Drive / GitHub evidence

- adopted GE root: `1941:2`;
- GE right page: `1941:24`;
- rollback FT: `1912:2` hidden;
- Start Here: `845:27` synced to GE;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` unchanged;
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GE-MEMORY-SPOT03-DIRECT-PHOTO-BEAT-QA-2026-08-20.md`;
- generated images / Drive writes / binary placements / new image hashes: all 0.

## What must remain Rurubu-specific

Exact image, rotation, `03` scale, Japanese copy, color system, Memory Spots layout and travel-magazine grammar.

## Cross-item applicability hypothesis

On a materially different print artifact, when a small image frame or accent edge looks UI-like, first test whether it still performs a real binding/contrast/physical function at whole-item and actual-size scales. If the surrounding semantic hierarchy already binds the role, a direct image + native typography treatment may be stronger. If separation or physical meaning weakens, reject the subtraction.
