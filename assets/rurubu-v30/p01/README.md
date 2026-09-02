# V30 P01 production assets

Status: `P01_BEST_CURRENT / MICRO_VISUAL_POLISH_DEBT_OPEN / FINAL_PHOTO_QA_PENDING`

P01 CURRENT remains Figma node `3535:7`. Do not roll back to FIRST BUILD and do not create another P01 frame.

The `c64b3c66d3a0579f704222eea980b193005d7dbd` final REWORK remains the accepted baseline for clean standalone photo proxies, bundled fixed modules, stale LIVE-layer cleanup, photo-swap structure and major identity hierarchy.

Owner review of the actual current screenshot reopened only three targeted visual checks before P02:

1. Feature 1–3 paper/vessel interiors look too transparent/washed relative to Visual Master.
2. Feature 1–3 number badges/labels sit too close to the left airmail border.
3. Top-left ring/diamond/sparkle cluster is weaker than Visual Master.

Required authority:
- `docs/RURUBU-CURRENT.md`
- `assets/rurubu-v30/manifest.json`
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

## Alpha Integrity

For Feature 1–3, the white/cream paper-vessel interiors should read as opaque print. A valid RGBA/alpha channel alone is not a pass.

Codex must:
- inspect source alpha;
- sample representative interior pixels;
- expect intended paper interiors to be alpha `>= 0.95`, preferably `1.00`, except antialiased edges;
- preview over white, gray, dark and high-contrast backgrounds;
- verify Hero/background does not show through the intended paper body.

If wrong, repair/regenerate only the affected module/cutout, replace the old LIVE module and delete the superseded layer.

Do not fake opacity with generic white rectangles or whole-layer Figma opacity changes.

## Left-edge safety

Tune only Feature 1–3 local x/scale/visual bounds so number badges and headings do not look accidentally clipped by the airmail border. Preserve their unequal editorial rhythm.

## Ring cluster fidelity

Requalify the top-left ring/diamond/sparkle cluster against P01.png and strengthen/regenerate/reposition only if needed. Preserve masthead/WEDDING geometry.

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

P02 `3535:9` remains untouched and production is blocked until the three micro issues are resolved or explicitly deferred by the owner.

The accidental TEMP `3708:2` is already deleted.

## Next P01 work — CODEX ONLY

1. update CURRENT `3535:7` only;
2. inspect Feature 1/2/3 intended interior alpha;
3. repair only genuinely translucent modules;
4. tune left-edge safety;
5. requalify top-left ring cluster;
6. remove superseded LIVE layers after replacement;
7. confirm hidden-old-layer count remains 0;
8. capture fresh full-page and A5 screenshots;
9. rerun `ALPHA_INTEGRITY → EDGE_SAFETY → REFERENCE_DELTA`;
10. only then restore `FIGMA_DESIGN_COMPLETE = YES`.

Historical baseline/rejected/superseded assets belong in Drive/Git history, not active Figma LIVE.
