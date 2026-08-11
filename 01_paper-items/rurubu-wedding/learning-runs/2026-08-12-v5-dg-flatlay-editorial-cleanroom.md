# RURUBU WEDDING V5 — DG flat-lay editorial clean-room

## Scope
Rurubu WEDDING only. Current outer `77:18` and current inside `77:290` remained untouched.

## Visible problem
DB `881:2` was the strongest outer comparator, but the cover still depended visually on the low-quality Yokohama semantic proxy. The large yellow destination field also kept part of the cover in a designed-panel rather than photo-led magazine grammar.

## Principle / capability tested
Use a verified existing production image as **cover architecture**, not as decoration: dominant travel flat-lay photography, native Japanese headline over the photograph, compact ink/caption anchors, asymmetric supporting crops, and a small factual Yokohama destination image instead of letting the unresolved proxy dominate the page.

## Experiment
Created safe duplicate DG `913:190` from DB. Front `913:319` uses `DG_DOMINANT_TRAVEL_FLATLAY` `913:378`, image hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, at `793.7×640`. The unresolved Yokohama proxy was reduced to destination anchor `913:321` at `232×168`. Back-cover dominant image was changed away from the repeated flat-lay to hash `439a719d73f28e8dd2889f2026cccb15f345ec63`, so front/back no longer repeat the same dominant photograph.

Subtraction removed the inherited front feature-03 label block after whole-item QA exposed a collision. The first DG state also failed because dark text sat directly on photography; this was repaired with white native text and a compact translucent editorial ink field, not rounded cards.

## Expected improvement
- Stronger real-magazine silhouette at thumbnail scale.
- Dominant cover photo no longer uses the rejected low-quality Yokohama proxy.
- Less dashboard/card geometry and less empty color-field dependence.
- Clearer hierarchy: masthead → Japanese destination headline → feature anchor → lower photo/article cluster.

## Regression risks
- Yokohama destination anchor is still the rejected proxy and does **not** close the asset gate.
- Reusing an existing production photo changes cover emphasis from destination-first to travel-object-first; factual Yokohama text is therefore kept native and the destination anchor remains visible.
- Back-cover main image changed, so visual continuity was rechecked at whole-spread scale.

## Evidence
- whole-item / thumbnail: DG `913:190`, 500 px render reviewed.
- reading scale: DG `913:190`, 1200 px render reviewed.
- actual-size front: `913:319`, 794×1123 render reviewed.
- structure: 35 visible native text nodes, 8 visible IMAGE fills, same-parent text intersections `0` after repair.
- fold: `913:377`, x `792.7000122070312`, width `2`, height `1122.5`.
- current readback after writes: outer `77:18`, inside `77:290`, unchanged.

## Adoption
**ADOPTED as strongest outer comparator, not Current.** Review snapshot `915:2`; previous DB review snapshot `886:2` preserved hidden as rollback.

## Asset transport note
Drive Q60 master was freshly read back as `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`, Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. The official Figma upload endpoint again failed before POST because `mcp.figma.com` could not resolve from the runtime. A fallback synchronous `figma.createImage` path was investigated; the first encoded-image attempt failed atomically at `atob`, so no false placement is recorded.

## Next application
Keep DG as the stronger composition benchmark. Continue to solve the exact Q60 role through a reliable binary path or create a clearly superior, provenance-safe replacement. Do not enlarge the low-quality proxy again. V5 remains incomplete until the remaining asset/provenance/placement gate is genuinely verified.
