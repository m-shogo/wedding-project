# Rurubu WEDDING — CURRENT POINTER

Status: `V30_ONLY / P02_DESIGN_COMPLETE_AFTER_FINAL_REWORK / 2026-09-03`

V30 is the sole current production version. V20 is history/reference only. Do not create V31 unless explicitly requested.

## Required read set — before production writes

1. `docs/RURUBU-CURRENT.md`
2. actual target-page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. **`assets/rurubu-v30/publication-display-system-manifest.json`**
7. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
8. target page manifest / polish manifest
9. target page ornament/display override when present
10. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
11. page README/production evidence when relevant

For P02, latest owner override is:
`assets/rurubu-v30/p02/post-figma-review-20260903-manifest.json`

Supporting recovered history (not execution authority):
`docs/rurubu-v30/HISTORICAL-LESSON-RECONCILIATION-20260903.md`

Newest explicit owner feedback wins.

Current precedence:
`owner feedback → latest page-specific owner override → publication display system / page ornament authority → global ornament art direction → visual-polish → true-alpha policy → older generic/root/page-main language`

## Workflow ownership

### ChatGPT
- feedback / Visual Master / live Figma screenshot review
- Root/shared/page authority correction
- stale-rule/contradiction cleanup
- Codex handoff
- post-build review

### Codex
- production ImageGen
- true-alpha/cutout preparation
- Figma writes/cleanup/components
- screenshots/exports
- Drive/Git production evidence

ChatGPT does not perform production Figma/ImageGen writes unless the owner explicitly reassigns them.

## Figma authority

File: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `V30_FINAL_PRODUCTION`

- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

## System architecture

### Rurubu / ornament

`RURUBU_EDITORIAL_DNA → V30_ART_DIRECTION → PAGE_VISUAL_LANGUAGE → ORNAMENT_FAMILY → ASSET_INSTANCE`

Plan globally, calibrate families early, produce final page-specific ornaments in context. Do not pre-generate a giant final icon library.

For page-specific major ornaments, exact source reuse is now a separate gate:
- compare source SHA-256 when available;
- inspect live Figma `imageHash` when carry-over is possible;
- exact source reuse across distinct page-specific roles fails unless explicitly declared shared/recurring.

Gate: `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`.

### Display roles

Classify by editorial role, mutability and saliency, not by whether an element contains text:

- `GENERATED_DISPLAY_ASSET`: short locked high-saliency authored title/ribbon/name-label art when current page authority explicitly chooses it
- `NATIVE_TEXT`: long/variable/TBD/personal/frequently changing or not-copy-locked copy
- `SHARED_PUBLICATION_COMPONENT`: recurring cross-page furniture such as PAGE badge
- `PAGE_SPECIFIC_ORNAMENT`: local decorative/editorial art
- `PHOTO`: replaceable photo/proxy

Canonical: `assets/rurubu-v30/publication-display-system-manifest.json`.

A role declaration is not enough. Before design lock, inspect live Figma and confirm the actual node/source matches the declared role.

Gate: `LIVE_ROLE_IMPLEMENTATION_PASS`.

### Shared PAGE badge — HARD

PAGE 01 / 02 / 03... is one publication component system.

Preferred implementation:
`one PAGE_BADGE_SHARED_MASTER → controlled page-number variable/property → instances across pages`

Do not independently generate/redesign a PAGE badge per page.

P01 PAGE 01 is a calibration reference; migrate P01/P02 to the shared master and use the same master for later pages.

`SHARED_PUBLICATION_COMPONENT_PASS` requires actual master/source provenance, not naming or visual similarity alone.

## P01 — LOCKED

P01 `3535:7` remains accepted. Its PAGE badge alone was migrated to instance `3773:2` of shared master `3772:2`; no other P01 object changed.

Do not touch unrelated P01 design/photo/copy/ornament work.

`FINAL_PHOTO_QA_PENDING = YES`
`PRINT_READY = NO`

## P02 — DESIGN COMPLETE AFTER FINAL REWORK

Current screenshot after Codex commit `d730f6b60abd130c3b2e2764a2f40d3bf63df5cc` was reviewed directly in Figma.

### Preserve

- current accepted five rebuilt top/Q2 ornament assets, unless integrated QA later exposes a direct conflict
- SHOGO left/blue, SHIORI right/pink
- three clean photo slots/proxies
- profile sheets
- Q1/Q2 structure; Q1 one inset photo, Q2 none
- profile/Q&A TBD/body copy native
- border/background depth
- P03-P08 untouched

### Generated display targets — COMPLETE

- `ふたりのプロフィール` → `GENERATED_DISPLAY_ASSET`
- `私たちのこと、少しだけ紹介します♪` ribbon → `GENERATED_DISPLAY_ASSET`
- `SHOGO` name label → `GENERATED_DISPLAY_ASSET` family
- `SHIORI` name label → `GENERATED_DISPLAY_ASSET` family

All four are installed as authored image assets with exact canonical copy recorded in `assets/rurubu-v30/p02/production/display/manifest.json`.

### Shared PAGE badge — PASS

P01 and P02 use instances `3773:2` and `3773:9` of the same Figma component master `3772:2`. Only the controlled page-number property differs.

### Page-specific bottom-left tropical — PASS

P02 now uses image hash `7cb821ff0a0dc84928231fa73e05c0bed3a63350`; P01 remains `c4300f9b1f5bf8607ec72da41aa064c2bf52e155`. Exact carry-over is closed.

### Current gates

- five-target calibrated ornament rebuild = `PASS_PRESERVED_AFTER_INTEGRATED_REVIEW`
- `DISPLAY_ROLE_CLASSIFICATION_PASS = PASS`
- `LIVE_ROLE_IMPLEMENTATION_PASS = PASS`
- `DISPLAY_ART_QUALITY_PASS = PASS`
- `SHARED_PUBLICATION_COMPONENT_PASS = PASS`
- `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_FINAL_INTEGRATED_REVIEW`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P02 design is locked. Remaining work is final owner-photo replacement and final-photo/print QA.

## P03+

Inventory/planning may continue. Final page production waits for direct page review and current authority.

For every future page lock, the new live-role, shared-component and exact-source fingerprint gates apply before `FIGMA_DESIGN_COMPLETE = YES`.
