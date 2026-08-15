# ADD-10 会場案内サイン — Clean-room V4 Study — 2026-08-15

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / LEGACY_PRESERVED / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority readback

- latest main immediately before evidence write: `680d1a9a8bbfa92c2b0ac3ac366bda932a3c6416`
- Figma file key: `mMfoBkoZ7eVbuerSRHePLV`
- authoring page: `99_QA`
- exact Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive metadata readback: folder verified; Drive writes this iteration: `0`

## Clean-room boundary

V4 was authored from a blank frame using only the current verified facts/constraints already allowed by the ADD-10 authority:

- modular venue-wayfinding role;
- A4 portrait under test at `1400 × 1980`;
- Japanese-first destination hierarchy;
- required direction-arrow role;
- confirmed context `YOKOHAMA` and `2026.10.24 SAT`;
- destination candidate `受付 / RECEPTION`;
- floor / room / exact direction / installation point remain semantic placeholders or explicit TBD authority notes;
- ivory / deep navy / mint / restrained rust accent palette;
- no photography, QR, ticket/passport grammar, barcode, flags, fake operational data, equal-card UI, or raster decoration.

Retained production, V2, and V3 were not visually opened while V4 was being authored. Only top-level page bounds were read to find free canvas space. Legacy comparison happened only after V4 and long-copy QA were complete.

## V4 art direction

Section:

- `32:2 / CLEANROOM_ADD10_V4_TRANSIT_INDEX_2026_08_15`

Candidates:

- `32:3 / CLEANROOM_ADD10_V4_A4_LEFT`
- `32:15 / CLEANROOM_ADD10_V4_A4_RIGHT`
- `32:27 / CLEANROOM_ADD10_V4_A4_FORWARD`

V4 deliberately switches method away from both earlier clean-room grammars:

- no V2 open-field small-arrow prototype grammar;
- no V3 full-height dark side slab / hotel-sign plane;
- the destination typography and direction axis form one transit-index / hanging-sign gesture;
- `受付` is a very large native Noto Serif JP anchor;
- `RECEPTION` and floor/room placeholder remain native editable text;
- the mint direction axis is a new editable SVG/vector tree with one restrained rust endpoint;
- left/right direction axes are independent sign roles rather than a reused retained-production component;
- forward uses a separate vertical-axis composition rather than merely rotating the horizontal frame;
- no raster IMAGE fill or generated fixed decoration is present.

The first whole-family screenshot exposed an accidental white auto-layout fill behind the destination stack. That was treated as a real visual defect, removed, and re-QA'd before any promotion decision.

## Long-copy failure and structural repair

Stress section:

- `33:2 / QA_CLEANROOM_ADD10_V4_LONG_COPY_2026_08_15`

Stress frames:

- `33:3 / QA_LONG_COPY_ADD10_V4_A4_LEFT`
- `33:15 / QA_LONG_COPY_ADD10_V4_A4_RIGHT`
- `33:27 / QA_LONG_COPY_ADD10_V4_A4_FORWARD`

Stress copy used:

- `披露宴会場`
- `RECEPTION HALL`
- `[12F・披露宴会場名が長い場合のLAYOUT DUMMY]`

The first left/right stress screenshot failed: the fixed horizontal direction axis intersected the expanded English/floor-room region after the Japanese destination wrapped to two lines.

The fix was structural rather than cosmetic. Production left/right and their stress copies now use:

- `LAYOUT / DESTINATION + DIRECTION FLOW`
- native vertical auto-layout containing the destination stack followed by the editable direction-axis SVG;
- `90 px` semantic gap between copy and direction axis.

After the repair, the same stress content expanded safely and the arrow moved down with the destination mass instead of colliding.

## Three-scale visual QA

Whole-family / thumbnail-scale:

- V4 family screenshot at approximately 500 px per A4: PASS;
- Japanese destination remains the immediate first read;
- left/right/forward direction is distinguishable without a dark side slab or UI/card containment;
- no fake premium emptiness: the long direction gesture actively uses the mid-page field.

Reading scale:

- clean family screenshot at enlarged review scale: PASS;
- `会場案内 → destination → English/floor-room → direction axis → authority note` reads as one physical wayfinding artifact.

Actual-size/detail:

- `32:3` captured at natural `1400 × 1980`: PASS;
- native Japanese glyph rendering, English spacing, floor-room placeholder, vector axis, and bottom authority note are crisp and credible at source size.

Long-copy screenshot after structural repair:

- left/right/forward: PASS;
- no text-axis collision;
- forward variant remains readable with the longer two-line Japanese destination.

## Structure readback

Production V4:

- `32:3`: `1400×1980`, `clipsContent=true`, native text `6`, IMAGE fills `0`, outside visible text `0`, adaptive destination+axis flow `1`;
- `32:15`: `1400×1980`, `clipsContent=true`, native text `6`, IMAGE fills `0`, outside visible text `0`, adaptive destination+axis flow `1`;
- `32:27`: `1400×1980`, `clipsContent=true`, native text `6`, IMAGE fills `0`, outside visible text `0`.

Stress V4:

- `33:3`: native text `6`, IMAGE fills `0`, outside visible text `0`, adaptive flow `1`;
- `33:15`: native text `6`, IMAGE fills `0`, outside visible text `0`, adaptive flow `1`;
- `33:27`: native text `6`, IMAGE fills `0`, outside visible text `0`.

All variable/factual copy remains native editable text. Direction graphics remain editable vector/SVG nodes. No rasterization/flatten replacement was introduced.

## Post-completion retained-production comparison

Only after V4 and its long-copy repair were complete was retained production opened.

Retained comparison inspected:

- `2:2 / A4_LEFT_LAYOUT_TEMPLATE`

The retained design uses a large full-height deep-navy side field with an ivory arrow and a separate ivory information field. V4 is materially independent in silhouette and reading grammar: it is an ivory full-sheet typographic sign with a long exposed mint direction axis, no side slab, and a much stronger Japanese destination anchor.

Decision: `CLEANROOM_V4_SELECTED`.

V4 clearly improves immediate destination readability at distance, preserves direction as the major functional element, avoids the old split-field silhouette, and stays structurally adaptive under the longer required destination. The retained production, V2, and rejected V3 remain untouched as rollback/comparison history.

## Hybrid authoring split

- destination / English / floor-room / category / context / authority note: native editable Figma text;
- direction axis + arrowhead + endpoint: new editable SVG/vector;
- raster/composed decoration: not required for this role;
- replaceable image role: not applicable.

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`: the visible problem was wayfinding hierarchy and independent physical-sign grammar, not missing pictorial art. Introducing raster imagery would weaken rather than solve the functional sign role.

## Learning

`VERIFIED_LOCAL`: dynamic copy and a functional directional vector should share a structural flow when copy expansion can move into the vector's physical zone. A long-copy PASS from a previous coordinate is not reusable after a spatial relationship changes.

Do not transfer ADD-10's exact transit-index layout, mint axis, serif destination scale, palette, coordinates, or arrow style to unrelated items. Transfer only the method: bind semantically dependent functional graphics to dynamic-copy geometry when collision risk is real, then re-run long-copy stress.

## Deferred finalization

- actual route directions and branching points;
- official floor / room names;
- sign count and placement map;
- stand / wall / tabletop installation method;
- venue existing-sign coordination;
- optional narrow-format adoption;
- printer bleed/profile and 100% physical proof.

These remain `DEFERRED_FINALIZATION` / `BLOCKED_REQUIRED_INPUT` and do not invalidate the current visual/structural candidate.
