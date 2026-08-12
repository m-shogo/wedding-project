# ADD-13 Message Card — Sender Measure Polish — 2026-08-12

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before evidence write: `48ca7725f9a7e81f9356f3d5373e4ebf06038b62`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- item QA: `docs/automation/add-13-message-card-design-qa.md`
- Figma file key: `8ad7bEPAc8I88gs1JxsWhe`
- production front: `1:3 / ADD13/A6/FRONT`
- production back: `1:13`
- exact Drive authority: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- RURUBU/るるぶ area was not read or written.

## Fresh visual defect

A fresh actual-size `700 × 990` production screenshot found one typography defect on the V2 front: native sender placeholder `［差出人名 · LAYOUT DUMMY］` wrapped as `［差出人名 · LAYOUT / DUMMY］` because its fixed measure was only `300 × 38`.

The rest of the Japanese-first correspondence composition remained strong. The back also passed a fresh actual-size spot-check, so no composition redesign was justified.

## Rollback-safe Figma change

Before mutation, the live front was cloned and hidden as:

- `5:2 / ROLLBACK_ADD13_FRONT_PRE_SENDER_MEASURE_POLISH_2026_08_12`

Production root `1:3` was preserved. Only native editable text node `4:32 / ADD13V2/Signature` changed geometry:

- copy remains exactly `［差出人名 · LAYOUT DUMMY］`
- previous box: `300 × 38`
- new box: `380 × 30`
- position remains `64,786`
- font size and content remain unchanged

## Post-write screenshot QA

Fresh actual-size screenshot at `700 × 990` confirms:

- the sender semantic placeholder is now a clean single line;
- it remains aligned with the existing signature rule;
- no collision with date or body roles was introduced;
- Japanese title, recipient field, intro/body hierarchy, navy top band and rust rules remain unchanged.

## Structure readback

Production front `1:3` after the fix:

- `700 × 990`, `clipsContent=true`
- native editable text: `8`
- IMAGE fills: `0`
- text outside root: `0`
- `4:32` remains native editable text, `380 × 30`, `textAutoResize=NONE`
- rollback `5:2` exists and is hidden

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_FIX`.

The defect was text measure/line-break quality, not missing visual content. Drive writes: `0`; exact Drive folder metadata was re-read before the Figma write.

## Decision

`ADD_13_SENDER_MEASURE_POLISH_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
