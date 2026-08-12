# Rurubu V5 — EA full-bleed lower editorial clean-room

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `EA_ADOPTED_AS_BEST_OUTER_COMPARATOR / CURRENT_UNCHANGED / V5_OPEN / V6_NOT_STARTED`

## Authority refresh
Before writes, GitHub main, latest V5 comparator reconciliation, V6 gate status, fresh Drive Q60 master/derivative readback, and live Figma Working/Review/Start Here were re-read. Current remained outer `77:18` / inside `77:290`; prior best comparators were DV `996:2` / DZ `1019:2`.

## Scratch-selection test
DV was no longer selected unchanged from scratch. Its upper half was strong, but the lower half still separated into a light information field plus a framed photo, leaving a brochure/poster rhythm rather than a photo-led travel-magazine finish.

## Visible problem
- too much clean cream field below the hero,
- feature 03 lived beside the photo instead of inside the photographic story,
- lower-half hierarchy felt modular rather than editorial,
- visual density fell off sharply after the hero.

## Principle / capability tested
Subtraction first, then rebuild from photography and native type. Remove the lower navy/warm blocks and extra paper fields, expand the verified street photo to full bleed, keep one cream feature-01 paper, make feature 02 a tilted photo with a compact caption band, and place feature 03 directly on photography with a thin yellow rule.

Expected improvement:
- stronger thumbnail continuity from hero to lower page,
- more varied image scale and overlap,
- less card/dashboard geometry,
- more Japanese travel-information-magazine density.

Regression risks:
- dark-photo text contrast,
- caption bands sitting behind the photo due to z-order,
- number/title collisions,
- feature 01 micro-copy falling into the image seam.

## Experiment and repair
- Created rollback-safe EA `1024:2` from DV; Current was never touched.
- Attempted exact Q60 placement first using the official `upload_assets` target and the verified Drive master materialized locally. Raw POST still failed before upload because `mcp.figma.com` DNS could not resolve.
- Switched method instead of repeating the DNS route. The verified 240×220 Drive derivative was materialized locally and exact bytes were encoded in-call; `figma.createImage` rejected JPEG with `Image type is unsupported`. The failed Figma script was atomic, so no image mutation occurred.
- Continued with a safe visual target rather than transport churn.
- Subtracted lower UI-like fields and expanded the verified street photo to full width/full bottom.
- Rebuilt feature 01 as the dominant cream editorial paper and feature 02 as an overlapping tilted photo/caption unit.
- First screenshot showed feature 03 black text disappearing into the dark photo. Repaired with a flat ink field, then subtracted that field again after it still read too card-like; final treatment uses direct white native text plus a 6px yellow vertical rule.
- Layer-order QA found feature 02/03 support fields behind the full-bleed image. Reordered only those nodes and their text above the photo.
- Actual-size QA found the feature-01 micro-description sitting in the image seam; removed that nonessential descriptor rather than adding another container.
- Structure QA caught two number/title text-box intersections. Moved the 02/03 titles right until the final same-parent intersection count reached zero.

## Three-scale evidence
EA was compared against DV at:
- thumbnail / whole item: `500px`,
- reading / whole spread: `1000px`,
- actual-size front page: `794×1123`.

EA is selected over DV. It preserves DV's strong Yokohama hero and back cover, while the front lower half now reads as one continuous photo-led editorial composition instead of a light information zone followed by a separate image.

## Final structure evidence
- best outer Working comparator: EA `1024:2`
- front page: `1024:131`
- visible native text: `36`
- visible IMAGE fills: `7`
- same-parent text intersections: `0`
- fold guide: `1024:184`, x=`792.7`, width=`2`, height=`1122.5`
- hero node: `1024:133`
- hero hash remains `539c259be8036b481d06b4f76db9a39b407d90e8`; this is still not exact Q60 Drive provenance.

## Promotion / rollback
- Review snapshot: `1027:2 / BEST OUTER — EA — source 1024:2`
- previous DV Review `997:2` preserved hidden as rollback
- Start Here updated to `EA outer / DZ inside`
- Current `77:18 / 77:290` unchanged

## Q60 boundary
Drive master remains `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. Drive derivative remains `RURUBU_V5_01_COVER_HERO__ROLE_240x220_Q78.jpg`, ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, 10,284 bytes. Neither was successfully placed in Figma this run. Transport attempts are not counted as visual completion.

## Result
**EA is promoted as strongest V5 outer comparator; DZ remains strongest inside.** V5 remains incomplete because exact Q60 Drive ID → Figma node/image-hash → screenshot/structure/ledger lifecycle is still open. V6 production remains gated and was not started.
