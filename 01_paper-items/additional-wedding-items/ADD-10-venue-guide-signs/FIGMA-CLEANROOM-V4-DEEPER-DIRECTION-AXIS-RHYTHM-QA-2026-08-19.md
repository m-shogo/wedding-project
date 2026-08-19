# ADD-10 会場案内サイン — V4 deeper direction-axis rhythm QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
Start authority SHA: `bb073b60203f6413ef13814e67f1cf3f12b44344`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- selected left/right/forward: `32:3 / 32:15 / 32:27`
- long-copy left/right/forward: `33:3 / 33:15 / 33:27`
- Drive authority: `ADD-10_会場案内サイン / 1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- retained legacy: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`

## Visible problem

Fresh whole-item review of selected left/right showed that the destination stack ended in the upper half and the horizontal direction axis followed only `90px` below it. Because a horizontal arrow cannot occupy the page vertically like the forward arrow does, the lower half read as a large undifferentiated empty field. The sign remained functional, but the balance risked the Current failure mode of treating emptiness itself as premium minimalism.

Forward `32:27` did not share the defect: its vertical axis already occupies the middle/lower page and therefore remained unchanged.

## Bounded comparison

Two left-only rollback-safe comparisons were made without touching selected production:

1. `45:2 / QA / ADD10 / V4 LEFT / DEEPER DIRECTION AXIS / 2026-08-19`
   - flow item spacing `90 → 240`.
2. `45:15 / QA / ADD10 / V4 LEFT / MUCH DEEPER DIRECTION AXIS / 2026-08-19`
   - flow item spacing `90 → 400`.

The `240px` version improved the page slightly but still left the direction gesture too high. The `400px` version produced a clearer two-beat sign: destination information first, then a deliberate physical direction gesture in the lower-middle field.

No type, destination copy, floor/room placeholder, arrow geometry, stroke weight, color, frame size, or factual content changed.

## Long-copy gate before adoption

A realistic long-copy comparison was created from hidden stress left `33:3`:

- `45:28 / QA / ADD10 / V4 LEFT STRESS / MUCH DEEPER AXIS / 2026-08-19`.

With the same `400px` spacing:

- long destination stack still remained native/editable;
- direction axis bottom remained inside the `1400×1980` root;
- bottom clearance: `108px`;
- outside visible text: `0`;
- text-to-text collision: `0`.

The candidate therefore did not trade short-copy composition for long-copy failure.

## Rollback / promotion

Hidden pre-change rollbacks were created before selected mutation:

- left selected: `45:41`;
- right selected: `45:54`;
- left long-copy: `45:67`;
- right long-copy: `45:80`.

Adopted only for horizontal-direction families:

- selected left flow `33:39`: item spacing `90 → 400`;
- selected right flow `33:40`: item spacing `90 → 400`;
- stress left flow `33:41`: item spacing `90 → 400`;
- stress right flow `33:42`: item spacing `90 → 400`.

Forward selected/stress were not changed because their vertical direction axis already uses the lower page intentionally.

Comparison nodes `45:2 / 45:15 / 45:28` were hidden after adoption.

## Three-scale / structural QA

Selected left/right after promotion:

- whole/thumbnail: PASS;
- reading scale: PASS;
- actual `1400×1980`: PASS;
- direction-axis bottom: `1570` relative to root top;
- bottom clearance: `510px`;
- outside visible text: `0`;
- text collision: `0`.

Long-copy left/right after promotion:

- flow height: `1542px`;
- direction-axis bottom remains inside root;
- bottom clearance: `108px`;
- outside visible text: `0`;
- text collision: `0`;
- stress roots returned to hidden QA state after screenshot review.

No raster/image role was introduced. Variable/factual copy remains native editable text; the direction axes remain editable vector roles.

## Drive / image decision

Drive authority was live-read before the Figma write and matched `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`.

- Drive writes: `0`.
- Image generation: `0`.

The defect was page rhythm and physical wayfinding hierarchy, not missing imagery.

## Decision

`DEEPER_HORIZONTAL_DIRECTION_AXIS_RHYTHM_PASS`.

The selected V4 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The left/right signs now use more of the physical page intentionally while preserving realistic long-copy tolerance and the distinct forward-direction treatment.

## Transfer boundary

Do not generalize the exact `400px` spacing. The transferable QA method is only: when a directional/functional gesture and variable text share a tall print artifact, compare page occupancy at whole-item scale and then rerun realistic long-copy stress before moving the gesture closer to trim/bottom boundaries.