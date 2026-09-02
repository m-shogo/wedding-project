# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / P01_DESIGN_LOCKED / GIT_BINARY_SYNC_PENDING / 2026-09-02`

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

TEMP `3708:2` was deleted. Real P02 `3535:9` must not be repurposed by P01 cleanup.

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

## Systemic production rules

- fixed short authored display modules may be bundled with their vessel/icon/decor; editable native text is not inherently better;
- page-master crops/screenshots are prohibited as active photo fills;
- `TRUE ALPHA ≠ CORRECT ALPHA`: verify outside transparency and inside opacity separately;
- opaque paper/ticket/label/vessel interiors normally remain alpha `>= 0.95`, preferably `1.00`;
- use fast-fail regeneration: one quick discriminator, then regenerate/re-cut cheap asset-side defects instead of prolonged diagnosis;
- important labels/badges/text must not read as accidentally clipped by border/trim;
- keep Figma LIVE current-only; history belongs in Git/Drive evidence.

## P01 — DESIGN LOCKED

P01 CURRENT remains `3535:7`.

Fresh post-fix CURRENT review confirms:
- Feature 1–3 intended white paper/vessel interiors no longer visually bleed Hero/background;
- reported paper-core alpha samples are `255`; outer transparency retained; Figma node/image opacity `1.0`;
- Feature 1–3 left-edge spacing is safer while unequal editorial rhythm remains;
- top-left wedding-ring cue now reads as gold rings + diamond + yellow sparkle without overtaking masthead/title;
- hidden obsolete layers reported `0`;
- duplicate same-job production layers reported `0`;
- P02 `3535:9` remained untouched.

P01 design gates are PASS:
- `FIGMA_STRUCTURE_READY`
- `CLEAN_PROXY_PASS`
- `BUNDLED_DISPLAY_MODULE_PASS`
- `ALPHA_INTEGRITY_PASS`
- `EDGE_SAFETY_PASS`
- `IDENTITY_ANCHOR_PASS`
- `VISUAL_CARRYOVER_PASS`
- `REFERENCE_DELTA_PASS_AFTER_MICRO_POLISH`
- `PHOTO_SWAP_PASS`
- `A5_GRAYSCALE_PASS`
- `HUMAN_FEEDBACK_REVIEWED`
- `FIGMA_DESIGN_COMPLETE = YES`

Still pending later:
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

## Immediate operational debt — sync four production PNGs to Git

Codex completed Figma/Drive/local project-asset work but hit its usage limit before commit/push. ChatGPT has already synchronized the authority text to remote Git, but binary production PNG upload is not supported by the current GitHub text-file connector.

Remote verification found the new Feature 1 micro-polish PNG path absent (`404`). Therefore before P02 production, sync these local binary assets:

- `assets/rurubu-v30/p01/final-rework/V30_P01_FEATURE_1_MODULE_MICRO_POLISH_OPAQUE_PAPER_RGBA.png`
- `assets/rurubu-v30/p01/final-rework/V30_P01_FEATURE_2_MODULE_MICRO_POLISH_OPAQUE_PAPER_RGBA.png`
- `assets/rurubu-v30/p01/final-rework/V30_P01_FEATURE_3_MODULE_MICRO_POLISH_OPAQUE_PAPER_RGBA.png`
- `assets/rurubu-v30/p01/final-rework/V30_P01_TOP_LEFT_RING_DIAMOND_SPARKLE_MICRO_POLISH_RGBA.png`

Safe resume order:
1. preserve/copy the four local PNGs before resetting anything;
2. discard/reconcile stale local authority-file edits because remote authority is newer and already closed by ChatGPT;
3. fast-forward/rebase local branch to latest PR head;
4. stage the four intended PNGs plus only intentionally tracked final QA evidence;
5. commit/push;
6. verify all four remote paths exist and local worktree is clean.

**P02 production is blocked only until this repository-sync debt is closed.** This is not a P01 visual/design debt.

## After binary sync

P02 may proceed under its direct Visual Master/page-polish authority. Preserve the authored header ecology, SHOGO-left/blue and SHIORI-right/pink asymmetry, Q1/Q2 non-identity, Q1-only inset photo, clean standalone proxies, internal-opacity QA and fast-fail regeneration.

When final P01 owner photos arrive, replace only Hero + Feature 1/2/3 photo fills and run final-photo crop/face-safe/effective-resolution/A5/print QA.

## P04–P08

P04–P08 require direct image rereview before page-specific generation. Do not invent exact module lists from prose alone.

**CURRENT = V30. V20 = FROZEN HISTORY.**
