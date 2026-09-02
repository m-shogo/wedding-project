# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-02`

The only current Rurubu WEDDING production version is **V30**.

This file is the entry point. Do not infer current production state from an older chat/report alone.

## REQUIRED READ SET — every production run

Read in this order before changing a V30 page:

1. **This file** — current version / scope / hard boundaries
2. **The actual page Visual Master image** — `assets/rurubu-v30/pXX/PXX.png`
3. **Root machine-readable production authority** — `assets/rurubu-v30/manifest.json`
4. **Current visual-polish / carry-over authority** — `assets/rurubu-v30/visual-polish-manifest.json`
5. **Page-specific authority** — `assets/rurubu-v30/pXX/manifest.json`
6. **Page polish/carry-over authority when present** — `assets/rurubu-v30/pXX/polish-manifest.json`
7. **Pre-build understanding audit** — `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. **Post-build Figma acceptance + feedback gate** — `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
9. **Page README** if that page already has production work — `assets/rurubu-v30/pXX/README.md`
10. broader V30 docs only as needed.

Do **not** treat a manifest alone as sufficient visual authority.

Do **not** treat a clean layer tree as proof that old visual language is gone.

`VISUAL_MASTER_LOCKED ≠ FIGMA_STRUCTURE_READY ≠ FIGMA_DESIGN_COMPLETE`.

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
`VISUAL CARRY-OVER AUDIT`
+
`A5 / PRINT QA`
+
`HUMAN FEEDBACK WRITEBACK`.

Figma is the compositor. It must not invent a cheaper/generic publication personality merely because native primitives are easier to edit.

Image generation is not a quota. Use it where authored visual character is the job; use native Figma where precision/editability is the job.

## Fixed short display text / Identity Anchor rule — HARD

Short fixed text whose visible treatment is part of page identity may use generated/prepared display art. This is not limited to names.

Examples:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori`
- `OUR STORY`
- `OUR JOURNEY`
- Q1–Q6 labels
- short fixed badge/feature/page labels

Keep exact FACT/source strings separately as native/source-of-truth data and QA the visible rendering.

Ordinary body copy, long answers and frequently changing text remain native/editable.

`EDITABLE` does not mean `GENERIC`.

## Photo proxy rule — HARD

There are two proxy jobs:

### STRUCTURAL_PROXY
For clipping / swap / fill-crop / frame independence only.

### VISUAL_PROXY
For hierarchy / visual mass / crop / face/focal relationship / Reference Delta.

A people-dominant Hero requires a people-dominant visual proxy. An unrelated object/landscape can test a mask but cannot prove visual hierarchy.

## Replaceable-photo structure — HARD

For every real-photo slot:
- independent clipped/masked replaceable container;
- image separate from decorative frame/backing;
- photo never spills beyond its slot;
- replacement does not require rebuilding surrounding art;
- actual swap behavior tested.

P05 remains exactly 4 SHOGO FRIENDS + 4 SHIORI FRIENDS = 8 independent friend-photo slots.

## Generated asset granularity — HARD

`ONE INDEPENDENT EDITORIAL OBJECT = ONE IMAGE FILE.`

Do not pack unrelated independently movable parts into one production bitmap.

Simple precision geometry may remain native Figma when that preserves the Visual Master.

## Visual Carry-over Audit — HARD

This is separate from stale-layer cleanup.

A page can have:
- no hidden old layers;
- clean Figma structure;
- valid production PNGs;

and still look old because visible FIRST BUILD assets were intentionally reused.

Therefore any targeted REWORK/promotion must audit **every visible inherited production asset**.

Each inherited asset must become one of:
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

Until current-build comparison exists, status is `UNREVIEWED_CARRYOVER`.

`ADOPTED` / `PRODUCTION_RGBA` / previous PASS / unchanged status do not grant permanent visual acceptance.

When a high-saliency title/Hero/identity anchor is improved, reopen neighboring support assets automatically because the new quality bar can expose them as stale.

A better REWORK may remain CURRENT while this debt is open, but label it:

`PROMOTED_CURRENT_WITH_CARRYOVER_DEBT`

and do not claim final `REFERENCE_DELTA_PASS` / `FIGMA_DESIGN_COMPLETE` until material carry-over debt is resolved or explicitly deferred by the user.

## Anti-UI / anti-template rule

Do not equalize editorial modules merely for reuse.

Preserve Visual-Master-supported differences in:
- width/height;
- photo sizes;
- local offsets;
- icon positions;
- overlap;
- negative space;
- tilt only where evidenced.

Do not add random scrapbook rotation just to look handmade.

## Mandatory post-build acceptance

After Figma work:
1. capture the **current Figma screenshot**;
2. representative visual-proxy check;
3. identity-anchor check;
4. Visual Carry-over Audit;
5. direct Visual Master Reference Delta;
6. anti-UI/coherence check;
7. photo-swap/editability check;
8. A5/print check;
9. human feedback writeback.

Do not accept a technically clean Figma file that fails the first impression or mixed-generation coherence test.

## Current P01 state — IMPORTANT

The targeted P01 REWORK was a clear improvement over FIRST BUILD and was validly promoted into CURRENT `3535:7`.

**Do not roll back to FIRST BUILD.**

However, later owner review + direct live Figma inspection confirmed multiple visible FIRST BUILD production assets were intentionally carried forward. This was not a hidden-layer deletion bug.

Current P01 state is therefore:

`BEST CURRENT PROMOTED`
+
`VISUAL CARRYOVER DEBT OPEN`
+
`FINAL PHOTO QA PENDING`.

Known inherited assets requiring requalification/rework are tracked in:
`assets/rurubu-v30/p01/polish-manifest.json`.

Highest-priority remaining carry-over work:
- Feature 1/2/3 vessels;
- Date ticket backing;
- Bottom story vessel;
- explicit review of names ribbon backing;
- local requalification of OUR JOURNEY stamp / PAGE 01 around any bottom-area changes.

P02 production should not scale this partial-rework method until P01 carry-over debt is resolved or explicitly deferred.

## Completion terminology

Use explicit states:
- `FIGMA_STRUCTURE_READY`
- `REPRESENTATIVE_VISUAL_PROXY_READY`
- `IDENTITY_ANCHOR_PASS`
- `VISUAL_CARRYOVER_PASS`
- `REFERENCE_DELTA_PASS`
- `PHOTO_SWAP_PASS`
- `A5_PRINT_QA_PASS`
- `HUMAN_FEEDBACK_REVIEWED`
- `FIGMA_DESIGN_COMPLETE`
- `FINAL_PHOTO_QA_PENDING`
- `FINAL_PHOTO_QA_PASS`
- `COMPLETE`

## Stop condition for governance

Add a rule only when a concrete/repeated failure exposed a real gap, or truth/print/editability risk requires it.

This carry-over rule qualifies because P01 produced a real failure that stale-layer cleanup and prior Reference Delta reporting did not catch.

Otherwise:

`STOP WRITING RULES → MAKE THE BOOK BETTER.`

**CURRENT = V30. V20 = FROZEN HISTORY.**
