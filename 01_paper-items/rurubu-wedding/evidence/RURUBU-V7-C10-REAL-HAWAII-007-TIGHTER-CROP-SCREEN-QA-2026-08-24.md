# Rurubu WEDDING V7 — C10 REAL HAWAII 007 tighter-crop screen QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`

## Why this test existed

Live Figma readback contradicted the older durable status: C9 `2462:2` already contained a legitimate `007.jpg` **screen-comparison derivative** in hero `2462:20`, hash `e9c5d4b516f723b16994a92d0b96a46aaf7619f8`. The image was not the old dummy, but its intrinsic size was only `350×233`, so it could support composition/crop judgment only, not actual-size or print-quality approval.

The legitimate high-resolution candidate master remains:

- Drive title: `v7_outer_hawaii_007_realphoto_candidate_master.jpg`
- Drive ID: `1NsFR25Q963Nk847fTMB3elwWy689P8XY`
- verified raw JPEG size: `5,266,253 bytes`
- verified intrinsic source: `4500×3000`

## New/deeper professional input

This pass used photo-editing/sequencing and visual-authenticity guidance rather than another typography or microcopy pass. The bounded hypothesis was: once a legitimate photograph exists, do not treat the dummy frame crop as sacred; compare whether a different crop better balances people and place while preserving photographic truth. Cropping may remove extraneous image area, but must not invent, move, or remove depicted content.

## C9 baseline

- root: `2462:2`
- hero: `2462:20`
- imageHash: `e9c5d4b516f723b16994a92d0b96a46aaf7619f8`
- intrinsic screen derivative: `350×233`
- frame: `793.7×765`
- scaleMode: `FILL`
- visual result: legitimate Hawaii/couple identity is immediately stronger than the structural-dummy C8 hero, but the crop keeps substantial sky and the couple remains relatively small.

## C10 bounded crop test

Created rollback-safely from C9:

- root: `2483:2`
- hero: `2483:20`
- same imageHash: `e9c5d4b516f723b16994a92d0b96a46aaf7619f8`
- scaleMode: `CROP`
- imageTransform: `[[0.72, 0, 0.20], [0, 0.72, 0.20]]`
- no copy, typography, color, logo, service list, image source, or other page geometry changed

The tighter crop enlarges the actual couple while retaining sea and palm context. It reduces unused sky and gives the cover a stronger simultaneous wedding + Hawaii read without adding decoration.

## QA

### Whole-item / thumbnail

`500px`: PASS and stronger than C9 for immediate people/wedding recognition while retaining Hawaii context.

### Reading scale

`1400px`: PASS for **screen composition**. C10 gives the couple more editorial weight and the right page reads less like a generic destination postcard.

### Actual-size / print-detail

**BLOCKED / NOT PASS.** The Figma image source is only `350×233` inside a `793.7×765` hero role and is visibly pixelated at reading/large scale. This screen derivative cannot establish actual-size image quality or print readiness.

### Structure readback

- visible native text descendants: `17`
- visible IMAGE-fill descendants: `6`
- text-text intersections: `0`
- 18px edge risks: `0`
- authority parent: `2052:2`
- current V7/V8 root overlap after cleanup: `0`

## High-resolution transport attempt

A material capability change existed at the start of this run: the Drive master could be materialized locally as the full `4500×3000`, 5.27MB JPEG. That justified one fresh high-resolution placement attempt under RSL-005.

`Figma.upload_assets` returned a new single-use upload URL for hero `2462:20`, but the final POST still failed because `mcp.figma.com` could not resolve in the execution environment. No Figma high-resolution mutation occurred.

The same DNS route was not retried again this run.

## Decision

- C8 `2381:2` remains the **current V7 Outer** because it is the only current candidate whose existing design QA state is not being falsely promoted from a 350px source.
- C9 `2462:2` is `SUPERSEDED` and hidden at `x=300000`.
- C10 `2483:2` is the **preferred real-photo screen-composition crop evidence**, hidden at `x=302000`.
- C10 is explicitly `NOT CURRENT / NOT FINAL PRINT / ACTUAL-SIZE BLOCKED`.
- When high-resolution transport becomes available, resume from the C10 crop hypothesis rather than automatically using the older C9 wide crop; then re-evaluate crop from the full-resolution image itself and rerun 500 / 1400 / actual-size QA.

## Learning / dedup

No new failure ID is introduced.

- **RSL-001** remains the completion-state guard: real-photo selected, screen-placed, crop-preferred, high-resolution placed, actual-size verified, and print-approved are different states.
- **RSL-002** is strengthened: dominant image quality is upstream of actual-size hierarchy approval. A low-resolution derivative may verify composition but cannot justify enlargement/final promotion.
- **RSL-005** is respected: one retry was justified by material local-master availability; identical DNS failure after that means stop the route and switch work.

Item-specific and non-transferable: C10 crop transform, hero geometry, Hawaii `007.jpg`, Rurubu masthead, palette, title lockup, and cover grammar.
