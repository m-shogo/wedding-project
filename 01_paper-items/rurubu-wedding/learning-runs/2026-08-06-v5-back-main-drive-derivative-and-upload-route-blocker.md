# V5 back-main derivative evidence and Figma upload-route blocker

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
Target node: `77:24`

## Source and authority

- Drive master ID: `1bBiAcFfHJ3-Ns1gAKn6Bct-q-w2p-AvD`
- Drive master: `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY.png`
- Master readback: `image/png`, `2,952,524 bytes`
- Target box: `472 × 304`
- Existing semantic node and rollback state were not modified.

## Visible problem

The live back-cover main image is not the intended verified Drive source and duplicates imagery used elsewhere. Batch A therefore remains incomplete even though an IMAGE fill is present.

## Hypothesis

A role-cropped derivative could close the derivative-selection and Drive-evidence stages while preserving a clear distinction between:

1. accepted Drive master;
2. role-sized Figma derivative;
3. actual live Figma placement and image-hash verification.

## Experiment

- Read the master through the connected Drive binary stream.
- Visually inspected the source and selected a landscape crop centered on the travel camera, compass, map, notebook, rings, and passport.
- Created a `708 × 456` JPEG derivative, corresponding to 1.5× the live target dimensions.
- Compression: JPEG quality 35, progressive/optimized.
- Local derivative size: `33,535 bytes`.
- Visual QA: crop retains the principal travel/wedding objects, has no baked-in labels or false-person identity, and avoids the unrelated lower photo stack.
- Saved the derivative to the verified V5 Drive folder.

## Drive evidence

- Derivative filename: `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY__FIGMA_708x456_Q35.jpg`
- Derivative Drive ID: `1mRalEP6V7TI6MS1NFkhkbMMUDcIVgbZV`
- Parent folder ID: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`
- Drive upload/readback: PASS

## Figma placement attempt

A connector-generated single-use Figma upload URL was requested for exact target node `77:24` with `FILL` scale mode. The uploader container again failed DNS resolution for `mcp.figma.com`.

Result:

- upload endpoint creation: PASS
- binary POST: BLOCKED by execution-network DNS
- live node mutation: NONE
- image hash: NOT CREATED
- screenshot QA for intended source: NOT RUN
- role pass: NOT CLAIMED

A fallback `use_figma` base64 test was also rejected before execution because the placeholder payload was invalid. Figma reported an atomic error; no canvas change occurred. Long model-visible base64 transfer remains disallowed by the prior failure rule.

## Adoption decision

- Derivative crop and Drive artifact: `PROTOTYPED / DRIVE_VERIFIED`
- Live placement: `BLOCKED`
- Role completion: `REJECTED AS INCOMPLETE`
- V5 gate and V6 gate: unchanged

## Reusable lesson

Connector-native Drive upload can preserve derivative evidence independently of Figma placement. This is useful progress, but it must never be counted as source application. The remaining binary transport step must use a path that accepts a mounted file reference directly or a network-capable POST executor; repeated DNS retries and manual base64 transcription are not acceptable.

## Next safe action

Use a genuinely different binary-safe route for `77:24`, or continue another safe Batch A step. On successful placement, record the derivative Drive ID → node `77:24` → returned Figma image hash, then run outer-spread and actual-size screenshot QA before changing ledger counts.
