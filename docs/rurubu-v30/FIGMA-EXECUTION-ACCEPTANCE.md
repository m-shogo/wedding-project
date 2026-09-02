# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / ORNAMENT_ART_DIRECTION_AWARE / 2026-09-02`

Purpose: prevent technically clean or individually attractive work from being called complete when editorial DNA, V30 art direction, page role, asset roles, ornament family coherence, transparency, carry-over, copy, photo replaceability, or Visual Master fidelity are wrong.

## Authority

Newest explicit owner feedback wins.

Current execution precedence:

`owner feedback → page-specific ornament/page-polish authority → assets/rurubu-v30/ornament-art-direction-manifest.json → assets/rurubu-v30/visual-polish-manifest.json → TRUE-ALPHA policy → this Acceptance gate → older generic/root/page-main execution language`

Older language that broadly rasterizes fixed/stylized text, treats P01 as the literal template for later pages, accepts good standalone illustration without publication-family review, or uses checkerboard-looking output as a transparency workflow is superseded.

## Required read set

1. `docs/RURUBU-CURRENT.md`
2. actual page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. page manifest
7. page polish manifest when present
8. page-specific ornament manifest when present
9. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
10. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
11. this document
12. page README when production exists

For a bounded correction, also read `docs/rurubu-v30/FAST-TARGETED-PATCH-POLICY.md`.

## 1. Rurubu editorial DNA — HARD / FIRST GATE

Before judging whether an ornament is beautiful, judge whether it functions as editorial material.

Required characteristics:
- decoration supports photography, headings, information blocks, eye movement or page rhythm;
- lively density has hierarchy and calm zones;
- mixed media may coexist, but it must feel art-directed by one publication team;
- cutouts, routes, doodles, stickers, stamps and small illustrations are editorial tools, not independent artwork by default;
- tactile print character is controlled and subordinate to readability/content.

Hard reject:
- attractive standalone illustration that competes with the page's editorial lead without a Visual Master reason;
- botanical/fine-art plate behavior where a compact corner accent is needed;
- strong retro-poster treatment inserted into a lighter page without deliberate page-role justification;
- generic stock/clipart or SaaS icon language;
- unrelated illustration genres mixed with no editorial unifier.

Gate: `RURUBU_EDITORIAL_DNA_PASS`.

## 2. V30 art direction — HARD

P01 is a calibration reference, not the root authority and not a template to clone.

P01-P08 Visual Masters collectively calibrate the V30 translation of the Rurubu editorial DNA.

Judge compatibility across:
- editorial usefulness;
- line-weight range;
- hand-drawn/printed character;
- texture amount;
- realism/detail range;
- shadow/depth restraint;
- palette temperature/saturation;
- cutout/sticker weight;
- route/doodle grammar;
- micro-accent grammar;
- relationship to photography and native text.

Different families may use different drawing methods. Consistency means compatible editorial treatment and visual weight, not identical brushwork.

Gate: `V30_ART_DIRECTION_PASS`.

## 3. Page role fit — HARD

The target page Visual Master controls local density, scale, motif choice, negative space and ornament dominance.

Do not import P01 cover ornament density into a profile/story/closing page merely for continuity.

Ask: does this ornament have the right job and visual weight for this exact location?

Gate: `PAGE_ROLE_FIT_PASS`.

## 4. Ornament family coherence — HARD

Use the registry and workflow in `assets/rurubu-v30/ornament-art-direction-manifest.json`.

Current family vocabulary includes:
- `TRAVEL_ROUTE_DOODLE`
- `TRAVEL_VEHICLE`
- `TROPICAL_BOTANICAL`
- `TRAVEL_EPHEMERA`
- `MICRO_ACCENT`

Families share grammar, not identical final assets.

Hard reject both:
- unrelated family members that look selected from different stock packs/illustration genres;
- forcing every object into one identical drawing style and losing controlled mixed-media energy.

Gate: `ORNAMENT_FAMILY_COHERENCE_PASS`.

## 5. Production architecture — HARD

Use:

`PLAN_GLOBALLY_CALIBRATE_UPFRONT_PRODUCE_CONTEXTUALLY`

Meaning:
1. inventory ornament slots across reviewed pages first;
2. establish only 1–2 family calibration anchors where needed;
3. create genuine cross-page shared components once;
4. generate final page-specific ornaments after page hierarchy/photos/native text/negative-space needs are known;
5. write accepted family decisions back to the registry.

Do **not** generate every final icon upfront.

Do **not** work pure page-by-page without a global family system.

When future pages are added, map new needs to existing families or explicitly extend the family registry.

## 6. Asset-role classification — HARD

Before choosing render mode, classify material elements as:
- `NATIVE_TEXT`
- `SHARED_COMMON_COMPONENT`
- `GENERATED_DISPLAY_ASSET`
- `PAGE_SPECIFIC_ORNAMENT`
- `PHOTO`

Decision order:
1. cross-page recurring publication furniture → `SHARED_COMMON_COMPONENT`
2. editable/consistent/separately controllable text → `NATIVE_TEXT`
3. local decorative art/icon/route/cluster → `PAGE_SPECIFIC_ORNAMENT`
4. replaceable photography → `PHOTO`
5. only then consider `GENERATED_DISPLAY_ASSET` for a truly inseparable authored object with locked copy.

Hard rejects:
- stylized/fixed text called an image merely because it is rich;
- PAGE-number family independently generated per page;
- rasterizing native names/titles for convenience;
- using `GENERATED_DISPLAY_ASSET` as a default ambiguity bucket.

## 7. Shared common components — HARD

Recurring publication furniture remains one coherent cross-page system unless owner/Visual Master explicitly requires an exception.

Current example: PAGE 01 / PAGE 02 / ... badge family.

## 8. Ornament object quality / reuse intent

Only after the higher-level editorial/art-direction/page/family gates pass, judge individual asset craft quality.

Gate: `ORNAMENT_OBJECT_QUALITY_PASS`.

If a motif repeats, verify it is deliberate publication language rather than convenience/carry-over.

Gate: `REUSE_INTENT_PASS`.

A beautiful individual PNG cannot override a failure in Rurubu DNA, V30 art direction, page fit or family coherence.

## 9. Clean photo proxies — HARD

Visual Master/page screenshots are comparison references only, never active photo fills.

Allowed:
1. suitable user photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy with no page-layout decoration.

Reject a proxy containing title, border, badge, paper shell, flower, route, frame, page background or other layout decoration.

## 10. True-alpha generation preflight — HARD

For generated floating art:

`true-alpha generation/export → immediate alpha-channel preflight → only PASS assets enter Figma`

If direct true alpha is unavailable:

`single safe flat matte → one extraction → alpha preflight`

Never request/accept checkerboard as matte/background. Baked checkerboard RGB is `GENERATION_ALPHA_FAIL`.

Before Figma placement require:
- `ART_QUALITY_PASS`
- `TRUE_ALPHA_PREFLIGHT_PASS`

Figma must not be where fake transparency is discovered first.

## 11. Alpha integrity after cutout — HARD

`TRUE ALPHA ≠ CORRECT ALPHA`.

Verify intended outside transparency and intended interior opacity separately.

Reject checkerboard RGB, matte halo, opaque rectangle, fringe, unintended holes, erased white/light art or broken thin routes/details.

Opaque paper/vessel interiors normally use alpha `>= 0.95`, preferably `1.00`.

If one same-family opaque-paper module fails, run one bounded sibling sweep and repair source-side alpha. Do not hide defects with rescue rectangles/Figma opacity.

## 12. Border / copy / carry-over — HARD

Default border depth:

`background → border/frame → Hero/photos → authored modules → major foreground accents`

Newest owner-approved copy overrides stale generated/native copy. Unapproved personal facts remain separate/non-factual.

Carry-over statuses:
- `UNREVIEWED_CARRYOVER`
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

Existing visible assets have no permanent grandfathered visual PASS.

## 13. Reference Delta / design completion

Use the current screenshot and actual Visual Master, not layer names or prior reports.

Before `FIGMA_DESIGN_COMPLETE = YES`, confirm applicable gates in this order:
1. `RURUBU_EDITORIAL_DNA_PASS`
2. `V30_ART_DIRECTION_PASS`
3. `PAGE_ROLE_FIT_PASS`
4. `ORNAMENT_FAMILY_COHERENCE_PASS`
5. correct asset-role classification/shared components
6. `ORNAMENT_OBJECT_QUALITY_PASS`
7. `REUSE_INTENT_PASS`
8. clean photo-proxy integrity
9. true-alpha/material alpha
10. copy safety/sync
11. border depth
12. 3-second hierarchy/editorial rhythm
13. A5 readability/edge safety

Structure-only cleanliness or isolated PNG quality is never design completion.

## 14. Fast close

For bounded corrections:

`fix reopened scope → one bounded dependency/sibling check if required → one integrated final screenshot/QA → protected-page check → one remote sync check → close gates → STOP`

Do not restart unrelated prior-PASS audits unless the patch disturbed them.

## Current calibration

### P01

`DESIGN_LOCKED / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

P01 is a calibration reference for V30, not a template whose ornament density/exact motifs must be copied.

### P02

`STRUCTURE_COPY_PHOTO_PASS / ORNAMENT_ART_DIRECTION_REDESIGN_OPEN`

Preserve accepted structure/photo/copy/material-alpha/border work.

Read `assets/rurubu-v30/p02/ornament-art-direction-manifest.json` before another ornament run.

Current five targets:
- `P02_Q2_PLANE_AND_ROUTE`
- `P02_TOP_AIRPLANE_ROUTE`
- `P02_Q2_SUITCASE`
- `P02_TOP_RIGHT_TRAVEL_TROPICAL_CLUSTER`
- `P02_TOP_LEFT_TROPICAL_CLUSTER`

The latest candidates show strong standalone craft quality but unresolved illustration-genre drift. P02 returns to `FIGMA_DESIGN_COMPLETE = YES` only after the higher-level editorial/art-direction/page/family gates and final true-alpha preflight pass.
