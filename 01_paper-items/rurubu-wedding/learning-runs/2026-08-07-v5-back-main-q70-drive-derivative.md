# V5-10 back-main Q70 derivative — Drive evidence

Date: 2026-08-07
Item/version: Rurubu WEDDING V5
Role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
Target node: `77:24`
Target box: `472 × 304`

## Why this derivative exists

The accepted Q88 derivative is visually strong but is `161,671` bytes. The currently proven Figma fallback is chunked shared-plugin-data transport, so a smaller role-sized derivative was tested to reduce transfer complexity without falling below visible quality.

This is not regeneration of the master. It is a derivative from the already accepted V5-10 master and preserves the same composition.

## Derivative evidence

- filename: `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q70_TRANSPORT.jpg`
- dimensions: `944 × 608`
- relationship to target: exact `2×` width and height
- bytes: `95,542`
- SHA-256: `4ab985df8eccde405a66eaedb12cf6218e5b21856521f60ec175a5a61273c1f1`
- MIME: `image/jpeg`
- Drive ID: `1L-SQiPuNHrCMuTbb_yaf9FNPg5iuf8uN`
- Drive parent: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

Drive upload and readback both succeeded.

## Visual QA before Figma placement

The derivative was reviewed at source scale. It retains readable detail in the camera body/lens, map linework, rings, compass, notebook, flowers, and fabric. No recognizable generated person exists, and there is no baked editorial text/logo/credential.

The image has a distinct editorial role compared with the current sunset-dining placeholder: it reads as travel-memory evidence rather than another meal/Friends scene.

Status at this stage:

`DERIVATIVE_VISUAL_QA_ACCEPTED_FOR_FIGMA_TEST / DRIVE_SAVED / DRIVE_READBACK_VERIFIED / FIGMA_NOT_APPLIED`

## Live state deliberately unchanged

Current node `77:24` still carries image hash:

`2cfd19cf1701db58039a4fc645e4279832ec465a`

The Q70 derivative does not count as `INTENDED_SOURCE_APPLIED`, `SCREENSHOT_QA_PASS`, `PHOTO_ROLE_PASS`, or `ROLE_COMPLETE` until exact Figma placement and the required three-scale/structure checks succeed.

## Next safe step

Use the previously verified chunked shared-plugin-data → `figma.base64Decode()` → `figma.createImage()` path. Verify exact reconstructed byte count (`95,542`) before applying. After application, capture the new image hash and run:

1. whole outer-spread QA;
2. back-cover reading/page QA;
3. actual-size/detail QA of `77:24`;
4. crop/contrast/fold check;
5. native-text/semantic-node/rollback structure audit;
6. asset-ledger update and GitHub readback.

If Q70 visibly loses detail at the live placed size, reject and restore the previous hash rather than lowering the quality gate.