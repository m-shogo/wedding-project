# Rurubu V5 — CZ compact-hero photo-collage clean-room

Date: 2026-08-11
Scope: Rurubu WEDDING only

## Authority reread
Before writes, re-read project-wide authorities, Rurubu V6/V5 status, GitHub main, live Figma Working/Review state, CV/CY screenshots, and Drive cover-hero derivatives. True Current outer `77:18` / inside `77:290` remained untouched.

## Visible problem
CV `848:2` is the strongest existing outer comparator, but its low-quality Yokohama proxy occupies 575 px of the front cover and therefore makes the unresolved raster defect the dominant visual event. The lower feature area is also still more orderly than a real Japanese travel-information magazine cover.

## Principle tested
Clean-room subtraction/rebalance rather than further decorating the bad raster:
- reduce the low-quality hero footprint from 575 px to 430 px;
- keep the strong native `横浜 / ふたり旅。` headline treatment;
- move feature 01 immediately below the hero;
- overlap a tilted feature-02 photo into the editorial band;
- enlarge feature-03 photography to nearly page width and let its native title sit directly on the photo;
- remove empty cream field by scale contrast, not by adding cards, gradients, shadows, or badges.

Expected improvement: stronger photo-led thumbnail silhouette, less dominance by the bad proxy, more varied scale and editorial overlap.
Regression risk: feature text collisions, insufficient breathing room around 01, fold displacement, or crop loss.

## Candidate
Candidate: `V5_OUTER_CZ_CLEANROOM_COMPACT_HERO_PHOTO_COLLAGE_2026_08_11` — `867:2`.
Front: `867:131`.
Hero proxy: `867:133`.
Fold: `867:186`.

The first whole-item screenshot still had too much cream gap between feature 01 and the large lower photo. The lower photo was therefore moved upward and enlarged to a 760×430 editorial crop. Structure QA then found one real text intersection between `CE_FEATURE_1` and `CP_FEATURE_1_DESC`; the descriptor was moved below the title and QA rerun.

## Final evidence
- visible native text: 37
- visible image fills: 7
- same-parent visible text intersections: 0
- fold: x `792.7000122070312`, y `0`, `2×1122.5`
- thumbnail screenshot QA: PASS at 500 px whole-item scale
- whole-item screenshot QA: PASS
- actual-size front screenshot QA: PASS at 794×1123
- native text: preserved
- existing image hashes preserved/reused; no new generated image was adopted
- hero remains proxy hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`, so asset-quality gate remains FAIL

Visible image hashes:
- `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- hero proxy `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- date badge `0cbbf09357938365c2550f08928be1db33fa6060`
- lower photo `439a719d73f28e8dd2889f2026cccb15f345ec63`

## Drive readback
Fresh Drive search reconfirmed the intended Q60 cover derivative `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. Exact Q60 Figma placement was not achieved in this run and is not counted as progress.

## Adoption status
CZ is a verified clean-room outer comparator and is visually stronger than CV in photo-led density, but it is not promoted to authoritative Best Outer in this run because the unresolved hero raster still prevents a truthful asset-quality win. CV remains the recorded Best Outer; CY `859:2` remains Best Inside. CZ stays rollback-safe in Working for direct comparison.

## Gate
- generated images this run: 0
- newly adopted generated images: 0
- Q60 exact Figma placement: NO
- V5 photo role pass: 9/10
- dominant photo pass: 2/3
- V5 complete: NO
- V6 production started: NO

## Next application
When a photo role is known-bad but temporarily unavoidable, reduce its visual monopoly and transfer hierarchy to verified photography rather than compensating with UI-like decoration. The next decisive outer step remains replacing the proxy with exact Q60 bytes or a genuinely stronger verified/generated cover-role asset, then comparing CV/CZ at all three scales again.
