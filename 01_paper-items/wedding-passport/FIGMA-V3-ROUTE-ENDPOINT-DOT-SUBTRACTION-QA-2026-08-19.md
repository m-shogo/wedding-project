# WEDDING PASSPORT V3 — route endpoint dot subtraction QA

Date: 2026-08-19
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROUTE_ENDPOINT_DOT_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `52579424ef8259524df3a709d3358b96d578e54d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected front: `144:3`
- selected back: `144:26`
- front long-name stress: `145:4`
- back long-copy stress: `145:29`
- Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

## Visible issue

Fresh whole-item review found two small endpoint dots on the red journey path on both front and back. The route line itself already communicates the travel/journey motif; the dots have no destination label, date, station, map coordinate, physical punch role, or other reader-facing meaning. At thumbnail scale they therefore read more like slider/progress endpoints than semantic journey nodes.

This is the same already-promoted failure family used elsewhere in the non-Rurubu suite: a print line that already carries its meaning should not gain generic endpoint markers unless the markers themselves have a semantic or physical role.

## Bounded comparison

Rollback-safe comparisons were created without touching selected production:

- front: `170:2 / QA / PASSPORT V3 FRONT / NO ROUTE ENDPOINT DOTS / 2026-08-19`
- back: `170:27 / QA / PASSPORT V3 BACK / NO ROUTE ENDPOINT DOTS / 2026-08-19`

Only the two small endpoint vectors on each route were hidden. Native text, cream/dark-green fields, date, Japanese title/message, couple-name placeholder, YOKOHAMA, route curve geometry and surrounding contour lines were unchanged.

Result: both front and back read more like editorial journey lines and less like progress controls. The route remains visually strong without the dots.

## Promotion / rollback

Promoted to selected and matching stress roots:

- selected front endpoints `144:19 / 144:20`: hidden;
- selected back endpoints `144:37 / 144:38`: hidden;
- stress front endpoints `145:20 / 145:21`: hidden;
- stress back endpoints `145:40 / 145:41`: hidden.

Hidden rollback roots created before promotion:

- `171:2` front selected;
- `171:27` back selected;
- `171:44` front stress;
- `171:69` back stress.

Comparison roots `170:2 / 170:27` were hidden after adoption. Retained legacy production was not changed.

## Three-scale / structure QA

- whole/thumbnail front: PASS at ~500px;
- whole/thumbnail back: PASS at ~500px;
- reading back: PASS at ~1000px;
- native root size remains `1480×2100` front/back;
- selected front visible native text: `7`;
- selected back visible native text: `4`;
- stress front visible native text: `7`;
- stress back visible native text: `4`;
- visible text outside root: `0` for selected and stress roots;
- residual small route-endpoint vectors: `0` in selected and stress roots;
- IMAGE fills introduced: `0`.

No variable copy was rasterized or removed.

## Asset / Drive decision

Image generation: `0`.
Drive write: `0`.

The visible weakness was non-semantic native endpoint decoration, not missing imagery.

## Decision

`VERIFIED_LOCAL / ROUTE_ENDPOINT_DOT_SUBTRACTION_PASS`.

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. No new project-wide lesson was added because this directly applies an already-promoted endpoint-marker rule rather than introducing a new failure family.