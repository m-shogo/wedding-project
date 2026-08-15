# RSL-030 — Redesign the role before enlarging a weak raster

Date: 2026-08-16
Source scope: Rurubu WEDDING V6 Profile / Q&A / chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Evidence:
- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AL-AI-QA-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AL-AI-INTRINSIC-RECONCILIATION-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AL-AI-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## Visible problem

A visually dominant role can look acceptable at whole-spread scale while quietly exceeding its source raster dimensions. In AK, the profile hero used a registered `1356×560` source at `520×735`, and actual-size review showed visible softness. Additional preferred roles also reused a `240×220` source beyond its intrinsic bounds, and the AL Q&A Memories hero initially enlarged a `352×368` source to `705×545`.

## Root-cause hypothesis

When the composition demands a shape that is materially incompatible with the source aspect ratio/resolution, increasing display size is not a hierarchy solution. The role geometry or source assignment must change.

## Bounded tests

### Profile

Instead of generating a replacement or accepting a soft portrait-like crop, the profile role was redesigned around the verified wide source:

- previous AK: `520×735`
- AL: `650×268`
- same semantic replaceable role and source hash
- wide travel-photo hero + compact facts + unequal snapshots + native pull quote

### Q&A Memories

The dominant hero role was preserved, but a different already verified resident source with enough intrinsic area was assigned:

- rejected source/display: `352×368` → `705×545`
- adopted source/display: `732×498` → `705×480`

### Small support roles

Repeated `240×220` source uses were reduced below intrinsic bounds rather than cosmetically sharpened:

- `190×255 → 175×205`
- `260×235 → 235×210`
- `255×165 → 235×160`

## Expected improvement

- actual-size sharpness improves without new binary transport;
- replaceable image roles remain semantic and non-destructive;
- editorial hierarchy comes from composition and source-role fit rather than raster enlargement;
- provenance remains stable.

## Regression risk

Shrinking/reassigning a dominant photo can weaken hierarchy or change the intended atmosphere. Therefore the repair still requires whole-item, reading/page and actual-size screenshot QA.

## Evidence

AL after repair:

- 500 px whole spread: PASS
- 1400 px whole spread: PASS
- actual profile `794×1123`: PASS
- actual Q&A `794×1123`: PASS
- text intersections: `0`
- 18 px text safe-area risks: `0`

AI after support-size repairs:

- fresh 1400 px spread: PASS
- text intersections remain `0`
- safe-area risks remain `0`

The active reconciliation ledger now records current preferred image node IDs, hashes, display dimensions and registered source dimensions.

## Status

`VERIFIED_LOCAL` in Rurubu; `CROSS_ITEM_CANDIDATE` for the general method only.

## What must remain Rurubu-specific

Do not transfer:

- literal photo sources/hashes;
- exact crop sizes or positions;
- Yokohama/travel imagery;
- page compositions;
- the Rurubu palette or editorial treatment.

## Cross-item applicability hypothesis

When a raster role fails actual-size quality, test in this order before regeneration:

1. confirm registered source dimensions and actual displayed dimensions;
2. ask whether the role geometry can be redesigned to match the source aspect ratio;
3. check whether another already verified source better matches the semantic role and required area;
4. only then generate/import a new asset if no verified source can satisfy the role.

A receiving item must reproduce the benefit independently before this advances beyond `CROSS_ITEM_CANDIDATE`.
