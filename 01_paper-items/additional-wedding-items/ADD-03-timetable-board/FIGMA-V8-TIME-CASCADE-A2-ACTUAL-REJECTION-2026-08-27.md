# ADD-03 — V8 Time Cascade A2 actual Figma rejection — 2026-08-27

Status: `V8_REJECTED_IN_FIGMA / DAY_BROADSHEET_CURRENT_RETAINED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before this write: `c7261169b6994283e0d7e0407bf5078385c86226`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- retained A2 Current: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`
- retained A3 Current: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`
- exact Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

## Clean-room V8 build performed

The pre-Figma `TIME CASCADE A2` direction was implemented from a new blank `1400×1980` frame rather than duplicating Current or an older study.

Created nodes:

- `49:2 / VNEXT_V8 / ADD-03 A2 / TIME CASCADE / CLEANROOM CANDIDATE / 2026-08-27`
- `49:18 / QA / ADD-03 A2 / TIME CASCADE V8 / LONG COPY / 2026-08-27`

Allowed facts / roles only:

- `2026.10.24 SAT / YOKOHAMA`;
- Ceremony `14:10–14:40`;
- unresolved `14:40–15:00` interval;
- Reception `15:00–17:30`;
- Japanese-first headline/event/guidance/closing roles.

No Current layout, binding spine, rules, V5/V6/V7 fixed art, SVG, generated raster, IMAGE fill, route, card, badge or transport motif was used as construction input.

## Hybrid authoring

- semantic/factual/emotional roles: native Figma text only;
- SVG: `0`;
- generated raster: `0`;
- IMAGE fill: `0`.

This was intentionally the type-first experiment defined by the V8 authority.

## First-pass correction

The first blank build exposed a real Figma typography defect: `14:40` and `15:00` wrapped because their native text measures were too narrow at the intended 154 px display scale.

The repair widened the time measures and rebalanced the adjacent copy lanes. The large time size was not reduced.

After repair:

- all three times remain one line;
- all semantic text remains native;
- all text roles use `textAutoResize=HEIGHT`.

## Three-scale result

### Whole-item / ~500 px

Technically readable and visually more kinetic than Current, but the composition leaves too much inactive lower paper mass and begins to read like a sparse typography exercise rather than a finished wedding-day programme.

### Reading / ~1000 px

Chronology is clear, and the staggered 14:10 / 14:40 / 15:00 rhythm works. However, the event/guidance lanes feel detached from the large times compared with Current's more compact printed-program binding.

### Actual A2 / 1400×1980

Typography remains crisp and editable, but the scale exposes the same weakness: large time numerals plus open paper alone do not create enough artifact-level structure. The closing role is visually isolated in a large lower field.

## Realistic long-copy stress

Stress copy expanded all three guidance roles to two semantic Japanese lines while retaining display scale.

PASS structurally:

- no time/guidance collision;
- no outside text;
- no type shrink;
- no machine-like forced shortening;
- long-copy lanes remain readable.

Stress root `49:18` structure:

- native text roles: `15`;
- fixed-height text: `0`;
- outside text: `0`;
- text-box collisions: `0`;
- IMAGE fills: `0`.

Candidate `49:2` has the same structural counts.

## Final comparison with retained Current

Only after V8 passed its own Figma/long-copy gate was retained `DAY BROADSHEET` revealed for comparison.

Current `DAY BROADSHEET` still wins because:

1. `14:10 → 14:40 → 15:00` is equally immediate;
2. the printed-program/broadsheet structure binds event and guidance copy more convincingly;
3. the page uses its physical field more intentionally;
4. V8 adds movement, but not enough wedding-specific/artifact-specific value to justify replacing a proven Current;
5. V8 risks the same `premium-by-emptiness / layout-exercise` failure already identified in other rejected clean-room studies, even though it avoids card/UI and infographic grammar.

The correct decision is not to rescue V8 with fixed decoration. That would violate the method-switch logic that created V8 in the first place.

## Decision

`V8 TIME CASCADE A2 = REJECTED_IN_FIGMA`.

Current remains unchanged:

`DAY BROADSHEET / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

After decision, V8 evidence was preserved hidden:

- `49:2 / REJECTED / ADD-03 A2 / V8 TIME CASCADE / 2026-08-27`;
- `49:18 / REJECTED QA / ADD-03 A2 / V8 TIME CASCADE / LONG COPY / 2026-08-27`.

## Asset / Drive decision

- image generation: `0`;
- SVG: `0`;
- Drive write: `0`.

No image/illustration bottleneck was established. The failed variable was art direction / page-field use, not missing media.

## Learning state

ADD-03 only:

`TESTED_LOCAL_PRE_FIGMA → V8_BUILT_IN_FIGMA → LONG_COPY_PASS → THREE_SCALE_PASS_STRUCTURALLY → CURRENT_COMPARISON → V8_REJECTED_IN_FIGMA`.

Do not promote staggered-time typography as a cross-item rule. The transferable process lesson is only that type-first clean-room candidates still need artifact-level field use and must clearly beat a retained sellable programme before promotion.

If ADD-03 is revisited again, do not cosmetically mutate V8 or add decorative fixed art to it. A later clean-room direction must start from a materially new item-specific premise.
