# ADD-13 メッセージカード — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / POLICY_FOOTER_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-14

This file began as the 2026-08-02 pre-Figma QA checklist. The live production and reopened visual evidence supersede the stale `PASS_FOR_FIGMA_PREPARATION` state.

## Live production authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- production front: `1:3 / ADD13/A6/FRONT`
- production back: `1:13 / ADD13/A6/BACK`
- Drive folder: `ADD-13_Message_Card` / `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`
- detailed reopened evidence: `docs/automation/add-13-message-card-design-qa.md`

## Current visual / structure QA

Fresh production screenshots and live structure readback reconfirm the Japanese-first letterpress/correspondence V2 direction:

- front uses `ことばを、残す。` as the hierarchy anchor with restrained recipient / intro / body / signer rhythm;
- back remains an open reply surface with three restrained writing rules rather than a boxed form;
- unknown guest-facing recipient/message/signer values remain explicit native editable `LAYOUT DUMMY` text;
- front `1:3`: 700×990, 8 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- back `1:13`: 700×990, 4 native text nodes / 3 visible, 0 IMAGE fill nodes, 0 visible text outside root, `clipsContent=true`;
- no flatten/raster replacement introduced;
- no screenshot-supported need for generated imagery was found.

### 2026-08-14 redundant back policy-footer removal

Fresh 700×990 actual-size review found one remaining proof-sheet signal at the lower left of the back face: `［用途・記名方針等 · LAYOUT DUMMY］` (`4:42 / ADD13V2/Footer`). It described unresolved production/use policy rather than guest-facing content and visually made the otherwise open correspondence surface look like a proof sheet.

Live authority was re-read immediately before the edit: GitHub `main` `efac9261cafec7b17ec5f5f58a8244c68d534eff`; Drive folder `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`; Figma back production root `1:13`.

Rollback-safe proof created before mutation:

- `12:13 / ROLLBACK_ADD13_PRE_POLICY_FOOTER_REMOVAL_2026_08_14` (`visible=false`)
- rollback child `12:2 / ROLLBACK_ADD13_BACK_PRE_POLICY_FOOTER_REMOVAL_2026_08_14`

Only the existing native policy-footer text node was hidden:

- `4:42 / ADD13V2/Footer / ［用途・記名方針等 · LAYOUT DUMMY］` → `visible=false`

No headline, free-writing guide, writing rules, recipient/message/signature semantics, geometry, color, factual value or paper direction was changed.

Post-write actual-size screenshot: `PASS`. The back now reads as a cleaner open reply surface, while the remaining `［自由記入の案内 · LAYOUT DUMMY］` still preserves the unresolved guest-facing instruction role.

Post-write structural readback:

- back root: `700×990`, `clipsContent=true`
- native text: `4`
- visible native text: `3`
- IMAGE fills: `0`
- outside visible text: `0`
- `4:42` reads back hidden
- rollback `12:13` reads back hidden with one child
- no flattening, raster replacement or invented factual copy.

Image decision: `IMAGE_GENERATION_NOT_REQUIRED`. The screenshot-supported defect was redundant proof metadata, not missing imagery. Drive writes: `0`.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / POLICY_FOOTER_REMOVAL_PASS`.

## Rollback / stress evidence

The materially different clean-room comparison, long-copy stress and rollback-safe promotion are recorded in `docs/automation/add-13-message-card-design-qa.md`. Production root IDs remain stable. The current back-footer rollback authority is `12:13`.

## Deferred finalization

- [ ] final recipient/use-case policy
- [ ] final message copy and signer naming convention
- [ ] final date/copy
- [ ] paper stock
- [ ] printer template/profile, exact mm/bleed/export settings
- [ ] 100% physical proof and handwriting/readability check

Do not replace placeholders with invented facts. Keep `NOT_PRINT_READY` until final copy, vendor requirements and physical proof exist.
