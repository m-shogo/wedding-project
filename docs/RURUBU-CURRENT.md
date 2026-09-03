# Rurubu WEDDING — CURRENT POINTER

Status: `V30_ONLY / P02_POST_FIGMA_REVIEW_REOPENED / 2026-09-03`

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

### Display roles

Classify by editorial role, not by whether an element contains text:

- `GENERATED_DISPLAY_ASSET`: short locked high-saliency authored title/ribbon/name-label art
- `NATIVE_TEXT`: long/variable/TBD/personal/frequently changing copy
- `SHARED_PUBLICATION_COMPONENT`: recurring cross-page furniture such as PAGE badge
- `PAGE_SPECIFIC_ORNAMENT`: local decorative/editorial art
- `PHOTO`: replaceable photo/proxy

Canonical: `assets/rurubu-v30/publication-display-system-manifest.json`.

### Shared PAGE badge — HARD

PAGE 01 / 02 / 03... is one publication component system.

Preferred implementation:
`one PAGE_BADGE_SHARED_MASTER → controlled page-number variable/property → instances across pages`

Do not independently generate/redesign a PAGE badge per page.

P01 PAGE 01 is a calibration reference; migrate P01/P02 to the shared master and use the same master for later pages.

## P01 — LOCKED EXCEPT SHARED PAGE BADGE MIGRATION

P01 `3535:7` remains accepted. New owner feedback reopens **only the PAGE badge** so it can migrate into the cross-page shared component system.

Do not touch unrelated P01 design/photo/copy/ornament work.

`FINAL_PHOTO_QA_PENDING = YES`
`PRINT_READY = NO`

## P02 — POST-FIGMA REVIEW REOPENED

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

### Reopened display targets

- `ふたりのプロフィール` → `GENERATED_DISPLAY_ASSET`
- `私たちのこと、少しだけ紹介します♪` ribbon → `GENERATED_DISPLAY_ASSET`
- `SHOGO` name label → `GENERATED_DISPLAY_ASSET` family
- `SHIORI` name label → `GENERATED_DISPLAY_ASSET` family

This latest owner feedback supersedes the older P02-specific rule that forced these four roles to remain native text.

### Shared PAGE badge failure

Current P02 PAGE 02 is a native ellipse/text/heart construction while P01 PAGE 01 is a different completed-art treatment. This is **not** a valid shared-component pass.

Create one shared PAGE badge master and migrate P01/P02 to it; later pages inherit it.

### Exact carry-over failure

`P02_BOTTOM_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER` uses the exact same image hash as `P01_LEFT_TROPICAL_CLUSTER`:
`c4300f9b1f5bf8607ec72da41aa064c2bf52e155`

Status: `REPLACE_REQUIRED`.
Replace with a P02-specific compact `TROPICAL_BOTANICAL` composition or remove if unnecessary. Do not reuse P01 image bytes.

### Current gates

- five-target calibrated ornament rebuild = `PASS_PRESERVED_PENDING_INTEGRATED_REVIEW`
- `DISPLAY_ROLE_CLASSIFICATION_PASS = REOPENED`
- `DISPLAY_ART_QUALITY_PASS = REOPENED`
- `SHARED_PUBLICATION_COMPONENT_PASS = FAIL_CURRENT_PAGE_BADGE_DRIFT`
- `VISUAL_CARRYOVER_PASS = FAIL_EXACT_P01_FLORAL_REUSE`
- `REFERENCE_DELTA_PASS = REOPENED`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

The prior P02 ornament rebuild report is evidence, not a current design lock.

Do not start P03 production until P02 closes or the owner explicitly defers it.

## P03+

Inventory/planning may continue. Final page production waits for direct page review and current authority.
