# ADD-17 子ども向けミニカード / ぬりえ — Playful Activity clean-room comparison QA

Date: 2026-08-22
State: `REJECTED_COMPARISON / CURRENT_FOLDOUT_DISCOVERY_MAP_RETAINED / NO_PRODUCTION_PROMOTION`
Start/latest authority before Git write: `6b00b65ca07c7cc78393055a27c4e27ef1d85186`
Current: `docs/automation/non-rurubu-figma-quality-current.md`

## Why this bounded pass was run

The selected `FOLDOUT DISCOVERY MAP` already holds `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, but a fresh whole-item screenshot raised one legitimate reopen question: the large open activity field is structurally correct and intentionally avoids a rounded worksheet/UI container, yet at thumbnail scale the generous blank field could potentially drift toward an under-authored worksheet if additional playfulness could be added without reducing the child activity surface.

This pass therefore tested whether **more pop / paper-strip rhythm** could improve excitement while preserving the age-independent neutral template and the current anti-UI rule.

Current production was not duplicated or edited.

## Clean-room inputs carried forward

Only verified non-visual requirements were reused:

- physical canvas family: `1110×1540`;
- age-independent child activity / observation role;
- native editable `[お題]`, optional name and date roles;
- large open drawing/writing surface;
- no invented attendance/age/activity facts;
- no generated child/person/animal imagery;
- long-copy, Japanese semantic-line-break and print-writing-surface QA requirements.

No prior production layout, crop, decorative geometry, generated asset or visual composition was used as construction material.

## Three new blank-frame directions

Figma file: `PAvkRggJiRuXVypi3RgZCN`
Study page: `64:2 / QA / ADD-17 / PLAYFUL ACTIVITY CLEANROOM / 2026-08-22`

1. `64:3 / A / FOLDING TREASURE SHEET`
   - physical binding edge + coral header paper + yellow fold corner;
   - fold rules used to create page rhythm without boxing the activity surface.

2. `64:23 / B / OFFSET FIELD TABS`
   - plum field spine + mint/apricot tabs;
   - more compact field-note character.

3. `64:38 / C / PAPER STRIP ADVENTURE`
   - cobalt title band + offset yellow/coral paper strips + mint footer;
   - strongest initial pop / family-diversity signal.

### Important rejection evidence inside the study

Direction B immediately reproduced the now-promoted Japanese semantic line-break failure: `今日、気づいたこ / と。` rendered in-bounds but visibly machine-set. This is a direct reading-scale failure even though there was no overflow requirement violation. B was not considered a viable selected direction.

Direction A remained too close to the current foldout-sheet grammar and did not provide enough new value to justify another redesign cycle.

Direction C was the strongest study direction and therefore received one full-size independent build for serious comparison.

## Full-size serious comparison candidate

- selected comparison: `65:2 / VNEXT_COMPARISON / ADD17 / PAPER STRIP ADVENTURE`
- realistic long-copy stress: `65:20 / QA / ADD17 / PAPER STRIP ADVENTURE / LONG COPY STRESS`
- canvas: `1110×1540`

The full-size candidate was built from a new blank frame rather than scaling or duplicating `64:38`.

Hybrid split:

- variable/semantic copy: native Figma text;
- fixed paper strips / binding / fold cues: simple native geometry;
- generated/composed raster: `0`;
- SVG: `0`;
- replaceable image roles: `0`.

## Screenshot QA

### Whole-item / reading result

The new candidate succeeds at adding brighter color and movement, but the actual screenshot shows a new problem: the three short colored guide rules in the central activity field read as **arbitrary graphic marks / form-like rails** rather than as a physical or semantic part of the activity. The top paper strips also add energy, but they compete with the intentionally open activity surface instead of clarifying it.

Compared with the retained Current `62:2`, the candidate is more colorful but less disciplined. It improves `pop` while regressing:

- activity-surface clarity;
- physical-map plausibility;
- item-specific restraint;
- the anti-template requirement that every decorative mark prove a job.

Therefore additional color alone is not treated as a quality win.

### Realistic long-copy result

Stress screenshot was reviewed with the stress frame temporarily visible and then returned hidden.

The long Japanese title was deliberately set by semantic phrase units and remained readable. The long `[お題]` and hint stayed inside the root. No emergency type shrink was used.

However the same non-semantic colored rails remained visually unnecessary under long copy, confirming that the weakness is art direction rather than text-fit correctness.

## Structure readback

`65:2` selected comparison:

- native text: `6`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`.

`65:20` realistic stress:

- native text: `6`;
- fixed-height text: `0`;
- visible text outside root: `0`;
- IMAGE fills: `0`;
- returned hidden after screenshot QA.

Structure is healthy. The rejection is visual/editorial, not a Figma-integrity failure.

## Decision

`REJECTED_COMPARISON / CURRENT_RETAINED`.

The production Current remains:

- front `62:2 / CURRENT_SELECTED / ADD17 / FRONT / FOLDOUT DISCOVERY MAP`;
- back `62:22 / CURRENT_SELECTED / ADD17 / BACK / ARRIVAL MAP LOG`.

No production node was overwritten, no Drive asset was written, and no generated asset was created.

The retained Current still has the stronger balance of:

- open usable activity area;
- physical foldout-map identity;
- Japanese-first typography;
- family diversity without decorative noise;
- age-independent neutrality;
- print/writing usability.

## Learning

This pass does **not** create a new project-wide rule. Local conclusion only:

> When a child activity surface already has a strong physical-paper role, adding pop through non-semantic strips/rules can create a new form/UI-like grammar even without rounded cards. More color is not sufficient evidence of more joy or better design.

The promoted Japanese semantic-line-break rule was independently useful during the study by rejecting direction B before unnecessary polishing.

## Final-use blocker unchanged

Final adoption remains `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` until authoritative child attendance/count/age/activity and physical medium information exists.
