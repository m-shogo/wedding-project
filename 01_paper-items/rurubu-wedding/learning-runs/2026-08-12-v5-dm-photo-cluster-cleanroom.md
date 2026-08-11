# Rurubu V5 — DM photo-cluster clean-room

Date: 2026-08-12
Scope: RURUBU WEDDING only

## Visible problem

DK was stronger than the legacy-derived layouts, but at thumbnail and actual-size scale the front still read as one full-page atmospheric photograph plus one large paper fragment and one support photograph. The photo density and irregular editorial rhythm were still weaker than a convincing Japanese travel-information magazine. The small Yokohama destination image also remains a low-quality semantic proxy; enlarging it would make the quality defect worse.

## Principle / capability tested

Increase editorial energy by subtraction and unequal photo scale rather than by adding cards: compress the feature-01 paper fragment, reuse already-verified non-person travel/object photography, create a staggered three-photo cluster with intentional rotation/overlap, keep the large native Japanese headline dominant, and keep the unresolved Yokohama proxy small and factual.

## Expected improvement

At whole-item thumbnail scale, the front should read as a photo-led Japanese travel magazine rather than a poster or web landing page. At page scale, the eye should move headline → feature 02 → Yokohama anchor / travel-object cluster → feature 01 → guest feature 03. At actual size, the collage should remain readable without text-photo collisions.

## Regression risk

- additional photography could become scrapbook clutter;
- the 01 numeral and headline could collide after compressing the paper fragment;
- the new support image could compete with the factual Yokohama anchor;
- the unresolved Yokohama proxy must not be mistaken for the verified Q60 derivative;
- the non-Yokohama full-bleed coast must remain an atmospheric travel-memory image, not be represented as Yokohama.

## Figma experiment

- DM outer: `955:2` — `V5_OUTER_DM_PHOTO_CLUSTER_CLEANROOM_2026_08_12`
- front: `955:131`
- Best Review snapshot: `956:2`
- previous DK: `945:2`, preserved in Studies and hidden Review rollback `946:2`
- inside comparator unchanged: DF `899:2`, Review `904:2`
- Current outer/inside remained untouched: `77:18` / `77:290`

Changes:

- revealed verified support photograph `955:153`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, as a larger tilted travel-object photograph;
- reduced the feature-01 cream paper mass and exposed more photography;
- resized/repositioned guest-trip photograph `955:155`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- kept Yokohama destination anchor `955:134` small, tilted, and factual; its hash is still proxy `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`;
- retained dominant travel-memory image `955:132`, hash `adbb8e529451a81dd25e4eb29bf068655569ce25`;
- preserved all final captions/headlines as native Figma text.

## QA and repair

Three-scale visual review:

- 500px whole-item thumbnail: PASS — stronger travel-magazine silhouette and photo density;
- whole spread / reading scale: PASS — headline and feature hierarchy remain legible;
- actual-size front 794×1123: PASS — staggered photos read intentionally rather than as uniform modules.

First structure QA found one same-parent text-box intersection between the large `01` (`955:178`) and feature-01 headline (`955:179`). The headline x-position was moved from 126 to 138 and structure QA was rerun.

Final structure:

- visible native text: 39;
- visible IMAGE fills: 8;
- same-parent visible text intersections: 0;
- fold guide: `955:190`, x=792.7000122070312, y=0, 2×1122.5;
- rollback and Current frames preserved.

## Asset lifecycle status

No image was generated in this run. The Q60 Yokohama master was fresh-read from Drive and visually inspected:

- master: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- 1330×1220 JPEG, 155439 bytes
- SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Two role-sized derivatives were created from that verified master, visually QA'd, saved to Drive, and read back, but **not adopted or placed in Figma**:

- 560×514 role derivative: Drive ID `1YwRdAauE1-CtXV3VD08CEvn7b-lFYlGX`;
- 240×220 role derivative: Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`.

Official Figma upload still failed before upload because `mcp.figma.com` could not be resolved from the runtime. Two bounded inline-image experiments also failed atomically before any node mutation (invalid encoded input, then unsupported image). The method was switched rather than repeated. Therefore Q60 exact Figma placement = NO and Q60 visual verification in Figma = NO.

## Decision

**ADOPTED as the strongest outer comparator.** DM is selected from scratch over DK because the unequal three-photo cluster, smaller paper mass, and stronger photo-to-type rhythm are more recognizably travel-editorial at thumbnail and actual size. DK is preserved for rollback.

This is not V5 completion. The destination asset lifecycle remains open, so V6 production does not start.

## Next application

Keep DM's photo-led hierarchy. The next high-value move is to close the Yokohama destination asset lifecycle without enlarging the proxy or weakening the composition. If exact transport remains unavailable, continue only with safe visual defects whose improvements survive thumbnail, reading, and actual-size review; do not count derivative preparation or transport attempts as completion.
