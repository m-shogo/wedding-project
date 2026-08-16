# RSL-052 — Fixed decoration can collapse to one raster while photos/text stay semantic

Date: 2026-08-16
Source scope: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The preferred BS Story page was structurally correct but remained quieter and more Figma-assembled than the rest of the V6 magazine system. Adding more live rectangles/rules would risk another template signature, while the existing generated Profile/Timeline hashes were either too low-resolution or not visually useful for this role.

## ROOT_CAUSE_HYPOTHESIS

A fixed non-semantic texture layer does not need live Figma micro-geometry. If it is authored as one composed decoration raster and kept behind native copy plus replaceable photos, it can add print/editorial depth without sacrificing the controls people are likely to edit later.

## TESTED_LOCAL

- duplicated BS rollback-safely;
- created a textless travel-map/paper texture as temporary artwork;
- exported it at 2× and converted it to a single Figma IMAGE hash;
- deleted the temporary source geometry;
- retained one final fixed decoration image role only;
- increased existing Story photo scale only within intrinsic pixel limits;
- strengthened the native Japanese anchor and photo overlap;
- kept all factual/variable copy native;
- kept all three Story photographs replaceable.

Intermediate BU improved texture but not enough hierarchy. BV combined the composed raster with stronger photo/typography scale. Initial BV had one anchor/support-caption collision; the caption was moved into its photo and QA rerun.

## VERIFIED_LOCAL

Preferred BV `1498:159`:

- 500px whole-item PASS;
- 1200px reading PASS;
- Story actual-size 794×1123 PASS;
- Story native text `11`;
- Story replaceable photo roles `3`;
- fixed composed decoration IMAGE roles `1`;
- text/text collisions `0`;
- 18px text safe-area risks `0`;
- photo intrinsic-size violations `0`.

Figma composed-decoration hash:

`691a6ceed471a5d8efa144052a10564eed177b4f` / intrinsic `720×860`.

Drive V6 root was re-read before the test:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BT-BV-COMPOSED-STORY-EDITORIAL-QA-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-W-BT-BV-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## Regression risk

- a composed raster can become decorative noise or reduce text contrast;
- flattening semantic/factual content would violate the hybrid authoring boundary;
- enlarging photo roles without checking intrinsic dimensions can introduce soft print output;
- using the same texture treatment everywhere would make items converge stylistically.

## Failure fingerprint

`COMPOSED_RASTER_WITHOUT_HIERARCHY_GAIN` — raster texture alone changes surface appearance but does not materially improve reading hierarchy. If observed twice without a stronger composition change, stop adding texture and change photo/type hierarchy instead.

## What must remain Rurubu-specific

- the travel-map texture itself;
- magenta/cyan/yellow/navy palette;
- exact photo overlap;
- Story headline wording;
- travel-magazine editorial grammar and composition.

## Cross-item applicability hypothesis

Potentially transferable capability only: where external asset transport is blocked, a receiving item may test **temporary artwork → high-resolution export → one fixed IMAGE role**, while keeping meaningful copy, photos and semantic/editable content separate. The receiving item must independently verify visual benefit and must not reuse this Rurubu artwork.