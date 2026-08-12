# ADD-10 会場案内サイン — direction placeholder polish — 2026-08-12

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / SIX_TEMPLATE_FAMILY_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before evidence write: `5d2a2ed1f0c116b71c0cad2975185d3451a15289`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- A4 production: `2:2`, `2:13`, `2:24`
- A5 production: `2:35`, `2:46`, `2:57`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- RURUBU/るるぶ area was not read or written.

## Fresh visual defect

Fresh actual-size/reading-scale inspection of A4-left exposed a production-quality inconsistency that the earlier reopened QA had not removed: the rust direction note visibly read `［左方向テンプレート／実導線確定前］`. The same implementation-language pattern existed in all six templates (`左方向`, `右方向`, `直進`).

The dark direction field, functional native arrow, Japanese destination hierarchy and six-template reflow remain strong. The problem was specifically that a guest-facing paper surface was exposing an internal template/build-state annotation instead of a controlled semantic placeholder.

## Rollback-safe Figma change

Immediately before mutation, all six production templates were cloned and hidden:

- `11:2 / ROLLBACK_ADD10_A4_LEFT_PRE_DIRECTION_PLACEHOLDER_POLISH_2026_08_12`
- `11:15 / ROLLBACK_ADD10_A4_RIGHT_PRE_DIRECTION_PLACEHOLDER_POLISH_2026_08_12`
- `11:28 / ROLLBACK_ADD10_A4_FORWARD_PRE_DIRECTION_PLACEHOLDER_POLISH_2026_08_12`
- `11:41 / ROLLBACK_ADD10_A5_LEFT_PRE_DIRECTION_PLACEHOLDER_POLISH_2026_08_12`
- `11:54 / ROLLBACK_ADD10_A5_RIGHT_PRE_DIRECTION_PLACEHOLDER_POLISH_2026_08_12`
- `11:67 / ROLLBACK_ADD10_A5_FORWARD_PRE_DIRECTION_PLACEHOLDER_POLISH_2026_08_12`

Production root IDs were preserved. Only the native editable `DIRECTION_NOTE` text in each production template changed:

- `9:26`, `9:50`, `9:74`, `9:98`, `9:122`, `9:146`
- previous values: `［左方向テンプレート／実導線確定前］`, `［右方向テンプレート／実導線確定前］`, or `［直進テンプレート／実導線確定前］`
- new value in all six: `［方向案内 · LAYOUT DUMMY］`

The functional arrow remains the size-specific/direction-specific visual role. Exact physical direction is still intentionally unresolved until installation routing is authoritative.

## Post-write screenshot QA

Fresh screenshots were reviewed on:

- A4 left `2:2` at reading scale;
- A4 forward `2:24` at reading scale;
- A5 left `2:35` at near-natural landscape scale.

Result:

- visible implementation language is removed;
- the semantic placeholder remains clearly provisional without pretending the route is finalized;
- the rust note stays subordinate to destination and arrow;
- no new wrap, collision or fake-operational information was introduced;
- left/forward/A5 reflow identity remains intact.

## Structure / editability readback

All six production templates after the edit:

- native editable text count: `6` each;
- IMAGE fills: `0` each;
- text outside production root: `0` each;
- functional arrow count: `1` each;
- `clipsContent=true`;
- `DIRECTION_NOTE` exact value: `［方向案内 · LAYOUT DUMMY］`;
- `INFO_BLOCK_AUTO` remains native vertical auto-layout with `primaryAxisSizingMode=AUTO`.

A4 info blocks remain `760 × 270`; A5 info blocks remain `760 × 196`. All six hidden rollback copies were read back successfully.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_FIX`.

The fresh defect was semantic production copy, not missing image content. Adding generated imagery would reduce wayfinding clarity. Drive writes: `0`; exact Drive folder metadata was re-read before the Figma write.

## Decision

`ADD_10_DIRECTION_PLACEHOLDER_POLISH_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

Deferred finalization remains unchanged: official destinations, exact arrows per installation point, floor/room labels, size/quantity mix, mounting/lighting, printer profile and physical route proof.
