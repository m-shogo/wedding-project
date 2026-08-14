# ADD-14 二次会案内 — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`
Updated: 2026-08-14

This file began as the 2026-08-02 pre-Figma QA checklist. The live production and reopened visual evidence now supersede the stale `PREPARED_FOR_FIGMA` state.

## Live production authority

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- production A6: `1:2 / FRAME_AFTER_PARTY_GUIDE_FRONT`
- production A5: `1:18 / FRAME_AFTER_PARTY_GUIDE_A5`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- Drive parent folder: `0ADXt8irGMFGnUk9PVA`
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

### 2026-08-13 placeholder hierarchy polish

Fresh actual-size screenshots showed that the composition itself still passed, but the repeated `LAYOUT DUMMY` suffix was nearly as optically strong as guest-facing copy across venue, time, fee, access, RSVP, contact, QR and notice fields. That made the sellable itinerary read more like a form/proof sheet than intended.

- rollback copies were created first on `99_QA`: A6 `17:2`, A5 `17:27`;
- production roots `1:2` and `1:18` remained stable;
- the semantic placeholder strings were **not removed or fact-filled**;
- the `LAYOUT DUMMY` substring was recolored to a restrained warm-gray secondary hierarchy across 24 occurrences;
- native text/editability remained intact.

### 2026-08-14 suffix-size closure / live readback

The warm-gray recolor alone still left proof metadata optically too large at actual size, so the suffix-only size follow-up was applied without changing semantic fields, facts, QR geometry or composition. Fresh live readback now confirms the closure in production:

- A6 `1:2`: 12 `LAYOUT DUMMY` suffixes at `5.5–7px`, warm-gray; 18 native text nodes; 0 IMAGE fills; `clipsContent=true`;
- A5 `1:18`: 12 suffixes at `7–10px`, warm-gray; 18 native text nodes; 0 IMAGE fills; `clipsContent=true`;
- examples: A6 venue suffix `7px`, time suffixes `7px`, fee/access/RSVP `5.5px`, QR `5.5px`; A5 venue `10px`, times `9px`, fee/access/RSVP `7.5px`, QR `7px`;
- production root IDs remain stable and the existing rollback copies `17:2` / `17:27` remain available;
- fresh A6 actual-size screenshot continues to show the Japanese headline, venue and time hierarchy reading before proof metadata;
- no generated image or Drive asset is required for this item.

Current result: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PLACEHOLDER_SUFFIX_SIZE_PASS`.

## Rollback / edit history

Rollback-safe proofs and the earlier production polish passes are recorded in `docs/automation/add-14-after-party-guide-design-qa.md`. The placeholder-hierarchy rollback copies are `17:2` and `17:27`. Production root IDs remain stable.

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
