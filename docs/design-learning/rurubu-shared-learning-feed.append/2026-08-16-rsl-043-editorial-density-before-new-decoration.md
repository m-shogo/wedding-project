# RSL-043 — Editorial density can come from hierarchy + metadata before new decoration

Date: 2026-08-16
Source scope/item: Rurubu WEDDING / V6 Outer S + Inside BG
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A visually clean print layout can still read as a photo poster or structured template when it has strong hero imagery but too few **editorial beats** connecting title, photography, repeated information and captions.

In the source Rurubu study:

- Outer Q already had a giant destination headline and strong photography, but the cover was quieter than the intended Japanese travel-information-magazine reading.
- BF Q&A had readable 11 px answers, but still read as `six questions + a separate photo block` rather than a deliberately edited interview page.

## Evidence before change

- Outer Q `1426:2` had already passed structural and safe-area QA.
- Profile/Q&A BF `1436:56` had already passed answer readability and a dedicated long-copy proof.
- No missing information, missing image count, or UI container was the root problem.

## Root-cause hypothesis

Before creating another fixed decoration or container, test whether the page simply needs stronger **information hierarchy and semantic attachment**:

1. small native metadata that explicitly attaches to a photo role;
2. a stronger existing title/masthead role within safe-area/intrinsic bounds;
3. materially different emphasis among repeated questions/events;
4. reuse of an already verified higher-quality replaceable image when a supporting image is weak.

This can increase editorial density without card proliferation or fragile native ornament geometry.

## Bounded test

### Outer S

Rollback-safe duplicate of Q:

- retained all existing photo hashes;
- enlarged existing masthead only inside registered intrinsic bounds and 18 px safe area;
- restored one native deck;
- added two native micro-captions attached to existing photo fields;
- added no card, shadow, gradient, new generated raster or new image count.

### Inside BG

Rollback-safe duplicate of BF:

- retained Profile geometry;
- promoted Q04 as a stronger second interview beat;
- changed the dominant photo geometry while preserving its replaceable image role;
- reassigned the lower support role from the small skyline source to an existing verified dining source;
- added one native image caption;
- added no card, shadow, gradient, new generated raster or extra image count.

The first BG placement produced accidental rotated-photo bounding contact with Q1–Q4 and was corrected before adoption.

Because the Q&A geometry changed, a new long-copy proof was created instead of inheriting BF's old PASS.

## Expected improvement

- stronger travel-information-magazine reading at thumbnail scale;
- clearer editorial relationship between photography and copy;
- less `template/list + photo` separation;
- no loss of future text/image editability.

## Regression risk

- micro-metadata can become decorative noise;
- a stronger masthead can compete with the primary headline or violate trim/safe-area;
- rotated photography can create invisible bounding collisions even when the screenshot appears close;
- changing question geometry can invalidate previous long-copy safety evidence.

## Three-scale evidence

Outer S:

- whole spread ~900 px: PASS, stronger than Q;
- reading 1200 px: PASS;
- front actual-size `794×1123`: PASS;
- text/text collision `0`; 18 px text safe-area risk `0`.

Inside BG:

- whole spread ~900 px: PASS, stronger interview beat hierarchy than BF;
- reading 1200 px: PASS;
- Q&A actual-size `794×1123`: PASS;
- final text/text collision `0`; unintended question/image collision `0`; 18 px safe-area risk `0`.

BG long-answer proof `1441:2`:

- six realistic Japanese answers;
- natural HEIGHT values `39 / 39 / 39 / 39 / 26 / 39 px`;
- collision `0`;
- safe-area risk `0`;
- visible 1200 px stress review PASS;
- proof hidden after verification.

## Figma / Drive / GitHub evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

- adopted Outer S `1439:2`
- hidden Outer Q rollback `1426:2`
- adopted Inside BG `1439:58`
- hidden BF rollback `1436:56`
- hidden BG long-answer proof `1441:2`
- unchanged preferred Story/chronology BE `1433:2`

Drive:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- no Drive write this experiment
- no generated section master adopted
- unchanged known transport fingerprint was not retried.

GitHub evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-S-BG-BE-EDITORIAL-DENSITY-QA-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-S-BG-BE-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: S and BG adopted as current V6 dummy-design preferred studies.

The initial BG photo position that overlapped question bounds was rejected/corrected before adoption.

## What must remain Rurubu-specific

Do not transfer:

- the `横浜` headline;
- the existing masthead artwork;
- pink/cyan/yellow palette;
- specific photo choices/hashes;
- exact cover metadata wording;
- Q04 scale or the specific Q&A geometry;
- Japanese travel-magazine / Rurubu-like art direction itself.

## Cross-item applicability hypothesis

On another print artifact that feels visually sparse or templated despite already having sufficient content, independently test **semantic editorial density before adding decoration**:

- attach a small native caption/metadata beat to an existing image or information role;
- make one repeated item meaningfully dominant and others supportive;
- substitute an already-authorized higher-quality role source when the weak point is imagery;
- re-run dynamic-copy stress after any material text-geometry change.

Do not apply this as a universal rule to make all items denser. The receiving artifact must show a real editorial-density defect and must independently verify whole-item, reading and actual-size results.
