# Rurubu V5 — EB photo-spine clean-room

Date: 2026-08-12
Scope: Rurubu WEDDING only
Status: `EB_ADOPTED_AS_BEST_OUTER_COMPARATOR / CURRENT_UNCHANGED / V5_OPEN / V6_NOT_STARTED`

## Authority refresh
Before writes, project-wide Drive authority, current GitHub main, the latest V5 comparator authority, live Figma Start Here / Current / Review / Working, and the verified Q60 Drive derivative were re-read. Current remained outer `77:18` / inside `77:290`. Prior best was EA `1024:2` / DZ `1019:2`.

## Scratch-selection test
EA would no longer be selected unchanged from scratch. It had removed most lower UI fields, but the front still changed visual register around the hero-to-lower-photo seam. EB uses photography itself as the page spine: the Yokohama hero reaches `y=740`, feature 01 sits directly on the photographic field, feature 02 overlaps it as one tilted photo-note, and the lower street photograph begins immediately at the same `y=740` boundary with feature 03 placed directly on it.

## Visible problem
- EA still read as hero + editorial bridge + lower photograph instead of one uninterrupted photographic cover.
- Feature 01 retained more panel-like separation than necessary.
- The largest photographic roles did not yet dominate the thumbnail strongly enough.

## Principle / capability tested
Use the dominant photography as the structural spine rather than solving the seam with another broad neutral field. Keep native Japanese display type and feature numerals directly on photographs where contrast passes, allow one bounded tilted note for feature 02, and preserve an underlying fold/grid while making the visible composition asymmetric.

Expected improvement:
- stronger Japanese travel-information-magazine silhouette at thumbnail scale,
- continuous photographic rhythm from hero to lower feature,
- less brochure/card segmentation,
- clearer scale hierarchy between 01, 02, and 03.

Regression risks:
- text-on-photo contrast,
- feature 01/02 crowding,
- dominant hero crop becoming too shallow or too generic,
- fold/safe-area risk,
- Q60 provenance being falsely inferred from the existing live image hash.

## Q60 lifecycle attempt
The verified Drive derivative `RURUBU_V5_01_COVER_HERO__ROLE_240x220_Q78.jpg`, Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, was freshly materialized as exact JPEG bytes (`10,284` bytes). A fresh official Figma `upload_assets` target was issued for safe EA hero node `1024:133`, but the raw multipart POST failed before upload because `mcp.figma.com` DNS resolution was unavailable. No node mutation occurred. The repeated transport blocker was not counted as progress and the method was not retried again in this run.

## EB visual and structure QA
Live EB already existed as rollback-safe Working comparator `1029:2`; it was re-read rather than recreated.

- outer comparator: `1029:2 / V5_OUTER_EB_PHOTO_SPINE_CLEANROOM_2026_08_12`
- back page: `1029:3`
- front page: `1029:131`
- front hero: `1029:133`, `793.7 × 740`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- lower full-bleed street image: `1029:163`, `793.7 × 382.5`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`
- feature-02 photo: `1029:153`, `304 × 218`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- visible native text: `36`
- visible IMAGE fills: `7`
- same-parent text intersections: `0`
- safe-area risks detected by bounded structural audit: `0`

Three-scale visual evidence passed:
- whole item / thumbnail-readable comparison (`900px` render of the full 1587×1123 spread),
- actual-size front `794×1123`,
- actual-size back `794×1123`.

The front actual-size render retained readable masthead/kicker, large native `横浜 / ふたり旅。`, direct-photo feature 01, tilted feature 02, and direct-photo feature 03 without card-grid regression. The back retained the verified photo-led travel-log hierarchy.

## Promotion / rollback
- EB promoted to Review snapshot `1036:2 / BEST OUTER — EB — source 1029:2`.
- Former EA Review `1027:2` preserved hidden as `ROLLBACK HIDDEN — BEST OUTER EA — source 1024:2`.
- DZ `1021:2` remains visible Best Inside.
- Start Here nodes `845:27` / `845:16` updated and read back as `EB outer / DZ inside`.
- Final Review readback shows Current outer/inside snapshots + EB + DZ visible, with EA hidden.
- Current `77:18 / 77:290` remains unchanged.
- Review fold evidence on EB snapshot: `1036:184`, x=`792.7`, width=`2`, height=`1122.5`.

## Result
**EB is selected as the strongest V5 outer clean-room comparator; DZ remains strongest inside.** This is verified visual/layout progress, not Q60 asset completion. Exact Q60 Drive ID → Figma node/image hash provenance is still open, so V5 remains incomplete and V6 production remains gated.