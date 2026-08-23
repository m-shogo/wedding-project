# 青春ふたりきっぷ — Arrival-sun subtraction QA / 2026-08-23

State: `CURRENT_REPAIRED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ARRIVAL_SUN_SUBTRACTED / LONG_ROUTE_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start / pre-write `main`: `16901f2d4f2c9be8155ed88ff92f9c5bf818a1ce`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid policy: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Current root: `68:2 / VNEXT_SELECTED_CANDIDATE / SEISHUN FUTARI / DATE PUNCH JOURNEY`
- long-route stress: `69:2 / QA / VNEXT SEISHUN FUTARI / LONG ROUTE STRESS / 2026-08-21`
- Drive authority live-readback: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- Drive writes: `0`

## Visible problem

Fresh whole / reading / native-size screenshots showed that the clipped yellow `DECOR / ARRIVAL SUN` at the lower-right corner no longer performed a clear ticket, date, route, trim, notch, or binding function. At thumbnail scale it competed with the compact lagoon information field and read as an additional generic pop shape.

The selected direction already has one strong memorable gesture — the oversized coral `24` date punch — plus the lagoon route field and left/right physical notches. The extra yellow circle diluted that hierarchy rather than strengthening the collectible-ticket identity.

This did not justify another clean-room redesign. It was a bounded fixed-decoration defect inside an otherwise preferred Current.

## Rollback-safe comparison

A QA comparison was created from Current only for bounded evidence, not as a V2/V3 authoring source:

- `73:2 / QA / SEISHUN FUTARI / ARRIVAL SUN SUBTRACTION / 2026-08-23`

Only `DECOR / ARRIVAL SUN` was hidden. No typography, route/date facts, palette of retained roles, notches, dimensions, or information geometry changed.

Comparison result:

- at native `720×250`, the lower-right information cluster became cleaner and the giant `24` remained the clear collectible gesture;
- at thumbnail `360×125`, the design retained pop energy through coral + lagoon contrast without the second clipped circle;
- no information hierarchy or physical-ticket cue was lost.

Decision: adopt the subtraction.

## Promotion / rollback

Before Current mutation, full hidden rollback copies were created:

- `74:2 / ROLLBACK / SEISHUN FUTARI / PRE-ARRIVAL-SUN-SUBTRACTION / 2026-08-23`
- `74:14 / ROLLBACK / SEISHUN FUTARI / PRE-ARRIVAL-SUN-SUBTRACTION / LONG ROUTE / 2026-08-23`

Promoted the verified change only to:

- Current `68:2`: `DECOR / ARRIVAL SUN` `68:5` → hidden
- long-route stress `69:2`: `DECOR / ARRIVAL SUN` `69:5` → hidden

The QA comparison `73:2` was hidden after promotion.

## Three-scale / stress QA

Post-change Current:

- thumbnail / `360×125`: PASS
- reading / native `720×250`: PASS
- actual working canvas / `720×250`: PASS

Post-change long-route stress:

- `[かなり長い出発地名] → [かなり長い行先名]` remains two lines inside the lagoon field;
- date and `2名さま` remain clear;
- removal of the circle creates more stable optical breathing room at the lower-right corner.

## Structure readback

Current `68:2`:

- visible native text: `6`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- `DECOR / ARRIVAL SUN`: hidden

Long-route stress `69:2`:

- visible native text: `6`
- fixed-height visible text: `0`
- outside visible text: `0`
- IMAGE fills: `0`
- `DECOR / ARRIVAL SUN`: hidden

## Hybrid authoring / assets

- semantic/factual/variable copy remains native editable text;
- physical notches and retained color fields remain simple native geometry;
- SVG added: `0`;
- generated/composed raster: `0`;
- IMAGE fill changes: `0`;
- Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported defect was an unnecessary fixed decoration, not missing imagery or atmosphere.

## Decision

Keep `DATE PUNCH JOURNEY` as Current and retain `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

The improvement is subtraction with a specific hierarchy rationale, not a rule to remove color or circles generally. The coral `24` remains because it owns the anniversary/date-punch concept; the yellow arrival circle was removed because it did not own a distinct reader-facing or physical role.

`NOT_PRINT_READY` remains until the actual MINTIA application area, adhesive/paper/finish, final route copy, and 100% physical proof are verified.

## Learning

`VERIFIED_LOCAL`:

When a very small collectible artifact already has one dominant memorable gesture, a second clipped pop shape should prove a distinct semantic or physical job. If it only adds another color accent and competes with compact factual information at thumbnail scale, a rollback-safe subtraction test can improve hierarchy without making the piece less playful.

Do not promote this as a project-wide subtraction rule from one item. Item-specific memorable gestures and physical roles remain authoritative.
