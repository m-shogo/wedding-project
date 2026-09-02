# Rurubu WEDDING V30 — Codex P02 Ornament Patch

Status: `CURRENT_P02_EXECUTION_HANDOFF`
Date: 2026-09-02
Scope: **P02 ornament-quality patch only**

Repository: `m-shogo/wedding-project`
Branch: `rurubu/v30-final-production-20260901`
PR: `#878`

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `V30_FINAL_PRODUCTION`
P02 frame: `3535:9`

P01 `3535:7` is locked. Do not modify it.
Do not modify P03–P08.
Do not create another P02/TEMP frame.
Do not create V31.

## Mission

Close the owner-reopened **ornament-quality** debt on P02 without rebuilding the accepted page structure.

The first production structure is valid. The problem is that five travel/tropical ornaments read as generic, stock/clipart-like, or obvious carry-over/reuse.

This is a targeted visual-quality patch, not a page rebuild.

## Read before writes

Read latest remote authority in this order:

1. `docs/RURUBU-CURRENT.md`
2. `assets/rurubu-v30/p02/P02.png`
3. `assets/rurubu-v30/visual-polish-manifest.json`
4. `assets/rurubu-v30/p02/polish-manifest.json`
5. `assets/rurubu-v30/p02/README.md`
6. `assets/rurubu-v30/p02/production/manifest.json`
7. `docs/rurubu-v30/FAST-TARGETED-PATCH-POLICY.md`

`docs/rurubu-v30/CODEX-P02-PRODUCTION-20260902.md` is historical/superseded and must not override current role classification.

## Preserve — do not redesign

Keep the accepted structure unchanged:

- SHOGO = left / blue;
- SHIORI = right / pink;
- Q1 has exactly one replaceable couple-photo inset;
- Q2 has no photo slot;
- all three photo fills remain clean standalone proxies;
- profile/Q paper interiors remain opaque;
- airmail border remains background-adjacent;
- unapproved personal copy remains native/separate;
- P01 and P03–P08 remain untouched.

Do not rebuild title, portraits, profile sheets, Q1/Q2 layout, page border, photo contracts or overall page hierarchy.

## Correct asset-role model — HARD

Do not rasterize or regenerate elements merely because they are fixed/stylized.

- `ふたりの` = `NATIVE_TEXT`
- `プロフィール` = `NATIVE_TEXT`
- `私たちのこと、少しだけ紹介します♪` = `NATIVE_TEXT`
- `SHOGO` = `NATIVE_TEXT`
- `SHIORI` = `NATIVE_TEXT`
- `PAGE 02` = `SHARED_COMMON_COMPONENT`, aligned with the P01–P08 PAGE-badge family
- travel/tropical/route/icon art = `PAGE_SPECIFIC_ORNAMENT`
- portraits/inset = `PHOTO`

Do not convert the native/shared elements above into generated image assets during this patch.

## Rework exactly these five ornament targets

All are `REWORK_REQUIRED`:

1. `P02_Q2_PLANE_AND_ROUTE`
2. `P02_TOP_AIRPLANE_ROUTE`
3. `P02_Q2_SUITCASE`
4. `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`
5. `P02_TOP_LEFT_TROPICAL_CLUSTER / REQUALIFIED_CARRYOVER`

If the live Figma node name differs slightly, resolve by role/context; do not broaden the patch.

## Quality target

The replacement ornaments must feel like locally authored **Japanese travel-magazine editorial decoration**, not generic UI icons or stock stickers.

Required qualities:

- playful but publication-grade;
- energetic and slightly irregular, matching the Visual Master;
- stronger line/detail character than generic flat icons;
- no obvious stock suitcase/airplane pictogram feel;
- top-left and top-right tropical clusters must not be the same asset mirrored/recolored;
- top airplane/route and Q2 airplane/route must not look like the same asset reused twice;
- Q2 suitcase should feel integrated into the Q2 editorial scene, not dropped in as an isolated clipart icon;
- maintain blue/pink/tropical palette coherence without making every ornament identical;
- preserve local negative space and do not compete with faces, title, profile copy or Q headings.

`REQUALIFIED_CARRYOVER` passes only when all four are true:

1. current visual quality is high enough;
2. local context fit is strong;
3. no generic stock/clipart feel;
4. no obvious same-page duplication/reuse feel.

Moving, resizing, recoloring, flipping, or lightly redrawing the old ornament is **not sufficient** when it still reads as the same weak asset.

## Execution

Use the existing P02 `3535:9` only.

Preferred flow:

1. inspect the five current targets and `P02.png`;
2. replace/rework only those five ornaments;
3. preserve the accepted structure and native/shared components;
4. remove superseded LIVE ornament nodes/assets after replacement;
5. capture one full-page screenshot;
6. check only ornament originality/carry-over/reference delta plus accidental collisions;
7. if one visible defect remains, fix only that defect;
8. capture one final screenshot;
9. commit/push new production ornament assets and update P02 authority/evidence;
10. verify remote sync once;
11. STOP.

Do not restart a full P02 certification cycle.
Do not re-audit clean proxies, profile alpha, copy safety or unrelated prior-PASS gates unless this ornament patch actually disturbed them.
Do not use web research unless a real external-information blocker appears.

## Close gates

Only after the five ornaments pass current visual review:

- `ORNAMENT_ORIGINALITY_PASS = PASS`
- `VISUAL_CARRYOVER_PASS = PASS_AFTER_TARGETED_ORNAMENT_PATCH`
- `REFERENCE_DELTA_PASS = PASS_AFTER_TARGETED_ORNAMENT_PATCH`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

If any of the five still looks generic, reused or weaker than the rest of P02, keep `FIGMA_DESIGN_COMPLETE = NO` and report only that blocker.

## Final report budget

Report only:

1. five ornament replacements/reworks;
2. originality/carry-over/reference-delta result;
3. confirmation that native text/shared PAGE component and accepted P02 structure were preserved;
4. commit SHA + remote sync;
5. whether P02 is design-locked.
