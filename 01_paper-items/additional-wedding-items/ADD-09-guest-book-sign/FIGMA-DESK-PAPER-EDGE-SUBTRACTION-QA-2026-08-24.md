# ADD-09 Guest Book — Desk Paper-Edge Subtraction QA — 2026-08-24

Start authority: `e7cb1efdf63b6b7da3d7b6ac29edf5f34238f07b`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Scope

Target: ADD-09 Guest Book sign only. Rurubu production was not inspected or modified.

Figma file: `PjFWBpDwaQM5LfvgdqSFvU`

- Current: `41:56 / CURRENT / ADD-09 / PEN TRAY WELCOME / NO AMBIGUOUS PAPER EDGE / 2026-08-24`
- long-copy proof: `41:76 / QA / ADD-09 / PEN TRAY WELCOME / LONG COPY / NO AMBIGUOUS PAPER EDGE / 2026-08-24`
- bounded comparison: `51:2 / QA / ADD-09 / NO AMBIGUOUS PAPER EDGE / 2026-08-24` — hidden after verification
- pre-change Current rollback: `52:2` — hidden
- pre-change long-copy rollback: `52:38` — hidden
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`

Drive write: `0`.
Generated assets: `0`.

## Visible problem

Fresh whole/read/actual-size review found that the pale-blue `DESK / PAPER EDGE` strip at the boundary between the warm paper field and the dark-green writing-desk field did not read convincingly as a real paper edge. It sat as a continuous 18 px horizontal rail and read more like a UI/status separator than a physical paper layer.

The Guest Book identity is already carried by the open-paper field, the real writing-desk field, the native operational copy, and the connected pen cue. The pale-blue strip was not needed for trim, fold, binding, writing, navigation, or reader-facing information.

## Bounded comparison

A rollback-safe duplicate `51:2` hid only `DESK / PAPER EDGE`.

Unchanged:

- all native copy;
- Japanese hierarchy;
- dynamic Auto Layout stack;
- top hospitality edge;
- coral entry rule;
- dark-green writing-desk field;
- connected pen assembly;
- date and placeholders;
- canvas geometry.

Result: the cream paper transitions directly into the green writing surface, which reads more like an intentional physical table/sign composition and less like a segmented UI panel.

## Promotion

Before production mutation, complete rollback copies were created:

- Current rollback `52:2`;
- long-copy rollback `52:38`.

Then only the pale-blue edge was hidden in:

- Current edge `41:72`;
- stress edge `41:92`.

The comparison was hidden after promotion.

## Three-scale QA

Current after subtraction:

- whole / thumbnail: PASS;
- reading scale: PASS;
- native `1000×1419`: PASS;
- warm open-paper hierarchy and connected pen cue remain intact;
- no new card/UI containment was introduced.

Long-copy proof `41:76` was temporarily revealed after the change and visually rechecked. The longer title, lead, guidance, writing-method copy, location copy, closing/date and desk field remain visually separated and readable. The stress proof was re-hidden after QA.

## Structure QA

Current `41:56`:

- visible native text `12`;
- fixed-height visible text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- `DESK / PAPER EDGE` hidden.

Stress `41:76`:

- hidden after QA;
- visible-when-revealed native text `12`;
- fixed-height visible text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- `DESK / PAPER EDGE` hidden.

The apparent text bounding-box intersections produced by a naive root-relative check are caused by nested Auto Layout child coordinates and are not visible glyph collisions; fresh screenshot review is the authoritative visual check here.

## Hybrid authoring

- variable/factual/operational copy: native editable Figma text;
- dynamic copy stack: native Auto Layout;
- connected pen and writing desk: simple native fixed geometry with direct physical meaning;
- ambiguous pale-blue rail: removed rather than replaced;
- SVG: `0`;
- generated raster: `0`;
- replaceable image role: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the defect was an ambiguous fixed rail, not missing photography or illustration.

## Learning state

`VERIFIED_LOCAL` application of the existing binding-function QA method:

> A layer named `paper edge` is not automatically a credible physical cue. At whole-item scale, it still has to read as a real paper/binding/trim relationship. If it instead reads like an isolated UI separator, test bounded subtraction before retaining it.

Do not transfer the exact pale-blue color, desk geometry, coordinates, or a blanket `remove paper edges` rule. Real paper edges with convincing overlap, thickness, fold, trim, or material function may be correct in other artifacts.

## Decision

`CURRENT_RETAINED_AND_REFINED / DESK_PAPER_EDGE_SUBTRACTION_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`.
