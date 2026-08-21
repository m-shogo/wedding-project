# Non-Rurubu shared learning append — ADD-02 destination V3 anchors

Date: 2026-08-21
Owner: non-Rurubu Figma quality task

## NRSL — GENERATED OUTPUT IS NOT AN ASSET UNTIL ROLE-VALID

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: ADD-02 11卓の国別テーブルサイン

### Visible problem

An image-generation attempt returned a polished but semantically unrelated QA/report-style graphic instead of the requested destination fixed-art role. Treating generation success as asset success would have polluted Drive/Figma with a wrong artifact.

### Root cause

The generation transport can succeed while semantic role adherence fails. Asset lifecycle state must therefore distinguish `generated` from `adopted`.

### Bounded response

The artifact was visually rejected immediately. It was not saved to the exact ADD-02 Drive authority, not uploaded to Figma, and not counted as a candidate/master/placed asset.

### Evidence

- source item: ADD-02
- Figma production unchanged for image roles
- new V3 anchors: `149:2 / 149:21`, IMAGE fills 0
- item evidence: `01_paper-items/additional-wedding-items/ADD-02-table-signs/FIGMA-DESTINATION-LEXICON-V3-ANCHOR-QA-2026-08-21.md`

### Transferable principle

For generated/composed production art, use explicit states: `GENERATED → ROLE_VALID_CANDIDATE → ADOPTED → DRIVE_MASTER_VERIFIED → PLACED → THREE_SCALE_VERIFIED`. A failure at role validity must stop the lifecycle before Drive/Figma placement.

Do not transfer any ADD-02 palette, destination motif or layout.

## NRSL — DESTINATION FAMILY DIFFERENTIATION CAN COME FROM MATERIAL/ATMOSPHERE ROLE, NOT SHARED HERO GEOMETRY

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source: ADD-02 HAWAII/JAPAN V3 anchors

### Visible problem

Earlier subtraction studies removed repeated abstract shapes but became generic modernist posters or replaced one repeated metaphor with another. Destination identity remained weak.

### Bounded experiment

Two blank-frame anchors were built with different material/atmosphere roles while keeping only physical size and semantic information roles constant:

- HAWAII `149:2`: coastal light / wind-ripple print field;
- JAPAN `149:21`: paper / light / offset-sheet detail field.

### Result

At 500px thumbnail and 1200px reading scale, the pair remains more distinguishable through material/light behavior than the rejected A–D study while retaining more wedding warmth. Both roots remain 1000×1480, native text 6/6 auto-height after repair, outside text 0, IMAGE fill 0.

A long-copy stress also found a HAWAII headline/description overlap after auto-height was corrected; the description lane was moved and revalidated. This reinforces the existing rule that spatial changes require fresh dynamic-copy stress.

### Regression risk

A material/atmosphere role can itself become a new template if mechanically repeated across all destinations. This is not permission to assign one texture preset per country or to use cultural stereotypes.

### Next receiving experiment

Test one materially different destination family/item where the subject itself should be distinguishable without relying only on labels. Verify whether distinct material/atmosphere roles improve specificity without fragmenting family coherence. Keep this as a hypothesis outside destination-family contexts until independently reproduced.

## NRSL — MATERIAL DIVERSITY CAN STILL CONVERGE ON ONE LAYOUT SKELETON

State: `OBSERVED → TESTED_LOCAL → VERIFIED_LOCAL`
Source: ADD-02 HAWAII/JAPAN/ITALY three-anchor family comparison

### Visible problem

A third blank-frame destination, ITALY `150:2 / TRAVERTINE PORTICO LIGHT`, successfully introduced a new material vocabulary—sun-warmed stone, portico light/shadow and restrained terracotta—without copying HAWAII or JAPAN fixed decoration. Individually it was a credible destination-specific sign. However, a same-scale three-anchor family board showed a new convergence risk: JAPAN and ITALY both settled into a dark edge + pale main field + strong upper destination title skeleton, while the V3 row as a whole was calmer than the existing production row.

### Root-cause hypothesis

Changing surface vocabulary is not enough when the compositional skeleton stays similar. A design family can stop looking like a recolored template yet still feel system-generated if edge-field position, hero-title position, information lane, and visual mass distribution repeat too predictably. In addition, destination specificity can improve while emotional celebration energy declines.

### Bounded test

- new Italy blank-frame root: `150:2`
- hidden long-copy stress: `150:20`
- same-scale review board: `152:2`
- V3 top row: HAWAII `149:2`, JAPAN `149:21`, ITALY `150:2`
- current-production bottom row: HAWAII `2:2`, JAPAN `2:47`, ITALY `2:11`

The board was screenshot-reviewed and then hidden as QA evidence.

### Three-scale / structure evidence

Italy selected:

- 1000×1480 actual canvas PASS;
- 6/6 native text roles auto-height after repair;
- outside text 0;
- IMAGE fill 0.

Italy realistic long-copy initially exposed two defects:

1. helper order had silently reset all selected+stress text from intended auto-height to fixed-height `NONE`;
2. after auto-height repair, the long description entered the lower stone plinth.

Fonts were loaded, all text roles were restored to `HEIGHT`, the plinth was moved to y=1290 / h=60, the date to y=1380, and decorative masonry joints were reduced in opacity. Stress screenshot then passed with the description ending above the plinth and no outside text.

### Result

`VERIFIED_LOCAL`: material/atmosphere differentiation is useful, but not sufficient for family promotion.

The V3 anchors increased destination specificity. They did **not** yet beat mature production as a family because:

- layout-skeleton similarity remained visible between multiple V3 anchors;
- current production still carried stronger pop/celebration energy at thumbnail scale.

Therefore no production sign was replaced and no remaining destination was bulk-generated from the V3 anchors.

### Transferable principle

When a multi-item print family is being diversified, inspect at least four layers separately:

1. content semantics;
2. material/atmosphere vocabulary;
3. layout skeleton / mass distribution;
4. emotional energy at family thumbnail scale.

A family should not be promoted merely because layer 2 became more varied. If layer 3 still repeats or layer 4 regresses, method-switch before rollout.

### Regression risk

Overcorrecting skeleton diversity can make the family look like unrelated brands. The test is not “every page must have a unique layout”; it is whether each item's composition is justified by its semantic/place role while family typography, production quality and wedding world remain coherent.

### What must remain item-specific

Do not transfer the HAWAII coastal field, JAPAN paper field, ITALY portico treatment, their palettes, edge widths, headline positions, or table-sign proportions to other items.

### Next receiving experiment

Within ADD-02 only, any next destination experiment must change both the place-derived material role **and** the layout skeleton, while explicitly targeting stronger celebration energy. Outside ADD-02, treat this as a QA hypothesis for any multi-item suite that appears varied by color/texture but still feels templated when seen together.
