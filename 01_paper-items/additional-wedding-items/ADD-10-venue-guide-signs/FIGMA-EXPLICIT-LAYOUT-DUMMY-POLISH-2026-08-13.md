# ADD-10 会場案内サイン — Explicit Layout Dummy Polish — 2026-08-13

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- GitHub `main` before Figma write: `2ca34e3aaddd4400fadeef14d34c844104a4550d`
- Current: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- production: A4 `2:2 / 2:13 / 2:24`, A5 `2:35 / 2:46 / 2:57`
- Drive folder: `ADD-10_会場案内サイン` / `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- Drive metadata readback: folder exists, same exact ID, parent `0ADXt8irGMFGnUk9PVA`

## Fresh visible defect

Actual-size A4-left screenshot showed that destination/floor/room copy still used ambiguous visible placeholders:

- `［行先名 · DUMMY］`
- `[DESTINATION · DUMMY]`
- `［階・部屋名 · DUMMY］`

The direction note had already been normalized to `［方向案内 · LAYOUT DUMMY］`. Mixing the two conventions made the main destination field look like unfinished implementation copy and violated the Current requirement that unresolved values use explicit semantic `LAYOUT DUMMY` text.

## Rollback-safe Figma change

Before editing production, preserved all six templates in hidden rollback section:

- section `15:2 / ROLLBACK_ADD10_PRE_EXPLICIT_LAYOUT_DUMMY_2026_08_13`
- rollback frames `15:3 / 15:16 / 15:29 / 15:42 / 15:55 / 15:68`

All six production roots keep their existing IDs. Native text only was changed:

- `DESTINATION_JP` → `［行先 · LAYOUT DUMMY］`
- `DESTINATION_EN` → `[DESTINATION · LAYOUT DUMMY]`
- `LOCATION_META` → `［階・部屋 · LAYOUT DUMMY］`
- `DIRECTION_NOTE` remains `［方向案内 · LAYOUT DUMMY］`

The first A4 post-write screenshot exposed an awkward two-line break in the larger Japanese placeholder. That intermediate state was rejected. A4 `DESTINATION_JP` was reduced from 72 px to 52 px so the full explicit placeholder remains on one line. A5 was already 52 px and remained one line.

## Screenshot QA

- A4-left actual-size/reading screenshot after final repair: PASS; Japanese destination stays primary and the explicit placeholder is a clean single line.
- A5-left near-natural screenshot: PASS; same semantics fit without collision.
- Functional arrow, rust seam, date/footer and information hierarchy remain unchanged.
- No generated image or decorative asset was added; imagery is not the bottleneck for functional wayfinding.

## Structure readback

Each of all six production roots now has:

- native text: `6`
- IMAGE fills: `0`
- named editable arrow role: `1`
- text outside root: `0`
- `clipsContent=true`

A4 semantic text nodes: JP 52 px / EN 21 px / floor-room 27 px / direction note 19 px. A5: JP 52 px / EN 17 px / floor-room 22 px / direction note 16 px. All remain native editable text inside the existing auto-layout information blocks.

## Asset / image decision

`IMAGE_GENERATION_NOT_REQUIRED`. Drive writes: `0`. The screenshot-supported defect was semantic placeholder typography, not missing imagery.

## Result

ADD-10 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY` with clearer visible dummy semantics. Final destination names, physical directions, floor/room facts, printer proof and route walk-through remain `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION` as previously recorded.
