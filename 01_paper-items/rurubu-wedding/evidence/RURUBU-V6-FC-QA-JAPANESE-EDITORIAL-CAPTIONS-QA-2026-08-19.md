# Rurubu WEDDING V6 — FC Q&A Japanese Editorial Captions QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

Preferred ET was structurally healthy, but the Q&A page still contained several small generic English template labels that read more like AI/template scaffolding than reader-facing Japanese travel-magazine editorial copy at actual size.

Observed labels included `MEMORIES FROM OUR JOURNEY`, `DINNER NOTE / FAVORITE SCENE`, `NEXT TRIP / FEATURE`, `OUR NEXT CHAPTER`, and the bottom `TO BE CONTINUED / OUR JOURNEY` kicker.

## Root-cause hypothesis

The page hierarchy and photographs were already strong enough; adding decoration would not solve the remaining template feel. Replacing only generic helper-style microcopy with concise reader-facing native Japanese editorial captions should improve polish without changing layout, image authority, or editability.

## Bounded test

Rollback-safe duplicate from ET `1817:2` → FC `1846:18`.

Changed native text only:

- `MEMORIES FROM OUR JOURNEY` → `ふたりの旅の記憶`
- `DINNER NOTE / FAVORITE SCENE` → `旅の途中の、好きな一皿。`
- `TO BE CONTINUED / OUR JOURNEY` → `これからも、ふたりの旅はつづく。`
- `OUR NEXT CHAPTER` → `ふたりの次の章へ`
- `NEXT TRIP / FEATURE` → `つぎの旅で、やりたいこと。`

The support-photo caption was moved from the image edge to the cream field directly below the photo for clearer actual-size reading. No Q&A answer, photo, crop, image hash, page geometry, Profile content, or replaceable-image role was changed.

## Three-scale evidence

- whole spread / 1000px: PASS; Japanese microcopy reads as part of the publication rather than production/template annotation.
- reading/page scale: PASS.
- actual-size Q&A `1846:63` = `794×1123`: PASS.
- Profile `1846:19`: native text 25 / IMAGE 4 / same-parent text collisions 0 / 18px safe-area risks 0.
- Q&A `1846:63`: native text 30 / IMAGE 2 / same-parent text collisions 0 / 18px safe-area risks 0.

## Adoption

- FC `1846:18` → `PREFERRED / V6_INSIDE_FC_PROFILE_QA_JAPANESE_EDITORIAL_CAPTIONS_2026_08_19`
- ET `1817:2` → hidden rollback `ROLLBACK / V6_INSIDE_ET_PROFILE_QA_BEFORE_FC_JAPANESE_EDITORIAL_CAPTIONS_2026_08_19`
- Start Here `845:27` updated from `ET/EN` to `FC/EN`.

## Asset lifecycle

- newly generated assets: 0
- adopted generated assets: 0
- Drive writes: 0
- external binary placements: 0
- new image hashes: 0
- image geometry changes: 0
- native variable Q&A copy preserved: YES
- replaceable photo roles preserved: YES

Drive root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Status

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → ADOPTED_FC`

V7 remained HOLD and no non-Rurubu production scope was inspected or modified.
