# RSL-231 — A fixed food headline can encode editorial responsibility instead of equal noun weight

Date: 2026-08-23
Scope: Rurubu WEDDING local learning
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Fingerprint

`F-RSL-231-FIXED-FOOD-HEADLINE-TREATS-APPETITE-AND-CONTEXT-AS-EQUAL-DISPLAY-JOBS`

## Visible problem

On V7 Cafe/Table H2, the fixed headline `料理、皿、 / 手元、店の空気。` was readable but assigned almost equal display responsibility to appetite (`料理`) and contextual observations (`皿・手元・店の空気`). At thumbnail scale it behaved like ordinary heading copy rather than contributing to the high-energy food editorial role.

## Fresh research observation

- HAWAIʻI Magazine treats cuisine as a way to experience Hawaiʻi rather than as an isolated plated object, and emphasizes locally knowledgeable editorial/photographic contribution.
- Food-magazine art-direction discussion around Pit / Bobby Doherty shows that food can legitimately become a strong graphic subject when the editorial idea supports it, rather than every image or word receiving equal treatment.

These are observations, not visual templates.

## Root-cause hypothesis

When fixed title copy contains different editorial jobs, equal typographic weight can hide the intended reading order. For this V7 Table role, appetite should lead and place/context should support it.

## Bounded test

H3 `2311:2` preserved H2's layout, photo-role geometry and native copy, and changed only the fixed Table display title:

- editable source `2311:24` retained;
- 4× fixed raster `2311:29` placed;
- image hash `5a21222289076f5240eb74e3a47e355d3e251968`;
- old native title remains hidden at `2311:15`.

The new hierarchy makes `料理` the primary visual beat and `皿、手元、店の空気。` the supporting context beat.

## Three-scale evidence

- 500 px: PASS and stronger first-glance food role than H2.
- 1400 px: PASS; context remains readable rather than becoming microcopy.
- 1587×1123: PASS.
- visible native text intersections: `0`.
- 18 px text edge risks in bounded audit: `0`.

## Verified local principle

For **fixed, identity-bearing** food/editorial display copy, test whether the semantic jobs inside the phrase deserve unequal display responsibility. If a bounded A/B comparison improves first-glance hierarchy without hiding useful context, a dedicated fixed graphic can outperform ordinary equal-weight text.

This does **not** imply:

- rasterize every headline;
- always make the food noun largest;
- reuse H3's coral/yellow marks elsewhere;
- flatten variable/factual copy;
- substitute typography for legitimate role-specific photography.

## Promotion boundary

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE` only. It needs a materially different Rurubu role before stronger promotion.