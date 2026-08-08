# V5 cover Q60 staging truth audit

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current frame: `77:18`
Current hero: `77:148 / IMG_HERO`
Rollback-safe staging frame: `469:2`
Staging target: `469:132 / IMG_HERO`

## Authorities re-read

Before work, re-read the project-wide Figma production system, generated-asset memory, continuous-learning system, design feedback log, project memory, quality-over-legacy decision, current Rurubu status, V5 asset evidence ledger, editorial knowledge base, Rurubu lessons log, V5 operating system, postmortem, and V6 status/research/asset queue files.

Authoritative state at the start of this run:
- active Current photo roles: `11`
- intended source applied: `11 / 11`
- `PHOTO_ROLE_PASS`: `10 / 11`
- `ROLE_COMPLETE`: `10 / 11`
- dominant role pass: `2 / 3`
- only open active photo role: `V5-01 / 77:148 / IMG_HERO`
- V6 production gate remains closed

## Visible problem

The cover hero remained visibly soft at its natural `665 × 610` size. A preserved comparison frame was named `V5_COVER_HERO_Q60_QA_2026_08_08`, which could be interpreted as evidence that the prepared Q60 derivative had already reached Figma and been visually QA'd.

Because completion claims must be reproduced from live node/hash evidence, the staging frame itself was audited before any promotion.

## Hypothesis

If the Q60 staging target truly contains the Drive-readback Q60 derivative, its live Figma image hash should differ from the rejected Current hero hash and the natural-size screenshot should show the sharper source.

Expected improvement if true:
- higher-frequency skyline, railing, water and ferris-wheel detail at actual role size
- final dominant-photo blocker can proceed to three-scale QA

Possible regression:
- a staging label could create false evidence if its image fill was never actually changed
- direct upload could again fail because of the known execution-network DNS blocker

Evidence required before adoption:
- Drive Q60 ID/bytes/SHA readback
- exact staging node image hash
- successful binary placement with integrity checks
- natural-size, reading/page and whole-item screenshots
- structure/rollback preservation
- Current promotion readback
- ledger and GitHub reconciliation

## Live Figma truth audit

Read-only live inspection found:

### Current
- node: `77:148 / IMG_HERO`
- geometry: `665 × 610`
- image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

### Supposed Q60 staging target
- node: `469:132 / IMG_HERO`
- geometry: `665 × 610`
- image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

The hashes are identical. Natural-size screenshots also showed the same visibly soft image.

**Result: the Q60 derivative had NOT been applied to the staging frame.** The old staging name was therefore misleading and could not be used as Q60 QA evidence.

No `PHOTO_ROLE_PASS`, `ROLE_COMPLETE`, or dominant count was changed.

## Q60 Drive derivative verification

Drive file re-fetched as raw binary:
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- dimensions: `1330 × 1220`
- bytes: `155,439`
- SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The runtime readback exactly matched the ledger values.

Local visual inspection of that exact Drive-readback binary shows materially better detail than Current: Landmark Tower, ferris wheel, waterfront structures, railing, reflections and skyline edges are substantially clearer. The crop retains a broad calm sky/water region and does not introduce a recognizable generated person as the couple or guest.

This verifies the derivative itself as a strong candidate, **not** its Figma placement or role completion.

## Native upload experiment

A fresh Figma single-use upload endpoint was requested for staging node `469:132`, then the exact local Drive-readback JPEG was posted as `image/jpeg`.

Result:
- endpoint creation: succeeded
- external binary POST: failed with `Could not resolve host: mcp.figma.com`

This reproduces the already-known execution-network DNS blocker. The method was immediately abandoned and was not retried.

Status:
`TRANSFER_METHOD_BLOCKED / NO_CURRENT_MUTATION`

## Truthfulness correction adopted in live Figma

To prevent the staging frame name from overstating evidence, the frame itself was renamed:

- before: `469:2 / V5_COVER_HERO_Q60_QA_2026_08_08`
- after: `469:2 / V5_COVER_HERO_Q60_TRANSFER_PENDING_2026_08_08`

Live metadata readback confirmed the new name. No image, text, crop, geometry, visibility, semantic node, fold guide, or Current frame was changed by this correction.

This is an evidence-label correction, not a visual-quality promotion.

## Result

`VERIFIED_TRUTH_CORRECTION / Q60_DERIVATIVE_DRIVE_READBACK_VERIFIED / Q60_FIGMA_TRANSFER_PENDING / CURRENT_UNCHANGED`

Authoritative counts remain:
- intended source applied: `11 / 11 active`
- `PHOTO_ROLE_PASS`: `10 / 11 active`
- `ROLE_COMPLETE`: `10 / 11 active`
- dominant pass: `2 / 3`

V6 production remains closed.

## Failure / learning

1. A comparison-frame name is not placement evidence. A label such as `Q60_QA` must never substitute for an exact live image-hash audit.
2. Drive readback and derivative visual quality can be verified independently from Figma transport; both are necessary but neither proves `ROLE_COMPLETE` alone.
3. The `mcp.figma.com` upload endpoint remains unusable from this execution container because of DNS resolution. Do not spend another run repeating that path unless the network capability changes.
4. The next transfer attempt must use a different binary-safe mechanism with explicit encoded-length, decoded-byte and JPEG-boundary guards, and must apply to `469:132` before Current.
5. No learning in this run is promoted directly to `PROJECT_RULE`; the staging-name lesson is recorded as a verified V5 evidence-governance correction.

## Next safe action

- use the previously proven guarded chunk-reconstruction fallback, or another connector-native binary path that does not depend on external DNS, for the exact Q60 Drive-readback bytes
- apply only to `469:132` first
- verify new hash differs from rejected hash
- run natural `665 × 610` detail QA, front-cover reading QA and whole-outer QA
- compare Current legacy-derived cover against the preserved clean-room cover at all three scales
- promote to Current only if Q60 visibly wins and structure/rollback remain intact
- then reconcile ledger/Current status and run final V5 weakest-three, typography, density and fold/safe-area gate
- begin V6 production only after `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` is genuinely verified
