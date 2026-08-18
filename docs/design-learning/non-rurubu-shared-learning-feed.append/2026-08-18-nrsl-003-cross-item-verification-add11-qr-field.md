# NRSL-003 cross-item verification — ADD-11 QR field

State: `VERIFIED_CROSS_ITEM`
Date: 2026-08-18
Source scope: non-Rurubu shared learning
Receiving item: ADD-11 写真共有 / QR案内サイン

## Prior lesson

NRSL-003 originated in ADD-14: a functional reserved QR quiet zone does not automatically need a visible box. When spacing and semantic geometry already define the role, a printed border can add form/widget UI semantics without helping scanning, trim, grouping or editability.

## Receiving-item visible problem

ADD-11 clean-room V2 A5/A4 had a correct unresolved QR role, but the selected visual stacked multiple containment cues: a hard square outer QR border, an inner dashed quiet-zone reserve and circular/orbit decoration. At actual size the hard frame made the role resemble a web/widget control rather than quiet wedding stationery.

A4 also retained decorative English in its category line and the hashtag placeholder used `[#HASHTAG]`, reinforcing template rather than guest-facing semantics.

## Root-cause hypothesis

The required function was **reserved QR geometry + future quiet-zone capacity**, not a printed outer box. The hard frame duplicated grouping already supplied by scale, orbit/spacing and the inner reserve.

## Bounded test

Rollback-safe A5/A4 comparison candidates changed only:

- hide redundant `DECOR_TRAVEL_ROUTE`;
- remove the visible stroke from `QR_PHOTO_SHARE` while preserving its dimensions;
- retain `QR_QUIET_ZONE_RESERVE`;
- keep all steps, QR placeholder meaning, privacy/access/expiry roles and page geometry;
- normalize `[#HASHTAG]` to `[ハッシュタグ]` and A4 category to Japanese-only `写真共有`.

No QR URL, service, privacy fact, hashtag value or expiry value was invented.

## Expected improvement

Reduce interface/widget reading while preserving a clearly discoverable replaceable QR role and the geometry required for final QR insertion.

## Regression risk

Removing containment blindly can make a future QR role visually disappear or violate a true scan/trim/binding need. This result does not authorize deleting actual QR quiet zones or any border that has a verified physical function.

## Three-scale evidence

- A5 whole/thumbnail: PASS; QR remains immediate without hard square frame.
- A5 native `875×1240`: PASS.
- A4 whole/reading: PASS; Japanese-first category and QR hierarchy remain clear.
- A4 native `1240×1754`: PASS.
- hidden realistic long-copy stress A5/A4: PASS.

## Structure evidence

Post-write selected/stress readback:

- A5 `18:19`: outside text `0`, text collision `0`, proof-language `0`, IMAGE `0`, QR role `290×290`, outer QR strokes `0`, quiet-zone `230×230` preserved.
- A4 `19:34`: outside text `0`, text collision `0`, proof-language `0`, IMAGE `0`, QR role `420×420`, outer QR strokes `0`, quiet-zone `332×332` preserved.
- stress `19:4 / 19:56`: outside `0`, collision `0`, proof-language `0`, IMAGE `0`.

## Evidence

- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A5/A4: `18:19 / 19:34`
- hidden stress: `19:4 / 19:56`
- comparison: `27:54 / 27:84`
- pre-change rollback: `28:2 / 28:32 / 28:54 / 28:84`
- Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- item evidence: `01_paper-items/additional-wedding-items/ADD-11-photo-share-qr-sign/CLEANROOM-V2-QR-FIELD-SIMPLIFICATION-2026-08-18.md`
- item evidence commit: `179c390a58f9a6616f3703205df180d59379f823`
- item QA sync commit: `e459e1b6f41233aa7b6307584635837465c271cd`

## What must remain item-specific

Do not transfer ADD-11's mint/cream palette, orbit geometry, exact QR dimensions, camera icon, title, step placement or A5/A4 layout.

## Cross-item conclusion

NRSL-003 is now independently verified in ADD-14 and ADD-11, two materially different print artifacts. The transferable rule is:

> Preserve the functional quiet/reserved geometry, but do not draw an interface-like container unless the border itself performs a proven scan, trim, binding, grouping, ticket or other physical/editorial function.

This is a QA/design principle, not a command to remove every box or circle.

## Next receiving-item experiment

Apply this as a default question—not a visual template—when another wedding print artifact contains a reserved QR/photo/signature/handwriting role with a visible complete container. Test border subtraction rollback-safely and retain the border whenever it has a real physical or semantic binding job.
