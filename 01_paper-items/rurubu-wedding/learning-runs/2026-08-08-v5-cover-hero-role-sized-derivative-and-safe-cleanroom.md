# V5 cover-hero role-sized derivative + safe clean-room pass

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current frames `77:18` / `77:290` were not modified in this run.

## Authorities re-read

Before work, re-read the project-wide Figma production system, generated-asset memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, current Rurubu status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 current/research/asset files.

Authoritative V5 state before this work remains:
- active Current roles: `12`
- PHOTO_ROLE_PASS: `2 / 12`
- ROLE_COMPLETE: `2 / 12`
- dominant-role pass: `2 / 3`
- final open dominant role: `V5-01 / 77:148 / IMG_HERO`

No V6 production work was started.

## A. Safe-area refinement of dense clean-room cover

### Visible problem

Comparison candidate `413:2 / V5_OUTER_RURUBU_AUTHENTIC_DENSE_CLEANROOM_A_2026_08_08` moved substantially closer to the desired dense Japanese travel-guide hierarchy, but screenshot inspection showed the right vertical yellow promise too close to the trim edge and an edge microcopy line visibly clipped. Those details weakened print plausibility and looked accidental rather than editorially controlled.

### Hypothesis

Before adding any new decoration, subtract the clipped microcopy and move the unique vertical hook inward. This should retain the dense Rurubu-like secondary reading axis while improving safe-area plausibility.

Expected improvement:
- edge information reads intentionally rather than clipped
- cleaner trim tolerance
- no loss of the vertical secondary axis

Possible regression:
- moving the strip inward could cover too much of the hero image
- removing microcopy could make the cover feel less dense

### Prototype

Created rollback-safe duplicate:
- `416:2 / V5_OUTER_RURUBU_AUTHENTIC_DENSE_CLEANROOM_A_SAFE_2026_08_08`

Bounded changes only:
- right yellow strip: x `1515.4 → 1491.4`
- vertical native copy: x `1521.4 → 1499.4`
- clipped `CR_EDGE_MICRO`: hidden, not deleted

Current remained untouched.

### Screenshot / structure QA

Whole-item screenshot: PASS as an improvement over `413:2`; the yellow vertical hook remains strong but no longer appears pasted on the trim edge.

Structural audit:
- visible clean-room front group: `416:276 / CLEANROOM_FRONT_COVER`
- hidden legacy front preserved: `416:129 / FRONT_COVER`
- native text nodes: `104`
- visible text nodes: `59`
- IMAGE-fill nodes: `15`
- no clean-room front child overflow detected
- fold guide: `416:274 / PROVISIONAL_FOLD_GUIDE`, visible, x `792.7`

Result:
`PROTOTYPED → VERIFIED_DIRECTION_AND_SAFE_AREA_GAIN / NOT_CURRENT / NOT_PROJECT_RULE`

## B. Cover-hero source re-evaluation and role-sized derivatives

### Concrete defect

The active cover hero remains the final open dominant-photo blocker. The ledger records the old transport proof derivative as only `5,927 bytes` and `REJECT_LOW_QUALITY_DERIVATIVE`.

The verified Drive master was re-fetched instead of regenerating:
- master: `01_COVER_HERO_YOKOHAMA_DUMMY.png`
- Drive ID: `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
- bytes: `2,089,658`
- source dimensions: `1122 × 1402`
- target semantic node: `77:148 / IMG_HERO`
- target box: `665 × 610`
- required dummy-design derivative floor: `1330 × 1220`

The source was visually re-evaluated. Although portrait-oriented, it contains enough width and vertical crop margin to form a near-landscape `665:610` crop while preserving Yokohama landmarks, water, skyline, ferris wheel, and a broad sky/text-safe region. Regeneration is therefore not justified yet.

### Role crop

A target-ratio crop was taken from approximately source y=`230..1259`, preserving full source width, then resized to exactly `1330 × 1220`.

This avoids stretching and meets the ledger's `2×` dummy-design dimension floor exactly.

### Drive derivatives created and verified

High-quality comparison master derivative:
- `RURUBU_V5_01_COVER_HERO_YOKOHAMA__FIGMA_1330x1220_Q90.jpg`
- Drive ID: `1gZyIF4STQp3LN_V3haxFXFBTNebLPgcd`
- dimensions: `1330 × 1220`
- bytes: `315,267`
- purpose: high-quality visual comparison / fallback; not yet Figma-applied

Intermediate transport candidate:
- `RURUBU_V5_01_COVER_HERO_YOKOHAMA__FIGMA_1330x1220_Q75_SINGLECALL.jpg`
- Drive ID: `12n3Chzv_dNDXylHNgzgsb9Y2nMBIm2ja`
- dimensions: `1330 × 1220`
- bytes: `191,539`
- SHA-256: `b59c9e4339f0871a46cfd53fad3d83c8d1f794d633292a52282c2b78052b412a`
- not yet Figma-applied

Smaller transport candidate:
- `RURUBU_V5_01_COVER_HERO_YOKOHAMA__FIGMA_1330x1220_Q30_SINGLECALL.jpg`
- Drive ID: `1X1WMVz0GGq7asFRj_BN36dV8l0StfhJV`
- dimensions: `1330 × 1220`
- bytes: `93,838`
- SHA-256: `94865df2d73279ca34f41cbc0c4fe8703fcc7613faecd8e2d51b81ddb442a70c`
- not yet Figma-applied

Bounded Q18 candidate, prepared because the history role proved Q18 can sometimes survive natural-size dummy-design review:
- `RURUBU_V5_01_COVER_HERO_YOKOHAMA__FIGMA_1330x1220_Q18_SINGLECALL.jpg`
- Drive ID: `1l1OCexZ1_rLQ7cRcdHEX5iHBubIuHabf`
- dimensions: `1330 × 1220`
- bytes: `66,248`
- SHA-256: `c3621f00ecf993c419a0315037093eba21cf836d013d346dc8e5f79dd8895d12`
- Drive readback verified
- not yet Figma-applied and therefore NOT a PHOTO_ROLE_PASS

### Failed transfer attempt

A first attempt to stage a large base64 chunk for Q30 was rejected by an explicit length guard (`expected 42000`, received `19865`). The Figma script failed atomically and made no canvas changes. This confirms the earlier lesson: long manually visible payloads are fragile and must be guarded; a partial chunk must never be treated as a successful image write.

Status:
`DERIVATIVE_CREATED → DRIVE_READBACK_VERIFIED / FIGMA_APPLICATION_PENDING`

The asset ledger and PHOTO_ROLE_PASS counts are intentionally unchanged in this run because no new derivative has yet been applied and screenshot/structure-verified on the semantic target.

## Next safe action

1. Use a bounded guarded chunk transfer for the smallest quality-plausible role-sized derivative, first on a duplicate of Current.
2. Validate encoded length, decoded byte length, JPEG SOI/EOI, resulting image hash, and exact duplicated semantic node.
3. Run whole-item, reading-scale, and natural `665 × 610` detail screenshots.
4. Promote to Current `77:148` only if the new derivative visibly passes; otherwise reject it and test the next higher-quality Drive derivative rather than regenerating the master.
5. Only after Current promotion update `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json` and `CURRENT-STATUS.md` counts.
6. V6 production remains gated until the full V5 dummy-design gate is genuinely complete.
