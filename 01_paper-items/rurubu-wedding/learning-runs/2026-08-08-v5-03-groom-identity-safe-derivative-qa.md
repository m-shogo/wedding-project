# V5-03 groom identity-safe derivative QA

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Status: `DRIVE_VERIFIED / FIGMA_COMPARISON_VERIFIED / CURRENT_NOT_PROMOTED / LEDGER_GATE_PENDING`

## Authorities
Before execution, the project-wide production system, asset-generation memory, Figma/AI learning system, design feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 research/asset status were re-read. V6 production remains blocked until V5 closes.

## Visible problem
`V5-03 / IA_PROFILE_A_PHOTO / 77:296` is an active incomplete profile-photo role. Live semantic geometry is `154 × 180`, while the Current source is below the preferred 4× profile derivative floor. Generated-person identity risk must also remain controlled.

## Tested principle
Do not regenerate a good role master merely for activity. First test whether the verified Drive master can produce a role-specific, identity-safe 4× crop. For small profile roles, test a transport-compressed derivative separately from the higher-quality derivative and adopt only after real-size screenshot QA.

## Source/master QA
Drive master:
- `03_PROFILE_GROOM_YOKOHAMA_DUMMY.png`
- Drive ID `1x4zsKXkk4AHnXoUBHuSX0HnCqPGIy_Wd`
- size `1,835,087 bytes`

Visual QA: the source shows an adult man from the back/side holding a camera against Yokohama waterfront architecture. No readable face is presented. It is suitable as a clearly dummy, non-identity-claiming profile image and does not need regeneration for concept or identity reasons.

## Role derivative A — higher-quality retained candidate
- filename `RURUBU_V5_03_GROOM__FIGMA_616x720_Q35.jpg`
- dimensions `616 × 720` = exact `4×` of the `154 × 180` semantic role
- local/readback bytes `24,795`
- SHA-256 `12fdf094b7c5689a4677249bec7b33d92f22f714a3fe8e9a2a1260afd6797e09`
- Drive ID `1nT1tAU5Ua8xU3h20jvQ1DRKV5hzDrHAO`

## Role derivative B — binary-safe comparison candidate
A lower-weight Q16 derivative was tested because the earlier large inline chunk path detected a length mismatch and therefore made no design-node changes. This is a method switch, not repeated blind retry.

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
PASS as a comparison candidate. The groom portrait remains subordinate to the spread headline/history hero, but is materially cleaner and more intentional than the low-resolution Current photo.

### Reading/page QA
PASS. The profile order remains `OUR PROFILE / ABOUT US → groom → bride → Q&A`. The new crop does not pull disproportionate attention and retains the Yokohama/travel cue.

### Actual-size/detail QA
PASS for V5 dummy-design comparison. At the natural profile render size, hair edge, camera, jacket, skyline and ferris wheel remain distinct. The face remains unreadable/back-facing, avoiding false-person identity presentation.

## Structure QA on comparison
- semantic target name preserved: `IA_PROFILE_A_PHOTO`
- target geometry preserved: `154 × 180`
- native text nodes: `92`
- IMAGE-fill nodes: `9`
- fold guide preserved and visible
- Current remained untouched during the comparison

## Failed experiment and rollback discipline
A first attempt to stage a larger Q35 base64 chunk was guarded at the chunk boundary and failed because the received chunk measured `6,962` instead of expected `7,000`. No design node was changed. The method was switched to a smaller single-call Q16 payload with encoded/decoded/JPEG-marker guards.

The verified comparison was temporarily promoted to Current only to verify the exact Current node/hash path, then immediately restored from preserved comparison `419:8` because the official one-line asset ledger cannot be safely rewritten atomically through the current GitHub connector response path without risking loss of existing provenance fields. Final live Current remains on the prior hash `bef2164a2fc70e882f31f735bf66773299b1a62e`. Comparison `460:2` remains preserved as evidence.

This means **V5-03 is not counted as PHOTO_ROLE_PASS or ROLE_COMPLETE in this run**. The official counts remain unchanged until ledger + Current Status + central learning logs can be updated safely in the same evidence closure.

## Result
`DISCOVERED → PROTOTYPED → VERIFIED_COMPARISON_CANDIDATE`

Not promoted to PROJECT_RULE. Q16 is not generalized to larger photographs. Its acceptability is limited to this `154 × 180` role and the observed actual-size QA.

## Expected improvement if adopted
Sharper profile rendering, stronger Yokohama/travel context, correct 4× derivative floor, and lower identity-misrepresentation risk.

## Possible regression
Over-compression could become visible in print despite passing screen actual-size QA; therefore retain the Q35 Drive derivative as the higher-quality fallback and do not generalize Q16 beyond this small role.

## Evidence still required for ROLE_COMPLETE
1. Safe atomic update of the official V5 asset ledger with Drive IDs, derivative hashes, Figma comparison/current hashes and QA result.
2. Current Status count reconciliation.
3. Central `docs/wedding-design-learning-feedback-log.md` and Rurubu lessons roll-up.
4. Re-promote `77:296` only in the same closure, then repeat Current screenshot + structure/hash readback.

V6 production remains closed.