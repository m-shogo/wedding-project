# ADD-10 会場案内サイン — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / A4_DEEPER_INFO_RHYTHM_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-15

## Current production authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `ADD-10_会場案内サイン`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- Figma URL: `https://www.figma.com/design/mMfoBkoZ7eVbuerSRHePLV`
- Drive folder: `ADD-10_会場案内サイン`
- Drive folder ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- Drive parent readback: `0ADXt8irGMFGnUk9PVA`
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
- a restrained rust seam connects direction and information fields when it has a real binding role;
- A4 and A5 remain distinct reflows, and left/right/forward are not forced into one centered template;
- no cards, pills, gradients, shadows, fake transport metadata, decorative planes, or raster imagery are used.

The 2026-08-12 direction-placeholder polish removed visible implementation language from all six templates. `DIRECTION_NOTE` is now the native semantic placeholder `［方向案内 · LAYOUT DUMMY］` while the functional arrow remains the only direction-specific visual assertion.

## 2026-08-15 A4 deeper-information rhythm
Fresh 1400×1980 review found that A4-left and A4-right still placed `INFO_BLOCK_AUTO` at `y=555`, causing the right/left information field to end too early and leaving a large lower paper field that read closer to premium-by-emptiness than deliberate wayfinding rhythm.

Production was not edited first. Two rollback-safe A4-left comparisons were created:

- `24:2 / QA_ADD10_A4_LEFT_DEEPER_INFO_ONLY_2026_08_15`
  - moved `INFO_BLOCK_AUTO` to `y=760` only;
- `24:15 / QA_ADD10_A4_LEFT_DEEPER_INFO_PLUS_BINDING_SEAM_2026_08_15`
  - moved `INFO_BLOCK_AUTO` to `y=760`;
  - extended `ACCENT_EDGE` height from `520 → 640` so the rust seam continues to the information start instead of becoming a disconnected decorative stripe.

The second candidate won at thumbnail, reading and actual-size scales. The seam was retained because it performs a visible binding function between the upper kicker and the destination block; this was an independent receiving-item test of shared lesson RSL-008, not a copied Rurubu layout treatment.

Before promotion, full hidden rollbacks were saved:

- `25:15 / ROLLBACK_ADD10_A4_LEFT_PRE_DEEPER_INFO_RHYTHM_2026_08_15`
- `25:28 / ROLLBACK_ADD10_A4_RIGHT_PRE_DEEPER_INFO_RHYTHM_2026_08_15`

Production changes:

- A4-left `2:2`: `INFO_BLOCK_AUTO y 555 → 760`, `ACCENT_EDGE height 520 → 640`;
- A4-right `2:13`: `INFO_BLOCK_AUTO y 555 → 760`, `ACCENT_EDGE height 520 → 640`;
- A4-forward `2:24`: unchanged because its vertical-arrow composition already uses a different `INFO_BLOCK_AUTO y=660` relationship;
- all A5 templates: unchanged because they are independent near-field landscape reflows.

Comparison/stress nodes were hidden after promotion.

## Visual QA
- [x] Japanese destination is visually primary; English is support only.
- [x] Functional arrow dominates before decorative information.
- [x] Left/right/forward are optically rebalanced rather than blindly mirrored.
- [x] A4 and A5 are separate reflows rather than proportional scaling.
- [x] No equal-card UI, badge stack, decorative flight data, gradients, shadows, or fake transport metadata are used.
- [x] Reopened clean-room comparison was evaluated and promoted.
- [x] Whole-item / thumbnail QA completed after 2026-08-15 A4 polish.
- [x] Reading-scale QA completed after 2026-08-15 A4 polish.
- [x] Actual-size/detail QA completed on A4-left and A4-right production.
- [x] The extended rust seam was checked for binding function before retention instead of being kept as automatic decoration.

Post-promotion screenshot result:

- A4-left at 500px whole-item: PASS;
- A4-left at 1000px reading scale: PASS;
- A4-left at 1400px max dimension / native 1400×1980: PASS;
- A4-right at 1400px max dimension / native 1400×1980: PASS.

The deeper information position now aligns more convincingly with the functional horizontal arrow, uses more of the physical page, and still leaves controlled negative space to the footer.

## Long-text stress QA
Initial QA-only copies exposed a real structural defect: a very long Japanese destination expanded into the fixed-position English/floor block and visually collided.

Preserved failure evidence:
- `4:24` — `QA_ADD10_A4_LONG_DESTINATION_FAIL_PRE_AUTOLAYOUT`
- `4:35` — `QA_ADD10_A5_LONG_DESTINATION_FAIL_PRE_AUTOLAYOUT`

Production was then refactored so destination JP → destination EN → floor/room → editorial rule → direction note live inside native vertical auto-layout information blocks.

Post-fix V2 long-text evidence:
- `8:3` — `QA_ADD10_A4_V2_LONG_DESTINATION_STRESS`
- `8:16` — `QA_ADD10_A5_V2_LONG_DESTINATION_STRESS`

Because the 2026-08-15 visual polish materially changed the A4 information-block y-position, the older long-copy PASS was **not** reused as completion evidence. A new hidden stress copy was created from the adopted deeper-position candidate:

- `25:2 / QA_ADD10_A4_LEFT_DEEPER_INFO_LONG_COPY_STRESS_2026_08_15`
- stress `INFO_BLOCK_AUTO y=760`;
- production-width native auto-layout retained;
- stress information block expanded from `270 → 470 px`;
- stress bottom = `1230`;
- footer y = `1815`;
- outside visible text count = `0`;
- screenshot at native 1400×1980: PASS for collision/clip and bottom-edge reserve.

This independently reproduces non-Rurubu shared lesson NRSL-001 on a materially different item: spatial polish of variable-height copy must be revalidated at the new position.

## Structure QA
2026-08-15 post-promotion live readback:

- A4-left `2:2`: `1400×1980`, 6 native text, 6 visible, IMAGE fills 0, outside visible text 0, `clipsContent=true`;
- A4-right `2:13`: `1400×1980`, 6 native text, 6 visible, IMAGE fills 0, outside visible text 0, `clipsContent=true`;
- both `INFO_BLOCK_AUTO`: `layoutMode=VERTICAL`, `primaryAxisSizingMode=AUTO`, `y=760`, production height `270`, bottom `1030`;
- hidden stress `25:2`: same auto-layout role at `y=760`, stress height `470`, bottom `1230`, outside visible text 0;
- one functional editable arrow role per frame remains intact;
- no flatten/raster replacement was introduced;
- historical reopened/direction-polish rollbacks remain intact;
- new A4 rhythm rollbacks: `25:15 / 25:28`.

## Image / Drive decision
`IMAGE_GENERATION_NOT_REQUIRED` for the current production direction. Wayfinding clarity depends on functional arrow recognition, typography and physical field hierarchy; decorative generated imagery would compete with the sign's job.

Drive authority was re-read immediately before the Figma write:
- folder: `ADD-10_会場案内サイン`
- ID: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- parent: `0ADXt8irGMFGnUk9PVA`
- Drive writes: `0`.

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
- A4 deeper-information rhythm: `PASS`
- Binding-function seam check: `PASS`
- Whole / reading / detail visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-text structural QA at the new A4 spatial position: `PASS`
- Native editability: `PASS`
- Rollback / QA evidence: `PASS`
- Physical proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
