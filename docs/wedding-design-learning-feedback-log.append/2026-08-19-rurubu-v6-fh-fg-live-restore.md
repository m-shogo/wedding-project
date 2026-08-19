# Rurubu WEDDING V6 — FH / FG visual feedback

Date: 2026-08-19
Scope: Rurubu WEDDING only

## Observed problems

1. GitHub current status declared FC `1846:18` as the preferred Profile / Q&A spread, but fresh live Figma lookup returned no such node. ET `1817:2` remained available as the verified rollback source.
2. Outer EZ `1836:2` had a strong photo-led upper back cover, while its lower chronology still read as a timeline/interface module because of several short colored rules plus a dark WEDDING terminal field.

## Root-cause hypotheses

- Preferred-state documentation can drift from live Figma even when the earlier candidate was genuinely verified; live node liveness must be checked before later writes.
- The chronology no longer needed strong containment because native numbers, dates and titles already communicated sequence. Retaining the terminal field/rule fragments preserved unnecessary UI rhythm.

## Bounded tests

### FG restore

- duplicate hidden rollback ET `1817:2`;
- reapply only the previously verified FC reader-facing Japanese microcopy;
- restore the support-photo caption onto the cream field below the photo;
- preserve Profile geometry, Q&A answers, photos, crops, image hashes and replaceable-image roles.

### FH chronology

- duplicate preferred EZ `1836:2`;
- hide redundant chronology rule fragments and the filled WEDDING terminal field;
- retain native 01/03/05 major milestones and 02/04 quiet bridges;
- rebuild 06/date/WEDDING as native typography on cream;
- do not alter any photo source/hash or front-cover content.

## Expected improvements

- Restore an actual live preferred Profile/Q&A spread instead of relying on stale Git authority.
- Make the back cover read as photo-led editorial chronology rather than a UI/timeline widget.
- Preserve later copy editing and photo replacement.

## Regression risks and failures found

- FH first render inherited white terminal text onto cream, causing low contrast.
- A cloned `06` text node initially landed at page level rather than inside the back-page frame.
- A first repair script failed atomically because of a wrong name lookup; no partial mutation occurred.
- Structural QA after the first repair found two remaining contacts between `06` and date/WEDDING; those were fixed by increasing the typographic gutter.

None of these intermediate states were counted as progress or adoption.

## Three-scale / structure evidence

### FG

- whole spread: PASS
- Q&A actual-size `1851:47` = `794×1123`: PASS
- Profile `1851:3`: native text 25 / IMAGE 4 / collisions 0 / 18px safe risks 0
- Q&A `1851:47`: native text 30 / IMAGE 2 / collisions 0 / 18px safe risks 0

### FH

- whole spread 700px: PASS
- whole spread 1200px: PASS
- back actual-size `1854:3` = `794×1123`: PASS
- back native text 25 / collisions 0 / 18px safe risks 0
- front native text 13 / collisions 0 / 18px safe risks 0
- page-level stray milestone nodes after repair: 0

## Adoption

Adopted:

- FH `1854:2 / PREFERRED / V6_OUTER_FH_BACK_NATIVE_EDITORIAL_CHRONOLOGY_2026_08_19`
- FG `1851:2 / PREFERRED / V6_INSIDE_FG_PROFILE_QA_RESTORED_JAPANESE_EDITORIAL_CAPTIONS_2026_08_19`

Hidden rollback/comparison:

- EZ `1836:2`
- AH `1683:2`
- ES `1811:2`
- ET `1817:2` remains hidden rollback for Profile/Q&A

Start Here:

`V5 FU/FX · V6 FH + FG/EN + EW MEMORY SPOTS + FB CAFE & TABLE + FA 1DAY PLAN · V7 HOLD`

## Asset / provenance state

- new image generation: 0
- adopted generated assets: 0
- Drive writes: 0
- binary placements: 0
- new image hashes: 0
- photo-source changes: 0
- native variable text preserved: YES
- replaceable photos preserved: YES
- Drive authority reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`

## Learning state

- live preferred liveness repair: locally verified operational correction; not promoted as a new visual rule.
- FH subtraction/context lesson: `RSL-122 / VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What remains Rurubu-specific: milestone sizes, chronology layout, palette, exact Japanese copy, Yokohama photography, and Rurubu-like editorial grammar.

## Next application

Continue the same-scale six-spread review on V6 only. Prefer screenshot-visible editorial defects over cosmetic additions, and revalidate inherited text context whenever a field/container is removed. Keep V7 HOLD until V6 dummy-design QA is genuinely mature.
