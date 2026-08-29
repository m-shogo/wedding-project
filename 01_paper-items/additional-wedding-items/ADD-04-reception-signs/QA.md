# ADD-04 受付サイン — QA

Status: `CURRENT / V4_OPEN_EDGE_SELECTED / THREE_SCALE_QA_PASS / PAIR_QA_PASS / LONG_COPY_STRESS_PASS / AUTO_LAYOUT_RESILIENCE_PASS / STRUCTURE_QA_PASS / CLEAR_LEGACY_WIN / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-28
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Primary evidence: `V4-OPEN-EDGE-PROMOTION-2026-08-28.md`

## Current Figma authority

Figma file: `qWlF9THLR1G76hLcx1zYOx`.

Current retained production roots:

- groom `33:2 / VNEXT_PRO_ADD04_GROOM_ARRIVAL_FAN_SELECTED` — now contains selected V4 OPEN EDGE, `740×1050`;
- bride `33:15 / VNEXT_PRO_ADD04_BRIDE_ARRIVAL_FAN_SELECTED` — now contains selected V4 OPEN EDGE, `740×1050`.

V4 clean-room / QA authority:

- page `43:2 / V4_CLEANROOM_ADD04_RECEPTION_2026_08_28`;
- groom source `43:3 / V4 / ADD-04 / GROOM / OPEN EDGE / CLEANROOM`;
- bride source `43:16 / V4 / ADD-04 / BRIDE / OPEN EDGE / CLEANROOM`;
- pair review `44:2 / QA / ADD-04 V4 OPEN EDGE / PAIR REVIEW`;
- failed fixed-Y stress history `43:29 / 43:42`;
- passing Auto Layout stress `43:57 / 43:71`;
- pre-V4 production rollback `45:2 / ROLLBACK_ADD04_PRE_V4_PROMOTION_2026_08_28`.

Older ARRIVAL FAN / COUNTER FOLD / BREEZE WELCOME / V2/V3/VNext studies remain preserved as historical comparison/rollback evidence only and are no longer the Current visual source.

Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`.

## Fact / placeholder contract

Confirmed roles/facts only:

- groom reception distinction;
- bride reception distinction;
- date `2026.10.24`;
- location `YOKOHAMA`;
- optional native name role;
- optional native direction/guidance role.

Do not invent receptionist names, surname use, payment/gift handling, QR, gate/flight/seat data or other operational facts. Unknown fields remain native semantic placeholders.

## Current V4 visual direction

`OPEN EDGE` treats the two signs as complementary reception thresholds rather than nearly identical cards or sparse folios.

Groom:

- deep navy upper/left threshold field;
- coral angled crossing field;
- large Japanese-first `受付` and dominant `新郎側`;
- stable warm paper variable-copy zone;
- factual date/location at the lower edge.

Bride:

- plum upper/right threshold field;
- mint angled crossing field;
- large Japanese-first `受付` and dominant `新婦側` on stable cream;
- stable warm paper variable-copy zone;
- factual date/location at the lower edge.

The two signs are visibly related but are not blind mirror/color-swap templates.

## Hybrid authoring / image-generation decision

`FINAL MISSING ASSET LIST: 0 production raster assets missing`.

Fresh diagnosis showed reception-side pickup, pair distinction, typography hierarchy and dynamic-copy resilience—not missing photography/illustration—to be the quality bottleneck.

- native text: all role/side/name/guidance/date/location copy;
- native semantic flow: one `INFO / AUTO / VARIABLE NAME + GUIDE` stack per sign;
- composed fixed decoration: one `DECOR / COMPOSED / OPEN EDGE / ... / NO TEXT` role per sign;
- generated raster candidates: `0`;
- reusable SVG: `0` required;
- replaceable IMAGE fills: `0`;
- Drive write: `0`.

This is an evidence-based zero-generation decision, not a skipped asset workflow.

## Visual repair — bride title contrast

The first bride screenshot showed the large `新婦側` crossing into the dark plum field with weakened contrast. The title was moved onto stable cream without shrinking type. The name/guidance region was moved lower. Low-opacity square marks on both signs were removed because they had no semantic/physical role.

## Dynamic-copy failure and Auto Layout method switch

The first long-name stress reproduced `FIXED_Y_DYNAMIC_COPY_COLLISION`: the optional name expanded to two lines while guidance stayed at a fixed Y coordinate, producing visible overlap even though each text node individually used auto-height.

Failed stress roots are retained at `43:29 / 43:42`.

Method switch:

- group name + guidance in a semantic vertical Auto Layout flow;
- preserve both as separate native text nodes;
- do not shrink type;
- let guidance move down automatically when the name grows.

Passing stress roots: `43:57 / 43:71`.

## Three-scale / pair / structure QA

Groom:

- ~500px whole-item: PASS;
- ~900px reading: PASS;
- native `740×1050`: PASS;
- long-name + long-guidance stress: PASS.

Bride:

- ~500px whole-item: PASS after contrast repair;
- ~900px reading: PASS;
- native `740×1050`: PASS;
- long-name + long-guidance stress: PASS.

Pair board `44:2`: PASS.

Final production/stress readback:

- visible native text `5` per root;
- fixed-height visible text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- one Auto Layout name+guide stack per root.

Post-promotion Current readback:

- groom `33:2`: same structural result plus `DECOR / COMPOSED / OPEN EDGE / GROOM / NO TEXT`;
- bride `33:15`: same structural result plus `DECOR / COMPOSED / OPEN EDGE / BRIDE / NO TEXT`.

## Legacy comparison / promotion

Old Current was revealed only after V4 passed its independent three-scale, pair, stress and structure gates.

The prior ARRIVAL FAN pair remained clean but used materially more inactive cream area, weaker reception-side pickup, and nearly identical groom/bride structure. V4 provides stronger `受付 → 新郎側/新婦側` distance hierarchy, pair distinction and better variable-copy resilience.

Decision: `CLEAR_V4_WIN`.

Before production mutation, old Current was preserved at `45:2`. Current root IDs `33:2 / 33:15` were retained and populated from selected V4 sources. Fresh post-promotion screenshots pass.

## Learning state

`FIXED_Y_DYNAMIC_COPY_COLLISION`: `VERIFIED_LOCAL` for ADD-04.

Transfer only as a QA/capability hypothesis: if one variable auto-height role must always follow another, fixed Y coordinates do not provide dynamic flow. Test a semantic flow container rather than guessing extra reserve. Do not transfer OPEN EDGE geometry, colors, title scale or reception layout to another item.

## Deferred finalization

Keep `NOT_PRINT_READY` until authoritative final inputs/proofs exist:

- whether optional name is used and its final wording;
- final direction/guidance copy;
- tabletop stand/holder overlap and lower-edge occlusion;
- venue lighting/glare and real viewing-distance proof;
- printer bleed/safe-area/template/stock/profile and physical proof.

These deferred items do not block continuing the V4 queue.

## Next target

`ADD-05` V4 clean-room. Start from blank; do not reuse OPEN EDGE as a suite template.