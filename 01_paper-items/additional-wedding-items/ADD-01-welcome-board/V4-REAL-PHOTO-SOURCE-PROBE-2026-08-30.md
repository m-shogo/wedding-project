# ADD-01 — V4 real-photo source probe — 2026-08-30

State: `V4_VISUAL_QA_IN_PROGRESS / REAL_PHOTO_SOURCE_LOCATED / FIGMA_IMPORT_BLOCKED / EXISTING_IMAGE_HASH_PROBES_REJECTED / PRODUCTION_REVERTED_SAFE / NOT_PROMOTED / NOT_PRINT_READY`

## Live authority before write

- latest `main`: `9aefa2141cdc50bbf966813dced7ef7d6e1cf1ef`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `XyyTGuz6BMf8XRhPZZfdoT`
- V4 clean-room root: `24:3 / V4 / ADD-01 / OPEN DOOR / CLEANROOM`
- replaceable hero role: `24:9 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED`
- exact ADD-01 Drive authority: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- no Rurubu item-specific node/path/asset was edited.

## Meaningful discovery

The exact ADD-01 folder still contains paper/background/decor assets only and no authoritative real couple photograph.

A broader Drive discovery found an actual real-photo source already present in the connected wedding asset corpus:

- `REAL_PHOTO_COVER_HAWAII_BEACH_COUPLE_FULLBODY_01.jpg`
- Drive id: `1QWhFJPWHhwF6tfShyYzWULMGc8YDm55P`
- source dimensions: `4500×3000 px`
- JPEG, about `5.27 MB`

This means the design blocker is no longer “no real photo exists”. The remaining blocker is authoritative non-destructive import/linking of that source into the ADD-01 V4 replaceable hero role in the current execution environment.

## Figma source probes

Live scan of the exact ADD-01 Figma file found two existing IMAGE-fill hashes under historical photo-replacement-resilience QA nodes:

- source A hash `43e60b7cd4624d2cd7bd75dc9ada9d6827b08f50`
- source B hash `5666c2754cf51bfa966bc9032aad5f69abca76d4`

They were tested only as bounded V4 photo-source probes with fresh `FILL` crops. No legacy layout/crop geometry was copied.

### Probe A

Applied temporarily to V4 hero `24:9`. Fresh native screenshot showed a flat navy/tan/cream abstract placeholder composition, not documentary couple photography. Rejected.

### Probe B

A V4-only QA clone was created as `31:2` and source B applied to its cloned replaceable photo role with a fresh crop. Fresh native screenshot again showed a flat green/tan/cream abstract placeholder composition, not documentary couple photography. Rejected.

The QA comparison is retained hidden as:

`31:2 / QA FAILED / ADD-01 V4 / EXISTING FIGMA IMAGE HASHES NOT REAL PHOTO / 2026-08-30`

## Rollback-safe result

The failed source probe was not left in production.

V4 `24:9` was restored to the explicit `REAL_PHOTO_REQUIRED` placeholder state and internal placeholder guidance was restored. The rejected QA comparison was hidden. Old production/V2/V3 were not used as the V4 construction base.

Current V4 remains:

- clean-room composition intact;
- native variable text intact;
- replaceable clipped photo role intact;
- `LONG_COPY_STRESS_PASS + STRUCTURE_QA_PASS` retained;
- `SELLABLE_VISUAL_QA_PASS` for V4 **not claimed** until a real photograph is actually rendered and visually reviewed.

## Import blocker

The real Drive JPEG can be fetched successfully, but the available Figma raster-upload flow requires a one-time external upload POST. That POST cannot currently be completed from this execution environment. Existing Figma IMAGE hashes do not provide the real documentary source and therefore must not be mislabeled or promoted as the couple photo.

Do not substitute AI-generated bride/groom imagery and do not promote either failed hash.

## 2026-08-30 upload-path retest

A fresh live retest narrowed the blocker further without changing the Figma design:

- latest `main` before the retest: `34a492363b934853943efdf7a3b0e663060d8d46`;
- Current remained `VISUAL_REOPENED`;
- Drive authority folder remained `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg`;
- the real JPEG was fetched as the original `image/jpeg`, `5,266,253` bytes;
- live Figma readback reconfirmed `24:3` at `852×1200` and replaceable hero `24:9` at `310×930`, still carrying only the explicit solid placeholder fill;
- the current Figma raster-upload service successfully issued a one-time upload URL targeting `24:9` with `FILL` scale mode;
- the required POST from the execution container failed before transfer because `mcp.figma.com` could not be resolved by DNS (`curl: (6) Could not resolve host`).

This confirms that the remaining blocker is not missing Drive media, not a missing Figma target, and not the absence of an upload action. It is the execution environment's inability to reach the issued upload endpoint. No failed/partial image placement occurred, so no Figma rollback was necessary.

Do not repeatedly generate new upload URLs while this network condition persists. The next meaningful attempt should only occur when an execution path can POST the local JPEG bytes to the issued Figma upload endpoint.

## Print-first state

Working Figma canvas remains provisional `852×1200 px`; final physical A2/A3 choice is not authoritative yet, so actual mm, actual-size type conversion and effective photo PPI are `DEFERRED_FINALIZATION` rather than guessed.

For the located `4500×3000` source, final effective PPI must be recalculated only after authoritative physical poster size and final crop are known. No `RESOLUTION_WARNING` is assigned without that placement geometry.

Still unresolved:

- final A2/A3 physical size;
- printer template / trim / bleed / safe area;
- final real-photo import and crop/focal-point proof;
- CMYK/profile conversion, including photo skin/white/highlight and deep-color risk;
- font embed / PDF export / overprint-knockout / transparency / preflight;
- stand/easel occlusion and real viewing-distance proof;
- 100% or physical print proof.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory.

## Next safe action

When the raster import/link path is available, place the located real photo non-destructively in `24:9`, then run thumbnail / reading / actual-size visual QA and only afterward compare V4 against retained production for promotion.

Until then, ADD-01 V4 remains `VISUAL_QA_IN_PROGRESS / REAL_PHOTO_IMPORT_BLOCKED / NOT_PROMOTED / NOT_PRINT_READY`.
