# ADD-03 当日タイムテーブル — ONE-DAY ROUTE FOLDOUT fixed-art v3 integrated-route QA / 2026-08-25

State: `VERIFIED_LOCAL_PRE_FIGMA / V3_FIXED_ART_CREATED / FIGMA_ASSEMBLY_PENDING / CURRENT_PRODUCTION_UNCHANGED`

## Authority

- run-start GitHub main: `2432e07e1ffc72ea6634c83b3430f95de5f1c944`
- write-base GitHub main: `b13caacecee26d0f9ce8d7312404abf9dbed76c4`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- shared-learning authority: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- exact Figma file: `woFUHUqZcvNkih8o42xeH4`
- retained Current A2: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`
- retained Current A3: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

Rurubu item-specific production was not inspected or touched. Only neutral shared-learning principles were consumed.

## Fresh Current review

A2 Current `DAY BROADSHEET` was freshly rendered from live Figma at native `1400×1980` and reviewed at approximately 500px/reading scale. It remains fast, professional and readable, but still reads primarily as a sober printed program. Travel/departure excitement is present mostly in copy rather than in the physical composition.

Current remains untouched and continues to be the promotion baseline.

## Why v2 was not considered ready for Figma assembly

The committed v2 fixed art improved the first clean-room route study by lengthening the first two route/event anchor slashes and removing fake registration bars. A local native-text proxy then exposed a new art-direction risk:

- the three detached slashes still read as separate signage/timeline modules;
- the thick turquoise route and detached slashes competed for attention instead of behaving as one integrated journey;
- at whole-item scale, this could drift toward wayfinding/infographic grammar instead of a printed wedding-day foldout.

This is not a structure failure. It is an optical/art-direction problem visible only after representative text mass was placed against the fixed art.

## Professional research consumed

No artwork or layout was copied.

- Pentagram Signage & Environmental Graphics: functional wayfinding elements should be integrated into the total experience rather than added as afterthoughts. Transfer here: route/event connectors must belong to one visual system, not look like extra signage marks.
- AIGA Editorial Infographics teaching resource: routes/maps/diagrams should serve a data-driven story and editorial hierarchy. Transfer here: the route must explain chronology, not merely signal “travel”.
- Existing project rule `RSL-008 / NRSL-002`: a line/rail must prove a binding function at whole-item scale; layer naming is not evidence.

## V3 bounded method switch

New editable SVG:

- `studies/vnext-2026-08-25/one-day-route-foldout-fixed-art-v3.svg`
- creation commit: `b13caacecee26d0f9ce8d7312404abf9dbed76c4`

V3 was rebuilt as a materially different fixed-art treatment from v2 rather than cosmetically shortening the same detached slashes.

### Changes

- left cobalt fold reduced from a broad `~330px` mass to a slimmer irregular binding/fold (`~170–218px`) so the route, not the blue field, becomes the main journey cue;
- top departure field reduced to a shallower coral fold with a subordinate yellow fold, leaving more editorial paper visible;
- turquoise route reduced from `42px` to `30px` and reshaped into three rightward bends that approach the event-copy lane;
- detached long slashes removed;
- each event now gets only a short terminal mark attached directly at the end of a route bend (`70px`, `14px` thick), so route + event cue read as one system;
- lower cobalt fold retained as physical closing counterweight;
- no micro registration bars, fake route labels, icons, badges, stamps, gates, flight numbers or decorative English were added.

## Local proxy review

Representative native-text geometry was overlaid locally only to test fixed-art/copy relationships. Proxy copy was not baked into SVG and is not production truth.

Proxy roles used only confirmed facts/semantic requirements:

- headline study mass;
- `2026.10.24 SAT / YOKOHAMA`;
- `14:10–14:40 / 挙式`;
- `14:40–15:00 / 次の時間へ` with unresolved guidance placeholder;
- `15:00–17:30 / 披露宴`;
- closing-copy mass.

### Whole-item result

`PASS_FOR_FIGMA_CANDIDATE` — compared with v2 proxy, V3 has one clearer dominant journey. The route bends visibly deliver the eye toward the three event lanes without detached signage-like slashes. The narrower cobalt fold also restores more paper breathing room.

### Reading-scale result

`PASS_FOR_FIGMA_CANDIDATE` — event copy can occupy a broad right-side lane without the route crossing the copy. The short terminal marks behave as endpoints/binders, not standalone decorations.

### Actual-canvas proxy result

`PASS_FOR_FIXED_ART_ONLY` — 1400×1980 geometry remains clean and editable SVG. Authoritative native Figma typography, semantic line breaks, actual Japanese font assignment and long-copy auto-height still require real Figma assembly.

## Main regression risks for Figma

1. The repeated S-shaped route can become infographic/timeline UI if event copy is too mechanically aligned. Use deliberately unequal event vertical rhythm and editorial optical alignment rather than a rigid grid.
2. The coral/yellow header is intentionally energetic but can become a generic poster field if the headline is too large. Headline must remain strong but not poster-scale.
3. The route terminals must not force narrow Japanese measures. If realistic guidance needs more width, move/refine fixed art before shrinking copy.
4. A3 must be independently reflowed; do not scale the A2 geometry.

## Hybrid authoring contract

### Native Figma text

All factual/variable/reader-facing copy:

- date/location;
- times;
- event titles;
- unresolved 14:40–15:00 guidance;
- all guidance/body copy;
- closing copy.

### Editable SVG

Only fixed non-semantic art:

- slim cobalt fold;
- coral/yellow departure fold;
- turquoise continuous route;
- three short integrated route terminals;
- lower cobalt closing fold.

### Generated/composed raster

`0` — current bottleneck is composition/rhythm, not missing hero/photo/illustration.

### Replaceable image role

`0` required.

## Required Figma next gate

When the required safe Figma authoring guidance is available:

1. re-read latest main + Current + this item QA + Drive authority;
2. create a brand-new blank A2 frame; do not duplicate `14:2`, v2 or any previous production;
3. import v3 SVG as editable vector tree;
4. recreate factual/semantic copy as native text with verified Japanese font and `textAutoResize=HEIGHT` after any explicit resize;
5. candidate-only screenshot QA at ~500px, ~1000px and native/actual-size;
6. realistic Japanese long-copy duplicate;
7. optical review of route terminals vs copy;
8. structure readback: fixed-height 0, outside text 0, IMAGE fill 0;
9. only after the candidate is mature, compare with retained `DAY BROADSHEET`;
10. create A3 independent reflow only if A2 clearly improves excitement without losing timetable recognition.

## Current outcome

- Current production change: `0`
- Current `DAY BROADSHEET`: retained `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`
- new clean-room fixed-art candidate: `1`
- v2 promotion: `not attempted`
- generated raster: `0`
- Drive write: `0`
- Figma write: `0`
- learning state: `VERIFIED_LOCAL_PRE_FIGMA`

V3 is now the preferred clean-room assembly candidate. V2 remains history/comparison and must not be silently treated as Current or deleted.
