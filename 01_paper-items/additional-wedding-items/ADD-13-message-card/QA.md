# ADD-13 メッセージカード — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-13

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
- all unknown recipient/message/signer/policy values remain explicit native editable `LAYOUT DUMMY` text;
- front `1:3`: 700×990, 8 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- back `1:13`: 700×990, 4 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- no flatten/raster replacement introduced;
- no screenshot-supported need for generated imagery was found.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Rollback / stress evidence

The materially different clean-room comparison, long-copy stress and rollback-safe promotion are recorded in `docs/automation/add-13-message-card-design-qa.md`. Production root IDs remain stable.

## Deferred finalization

- [ ] final recipient/use-case policy
- [ ] final message copy and signer naming convention
- [ ] final date/copy
- [ ] paper stock
- [ ] printer template/profile, exact mm/bleed/export settings
- [ ] 100% physical proof and handwriting/readability check

Do not replace placeholders with invented facts. Keep `NOT_PRINT_READY` until final copy, vendor requirements and physical proof exist.
