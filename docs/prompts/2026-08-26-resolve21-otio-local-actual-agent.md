# wedding-project — Resolve 21 OTIO / OTIOZ Local Actual Agent

Status: ACTIVE / LOCAL RESOLVE RUNTIME REQUIRED  
Scope: Movie Tool Learning only  
Canary: `DV21-OTIO-INTERCHANGE-01`

## Mission

Execute the prepared standards-only OTIO/OTIOZ canary in disposable DaVinci Resolve 21 contexts and return honest runtime evidence for:

- plain `.otio` editorial import and external-media behavior;
- `.otioz` bundled-media behavior;
- track/clip/source-range/gap/transition/marker mapping;
- one bounded human-friendly late edit;
- save/reopen persistence;
- Resolve `.otio` export;
- standard OTIO objects vs `Resolve_OTIO` vendor metadata;
- clean reimport of Resolve's exported OTIO.

Do not touch the real wedding Opening/Profile project.

This canary is an **editorial interchange** test. It is not a Palmier motion-fidelity replacement.

## Read first

1. `docs/research/2026-08-26-movie-tool-learning-run-38-resolve-otio-interchange.md`
2. `docs/runbooks/2026-08-26-resolve21-otio-interchange-canary.md`
3. `motion-studio/src/data/resolveOTIOInterchange.ts`
4. `motion-studio/scripts/prepare-resolve-otio-fixture.mts`
5. `motion-studio/scripts/validate-resolve-otio-fixture.mts`
6. `motion-studio/scripts/resolve-otio-runtime-plan.mts`
7. `motion-studio/scripts/inspect-resolve-exported-otio.mts`
8. `motion-studio/scripts/validate-resolve-otio-evidence.mts`

## Hard safety rules

- disposable Resolve projects/timelines only;
- never mutate the real wedding Opening/Profile project;
- no private wedding media;
- no paid templates or plugins;
- no network install;
- no direct Resolve database/project-file editing;
- no guessed expected values written as observations;
- no hand-editing source/Resolve-exported OTIO to manufacture a PASS;
- preserve failed Sessions/evidence;
- never reuse an execution ID;
- do not treat render success as editorial/effect portability evidence.

## Step 0 — repo + runtime identity

From repo root:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
```

Preserve unrelated local changes. Never reset/clean another task's work.

Before Resolve mutation, record the exact live runtime:

```text
product
version / patch
Free or Studio
platform
```

Keep:

```text
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
TARGET_PATCH != TESTED_PATCH
```

The repo planning patch is 21.0.3 as of the current authority, but evidence must contain the runtime actually observed.

## Step 1 — prepare immutable Session

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-otio-session.mts \
  --execution-id DV21-OTIO-INTERCHANGE-01-<UNIQUE_EXECUTION_ID>
```

If the exact fixture has already been prepared locally and you intentionally want to reuse it:

```bash
node --no-warnings scripts/prepare-resolve-otio-session.mts \
  --execution-id DV21-OTIO-INTERCHANGE-01-<UNIQUE_EXECUTION_ID> \
  --reuse-existing
```

`--reuse-existing` is allowed only because the fixture validator re-checks file existence, hashes, OTIO stable schemas, OTIOZ layout and vendor-metadata absence before the Session is created.

Require before opening Resolve:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

Read in order:

1. `session.json`
2. `RUN.md`
3. `plan.md`
4. `evidence.json`

## Step 2 — plain OTIO import

Create a disposable project/timeline with a neutral identity such as:

```text
WeddingCanary-OTIO-Plain-20260826-A
```

Import the exact hashed:

```text
out/canary-inputs/otio/neutral-editorial-core.otio
```

Use the normal Resolve-supported OTIO timeline import route.

Record:

```text
exact UI/API route
import warning/error
timeline fps
track inventory
clip inventory
media online/offline state
relink behavior
```

Do not manually relink before recording the initial state.

Plain OTIO is expected to contain references, not packaged media, but the actual Resolve behavior must still be recorded rather than assumed.

```text
OTIO_FILE != MEDIA_PACKAGE
```

## Step 3 — OTIOZ import

Use a separate clean disposable context, e.g.:

```text
WeddingCanary-OTIOZ-20260826-A
```

Import exact hashed:

```text
out/canary-inputs/otio/neutral-editorial-core.otioz
```

Record:

```text
import warning/error
extraction behavior/location if observable
automatic media-link result
timeline fps
track inventory
clip inventory
```

Do not equate media bundling with complete Resolve dependency portability.

```text
OTIOZ_MEDIA_BUNDLED != DEPENDENCY_COMPLETE
```

## Step 4 — editorial-core property readback

Compare against:

```text
out/canary-inputs/otio/otio-human-master.json
```

Do not collapse this into one `IMPORT_PASS`.

Record separately:

### Tracks

- `V1_OTIO_CANARY` / Video
- `A1_OTIO_CANARY` / Audio

### Clips

- `OTIO_CLIP_A`
- `OTIO_CLIP_B`
- `OTIO_CLIP_A_REPEAT`
- `OTIO_AUDIO`

For every clip, capture source start and duration where Resolve exposes them.

### Gap

- `OTIO_CANARY_GAP`
- intended 30 frames

### Transition

- `OTIO_CANARY_DISSOLVE`
- source type `SMPTE_Dissolve`
- intended 15-frame in + 15-frame out offsets

Record Resolve's actual mapped transition name/type/duration.

### Marker

- `OTIO_CANARY_MARKER`
- intended location from Human Master

Record Resolve's actual marker mapping/timing.

Keep:

```text
STANDARD_OBJECT_PRESENT != DESTINATION_UI_MAPPING_VERIFIED
```

## Step 5 — human late edit + save/reopen

Use normal Resolve Edit-page controls only.

Make a small bounded editorial correction that is easy to read back, such as:

1. trim one canary clip by a known small number of frames;
2. move `OTIO_CANARY_MARKER` by a known small number of frames.

Record:

```text
before values
actions/UI surface
after values
number/friction of ordinary actions
whether exact values are visible/enterable
```

Save the disposable project, close/reopen, then record the same values again.

This step evaluates actual human adjustability.

```text
SERIALIZED_EDITABLE != HUMAN_ADJUSTABLE
```

## Step 6 — Resolve OTIO export

Export the edited disposable timeline using Resolve's supported OTIO export route.

Do not overwrite the original fixture.

Use a neutral output path such as:

```text
motion-studio/out/canary-sessions/<EXECUTION_ID>/resolve-exported-edited.otio
```

Compute SHA-256 and add it to `evidence.json`:

```text
artifact.kind = OTIO_EXPORT
artifact.path = <exact path>
artifact.sha256 = <64 hex>
```

Then inspect it automatically:

```bash
node --no-warnings scripts/inspect-resolve-exported-otio.mts \
  out/canary-sessions/<EXECUTION_ID>/resolve-exported-edited.otio \
  --output out/canary-sessions/<EXECUTION_ID>/resolve-exported-edited.inspection.json
```

Record the inspection report as supporting evidence/artifact if useful.

The inspector must be interpreted in two layers:

```text
standard OTIO editorial objects
Resolve_OTIO application metadata
```

Never merge those categories conceptually.

```text
RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS
```

## Step 7 — clean reimport

Create another clean disposable context and import Resolve's exported edited `.otio`.

Re-check:

```text
track inventory
clip inventory
bounded trim result
marker result
gap result
transition result
media link state
```

The export inspection alone cannot pass this step.

```text
INSPECTION_REPORT != CLEAN_REIMPORT_PROOF
```

## Step 8 — evidence validation

After material evidence edits:

```bash
node --no-warnings scripts/validate-resolve-otio-evidence.mts \
  out/canary-sessions/<EXECUTION_ID>/evidence.json
```

Unavailable observations stay null/FAIL/BLOCKED. Never copy Human Master expected values into readback when Resolve does not expose them.

For one execution, `promotionEligible=true` requires:

- result PASS;
- every six core runtime steps PASS;
- both required inputs present and hashed;
- completed human review;
- Resolve-produced `OTIO_EXPORT` artifact present and hashed.

Render is not a requirement and must not be used to prove this canary.

## Optional secondary vendor-effect probe

Do this **only after** the core six-step evidence is already recorded.

In a disposable copy:

1. add one bounded built-in Resolve Transform or Dynamic Zoom edit;
2. export another OTIO;
3. run `inspect-resolve-exported-otio.mts`;
4. record whether `Resolve_OTIO` contains parameter/keyframe material.

Do not make the core result depend on this probe.

Do not test paid/third-party OFX in the first run.

```text
SECONDARY_VENDOR_PROBE != CORE_CANARY_PASS_REQUIREMENT
BUILT_IN_EFFECT_OBSERVED != THIRD_PARTY_OFX_PORTABLE
```

## Failure fingerprint

For a failed core step, choose one primary fingerprint:

```text
OTIO_IMPORT_FAIL
OTIOZ_IMPORT_FAIL
MEDIA_RELINK_MISMATCH
EDITORIAL_TIMING_MISMATCH
TRANSITION_MAPPING_MISMATCH
MARKER_MAPPING_MISMATCH
SAVE_REOPEN_REGRESSION
OTIO_EXPORT_FAIL
ROUNDTRIP_REIMPORT_FAIL
HUMAN_ADJUSTABILITY_FAIL
VENDOR_METADATA_OVERCLAIM
OTHER
```

Then record:

```text
expected
observed
exact affected object/property
cause hypothesis
next bounded experiment
```

Do not silently rerun the same execution ID after a failure.

## Promotion boundary

One valid PASS is not reproduced truth.

```text
ONE_PASS != REPRODUCED
ONE_MACHINE != PORTABLE
```

A second independent execution is required before canonical promotion.

## Return report

### Environment
- repo HEAD
- Resolve product/version/edition/platform

### Exact inputs
- plain OTIO path + SHA-256
- OTIOZ path + SHA-256
- Human Master path

### Plain OTIO
- import result
- media reference/relink behavior
- inventory

### OTIOZ
- import result
- extraction/link behavior
- inventory

### Editorial core
- tracks
- clips/source ranges
- gap
- transition
- marker

### Human late edit
- exact edit
- UI surface
- before/after/post-reopen
- adjustability/friction

### Resolve export
- path
- SHA-256
- inspection report path
- standard object summary
- `Resolve_OTIO` metadata observation

### Clean reimport
- edited core readback
- losses/mappings

### Evidence
- validator result
- PASS/FAIL/BLOCKED
- promotionEligible for this one execution

### Next
Choose exactly one:

- repeat independent execution B;
- fix one bounded fixture/runtime issue in a new branch;
- classify a confirmed mapping limitation;
- return focus to the higher-priority Palmier/Wave A runtime work.
