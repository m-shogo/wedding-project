# wedding-project — Resolve 21 Native Picture in Picture Local Actual Agent

Status: ACTIVE / LOCAL RESOLVE RUNTIME REQUIRED  
Scope: Movie Tool Learning only  
Canary: `DV21-NATIVE-PIP-01`

## Mission

Prove or disprove whether Resolve 21's built-in Picture in Picture Resolve FX is a better default than custom Fusion/DRFX for ordinary wedding photo cards because the card can be created and late-edited from obvious native Edit-page controls.

Do not touch the real wedding Opening/Profile project.

## Read first

1. `docs/research/2026-08-26-movie-tool-learning-run-39-resolve-native-pip.md`
2. `docs/runbooks/2026-08-26-resolve21-native-pip-canary.md`
3. `motion-studio/src/data/resolveNativePIP.ts`
4. `motion-studio/scripts/resolve-native-pip-runtime-plan.mts`

## Hard rules

- disposable Resolve project/timeline only;
- synthetic fixture media only;
- no private wedding media;
- no paid/third-party plugins;
- no network install;
- no direct Resolve project/database editing;
- do not open Fusion for the core styling/late-edit path;
- do not guess Free/Studio availability;
- do not claim alpha support from the opaque fixture;
- keep static human adjustability separate from animation capability;
- preserve failed evidence and never reuse an execution ID.

## Step 0 — repo and runtime

From repo root:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
```

Preserve unrelated local changes.

Record exact live Resolve:

```text
product
version / patch
edition: Free or Studio
platform
```

## Step 1 — prepare immutable Session

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-native-pip-session.mts \
  --execution-id DV21-NATIVE-PIP-01-<UNIQUE_ID>
```

If the same generated fixture already exists and validates:

```bash
node --no-warnings scripts/prepare-resolve-native-pip-session.mts \
  --execution-id DV21-NATIVE-PIP-01-<UNIQUE_ID> \
  --reuse-existing
```

Require:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

Read `session.json`, `RUN.md`, `plan.md`, `evidence.json` in that order.

## Step 2 — disposable timeline

Use 1920×1080 / 30fps unless the Session/Human Master says otherwise.

Place:

- `native-pip-background.mp4` on V1;
- `native-pip-top-test-pattern.mp4` on V2.

Do not substitute personal/wedding footage.

## Step 3 — availability

Locate the exact built-in Picture in Picture Resolve FX in the tested runtime.

Record:

```text
category
exact effect name
available
watermark/restriction
edition
```

Do not infer Free/Studio behavior from another runtime.

If available, `effect-availability.readback.available` may be set to `true` from observation.

If unavailable, preserve the failure and stop styling.

## Step 4 — control inventory

Apply PiP to V2.

Inventory visible Inspector controls before editing. Compare against official documented groups:

```text
Zoom / Pan / Tilt
Position X / Position Y / Width / Height
Rounding / Rotation / Opacity
Border / Border Width / Border Color / Border Opacity
Fill Matches Border / Fill / Fill Color / Fill Opacity
Drop Shadow / Strength / Color / Drop Angle / Drop Distance / Expand / Blur
Use Alpha
```

Record exact names if the runtime differs.

The Open FX Overlay is allowed because Blackmagic documents it as a normal PiP control surface.

## Step 5 — build neutral wedding card

Using PiP Inspector/overlay only:

- make V2 obviously smaller/off-center;
- set Rounding to `0.35` if exactly representable;
- apply a small non-zero rotation;
- enable a visible border;
- enable a visible soft shadow;
- record every actual value used.

Do not open Fusion to rescue the core card.

If the core card was genuinely made without Fusion:

```json
{"fusionOpened": false}
```

belongs in `style-photo-card.readback`.

## Step 6 — human late edit

From the same ordinary UI:

1. change Rounding;
2. change one Border property;
3. change Position or Width/Height.

Record before/after exact values, UI surface and friction.

If Fusion was not needed:

```json
{"fusionOpened": false}
```

belongs in `human-late-edit.readback`.

## Step 7 — animation probe

Inspect PiP-specific keyframe affordances.

If a clear supported diamond/keyframe UI exists, try one small bounded animation and record it.

If not, classify animation separately. Do not invalidate an otherwise good static card route.

```text
STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY
```

## Step 8 — save/reopen + render

Save and reopen the disposable project.

Re-read the styled/late-edited PiP values.

If preserved, record:

```json
{"postReopenPersisted": true}
```

in `save-reopen-render.readback`.

Render a short neutral sample. Hash it with SHA-256 and add an artifact:

```json
{
  "kind": "RENDER",
  "path": "<exact render path>",
  "sha256": "<64 hex>"
}
```

Review the render against the post-reopen viewer state. If it genuinely matches:

```json
{"renderVisualMatch": true}
```

## Step 9 — evidence validator

```bash
node --no-warnings scripts/validate-resolve-native-pip-evidence.mts \
  out/canary-sessions/<EXECUTION_ID>/evidence.json
```

Do not set `promotionEligible=true` just to satisfy the validator.

A single promotion-eligible PASS still means only one execution.

```text
ONE_PASS != REPRODUCED
```

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

## Return report

### Environment
- repo HEAD
- Resolve product/version/edition/platform

### Effect availability
- category/name
- available/restricted/watermarked

### Control inventory
- documented controls found
- missing/renamed controls

### Card build
- actual values used
- Fusion opened yes/no

### Human late edit
- before/after
- UI surface
- friction
- Fusion opened yes/no

### Animation
- keyframe affordance
- bounded test result or unavailable/unclear classification

### Save/reopen/render
- persisted yes/no
- render path + SHA-256
- visual match yes/no

### Evidence
- validator result
- PASS/FAIL/BLOCKED
- promotionEligible for this execution

### Next
Choose exactly one:

- independent execution B;
- fix one bounded fixture/instruction issue;
- classify PiP as edition/runtime unavailable;
- route simple photo cards to PiP if reproduced;
- keep DRFX/Fusion as fallback if native PiP cannot satisfy the Wedding intent.
