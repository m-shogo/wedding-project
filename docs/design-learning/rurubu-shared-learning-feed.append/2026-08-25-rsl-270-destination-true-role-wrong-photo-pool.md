# RSL-270 — Destination-true photo pool can still be wrong for the live editorial role

Date: 2026-08-25
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL (FULL-POOL ASSET AUDIT) / LIVE-DESIGN PROMOTION STILL BLOCKED`
Fingerprint: `F-RSL-270-DESTINATION-TRUE-PHOTO-POOL-IS-SEMANTICALLY-WRONG-FOR-LIVE-EDITORIAL-ROLE`

## Observation

A verified Hawaii photo pool can tempt production to treat every image in it as a valid “Hawaii asset.” For Cafe/Table this is false.

The first test audited 16 actual-couple Hawaii images and found only portrait / beach / park / waterfront-environment roles. This pass expanded the audit to the **complete `001.jpg`–`036.jpg` source pool, 36 of 36 actual images** from Drive folder `1A6cea2UHMv3fiZ43PcCCj3BXxXKK-PyV / ハワイ写真`.

The remaining images reproduce the same source family: actual-couple wedding portraits, beach/lawn/waterfront environmental portraits and wedding/shoot props. Across the complete 36-image pool, **0 frames** perform the reader-facing Cafe/Table jobs of appetizing food/drink, plate/table detail, restaurant/interior atmosphere, or eating/shared-meal hands.

## Root cause

When asset truth is checked only at destination level (`this really is Hawaii`), the design can still make an editorially false assignment (`therefore it can illustrate Cafe/Table`). The missing gate is **semantic role truth**: what reader-facing job does the image itself actually perform?

Destination truth, identity truth and editorial-role truth are independent axes.

## Full-pool local test

- Re-read live H10 `2467:2` and AS7 `2454:25` before changing photo authorities.
- Re-read V7 Cafe/Table photo authority `2305:2`.
- Fetch and inspect the complete actual-couple Hawaii folder, including the previously unaudited files rather than extrapolating from the first 16.
- Compare all 36 frames against live image jobs.

V7 H10 requires three distinct jobs:
1. appetite-first Cafe dominant;
2. transition from pause/table toward the next shop/street;
3. shared-table food dominant with food + plate + hands/shared feeling + place atmosphere.

V8 AS7 deliberately has a different job:
- one observational dining-essay frame that can hold food + one human gesture + place/room atmosphere without turning the restrained book spread into V7's multi-photo grammar.

Result: **no source frame qualifies for either Cafe/Table system.**

## Decision

Do not place destination-correct portrait/environment photography into H10 or AS7 merely because it is genuine Hawaii.

The next asset work must begin from each live editorial job:
- V7: create/select three role-specific photo families and picture-edit the three-photo set together;
- V8: create/select materially different single-frame dining essays and judge whether one frame can carry food / gesture / place while preserving quiet book rhythm.

Current dummy geometry is not a final photography contract. Select the photograph first; then re-decide crop, area and hierarchy.

## What changed because of the learning

Without this gate, the project could have improved “truth” superficially by replacing a dummy with an actual Hawaii portrait. The full audit proves that continuing to mine this folder for Cafe/Table is low-value repetition, so the method changes from **destination-folder search** to **role-specific photo direction**.

It also prevents V8 from lazily inheriting V7's solution. V7 and V8 can share the same source-truth gate while requiring materially different photography systems.

## What this is NOT

- not “never reuse a photo across sections”;
- not “portraits cannot appear near food content”;
- not “real photography is inferior to generated photography”;
- not a rule that a Cafe/Table image must show every listed object;
- not evidence that role-specific generated or newly sourced photography has already improved the live spread.

The principle is narrower: **destination/source authenticity does not substitute for editorial-role fit**.

## Promotion boundary

The negative asset-truth claim is now verified locally against the complete available pool. Keep **live-design promotion blocked** until materially different role-correct Cafe/Table candidates are tested at whole-item, reading and actual-size/detail scales. Cross-item/project-rule promotion still requires evidence beyond Rurubu WEDDING.

## Figma authority evidence

- V7 photo authority `2305:2` updated to `FULL-36-SOURCE-POOL + ROLE-SET PICTURE-EDIT GATE`.
- hidden V7 pre-full-pool rollback `2526:2`.
- V8 single-dining-essay photo authority `2527:2`, non-current and production-independent.
- H10 `2467:2` and AS7 `2454:25` production roots were not changed.

## Production/failure note

The first V8 authority-sheet build exposed a separate Figma production failure: auto-layout text intended to auto-height remained at `10px`, causing severe clipping. The broken output was not promoted. It was repaired via explicit safe row/text heights plus screenshot/readback QA. That failure is recorded separately so RSL-270 stays about asset-role truth rather than tool mechanics.
