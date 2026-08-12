# ADD-14 二次会案内 — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-13

This file began as the 2026-08-02 pre-Figma QA checklist. The live production and reopened visual evidence now supersede the stale `PREPARED_FOR_FIGMA` state.

## Live production authority

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- production A6: `1:2 / FRAME_AFTER_PARTY_GUIDE_FRONT`
- production A5: `1:18 / FRAME_AFTER_PARTY_GUIDE_A5`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- detailed reopened evidence: `docs/automation/add-14-after-party-guide-design-qa.md`

## Current visual / structure QA

Fresh production screenshot and live structural readback reconfirmed the V2 editorial itinerary direction:

- Japanese-first headline and venue hierarchy remain readable before decorative elements;
- reception / start / end use deliberate two-level semantic time placeholders rather than broken form-like wrapping;
- fee / access / RSVP remain compact native editable placeholders;
- QR remains a native replaceable non-scannable placeholder; no fake final QR was introduced;
- A6 `1:2`: 592×420, 18 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- A5 `1:18`: 840×592, 18 native text nodes, 0 IMAGE fill nodes, 0 text outside root, `clipsContent=true`;
- no flatten/raster replacement introduced;
- no new screenshot-supported need for generated imagery was found.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

## Rollback / edit history

Rollback-safe proofs and the two 2026-08-12 production polish passes are recorded in `docs/automation/add-14-after-party-guide-design-qa.md`. Production root IDs remain stable.

## Required input / deferred finalization

These are still authoritative blockers for real-world adoption or print readiness, not blockers for visual progression:

- [ ] whether the after-party will actually be held; otherwise set `NOT_REQUIRED`
- [ ] official venue name / address / floor
- [ ] reception / start / end times
- [ ] fee / payment method
- [ ] access and realistic travel time
- [ ] RSVP method / deadline and contact permission
- [ ] final QR destination plus device scan test
- [ ] printer template/profile, exact bleed/safe area and 100% A6/A5 physical proof

Do not replace placeholders with invented facts. Keep `BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY` until the required authority and physical checks exist.
