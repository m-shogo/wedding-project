# ADD-06 フォトブースサイン — Clean-room V3 long-copy collision reopen

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `1e198cc7650f6e1e7d14d411eab83ffb7a661015`
Repair authority SHA: `57d64e99392ed96b189a6cb48d0693dd573a119a`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- long-copy stress: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`
- retained legacy: `1:2 / FRAME_ADD06_A3_PORTRAIT` — unchanged
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Fresh live audit

The selected V3 current-copy composition remained visually strong at thumbnail and native A3 scales. Fresh metadata confirmed `990×1400`, native editable text, editable lens/route vectors, and no production raster requirement.

The hidden long-copy stress exposed a structural collision that invalidated the older long-copy PASS:

- stress subtitle `25:54`: `x=68, y=515, w=430, h=210` → bottom `725`;
- stress note `25:55`: `x=68, y=722, w=370, h=150` → top `722`;
- the two variable-copy roles overlapped by about `3 px` even though both remained inside the root.

Root-outside checks alone were therefore insufficient.

## Rollback-safe structural repair

Before mutation, hidden rollback snapshots were created:

- rollback section: `27:42 / ROLLBACK / ADD-06 / V3 COPY FLOW / 2026-08-17`
- selected V3 rollback: `27:43`
- long-copy stress rollback: `27:62`

The selected V3 visual grammar was retained. Only the variable-copy flow and the fixed route position were repaired:

1. selected subtitle `25:16` + note `25:17` were placed in native vertical auto-layout `27:81 / GROUP_PHOTO_COPY_STACK_AUTO`;
2. stress subtitle `25:54` + note `25:55` were placed in native vertical auto-layout `27:82 / GROUP_PHOTO_COPY_STACK_AUTO / STRESS`;
3. stack gap is `123 px`, preserving the selected current-copy vertical rhythm;
4. under stress, the subtitle expands to `210 px` and the note is automatically pushed to `y=848`, so the previous text-to-text collision is removed;
5. fixed editable route vectors `25:10 / 25:48` were moved from `x=64,y=825` to `x=510,y=940`, below the lens and outside the variable-copy column. This keeps route art from colliding with a longer note while preserving it as editable vector art.

No legacy layout, image, SVG, raster or production node was copied into the selected V3.

## Post-repair visual QA

Fresh screenshots were reviewed after the repair:

- whole / thumbnail: selected `25:3` at max dimension 500 — PASS;
- reading scale: selected `25:3` at max dimension 1000 — PASS;
- actual size / long-copy detail: stress `25:41` at native `990×1400` — PASS.

The route now reads as a continuation below the lens rather than crossing the copy area. Current-copy hierarchy remains `PHOTO SPOT → BEST SHOT → subtitle → 写真撮影はこちら → date/location`.

## Post-repair structure QA

Absolute-bounding-box checks were used so nested auto-layout children were measured correctly.

Selected `25:3`:

- visible native text: `6`;
- text-to-text collisions: `0`;
- visible text vs route collisions: `0`;
- visible text outside root: `0`;
- copy stack `27:81`: `430×257`, subtitle `84`, gap `123`, note `50`;
- route `25:10`: `x=510,y=940,w=420,h=180`, right `930`, bottom `1120`.

Long-copy stress `25:41`:

- visible native text: `6`;
- text-to-text collisions: `0`;
- visible text vs route collisions: `0`;
- visible text outside root: `0`;
- copy stack `27:82`: `430×483`, subtitle `210`, gap `123`, note `150`;
- route `25:48`: `x=510,y=940,w=420,h=180`.

The stress frame was returned to hidden state after QA.

## Decision

The prior `DESIGN_QA_LONG_COPY_REOPENED` condition is closed.

Current verified state:

`CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Legacy production remains untouched. Drive write: `0`. Image generation: `0`; imagery was not the defect.

Remaining finalization is limited to authoritative final venue/location copy, physical/vendor proof, and other print-final inputs.