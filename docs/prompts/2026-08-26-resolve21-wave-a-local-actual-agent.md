# wedding-project — Resolve 21 Local Actual Wave A Agent

Status: ACTIVE / LOCAL RESOLVE RUNTIME REQUIRED  
Scope: Movie Tool Learning only

## Mission

Execute the first high-value Resolve 21 runtime wave with **four independent neutral canaries**:

1. `DV21-REMOTION-ALPHA-01`
2. `DV21-AUDIO-RECOVERY-01`
3. `DV21-LOTTIE-OGRAF-01`
4. `DV21-DRFX-FREE-01`

The goal is not to finish the wedding movie in this run. The goal is to turn pre-runtime Tool Learning knowledge into trustworthy runtime evidence while keeping every result easy for a human editor to understand and adjust later.

Palmier FCPXML is intentionally not in this wave. It joins only after the real Palmier scene-v2 export has passed scene-contract/freshness/provenance attachment.

## Why a local agent is required

GitHub CI can prepare fixtures, hashes, manifests, Sessions and evidence skeletons. It cannot prove what the installed DaVinci Resolve 21 runtime actually imports, exposes, saves, reopens, renders, plays or lets a human adjust.

Use Codex / Claude Code / another local computer-control agent on the machine that has Resolve installed.

## Read first

1. `docs/prompts/2026-08-26-resolve21-runtime-canary-execution-agent.md`
2. `motion-studio/src/data/resolveRuntimeCanaryPack.ts`
3. `docs/research/2026-08-26-movie-tool-learning-run-33-resolve-2103-version-truth-correction.md`
4. `docs/runbooks/2026-08-26-resolve21-lottie-ograf-canary.md`
5. `docs/runbooks/2026-08-26-resolve21-drfx-free-canary.md`
6. `motion-studio/src/data/resolveCanaryInputFixtures.ts`
7. this Wave A prompt

## Version truth before mutation

Product baseline is **DaVinci Resolve 21**.

Before the run:

- re-check Blackmagic Design official Support Center for the current 21.x update;
- capture the exact installed/live Resolve product/version/edition/platform;
- do not rewrite the observed local version to match the current download version;
- treat the current release coordinate and installed runtime identity as separate evidence.

```text
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
TARGET_PATCH != TESTED_PATCH
```

As of the latest repo authority on 2026-08-26, the official planning coordinate is 21.0.3, but the local runtime field stays whatever is actually observed.

## Hard safety rules

- disposable Resolve projects only;
- never mutate the real Opening/Profile wedding project;
- no private wedding media is needed;
- no paid template is needed;
- no third-party plugin/network install is needed;
- do not edit Resolve project database internals;
- do not brute-force undocumented property names;
- do not turn expected values into observed values;
- preserve failed Sessions and evidence;
- use a new execution prefix for every independent run;
- generated artifacts are inputs, not runtime proof.

## Step 0 — repo and runtime preflight

From repo root:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
bash scripts/davinci/resolve21-runtime-readonly-probe.sh
```

If unrelated local changes exist, preserve them. Do not reset/clean another task's work.

Record:

```text
repo HEAD
Resolve product
Resolve version/patch
Free or Studio
platform
```

## Step 1 — prepare Wave A once

From `motion-studio`:

```bash
node --no-warnings scripts/prepare-resolve-local-actual-wave-a.mts \
  --execution-prefix 20260826-MAC-FREE-A
```

If the exact neutral Alpha ProRes render already exists and you intentionally want to reuse that exact artifact:

```bash
node --no-warnings scripts/prepare-resolve-local-actual-wave-a.mts \
  --execution-prefix 20260826-MAC-FREE-A \
  --reuse-alpha
```

`--reuse-alpha` is explicit reuse, not permission to reuse an unknown/stale file. The underlying manifest/hash remains authoritative.

Expected summary:

```text
out/canary-batches/20260826-MAC-FREE-A-wave-a.json
```

Every included Session must start as:

```text
status = READY_FOR_RUNTIME
runtimeLaunchPerformed = false
evidence.result = NOT_RUN
promotionEligible = false
```

If any Session is not READY, stop that canary and preserve the block/failure. Do not make the other canaries fake it.

## Execution discipline

For every canary:

1. open its Session directory;
2. read `session.json`;
3. read `RUN.md`;
4. read `plan.md`;
5. inspect `evidence.json`;
6. use a disposable project;
7. execute the plan exactly;
8. write only observed values;
9. save/reopen when required;
10. validate evidence after material edits.

Generic validator:

```bash
node --no-warnings scripts/validate-resolve-canary-evidence.mts <EVIDENCE_JSON>
```

## Canary 1 — Remotion Alpha

Canary:

```text
DV21-REMOTION-ALPHA-01
```

Human question:

> Can an alpha-capable Remotion asset move through Resolve without turning into a black rectangle or losing alpha at a later stage?

Keep four stages separate:

```text
SOURCE_ALPHA
RESOLVE_IMPORT_ALPHA
RESOLVE_WORKING_PATH_ALPHA
RESOLVE_EXPORT_ALPHA
```

Required behavior:

- verify exact ProRes source hash/metadata;
- place over a contrasting Resolve-generated background;
- inspect alpha at import;
- trim/reposition;
- save/reopen;
- render a normal composite;
- separately render an alpha-preserving output when the selected Deliver route supports it;
- hash the actual render outputs.

Do not infer alpha export from alpha import.

```text
ALPHA_SOURCE_RENDER != ALPHA_IMPORT != ALPHA_WORKING_PATH != ALPHA_EXPORT
CACHE_STATE != SOURCE_TRUTH
```

## Canary 2 — Audio Recovery

Canary:

```text
DV21-AUDIO-RECOVERY-01
```

Human question:

> If Palmier audio automation is lost in FCPXML, can a human restore it quickly and precisely in native Resolve, and can any supported scripting surface really write it?

Use the synthetic tone and Human Master values.

**Manual/native recovery comes first.** Recreate the requested fade and dB points with the supported Edit/Fairlight UI. Record actual representable timing/value precision.

### Preferred native clip-envelope path

Blackmagic Design's current official Fairlight page documents a direct clip-level path that should be tried before escalating to track automation or scripting:

1. use the fade handles on the clip edges for fade-in/fade-out;
2. use the clip gain line in the middle of the audio clip for clip level;
3. to vary clip volume over time, use the documented modifier-click on the gain line to add keyframes (`Option` is the shortcut named on Blackmagic's current English documentation), then move those points to the Human Master times/levels;
4. use the Clip Inspector level control when it gives clearer numeric readback for the tested operation;
5. use Fairlight track automation/automation curves only when the desired behavior is genuinely track/bus automation rather than a clip envelope.

Official source coordinate:

```text
Blackmagic Design -> DaVinci Resolve -> Fairlight -> Clip Adjustments / Full Automation Control
https://www.blackmagicdesign.com/products/davinciresolve/fairlight
checked 2026-08-26
```

On a non-Mac platform, record the actual modifier/shortcut exposed by that runtime instead of blindly assuming the macOS `Option` label.

Record which native surface was used for each Human Master target:

```text
fade handle
clip gain line keyframe
Clip Inspector
track automation curve
other supported native surface
```

Prefer the simplest native surface that preserves the intended **clip** envelope and remains easy to understand after reopen.

```text
CLIP_GAIN_KEYFRAMES != TRACK_AUTOMATION_CURVE
CLIP_ENVELOPE_RECOVERY != TRACK_MIX_AUTOMATION
```

Then perform only the smallest supported scripting mutation probe already justified by the local/runtime API surface.

Never loop through guessed property names.

Record separately:

```text
manual recovery result
native surface used per target
post-reopen values
listening result
script surface used
script mutation result
post-attempt readback
```

A manual PASS is useful even when the scripting probe fails.

```text
MANUAL_RECOVERY != AUTOMATED_WRITE
READ_SCOPE_AVAILABLE != WRITE_CAPABILITY_AVAILABLE
VIDEO_TRANSFORM_PAN != AUDIO_PAN
```

Human adjustability matters here: record how many obvious native actions are required and whether the target dB/timing values can be entered/read without hunting through hidden structures.

## Canary 3 — Lottie / OGraf

Canary:

```text
DV21-LOTTIE-OGRAF-01
```

Human question:

> Can the original `.lottie` stay native and usable instead of being baked or manually rebuilt?

Use the self-authored neutral fixture.

Verify:

- exact `.lottie` hash;
- documented platform boundary (macOS/Windows unless newer primary evidence expands it);
- native import;
- observed duration;
- alpha over contrasting background;
- source motion;
- trim/reposition/scale at clip level;
- save/reopen;
- internal/source keyframe editability separately;
- `OGrafLoader` availability separately.

Do not call it source-parametric just because Resolve can move or trim the clip.

```text
NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY
CLIP_LEVEL_EDITABLE != SOURCE_PARAMETRIC_EDITABLE
```

For human adjustability, explicitly report which ordinary changes can be done from Edit Inspector and which require Fusion/loader-level work.

## Canary 4 — DRFX / human-friendly Inspector

Canary:

```text
DV21-DRFX-FREE-01
```

Human question:

> Can a generated Resolve-native reusable asset install cleanly and expose routine adjustments where a normal human editor expects them?

Verify:

- exact `.drfx` hash;
- supported install route;
- restart requirement if any;
- actual Effects Library category/name;
- exposed Inspector controls and labels;
- intended `Color` control usability;
- keyframe affordance if exposed;
- before/after value;
- save/reopen persistence;
- short render + hash;
- supported uninstall/remove behavior.

Human Adjustability is a first-class result. Record whether a routine color change is obvious in the Inspector without opening the Fusion graph.

```text
PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE
EXPOSED_CONTROL_SCHEMA != HUMAN_USABILITY_PROVEN
INSTALLABLE != DEPENDENCY_PORTABLE
```

## Failure classification

Use one primary fingerprint when a canary fails:

```text
INPUT_INVALID
IMPORT_FAIL
READBACK_UNAVAILABLE
WRITE_UNSUPPORTED
VISUAL_MISMATCH
DEPENDENCY_MISSING
PLATFORM_UNSUPPORTED
SAVE_REOPEN_REGRESSION
RENDER_FAIL
HUMAN_ADJUSTABILITY_FAIL
OTHER
```

Then preserve:

```text
expected
observed
cause hypothesis
guardrail
improved next instruction
```

Do not repeat the same failure by silently retrying with the same assumptions.

## Promotion boundary

One successful execution is not canonical trust.

```text
SESSION_READY != CANARY_PASS
ONE_PASS != REPRODUCED
ONE_MACHINE != PORTABLE
```

The canonical canaries require independent execution count before promotion. Do not change Trusted policy from Wave A run A alone.

## Final report

### Runtime identity
- repo HEAD
- Resolve product/version/edition/platform

### Wave summary
For each of the four canaries:

- execution ID
- input path/hash
- result: PASS / FAIL / BLOCKED
- save/reopen result
- render result/hash if required
- human review result
- evidence validator result

### Human adjustability
Report separately:

- Alpha: normal Edit/Deliver steps required
- Audio: native UI precision, native surface used, and recovery friction
- Lottie: Edit-level vs internal editability
- DRFX: Inspector-level ease of use

### Failures
For each failed canary:

- failure fingerprint
- exact observed behavior
- next bounded experiment

### Next
Choose only the highest-value next action:

- independent Wave A execution B;
- fix one failed fixture/recipe in a new branch;
- attach real Palmier scene-v2 export and execute its dedicated Actual;
- downgrade/reclassify an affected capability.
