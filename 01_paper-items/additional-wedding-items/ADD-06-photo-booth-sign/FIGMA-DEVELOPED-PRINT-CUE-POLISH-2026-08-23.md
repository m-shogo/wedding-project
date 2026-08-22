# ADD-06 フォトブースサイン — Developed-print cue polish

Date: 2026-08-23
State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DEVELOPED_PRINT_CUE_PASS / LONG_COPY_SEMANTIC_BREAK_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before write: `1764373cc78915220790390ba84f258dd0e054d8`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- Current root: `45:2`
- hidden long-copy proof: `47:19`
- exact Drive authority live-confirmed: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`
- Drive writes: `0`

## Visible problem

The selected `PHOTO STRIP DOORWAY` composition remained strong, but actual-size screenshot review showed that its three supposed photo-strip exposures were only flat yellow/coral/lagoon rectangles.

At thumbnail scale they provided color rhythm, but at reading/actual size they read more like color swatches than developed photographs. That weakened the physical-photo metaphor that differentiates ADD-06 from generic wedding signage.

## Bounded role test

A rollback-safe comparison was created:

- `50:2 / QA / ADD-06 / PHOTO STRIP / ABSTRACT DEVELOPED PRINTS / 2026-08-23`

Only the three fixed exposure fields changed. No semantic text, date, unresolved location, headline hierarchy, strip stock, tape, dimensions or right-side layout changed.

Each exposure became a clipped fixed-art print:

1. abstract sunrise / horizon / water;
2. abstract flash-paper exposure;
3. abstract night-water exposure.

The scenes are intentionally non-person and non-documentary. They do not pretend to show the real couple or guests, contain no fake text, and remain fixed decoration rather than semantic content.

## Visual decision

The comparison is stronger than the flat fields because:

- the left object now reads as a strip of actual developed prints instead of three color cards;
- photo-booth specificity increases without using camera UI, fake viewfinder graphics or generated people;
- travel/wedding warmth remains present through abstract light / horizon / night exposure rather than generic tropical clip-art;
- the Japanese wayfinding hierarchy remains unchanged.

## Promotion and rollback

Before production mutation:

- Current rollback: `50:33 / ROLLBACK / ADD-06 / PHOTO STRIP FLAT EXPOSURES / PRE-DEVELOPED-PRINT 2026-08-23`
- long-copy rollback: `50:49 / ROLLBACK / ADD-06 / LONG COPY / PRE-DEVELOPED-PRINT 2026-08-23`

Promoted:

- Current stable root remains `45:2`, renamed `CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS 2026-08-23`;
- hidden stress remains `47:19`;
- only fixed-art exposure roles changed.

No raster/image asset was created, saved to Drive, or embedded. `IMAGE fills = 0`.

## Post-promotion long-copy QA

Fresh screenshot review of `47:19` exposed an older stress-contract typography defect that structure-only checks had not caught:

- `ご確認の / うえ` split mechanically;
- `お進みく / ださい` split mechanically;
- location placeholder split `設置場 / 所`;
- the expanded location approached the footer lane.

The first semantic-break repair was still too narrow and was rejected.

Final bounded repair:

- guide measure widened to `570` and kept native auto-height;
- guide uses semantic two-line grouping: `撮影スペースの場所をご確認のうえ、 / 順番にゆっくりお進みください`;
- location uses phrase-level grouping: `[会場内のフォトブース / 設置場所・長い案内名称]`;
- type size was not reduced merely to make the test pass.

Fresh stress screenshot: PASS.

## Structure readback

Current `45:2`:

- visible native text: `7`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`.

Stress `47:19`:

- visible native text: `7`;
- fixed-height text: `0`;
- outside visible text: `0`;
- IMAGE fills: `0`.

## Hybrid authoring decision

- variable/factual copy: native editable text;
- photo-strip fixed art: clipped native vector/shape composition;
- SVG: `0`;
- generated raster: `0`;
- replaceable image role: `0`.

A generated image workflow was not needed because the defect could be solved with a small fixed-art role while preserving complete editability and avoiding fake documentary imagery.

## Decision

`DEVELOPED_PRINT_CUE_PASS`.

ADD-06 retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` with a stronger item-specific physical photo reading.

Still `NOT_PRINT_READY` until final booth copy/location, stand/mounting/sightline, printer template/profile, bleed/safe-area, and physical venue-lighting proof are verified.
