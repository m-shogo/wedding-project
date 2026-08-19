# RSL-116 — Redundant editorial helper copy can weaken a photo-led beat

Source scope/item: Rurubu WEDDING / V6 Memory Spots
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

Memory Spots EM repeated nearly the same idea twice in SPOT02: a small body sentence and a larger native pullquote both said that looking back at the photo brings the conversation/memory back. At actual size, the duplicate explanation made the lower-left region feel more like a template containing required text slots than a confidently edited travel-magazine page.

## Evidence before change

Figma preferred source: EM `1767:2`, lead page `1767:3`.

Redundant native copy:
- `写真を見返すと、その日の会話まで思い出せる。`
- `写真を見返すと、会話まで戻ってくる。`

## Root-cause hypothesis

When a stronger editorial pullquote already carries the intended emotional meaning, a second synonymous helper/body sentence can become visible interface chrome rather than useful information. Removing it may improve confidence if factual context, accessibility, instructions and physical-use semantics are not lost.

## Bounded test

Rollback-safe EW `1826:18`:
- hid only the weaker SPOT02 body copy;
- moved the existing native pullquote upward;
- moved its existing small rule with it;
- enlarged the already-legitimate replaceable SPOT02 photo from `405×335` to `430×355` using the same source/hash.

No new copy system, image source, card, decoration or generated asset was added.

Neutral cross-scope input was limited to the general method in `non-rurubu-shared-learning-feed.append/2026-08-19-nrsl-open-field-guidance-density.md`. No non-Rurubu item-specific Figma, Drive, asset, palette, layout or production state was inspected or copied.

## Expected improvement

One clearer text beat, stronger photo responsibility, less template/helper-copy feeling, and more confident travel-editorial rhythm.

## Regression risk

Subtraction can remove necessary factual nuance or user guidance. Do not delete supporting copy merely because two texts are thematically related; the removed text must be genuinely redundant for the role.

## Three-scale evidence

- 500px whole spread: PASS; SPOT02 reads more decisively.
- 1200px whole spread: PASS; left/right density remains balanced.
- actual-size lead `1826:19` / 794×1123: PASS.
- text collision: 0 on both pages.
- 18px safe-area risk: 0 on both pages.
- visible image intrinsic violations: 0/4.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted EW: `1826:18`
- lead page: `1826:19`
- hidden rollback EM: `1767:2`
- SPOT02 image: `1826:31`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`, display `430×355`, source `810×552`
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- QA evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EW-MEMORY-SPOT02-COPY-SUBTRACTION-QA-2026-08-19.md`

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`, adopted as preferred EW. EM preserved hidden for rollback. No generated/Drive/binary lifecycle activity was involved.

## What must remain Rurubu-specific

Exact Japanese copy, Memory Spots concept, Yokohama imagery, photo size, page geometry, pullquote styling, cream field and Rurubu-like travel-magazine grammar.

## Cross-item applicability hypothesis

On another materially different print artifact, if a screenshot shows a stronger pullquote/headline and a weaker body/helper sentence communicating essentially the same thing, test one rollback-safe subtraction before adding more decoration. Preserve copy that adds facts, instructions, accessibility, legal/safety meaning, or physical-use guidance.

## Next receiving-item experiment

Use only when the duplicate meaning is visible at actual-size review. Compare retained versus subtracted copy at whole, reading and actual scales; if the page becomes ambiguous or too sparse, reject the subtraction.
