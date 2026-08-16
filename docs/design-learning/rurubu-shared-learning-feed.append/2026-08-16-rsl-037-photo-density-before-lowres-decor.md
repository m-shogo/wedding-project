# RSL-037 — Increase legitimate photo-role density before adopting weak fixed decoration

Source scope/item: Rurubu WEDDING / V6 Profile-Q&A

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 AU was structurally safe, editable, and long-copy verified, but when compared with Outer P and Story/chronology AS at whole-spread scale it still read too sparse and template-clean. The lower Profile region behaved as three restrained thumbnails and Q&A retained passive cream space.

The visible defect was editorial mass and rhythm, not missing facts and not insufficient destination literalism.

## Root-cause hypothesis

When a print spread is already semantically clean but still too quiet, first test whether existing legitimate replaceable photography can carry more of the hierarchy through unequal scale, overlap, and stronger spatial rhythm. Fixed/generated decoration should be added only when it visibly beats that photo/type baseline at actual use size.

Adding decorative raster merely because a magazine feels sparse can introduce low-resolution/kitschy noise without improving the reading path.

## Bounded tests

### AV — photo-density test

Source: AU `1394:2`.

Rollback-safe candidate: AV `1403:2`.

Profile:

- preserve native profile facts and full-width replaceable hero;
- enlarge/recompose the existing three verified snapshots into unequal overlapping roles;
- correct one skyline role back to `238×185` after intrinsic-size audit;
- inspect at actual size;
- hide four nonessential micro-caption/profile-note nodes after the denser photo cluster made them unreadable/noisy.

Q&A:

- preserve all six native questions/answers and both replaceable images;
- use a `410×438` upper-right memory hero;
- move 05/06 and the closing beat upward;
- correct the lower skyline support back to `238×200` after intrinsic-size audit;
- add no card, rounded rectangle, shadow, gradient, or new external asset.

Expected improvement: reduce clean-template emptiness and make the spread participate more strongly in the same photo-led magazine system as P and AS.

Regression risks:

- source raster enlargement beyond verified quality;
- photo clutter that destroys reading order;
- micro-caption collisions/noise after overlap;
- long-answer tolerance regression after Q&A repositioning.

### AW — composed-decoration comparison

Candidate: AW `1403:64`.

Only already-resident Rurubu composed assets were tested:

- scrapbook support hash `127d4fcccdb37fc9122d44585257f5d47bc33b3a`;
- travel-icon accent hash `8dd46c4ba77ac708fc05e864a3cd7e420edd6f1a`.

No non-Rurubu asset or production state was inspected or copied.

Expected improvement: add bounded print texture/visual binding without making decoration editable micro-geometry.

Result: `REJECTED_VISUAL`.

The small icon accent read visibly soft/kitschy and the scrapbook support did not provide enough binding value to outperform AV's simpler photo/type baseline. AW was hidden rather than adopted.

## Three-scale AV evidence

- thumbnail / 500 px whole spread: PASS; stronger photo mass than AU and clear two-page reading remains;
- reading / 1200 px whole spread: PASS;
- actual Profile / `794×1123`: PASS after micro-caption subtraction;
- actual Q&A / `794×1123`: PASS.

Final structural readback:

Profile `1403:3`:

- visible native text `17`;
- replaceable IMAGE `4`;
- text/text collision `0`;
- 18 px safe-area risk `0`;
- only intentional image/text overlap is the hero pullquote.

Q&A `1403:33`:

- visible native text `24`;
- replaceable IMAGE `2`;
- text/text collision `0`;
- 18 px safe-area risk `0`;
- only intentional image/text overlap is the small heading attached to the upper memory hero.

## Fresh dynamic-copy proof

Because AV changed Q&A geometry, AU's older long-answer proof was not reused.

New proof:

- `1405:2 / QA_EVIDENCE / V6_AV_LONG_ANSWER_STRESS_2026_08_16`
- Q&A page `1405:33`
- six realistic longer Japanese answers
- auto-height native answer text.

Readback:

- text/text collision `0`;
- accidental text/image collision `0`;
- 18 px safe-area risk `0`;
- outside-page text `0`.

The proof was hidden after PASS.

## Evidence

- Figma file `bfM0d4c9dCeBv5pCkJ3TNM`
- adopted AV `1403:2`
- hidden AU rollback `1394:2`
- hidden rejected AW `1403:64`
- hidden AV stress proof `1405:2`
- Start Here `845:27` = `V5 FU/FX · V6 P + AV/AS INSIDE STUDIES · V7 HOLD`
- Drive V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- item evidence `01_paper-items/rurubu-wedding/RURUBU-V6-P-AV-AS-QA-2026-08-16.md`
- evidence commit `af0b5704dbedb33f870b8b4525273125d9f6eabd`
- current-state commit `236a2650ecea341b8ed742ae6d39da7dcbb1ab97`

## Result / status

AV: `VERIFIED_LOCAL` and promoted.

AW: `REJECTED_VISUAL` and hidden.

This run does not imply “never use generated/composed decoration.” It verifies a stricter adoption gate:

> first establish a strong legitimate photo/type baseline; adopt fixed decoration only if it materially improves hierarchy, binding, or editorial character at real use size without creating resolution/style regressions.

## What must remain Rurubu-specific

Do not transfer:

- exact photo identities or hashes;
- exact overlap angles/sizes/positions;
- cream/navy/coral/cyan palette;
- Q&A grouping geometry;
- Rurubu-like travel-magazine art direction;
- exact fixed-decoration assets tested in AW.

## Cross-item applicability hypothesis

On another print artifact that feels sparse, independently compare:

1. an existing-photo/native-type hierarchy improvement;
2. the same baseline plus bounded fixed/composed decoration.

Choose decoration only if the second version is visibly stronger at whole, reading and actual-size scales and preserves source quality/editability requirements.

Failure fingerprints to watch:

- `PHOTO_DENSITY_EXCEEDS_INTRINSIC_QUALITY`
- `MICROCAPTION_NOISE_AFTER_PHOTO_OVERLAP`
- `LOWRES_FIXED_DECOR_ADDS_KITSCH_NOT_BINDING`

The receiving item must verify the method independently before treating it as locally valid.
