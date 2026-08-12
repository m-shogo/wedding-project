# Rurubu WEDDING — EQ → ER clean-room editorial run

Date: 2026-08-13
Scope: Rurubu WEDDING only

## Starting authority

- latest GitHub `main` immediately before evidence write: `70944d6d6519cc9ef7697f800d9f9b393cdccbb0`
- live Current outer: `77:18`
- live Current inside: `77:290`
- previous Best: EP outer `1108:2` / EO inside `1107:285`
- Q60 master Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- Q60 exact Figma placement remained open

## Scratch decision

EP would not be selected unchanged from scratch. Its photo-led structure was strong, but the cover still read slightly restrained and generic at thumbnail scale. The destination identity also depended too heavily on type while the exact Q60 hero transport remained blocked.

## Experiment 1 — EQ

Visible problem:
- `横浜 / ふたり旅。` still behaved as one conventional display stack rather than an unmistakable travel-magazine cover device.

Principle tested:
- split the native Japanese display headline into materially different roles;
- use one flat, sharp-edged magenta print band instead of another card, badge, gradient, rounded rectangle, or shadow;
- preserve the accepted raster fields and rebuild hierarchy with type scale and editorial color.

Implementation:
- source: EP `1108:2`
- safe duplicate: EQ `1116:2`
- `横浜`: large solid deep-navy native text
- `ふたり旅。`: native white text on `EQ_MAIN_MAGENTA_BAND`
- Feature 01 number enlarged; Feature 02 overlap/photo geometry tightened; Feature 03 kept photo-direct.

Regression caught:
- the first Feature 01 number sat at x=16, below the bounded 18px print-safe rule.
- that state was rejected; the number was moved to x=20 before promotion.

Verified EQ evidence:
- 500px whole-item thumbnail: PASS
- whole-item reading render: PASS
- actual-size front: `794×1123`, PASS
- visible native text: `37`
- visible IMAGE fills: `6`
- absolute text intersections: `0`
- bounded 18px safe-area risks: `0`
- fold: x=`792.7000122070312`, width=`2`

Decision:
- EQ was promoted to Review as an intermediate winner, then retained as hidden rollback after ER outperformed it.

## Experiment 2 — ER

Visible problem:
- EQ improved headline energy, but the cover still lacked a small factual destination cue while its dominant hero remained a non-Q60 proxy.

Principle tested:
- a lower-quality but destination-specific verified existing proxy may be used only as a small editorial anchor when its low quality is visually contained, its provenance is explicit, and it is never counted as the dominant-role repair.
- this is an editorial cue, not an asset lifecycle shortcut.

Implementation:
- source: EQ `1116:2`
- safe duplicate: ER `1118:2`
- reused existing Current Yokohama proxy image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- exact ER node: `1118:190 / ER_YOKOHAMA_PROXY_ANCHOR_NOT_Q60_EXACT`
- display geometry: `166×118`, small upper-right inset with white print-like border
- native caption: `YOKOHAMA SNAP / みなとみらい`
- old micro issue/season anchors hidden in ER to avoid clutter.

Risk control:
- the proxy is explicitly named `NOT_Q60_EXACT`;
- it remains a small secondary anchor;
- it is not counted as Q60 adoption, exact placement, or dominant-photo completion;
- main hero `1118:134` remains existing hash `539c259be8036b481d06b4f76db9a39b407d90e8`, also not Q60 exact evidence.

Verified ER evidence:
- 500px whole-item thumbnail: PASS
- whole-item reading render: PASS
- actual-size front: `794×1123`, PASS
- visible native text: `36`
- visible IMAGE fills: `7`
- absolute text intersections: `0`
- bounded 18px safe-area risks: `0`
- fold: x=`792.7000122070312`, width=`2`
- Review promotion: `1119:2`
- EO Review retained: `1111:188`
- visible Review Best pair: ER outer / EO inside only
- Current `77:18 / 77:290`: untouched

## Asset lifecycle status

Fresh Drive search confirmed `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg` at Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`.

No already-failed binary transport path was repeated in this run. Therefore:
- generated images: `0`
- newly adopted generated assets: `0`
- new external binary assets placed: `0`
- Q60 exact Figma placement: `NO`
- Q60 exact Figma visual verification: `NO`

## Adopted status

- Best Outer: ER `1118:2`
- Best Outer Review: `1119:2`
- Best Inside: EO `1107:285`
- Best Inside Review: `1111:188`
- EQ Review is preserved hidden as rollback.
- EP Review is preserved hidden as rollback.
- Start Here: `ER outer / EO inside`

V5 remains incomplete. V6 production remains blocked until Q60 and the full V5 gate are genuinely closed.

## Next application

Keep the ER hierarchy as the current comparator baseline. Do not enlarge or promote the low-quality Yokohama proxy. Retry Q60 only through a materially different binary-safe bridge. Until then, use visual QA time on defects that can be proven from live screenshots and structure without weakening provenance.