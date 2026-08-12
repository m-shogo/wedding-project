# ADD-10 会場案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-13

## Current production authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-10_会場案内サイン`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- Figma URL: `https://www.figma.com/design/mMfoBkoZ7eVbuerSRHePLV`
- Drive folder: `ADD-10_会場案内サイン`
- Drive folder ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- latest reopened visual evidence: `FIGMA-REOPENED-VISUAL-QA-2026-08-10.md`
- latest production polish evidence: `FIGMA-DIRECTION-PLACEHOLDER-POLISH-2026-08-12.md`

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

## Reopened sellable visual authority
Fresh reopened visual QA replaced the earlier sparse wireframe-like composition with the approved V2 wayfinding family while preserving all six production root IDs.

Current art direction:
- deep-navy direction fields make the functional arrow the primary physical cue;
- warm-ivory information fields keep Japanese destination primary and English secondary;
- a restrained rust seam connects direction and information fields;
- A4 and A5 remain distinct reflows, and left/right/forward are not forced into one centered template;
- no cards, pills, gradients, shadows, fake transport metadata, decorative planes, or raster imagery are used.

Fresh 2026-08-13 screenshots rechecked A4-left at thumbnail/reading scale, A4-forward at reading scale, and A5-left at near-natural scale. The family still reads as deliberate print wayfinding rather than web UI, and no new composition defect warrants another redesign.

The 2026-08-12 direction-placeholder polish removed visible implementation language from all six templates. `DIRECTION_NOTE` is now the native semantic placeholder `［方向案内 · LAYOUT DUMMY］` while the functional arrow remains the only direction-specific visual assertion.

## Visual QA
- [x] Japanese destination is visually primary; English is support only.
- [x] Functional arrow dominates before decorative information.
- [x] Left/right/forward are optically rebalanced rather than blindly mirrored.
- [x] A4 and A5 are separate reflows rather than proportional scaling.
- [x] No equal-card UI, badge stack, decorative flight data, gradients, shadows, or fake transport metadata are used.
- [x] Reopened clean-room comparison was evaluated and promoted.
- [x] Whole-item / thumbnail QA completed.
- [x] Reading-scale QA completed.
- [x] Actual-size/detail QA completed on A4/A5 production.
- [x] 2026-08-13 fresh spot-check still supports `SELLABLE_VISUAL_QA_PASS`.

## Long-text stress QA
Initial QA-only copies exposed a real structural defect: a very long Japanese destination expanded into the fixed-position English/floor block and visually collided.

Preserved failure evidence:
- `4:24` — `QA_ADD10_A4_LONG_DESTINATION_FAIL_PRE_AUTOLAYOUT`
- `4:35` — `QA_ADD10_A5_LONG_DESTINATION_FAIL_PRE_AUTOLAYOUT`

Production was then refactored so destination JP → destination EN → floor/room → editorial rule → direction note live inside native vertical auto-layout information blocks.

Post-fix V2 long-text evidence:
- `8:3` — `QA_ADD10_A4_V2_LONG_DESTINATION_STRESS`
- `8:16` — `QA_ADD10_A5_V2_LONG_DESTINATION_STRESS`

Stress text used explicit layout dummy copy only. Structural/screenshot readback passed without collision.

## Structure QA
- all six production frames: 6 native editable text nodes each, 0 image fills, `clipsContent=true`;
- one functional editable arrow role per frame;
- destination information blocks remain native vertical auto-layout with `primaryAxisSizingMode=AUTO`;
- destination copy uses `textAutoResize=HEIGHT` so long text pushes later roles instead of overlapping them;
- no flatten/raster replacement was introduced;
- reopened rollback section `9:2` and direction-polish rollbacks `11:2 / 11:15 / 11:28 / 11:41 / 11:54 / 11:67` remain the rollback authority.

## Image / Drive decision
`IMAGE_GENERATION_NOT_REQUIRED` for the current production direction. Wayfinding clarity depends on functional arrow recognition, typography and physical field hierarchy; decorative generated imagery would compete with the sign's job. Drive writes for this QA sync: `0`.

## Information accuracy gate — BLOCKED_REQUIRED_INPUT
- [ ] Final destination names match the venue's official terminology.
- [ ] Final arrow direction is verified at each exact installation point.
- [ ] Floor / room labels match venue signage and floor map.
- [ ] Placeholder/dummy copy is removed only when authoritative values exist.

These inputs do **not** block visual progression because the production template already passes design and sellable visual QA with placeholders.

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
- Reopened sellable visual QA: `PASS`
- Whole / reading / detail visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-text structural QA: `PASS`
- Native editability: `PASS`
- Rollback / QA evidence: `PASS`
- Physical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
