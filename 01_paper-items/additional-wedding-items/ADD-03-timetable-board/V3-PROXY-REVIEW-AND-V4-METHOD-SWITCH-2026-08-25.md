# ADD-03 当日タイムテーブル — V3 proxy review / clean-room method switch / 2026-08-25

State: `TESTED_LOCAL / V3_NOT_READY_FOR_FIGMA / V4_SCRATCH_REJECTED / CURRENT_PRODUCTION_RETAINED`

## Live authority

- run-start / write-base `main`: `88ca764601b64f47e0876acfa3a0a336499012a8`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Hybrid authority: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- shared-learning authority: `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`
- exact Figma file: `woFUHUqZcvNkih8o42xeH4`
- retained Current A2: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`
- retained Current A3: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

No Rurubu item-specific Figma / Drive / asset / ledger / GitHub path was inspected or modified. Only neutral shared principles were consumed.

## Fresh live Current review

A2 `14:2` was freshly rendered from live Figma at native `1400×1980` (rendered review image `990×1400`). Current still reads quickly and cleanly:

- strong Japanese headline;
- immediate 14:10 → 14:40 → 15:00 chronology;
- no card/UI containment;
- wide cream paper field;
- clear final closing copy.

Its main art-direction limit remains the same: it is closer to a sober printed programme than a joyful one-day journey. This is a visual opportunity, not a structural failure, so Current remains untouched.

## V3 fixed-art proxy review

The committed V3 asset was reviewed again with representative native-text mass placed only in a local non-production proxy. No text was baked into the SVG.

Fixed art reviewed:

- `studies/vnext-2026-08-25/one-day-route-foldout-fixed-art-v3.svg`
- SVG blob SHA: `8dd1ddc405b8b074165771d1470925ce97c2fb30`

Representative semantic roles used only confirmed facts / placeholders:

- `今日を、ひらく。`
- `2026.10.24 SAT / YOKOHAMA`
- `14:10 / 挙式 / 14:10–14:40 / [挙式のご案内]`
- `14:40 / 次の時間へ / [14:40–15:00 のご案内]`
- `15:00 / 披露宴 / 15:00–17:30 / [披露宴のご案内]`
- closing-copy mass.

### Whole-item result

`REJECT_FOR_FIGMA_ASSEMBLY_IN_CURRENT_FORM`

The continuous turquoise S-route is visually memorable, but with real text mass it becomes the dominant object and reads too much like an infographic / transit diagram. The three event rows then feel attached to a large diagram instead of belonging to a wedding-day printed artifact.

The top coral/yellow fold also becomes a poster-like headline field when paired with the full Japanese headline. V3 therefore increases energy, but it does so by shifting the artifact toward `infographic poster`, which is not a clear improvement over Current.

### Reading-scale result

`REJECT_FOR_FIGMA_ASSEMBLY_IN_CURRENT_FORM`

The route terminal marks work technically, but the repeated S-turns create an overly explicit mechanical rhythm. The event blocks become too predictably aligned to the diagram, weakening the intentional editorial asymmetry required by the reopened visual standard.

### Actual-canvas proxy result

`STRUCTURALLY_CLEAN / ART_DIRECTION_REJECTED`

The SVG remains editable and contains no variable text, images, fake credentials or raster. Rejection is purely visual/art-directional, not a vector-quality failure.

## Root-cause hypothesis

Fingerprint candidate: `TRAVEL_GESTURE_OVER_EXPLAINS_CHRONOLOGY`

A travel metaphor can be semantically correct yet still become too literal. When the dominant path explains every event one-by-one, the timetable starts reading like an infographic. For this item, the travel cue should create motion and anticipation without becoming the primary data visualization.

This is `ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL`, not a shared rule.

## Clean-room method switch test

A materially different scratch direction was constructed locally from a blank `1400×1980` canvas using only the same factual/semantic requirements. It did **not** reuse V3 path geometry, Current layout groups or legacy decoration.

Scratch direction: `ACCORDION DAY JOURNEY`

Concept:

- three large asymmetric paper folds entering from the left;
- each fold corresponds loosely to a stage of the day without drawing a route line;
- native text occupies a broad open right-side editorial field;
- no plane, stamp, badge, fake flight data, barcode, gate, route label or decorative English.

Hybrid intent:

- variable/factual/reader-facing copy: native Figma text;
- fixed fold art only: editable SVG candidate;
- generated raster: `0`;
- replaceable image role: `0`.

### Scratch result

`REJECTED`

The direction removed the infographic-route problem, but the repeated colored left-side folds became a new visual module system. At whole-item scale it read like three stacked section tabs / panels. It improved motion but not enough wedding-specific warmth or print sophistication to justify replacing Current.

This confirms that simply changing from `route` to `folds` is not sufficient. The next clean-room direction must avoid both:

1. a literal route diagram that over-explains chronology;
2. repeated equal-ish stage modules that resemble section UI.

No rejected scratch asset was committed as a production candidate and no Drive write was made.

## Figma write status

Current production write: `0`.

The connected Figma write action requires the `figma-use` authoring guidance to be loaded first. That guidance resource was not exposed by the current connector discovery surface in this run, so the write contract was not bypassed. This is a tool-path constraint, not a design blocker.

Because the same guidance-path limitation has appeared before, the run did not waste time repeatedly probing the same write method. It switched to live screenshot review, proxy critique and a new clean-room method test instead.

## Outcome

- Current `DAY BROADSHEET`: retained and untouched;
- Current visual state: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid;
- V3 fixed art: retained as history, but **no longer the preferred direct Figma assembly candidate**;
- V4 scratch: rejected and not promoted;
- image generation: `0` — bottleneck is composition/chronology, not missing imagery;
- Drive write: `0`;
- Figma write: `0`;
- GitHub evidence: this file.

## Next clean-room direction

Do not cosmetically repair the V3 S-route and do not iterate the rejected accordion folds.

Next safe method should start from a new blank frame and use **one broad non-modular movement gesture** that suggests the day opening / moving forward without assigning a graphic connector to each event. Event hierarchy should remain primarily typographic. Only if that new direction beats Current at whole-item scale should it advance to reading / actual-size / long-copy and then A3 independent reflow.
