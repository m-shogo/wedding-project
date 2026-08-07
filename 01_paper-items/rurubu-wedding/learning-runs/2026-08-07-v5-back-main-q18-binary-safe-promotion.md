# Rurubu V5 — back-main Q18 binary-safe promotion

Date: 2026-08-07
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer: `77:18`
Target semantic node: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`

## Authorities read before action

The run re-read the project-wide production system, asset-generation memory, continuous-learning system, global feedback log, project memory, quality-over-legacy decision, Rurubu Current Status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, V6 Current Status, V6 reference analysis, and V6 asset queue before touching live Figma.

## Visible problem

The Current back-main image was visibly soft and semantically wrong for the intended role. Live Current used image hash `2cfd19cf1701db58039a4fc645e4279832ec465a`; its intrinsic source had previously audited at only `176 × 220` while being displayed in a `472 × 304` box. At actual-size screenshot scale, faces/table detail were visibly smeared.

The accepted Drive master for `V5-10` already existed, but prior binary-transfer attempts through a Figma single-use upload URL repeatedly failed because the execution container could not resolve `mcp.figma.com`. That blocker fingerprint had already reached the loop-break condition and was not retried.

## Changed method

A separate Drive derivative already existed:

- filename: `RURUBU_V5_10_BACK_MAIN_TRAVEL_FLATLAY__FIGMA_944x608_Q18_SINGLECALL.jpg`
- Drive file ID: `17YaX5CK-c0cTr4zsL2Dly4J1XSZyFxHG`
- dimensions: `944 × 608`
- bytes: `33,577`
- target box: `472 × 304`
- dimension ratio: exactly `2×` target width and height

The Drive connector returned the derivative as raw/base64 file data. Instead of POSTing to `mcp.figma.com`, the test decoded the exact bytes *inside the Figma Plugin API runtime* using `figma.base64Decode()` and created an image with `figma.createImage()`.

Integrity guards were checked before image creation:

- encoded length: `44,772`
- decoded bytes: `33,577`

This is materially different from the rejected long-manual-base64 attempt: the derivative was first Drive-readback verified, exact encoded/decoded lengths were asserted, the operation ran only on a safe duplicate, and Current was untouched until visual QA passed.

## Safe comparison

Created rollback-safe duplicate:

- `360:2 / V5_BACK_MAIN_Q18_BINARY_SAFE_TEST_2026_08_07`
- duplicate semantic target: `360:8 / BACK_VISUAL_MAIN_MEMORY_PHOTO`

Applied Q18 only to `360:8`.

Created Figma image hash:

- `e3738476f760932bb5b09c9d60f174dd6c84049d`

No Current node was changed during the experiment.

## Three-scale comparison

### Whole item

PASS / Q18 wins.

The back-cover lead visual now reads as an intentional travel flat-lay: map, camera, flowers, notebook and rings. It supports `OUR TRAVEL NOTES` and the adjacent `MEMORY 01` copy rather than showing an unrelated blurred dinner scene. The visual weight remains appropriate relative to the cover hero and Friends & Family section.

### Reading/page scale

PASS / Q18 wins.

Reading order remains:

`OUR TRAVEL NOTES → lead travel image → MEMORY 01 heading/body → FRIENDS & FAMILY → OUR JOURNEY ROUTE → folio`.

The image no longer competes through blur/noise, and the subject matter better reinforces the travel-editorial narrative.

### Actual-size/detail

PASS for V5 dummy-design use.

At the natural node screenshot size (approximately `483 × 322` render for the `472 × 304` semantic box), camera body/lens, map typography texture, rings, flowers and notebook edges remain visually distinct. The old Current image at the same screenshot scale showed pronounced blur and smeared subject detail.

This is **not** print-final approval. Final physical print resolution remains subject to the final real asset, printer template, physical placement, PDF preflight and proof gates.

## Current promotion

After the duplicate won, Current `77:24` copied only the verified IMAGE fill from `360:8`.

Before hash:
- `2cfd19cf1701db58039a4fc645e4279832ec465a`

After hash:
- `e3738476f760932bb5b09c9d60f174dd6c84049d`

Geometry and crop mode were preserved:
- box: `472 × 304`
- scale mode: `FILL`

## Post-promotion structure QA

Current outer readback:

- target node: `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`
- target visible: `true`
- target image hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- native text nodes: `85`
- visible text nodes: `41`
- IMAGE-fill nodes: `14`
- fold guide `77:288`: preserved and visible
- V4 rollback outer `59:2`: preserved
- V4 rollback inside `59:178`: preserved
- comparison frame `360:2`: preserved

No unrelated copy, typography, Friends roles, cover hero, history image, crop geometry, or V6 content changed.

## Decision

`DISCOVERED → PROTOTYPED → VERIFIED / V5-10 CURRENT ADOPTED / DUMMY-DESIGN PHOTO ROLE PASS`

V5-10 may advance to intended-source-applied, photo-role-pass and role-complete in the V5 evidence ledger when this evidence is committed/read back. The decision is limited to V5 dummy-design QA; it does not assert final print readiness.

## Reusable lesson

When external upload-host DNS is blocked but a derivative is already Drive-readback verified and small enough for the Figma execution payload, exact-length-guarded in-runtime decode/createImage can be a valid binary-safe fallback **only after a duplicate-frame test and visual QA**. Do not generalize this to arbitrarily large assets, and do not remove the master/derivative distinction.

## Next application

Use this newly verified route on the next highest-impact dominant role only when the payload remains within the Figma execution limit and the Drive derivative already satisfies role dimensions. History `77:422` and cover hero `77:148` remain gated until separately tested and verified. Do not assume this result makes them pass automatically.
