# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / 2026-09-02`

Purpose: prevent technically clean work from being called complete when asset roles, generated-art quality, transparency, carry-over, copy, photo replaceability, or Visual Master fidelity are wrong.

## Authority

Newest explicit owner feedback wins.

For current execution, `assets/rurubu-v30/visual-polish-manifest.json`, page polish manifests, and `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md` override conflicting older generic/root/page-main execution language.

In particular, any older rule that implies **fixed/stylized text should normally be rasterized/bundled** is superseded. Asset role must be decided first.

## Required read set

1. `docs/RURUBU-CURRENT.md`
2. actual page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. page manifest
6. page polish manifest when present
7. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
8. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
9. this document
10. page README when production exists

For a bounded correction, also read `docs/rurubu-v30/FAST-TARGETED-PATCH-POLICY.md`.

## 1. Asset-role classification — HARD

Before choosing render mode, classify every material visible element as one of:

- `NATIVE_TEXT`
- `SHARED_COMMON_COMPONENT`
- `GENERATED_DISPLAY_ASSET`
- `PAGE_SPECIFIC_ORNAMENT`
- `PHOTO`

Decision order:

1. Cross-page recurring publication furniture? → `SHARED_COMMON_COMPONENT`
2. Text that should remain editable/consistent/separately controllable? → `NATIVE_TEXT`
3. Page-specific decorative art/icon/route/cluster? → `PAGE_SPECIFIC_ORNAMENT`
4. Replaceable photography? → `PHOTO`
5. Only then consider `GENERATED_DISPLAY_ASSET` for a truly inseparable authored object whose copy is locked.

Hard rejects:

- stylized/fixed text called an image asset merely because it is visually rich;
- PAGE-number family independently generated per page when it is a shared system;
- rasterizing native names/titles just to imitate the reference;
- using `GENERATED_DISPLAY_ASSET` as the default bucket when role is ambiguous.

## 2. Shared common components — HARD

Recurring publication furniture must remain one coherent P01–P08 family unless owner/Visual Master explicitly requires a page-specific exception.

Current example: PAGE 01 / PAGE 02 / ... badge family.

Judge typography, backing, stroke, scale, edge relationship, and variable page number as one shared system.

## 3. Page-specific ornament originality — HARD

Travel/tropical/icon/route/sticker art must feel authored for its exact local role.

Reject:

- generic stock/clipart feel;
- obvious same-page copy/paste reuse;
- same or near-identical prominent airplane/route/suitcase/tropical cluster in multiple positions unless repetition is intentional;
- slightly moving/resizing/recoloring an old carry-over and calling it requalified;
- ornament quality materially below the title/photo/paper-module quality bar.

`KEEP_REQUALIFIED` / `REQUALIFIED_CARRYOVER` requires a fresh current-build judgment of visual quality, local context fit, duplication feel, and stock/clipart feel.

## 4. Clean photo proxies — HARD

Visual Master/page screenshots are comparison references only, never active photo fills.

Allowed photo sources:

1. suitable user photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy with no page-layout decoration.

Reject any proxy containing title, border, badge, paper shell, flower, route, frame, page background, or other layout decoration.

## 5. True-alpha generation preflight — HARD

For any generated floating asset that needs transparent surroundings, follow `TRUE-ALPHA-ASSET-GENERATION-POLICY.md`.

Preferred pipeline:

`true-alpha generation/export → immediate alpha-channel preflight → only PASS assets enter Figma`

If direct true alpha is unavailable:

`single safe flat matte → one extraction → alpha preflight`

Never use or request a checkerboard as the matte/background. A visible checkerboard baked into RGB is `GENERATION_ALPHA_FAIL`.

Before Figma placement, require both:

- `ART_QUALITY_PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS`

Figma must not be where fake transparency is discovered for the first time.

## 6. Alpha integrity after cutout — HARD

`TRUE ALPHA ≠ CORRECT ALPHA`.

Verify separately:

- intended outside region is transparent;
- intended paper/vessel/badge/ribbon interiors remain opaque;
- no checkerboard RGB, matte halo, opaque rectangle, fringe, or unintended holes;
- white/cream/light artwork and thin routes/details survive extraction.

Opaque paper/vessel interiors normally use alpha `>= 0.95`, preferably `1.00`.

If one same-family paper/ticket/label/vessel fails inside-opacity QA, run one quick sibling sweep and repair source-side alpha. Do not use rescue rectangles or Figma opacity tricks.

## 7. Border depth — HARD

Default depth:

`background → border/frame → Hero/photos → authored modules → major foreground accents`

unless the Visual Master explicitly requires foreground border overlap.

## 8. Copy safety / copy sync — HARD

Newest owner-approved copy overrides stale generated/native copy.

Unapproved personal facts, readings, profile values, Q&A answers, and other TBD copy must remain separate and non-factual until grounded.

## 9. Visual carry-over — HARD

A clean layer tree does not grant a visual PASS.

Use:

- `UNREVIEWED_CARRYOVER`
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

Existing visible assets have no permanent grandfathered PASS.

## 10. Reference Delta / design completion

Use the current screenshot and actual Visual Master, not layer names or prior reports.

Before `FIGMA_DESIGN_COMPLETE = YES`, confirm the applicable items:

- correct asset-role classification;
- shared components remain coherent;
- ornament originality/carry-over quality;
- clean photo-proxy integrity;
- alpha/material integrity;
- copy safety/sync;
- border depth;
- 3-second hierarchy and high-saliency identity;
- intentional asymmetry and editorial rhythm;
- A5 readability/edge safety.

Structure-only cleanliness is never design completion.

## 11. Fast close

For bounded corrections, use proportional QA:

`fix reopened scope → one bounded dependency/sibling check if required → one integrated final screenshot/QA → protected-page check → one remote sync check → close gates → STOP`

Do not restart unrelated prior-PASS audits unless the patch disturbed them.

## Current calibration

### P01

`DESIGN_LOCKED / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

Do not reopen without new owner feedback.

### P02

`STRUCTURE_COPY_PHOTO_PASS / ORNAMENT_QUALITY_REOPENED`

Preserve accepted structure/photo/copy/alpha/border work.

Current five `REWORK_REQUIRED` ornaments:

- `P02_Q2_PLANE_AND_ROUTE`
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_SUITCASE`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`
- `P02_TOP_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`

P02 returns to `FIGMA_DESIGN_COMPLETE = YES` only after those five pass ornament-originality/carry-over/reference-delta review and all new transparent ornament assets pass true-alpha preflight.
