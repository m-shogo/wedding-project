# ADD-10 会場案内サイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main` = `c102014ed5b87d525ddd634f203c8fbf90fb42a1`; Current remains `VISUAL_REOPENED`.

## Live authority

- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- A4 production: `2:2 / A4_LEFT_LAYOUT_TEMPLATE`, `2:13 / A4_RIGHT_LAYOUT_TEMPLATE`, `2:24 / A4_FORWARD_LAYOUT_TEMPLATE`
- A5 production: `2:35 / A5_LEFT_LAYOUT_TEMPLATE`, `2:46 / A5_RIGHT_LAYOUT_TEMPLATE`, `2:57 / A5_FORWARD_LAYOUT_TEMPLATE`
- Drive folder: `ADD-10_会場案内サイン` / `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- prior structural authority retained: `01_paper-items/additional-wedding-items/ADD-10-venue-guide-signs/QA.md`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The previous templates were structurally excellent: native auto-layout already protected long destination names and arrows remained functional vectors. However, fresh screenshots showed a sellable-visual problem: the A4 sign was essentially an arrow and one information block floating in a very large ivory field with a thin teal edge. At thumbnail scale it looked like a generic wayfinding wireframe rather than a deliberate wedding stationery/signage family.

The previous `DESIGN_QA_PASS_WITH_PLACEHOLDERS` and long-text evidence were retained only as structural history.

## Six-template clean-room family

Created on `99_QA`:

- section: `7:2 / QA_ADD_10_REOPENED_CLEANROOM_FAMILY_2026_08_10`
- A4 left: `7:3 / QA_ADD10_A4_LEFT_V2_WAYFINDING`
- A4 right: `7:16 / QA_ADD10_A4_RIGHT_V2_WAYFINDING`
- A4 forward: `7:29 / QA_ADD10_A4_FORWARD_V2_WAYFINDING`
- A5 left: `7:42 / QA_ADD10_A5_LEFT_V2_WAYFINDING`
- A5 right: `7:55 / QA_ADD10_A5_RIGHT_V2_WAYFINDING`
- A5 forward: `7:68 / QA_ADD10_A5_FORWARD_V2_WAYFINDING`

Art direction:

- direction itself becomes a physical field: deep navy left/right blocks for lateral signs and a deep navy top field for A4 forward;
- functional arrows are recolored ivory and remain editable native/vector scene nodes;
- Japanese `会場案内` replaces generic English `VENUE GUIDE` as the small category label;
- destination information stays on a warm ivory field with Japanese destination dominant, English subordinate, and floor/room metadata below;
- one rust edge connects the dark direction field to the ivory information field;
- A4 and A5 use distinct reflows rather than proportional screenshots;
- left/right are optically mirrored by actual field placement, while forward uses a different top-field composition;
- no boxes/cards around information, badges, pills, gradients, shadows, fake gate/flight metadata, decorative plane icons, or raster assets.

A six-item family-board screenshot confirmed the set reads as one system without degenerating into six identical centered templates. Full-size A4-left and A5-left screenshots confirmed arrow prominence and Japanese destination hierarchy at reading/detail scale.

## Image generation

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or saved. Wayfinding quality depends primarily on functional arrow recognition, typography and physical field hierarchy; generated imagery would reduce clarity here. Drive writes: `0`.

## V2 long-destination stress

Created:

- section: `8:2 / QA_ADD_10_V2_LONG_DESTINATION_STRESS_2026_08_10`
- A4 stress: `8:3 / QA_ADD10_A4_V2_LONG_DESTINATION_STRESS`
- A5 stress: `8:16 / QA_ADD10_A5_V2_LONG_DESTINATION_STRESS`

Stress destination:

`［大変長い披露宴会場・ウェルカムスペースへのご案内 · LAYOUT DUMMY］`

The native vertical auto-layout blocks expand instead of overlapping later roles:

- A4 stress info block: `760 × 570`, bottom `1125`, fully inside `1400 × 1980`;
- A5 stress info block: `760 × 340`, bottom `545`, fully inside `1400 × 990`.

Screenshot review confirmed destination JP → English → floor/room → rule → direction note remain ordered without collision.

## Rollback-safe promotion

Before production promotion, all six live templates were cloned into:

- rollback section: `9:2 / ROLLBACK_ADD_10_PRE_REOPENED_WAYFINDING_2026_08_10`
- rollback frames: `9:3`, `9:27`, `9:51`, `9:75`, `9:99`, `9:123`

All six production frame IDs were preserved while their contents were replaced with the approved V2 family.

## Post-promotion structure QA

All six production templates:

- native text count: `6` each;
- IMAGE fills: `0`;
- functional arrow count: `1` each;
- `clipsContent=true`;
- `INFO_BLOCK_AUTO` remains native vertical auto-layout with `primaryAxisSizingMode=AUTO`;
- production info blocks remain inside each root frame.

A4 production info blocks:

- left `9:21`: `760 × 270`, bottom `825`;
- right `9:45`: `760 × 270`, bottom `825`;
- forward `9:69`: `760 × 270`, bottom `930`.

A5 production info blocks:

- left `9:93`: `760 × 196`, bottom `401`;
- right `9:117`: `760 × 196`, bottom `401`;
- forward `9:141`: `760 × 196`, bottom `401`.

No flatten/raster replacement was introduced. All route facts remain explicit layout dummies.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_DESTINATION_STRESS_PASS / NATIVE_EDITABLE_PASS / AUTO_LAYOUT_PASS / ROLLBACK_SAFE / ACTUAL_SIZE_QA_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still intentionally unresolved:

- official destination names;
- exact arrow direction at each installation point;
- confirmed floor/room labels;
- final quantity and size mix;
- stand/frame/wall-mount interference;
- venue lighting and full route walk-through;
- printer bleed/template/profile and 100% physical proof.

These do not block progression of the visual pass.

## Next

Proceed to ADD-11 写真共有 / QR案内 for reopened visual-art-direction audit.
