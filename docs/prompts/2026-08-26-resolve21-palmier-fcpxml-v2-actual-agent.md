# wedding-project — Resolve 21 Palmier FCPXML Scene v2 Actual Agent

Status: ACTIVE / LOCAL RESOLVE RUNTIME REQUIRED  
Scope: Movie Tool Learning only  
Canary: `DV21-PALMIER-FCPXML-01`  
Effective runtime definition: `PALMIER_SCENE_V2_RUNTIME_OVERLAY`

## Mission

Execute the already-prepared **real Palmier scene-v2 FCPXML** canary in a disposable DaVinci Resolve 21 project and capture honest runtime evidence for:

- root clip/timing/transform/crop/static-volume transport;
- audio volume automation/fade behavior;
- independent text width/height scale + scale animation;
- title-box transform scale/rotation as a separate omission/mapping concern;
- two-level nested timeline representation/timing/editability;
- short neutral rendered visual checkpoint;
- save/reopen stability.

Do not touch the real wedding Opening/Profile project.

## Preconditions

A local Palmier agent must already have completed the scene-v2 export route from:

```text
docs/prompts/2026-08-26-palmier-resolve-fcpxml-export-agent-v3.md
```

The attached input manifest must be `PREPARED`, not merely a generated scene specification.

## Read first

1. `docs/runbooks/2026-08-26-palmier-fcpxml-canary-scene-v2.md`
2. `docs/research/2026-08-26-movie-tool-learning-run-35-palmier-canary-scene-v2.md`
3. `motion-studio/src/data/resolvePalmierFCPXMLV2Runtime.ts`
4. `motion-studio/scripts/resolve-palmier-fcpxml-v2-runtime-plan.mts`
5. `motion-studio/scripts/validate-palmier-fcpxml-v2-resolve-evidence.mts`

## Step 0 — repo and read-only Resolve identity

From repo root:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
```

Preserve unrelated local changes. Never reset another task's work.

Before any Resolve mutation, record the live runtime identity:

```text
product
version / patch
Free or Studio edition
platform
```

Bundle metadata is only a hint. Prefer live app/supported runtime evidence.

## Step 1 — create the effective v2 Session

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-palmier-fcpxml-v2-resolve-session.mts \
  --execution-id DV21-PALMIER-FCPXML-01-<UNIQUE_EXECUTION_ID>
```

Do not reuse an existing execution ID.

The command must fail if the real Palmier input is still blocked.

Require:

```text
status = READY_FOR_RUNTIME
inputManifestStatus = PREPARED
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

Read in order:

1. `session.json`
2. `RUN.md`
3. `plan.md`
4. `evidence.json`

Confirm `plan.md` says:

```text
Effective definition: PALMIER_SCENE_V2_RUNTIME_OVERLAY
```

## Step 2 — disposable Resolve import

Create a disposable project with a neutral name such as:

```text
WeddingCanary-PalmierV2-20260826-A
```

Import the exact FCPXML tied to the prepared manifest/hash.

Do not substitute another recent FCPXML if import fails.

Record import warnings/errors and root inventory.

## Step 3 — execute every effective step

Follow `plan.md` exactly. The effective step IDs are:

```text
import-clean
inventory-readback
core-property-readback
independent-text-scale-readback
title-box-omission-readback
nested-timeline-readback
visual-checkpoint-render
save-reopen
```

Every step must remain separately identifiable in `evidence.json`.

### Independent text scale

Locate exactly:

```text
PALMIER_CANARY_TEXT_SCALE
```

Observe separately:

- asymmetric width/height appearance;
- animation timing;
- available Inspector/control labels and values;
- visible/keyframe editability if exposed;
- start/mid/end appearance.

Do not infer source-parametric editability merely because it animates.

### Title-box transform omission probe

Locate exactly:

```text
PALMIER_CANARY_TITLE_BOX_TRANSFORM
```

Record whether the source title-box size and 15-degree rotation:

- arrived;
- were dropped;
- mapped to another Resolve control;
- cannot be read back.

Keep this separate from the independent text-scale result.

```text
TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE
```

### Nested timelines

Locate/identify:

```text
PALMIER_CANARY_NEST_L1
PALMIER_CANARY_NEST_L2
```

Record:

- imported representation/name;
- start/duration/trim;
- L1/L2 relationship;
- linked A/V behavior where present;
- whether the structure is meaningfully editable;
- any flattening or unexpected mapping.

Source FCPXML `media/ref-clip` structure is not runtime proof.

## Step 4 — neutral render checkpoint

Render a short neutral section spanning the independent text-scale animation and nested timeline portion.

Record:

```text
exact render path
codec/settings
SHA-256
start/mid/end text-scale review
nested playback review
```

Do not use a render as proof of nested parametric editability.

## Step 5 — save/reopen

Save, close/reopen the disposable Resolve project, then repeat the important readbacks:

- root clip count/relink state;
- both marker titles;
- L1/L2 representation;
- observed text-scale state.

A pre-save PASS is insufficient when reopen regresses.

## Step 6 — validate evidence after material edits

```bash
node --no-warnings scripts/validate-palmier-fcpxml-v2-resolve-evidence.mts \
  out/canary-sessions/<EXECUTION_ID>/evidence.json
```

Unavailable values stay null/FAIL/BLOCKED. Never replace failed readback with expected values from Palmier source tests.

## Promotion boundary

For one execution, `promotionEligible=true` requires:

- result PASS;
- every effective step PASS;
- required inputs present;
- human visual review completed;
- RENDER artifact recorded with SHA-256.

Even then:

```text
ONE_PASS != REPRODUCED
```

The effective definition requires **two independent executions** before canonical promotion.

Do not edit canonical handoff policy from one run.

## Return report

### Environment
- repo HEAD
- Resolve product/version/edition/platform
- disposable project/timeline identity

### Exact input
- Palmier FCPXML path/ref
- SHA-256
- Human Master fixture identity

### Core transport
- inventory/timing
- transform/crop
- static volume
- audio automation/fade

### Text scale
- exact marker title
- observed appearance/timing
- Inspector/readback/editability

### Title-box probe
- exact marker title
- rotation/scale outcome
- mapped/dropped/readback-unavailable classification

### Nested timelines
- L1 representation/timing/editability
- L2 representation/timing/editability
- linked A/V observation

### Render
- path
- SHA-256
- visual review result

### Save/reopen
- post-reopen root/title/nested result

### Evidence
- validator result
- PASS/FAIL/BLOCKED
- promotionEligible for this one execution

### Next
Choose exactly one:

- repeat as independent execution B;
- fix a Palmier/fixture/runtime issue in a new branch;
- downgrade/reclassify the affected capability from observed failure.

Do not silently move on after a failed Actual.
