# V5-03 groom identity-safe derivative QA

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Status: `DRIVE_VERIFIED / FIGMA_COMPARISON_VERIFIED / CURRENT_PROMOTED / ROLE_COMPLETE`

## Authorities
Before execution, the project-wide production system, asset-generation memory, Figma/AI learning system, design feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 research/asset status were re-read. V6 production remains blocked until V5 closes.

## Visible problem
`V5-03 / IA_PROFILE_A_PHOTO / 77:296` was an active incomplete profile-photo role. Live semantic geometry is `154 × 180`, while the prior Current source was below the preferred 4× profile derivative floor. Generated-person identity risk also had to remain controlled.

## Tested principle
Do not regenerate a good role master merely for activity. First test whether the verified Drive master can produce a role-specific, identity-safe 4× crop. For small profile roles, test a transport-compressed derivative separately from the higher-quality derivative and adopt only after real-size screenshot QA.

## Source/master QA
Drive master:
- `03_PROFILE_GROOM_YOKOHAMA_DUMMY.png`
- Drive ID `1x4zsKXkk4AHnXoUBHuSX0HnCqPGIy_Wd`
- size `1,835,087 bytes`

Visual QA: the source shows an adult man from the back/side holding a camera against Yokohama waterfront architecture. No readable face is presented. It is suitable as a clearly dummy, non-identity-claiming profile image and did not need regeneration for concept or identity reasons.

## Role derivative A — higher-quality retained candidate
- filename `RURUBU_V5_03_GROOM__FIGMA_616x720_Q35.jpg`
- dimensions `616 × 720` = exact `4×` of the `154 × 180` semantic role
- bytes `24,795`
- SHA-256 `12fdf094b7c5689a4677249bec7b33d92f22f714a3fe8e9a2a1260afd6797e09`
- Drive ID `1nT1tAU5Ua8xU3h20jvQ1DRKV5hzDrHAO`

## Role derivative B — accepted binary-safe Current derivative
A lower-weight Q16 derivative was tested because the earlier large inline chunk path detected a length mismatch and therefore made no design-node changes. This was a method switch, not repeated blind retry.

- filename `RURUBU_V5_03_GROOM__FIGMA_616x720_Q16.jpg`
- dimensions `616 × 720`
- bytes `12,865`
- SHA-256 `1d4152adddb99ddf256f7f9e31d284cc8ca93e6b51624b0f6231f02e8a7d162c`
- Drive ID `1gi7hPnUi2B_fWbwROrq5Mw5Skora3VQy`
- encoded length `17,156`

Drive save and Drive readback completed before Figma placement.

## Figma comparison
Fresh duplicate:
- frame `460:2 / V5_03_GROOM_IDENTITY_SAFE_Q16_QA_2026_08_08`
- target `460:8 / IA_PROFILE_A_PHOTO`
- target geometry `154 × 180`
- image hash `a39dd297eb9de572317a5ce57f0af12e8597b156`

Binary integrity guard before image creation:
- encoded length exactly `17,156`
- decoded length exactly `12,865`
- JPEG SOI/EOI markers verified

### Whole-item QA
PASS. The groom portrait remains subordinate to the spread headline/history hero, but is materially cleaner and more intentional than the previous low-resolution Current photo.

### Reading/page QA
PASS. The profile order remains `OUR PROFILE / ABOUT US → groom → bride → Q&A`. The crop does not pull disproportionate attention and retains the Yokohama/travel cue.

### Actual-size/detail QA
PASS for V5 dummy-design QA. At the natural profile render size, hair edge, camera, jacket, skyline and ferris wheel remain distinct. The face remains unreadable/back-facing, avoiding false-person identity presentation.

## Current promotion verification
Current node:
- `77:296 / IA_PROFILE_A_PHOTO`
- geometry preserved: `154 × 180`
- previous image hash: `bef2164a2fc70e882f31f735bf66773299b1a62e`
- promoted image hash: `a39dd297eb9de572317a5ce57f0af12e8597b156`

After promotion, a fresh Current screenshot confirmed that the accepted crop matches the comparison behavior at whole-spread and reading scale. A direct actual-size screenshot of `77:296` confirmed that the camera, hair/jacket edge and Yokohama skyline remain readable while the face stays non-identifying.

## Structure QA after promotion
- semantic target name preserved: `IA_PROFILE_A_PHOTO`
- target geometry preserved: `154 × 180`
- native text nodes: `92`
- IMAGE-fill nodes: `9`
- fold guide `77:540` preserved and visible
- V4 rollback frames `59:2` and `59:178` preserved
- comparison `460:2` preserved

## Failed experiment and method switch
A first attempt to stage the larger Q35 base64 chunk was guarded at the chunk boundary and failed because the received chunk measured `6,962` instead of expected `7,000`. No design node was changed. The method switched to the smaller single-call Q16 payload with encoded/decoded/JPEG-marker guards.

The prior run temporarily tested the Current promotion path and then restored the old hash because the one-line ledger had not yet been safely rewritten. This run solved that recordkeeping blocker by reading the complete ledger payload, updating it atomically, and only then closing the evidence chain.

## Ledger and status closure
Official V5 ledger now records:
- intended source applied: `9 / 11 active`
- PHOTO_ROLE_PASS: `8 / 11 active`
- ROLE_COMPLETE: `8 / 11 active`

`CURRENT-STATUS.md` is reconciled to the same counts and records the exact Drive IDs, derivative hashes, Current node/hash, comparison IDs and structure evidence.

## Result
`DISCOVERED → PROTOTYPED → VERIFIED → V5_ROLE_COMPLETE`

Not promoted to PROJECT_RULE. Q16 is not generalized to larger photographs. Its acceptability is limited to this `154 × 180` role and the observed actual-size QA.

## Expected improvement achieved
Sharper profile rendering, stronger Yokohama/travel context, correct 4× derivative floor, and lower identity-misrepresentation risk.

## Possible regression / retained mitigation
Q16 may be too compressed for a later physical print proof even though it passes V5 dummy-design screen QA. The Q35 Drive derivative remains preserved as a higher-quality fallback, and final print readiness remains a separate gate.

## Next application
1. Apply the same identity-first review to `V5-04 / 77:302`; crop or replace the recognizable generated bride face before any role pass.
2. Close `V5-13 / 77:43` only after live geometry is re-read and the dining derivative is matched to that geometry.
3. Keep `V5-01 / 77:148` as the highest-priority remaining role because it is the final dominant-photo blocker.
4. Keep V6 production closed until all active V5 dummy-photo/design gates pass.