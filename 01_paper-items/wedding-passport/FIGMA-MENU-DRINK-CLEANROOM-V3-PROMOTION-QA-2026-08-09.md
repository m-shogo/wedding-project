# WEDDING PASSPORT — Menu / Drinks Clean-Room V3 Promotion QA

Date: 2026-08-09
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- Run-start latest `main` observed: `672de252436b0eacb694e6cd5a4690834681695d`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` with `VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Production frame preserved: `02_INSIDE / 18:90 / FRAME_MENU_DRINK`
- V2 comparison: `84:2 / QA_MENU_DRINK_CLEANROOM_V2_EDITORIAL_2026_08_09`
- V2 long-copy failure proof: `86:2 / QA_MENU_DRINK_CLEANROOM_V2_LONG_COPY_STRESS_2026_08_09`
- V3 comparison: `87:2 / QA_MENU_DRINK_CLEANROOM_V3_COLUMNAR_2026_08_09`
- V3 long-copy stress proof: `88:2 / QA_MENU_DRINK_CLEANROOM_V3_LONG_COPY_STRESS_2026_08_09`
- pre-promotion rollback: `89:2 / ROLLBACK_MENU_DRINK_PRE_V3_2026_08_09`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Why V2 was not promoted

V2 was visually stronger than the legacy production but long-copy stress exposed real structural limits: several long course names pushed their content beyond the 80 px content frame, and all five long drink values exceeded the 90 px drink-row model. V2 therefore remained comparison evidence rather than being promoted.

## V3 art direction

V3 removed the tinted drink-panel treatment and rebuilt the page as an asymmetric Japanese-first dining editorial:

- large Japanese title `お料理 / お飲みもの`;
- minimal `MENU / 04` folio rather than decorative English headline;
- wide left course column and narrower right beverage column;
- one thin vertical gold separator instead of a card/panel background;
- six numbered course entries distributed vertically across the sheet;
- five beverage entries distributed independently on the right;
- Japanese allergy/dietary label near the lower reading edge;
- no rounded cards, shadows, gradients, fake transport UI, stamps, airplane motifs, or decorative image filler.

The first V3 screenshot still left too much accidental lower-page emptiness. Native flow spacing was then increased intentionally: course flow `itemSpacing=72`, drink flow `itemSpacing=78`, giving the page a controlled editorial rhythm rather than top-heavy content.

## Long-copy QA

V3 stress proof `88:2` used long Japanese layout dummies for all six course names/descriptions, all five beverage values, and the allergy guidance role.

Measured stress result:

- course flow bottom: `1393 / 2100`;
- drink flow bottom: `1357 / 2100`;
- longest course rows: `102 px` and still contained by auto-layout;
- long drink rows: `85 px` and still contained by auto-layout;
- allergy guidance bottom: `1784 / 2100`;
- no forced 8-guest or unrelated seating assumptions were introduced.

The stress proof remains separate from production and is retained as evidence.

## Screenshot QA

Compared against legacy `18:90`, the promoted V3:

- removes the generic `MENU / DRINK` document look;
- removes the accidental empty lower half and the V2 tinted side panel;
- reads Japanese-first at thumbnail and reading scale;
- uses course numbering and line rhythm instead of repeated cards;
- keeps beverage hierarchy distinct without UI-like containment;
- keeps the allergy role visually separate without turning it into a badge/card.

Actual-detail checks on the first course row and first beverage row showed readable hierarchy and no overlap after the long-copy stress conversion.

## Production promotion

V3 was promoted into the existing production node `18:90`, preserving the production frame ID.

Post-promotion readback:

- production size: `1480 x 2100`;
- direct children: `19`;
- native text nodes: `40`;
- auto-layout frames: `19`;
- IMAGE-fill nodes: `0`;
- raster/flatten replacement: `0`;
- all six course name/note roles use native `textAutoResize=HEIGHT`;
- all five beverage value roles use native `textAutoResize=HEIGHT`;
- previous production preserved as rollback node `89:2`.

## Image-generation decision

Generated imagery was not adopted for this page. The diagnosed defects were composition, hierarchy and text-flow robustness; adding a food/travel image would have been decorative rather than corrective. The page improved materially through typography, paper rhythm and native structure alone.

## Drive

- Drive authority re-read before Figma/Git writes: yes
- Drive changes: `0`
- generated assets adopted: `0`
- duplicate assets created: `0`

## Deferred finalization

Still `NOT_PRINT_READY` until final menu/drink/allergy copy, printer profile/template, exact physical proof and vendor checks exist.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`

Next: continue WEDDING PASSPORT second-pass visual audit on the next live page that still lacks a reopened sellable visual gate; do not treat old structural PASS as visual completion.