# Raster / Image → Editable SVG → Figma

State: `PROMOTED_PROJECT_RULE` as a **conditional capability**, by explicit project-wide user direction on 2026-08-15.

Scope: reusable wedding-project design capability. This document does **not** authorize one item owner to inspect or mutate another item's production Figma/Drive/GitHub scope.

## Purpose

Convert a suitable raster, PNG, generated graphic, lettering, icon, logo-like mark, or existing flat design into an SVG that:

- preserves the source silhouette and visual character closely;
- scales without raster degradation;
- remains editable as vectors in Figma;
- allows anchor / Bezier adjustment;
- supports practical recoloring and background changes;
- can be re-exported as SVG for web, app, print, or later design reuse;
- does not force a future editor to return to the raster just to make a small shape change.

The goal is **not** the fewest nodes. The goal is the smallest reasonably understandable vector structure that preserves the source design's identity.

## Conditional-use gate — do not vectorize everything

This is a strong tool, not a default replacement for all raster assets.

### Strong candidates

Prefer this workflow when one or more are true:

- logo / wordmark / independent lettering;
- icon or pictogram;
- flat illustration with meaningful silhouettes;
- map-like linework or simple editorial ornament;
- stamp, seal, symbol, label shape, badge outline, route mark, decorative graphic;
- generated asset that is fundamentally graphic rather than photographic;
- an asset will be recolored, resized aggressively, printed at multiple sizes, or edited repeatedly;
- the raster is only a temporary carrier for geometry that should be semantic/editable.

### Usually keep raster

Do **not** force vectorization for:

- photography;
- complex natural textures;
- food / skin / hair / landscape detail;
- painterly or diffusion-rich imagery whose value is continuous tone;
- assets where auto-tracing would create thousands of meaningless micro-paths;
- one-off raster decoration whose editability value is lower than the complexity cost.

For those, preserve a strong raster master, non-destructive crop, provenance, and role-sized derivative instead.

## Core model: Visual Truth and Working Master are different artifacts

Never collapse high fidelity and editability into one first-pass goal.

Use four explicit states:

1. `ORIGINAL / RASTER`
2. `HIGH FIDELITY SVG` — visual golden reference
3. `CLEAN EDITABLE SVG` — human-editable working master
4. `FINAL CANDIDATE` — clean structure refined back toward visual truth

Pipeline:

`Raster Original → High Fidelity SVG → Clean Editable SVG → Overlay Diff → Manual/AI Cleanup → Final SVG`

### A. High Fidelity SVG = Visual Truth

Optimize first for:

1. outer silhouette;
2. negative space;
3. sharp tips/corners;
4. stroke entry/exit character;
5. thin strokes;
6. spacing between characters/shapes;
7. visual center of gravity;
8. overall proportion and asymmetry.

Anchor count may be high. This copy is allowed to be difficult to edit because its primary job is to preserve what the source should look like.

### B. Clean Editable SVG = Working Master

Create a separate copy and reduce meaningless point density into a smaller set of intentional Bezier curves.

Protect especially:

- sharp terminals;
- small counters / holes;
- negative space;
- asymmetry;
- characteristic curvature;
- thin-to-thick transitions;
- stroke entry/exit behavior;
- corner intent.

Do not optimize for a point-reduction percentage. Optimize for whether another human can understand and safely edit the path.

## Step 1 — prepare the raster for tracing

Before vectorization, improve the tracing input where appropriate:

- transparent background preferred;
- high contrast;
- crisp silhouette;
- remove irrelevant shadow / glow / gradient;
- reduce noise and JPEG artifacts;
- tight crop around the target;
- sufficient source resolution;
- for simple marks, consider a black-on-transparent intermediate;
- use existing alpha rather than tracing a white background.

Do not destroy source detail merely to make the tracer easier. Keep the untouched original beside the prepared tracing input.

## Step 2 — build High Fidelity SVG

Use AutoTrace or equivalent silhouette extraction with conservative settings.

Do not simplify aggressively here. Preserve visual truth first.

Name example:

- `Reference / Raster`
- `Reference / High Fidelity SVG`

Keep the High Fidelity SVG permanently available as a visual reference or rollback artifact.

## Step 3 — build Clean Editable SVG

Duplicate the high-fidelity result or rebuild from it using fewer, meaningful curves.

Prefer manual/local cleanup over one global aggressive simplify when the asset has distinctive corners, tiny counters, or calligraphic transitions.

Recommended sequence:

1. remove isolated noise paths;
2. merge only genuinely redundant overlaps;
3. repair open/closed path intent;
4. simplify locally;
5. retune handles;
6. verify negative spaces;
7. normalize fills/strokes only when doing so does not change appearance;
8. rename semantic layers.

## Step 4 — import into Figma as actual vectors

Figma currently converts imported SVG into editable vector layers rather than treating SVG as an image fill.

Preferred connected-tool route when available:

- call Figma `upload_assets` for the target file;
- POST raw SVG bytes to the returned single-use URL;
- use `Content-Type: image/svg+xml`;
- SVGs are imported as editable vector node trees on the current page.

Plugin/API fallback when appropriate:

- obtain the SVG source string;
- call `figma.createNodeFromSvg(svgString)`;
- treat the created node as an editable imported SVG frame/node tree.

Do not call a PNG placement complete when the requirement is editable vector geometry.

## Step 5 — comparison board

Recommended board structure:

- `01 / ORIGINAL` — Raster PNG
- `02 / HIGH FIDELITY` — traced visual reference
- `03 / CLEAN VECTOR` — editable working master
- `04 / FINAL CANDIDATE` — refined working master

Below or alongside them, include:

- Large
- 320 px
- 180 px
- optional 128 px / 64 px when small-use matters
- Dark
- Light
- Overlay Diff

This board should allow a future editor or agent to understand the conversion state without reading hidden history.

## Step 6 — Overlay Diff is mandatory for meaningful vectorization

Compare the Clean/Final vector directly against Original or High Fidelity under identical dimensions.

Use overlay / opacity / alternating visibility to inspect:

- outer contour drift;
- counter / hole drift;
- width drift;
- shortened terminals;
- rounded corners that were originally sharp;
- excessive fattening/thinning;
- curvature changes;
- changed center of gravity;
- character-to-character spacing changes.

Never tune the Clean vector only by looking at itself.

## Step 7 — multi-scale QA

A large-size match alone is not enough.

Minimum checks:

- Large / detail view;
- ~320 px;
- ~180 px;
- 128 / 64 px when relevant to real usage.

At smaller scales inspect whether:

- thin lines disappear;
- negative spaces close;
- adjacent forms visually merge;
- sharp tips disappear;
- overall weight shifts;
- one character becomes heavier/lighter than the source.

## Step 8 — Light / Dark QA

For monochrome or recolorable assets, test at least:

- dark vector on light background;
- light vector on dark background.

Check for:

- hidden leftover fills;
- unintended stroke/fill mixing;
- small counters that invert poorly;
- outlines that depend on background color;
- masks or clipped remnants visible only in one polarity.

## Step 9 — actual Figma editability QA

`Can open in Figma` is not the same as `can safely edit in Figma`.

Test real edits:

- move a representative anchor by ~1 px;
- adjust a representative Bezier handle;
- recolor the asset;
- alter the background;
- inspect path density;
- inspect duplicate/hidden paths;
- inspect groups, masks, clips and boolean depth;
- verify a future editor can identify the important shapes;
- re-export and re-import a candidate when reuse fidelity matters.

Reject or continue cleanup when:

- anchors are absurdly dense;
- one point move breaks unrelated geometry;
- hidden duplicate paths are abundant;
- mask/clip hierarchy is doing unnecessary work;
- boolean nesting is harder to understand than the source geometry;
- recoloring requires hunting through many accidental fills.

## Figma-specific destructive/non-destructive guardrails

Current Figma behavior matters when cleaning vectors:

### Prefer non-destructive while exploring

- Boolean operations are non-destructive groups and their child layers remain editable.
- Masks are non-destructive and preserve concealed source areas.
- Raster crop is non-destructive.

Use these while the shape strategy is still uncertain.

### Duplicate before destructive vector cleanup

The following Figma operations are destructive and therefore should be used on a Working copy, not the sole Visual Truth:

- Simplify vector path;
- Flatten;
- Outline stroke / convert stroke to vector path;
- Shape Builder edits;
- converting editable text to vector paths when native text still has value.

A destructive operation is acceptable when it materially improves the Working Master and a rollback/reference remains preserved.

## Simplify rule

Never use `Raster → AutoTrace → strong global Simplify → Final` as a one-step pipeline.

Figma's Simplify tool can remove unnecessary points, but simplification is destructive. Prefer bounded local simplification or delete-and-heal on difficult regions, and compare each material cleanup against the High Fidelity reference.

If a second simplify pass starts erasing the same class of detail (tips, counters, narrow gaps, asymmetric curves), treat that as a failure fingerprint and switch to manual/local cleanup rather than another cosmetic retry.

## Boolean / Flatten / Shape Builder decision

Use the least destructive structure that remains understandable:

- **Boolean group** when continued construction/editability is valuable;
- **Flatten** only when layer reduction/compatibility is more valuable than child editability;
- **Shape Builder** only when permanent region merging/subtraction is intentional;
- **Outline stroke** only when stroke geometry itself must become editable/scalable shape geometry.

Do not flatten simply because the layer panel looks busy.

## SVG export/re-import QA

Figma export has important semantics:

- SVG export can outline text into glyphs; preserve native text where editability is required and configure export accordingly.
- Figma may export strokes as fills.
- inside/outside strokes need SVG compatibility handling because SVG natively supports centered strokes.

Therefore keep two separate QA questions:

1. Is the asset editable and correct **inside Figma**?
2. Is the **exported SVG** structurally and visually correct for its downstream destination?

For reusable final vectors, test both.

## Text / lettering rule

If the source is unique lettering, do not replace it with a merely similar font plus simple shapes unless the goal explicitly changes from fidelity to reinterpretation.

For real native copy in a layout, preserve native text instead of outlining merely for visual convenience.

For a logo/wordmark whose custom letterform itself is the asset, vector paths may be appropriate, but retain a source/reference and document the loss of text semantics.

## Failure fingerprints to retain

Normalize recurring vectorization failures instead of retrying blindly.

Examples:

- `AUTOTRACE_NOISE_EXPLOSION` — too many micro-paths from texture/compression;
- `SIMPLIFY_CORNER_EROSION` — sharp tips/corners repeatedly become rounded;
- `NEGATIVE_SPACE_COLLAPSE` — counters/gaps close at small size;
- `WEIGHT_DRIFT` — cleanup changes perceived thickness or center of gravity;
- `MASK_DEPENDENCY_BLOAT` — visual fidelity depends on excessive hidden masks/clips;
- `REEXPORT_STRUCTURE_REGRESSION` — Figma looks correct but exported/re-imported SVG loses intended editability/appearance;
- `RASTER_SHOULD_STAY_RASTER` — tracing produces huge meaningless geometry for photographic/continuous-tone content.

When the same fingerprint fails twice without a capability/input change, switch method or keep the raster rather than polishing the same failed trace.

## Final success gate

A `FINAL VECTOR` is verified only when:

- appearance is close to Original / High Fidelity;
- small-size reading does not collapse;
- Light / Dark checks pass when relevant;
- anchors and handles are human-editable;
- path structure is understandable;
- unnecessary duplicates/hidden shapes are absent;
- colors can be changed without surgery;
- it can be re-exported as SVG;
- downstream SVG rendering is acceptable;
- the raster is no longer required for routine editing, while the original remains archived as provenance/visual truth.

## Shared-learning transfer rule

Transfer the **capability and QA method**, never literal artwork.

Safe cross-item transfer:

- High Fidelity vs Clean Working separation;
- overlay diff;
- multi-scale vector QA;
- Light/Dark QA;
- destructive-operation rollback discipline;
- editability test;
- export/re-import check;
- vectorization failure fingerprints;
- decision gate for whether an asset should remain raster.

Must remain item-specific:

- exact silhouette;
- logos/lettering;
- brand motifs;
- palette;
- visual style;
- current production authority and asset provenance.

## Official Figma references checked 2026-08-15

- Figma Learn — Add images and videos to designs: imported SVG becomes editable vector layers.
- Figma Learn — Vector networks / Edit vector layers: editable paths, points and Bezier behavior.
- Figma Learn — Boolean operations: non-destructive boolean groups.
- Figma Learn — Masks / Crop image: non-destructive concealment/crop behavior.
- Figma Learn — Simplify a vector path: point reduction is destructive; local delete-and-heal is available.
- Figma Learn — Flatten layers: flattening is destructive.
- Figma Learn — Convert strokes to vector paths: outline stroke is destructive.
- Figma Learn — Shape Builder: region merge/subtract is destructive.
- Figma Learn — Export formats and settings: SVG text outlining and stroke-export caveats.
- Figma Developer Docs — `figma.createNodeFromSvg(svg: string)` imports SVG source as a node.
- Connected Figma MCP — `upload_assets` accepts `image/svg+xml` and imports SVG as editable vector node trees.
