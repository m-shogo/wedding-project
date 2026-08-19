# 2026-08-19 — Rurubu V6 EW Memory Spots

## Visible problem

Memory Spots EM repeated the same SPOT02 message as both body copy and pullquote, making the lower-left page feel over-specified and template-like at actual size.

## Principle / capability tested

Subtraction before addition: retain the stronger native editorial pullquote, remove only genuinely redundant helper/body copy, and give an already-legitimate replaceable photo slightly more visual responsibility.

Neutral cross-scope input: only the general redundant-guidance QA method from `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-19-nrsl-open-field-guidance-density.md`; no non-Rurubu item-specific production state was consumed.

## Bounded change

EM `1767:2` → rollback-safe EW `1826:18`.

- hid SPOT02 body copy;
- moved existing pullquote/rule upward;
- enlarged existing SPOT02 photo `405×335 → 430×355` using the same source/hash;
- no other page role changed.

## Expected improvement

Cleaner editorial rhythm, less helper-copy/template feeling, stronger photo-led read, no loss of factual or functional information.

## Regression risk

Over-subtraction could make the spot too sparse or remove useful factual nuance. Enlarging the photo could exceed source quality or collide with native text.

## Evidence

- 500px whole: PASS.
- 1200px whole: PASS.
- actual-size lead `1826:19` / 794×1123: PASS.
- text collisions: 0.
- 18px safe-area risks: 0.
- image intrinsic violations: 0/4.
- SPOT02 source: `810×552`; display: `430×355`.
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

EW is preferred. EM is hidden rollback. V7 untouched.

## Next application

Continue same-scale V6 review. Prefer screenshot-visible defects where repeated copy, unnecessary containers, or low-responsibility support roles weaken the travel-magazine read; do not subtract information that has a real factual, accessibility, binding or physical-use function.
