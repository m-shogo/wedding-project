# NRSL — Programmatic Figma text geometry readback is a project rule

Date: 2026-08-21
Owner scope: non-Rurubu
State: `PROMOTED_PROJECT_RULE`

## Rule being promoted

For every newly programmatically authored Figma candidate that contains native semantic text, screenshot QA is not sufficient evidence of editability or collision safety.

Before claiming long-copy / structure PASS, read back each meaningful text node's:

- width;
- height;
- `textAutoResize`;
- characters;
- font;
- final bottom/right bounds.

Flag any implausibly small geometry even when the screenshot renders correctly.

Normalized failure fingerprint:

`AI_TEXT_RENDER_OK_BUT_BOUNDS_INVALID`

## Evidence basis

The failure was independently reproduced across materially different non-Rurubu artifacts:

- WEDDING PASSPORT vNext;
- BOARDING PASS vNext;
- 青春ふたりきっぷ vNext / subsequent clean-room work;
- ADD-02 destination-sign family;
- ADD-10 venue-wayfinding V3 in the current run.

ADD-10 evidence:

- Figma `mMfoBkoZ7eVbuerSRHePLV`;
- V3 selected `49:3 / 49:19 / 49:33`;
- hidden long-copy stress `49:47`;
- visible screenshot looked correct;
- KICK / NOTE / DATE roles initially read back as `textAutoResize=NONE` with nominal `10px` heights;
- destination/floor roles already used real auto-height geometry.

This is sufficient repeated cross-item evidence to treat structural readback as the default QA rule rather than an optional experiment.

## New implementation detail verified in ADD-10

A first repair attempt exposed an ordering hazard:

1. setting `textAutoResize='HEIGHT'`;
2. then calling `resize(width, height)`;

can leave/revert a text role to fixed geometry.

The reliable bounded method used in ADD-10 was:

1. load the node's font;
2. preserve/set the intended width and current safe height;
3. call `resize(...)` if needed;
4. set `textAutoResize='HEIGHT'` **after the final resize call**;
5. read back `textAutoResize` and real height;
6. rerun screenshot QA and long-copy stress.

This ordering detail is part of the promoted production rule for fixed-width / variable-height semantic text roles.

## Three-scale evidence

ADD-10 V3 after repair:

- whole-item: visually unchanged and PASS;
- reading scale: hierarchy unchanged and PASS;
- actual-size `1400×1980`: PASS;
- long-copy stress: PASS with destination bottom `540`, floor/room top `610`, horizontal arrow top `850`, outside text `0`.

## Regression risk

Do not blindly force every text node to `HEIGHT`.

- content-driven one-line roles can require `WIDTH_AND_HEIGHT`;
- intentionally clipped display type is a separate role and must be explicit;
- mixed-font nodes require all used font ranges loaded before mutation;
- any auto-resize change requires screenshot readback because line breaks may change.

The project rule is **role-appropriate geometry readback and verified auto-resize**, not universal use of one resize mode.

## What must not transfer

Do not transfer ADD-10 palette, direction-arrow geometry, layout, spacing, color fields, or wayfinding art direction. Only the programmatic text QA method and failure fingerprint transfer.

## Receiving-item default

Starting with ADD-11 and later non-Rurubu items, run native-text geometry readback immediately after the first full-size clean-room authoring pass, before visual polish or stress duplication. This prevents visually convincing but structurally invalid text boxes from surviving to late-stage QA.
