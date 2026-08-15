# ADD-04 受付サイン — Clean-room V2/V3 QA

Status: `CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED / LONG_COPY_STRESS_PASS / NOT_PRINT_READY`
Date: 2026-08-15
Start authority SHA: `e398af39c56b1be204a0ce472dc73f585095fb4e`

## Clean-room declaration

Both V2 and V3 were authored from blank A5 frames. Existing production `1:3 / 1:14`, old layout groups, old rails, old decorative marks and old assets were not duplicated or used as construction material. The retained production was opened only after V2 construction/stress QA was complete, for the mandated comparison gate.

Only verified requirements were re-authored:

- A5 portrait `148 × 210 mm` pair;
- `新郎側受付 / GROOM RECEPTION`;
- `新婦側受付 / BRIDE RECEPTION`;
- date `2026.10.24 SAT`;
- location `YOKOHAMA`;
- optional name and direction remain explicit native `LAYOUT DUMMY` placeholders;
- no invented receptionist name, surname, payment/gift guidance, QR, gate/flight/seat data or gender-stereotype motif.

Drive authority was live-read before authoring: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`, parent `0ADXt8irGMFGnUk9PVA`.

## V2 — desk marker pair

Figma file: `qWlF9THLR1G76hLcx1zYOx`

- groom: `15:2 / CLEANROOM_V2_ADD04_GROOM_DESK_MARKER`
- bride: `15:16 / CLEANROOM_V2_ADD04_BRIDE_DESK_MARKER`
- stress: `15:30 / 15:42` (hidden after QA)
- each: `740 × 1050`, native text `6`, IMAGE fill `0`, outside visible text `0`, `clipsContent=true`

V2 used opposite edge anchoring and large Japanese labels rather than a color-only duplicate. The first draft also contained `A/B` registration marks. Those were rejected during QA as non-functional decorative labels and removed before comparison.

Long-name and long-direction stress rendered without clipping/collision.

### V2 comparison decision

Only after V2 completion was legacy `1:3 / 1:14` visually opened. V2 improved the direct `新郎側受付 / 新婦側受付` recognition, but still relied on too much empty field for a small desk sign and did not clearly beat retained production at all scales.

Decision: `V2_REJECTED_AS_FINAL / PRESERVED_FOR_HISTORY`.

## V3 — Japanese typographic reception band

V3 was created from two new blank frames, not by duplicating V2 or legacy.

- groom: `16:2 / CLEANROOM_V3_ADD04_GROOM_TYPO_BAND`
- bride: `16:17 / CLEANROOM_V3_ADD04_BRIDE_TYPO_BAND`
- stress: `16:32 / 16:47` (hidden after QA)

Direction:

- compact date/location context;
- one offset black typographic band per side;
- full approved Japanese reception-side label is the primary 2m-readable information;
- English is secondary;
- name and direction remain open semantic fields below the band;
- the pair shares one typographic/paper system but uses opposite band anchoring rather than a simple recolor.

A first V3 stress exposed a real regression: a long optional name collided with its divider. V3 was not passed in that state. The name and divider were rebuilt as native `GROUP_NAME_FIELD_AUTO` vertical auto-layout containers, `488px` wide with `18px` item spacing, so the divider follows text reflow.

The V3 QA also caught a fact-hierarchy weakness: the first band read only `新郎側 / 新婦側`, leaving `受付` to a faint decorative background word. That was corrected by making the primary band labels exactly `新郎側受付 / 新婦側受付` and removing the redundant giant background `受付`.

Final vertical rhythm was tightened so the primary band appears earlier and the sign no longer mistakes empty top space for premium minimalism.

Final structural readback before evidence write:

- groom `16:2`: `740 × 1050`, native text `8`, IMAGE fill `0`, outside visible text `0`, `clipsContent=true`, adaptive name auto-layout present;
- bride `16:17`: `740 × 1050`, native text `8`, IMAGE fill `0`, outside visible text `0`, `clipsContent=true`, adaptive name auto-layout present;
- generated/raster asset usage: `0`;
- variable copy baked into graphics: `0`.

## Visual decision

Compared after independent construction, V3 is selected over V2 and retained production as the current clean-room visual candidate because:

- the full Japanese reception-side label becomes the unmistakable first read at tabletop distance;
- the black band provides a physical printed-sign anchor without creating dashboard cards or fake transport UI;
- groom/bride remain a family without being color-only duplicates;
- placeholder/name changes remain native and the repaired auto-layout survives longer copy;
- no arbitrary A/B marks, decorative icon rows, fake ticket information, generated people or rasterized text remain.

Legacy production `1:3 / 1:14` remains untouched and is retained as comparison/rollback history. V3 selection does not delete or overwrite it.

## Hybrid authoring / assets

- factual and variable text: native Figma text;
- name-field reflow: native auto-layout;
- fixed structure: simple native band/rules/bracket geometry;
- reusable SVG: not required;
- generated/composed raster: not required;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: imagery is not the quality bottleneck for a small wayfinding desk marker.

## Deferred finalization

Still `NOT_PRINT_READY` pending final printer template/bleed, any approved surname/name, real desk direction, physical A5 proof, actual stand/placement dimensions and approximately 2m readability under venue lighting.
