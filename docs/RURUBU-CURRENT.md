# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-02`

The only current Rurubu WEDDING production version is **V30**.

This file is the entry point. It intentionally stays shorter than the detailed production authorities so future agents do not miss the actual Visual Master, page manifest, or execution-feedback gates.

## REQUIRED READ SET — every production run

Read in this order before changing a V30 page:

1. **This file** — current version / scope / hard boundaries
2. **The actual page Visual Master image** — `assets/rurubu-v30/pXX/PXX.png`
3. **Root machine-readable production authority** — `assets/rurubu-v30/manifest.json`
4. **Page-specific authority** — `assets/rurubu-v30/pXX/manifest.json`
5. **Pre-build understanding audit** — `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
6. **Post-build Figma acceptance + feedback gate** — `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
7. **Page README** if that page already has production work — `assets/rurubu-v30/pXX/README.md`
8. **Broader V30 production guide** — `docs/rurubu-v30/README.md`
9. **Production-asset mechanics** — `assets/rurubu-v30/README.md`

Do **not** treat a manifest alone as sufficient visual authority.

Do **not** treat a visually analyzed/locked page as a completed Figma implementation.

`VISUAL_MASTER_LOCKED ≠ FIGMA_DESIGN_COMPLETE`.

## Current Git / Figma authority

Git branch:
`rurubu/v30-final-production-20260901`

PR:
`#878 — Rurubu V30: final production clean-slate`

Figma file key:
`bfM0d4c9dCeBv5pCkJ3TNM`

Figma page:
`V30_FINAL_PRODUCTION`

Board:
`V30 / FINAL PRODUCTION / 2026-09-01` — `3535:2`

Page frames:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

## Locked facts / page roles

- A5 portrait, 8 pages
- trim `148 × 210 mm`
- bleed `3 mm`
- wedding date `2026.10.24`
- couple names `Shogo` / `Shiori`
- P08 decorative barcode digits `2026102400000`

Current page roles:
- P01 Cover / `るるぶ WEDDING`
- P02 Profile + Q1/Q2
- P03 Our Story + Q3/Q4
- P04 All Travel Memories / Our Journey
- P05 Friends Memories only — SHOGO FRIENDS + SHIORI FRIENDS
- P06 Real Life / Favorites / Best Shots + Q5/Q6
- P07 Closing Message / Thank You
- P08 Magazine Back Cover

V20 is frozen history/reference only. Do not create V31 unless explicitly requested.

## Core production doctrine

The target is:

`REAL / REPRESENTATIVE PHOTOS`
+
`PAGE-SPECIFIC AUTHORED IMAGE-GENERATED / PREPARED ART`
+
`PRECISE FIGMA COMPOSITION / MASKS / SOURCE-OF-TRUTH TEXT`
+
`DIRECT VISUAL-MASTER COMPARISON`
+
`A5 / PRINT QA`
+
`HUMAN FEEDBACK WRITEBACK`.

Figma is the compositor. It must not invent a cheaper/generic publication personality merely because native primitives are easier to edit.

Image generation is not a quota. Use it where authored visual character is the job; use native Figma where precision/editability is the job.

## Identity Anchor rule — HARD

High-saliency signature elements such as mastheads, main titles, names lockups and distinctive badges must be judged by visual character, not text correctness alone.

Compare at minimum:
- silhouette;
- letterform character;
- outline/stroke weight;
- dimensional depth/shadow;
- color proportions;
- scale;
- relation to neighboring art;
- authored irregularity.

`EDITABLE` does not mean `GENERIC`.

For ordinary reading/factual copy, keep text native/editable.

For a **short locked identity display** whose visual treatment cannot be reproduced faithfully with native text, visible prepared/display art may be used only when:
- a separate native source-of-truth value/layer is retained;
- visible spelling is QA-checked against that source;
- it is not long/frequently changing copy.

This exception exists to prevent signature elements such as P01 `Shogo & Shiori` from becoming visually generic while preserving factual control.

## Photo proxy rule — HARD

There are two different proxy jobs.

### STRUCTURAL_PROXY
May be used to test:
- clipping;
- swapping;
- fill/crop behavior;
- frame independence.

It does **not** prove visual hierarchy.

### VISUAL_PROXY
Required for Reference Delta when final photos are unavailable.

It must match the Visual Master on hierarchy-relevant semantics such as:
- subject class (people/group/place/object);
- important subject count;
- orientation;
- subject scale;
- focal position;
- face/gesture density when people-led;
- bright/dark visual mass where relevant.

Preferred source order:
1. suitable user-provided real photo;
2. temporary crop from the user-provided Visual Master strictly for calibration;
3. another approved semantically matching proxy.

An unrelated travel-object image can test a mask, but **cannot validate a two-person cover Hero**.

## Replaceable-photo structure — HARD

For every real-photo slot:
- one independent clipped/masked replaceable container;
- image separate from decorative frame/backing;
- `clipsContent = true` for clipping-frame implementations;
- photo never spills beyond its slot;
- replacement does not require rebuilding surrounding editorial art;
- actual swap behavior must be tested.

P05 remains exactly 4 SHOGO FRIENDS + 4 SHIORI FRIENDS = 8 independent friend-photo slots.

## Generated asset granularity — HARD

`ONE INDEPENDENT EDITORIAL OBJECT = ONE IMAGE FILE.`

Do not pack unrelated independently movable parts into one production PNG/sprite/contact sheet.

Simple precision geometry may remain native Figma when that preserves the Visual Master.

Canva is not part of the V30 production design chain.

## Anti-UI / anti-template rule

Do not componentize editorial modules merely because they look related.

Reuse/variants are appropriate only when:
- the modules serve the same semantic purpose;
- differences are predictable;
- reuse preserves page-specific asymmetry and silhouette.

Do not equalize padding, height, radius, icon position or photo geometry merely for implementation convenience.

The book should share publication DNA without looking like eight instances of one UI component.

## Mandatory two-stage visual QA

### Before building: Visual Master Lock
Use `VISUAL-MASTER-LOCK-AUDIT.md`:
- PASS A 24-point review;
- PASS B reverse omission/misclassification audit.

### After building: Figma Execution Acceptance
Use `FIGMA-EXECUTION-ACCEPTANCE.md`:
- capture the **current Figma screenshot**;
- representative visual-proxy check;
- identity-anchor check;
- direct Visual Master Reference Delta;
- anti-UI/componentization check;
- photo-swap/editability check;
- A5/print check;
- human feedback writeback.

Do not accept a technically clean Figma file that fails the first impression.

## Completion terminology

Use explicit states rather than vague `FIGMA_COMPLETE`:

- `FIGMA_STRUCTURE_READY`
- `REPRESENTATIVE_VISUAL_PROXY_READY`
- `IDENTITY_ANCHOR_PASS`
- `REFERENCE_DELTA_PASS`
- `PHOTO_SWAP_PASS`
- `A5_PRINT_QA_PASS`
- `HUMAN_FEEDBACK_REVIEWED`
- `FIGMA_DESIGN_COMPLETE`
- `FINAL_PHOTO_QA_PENDING`
- `FINAL_PHOTO_QA_PASS`
- `COMPLETE`

Technical completion cannot skip visual acceptance.

## Human Feedback writeback — HARD

When user/owner feedback reveals a repeatable failure mode:
- fix the current page;
- write page-specific lessons to the page manifest;
- write systemic lessons to root manifest + `FIGMA-EXECUTION-ACCEPTANCE.md`;
- do this **before repeating the same production method on another page**.

Open systemic learning is `FEEDBACK_DEBT`.

Do not scale a known-bad method across P02–P08 just because P01's file structure is clean.

## P01 pilot calibration — current state

P01 first build proved masks/layers/asset traceability but did **not** pass visual acceptance.

Current P01:
`FIGMA_STRUCTURE_READY / VISUAL_REWORK_REQUIRED / FINAL_PHOTO_QA_PENDING`

Known issues:
- `るるぶ` too simplified/generic;
- `Shogo & Shiori` heavy dark sans instead of hot-pink script/hand-lettered lockup;
- Hero uses unrelated object/travel STRUCTURAL_PROXY;
- `2026` badge weakened;
- Feature 1/2/3 too UI-like;
- Date ticket and bottom story hook too weak/compressed.

Do not use the first P01 build as the visual template for later pages until these lessons are resolved.

## Print boundary

Before print readiness:
- A5 `148 × 210 mm` intent confirmed;
- 3 mm bleed confirmed where required;
- critical faces/text safe;
- final placed raster resolution checked (target about 300 ppi for print graphics);
- current links/assets validated;
- grayscale/thumbnail/contact-sheet/spread QA completed;
- final real photos separately replaced and rechecked.

## Stop condition for governance

Add new rules only when:
- a concrete failure exposed a gap;
- a repeatable failure is visible;
- factual/print/editability risk requires it;
- the user changes creative direction.

Otherwise:

`STOP WRITING RULES → MAKE THE BOOK BETTER.`

The current new rules were added because P01 produced concrete, repeatable visual failures that the prior gates did not prevent.

**CURRENT = V30. V20 = FROZEN HISTORY.**
