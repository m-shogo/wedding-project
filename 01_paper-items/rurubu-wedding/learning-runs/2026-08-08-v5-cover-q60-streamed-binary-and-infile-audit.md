# V5-01 Cover Hero — streamed binary and in-file source audit

Date: 2026-08-08
Status: `VERIFIED_BLOCKER_ISOLATION / CURRENT_UNCHANGED / V5_GATE_STILL_OPEN`
Scope: Rurubu WEDDING V5 only

## Authority refresh

Before acting, the project-wide Figma production system, asset-generation memory, continuous-learning system, design-learning feedback log, project memory, quality-over-legacy decision, Current Status, V5 asset ledger, editorial knowledge/lessons, Production Operating System V2, postmortem/V6 guardrails, and V6 clean-room research/asset queue were reviewed. V6 production remains gated behind verified V5 dummy-photo/design completion.

## Visible problem

`V5-01 / 77:148 / IMG_HERO` remains the only active V5 photo-role blocker and the final dominant-photo blocker. Fresh whole-outer screenshot review confirms that the current sunset Yokohama hero is visibly softer/pixelated than the already-repaired supporting photography and therefore cannot be promoted merely to reach `11/11`.

Current live evidence:
- Current outer: `77:18`
- Current hero node: `77:148 / IMG_HERO`
- semantic geometry: `665 × 610`
- Current image hash: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- live intrinsic image size: `640 × 587`
- current quality state remains rejected for dominant-photo QA

## Verified Q60 source

The prepared Q60 derivative was re-read from Google Drive through a raw-file streaming path rather than model-visible base64 transcription:

- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- filename: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- MIME: `image/jpeg`
- dimensions: `1330 × 1220`
- bytes: `155,439`
- recorded SHA-256: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

The connector returned the raw file as a binary file reference and materialized it in the execution runtime without exposing or manually transcribing the encoded payload. Visual inspection confirms the Q60 source is materially sharper than Current and retains the intended Yokohama skyline, Landmark Tower, ferris wheel, waterfront, sunset, and usable cover crop. No person-identity risk is introduced.

## Experiment A — connector-native Figma upload staging

### Hypothesis

Now that Drive → execution-runtime binary transport is exact and model-invisible, Figma's native asset-upload endpoint could place the Q60 bytes directly on rollback-safe staging node `469:132`, avoiding the already-rejected manual base64 path.

### Result

Figma successfully issued a new single-use image upload URL targeting:
- staging frame: `469:2`
- target node: `469:132`
- scale mode: `FILL`

The subsequent raw-byte POST from the execution container failed before upload with:

`curl: (6) Could not resolve host: mcp.figma.com`

No Figma node or image fill changed.

### Decision

`BLOCKED_BY_EXECUTION_DNS / DO_NOT_RETRY_SAME_PATH_WITHOUT_NETWORK_CHANGE`.

This is the same external-host DNS fingerprint seen previously, so no repeated upload attempts were made in this run.

## Experiment B — whole-file in-Figma image inventory

### Hypothesis

Before treating external upload as a hard blocker, verify whether a higher-resolution cover-hero image already exists somewhere in the live Figma file and can be reassigned without new binary transport.

### Method

A live `use_figma` audit enumerated every IMAGE fill on page `01_RURUBU_WEDDING`, deduplicated image hashes, and queried each image's intrinsic pixel size with `getSizeAsync()`.

### Result

The Current hero hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` is the only cover-hero image source currently present in-file for the Current/legacy-derived cover family. Its intrinsic size is only `640 × 587`.

The same low-resolution hash is reused by Current and the preserved cover comparisons, including:
- Current `77:148`
- dense clean-room `413:132`
- Q60 staging target `469:132`
- hybrid direct-coverline prototype `524:132`

No `1330 × 1220` or otherwise higher-resolution cover-hero image hash exists in the live Figma page. Other repaired photo roles correctly report their larger intrinsic derivatives (for example history `1356 × 560`, back main `944 × 608`, Friends cafe `810 × 552`, lead memory `796 × 428`).

### Decision

`VERIFIED`: reusing an already-uploaded high-resolution hero from another Figma frame is not available. Closing V5-01 genuinely requires introducing a new raster binary into Figma.

## What improved in this run

No visual Current change was adopted, but the blocker boundary is now materially narrower and better evidenced:

1. source/master defect: **not the blocker** — Q60 is Drive-verified and visually stronger;
2. Drive → runtime raw binary transfer: **verified working**;
3. model-visible/manual base64 transport: **already rejected and not retried**;
4. existing in-file high-resolution reuse: **ruled out by live hash/intrinsic-size audit**;
5. remaining blocker: **execution environment cannot resolve/post raw bytes to `mcp.figma.com`**.

This prevents future runs from wasting time on regeneration, manual base64 copying, or searching the existing Figma file for a high-resolution hero that is not there.

## Failure / regression check

- Current `77:148` unchanged at hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`.
- staging `469:132` remains on the same old hero hash.
- Current/rollback/comparison frames remain preserved.
- no generated asset was replaced or regenerated.
- PHOTO_ROLE_PASS remains `10 / 11 active`.
- ROLE_COMPLETE remains `10 / 11 active`.
- dominant-photo pass remains `2 / 3`.
- V6 production gate remains closed.

## Learning state

### Tested principle

Before repeating a blocked binary-import method, independently verify each boundary in the transport chain and audit whether an already-present in-file source can satisfy the role.

### Result

`PROTOTYPED → VERIFIED` for this V5 diagnostic workflow. It is useful process evidence, but it is **not** promoted directly to a project-wide rule because the DNS behavior is environment-specific.

### Next safe application

Do not regenerate V5-01 and do not retry model-visible base64. On a future run, use a genuinely binary-safe Figma upload path only if the execution environment can reach the issued upload host or if a connector action accepts the local file reference directly. Until that capability changes, continue only rollback-safe editorial/typographic comparison work that does not falsely close the cover-photo gate.
