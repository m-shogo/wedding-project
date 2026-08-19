# Rurubu WEDDING V6 — GE Memory Spot 03 Direct Photo Beat QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL / V7_HOLD / NOT_PRINT_READY`

## Authority snapshot before write

- GitHub main observed before documentation write: `66320dfc36c8331d474d6bf31fe6c0713e9ea9a0`.
- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`.
- Start Here page: `845:2 / 00_RURUBU_START_HERE`.
- Previous Memory Spots preferred: FT `1912:2`, guide right `1912:24`.
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Visible problem

FT had already established a strong dominant Spot 04 dining feature, but Spot 03 still read as a small white-framed photo card with a separate yellow edge and a text block parked beside it. At whole-spread scale this left one conspicuous UI/card-like treatment inside an otherwise increasingly photo-led editorial spread.

## Root-cause hypothesis

The photo itself was legitimate and source-limited, so enlarging it or replacing it with unrelated imagery would be wrong. The remaining template feeling came from containment: white photo stroke + decorative yellow edge + detached ordinal/title hierarchy. If those functions were not necessary for contrast or binding, Spot 03 could read more like a magazine photo beat by letting the source sit directly on the page and moving editorial responsibility into native typography.

## Bounded rollback-safe test

Created GE from FT as a separate candidate:

- candidate root: `1941:2`;
- guide right: `1941:24`;
- preserved Spot 03 image fill/hash and `238×218` role geometry;
- removed the 6px white photo stroke;
- hid `DECOR / SPOT03_EDGE_YELLOW`;
- kept a restrained photo rotation (`-3.2°`);
- increased native `03` from 58px to 72px;
- moved native title/copy/meta into one adjacent editorial beat;
- made no changes to Spot 04, guide metadata, left page, image hashes, Drive assets or V7.

Initial structure QA found a 4px `03` / title contact. The candidate was not promoted in that state. Title/copy/meta were shifted right and the right page was rechecked.

## Three-scale evidence

### Whole spread / thumbnail

- GE whole spread screenshot at natural spread context: PASS.
- Compared with FT, Spot 03 reads less like a framed module and more like a direct photo + typography feature.
- Spot 04 remains visually dominant; GE does not flatten the major/minor hierarchy.

### Reading/page scale

- GE right page retains clear title → Spot 03 → Spot 04 → CHECK reading order.
- Removing the white stroke/yellow edge did not weaken Spot 03 identification because the large native ordinal and title provide sufficient binding.

### Actual size / detail

- right page `1941:24`: 794×1123 screenshot PASS.
- visible native text: `14`.
- visible image roles: `2`.
- absolute text collisions: `0` after the 4px-contact correction.
- 18px text safe-area risks: `0`.
- page-level stray nodes around the candidate: `0`.

## Adoption

GE was promoted after visual + structure QA:

- preferred: `1941:2 / PREFERRED / V6_INSIDE_GE_MEMORY_SPOT03_DIRECT_PHOTO_BEAT_2026_08_20`;
- right page: `1941:24`;
- previous FT `1912:2` renamed as rollback and hidden;
- GE moved into the review-board Memory Spots slot: x `272000`, y `1300`;
- Start Here `845:27` updated to `V5 FU/FX · V6 GB + GA/FR + GE MEMORY SPOTS + GC CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`.

## Asset lifecycle state

- newly generated images: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- external binary placements: `0`;
- new image hashes: `0`;
- native variable text preserved: YES;
- replaceable Spot 03 photography preserved: YES;
- rollback state preserved: YES.

## Decision

`VERIFIED_LOCAL / ADOPTED`.

The transferable lesson is not “remove photo borders.” It is to prove whether a small photo frame/edge still performs a real binding/contrast function after native hierarchy has matured. In this Rurubu role it no longer did; direct photo + native ordinal/title was stronger. Other roles may still require a frame for separation or physical meaning.
