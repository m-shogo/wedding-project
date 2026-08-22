# 青春ふたりきっぷ — Actual-size microtype hardening QA / 2026-08-22

State: `CURRENT_REPAIRED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_FACTUAL_MICROTYPE_HARDENED / LONG_ROUTE_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- start/latest `main` before this write: `5ea6f6c8cf8c04100ea8cb1552fdda4a65dd9ffc`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- shared rule applied: `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE = PROMOTED_PROJECT_RULE`
- Figma file: `v7rIRHv8YKQXG0LYD0I5OA`
- Current root: `68:2 / VNEXT_SELECTED_CANDIDATE / SEISHUN FUTARI / DATE PUNCH JOURNEY`
- long-route stress: `69:2 / QA / VNEXT SEISHUN FUTARI / LONG ROUTE STRESS / 2026-08-21`
- exact Drive authority read back live: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- Drive write: `0`
- provisional physical mapping remains `720×250 ≈ 72×25mm`; final MINTIA-case measurement remains required.

## Visible / physical problem

The selected design remained visually strong at enlarged Figma screenshot scale, but the newly promoted project-wide actual-size microtype rule changed the QA question from “does it render?” to “will factual/variable copy remain credible when printed at the intended physical size?”

At the provisional `10 px/mm` working scale, the pre-repair native roles were:

- subtitle `18px ≈ 5.10pt`;
- route `21px ≈ 5.95pt`;
- confirmed date `18px ≈ 5.10pt`;
- party fact `16px ≈ 4.54pt`.

The date and `2名さま` were especially weak as factual information. This did not invalidate the `DATE PUNCH JOURNEY` art direction; it required a bounded typographic repair rather than another clean-room redesign.

No universal minimum-point-size rule is asserted. The judgment is item-specific and balances tiny-label constraints, weight/contrast, information priority, long-route resilience and actual physical scale.

## Rollback-safe bounded test

QA candidates were created without changing production first:

- `72:2 / QA / SEISHUN FUTARI / ACTUAL-SIZE MICROTYPE HARDENING / 2026-08-22`
- `72:14 / QA / SEISHUN FUTARI / ACTUAL-SIZE MICROTYPE HARDENING / LONG ROUTE STRESS / 2026-08-22`

Only native text sizing/leading/y-position for four roles changed:

- subtitle `18 → 20px`, `26 → 28px` line-height;
- route `21 → 24px`, `30 → 34px`, y `158 → 153`;
- confirmed date `18 → 24px`, `24 → 30px`, y `157 → 153`;
- party `16 → 22px`, `22 → 28px`.

Approximate provisional physical sizes after repair:

- subtitle `20px ≈ 5.67pt` — non-factual emotional support;
- route `24px ≈ 6.80pt` — primary variable journey information;
- date `24px ≈ 6.80pt` — confirmed factual information;
- party `22px ≈ 6.24pt` — confirmed factual information.

The large title and `24` punch were intentionally unchanged.

## Screenshot QA

### Selected copy

Fresh `72:2` screenshot: PASS.

The route/date/party roles are materially easier to read while the giant `24` remains the dominant collectible gesture. The bottom lagoon field still reads as one compact ticket-information zone rather than a crowded form.

### Long-route stress

Fresh `72:14` screenshot with `[かなり長い出発地名] → [かなり長い行先名]`: PASS.

At `24px / 34px`, the route remains two lines and ends at y `221`, still inside the 250px root and inside the intended lagoon field. Date and party remain readable beside it without overlap.

## Promotion / rollback

Before promotion, hidden rollback copies were created:

- `72:26 / ROLLBACK / SEISHUN FUTARI / PRE-ACTUAL-SIZE-MICROTYPE-HARDENING / 2026-08-22`
- `72:38 / ROLLBACK / SEISHUN FUTARI / PRE-ACTUAL-SIZE-MICROTYPE-HARDENING / LONG ROUTE / 2026-08-22`

The verified settings were then applied directly to Current `68:2` and stress `69:2`. QA candidates `72:2 / 72:14` were hidden after promotion.

Post-promotion screenshots of Current: PASS.

## Structure readback

Current `68:2`:

- native visible text: `6`;
- fixed-height text: `0`;
- changed-role outside-root text: `0`;
- route bottom `187`;
- date bottom `183`;
- party bottom `216`.

Long-route stress `69:2`:

- native visible text: `6`;
- fixed-height text: `0`;
- changed-role outside-root text: `0`;
- stress route bottom `221`;
- date bottom `183`;
- party bottom `216`.

A raw bounding-box overlap remains between the oversized cropped `24` punch and the subtitle/title region, but this is pre-existing intentional optical overlap from the art direction and fresh screenshots show no glyph collision. No new collision was introduced by the repaired lower information roles.

## Hybrid authoring / assets

- semantic/factual/variable copy: native editable Figma text;
- fixed decorative fields/notches: existing simple native geometry;
- SVG: `0` new;
- generated/composed raster: `0`;
- IMAGE fills: `0`;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the verified defect was actual-size typography, not missing visual material.

## Decision

`ACTUAL_SIZE_FACTUAL_MICROTYPE_HARDENED / PASS`.

The Current `DATE PUNCH JOURNEY` remains the preferred visual direction and keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

`NOT_PRINT_READY` remains until the real MINTIA application area is physically measured, final route text is known, adhesive/paper/finish are selected, and a 100% print applied to the actual case is verified.

This is a receiving-item application of an already promoted project rule, not a new shared-learning rule.