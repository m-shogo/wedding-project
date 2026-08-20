# ADD-10 会場案内サイン — QA

Status: `CURRENT / CLEANROOM_V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / REDUNDANT_ENGLISH_DESTINATION_SUBTRACTION_PASS / SEMANTIC_COPY_HARDENING_PASS / DEEPER_HORIZONTAL_DIRECTION_AXIS_RHYTHM_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- Figma file: `ADD-10_会場案内サイン`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- selected clean-room V4 left/right/forward: `32:3 / 32:15 / 32:27`
- selected-family long-copy stress: `33:3 / 33:15 / 33:27` — hidden after QA
- retained legacy family: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`

Drive metadata was live-read in this progression run. Drive write: `0`.

The retained `2:*` production family remains rollback/history only. V4 was authored from blank frames under the clean-room mandate and is the selected visual family.

## Current visual direction

V4 is functional Japanese-first wayfinding rather than a decorative travel-theme poster:

- oversized Japanese destination is the first-glance cue;
- native venue/date context is secondary;
- `[階数・部屋名]` remains a native semantic placeholder;
- one editable direction axis carries the actual left/right/forward job;
- warm paper and restrained mint/rust accents avoid dashboard/card UI;
- horizontal left/right signs place the direction axis deliberately deeper than the destination stack;
- forward uses its naturally tall vertical direction gesture;
- variable destination/floor/room/direction content remains native editable text;
- raster IMAGE fills and generated assets are `0`.

## Semantic-copy hardening retained

The selected/stress family no longer exposes implementation language or fragile fixed-height copy:

- selected floor/room copy is `[階数・部屋名]`;
- stress uses semantic Japanese long-copy without `LAYOUT DUMMY` suffixes;
- internal authority/export note is hidden;
- category/context roles use native auto-height text;
- selected/stress outside text `0`;
- text collisions `0`;
- IMAGE additions `0`.

Evidence: `FIGMA-CLEANROOM-V4-SEMANTIC-COPY-HARDENING-2026-08-18.md`.

## Deeper horizontal direction-axis rhythm retained — 2026-08-19

Earlier whole-item review found left/right direction arrows too close to the destination stack, leaving the lower half visually inactive. Bounded tests increased the destination-to-axis gap; `400px` was strongest and adopted for left/right selected and stress only.

- selected left/right flow spacing: `400`;
- stress left/right flow spacing: `400`;
- forward unchanged because its vertical arrow already carries lower-page mass;
- realistic long-copy left/right retain `108px` direction-axis bottom clearance;
- selected/stress outside text `0`, collisions `0`.

Evidence: `FIGMA-CLEANROOM-V4-DEEPER-DIRECTION-AXIS-RHYTHM-QA-2026-08-19.md`.

## Redundant English destination subtraction — adopted 2026-08-20

Fresh actual-size review found `RECEPTION` directly beneath the already-dominant Japanese destination `受付`. It repeated the same ordinary meaning rather than carrying a brand, code, artifact type or additional wayfinding fact. The same redundant role existed in right/forward and as `RECEPTION HALL` in long-copy proofs.

Bounded comparison:

- `46:2 / QA / ADD10 / LEFT / NO_REDUNDANT_ENGLISH_RECEPTION / 2026-08-20`;
- only the redundant English destination role was hidden.

Adopted after the comparison was stronger:

- selected `RECEPTION`: `32:8 / 32:20 / 32:32` hidden;
- stress `RECEPTION HALL`: `33:8 / 33:20 / 33:32` hidden;
- selected rollback roots: `46:15 / 46:28 / 46:41` hidden;
- stress rollback roots: `46:53 / 46:66 / 46:79` hidden;
- comparison hidden after adoption.

Japanese destination, venue/date support, floor/room placeholder, direction axis, spacing and colors remain otherwise unchanged/editable.

Evidence: `REDUNDANT-ENGLISH-DESTINATION-SUBTRACTION-QA-2026-08-20.md`.

## Fresh live visual audit — 2026-08-20

Fresh selected-left screenshot in this progression run at ~500px: PASS.

Current first read is clean and functional:

`会場案内 → 受付 → [階数・部屋名] → large left direction axis`.

The intentionally large open field is not treated as false-premium emptiness here because the destination and physical direction gesture are the sign's complete functional content, and the arrow occupies a substantial lower-page role. Adding image/texture/icon filler would reduce recognition speed rather than improve art direction.

Existing 2026-08-20 evidence also confirms:

- selected-left whole-item 500px: PASS;
- forward actual-size-equivalent 1400px: PASS;
- left realistic long-copy `1400×1980`: PASS and returned hidden;
- residual selected/stress `RECEPTION / RECEPTION HALL`: `0`;
- IMAGE fills added: `0`.

No fresh defect justifies a V5 rebuild in this run.

## Long-copy / editability gate

Current structural gate:

- selected left/right/forward outside visible text `0`;
- long-copy left/right/forward outside visible text `0`;
- native variable copy remains editable;
- direction axis remains editable vector geometry;
- realistic horizontal stress preserves `108px` bottom clearance;
- retained legacy and rollback evidence remain intact;
- no full-page raster/flatten replacement introduced.

## Hybrid / image decision

- variable destination/floor/room/direction roles: native Figma text;
- functional direction axis: editable vector/geometry;
- fixed accent geometry: native vector/shape;
- generated/composed raster: `0`;
- replaceable image role: not required;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: wayfinding quality is determined by recognition, hierarchy and route correctness; decorative imagery would compete with the functional sign.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Do not fabricate:

- official destination names / venue terminology;
- exact left/right/forward direction per installation point;
- final floor/room labels;
- sign count and installation locations.

Finalization also waits for:

- stand/frame/wall-mount interference check;
- matte/low-glare venue-light check;
- route walk-through by a first-time visitor;
- printer template/profile and bleed/trim confirmation;
- 100% physical print proof and final PDF/Drive export.

## Current result

`CLEANROOM_V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / REDUNDANT_ENGLISH_DESTINATION_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

Next progression target: `ADD-11 写真共有 / ハッシュタグ / QR案内サイン`.
