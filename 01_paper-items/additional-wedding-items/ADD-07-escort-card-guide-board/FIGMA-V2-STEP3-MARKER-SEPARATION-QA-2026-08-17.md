# ADD-07 エスコートカード案内ボード — V2 Step-3 Marker Separation QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED_A2_A3 / STEP3_MARKER_TEXT_SEPARATION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `7fdd7b22bfad84303678cd00a8144bd853fa0f47`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- selected clean-room A2: `14:3`
- selected clean-room A3: `14:25`
- hidden long-copy stress: A2 `15:4`, A3 `15:27`
- Drive authority: `ADD-07_エスコートカード案内ボード` / `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`
- retained legacy production remains unchanged.

## Visible problem

Fresh whole-item screenshots of the selected clean-room V2 family showed the blue route node for action `03` visually touching / intruding into the first English word `FIND` in `FIND YOUR DESTINATION`, especially on the A3 reflow. The route itself was useful and already passed the clean-room selection gate; the defect was a local marker-to-type collision, not a reason to replace the composition.

## Rollback

Before the bounded edit, hidden rollback copies were created:

- `17:2 / ROLLBACK / ADD-07 V2 A2 / BEFORE STEP3 MARKER REPAIR / 2026-08-17`
- `17:25 / ROLLBACK / ADD-07 V2 A3 / BEFORE STEP3 MARKER REPAIR / 2026-08-17`

## Bounded Figma repair

Only the step-3 circular route marker was shifted left; the action-route path, arrow, typography, copy, page geometry and semantic roles were not changed.

- A2 selected marker `14:10`: local x `728 → 630`
- A3 selected marker `14:32`: local x `533 → 450`
- A2 stress marker `15:11`: synchronized to x `630`
- A3 stress marker `15:34`: synchronized to x `450`

This keeps the marker visually attached to the `03` station while separating it from the English action label.

## Visual QA

Fresh screenshots after repair:

- A2 `14:3` at 1000px long-edge: PASS; `03` remains visually bound to the route, while `FIND YOUR DESTINATION` now starts cleanly to the right.
- A3 `14:25` at 1000px long-edge: PASS; the smaller reflow no longer lets the blue marker touch the English label.
- the route still reads `01 → 02 → 03 → arrow` at whole-item scale.
- no new box, badge, image, shadow, gradient or decorative filler was introduced.

## Structure / long-copy readback

Post-write readback:

- A2 selected `14:3`: `1400×1980`, visible native text `12`, visible text outside root `0`, step-3 marker/text geometric overlap `false`.
- A3 selected `14:25`: `990×1400`, visible native text `12`, visible text outside root `0`, step-3 marker/text geometric overlap `false`.
- A2 hidden stress `15:4`: visible text outside root `0`, step-3 marker/text overlap `false`.
- A3 hidden stress `15:27`: visible text outside root `0`, step-3 marker/text overlap `false`.

No raster IMAGE role was added and no variable copy was flattened.

## Drive / image decision

Drive authority was re-read live and remains `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi`. This defect was route-marker spacing, not missing artwork, so image generation and Drive asset writes were not required.

## Decision

The selected clean-room V2 family remains the current candidate and retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V2_SELECTED_A2_A3 / LEGACY_PRESERVED / NOT_PRINT_READY`.

This polish adds `STEP3_MARKER_TEXT_SEPARATION_PASS` without changing the retained legacy production.