# Rurubu WEDDING V30 — Codex P02 Ornament Art-Direction Rebuild

Status: `CURRENT_P02_EXECUTION_HANDOFF`
Date: 2026-09-03
Scope: **P02 ornament art-direction recalibration + five-target replacement only**

Repository: `m-shogo/wedding-project`
Branch: `rurubu/v30-final-production-20260901`
PR: `#878`

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Figma page: `V30_FINAL_PRODUCTION`
P02 frame: `3535:9`

P01 `3535:7` is design-locked. Do not modify it.
Do not modify P03-P08.
Do not create another P02/TEMP frame.
Do not create V31.

## Mission

Repair P02 ornament art direction without rebuilding the accepted page.

The previous generated ornament candidates had good standalone drawing quality but failed as a publication system because their illustration genres drifted: softer craft/storybook travel art, retro aviation-poster art, detailed botanical illustration and lighter sticker-style tropical art did not read as one Rurubu WEDDING editorial direction.

The goal is **not** to make every ornament literally identical. The goal is to make every accepted ornament function as Rurubu-style editorial material, fit the V30 publication, fit P02's profile-page role, and belong to a coherent ornament family.

## Required read set — before any generation or Figma write

Read latest remote authority in this order:

1. `docs/RURUBU-CURRENT.md`
2. `assets/rurubu-v30/p02/P02.png`
3. `assets/rurubu-v30/ornament-art-direction-manifest.json`
4. `assets/rurubu-v30/p02/ornament-art-direction-manifest.json`
5. `assets/rurubu-v30/visual-polish-manifest.json`
6. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
7. `assets/rurubu-v30/p02/polish-manifest.json`
8. `assets/rurubu-v30/p02/README.md`
9. `assets/rurubu-v30/p02/production/manifest.json`
10. `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
11. `docs/rurubu-v30/FAST-TARGETED-PATCH-POLICY.md`

The previous handoff `docs/rurubu-v30/CODEX-P02-ORNAMENT-PATCH-20260902.md` is SUPERSEDED and must not be executed as current authority.

## Art-direction hierarchy — HARD

Judge every ornament in this order:

1. `RURUBU_EDITORIAL_DNA_PASS`
2. `V30_ART_DIRECTION_PASS`
3. `PAGE_ROLE_FIT_PASS`
4. `ORNAMENT_FAMILY_COHERENCE_PASS`
5. `ORNAMENT_OBJECT_QUALITY_PASS`
6. `REUSE_INTENT_PASS`
7. `TRUE_ALPHA_PREFLIGHT_PASS`

A beautiful standalone PNG cannot override failure at a higher gate.

### RURUBU editorial DNA

Ornaments are editorial tools first. They should support photos, headings, information blocks, eye movement, corner/edge activation and travel storytelling.

Do not optimize for standalone illustration beauty at the expense of editorial usefulness.

Hard reject:
- fine-art botanical plates used as simple corner decoration;
- isolated retro-poster illustration that visually changes the publication genre;
- generic stock/clipart or SaaS icon feel;
- unrelated asset-pack feeling;
- ornament detail or visual weight that competes with faces, title or profile information.

### V30 art direction

Translate the Rurubu editorial DNA into a bright, warm, tactile, playful, photo-led travel-wedding publication.

P01 is a calibration reference for tactility, cutout/sticker energy, edge activation and magazine playfulness, but **do not clone P01 cover density, exact motifs or composition**.

P01-P08 Visual Masters as a set define V30; the target P02 Visual Master controls local density and balance.

### P02 page role

P02 is `PROFILE + Q1/Q2`.

Priority:
`プロフィール title → SHOGO/SHIORI portraits → profile sheets → Q1/Q2 → ornaments`

Ornaments must remain light-to-medium editorial accents, subordinate to people/profile information.

## Correct asset roles — preserve

Do not rasterize or regenerate these as ornament assets:

- `ふたりの` = `NATIVE_TEXT`
- `プロフィール` = `NATIVE_TEXT`
- `私たちのこと、少しだけ紹介します♪` = `NATIVE_TEXT`
- `SHOGO` = `NATIVE_TEXT`
- `SHIORI` = `NATIVE_TEXT`
- `PAGE 02` = `SHARED_COMMON_COMPONENT`
- portraits/inset = `PHOTO`

Only travel/tropical/route/icon art in this task is `PAGE_SPECIFIC_ORNAMENT`.

## Preserve accepted P02 structure

Do not redesign:

- SHOGO = left / blue;
- SHIORI = right / pink;
- Q1 has exactly one replaceable couple-photo inset;
- Q2 has no photo slot;
- three clean standalone photo proxies;
- profile/Q paper shells and their opacity;
- copy safety / TBD separation;
- background-adjacent airmail border;
- page hierarchy and photo contracts.

## Rework targets

Final target set remains exactly:

1. `P02_TOP_AIRPLANE_ROUTE`
2. `P02_Q2_PLANE_AND_ROUTE`
3. `P02_Q2_SUITCASE`
4. `P02_TOP_LEFT_TROPICAL_CLUSTER`
5. `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER`

Do not broaden the patch unless a direct collision caused by these replacements must be corrected.

## Family assignments

### TRAVEL_VEHICLE + TRAVEL_ROUTE_DOODLE

Members:
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_PLANE_AND_ROUTE`

They may use different vehicle pose/type/composition, but must share compatible:
- editorial weight;
- realism/detail range;
- tactile/print treatment;
- line-weight character;
- color temperature/saturation;
- route/doodle grammar.

Hard reject: one reads as storybook/craft art while the other reads as retro aviation-poster art.

### TROPICAL_BOTANICAL

Members:
- `P02_TOP_LEFT_TROPICAL_CLUSTER`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER`

They must be compositionally distinct, not mirrored/recolored copies, but clearly belong to the same V30 editorial treatment.

Hard reject: one is a detailed standalone botanical plate while the other is a lightweight sticker pack.

### TRAVEL_EPHEMERA

Member:
- `P02_Q2_SUITCASE`

It must read as a small narrative prop integrated into Q2, not an isolated suitcase icon.

## Production architecture — DO NOT SKIP

Use `CALIBRATE_THEN_CONTEXTUAL_VARIANTS`.

### Phase A — calibration only

Before generating all five finals, establish only:

1. **one compact TRAVEL_VEHICLE treatment anchor**
2. **one compact TROPICAL_BOTANICAL treatment anchor**

These are calibration references, not automatically final page assets.

Use them to lock:
- editorial weight;
- line/detail range;
- realism level;
- palette behavior;
- tactile/printed feeling;
- cutout/sticker weight;
- compatibility with P02 photos/text;
- mixed-media compatibility with V30.

Do **not** generate a large icon library.
Do **not** produce five final assets before both anchor directions pass the higher-level gates.

### Phase B — contextual final variants

Only after both calibration anchors pass:

- generate the two vehicle/route finals as one related batch;
- generate the two tropical finals as one related batch;
- generate the Q2 suitcase as a locally integrated TRAVEL_EPHEMERA variant;
- compare the set inside the P02 page, not only as isolated PNGs.

If an anchor direction fails, revise the family treatment before producing final variants.

## True-alpha contract — before Figma

For every final floating ornament:

1. prefer true-alpha generation/export directly;
2. inspect actual alpha immediately after generation/export;
3. checkerboard RGB / opaque outside field / no meaningful alpha = `GENERATION_ALPHA_FAIL`;
4. if direct alpha is unavailable, use one safe flat matte, never checkerboard;
5. background extraction is fallback only;
6. verify no halo, no erased white/light art, no broken thin route lines, no unintended holes;
7. require `ART_QUALITY_PASS + TRUE_ALPHA_PREFLIGHT_PASS` before Figma placement.

Figma must not be the first place fake transparency is discovered.

## Figma execution

Use existing frame `3535:9` only.

After final variants pass preflight:

1. replace only the five reopened ornament roles;
2. delete superseded LIVE ornament nodes/assets from the active page;
3. preserve all accepted native/shared/photo/profile/Q/border structure;
4. capture one full-page screenshot;
5. judge the page against P02 Visual Master and the art-direction gates;
6. fix only visible ornament/collision debt;
7. capture one final screenshot;
8. update P02 authority/evidence;
9. commit/push and verify remote once;
10. STOP.

Do not restart full P02 QA. Do not re-audit unrelated clean-proxy/copy/profile-alpha work unless this patch disturbed it.

## Final close gates

P02 can return to `FIGMA_DESIGN_COMPLETE = YES` only if all are PASS:

- `RURUBU_EDITORIAL_DNA_PASS`
- `V30_ART_DIRECTION_PASS`
- `PAGE_ROLE_FIT_PASS`
- `ORNAMENT_FAMILY_COHERENCE_PASS`
- `ORNAMENT_OBJECT_QUALITY_PASS`
- `REUSE_INTENT_PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS`
- `REFERENCE_DELTA_PASS`

And preserve:
- `FIGMA_STRUCTURE_READY = PASS_PRESERVED`
- `CLEAN_PROXY_PASS = PASS_PRESERVED`
- `COPY_SAFETY_PASS = PASS_PRESERVED`
- `ALPHA_INTEGRITY_PASS = PASS_PRESERVED`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

If the five ornaments are individually beautiful but the page still looks like mixed illustration packs, keep `FIGMA_DESIGN_COMPLETE = NO`.

## Final report budget

Report only:

1. calibration anchors and what visual treatment was locked;
2. five final ornament replacements;
3. Rurubu/V30/page/family/alpha gate results;
4. confirmation that accepted P02 structure and P01/P03-P08 were untouched;
5. commit SHA + remote sync;
6. whether P02 is design-locked.
