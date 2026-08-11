# 2026-08-11 CM/CN editorial hierarchy lessons

Scope: Rurubu WEDDING only

## Lesson 1 — editorial hierarchy is a stronger anti-UI tool than decorative style

The CC inside comparator still looked partly form-like even after cards had been removed because three questions retained too much equal status.

CM proved a stronger pattern:
- one oversized section number
- one large answer/pull quote
- secondary questions treated as compact side notes
- short color rules used only as editorial anchors
- no new containers

The important change was not color or decoration. It was **unequal information importance made visible**.

Final CM evidence:
- frame `818:2`
- native text `54`
- IMAGE nodes `6`
- same-parent text intersections `0`
- fold `818:283` visible at x `792.7`

Status: **CM strongest inside comparator, not Current.**

## Lesson 2 — a clean-room cover should test the real semantic image role before polishing around a substitute

CK's history-photo panorama was useful geometry evidence, but continuing to polish that substitute risked optimizing the wrong image role.

CN therefore switched to the actual Current cover-role hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` as a deliberate low-quality proxy and expanded it to `793.7 × 575`.

This immediately exposed two truths:
1. the composition becomes more convincing when the cover photograph carries more visual mass;
2. the old derivative is visibly too soft at that mass.

That is useful evidence. The correct response is to finish Q60 placement, not to shrink the photo again or add overlays that hide the defect.

Final CN composition evidence:
- frame `819:2`
- front `819:131`
- hero `819:133`, `793.7 × 575`
- native text `37`
- IMAGE nodes `7`
- same-parent text intersections `0`
- fold `819:184` visible at x `792.7`

Status: **CN strongest outer composition comparator, not Current; raster gate open.**

## Lesson 3 — thumbnail QA is valuable for magazine silhouette

At approximately 500px whole-item scale, CN retains:
- a large photographic top half
- dominant `横浜 / ふたり旅。`
- clearly oversized `01`
- two unequal supporting photos
- a dense but readable lower collage

This is a better test for travel-magazine energy than inspecting only text details. If the page collapses into equal boxes at thumbnail size, it is still too UI-like regardless of polished typography.

## Lesson 4 — screenshot regression detection must be part of iteration, not the final ceremony

CM's first screenshot showed an obvious `01` wrap and over-wrapped quote. Structure QA later found two secondary-title collisions. CN structure QA found another feature-number/title collision.

All were repaired before comparator adoption.

Reusable rule:
> Make the visual change, immediately inspect it, repair the regression, then run structure QA. Do not accumulate several speculative edits and defer visual evidence until the end.

## Lesson 5 — deterministic partial transport is not placement

The exact Q60 authority remains:
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- JPEG `1330 × 1220`
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The new binary-safe namespace `rurubu_q60_20260811` now contains two exact verified segments on hidden transfer node `80:18`:
- `c00` length `12000`, FNV `46fd192d`
- `c01` length `12000`, FNV `f9ed8c47`

This proves the deterministic staging route remains usable, but it does not change the V5 gate:
- exact Q60 Figma image: NO
- Q60 screenshot QA: NO
- V5 PHOTO_ROLE_PASS: `9/10`
- dominant-photo pass: `2/3`
- V6: closed

Reusable rule:
> Segment verification is transport evidence. Only exact reconstruction + node placement + visual/structure QA is asset completion.

## Next application

Continue the exact-byte staging instead of revisiting the blocked external upload route. When Q60 is reconstructed, apply it only to a rollback-safe CN-derived hero, verify crop and text-safe space at all three scales, and only then decide whether CN can replace the existing outer comparator or whether the hero geometry needs another clean-room adjustment.
