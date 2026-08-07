# V5 cover hero Drive derivative repair

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Role: `V5-01 / IMG_HERO / 77:148`
Current V5 frame was not modified in this run.

## Authorities re-read
Before the asset action, the project-wide Figma production system, generated-asset memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 asset evidence ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 gate/status were re-read. The ledger remains authoritative for role counts.

## Visible / evidence-backed problem
The existing Current cover-hero derivative is only `5,927 bytes` and remains `REJECT_LOW_QUALITY_DERIVATIVE`. The semantic target is `665 × 610`, so the V5 dummy-design derivative floor is `1330 × 1220`.

The accepted source master remains:
- `01_COVER_HERO_YOKOHAMA_DUMMY.png`
- Drive ID `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
- `2,089,658 bytes`
- decoded source size `1122 × 1402`

The source is portrait-oriented while the target is near-landscape. This is a real composition/crop constraint, not merely a compression problem.

## Hypothesis
A role-specific crop derived from the verified master, rather than the old ultra-small transport image, should materially improve the dominant photograph while preserving the existing provenance and avoiding unnecessary regeneration.

Expected improvement:
- exact `2×` role dimensions
- materially more detail than the 5,927-byte derivative
- stronger skyline/water readability at cover scale
- provenance stays tied to the verified Drive master

Possible regression:
- severe portrait-to-near-landscape crop could remove too much sky/water balance
- aggressive JPEG compression could reintroduce blockiness
- upscaling from 1122px source width to 1330px derivative width cannot add real source detail

Evidence required before Current promotion:
- Drive readback of the derivative
- binary-safe import to a duplicate first
- exact Figma image hash
- whole-spread, reading/page, and actual-size screenshot QA
- structure/crop/fold audit
- ledger and Current Status update only after the above pass

## Derivative construction
The source was decoded from Drive and visually inspected. A target-ratio crop was taken from the master at source coordinates approximately:
- x: `0..1122`
- y: `250..1279`

This preserves the Yokohama skyline, ferris wheel, waterfront, and foreground railing while removing excess upper sky.

Two `1330 × 1220` derivatives were produced from the same crop:

### High-quality QA derivative
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q90.jpg`
- bytes `419,664`
- SHA-256 `3b81d34a9b149905321de02a363dfba248d7c825ffbd544250743731a4b10180`
- Drive ID `1y6yNzYOUJd5Wu1GGLxu5ahzG8bKSazey`
- Drive readback confirmed filename and byte size

### Binary-transfer candidate
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q30.jpg`
- bytes `97,693`
- SHA-256 `2adf6404cee29eedeec1018db702555731c1b8d65c7cab1dd37cf5b1e69157c7`
- Drive ID `1RCJWiSdFElnz7XVDb7x2yCkpEg-Bh_5f`
- Drive readback confirmed filename and exact `97,693` byte size

The Q30 derivative was visually inspected locally and remains materially clearer than the rejected 5,927-byte transport proof. Fine sky/water compression is visible at high zoom, so it is a transfer candidate, not an automatic PHOTO_ROLE_PASS.

## Result
`MASTER_DRIVE_READBACK_VERIFIED → FIGMA_DERIVATIVE_CREATED → DERIVATIVE_LOCAL_VISUAL_QA_PASS / DRIVE_READBACK_VERIFIED / FIGMA_IMPORT_PENDING`

No PHOTO_ROLE_PASS, ROLE_COMPLETE, or dominant count changes are claimed in this run. Current stays at `2/12` active photo roles and `2/3` dominant roles until live Figma evidence passes.

## Method decision
Do not retry the old 5,927-byte path. The next attempt should use the already-proven guarded chunk reconstruction method used successfully for V5-05 history, applying the Q30 derivative to a rollback-safe duplicate first. If Q30 visibly underperforms at actual-size screenshot QA, use the Q90 derivative or regenerate only if the master crop itself is proven inadequate.

## V6 boundary
V6 remains research/preparation only. This run does not open the V6 production gate.
