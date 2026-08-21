# ADD-03 当日タイムテーブルボード — DAY BROADSHEET family-diversity promotion

Date: 2026-08-21
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PROMOTED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Start/latest authority SHA immediately before evidence write: `82544eecce5f618cd6acacb8d9bc9704d82d5768`
Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Figma: `woFUHUqZcvNkih8o42xeH4`
Drive authority live-confirmed: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

## Why the item was reopened again

The previously promoted `TIDE DAY` A2/A3 family remained strong as an individual timetable and had already passed visual, long-copy and structural gates. The new family-scale shared-learning gate nevertheless exposed a higher-level problem: its dark navy field plus large cyan/yellow/coral rounded sweeps repeated a dominant color/shape/motion grammar already used by unrelated wedding artifacts.

The problem was not that TIDE DAY was locally bad. The problem was that, when the suite is read as a family, another dark saturated field with large capsule/sweep gestures risks making independent paper objects look like one AI/component theme reskinned.

This run therefore reopened only the family-fit/art-direction ceiling. Prior factual and structural evidence was retained; the new direction was authored from blank frames without using the prior visual as an authoring source.

## Clean-room inputs

Only non-visual facts and constraints were reused:

- A2 working size `1400×1980`;
- A3 working size `990×1400`;
- `2026.10.24 SAT / YOKOHAMA`;
- Ceremony `14:10–14:40`;
- unresolved `14:40–15:00` interval retained as native semantic guidance;
- Reception `15:00–17:30`;
- variable/final guidance remains native editable text;
- no invented room, floor, transport credential, QR or venue fact.

No TIDE DAY layout, navy field, rounded sweeps, circle, typography placement, old V2/V3, legacy decoration, image crop, generated asset or old production geometry was used during clean-room authoring. The old Current was opened only after the new candidate had passed its own visual/stress/structure checks.

## Three blank-frame directions

New page: `42:2 / VNEXT_FAMILY_DIVERSITY_B / ADD-03 / 2026-08-21`.

Three materially different A2 directions were built from blank frames:

1. `42:3 / A / BROADSHEET DAY`
   - warm editorial paper with a cobalt binding/spine;
   - Japanese-first headline, simple chronology, thin print rules and a small physical date tab;
   - reads as a printed day broadsheet / program sheet rather than a motion-poster system.
2. `42:22 / B / RISO RHYTHM`
   - plum header and three offset apricot/sky/yellow print blocks;
   - lively but thumbnail QA exposed wrapped `14:40` / `15:00` and the repeated three equal strips risked a card/panel rhythm.
3. `42:39 / C / FOLDED ITINERARY`
   - moss outer field, cream inner sheet, cobalt tab and stamp-like closing field;
   - physically plausible but initial thumbnail also wrapped times and was less distinct than A as a wedding-day timetable.

Direction A was selected.

## Selected DAY BROADSHEET family

A2 selected clean-room root:

- `42:3 / VNEXT_SELECTED_CANDIDATE / ADD-03 A2 / DAY BROADSHEET`

The first A2 thumbnail exposed two visible defects and was repaired before selection:

- time columns were too narrow and `14:40` / `15:00` could break;
- the initial English spine microtype read awkwardly as stacked `DAY BOOK`.

The bounded repair widened the three time roles to 340 px, changed the spine to native Japanese `一 / 日 / の / 旅`, and added a small yellow paper tab `DAY 01 / 10.24`. The composition then held at thumbnail and reading scale without adding more decorative systems.

A3 was authored as a fresh reflow rather than by resizing an old production frame:

- `43:4 / VNEXT_SELECTED_CANDIDATE / ADD-03 A3 / DAY BROADSHEET REFLOW`

## Three-scale screenshot QA

### Whole / thumbnail

PASS on selected A2/A3.

The first read is now paper/program rather than dark event-poster. The strong cobalt binding creates a physical-object cue, while the cream field keeps the timetable dominant. The visual vocabulary no longer depends on large rounded capsules, tide bands or a full dark field.

### Reading scale

PASS.

- `今日を、ひらく。` is the clear headline;
- `14:10 / 14:40 / 15:00` remain the strongest navigational roles;
- event names and guidance form attached editorial information rather than equal UI cards;
- unresolved/final guidance remains visibly separate and native.

### Actual-size / detail

PASS on the A2 higher-resolution render and A3 native render. Rules remain light, type remains crisp, and no screen-only decorative microcopy is required for comprehension.

## Long-copy stress

Rollback-safe stress roots:

- `43:26 / QA / ADD-03 A2 DAY BROADSHEET / LONG COPY STRESS`;
- `43:47 / QA / ADD-03 A3 DAY BROADSHEET / LONG COPY STRESS`.

Ceremony, transfer and reception guidance were expanded to realistic multi-line Japanese copy. A2 and A3 screenshots remained readable with no visible overlap into adjacent time rows or closing copy.

## Structure QA and known text-autoheight repair

Initial structure readback caught a real implementation defect even though screenshots looked healthy:

- A2 selected: only `4/14` visible native text layers were auto-height;
- A3 selected: `0/14`;
- A2 stress: `7/14`;
- A3 stress: `3/14`.

This reproduced the already-known non-Rurubu failure where `resize()` after setting `textAutoResize='HEIGHT'` can silently restore fixed text bounds. This was not logged as a new lesson; the existing cross-item QA method was applied.

The first repair attempt correctly failed because the relevant fonts were not loaded. The method was switched immediately: load `Noto Sans JP Regular/Bold` and `Inter Bold`, then set `textAutoResize='HEIGHT'` after all sizing.

Post-repair readback:

- A2 selected: `14/14` auto-height;
- A3 selected: `14/14` auto-height;
- A2 stress: `14/14` auto-height;
- A3 stress: `14/14` auto-height;
- visible text outside root: `0` on all four roots;
- IMAGE fills: `0`.

Post-repair stress screenshots were re-run and remained PASS.

## Hybrid authoring / image decision

- factual / variable copy: native editable Figma text;
- fixed paper/binding/rules/date-tab roles: editable native geometry;
- reusable SVG roles: `0` required;
- generated raster assets: `0`;
- replaceable IMAGE roles: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED` for this defect. The quality bottleneck was family-scale repetition of palette + hero-shape grammar, not missing photography or illustration. Adding travel imagery would not solve the repeated-system problem and could reintroduce stock/AI-template signals.

## Mature comparison against prior Current

Only after the DAY BROADSHEET family passed clean-room visual, long-copy and structure QA was the prior Current opened.

Prior A2 `14:2` and A3 `15:40` used a dark navy field with large turquoise, yellow and coral rounded motion bands plus an orange circle. Those roots remain individually energetic, but the family-scale comparison confirms that the same saturated-field + rounded-sweep language is now overrepresented across unrelated suite items.

DAY BROADSHEET clearly wins the current family-diversity brief because it changes the underlying physical/compositional grammar—not merely the colors—while preserving immediate timetable scanability.

## Rollback and production promotion

Before replacing the stable Current roots, exact pre-promotion clones were preserved hidden:

- `45:2 / ROLLBACK / ADD-03 A2 / PRE-FAMILY-DIVERSITY / 2026-08-21`;
- `45:22 / ROLLBACK / ADD-03 A3 / PRE-FAMILY-DIVERSITY / 2026-08-21`.

Stable root IDs were retained for downstream references:

- A2 `14:2` → `VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`;
- A3 `15:40` → `VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`.

Post-promotion structure readback:

- A2: `1400×1980`, visible native text `14`, auto-height `14/14`, outside `0`, IMAGE fills `0`;
- A3: `990×1400`, visible native text `14`, auto-height `14/14`, outside `0`, IMAGE fills `0`.

Post-promotion A2/A3 screenshots PASS.

## Professional Design Council score

Final DAY BROADSHEET family-diversity score: **91 / 100**.

- Concept clarity / ownability: `14 / 15`
- Emotional excitement / want-to-look-at-it: `11 / 15`
- Typography / Japanese editorial craft: `14 / 15`
- Composition / hierarchy / rhythm: `14 / 15`
- Travel / journey integration without cliché: `8 / 10`
- Timetable-specific function: `10 / 10`
- Physical print credibility: `10 / 10`
- Editability / realistic-copy resilience: `5 / 5`
- Family fit without template sameness: `5 / 5`

No Executive Creative Director, Japanese Editorial or Print Production veto remains.

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid, now with a stronger family-diversity result.

`NOT_PRINT_READY` remains until the final `14:40–15:00` wording, printer template/bleed/safe-area confirmation, physical A2/A3 proof, installation location and real viewing-distance checks are authoritative.

## Next target

Proceed to ADD-04 family-scale audit. Apply the family-diversity gate to the finished reception-sign Current, but do not mechanically make it look like DAY BROADSHEET. If it needs reopening, derive a new physical/object grammar from reception-sign function and build from blank frames before comparing against the existing Current.