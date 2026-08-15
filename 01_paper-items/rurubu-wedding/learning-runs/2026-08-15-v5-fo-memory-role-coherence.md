# 2026-08-15 — V5 FO memory-role coherence

Scope: Rurubu WEDDING only.

## Visible problem

FN `1199:2` fixed the real-name-to-invented-face implication on the profile page, but the right-page `思い出スポット` cluster still combined a technically valid foreign-looking coast/resort lead with Yokohama/native editorial context. Each raster was structurally valid in isolation, yet the set read like a synthetic destination collage rather than one believable editorial memory story.

## Root-cause hypothesis

Photo QA must include **set-level semantic coherence** in addition to individual source fidelity, crop and provenance. Adjacent images can each pass local QA while contradicting the page's native captions and destination story. Conversely, removing a repeated image merely to deduplicate can weaken binding and photo-led density.

## Bounded test — FO

Created rollback-safe FO `1200:2` from FN and changed only the three lower `思い出スポット` image roles using already-verified Rurubu sources:

- lead `1200:267` → old-town/street source hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- support 02 `1200:268` → exact verified Q60 Yokohama secondary hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- support 03 `1200:269` → verified waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8`.

No new generated asset, external binary, card, shadow, gradient or factual/native-text change was introduced.

Expected improvement: a more coherent city/travel narrative, less synthetic stock-collage feeling, and stronger alignment between image roles and captions.

Regression risk: the waterfront source is also used in the upper history role, so semantic coherence can introduce source repetition; repetition must be judged against visual binding and hierarchy rather than removed mechanically.

## FP rejection

FP `1202:2` tested hiding the repeated waterfront support image and replacing the third memory role with a cream text-led callout while slightly enlarging support 02. The result reduced photo-led closure and weakened the lower-right binding/rhythm at whole-item scale. FP was therefore renamed `REJECTED_HIDDEN_INSIDE_FP_DUPLICATE_REMOVAL_WEAK_BINDING_2026_08_15` and hidden.

Lesson: duplicate-source auditing is useful, but deduplication is not itself a design objective. If subtraction destroys the visual job of a photo role, reject it and seek a better source or composition later.

## Evidence

FO:
- 1000px inside spread: PASS and materially more semantically coherent than FN;
- actual-size right page ≈795×1123: PASS;
- visible native text: 52;
- visible IMAGE fills: 6;
- absolute text intersections: 0;
- 18px text safe-area risks: 0;
- fold `1200:284`: x=792.700012, width=2, height=1122.5.

Promotion:
- FO `1200:2` → `BEST_CLEANROOM_INSIDE_FO_MEMORY_ROLE_COHERENCE_2026_08_15`;
- FN `1199:2` → hidden rollback;
- Start Here `845:27` → `FL outer / FO inside`;
- Current `77:18 / 77:290` untouched.

## Q60 master transport preflight

Fresh Drive readback re-confirmed master `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes, and materialized the exact file into the runtime. A fresh first-class `Figma.upload_assets` target was issued and the mounted JPEG was posted once. The POST failed before mutation with the already-known normalized fingerprint `FIGMA_UPLOAD_DNS_MCP_FIGMA_COM` (`Could not resolve host: mcp.figma.com`).

Per RSL-005, the method was not retried. This does **not** count as Figma placement. Exact secondary Q60 use in FO remains valid; dominant Q60 master exact placement remains OPEN.

## Result

FO adopted. FP rejected/hidden. Outer FL retained. V5 complete: NO. V6 production started: NO.

Reusable lesson: evaluate image clusters as an editorial narrative set, then separately evaluate whether repeated sources are harmful. Semantic coherence and deduplication are distinct objectives.