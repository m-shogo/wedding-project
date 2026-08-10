# 2026-08-11 — Rurubu V5 BJ/BK clean-room feedback append

Append-only companion to the project-wide wedding design learning feedback log. Scope is Rurubu WEDDING only.

## Visible problems
- BH front still depended on a visibly soft temporary destination hero and retained a hero-plus-index silhouette.
- BI history began like a detached timeline/header before the photography, weakening travel-magazine energy.

## Principles tested
- If the current candidate would not be chosen from scratch, duplicate it and materially change the visual grammar rather than polishing the same geometry.
- Use proven in-file photography as the primary design material when external asset transport is blocked; distinguish that from actual Q60 placement.
- Put timeline annotations on top of travel photography instead of presenting them as a UI stepper.
- Use one dominant story, smaller secondary stories, and angled paper interruptions rather than evenly sized feature modules.

## Verified comparator result
- `BJ / 768:2` is the new outer comparator candidate. Front `768:131` uses verified coast hash `adbb8e529451a81dd25e4eb29bf068655569ce25` full-bleed; the soft temporary hero is hidden but preserved for rollback. Final: native text `37`, visible IMAGE fills `6`, same-parent text intersections `0`, fold `792.7`.
- `BK / 768:181` is the new inside comparator candidate. Right `768:308` starts with a `793.7 × 492` history photograph, staggered timeline annotations on-photo, and an overlapping Memory Spots title/collage. Final: native text `53`, visible IMAGE fills `6`, same-parent text intersections `0`, fold `792.7`.
- Current outer `77:18` and Current inside `77:290` remain untouched.

## Regression / QA lesson
- BJ initially had 02 and 03 number/title intersections; fixed and re-run to zero.
- BK initially had history heading/subtitle and Memory 02 body/Memory 04 number intersections; fixed and re-run to zero.
- Whole-item, reading/page, and actual-size screenshots were reviewed after meaningful changes. Structure-only pass is not treated as visual completion.

## Asset lifecycle truth
Fresh Drive raw readback reconfirmed Q60 cover master derivative: ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155,439` bytes, materialized in runtime. A new Figma single-use upload URL for BJ hero `768:132` was obtained, but the raw POST failed before upload because `mcp.figma.com` could not resolve. No Figma mutation occurred from that failure, and the method was not repeated again in this run.

- generated new image: NO
- adopted new generated image: NO
- Q60 Drive verified: YES
- Q60 Figma placed: NO
- Q60 visually verified in Figma: NO
- BJ/BK placed and visually verified: YES
- Current promoted: NO
- V5 complete: NO
- V6 production started: NO

Detailed evidence: `01_paper-items/rurubu-wedding/learning-runs/2026-08-11-v5-bj-bk-photo-led-cleanroom.md`.

Status: `VERIFIED_FOR_COMPARATOR / BJ_OUTER_BEST / BK_INSIDE_BEST / CURRENT_NOT_PROMOTED`
