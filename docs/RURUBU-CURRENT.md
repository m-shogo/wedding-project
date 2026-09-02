# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / P01_DESIGN_LOCKED / 2026-09-02`

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

## Systemic production rules

### Fixed bundled display modules

Short fixed text/numbers may be generated/prepared together with their vessel/background/icon/attached accents when they move as one authored object. Visible fixed display text does not need to remain editable in Figma.

Long/TBD/personal/frequently changing copy and replaceable photos remain separate.

### Clean photo proxies

Visual Master is comparison authority, not photo source. Never use page-master crops or page screenshots as active photo fills.

### Alpha Integrity — HARD

`TRUE ALPHA ≠ CORRECT ALPHA`.

For RGBA modules, verify both intended outside transparency and intended inside opacity. Opaque paper/ticket/label/vessel interiors should normally remain alpha `>= 0.95`, preferably `1.00`, except narrow antialiased edges or explicitly approved translucency.

### Fast-fail regeneration — HARD

Use one quick discriminator. If a cheap defect is likely asset-side and regeneration/re-cut is faster than continued diagnosis, regenerate/re-cut immediately. Only inspect Figma opacity/blend/mask when source art passes. After replacement, run one integrated final QA pass rather than repeated midpoint checks/reports.

### Edge Safety — HARD

Busy edge activation is allowed, but important labels/badges/text must not look accidentally clipped by border/trim. Review at full page and A5 size.

## P01 CURRENT STATUS — DESIGN LOCKED

P01 CURRENT remains `3535:7`.

The large REWORK plus targeted micro-polish are now accepted.

Fresh post-fix CURRENT review confirms:
- Feature 1–3 intended white paper/vessel interiors no longer visually bleed Hero/background;
- reported paper-core alpha samples are `255`, outer transparency remains available, and Figma node/image opacity is `1.0`;
- Feature 1–3 left-edge spacing is safer while unequal editorial rhythm remains;
- top-left wedding-ring cue now reads as gold rings + diamond + yellow sparkle without overtaking the masthead/title;
- hidden obsolete layers remain reported `0`;
- duplicate same-job production layers remain reported `0`;
- real P02 `3535:9` remained untouched.

Current P01 gates:

- `BEST_CURRENT = YES`
- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `BUNDLED_DISPLAY_MODULE_PASS = PASS`
- `ALPHA_INTEGRITY_PASS = PASS`
- `EDGE_SAFETY_PASS = PASS`
- `IDENTITY_ANCHOR_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS`
- `REFERENCE_DELTA_PASS = PASS_AFTER_MICRO_POLISH`
- `PHOTO_SWAP_PASS = PASS`
- `A5_GRAYSCALE_PASS = PASS`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

**P01 design is locked. P02 production may begin.**

Do not reopen P01 design merely because final owner photography is not yet supplied. When final P01 photos arrive, replace only Hero + Feature 1/2/3 photo fills and run final-photo crop/face-safe/resolution/print QA.

## P02 current starting rule

P02 production may now proceed, but only after rereading the actual P02 Visual Master and its current page-polish authority. Preserve:
- one authored `ふたりのプロフィール` header ecology;
- SHOGO left/blue and SHIORI right/pink;
- profile sheet shells separate from personal values until copy-lock;
- Q1/Q2 non-identical relationship;
- Q1-only inset couple photo;
- clean standalone photo proxies;
- internal-opacity QA on opaque paper/vessel modules;
- fast-fail regeneration when cheap asset-side defects are obvious.

## P03 current starting rule

P03 remains prepared from direct Visual Master rereview but should begin only after P02 acceptance. Preserve its authored header, individually authored Step 1–5 rhythm, independent continuous route, Q3/Q4 non-identity and clean replaceable photo structure.

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

Once current feedback is represented and contradictions are removed:

`STOP WRITING RULES → HAND OFF TO CODEX → MAKE THE BOOK BETTER.`

**CURRENT = V30. V20 = FROZEN HISTORY.**
