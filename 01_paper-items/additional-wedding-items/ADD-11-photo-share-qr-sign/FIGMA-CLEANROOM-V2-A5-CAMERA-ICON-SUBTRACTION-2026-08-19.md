# ADD-11 写真共有 / QR案内 — A5 camera-icon subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED_IN_SELECTED_A5 / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-19
Start authority SHA: `861c6f41507964dabcdf262e5f070d2ef382e07f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A5: `18:19 / FRAME_ADD11_A5_CLEANROOM_V2`
- selected A4: `19:34 / FRAME_ADD11_A4_CLEANROOM_V2` — unchanged
- A5 long-copy stress: `19:4`
- retained legacy: `1:31 / 1:45 / 3:2` — unchanged
- Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Visible problem

Fresh A5 whole-item and native-size screenshots showed a lone camera outline in the lower-right of the pale mint information field. The page already communicates photo sharing through the Japanese category/headline, three-step instructions and the reserved QR role. The extra icon did not add a missing semantic function and read as a generic interface/template embellishment, especially because the independent A4 reflow does not need the same icon.

## Bounded comparison

A rollback-safe comparison was created:

- `30:2 / QA_ADD11_A5_NO_CAMERA_ICON_2026_08_19`

Only `DECOR_CAMERA_ICON` was hidden. The headline, QR geometry, quiet-zone reserve, three steps, privacy/access/hashtag/expiry placeholders, cream/mint fields and all variable copy stayed unchanged.

Result: the A5 read became quieter and more editorial without reducing QR discoverability or photo-sharing meaning.

## Adopted Figma change

Before mutation, hidden rollbacks were created:

- selected A5 rollback: `30:32 / ROLLBACK_ADD11_A5_PRE_CAMERA_SUBTRACTION_2026_08_19`
- A5 stress rollback: `30:62 / ROLLBACK_ADD11_A5_STRESS_PRE_CAMERA_SUBTRACTION_2026_08_19`

The camera icon was then hidden in:

- selected A5 `18:19`
- long-copy stress `19:4`

A4 `19:34` was intentionally left unchanged because it already has no camera icon and is an independent reflow.

## Three-scale / structure QA

Selected A5 after adoption:

- whole / thumbnail: PASS;
- reading scale: PASS;
- native `875×1240`: PASS;
- visible native text: `13`;
- outside visible text: `0`;
- text-to-text collisions: `0`;
- guest-facing proof language: `0`;
- IMAGE fills: `0`.

A5 long-copy stress was temporarily revealed for native-size screenshot review and then returned to hidden QA state:

- outside visible text: `0`;
- text-to-text collisions: `0`;
- guest-facing proof language: `0`;
- IMAGE fills: `0`;
- camera icon hidden: yes.

## Hybrid / asset decision

`IMAGE_GENERATION_NOT_REQUIRED`. This was a subtraction problem, not a missing-image problem. No Drive asset was added or changed.

## Decision

`ADOPTED_IN_SELECTED_A5`.

The transferable method is not “remove camera icons.” It is to test whether a decorative icon performs a reader-facing or physical function after the primary semantic hierarchy is already complete. Exact ADD-11 iconography, QR geometry and palette remain item-specific.

The existing `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid. Final QR/service/privacy/installation/print proof remains deferred to authoritative input.