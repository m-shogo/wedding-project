# Resolve 21 — Native Picture in Picture Wedding Photo-Card Canary

Date: 2026-08-26  
Canary: `DV21-NATIVE-PIP-01`  
Status: INPUT GENERATABLE / RESOLVE RUNTIME PENDING

## Goal

Verify whether Resolve 21's native Picture in Picture Resolve FX is the preferred simple wedding photo-card route because a normal editor can adjust the card from the Edit Inspector without opening Fusion.

## Prepare

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-native-pip-fixture.mts
node --no-warnings scripts/validate-resolve-native-pip-fixture.mts
node --no-warnings scripts/prepare-resolve-native-pip-session.mts \
  --execution-id DV21-NATIVE-PIP-01-<UNIQUE_ID> \
  --reuse-existing
```

Read the generated Session in order:

1. `session.json`
2. `RUN.md`
3. `plan.md`
4. `evidence.json`

Require before Resolve opens:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

## Runtime 0 — exact environment

Record:

```text
product
version / patch
Free or Studio
platform
```

Use a disposable project/timeline only.

## Runtime 1 — timeline setup

Import exact hashed fixture media.

- V1: `native-pip-background.mp4`
- V2: `native-pip-top-test-pattern.mp4`

Do not use real wedding photos for this canary.

## Runtime 2 — effect availability

In Cut/Edit Effects Library, locate the built-in Picture in Picture Resolve FX.

Record in `effect-availability`:

```text
exact category
exact displayed effect name
available true/false
watermark/restriction if any
```

Required readback key for a promotion-eligible PASS:

```json
{"available": true}
```

If unavailable, record the exact runtime and stop the PiP styling path. Do not infer availability from another edition.

## Runtime 3 — control inventory

Apply PiP to V2 and inventory visible controls before editing.

Expected official groups to look for:

```text
Content: Zoom / Pan / Tilt
Position: Position X / Position Y / Width / Height
Style: Rounding / Rotation / Opacity
Border: Border / Width / Color / Opacity
Fill: Fill Matches Border / Fill / Color / Opacity
Shadow: Drop Shadow / Strength / Color / Drop Angle / Drop Distance / Expand / Blur
Use Alpha
```

Record renames/missing controls exactly.

Use Open FX Overlay only as the normal documented viewer control surface; do not open Fusion for the core route.

## Runtime 4 — neutral photo card

Create an obvious floating card using only native PiP controls.

Required intent:

- visibly smaller and off-center;
- Rounding `0.35` if representable exactly;
- small non-zero Rotation;
- visible Border;
- visible Drop Shadow;
- record actual values used.

For `style-photo-card`, set:

```json
{"fusionOpened": false}
```

only if Fusion was genuinely not opened/required for the core styling.

## Runtime 5 — human late edit

From Edit Inspector / Open FX Overlay only:

1. change Rounding to another obvious value;
2. change one Border property;
3. change one Position or Width/Height property.

Record before/after values and how easy the controls were to find/use.

For `human-late-edit`, set:

```json
{"fusionOpened": false}
```

only when true.

## Runtime 6 — animation affordance

Inspect whether PiP controls have clear keyframe affordances in this exact runtime.

If obvious and safe, test one bounded property animation.

Do not fail the static photo-card usability result merely because animation is unavailable/unclear.

```text
STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY
```

## Runtime 7 — save/reopen + render

Save, close/reopen, and verify the late-edit values.

Then render a short neutral sample.

Hash the exact render and add:

```json
{
  "kind": "RENDER",
  "path": "<path>",
  "sha256": "<64 hex>"
}
```

Set these readback keys only from actual observation:

```json
{
  "postReopenPersisted": true,
  "renderVisualMatch": true
}
```

## Evidence validation

After material edits:

```bash
node --no-warnings scripts/validate-resolve-native-pip-evidence.mts \
  out/canary-sessions/<EXECUTION_ID>/evidence.json
```

A promotion-eligible single execution requires:

- exact product/version/edition/platform;
- all runtime steps PASS;
- all three required input hashes;
- PiP actually available;
- core style + late edit without Fusion;
- save/reopen persistence;
- completed human review with notes;
- hashed RENDER artifact;
- render visually matching the post-reopen state.

Still:

```text
ONE_PASS != REPRODUCED
```

Run a second independent execution before canonical promotion.

## Failure fingerprints

Choose one primary fingerprint:

```text
PIP_EFFECT_UNAVAILABLE
PIP_EDITION_RESTRICTED
PIP_CONTROL_MISSING_OR_RENAMED
PIP_STYLE_REQUIRES_FUSION
PIP_HUMAN_ADJUSTABILITY_FAIL
PIP_SAVE_REOPEN_REGRESSION
PIP_RENDER_MISMATCH
PIP_ANIMATION_UNAVAILABLE
PIP_ALPHA_OVERCLAIM
OTHER
```

Preserve the failed Session instead of overwriting it.
