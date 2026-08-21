# RSL-185 — When image craft is weak, semantic generated illustration is safer than faux photography, but can still look like a wireframe

Date: 2026-08-21
Source scope/item: Rurubu WEDDING V7 clean-room E
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Observed failure

The first fresh V7 image family successfully entered Figma but the lagoon/flatlay/beach visuals were too geometrically simple to read as professional travel editorial. Continuing the same faux-photographic geometry would have repeated the same design failure with different subjects.

Fingerprint source: `F-RSL-184-TRANSPORT-SUCCESS-ASSET-CRAFT-FAIL`.

## Root-cause hypothesis

When the available generation/authoring capability cannot produce convincing photographic or richly material illustration, a generated raster should perform a clear editorial information role rather than imitate a photograph poorly.

However, semantic purpose alone is not enough. If the map/diagram/field-note is too sparse or generic, the page shifts from “designed editorial graphic” to “wireframe/prototype.”

## Bounded method switch

Instead of generating three more faux photos, the remaining V7 roles used new explicit semantic rasters:

- Memory/Guide: guide-map hash `745fa63d004af783f76f82ffd9ce16bb7d2ee37e`;
- Cafe/Food: food field-note hash `86735a04b23550bbdf69a0a490522f3aede5f259`;
- 1DAY: route/timetable hash `93288eca978aaf004c167b6012a2e282a8cd1d41`.

All final roots passed structural QA with `0` visible text intersections and `0` 18 px native-text safe-area risks.

## Visual result

### Better than repeating faux photography

- each generated raster has an explicit reader-facing job;
- the content role is understandable without pretending the raster is a real destination photo;
- 1DAY especially benefits because route/timing information is inherently diagrammatic;
- publication-role variety improved without adding card/dashboard modules.

### Still not a preferred professional result

- Memory map is too sparse and schematic at actual size;
- Food field-note lacks enough material/food specificity;
- 1DAY route is clear but destination-neutral;
- all remain closer to art-direction prototypes than final travel-magazine artwork.

## Three-scale evidence

Roots:

- Memory/Guide `2156:54`;
- Cafe/Food `2156:84`;
- 1DAY `2156:112`.

500 px family-scale QA: hierarchy readable.
Representative actual-size `794×1123` pages: typography and semantic image roles readable, but lack of art detail is obvious.

## Expected future improvement

For a future print artifact whose available image-generation path is visually weak:

1. stop pretending simple geometry is photography;
2. move the raster toward an explicit information/illustration role;
3. then add enough subject-specific detail, materiality, annotations or visual evidence that it reads as finished editorial artwork rather than a diagram placeholder;
4. keep variable/factual labels native outside the raster;
5. judge at actual size before adoption.

## Regression risk

Do not turn this into “use diagrams instead of photos.” Professional photography may be the correct role when it is available and appropriate. The transferable principle is only to align generated-asset craft with a defensible semantic role and reject both weak faux photography and under-detailed wireframes.

## Transfer boundary

Potentially transferable:

- failure diagnosis;
- method-switch decision;
- separation of semantic role from visual-quality gate;
- actual-size test for prototype/wireframe feel.

Rurubu-specific and non-transferable:

- Hawaii/map/food/route motifs;
- colors, typography, layouts and node IDs;
- V7 winner/preference decision.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-SIX-ROLE-COMPLETION-QA-2026-08-21.md`.
