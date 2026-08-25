# RSL-270 — Destination-true photo pool can still be wrong for the live editorial role

Date: 2026-08-25
Scope: Rurubu WEDDING only
State: `TESTED_LOCAL (ASSET-AUDIT)`
Fingerprint: `F-RSL-270-DESTINATION-TRUE-PHOTO-POOL-IS-SEMANTICALLY-WRONG-FOR-LIVE-EDITORIAL-ROLE`

## Observation

A verified Hawaii photo pool can tempt production to treat every image in it as a valid “Hawaii asset.” For V7 H10 Cafe/Table this is false. Sixteen audited actual-couple Hawaii images were destination-correct but visually belonged to portrait / beach / park / waterfront-environment roles, not food/table editorial roles.

## Root-cause hypothesis

When asset truth is checked only at destination level (`this really is Hawaii`), the design can still make an editorially false assignment (`therefore it can illustrate Cafe/Table`). The missing gate is **semantic role truth**: what reader-facing job does the image itself actually perform?

## Local test

- Read current H10 `2467:2` image-role contract.
- Read V7 Cafe/Table photo brief `2305:2`.
- Audit sixteen real images from `1A6cea2UHMv3fiZ43PcCCj3BXxXKK-PyV / ハワイ写真`.
- Compare the pool against the three live H10 image jobs: appetite-first Cafe dominant, next-shop/street transition, shared-table food dominant.

Result: no audited image contained the food/drink/plate/table/interior/shared-meal evidence needed for those roles.

Decision: **do not place this destination-correct pool into H10**. Update the photo authority with a source-pool role gate and keep production H10 unchanged.

## What changed because of the learning

Without this gate, the project could have improved “truth” superficially by replacing a dummy with an actual Hawaii portrait. After the audit, that move is explicitly rejected as semantically indefensible. The next search/generation task must start from H10's editorial jobs, not from a destination folder name.

## What this is NOT

- not “never reuse a photo across sections”;
- not “portraits cannot appear near food content”;
- not “real photography is inferior to generated photography”;
- not a rule that a Cafe/Table image must show every listed object.

The principle is narrower: **destination/source authenticity does not substitute for editorial-role fit**.

## Promotion boundary

Keep at `TESTED_LOCAL (ASSET-AUDIT)` until materially different role-correct Cafe/Table candidates are tested in live H10 at whole-item, reading and actual-size scales. Promotion requires an observed improvement and no unacceptable source-truth, rhythm, crop or print regressions.

## Production/failure note

Two parallel inline-image transport experiments for a separate Memory candidate failed atomically (`createImage` unsupported image type; then malformed base64 decode). No publication root changed. Do not repeat the same inline-binary method without a material implementation change.
