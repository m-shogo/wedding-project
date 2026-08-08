# ADD-10 会場案内サイン — QA

Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-09

## Current production authority
- Figma file: `ADD-10_会場案内サイン`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- Figma URL: `https://www.figma.com/design/mMfoBkoZ7eVbuerSRHePLV`
- Drive folder: `ADD-10_会場案内サイン`
- Drive folder ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- Start main SHA for this production run: `dcaab7ada7e90161dc54767e7d65ff8b78833887`

## Production frames
### A4 major-junction templates
- `2:2` — `A4_LEFT_LAYOUT_TEMPLATE`
- `2:13` — `A4_RIGHT_LAYOUT_TEMPLATE`
- `2:24` — `A4_FORWARD_LAYOUT_TEMPLATE`

### A5 near-field templates
- `2:35` — `A5_LEFT_LAYOUT_TEMPLATE`
- `2:46` — `A5_RIGHT_LAYOUT_TEMPLATE`
- `2:57` — `A5_FORWARD_LAYOUT_TEMPLATE`

All destination/floor/room content remains native editable text with explicit dummy semantics. Arrow variants are layout templates only and are not evidence of confirmed venue routes.

## Visual QA
- [x] Japanese destination is visually primary; English is support only.
- [x] Functional arrow dominates before decorative information.
- [x] Left/right/forward are optically rebalanced rather than blindly mirrored.
- [x] A4 and A5 are separate reflows rather than proportional scaling.
- [x] No equal-card UI, badge stack, decorative flight data, gradients, shadows, or fake transport metadata are used.
- [x] Whole-item / thumbnail QA completed on A4 left at 354×500 render.
- [x] Reading-scale QA completed on A4/A5 at up to 1400 px render.
- [x] Actual-size/detail QA completed on A4 at natural 1400×1980 render and A5 at natural 1400×990 render.

## Long-text stress QA
Initial QA-only copies exposed a real structural defect: a very long Japanese destination expanded into the fixed-position English/floor block and visually collided.

Preserved failure evidence:
- `4:24` — `QA_ADD10_A4_LONG_DESTINATION_FAIL_PRE_AUTOLAYOUT`
- `4:35` — `QA_ADD10_A5_LONG_DESTINATION_FAIL_PRE_AUTOLAYOUT`

Production was then refactored so destination JP → destination EN → floor/room → editorial rule → direction note live inside native vertical auto-layout information blocks.

Auto-layout blocks:
- A4: `4:47`, `4:48`, `4:49`
- A5: `4:50`, `4:51`, `4:52`

Post-fix long-text pass candidates:
- `4:53` — `QA_ADD10_A4_LONG_DESTINATION_PASS_CANDIDATE`
- `4:65` — `QA_ADD10_A5_LONG_DESTINATION_PASS_CANDIDATE`

Stress text used explicit layout dummy copy only. Structural readback on both pass candidates reports `overflowCount=0`.

## Structure QA
- A4 production frames: 6 native text nodes each, 0 image fills, `clipsContent=true`, `overflowCount=0`.
- A5 production frames: 6 native text nodes each, 0 image fills, `clipsContent=true`, `overflowCount=0`.
- Destination information blocks use native vertical auto-layout and `textAutoResize=HEIGHT` so long text pushes later roles downward instead of overlapping them.
- No flatten/raster replacement was introduced; the functional arrows remain vector/SVG-derived editable scene nodes and all variable copy remains native text.
- QA-only failure and pass candidates are preserved on `99_QA` for rollback/evidence.

## Information accuracy gate — BLOCKED_REQUIRED_INPUT
- [ ] Final destination names match the venue's official terminology.
- [ ] Final arrow direction is verified at each exact installation point.
- [ ] Floor / room labels match venue signage and floor map.
- [ ] Placeholder/dummy copy is removed only when authoritative values exist.

These inputs do **not** block further item progression because the production template already passes design QA with placeholders.

## DEFERRED_FINALIZATION
- final venue route facts / installation points
- final room/floor wording
- final number of signs and required direction variants
- stand/frame/wall-mount interference check
- matte/low-glare check under venue lighting
- full route walk-through by a first-time visitor
- printer template/profile, bleed/trim confirmation
- 100% physical print proof
- final PDF export and Drive storage

## Current result
- Specification QA: `PASS`
- Drive folder creation/readback: `PASS`
- Figma production creation: `PASS`
- Whole / reading / detail visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-text structural QA: `PASS`
- Native editability: `PASS`
- Rollback / QA evidence: `PASS`
- Physical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `DESIGN_QA_PASS_WITH_PLACEHOLDERS`
