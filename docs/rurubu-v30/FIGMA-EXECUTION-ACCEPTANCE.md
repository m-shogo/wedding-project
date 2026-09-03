# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / DISPLAY_SYSTEM_AND_FINGERPRINT_AWARE / 2026-09-03`

Purpose: prevent a page from being called complete when the **live Figma implementation** disagrees with current authority, shared components are only shared in name, page-specific ornaments reuse identical sources, or high-saliency display art is flattened into generic native treatment despite current page authority.

## Authority

Newest explicit owner feedback wins.

Current execution precedence:

`owner feedback → latest page-specific owner override → assets/rurubu-v30/publication-display-system-manifest.json → page ornament/page-polish authority → assets/rurubu-v30/ornament-art-direction-manifest.json → visual-polish → TRUE-ALPHA policy → this Acceptance gate → older generic/root/page-main language`

Older generic rules remain useful as defaults, but may not override a newer explicit item/page classification.

## Required read set

1. `docs/RURUBU-CURRENT.md`
2. actual target-page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/publication-display-system-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. `assets/rurubu-v30/visual-polish-manifest.json`
7. page manifest / page polish manifest
8. latest page-specific owner/display/ornament override when present
9. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
10. this document
11. page README/production evidence when relevant

For P02, current owner override is:
`assets/rurubu-v30/p02/post-figma-review-20260903-manifest.json`.

## 1. Rurubu editorial DNA — HARD / FIRST

Before judging individual craft, confirm the page reads as Rurubu-style editorial material:

- strong first read;
- photo/information-led hierarchy;
- dense but readable clusters;
- mixed media under one art direction;
- decoration has a job;
- tactile print character without generic stock/AI polish.

A beautiful standalone asset does not override a page-level editorial failure.

Gate: `RURUBU_EDITORIAL_DNA_PASS`.

## 2. V30 art direction / page role — HARD

P01 is a calibration reference, not a page template.

Judge compatibility with the V30 publication as a whole, then fit to the exact page role and Visual Master.

Gates:
- `V30_ART_DIRECTION_PASS`
- `PAGE_ROLE_FIT_PASS`

## 3. Asset role classification — HARD

Classify by **editorial role + mutability + saliency + reuse scope**, not by text-vs-image ideology.

Decision order:

1. repeats across pages with controlled variable content → `SHARED_PUBLICATION_COMPONENT`
2. replaceable photography → `PHOTO`
3. page-specific decoration → `PAGE_SPECIFIC_ORNAMENT`
4. long/variable/TBD/personal/frequently changing or not copy-locked → `NATIVE_TEXT`
5. short, locked, high-saliency authored lettering explicitly authorized by current item/page authority → `GENERATED_DISPLAY_ASSET`

Important:
- names/headings are **not automatically native**;
- names/headings are **not automatically generated**;
- variable semantic copy stays native;
- high-saliency fixed display art may be generated only when current authority explicitly chooses that representation and canonical text is retained in metadata/authority.

Hard reject:
- baking TBD/personal/long copy into generated art;
- keeping a rejected generic native title/name treatment merely because an older generic policy listed names/headings as native;
- generating display copy without exact copy lock;
- using `GENERATED_DISPLAY_ASSET` only for convenience.

Gate: `DISPLAY_ROLE_CLASSIFICATION_PASS`.

## 4. Live role implementation — HARD

**Manifest classification is not implementation proof.** Inspect actual Figma nodes/sources.

Required:
- generated display role → approved authored asset is actually installed;
- native text role → text remains independently controllable;
- shared component role → actual common master/source relationship exists;
- page-specific ornament role → active source provenance is page-specific or intentionally recurring;
- photo role → stable replaceable image/mask contract exists.

Do not accept node names or prior reports as substitutes for live inspection.

Gate: `LIVE_ROLE_IMPLEMENTATION_PASS`.

## 5. Shared publication components — HARD

Recurring furniture is one system, not page-by-page lookalikes.

Confirmed current example:
`PAGE_BADGE_SHARED_MASTER`.

For PAGE badges:
- build one master shell/system;
- page number is controlled variable content;
- P01 onward use the same master/approved source architecture;
- P09+ extends by value, not a new design.

Before PASS, inspect actual Figma master/instance or approved master-source provenance.

Hard reject:
- P01 raster badge + independently designed P02 ellipse badge;
- eight separately generated PAGE PNGs;
- same name/style but no real shared master;
- claiming shared PASS from manifest text alone.

Gate: `SHARED_PUBLICATION_COMPONENT_PASS`.

## 6. Ornament family + exact-source fingerprint — HARD

Use `assets/rurubu-v30/ornament-art-direction-manifest.json`.

Families share visual grammar, not major exact assets.

For page-specific major ornaments, before page lock:
- compare source SHA-256 when available;
- inspect Figma imageHash/source provenance when carry-over is possible;
- an exact hash/source match across distinct PAGE_SPECIFIC_ORNAMENT roles fails unless explicitly declared as allowed recurring/shared material.

Different hashes do not automatically pass; near-duplicate composition still needs visual reuse review.

Gates:
- `ORNAMENT_FAMILY_COHERENCE_PASS`
- `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`
- `REUSE_INTENT_PASS`

Historical recovered rule: **reuse motifs with variation rather than exact cloning**.

## 7. Ornament/display object quality

Only after the higher-level gates pass, judge individual craft quality.

Require:
- publication-grade silhouette/line/detail;
- correct local visual weight;
- no generic clipart/stock-pack feel;
- no hybrid style seam against surrounding content.

Gates:
- `ORNAMENT_OBJECT_QUALITY_PASS`
- `DISPLAY_ART_QUALITY_PASS` when applicable.

## 8. True-alpha and material integrity — HARD

For floating generated art:

`true-alpha generation/export → immediate alpha preflight → Figma`

If direct alpha is unavailable:

`single safe flat matte → one extraction → alpha preflight`

Checkerboard RGB is `GENERATION_ALPHA_FAIL`.

Verify outside transparency and inside intended opacity separately.

Gates:
- `TRUE_ALPHA_PREFLIGHT_PASS`
- `ALPHA_INTEGRITY_PASS`

## 9. Clean photos / copy / border

- Visual Master/page screenshot is never an active photo fill.
- replaceable photos use stable masks/roles.
- newest owner-approved copy wins.
- TBD/personal body copy remains native/separate.
- default depth: `background → border/frame → photos → authored modules → foreground accents`.

## 10. Carry-over status

Allowed statuses:
- `UNREVIEWED_CARRYOVER`
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

`KEEP_REQUALIFIED` requires current visual review **and** source-provenance/fingerprint review when exact reuse is possible.

Prior production status never grants permanent PASS.

## 11. Design-completion gate

Before `FIGMA_DESIGN_COMPLETE = YES`, use the **current Figma screenshot + live node/source inspection**, not only manifests/reports.

Confirm applicable gates:

1. `RURUBU_EDITORIAL_DNA_PASS`
2. `V30_ART_DIRECTION_PASS`
3. `PAGE_ROLE_FIT_PASS`
4. `DISPLAY_ROLE_CLASSIFICATION_PASS`
5. `LIVE_ROLE_IMPLEMENTATION_PASS`
6. `SHARED_PUBLICATION_COMPONENT_PASS`
7. `ORNAMENT_FAMILY_COHERENCE_PASS`
8. `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`
9. `ORNAMENT_OBJECT_QUALITY_PASS` / `DISPLAY_ART_QUALITY_PASS`
10. `REUSE_INTENT_PASS`
11. clean photo-proxy integrity
12. `TRUE_ALPHA_PREFLIGHT_PASS` / material alpha
13. copy safety/sync
14. border/edge/A5 readability
15. final direct Visual Master/current-page comparison

A manifest saying PASS cannot override contradictory live Figma evidence.

## 12. Fast close

For bounded corrections:

`fix reopened scope → bounded dependency/fingerprint/shared-component check once → one integrated final screenshot → protected-page check → one remote sync → close → STOP`

Do not restart unrelated prior-PASS audits unless the patch disturbed them.

## Current calibration

### P01

`MOSTLY_DESIGN_LOCKED / PAGE_BADGE_SHARED_MIGRATION_REOPENED_ONLY / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

Do not reopen unrelated P01 design. Its PAGE 01 badge is a visual reference/source for building the shared PAGE master, not permission to reuse P01-specific ornaments elsewhere.

### P02

`POST_FIGMA_REVIEW_REOPENED_DISPLAY_AND_CARRYOVER`

The five newly rebuilt top/Q2 ornaments remain accepted pending integrated review.

Current reopened scope:
- `ふたりのプロフィール` → generated high-saliency display asset per latest owner override;
- `私たちのこと、少しだけ紹介します♪` → generated ribbon/display asset;
- SHOGO / SHIORI label pair → coordinated generated display family;
- PAGE 02 → shared PAGE master instance, not independent page design;
- bottom-left tropical cluster → replace/remove because live `imageHash` exactly matched P01 left tropical cluster.

Current P02:
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Do not regenerate the already accepted five ornament targets unless the integrated final page review finds a direct compatibility problem.
