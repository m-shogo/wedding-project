# 青春ふたりきっぷ — Edge-notch subtraction QA / 2026-08-24

State: `CURRENT_REPAIRED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / EDGE_NOTCH_SUBTRACTED / LONG_ROUTE_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start / pre-write `main`: `3a2b26233641c0d32789963350260524100f0eb5`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid policy: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Current root: `68:2 / VNEXT_SELECTED_CANDIDATE / SEISHUN FUTARI / DATE PUNCH JOURNEY`
- long-route stress: `69:2 / QA / VNEXT SEISHUN FUTARI / LONG ROUTE STRESS / 2026-08-21`
- Drive authority live-readback: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- Drive writes: `0`

## Visible problem

Fresh native-size review showed the 10×40 dark rounded rectangles at the extreme left/right edges (`PHYSICAL / LEFT EDGE NOTCH`, `PHYSICAL / RIGHT EDGE NOTCH`) reading less like physical ticket notches and more like mobile/UI handles. They were isolated pills rather than actual cut geometry: they did not change the ticket silhouette, create a perforation, indicate a tear line, bind information, or correspond to a confirmed MINTIA attachment/trim requirement.

After the previously verified removal of the lower-right generic arrival sun, the remaining collectible identity is already carried strongly by the oversized coral `24` date punch and the lagoon route field. The two edge pills added interface-like noise at thumbnail scale.

## Bounded comparison

Rollback-safe comparisons changed only the visibility of the two edge-notch accents:

- normal: `75:2 / QA / SEISHUN FUTARI / NO EDGE NOTCHES / 2026-08-24`
- long-route: `75:14 / QA / SEISHUN FUTARI / LONG ROUTE / NO EDGE NOTCHES / 2026-08-24`

No typography, date/route facts, palette, route field, date punch, dimensions, or semantic role changed.

## Three-scale / stress result

- native `720×250`: PASS — removal makes the ticket read as one continuous physical strip rather than a screen with grab handles;
- thumbnail equivalent: PASS — the coral `24` remains the dominant memorable gesture and the lagoon factual band remains clear;
- reading scale: PASS — title/subtitle and route/date hierarchy are unchanged;
- long-route stress: PASS — `[かなり長い出発地名] → [かなり長い行先名]` remains two lines inside the lagoon field with no new collision.

Decision: adopt the subtraction.

## Promotion / rollback

Before Current mutation, full hidden rollback copies were preserved:

- `76:2 / ROLLBACK / SEISHUN FUTARI / PRE-NO-EDGE-NOTCHES / 2026-08-24`
- `76:14 / ROLLBACK / SEISHUN FUTARI / LONG ROUTE / PRE-NO-EDGE-NOTCHES / 2026-08-24`

Promoted the verified change only to:

- Current `68:2`: `PHYSICAL / LEFT EDGE NOTCH` `68:6` → hidden; `PHYSICAL / RIGHT EDGE NOTCH` `68:7` → hidden
- long-route stress `69:2`: corresponding left/right notch roles → hidden
- completed QA comparisons `75:2 / 75:14` → hidden after verification

## Structure / design-context readback

Current `68:2` post-change:

- visible native text: `6`
- visible fixed-height issue observed: `0`
- IMAGE fills: `0`
- `DECOR / ARRIVAL SUN`: already hidden from prior QA
- left/right edge notches: hidden
- variable/factual copy remains native Figma text

The post-change Figma design-context render confirms only the lagoon field, coral date-punch gesture, and native semantic text remain visible; no raster/photo dependency was introduced.

## Hybrid / image decision

- variable/factual/emotional copy: native Figma text;
- dominant collectible date-punch graphic: retained fixed/vector-like role;
- lagoon route field: retained simple native geometry;
- ambiguous edge pills: removed rather than replaced;
- generated/composed raster: `0`;
- replaceable image role: `0`;
- image generation: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed defect was a false physical cue, not missing imagery, texture, illustration, or atmosphere.

## Learning

`VERIFIED_LOCAL`.

A layer named `PHYSICAL / ... NOTCH` is not automatically a legitimate physical-paper cue. If the rendered mark does not actually alter the silhouette, indicate a verified cut/perforation/tear condition, or bind a real production operation, a small rounded edge mark can regress into mobile/UI-handle semantics.

Do **not** generalize this into “remove ticket notches.” Real silhouette cuts, perforations, tear lines, punch holes, and confirmed attachment geometry remain valid when their physical job is visible and verified.

## Result

`CURRENT_REPAIRED / FALSE_PHYSICAL_UI_CUE_REDUCED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_ROUTE_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

Final physical readiness remains deferred until the actual MINTIA application area, adhesive/paper/finish, final route copy, and 100% physical print/application proof are verified.
