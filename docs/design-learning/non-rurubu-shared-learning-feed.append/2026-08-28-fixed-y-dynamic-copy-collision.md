# Non-Rurubu shared learning append — 2026-08-28

Source scope/item: non-Rurubu / ADD-04 受付サイン V4
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Failure fingerprint

`FIXED_Y_DYNAMIC_COPY_COLLISION`

- operation/capability: native editable variable-copy composition;
- environment/tool path: Figma native text, `textAutoResize=HEIGHT`;
- symptom: two individually auto-height roles overlap when the first role grows because the second role still has a fixed Y coordinate;
- cause class: dynamic text sizing without dynamic document flow;
- verified date: 2026-08-28;
- replacement method: semantic Auto Layout/flow container when role B must always follow role A.

## Visible problem

ADD-04 V4 groom/bride reception signs kept optional name and optional guidance as separate native auto-height text nodes. A realistic long-name stress expanded the name to two lines, but the guidance retained its fixed Y coordinate and visibly collided with the expanded name.

The failure was visible in both groom and bride stress roots; this was not a theoretical structure warning.

## Root-cause hypothesis

`textAutoResize=HEIGHT` protects a text node’s own bounds but does not make neighboring fixed-position nodes flow around it. When content B is semantically downstream from variable-height content A, independent absolute Y positions are not a resilient layout contract.

## Bounded experiment

Source Figma file: `qWlF9THLR1G76hLcx1zYOx`.

Failed stress history:

- groom `43:29`;
- bride `43:42`.

Method switch:

- preserve name and guidance as separate native editable text nodes;
- place both inside `INFO / AUTO / VARIABLE NAME + GUIDE` vertical Auto Layout;
- use flow spacing instead of guessing a larger fixed gap;
- do not shrink type.

Passing stress:

- groom `43:57`;
- bride `43:71`.

## Evidence

After the method switch, production and stress roots report:

- native text preserved;
- fixed-height text `0`;
- outside visible text `0`;
- long name pushes guidance down rather than overlapping it;
- screenshot PASS at reading/native scale;
- no IMAGE fill or raster workaround introduced.

Item evidence: `01_paper-items/additional-wedding-items/ADD-04-reception-signs/V4-OPEN-EDGE-PROMOTION-2026-08-28.md`.
Canonical item QA: `01_paper-items/additional-wedding-items/ADD-04-reception-signs/QA.md`.

## Regression risk

Do not replace every fixed-position text group with Auto Layout by default. Absolute positioning can remain correct where roles have fixed/known copy mass or intentionally overlap. A flow container is appropriate when the semantic relationship explicitly means “B follows the variable height of A.”

Auto Layout can also alter optical positioning if introduced mechanically, so whole-item/reading/actual-size screenshot QA remains required after the structural change.

## What must remain item-specific

Do not transfer ADD-04 OPEN EDGE geometry, groom/bride palette, threshold fields, title scale, date position, or reception-sign composition.

## Cross-item applicability hypothesis

On another materially different print artifact, when two or more native variable-copy roles are vertically sequential, stress the upstream role. If downstream content overlaps because only each node’s own height is dynamic, test a semantic flow container rather than adding arbitrary fixed reserve.

Do not promote this to a universal visual-layout rule until reproduced on a materially different item.