# RSL-105 — Existing legitimate photos can replace dead chronology paper with an editorial staircase

Source scope/item: Rurubu WEDDING / V6 Story + chronology
Date: 2026-08-19
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred EL chronology was semantically correct and already photo-led at the top, but the lower page still had a large cream dead region around Event 01 while Event 03 / Event 05 photography was compressed toward the bottom. At whole-item scale the page partly read as a designed timeline template rather than a travel-magazine photo story.

## Evidence before change

- live source: EL `1763:2`, chronology page `1763:28`;
- whole 1200px screenshot showed an underused center/right paper field;
- native text, replaceable photos, safe area and intrinsic gates were already valid, so missing assets were not proven to be the root cause.

## Root-cause hypothesis

When a chronology has legitimate existing photographs with unused source-safe scale, the weakness may be insufficient editorial responsibility assigned to those photographs rather than a lack of decoration or imagery.

## Bounded test

Rollback-safe EN `1773:2` kept the hero/title area and all native facts, then:

- made Event 01 a strong left-side native milestone;
- moved Event 03 and Event 05 into an asymmetric center/right photo staircase;
- kept Event 02 / 04 as quiet side-trip notes;
- retained the WEDDING terminal;
- reduced the existing composed texture to a bounded secondary support role;
- added no image, card, generated asset, new raster hash or Drive asset.

## Expected improvement

Reduce dead paper and timeline-UI reading while preserving native editability, replacement-safe photos, semantic order and rollback.

## Regression risk

Photo overlap can silently collide with variable native copy; a photo can also be enlarged beyond its intrinsic source. Promotion therefore requires actual-size screenshot review plus collision/safe-area/intrinsic checks.

## Three-scale evidence

- whole spread 1200px: PASS and stronger than EL;
- reading scale: PASS;
- actual chronology page `794×1123`: PASS;
- final native visible text: `31`;
- text collisions: `0` after correcting the initial five contacts;
- 18px safe-area risks: `0`;
- Event 03 `350×260` within source `352×368`;
- Event 05 `402×254` within source `732×498`.

## Figma / Drive / GitHub evidence

- Figma preferred: EN `1773:2`, chronology page `1773:28`;
- rollback: EL `1763:2` hidden;
- Drive root remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EN-CHRONOLOGY-PHOTO-STAIRCASE-QA-2026-08-19.md`;
- evidence commit begins at `33d866c26402b15fcf3ee83cfd1afbc63026dbb7`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL`: EN adopted as the V6 preferred Story/chronology spread. Initial collision-bearing EN state was rejected and corrected before promotion.

## What must remain Rurubu-specific

Do not transfer exact chronology coordinates, photo sizes, overlap pattern, Yokohama imagery, 01/03/05 emphasis, colors, WEDDING terminal design or Japanese travel-magazine styling.

## Cross-item applicability hypothesis

When another print artifact has semantically correct chronological information but visible dead paper, independently test whether an existing legitimate source-safe image can assume more editorial responsibility before adding a new image, card or decorative system. Preserve actual-size collision and source-resolution gates.

## Next receiving-item experiment

Test only on a materially different print artifact where chronology/story sequencing exists and the defect is screenshot-visible dead paper or weak photo hierarchy. A successful transfer should reproduce the method without reproducing Rurubu geometry or visual language.
