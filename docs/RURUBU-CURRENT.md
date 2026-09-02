# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-02`

The only current Rurubu WEDDING production version is **V30**.

## REQUIRED READ SET — every production run

1. this file
2. actual page Visual Master — `assets/rurubu-v30/pXX/PXX.png`
3. Root manifest — `assets/rurubu-v30/manifest.json`
4. V30 visual-polish override — `assets/rurubu-v30/visual-polish-manifest.json`
5. page manifest
6. page polish manifest when present
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
9. page README when production exists

Newest explicit owner feedback can reopen an older PASS.

## Current work ownership — USER LOCKED

### ChatGPT
- feedback analysis
- actual Visual Master/current screenshot review
- Root/shared/page manifest updates
- contradiction cleanup
- Codex handoff
- post-build review

### Codex
- production ImageGen
- alpha/cutout preparation
- Figma writes/cleanup
- clean proxy placement
- screenshots/exports
- Drive/Git production evidence

ChatGPT must not jump into production Figma/ImageGen while manifest/feedback work is open unless the user explicitly reassigns that work.

## Git / Figma authority

Branch: `rurubu/v30-final-production-20260901`

PR: `#878`

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

Page: `V30_FINAL_PRODUCTION`

Frames:
- P01 `3535:7`
- P02 `3535:9`
- P03 `3535:11`
- P04 `3535:13`
- P05 `3535:15`
- P06 `3535:17`
- P07 `3535:19`
- P08 `3535:21`

The mistaken TEMP `3708:2` was deleted on 2026-09-02. Real P02 `3535:9` must not be touched by P01 cleanup.

## Locked facts / roles

- A5 portrait / 8 pages
- trim `148 × 210 mm`
- bleed `3 mm`
- wedding date `2026.10.24`
- names `Shogo` / `Shiori`
- P08 barcode digits exactly `2026102400000`

Roles:
- P01 Cover / `るるぶ WEDDING`
- P02 Profile + Q1/Q2
- P03 Our Story + Q3/Q4
- P04 All Travel Memories / Our Journey
- P05 Friends Memories only
- P06 Real Life / Favorites / Best Shots + Q5/Q6
- P07 Closing Message / Thank You
- P08 Magazine Back Cover

V20 = frozen history/reference only. Do not create V31 unless explicitly requested.

## Direct Visual Master rereview status

P01/P02/P03 were directly rereviewed from the actual images on 2026-09-02.

Execution authorities:
- P01 `assets/rurubu-v30/p01/polish-manifest.json`
- P02 `assets/rurubu-v30/p02/polish-manifest.json`
- P03 `assets/rurubu-v30/p03/polish-manifest.json`

### P01 fixed-module model

Complete fixed display modules include:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori` + ribbon
- `2026`
- Date ticket
- Feature 1/2/3 shells
- Bottom Story
- `OUR JOURNEY / TAKE A TRIP`
- `PAGE / 01`

Replaceable photo slots remain separate:
- Hero
- Feature 1
- Feature 2
- Feature 3

Current Date display copy:
- `WEDDING DATE`
- `2026.10.24`
- `SAT`

### P02 rereview model

- `ふたりのプロフィール` top area is one authored header ecology
- SHOGO/SHIORI bubbles are fixed display modules after exact copy approval
- profile-sheet shells may be prepared art while personal values remain separate until copy-lock
- Q1/Q2 are related but non-identical
- Q1 alone has an inset couple photo
- left=SHOGO/blue, right=SHIORI/pink
- clean standalone proxies only

### P03 rereview model

- `OUR STORY + ふたりのこれまで` form one header system
- intro sentence stays separate until copy-lock
- Step 1–5 are individually authored modules
- one continuous route spans multiple steps and remains independent
- Step 1–4 have photo relationships; Step 5 intentionally has no photo
- Q3/Q4 are related but non-identical
- Hero + four support photos use clean standalone proxies
- Hero pink tape remains independent
- Wedding Day card and PAGE 03 may be complete fixed modules

## Systemic production rules

### Fixed bundled display modules

Short fixed text/numbers may be generated/prepared together with their vessel/background/icon/attached accents when they move as one authored object.

Visible fixed display text does not need to remain editable in Figma.

Long/TBD/personal/frequently changing copy and replaceable photos remain separate.

### Clean photo proxies

Visual Master is comparison authority, not photo source.

Never use page-master crops or page screenshots as active photo fills.

### Alpha Integrity — HARD

`TRUE ALPHA ≠ CORRECT ALPHA`.

For RGBA modules, verify both:
1. intended outside transparency;
2. intended inside opacity.

Opaque paper/ticket/label/vessel interiors should normally remain alpha `>= 0.95`, preferably `1.00`, except antialiased edges or explicitly approved translucency.

Preview over light/dark/high-contrast backgrounds and inspect alpha itself.

### Edge Safety — HARD

Busy edge activation is allowed, but important labels/badges/text must not look accidentally clipped by border/trim.

Review at full page and A5 size.

## P01 CURRENT STATUS — MICRO POLISH REOPENED

P01 `3535:7` remains the best CURRENT. Do not roll back to FIRST BUILD and do not create another P01.

The `c64b3c66...` final REWORK remains the accepted baseline for:
- clean proxies
- bundled modules
- stale-layer cleanup
- photo swap structure

However owner review of the actual CURRENT screenshot reopened **three targeted visual checks**:

1. Feature 1–3 paper/vessel interiors appear too transparent/washed relative to Visual Master.
2. Feature 1–3 number badges/labels sit too close to the left airmail border.
3. Top-left ring/diamond/sparkle cluster is visually weaker than Visual Master.

Current state:

`BEST_CURRENT = YES`

`FIGMA_STRUCTURE_READY = PASS`

`CLEAN_PROXY_PASS = PASS`

`VISUAL_CARRYOVER_PASS = PASS`

`ALPHA_INTEGRITY_PASS = REOPENED_FOR_FEATURE_1_3`

`EDGE_SAFETY_PASS = REOPENED_FOR_FEATURE_1_3`

`REFERENCE_DELTA_PASS = REOPENED_FOR_MICRO_POLISH`

`FIGMA_DESIGN_COMPLETE = NO`

`FINAL_PHOTO_QA_PENDING = YES`

P02 production is blocked until these micro issues are resolved or explicitly deferred by the owner.

## Next P01 action — CODEX ONLY

Targeted micro-polish only:

1. inspect Feature 1/2/3 RGBA alpha channel and intended paper interior opacity;
2. repair/regenerate only modules with incorrect interior alpha;
3. do not fake opacity with generic white rescue rectangles;
4. tune Feature 1–3 left-edge spacing without equalizing them;
5. requalify top-left ring/diamond/sparkle cluster and strengthen only if needed;
6. preserve CURRENT `3535:7`;
7. do not touch P02 `3535:9`;
8. remove superseded LIVE layers if any module is replaced;
9. capture fresh full-page + A5 screenshots;
10. rerun alpha integrity, edge safety and Reference Delta.

## P04–P08

P04–P08 have not been directly rereviewed in this feedback cycle.

Before production:
- inspect actual Visual Master
- run PASS A/PASS B
- classify bundled modules
- classify variable/native copy
- classify clean proxy roles
- classify alpha/material expectations and edge-safety risks
- update page authority
- then hand off to Codex

Do not invent exact module lists from prose alone.

## Stop condition for governance

Add rules only for real/repeatable failures or truth/print/editability risk.

Once the current feedback is modeled and contradictions are removed:

`STOP WRITING RULES → HAND OFF TO CODEX → MAKE THE BOOK BETTER.`

**CURRENT = V30. V20 = FROZEN HISTORY.**
