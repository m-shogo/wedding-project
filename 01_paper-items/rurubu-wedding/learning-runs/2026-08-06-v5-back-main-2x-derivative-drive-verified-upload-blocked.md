# V5 Back Main — 2x Derivative Drive Verified / Figma Upload Blocked

Date: 2026-08-06
Item: Rurubu WEDDING V5
Role: `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
Figma target: `77:24`

## Source and authority

- Drive master ID: `1bBiAcFfHJ3-Ns1gAKn6Bct-q-w2p-AvD`
- Master filename: `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY.png`
- Target box: `472 × 304 px`
- Required dummy derivative floor: approximately `944 × 608 px`
- Existing live Figma image hash before this run: `2cfd19cf1701db58039a4fc645e4279832ec465a`

## Visible problem

The intended back-main Drive asset had not been applied to the semantic Figma node. The previously prepared `708 × 456 / Q35` derivative was below the documented approximate 2× role-size floor and therefore was not adopted as final evidence.

## Hypothesis

A role-sized `944 × 608` derivative produced directly from the verified master, with a deliberate landscape crop preserving the camera, flowers, map, notebook and rings, should improve detail retention and crop plausibility at the `472 × 304` Figma placement.

## Experiment and result

1. Read back the master from Drive.
2. Confirmed master dimensions: `1122 × 1402`.
3. Created a non-destructive landscape derivative at `944 × 608`, JPEG quality 88.
4. Visually inspected the derivative before acceptance.
5. Saved it as a separate Drive derivative; the master was not overwritten.
6. Read back the Drive file and verified its ID, name, MIME type and byte size.

Verified derivative:

- Drive ID: `1rSYTEUwb3xE87hGOSmuKWuM7cJ9SCA0i`
- Filename: `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q88.jpg`
- Dimensions: `944 × 608 px`
- MIME type: `image/jpeg`
- Bytes: `161,671`
- Parent folder: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

## Figma application attempt

The current node was inspected before mutation:

- node ID: `77:24`
- semantic name: `BACK_VISUAL_MAIN_MEMORY_PHOTO`
- type: `RECTANGLE`
- size: `472 × 304`
- existing image hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`

A node-targeted `upload_assets` URL was issued successfully. The binary POST from the execution environment failed at DNS resolution for `mcp.figma.com` (`curl: (6) Could not resolve host`). This is the same transport-class blocker already observed, so the method must not be repeated unchanged.

## Regression risk

- A landscape crop from a portrait master can remove lower decorative content.
- Overcompression could create visible artifacts despite correct pixel dimensions.
- Treating Drive save as Figma completion would create false evidence.

## Decision

- Derivative creation and Drive readback: **VERIFIED / ADOPTED**.
- Figma source application: **NOT COMPLETE**.
- `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, and V5/V6 gates remain unchanged.
- Live Figma node was not mutated by the failed POST.

## Next safe method

Switch away from direct `mcp.figma.com` POST. Use a bounded binary-safe Figma method, such as chunked temporary shared-plugin-data transfer followed by `figma.base64Decode()` / `figma.createImage()`, then clear temporary data. After placement, verify exact node ID, new image hash, crop, whole-spread screenshot, actual-size detail, native structure and rollback state before changing the ledger counts.

## Learning status

`PROTOTYPED`: a correct 2× Drive derivative is proven. The Figma transport method remains unverified for this asset and cannot be promoted to a project rule.
