# るるぶWEDDING V7 — CURRENT STATUS

Date: 2026-08-23
Direction: Hawaii / high-energy Japanese travel-information editorial, clean-room from V6
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`
Production state: `V7_6_OF_6_LIVE_COMPARISON_SET / TESTED_LOCAL / NOT_PREFERRED / NOT_PRINT_READY`

## Current live V7 comparison set

This is the current strongest six-role V7 study set visible on the live comparison page. Earlier V7 studies remain comparison/rollback evidence and are not deleted.

1. **Outer / Cover C2** `2282:2`
   - fixed display lockup tested locally
   - editable source retained separately; page not flattened
2. **Profile / Q&A K** `2303:2`
   - current V7 Profile comparison
   - Profile-left semantic grouping retained from J
   - Q&A-right changed from repeated prompt modules to answer-owned voice + compact prompt indexes
   - native text `30`; visible IMAGE fills `5`; text intersections `0`; 18 px safe risk `0`
   - 500 / 1400 / `1587×1123` QA PASS
   - prior J `2301:2` is hidden rollback
3. **Story / Chronology F** `2290:4`
   - clean-room tested locally
   - fixed display title source preserved separately
4. **Memory / Guide G2** `2299:2`
   - fixed display title retest passed locally
   - editable source preserved separately
5. **Cafe / Table H2** `2308:2`
   - current V7 Cafe comparison
   - reader-facing destination close corrected from Yokohama residue to Hawaii
   - structural photo dummies remain unchanged and are not final Hawaii assets
   - 500 / 1400 / `1587×1123` visual QA PASS; text intersections `0`
   - prior H `2296:2` is hidden rollback
6. **Island Picks + 1DAY C4** `2286:2`
   - current 1DAY comparison role
   - fixed display title tested locally

All six roots remain on page `2052:2`. V6 was not overwritten.

## Latest verified improvement — Cafe/Table H2

Fresh professional input was taken from FLUX Hawaii rather than repeating the previous food/travel references. FLUX explicitly frames Hawai‘i through honest local storytelling and insightful photography rather than only a picture-perfect façade, and its redesign writing treats readability, photography, grid and paper behavior as one publication system.

Rurubu-specific hypothesis tested on Cafe H:

> a clean-room destination edition must audit reader-facing copy as well as photography; a polished spread is still semantically false if small copy names the frozen control destination.

H2 result:

- changed only `夜の横浜を、ゆっくり味わう。` → `夜のハワイを、ゆっくり味わう。`;
- no layout, photo dummy, crop, color, typographic scale or factual/variable text was changed;
- 500 / 1400 / 1587×1123 visual QA PASS;
- visible native text `14`; IMAGE fills `4`; text intersections `0`;
- the simple 18 px edge audit still flags the existing left folio at 13.7 px from the outer edge exactly as in H, so this is not claimed print-safe until printer authority exists.

Decision: `H2 ADOPTED AS CURRENT V7 CAFE COMPARISON / VERIFIED_LOCAL DESIGN QA / NOT PREFERRED / NOT PRINT READY`.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-CAFE-H2-DESTINATION-COPY-QA-2026-08-23.md`.

Learning: `RSL-230 / F-RSL-230-CONTROL-DESTINATION-COPY-LEAKS-INTO-CLEANROOM-DIRECTION`.

Production learning reinforced: the first clone attached to the Plugin API current page `845:2`; the method was immediately switched to explicit `setCurrentPageAsync(2052:2)` + `page.appendChild()` + parent readback. H2 was not promoted until the parent reverified as `2052:2`.

## V7 Cafe / Table photo bottleneck

Live Cafe H2 `2308:2` remains structurally useful but its photos are explicitly structural dummies. The role-specific generation brief remains the authority for future real Hawaii photography.

Figma brief:

`2305:2 / V7 / PHOTO ART DIRECTION / CAFE-TABLE / GENERATION_READY / NOT CURRENT / 2026-08-23`

Core hypothesis:

- food photo must first create `食べたい`;
- travel photo must also create `そこに行きたい` through believable place evidence;
- stylish-but-generic resort stock, sterile flat-lay and tropical shorthand are failures even when polished;
- new FLUX Hawaii research strengthens the local-truth check: do not substitute a picture-perfect tourist façade for lived Hawai‘i context.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-CAFE-TABLE-PHOTO-ART-DIRECTION-BRIEF-2026-08-23.md`.

## Drive / asset truth

V7 authority folder reverified:

`1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

No new Drive master was created in the H2 correction. Historical Drive master IDs are not silently reasserted; reverify exact IDs before reuse.

Current run asset state:

- newly generated Hawaii photography: `0`
- newly adopted generated photography: `0`
- new Drive master saves: `0`
- new production Figma photo placements: `0`
- new Figma fixed display raster this run: `0`
- existing structural photo dummies called final Hawaii assets: NO
- native variable/factual text preserved: YES

## V6 / V7 / V8 comparison note

Cafe role comparison was rechecked at common visual scale:

- V6 IT `2116:65`: strongest proven photo/information density but remains Yokohama control.
- V7 H2 `2308:2`: materially different high-energy system; semantically corrected to Hawaii but still blocked by dummy photography.
- V8 AS `2261:2`: strongest quiet book/editorial restraint; intentionally materially different from V7.

No overall winner is declared. Final Hawaii photography remains a major truth gate for V7.

## Learning state

- RSL-227 fixed identity display authoring remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; do not convert every title into the same graphic treatment.
- RSL-194 semantic-role redistribution remains reinforced by Profile J left-side grouping.
- RSL-229 answer-owned voice remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
- RSL-230 destination-copy semantic leakage is `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
- Cafe/Table food-photo observations remain `OBSERVED → ROOT_CAUSE_HYPOTHESIS` until generated candidates are tested in the exact slot.

## Print / truth gates

Do not call V7 preferred, complete or print-ready until all relevant gates are separately verified:

1. DESIGN QA
2. REAL CONTENT / legitimate Hawaii photography QA
3. exact printer template / bleed / trim / fold / imposition / PDF preflight
4. effective image resolution after final crop
5. PHYSICAL PROOF

## Next highest-value work

1. Generate materially different role-specific Hawaii Cafe/Table candidates from brief `2305:2` when a legitimate generation path is available.
2. Save accepted masters to exact V7 Drive authority, read back Drive IDs, create role derivatives, and place through the verified image-byte/Figma path when needed.
3. Verify image hash/crop and run thumbnail / reading / actual-size QA in Cafe H2.
4. Re-run common-scale six-role V7 comparison after real photo replacement; do not edit H2 merely because it is newest.
5. Continue blind V6/V7/V8 comparison by role before declaring any preferred system.
