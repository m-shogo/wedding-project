# V30 P01 production assets

Status: `P01_BEST_CURRENT / MICRO_VISUAL_POLISH_DEBT_OPEN / FINAL_PHOTO_QA_PENDING`

P01 CURRENT remains:

- Figma node `3535:7`
- file `bfM0d4c9dCeBv5pCkJ3TNM`
- page `V30_FINAL_PRODUCTION`

Do not roll back to FIRST BUILD and do not create another P01 frame.

The `c64b3c66d3a0579f704222eea980b193005d7dbd` final REWORK remains the accepted baseline for:
- clean standalone Hero/Feature proxies;
- bundled fixed display modules;
- stale LIVE-layer cleanup;
- photo-swap structure;
- major identity hierarchy.

However, owner review of the actual current screenshot reopened a small visual-polish cycle before P02.

Required authority:
- `docs/RURUBU-CURRENT.md`
- `assets/rurubu-v30/manifest.json`
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

## Current P01 module model

Complete fixed display modules:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori` + ribbon
- `2026`
- Date Ticket
- Feature 1 shell
- Feature 2 shell
- Feature 3 shell
- Bottom Story
- `OUR JOURNEY / TAKE A TRIP`
- `PAGE / 01`

Replaceable photo slots stay separate:
- Hero
- Feature 1
- Feature 2
- Feature 3

Current Date copy:
- `WEDDING DATE`
- `2026.10.24`
- `SAT`

## Proxy rule

The active layout proxies are clean standalone photos.

Do not actively use Visual-Master crop calibration files as photo fills.

`P01.png` is comparison authority only.

## TEMP cleanup

The accidental TEMP `3708:2` was deleted.

Real P02 is `3535:9` and must not be touched by P01 work.

## Alpha Integrity — new owner feedback

The current Feature 1–3 label/vessel areas visually look more translucent/washed than the Visual Master.

This may be an **interior-alpha failure** even if:
- the file is RGBA;
- the outer background is transparent;
- the alpha channel technically exists.

For Feature 1–3:

- intended white/cream paper-vessel interiors should read as opaque print;
- representative interior alpha should normally be `>= 0.95`, preferably `1.00`;
- partial alpha is acceptable mainly at antialiased edges;
- Hero/background must not visibly show through the intended paper body.

Codex must inspect the actual source alpha and preview each module over white, gray, dark and high-contrast backgrounds.

If wrong:
- repair/regenerate the affected module/cutout only;
- replace the old LIVE module;
- delete the superseded LIVE layer.

Do **not**:
- fake opacity by lowering/raising whole Figma layer opacity;
- add generic white rectangles behind the module if that changes the authored silhouette;
- rebuild the whole page.

## Left-edge safety — new owner feedback

Feature 1–3 number badges/labels sit too close to the left airmail border.

Codex should:
- tune local x/scale/visual bounds only;
- preserve the unequal Feature 1/2/3 rhythm;
- keep labels/badges clearly intentional at A5 size;
- compare directly with P01 Visual Master.

Do not normalize Feature 1–3 into identical cards.

## Top-left ring cluster — new owner feedback

The current top-left ring/diamond/sparkle cue is weaker than the Visual Master.

Targeted action only:
- requalify current ring cluster;
- strengthen/regenerate/reposition it only if necessary;
- preserve masthead/WEDDING geometry.

## Current gate state

- `BEST_CURRENT = YES`
- `FIGMA_STRUCTURE_READY = PASS`
- `CLEAN_PROXY_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS`
- `PHOTO_SWAP_PASS = PASS`
- `ALPHA_INTEGRITY_PASS = REOPENED_FOR_FEATURE_1_3`
- `EDGE_SAFETY_PASS = REOPENED_FOR_FEATURE_1_3`
- `REFERENCE_DELTA_PASS = REOPENED_FOR_MICRO_POLISH`
- `FIGMA_DESIGN_COMPLETE = NO`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

P02 production is blocked until the three micro issues are resolved or explicitly deferred by the owner.

## Next P01 work — CODEX ONLY

1. keep CURRENT `3535:7`;
2. do not touch P02 `3535:9`;
3. inspect Feature 1/2/3 intended interior alpha;
4. repair only modules that are actually translucent;
5. tune Feature 1–3 left-edge safety;
6. requalify top-left ring cluster;
7. remove any superseded LIVE module after replacement;
8. confirm hidden-old-layer count remains 0;
9. capture fresh full-page and A5 screenshots;
10. rerun `ALPHA_INTEGRITY → EDGE_SAFETY → REFERENCE_DELTA`;
11. only then restore `FIGMA_DESIGN_COMPLETE = YES`.

## Drive traceability

Existing P01 production/QA history remains valid.

Historical baseline and old rejected/superseded assets belong in Drive/Git history, not active Figma LIVE.

`BEST CURRENT ≠ LOCKED COMPLETE WHEN NEW OWNER FEEDBACK REOPENS A VISUAL GATE.`
