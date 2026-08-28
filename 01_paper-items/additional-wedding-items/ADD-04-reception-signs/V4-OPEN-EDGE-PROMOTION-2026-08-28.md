# ADD-04 — V4 OPEN EDGE clean-room promotion

Date: 2026-08-28
Start/main authority: `8f045aab4475ee7a835752ad55d32f2d71a1c91a`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` (`VISUAL_REOPENED`)
Figma file: `qWlF9THLR1G76hLcx1zYOx`
Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`
Scope firewall: non-Rurubu only. No Rurubu item-specific Figma/Drive/GitHub target was inspected, reused or modified.

## Clean-room facts / constraints

Only semantic/factual constraints were carried into V4:

- two independent `740×1050` reception signs;
- groom reception distinction;
- bride reception distinction;
- confirmed date `2026.10.24`;
- confirmed location `YOKOHAMA`;
- optional native name role;
- optional native direction/guidance role.

No receptionist name, surname rule, gift/payment handling, QR, flight/gate/seat or other operational fact was invented.

The prior production/V2/V3/VNext layouts, rails, fan geometry, colors, crop, decoration and generated assets were not used as the V4 visual construction source. Old Current was visually revealed only after V4 independently passed its own QA.

## New V4 clean-room pair

New page:

- `43:2 / V4_CLEANROOM_ADD04_RECEPTION_2026_08_28`.

Production candidates:

- groom `43:3 / V4 / ADD-04 / GROOM / OPEN EDGE / CLEANROOM`;
- bride `43:16 / V4 / ADD-04 / BRIDE / OPEN EDGE / CLEANROOM`.

Pair review:

- `44:2 / QA / ADD-04 V4 OPEN EDGE / PAIR REVIEW`.

The pair uses related but non-identical threshold/open-edge compositions. The signs are not a blind color-swap template:

- groom: deep navy upper/left arrival field plus coral angled threshold and gold register;
- bride: plum upper/right arrival field plus mint angled threshold and rose register;
- both: Japanese-first `受付`, very large `新郎側 / 新婦側`, stable warm paper variable-copy area, factual date/location at the lower reading edge.

The side distinction is the dominant whole-item signal; no generic English, transport credential, badge/card grid or unrelated travel icon is used.

## Hybrid authoring split

- native text: role, side, optional name, optional guidance, date/location;
- variable name + guidance: semantic native Auto Layout stack;
- composed fixed art: one `DECOR / COMPOSED / OPEN EDGE / ... / NO TEXT` role per sign;
- reusable SVG: `0` required;
- generated raster: `0`;
- replaceable IMAGE fills: `0`;
- page flattening: none.

## FINAL MISSING ASSET LIST

`0 production raster assets missing`.

The Drive authority was live-checked and contains no required production asset for this role. Fresh V4 diagnosis showed the quality problem is reception-side pickup, pair distinction, typography hierarchy and variable-copy resilience—not missing photography/illustration.

Therefore:

- generated raster candidates: `0`;
- new Drive asset IDs: none;
- Drive write: `0`.

This is an evidence-based zero-generation decision under the image-generation-centered policy. Flat threshold fields are deliberately composed graphics because adding raster atmosphere would weaken reception legibility rather than solve a missing-asset defect.

## Visual failure 1 — bride title contrast

Fresh bride screenshot showed the initial `新婦側` title crossing into the dark plum field and losing contrast.

Repair:

- did not shrink the title;
- moved the large side label onto the stable cream paper zone;
- moved name/guidance lower accordingly;
- removed low-opacity square marks from both signs because they had no semantic or physical function.

Post-repair bride screenshot passes at reading and native scale.

## Long-copy failure 2 — fixed-Y dynamic-copy collision

The first long-name stress exposed a structural defect:

- optional name expanded to two lines;
- guidance remained at a fixed Y position;
- the two native auto-height text nodes visibly collided.

The failed first stress roots are retained as history:

- `43:29 / QA FAILED / ADD-04 FIXED-Y NAME GUIDE COLLISION`;
- `43:42 / QA FAILED / ADD-04 FIXED-Y NAME GUIDE COLLISION`.

Normalized failure fingerprint: `FIXED_Y_DYNAMIC_COPY_COLLISION`.

Method switch:

- created `INFO / AUTO / VARIABLE NAME + GUIDE` vertical Auto Layout stacks in both V4 production candidates;
- kept name and guidance as separate native editable text nodes;
- preserved their type size;
- let multi-line name growth push guidance downward naturally.

Passing second stress roots:

- groom `43:57 / QA V2 / V4 / ADD-04 / GROOM / OPEN EDGE / CLEANROOM / LONG COPY STRESS`;
- bride `43:71 / QA V2 / V4 / ADD-04 / BRIDE / OPEN EDGE / CLEANROOM / LONG COPY STRESS`.

Both were hidden after verification.

## Three-scale / pair / stress QA

Groom:

- whole/thumbnail ~500px: PASS;
- reading ~900px: PASS;
- native `740×1050`: PASS;
- long-name + multi-line guidance stress: PASS after Auto Layout method switch.

Bride:

- whole/thumbnail ~500px: PASS after title-contrast repair;
- reading ~900px: PASS;
- native `740×1050`: PASS;
- long-name + multi-line guidance stress: PASS after Auto Layout method switch.

Pair review `44:2`: PASS. The pair is visibly related but groom/bride are not reduced to one mirrored/color-swapped template.

## Structure QA before legacy reveal

All four final production/stress roots report:

- size `740×1050`;
- visible native text `5`;
- fixed-height visible text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- one `INFO / AUTO / VARIABLE NAME + GUIDE` stack;
- no variable copy baked into fixed decoration.

## Legacy comparison — only after V4 maturity

Only after the V4 pair passed thumbnail, reading, native-size, stress, pair and structure QA was the old Current revealed:

- groom old Current `33:2`;
- bride old Current `33:15`.

The prior ARRIVAL FAN pair remained clean/readable but used materially more inactive cream field, weaker distance pickup and nearly identical structure between groom/bride with difference carried mainly by the lower color treatment.

V4 is a clear win for the physical reception-sign role because:

- `受付 → 新郎側/新婦側` reads faster at distance;
- the side label becomes the dominant visual anchor instead of a mid-sized line in a sparse page;
- groom/bride use materially different threshold geometry while retaining family coherence;
- the variable-copy contract is structurally stronger due to Auto Layout;
- the factual date/location remains native and isolated on stable paper;
- filler marks were removed rather than used to occupy blank space.

Decision: `CLEAR_V4_WIN`.

## Promotion / rollback

Previous Current was preserved at:

- `45:2 / ROLLBACK_ADD04_PRE_V4_PROMOTION_2026_08_28`.

Retained Current IDs were populated from selected V4 sources:

- groom Current `33:2` ← V4 source `43:3`;
- bride Current `33:15` ← V4 source `43:16`.

Fresh post-promotion screenshots pass.

Post-promotion readback:

- groom `33:2`: `740×1050`, visible native text `5`, fixed-height `0`, outside `0`, IMAGE fills `0`, one Auto Layout variable stack, one `DECOR / COMPOSED / OPEN EDGE / GROOM / NO TEXT` role;
- bride `33:15`: same structural result with `DECOR / COMPOSED / OPEN EDGE / BRIDE / NO TEXT`.

## Learning state

`FIXED_Y_DYNAMIC_COPY_COLLISION`: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL`.

Transferable hypothesis: two independent auto-height text nodes are not dynamically resilient when their vertical relationship is still encoded as fixed Y coordinates. Where the second role should always follow the first, a semantic flow container should be tested rather than adding manual reserve by guesswork.

Do not transfer ADD-04's exact open-edge geometry, colors, asymmetry, side-label scale or reception-sign composition to another item.

## State

`V4_OPEN_EDGE_SELECTED / THREE_SCALE_QA_PASS / PAIR_QA_PASS / LONG_COPY_STRESS_PASS / AUTO_LAYOUT_RESILIENCE_PASS / STRUCTURE_QA_PASS / CLEAR_LEGACY_WIN / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

`NOT_PRINT_READY` remains until final optional name/guidance wording, tabletop stand/holder overlap, venue lighting/glare, real viewing distance, printer bleed/safe-area template and physical proof are authoritative.

## Next safe target

Proceed to ADD-05 as a new V4 blank-frame clean-room build. Do not reuse OPEN EDGE as a suite template.