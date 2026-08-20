# RSL-133 / RSL-153 — HB / HC additional verification

Date: 2026-08-20
Source scope/item: Rurubu WEDDING V6 only
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` (additional evidence only; no promotion)

## Source problem

Two already-mature V6 spreads still retained finish defects that were not solved by adding imagery or decorative containers:

1. Outer GV had intentionally subordinate chronology beats `02 / 04`, but their visual mass fell too low at actual size; it also retained generic issue/utility English that read closer to template tokens than finished reader copy.
2. Cafe/Table GL had a sound photo-led composition, but several small labels (`CAFE GUIDE`, `CAFE NOTE`, `VIEW & WALK`, `TABLE & TALK`, `CHECK!`) still exposed role/schema language rather than Japanese travel-guide editorial language.

## Root-cause hypothesis

A composition can be structurally mature yet still look unfinished when subordinate information becomes effectively invisible at physical scale or when generic role labels survive into reader-facing print. The remaining defect is typographic/editorial, not a need for more cards, photos or generated decoration.

## Bounded tests

### HB Outer

Rollback-safe duplicate of GV changed only native text and minor chronology type mass:

- converted generic front/back support labels to Japanese-first reader copy;
- increased only `02 / 04` ordinal/title mass while keeping them subordinate to 01/03/05/06;
- preserved all photos, crops, facts, palette, image hashes and page geometry.

### HC Cafe/Table

Rollback-safe duplicate of GL changed only small native role-label microcopy:

- converted generic English utility/role labels into Japanese reader-facing editorial wording;
- preserved all photos, image hashes, geometry, hierarchy, palette and replaceable-photo roles.

## Failure fingerprints / repairs

`TYPE_SCALE_WITH_STALE_TEXTBOX_WRAP_OR_CONTACT`

HB initially failed because enlarging 04 inherited a too-narrow text box and wrapped the ordinal vertically. After widening, three text contacts remained around 02/04. The candidate was not promoted until text boxes and positions were repaired and re-audited.

HC did not require geometry repair after the lexical changes, but the test confirms that Japanese replacements must still be checked for width/collision rather than treated as a translation-only operation.

## Expected improvement

- keep true major/minor hierarchy while ensuring every meaningful beat survives actual-size reading;
- reduce AI/template/proofing residue without adding visual clutter;
- make already-correct layouts feel like finished Japanese travel-information magazine pages.

## Regression risk

- enlarging minor type too far can flatten hierarchy and recreate timeline/UI uniformity;
- Japanese replacements can be longer and collide with adjacent content;
- blindly translating deliberate masthead/category English can erase intended genre language.

## Three-scale evidence

### HB

- whole spread 1200×849: PASS;
- back actual-size `2010:3 / 794×1123`: PASS;
- front actual-size `2010:52 / 794×1123`: PASS;
- front/back text collisions: 0;
- front/back 18px text safe-area risks: 0.

### HC

- whole spread 1200×849: PASS;
- Cafe actual-size `2012:3 / 794×1123`: PASS;
- Table actual-size `2012:33 / 794×1123`: PASS;
- Cafe/Table text collisions: 0;
- Cafe/Table 18px text safe-area risks: 0.

## Figma / Drive / GitHub evidence

Figma:

- HB preferred `2010:2`; back `2010:3`; front `2010:52`;
- GV `2006:2` hidden rollback;
- HC preferred `2012:2`; Cafe `2012:3`; Table `2012:33`;
- GL `2000:2` hidden rollback;
- Start Here `845:27`: `V5 FU/FX · V6 HB + GZ/GW + GY MEMORY SPOTS + HC CAFE & TABLE + GR 1DAY PLAN · V7 HOLD`.

Drive:

- V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- new generated assets: 0;
- new Drive saves: 0;
- new binary placements: 0;
- new image hashes: 0.

GitHub:

- canonical status: `01_paper-items/rurubu-wedding/RURUBU-V6-CURRENT-STATUS.md` updated for HB + HC.

## What must remain Rurubu-specific

Exact Japanese wording, point sizes, chronology coordinates, photo choices, Rurubu-like category language, cyan/magenta/yellow/navy accents, page composition and visual treatment.

## Cross-item applicability

Method only:

- test subordinate information at physical-page scale before deciding its hierarchy is successful;
- when a mature print composition still feels templated, inspect reader-facing microcopy before adding visual decoration;
- after type-scale or Japanese-copy changes, revalidate text boxes, collision, safe area and long-string fit.

Do not transfer Rurubu wording, layouts, assets, brand treatments or current-state conclusions to other wedding items.