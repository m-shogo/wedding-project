# Movie Tool Learning Run 38 — Resolve 21 OTIO / OTIOZ Interchange Lane

Date: 2026-08-26  
Status: IMPLEMENTED PRE-RUNTIME / LOCAL RESOLVE ACTUAL STILL REQUIRED  
Scope: Movie Tool Learning only

## Why this run exists

Palmier FCPXML remains the most important source-specific editable handoff canary, and Resolve-native DRFX/Lottie/Alpha/Audio routes already have dedicated runtime preparation.

OpenTimelineIO was still a real blind spot in this repository.

The question is not:

```text
CAN_OTIO_REPLACE_FCPXML_FOR_EVERYTHING?
```

The useful question is:

```text
WHAT_EDITORIAL_CORE_CAN_OTIO_MOVE_RELIABLY?
WHAT_MEDIA_PORTABILITY_DOES_OTIOZ_ADD?
WHAT_RESOLVE_SPECIFIC_DATA_IS_ONLY_VENDOR_METADATA?
```

Run38 creates a separate OTIO editorial-interchange lane instead of pretending it is a higher-fidelity Palmier motion format.

## Primary-source findings

### Resolve 18.5 introduced native OpenTimelineIO timeline interchange

Blackmagic Design's DaVinci Resolve 18.5 New Features Guide documents timeline import/export for:

- `.otio`
- `.otioz`

The guide distinguishes them explicitly:

- `.otio` = timeline metadata with media references; media is not bundled.
- `.otioz` = timeline metadata plus referenced media bundled together.

Blackmagic also recommended at that time:

```text
Resolve -> Resolve: DRT
Resolve <-> another application: OTIO/OTIOZ when supported
otherwise: XML / AAF fallback
```

Primary source:

- Blackmagic Design — DaVinci Resolve 18.5 New Features Guide
- https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_18.5_New_Features_Guide.pdf

This routing is useful for Wedding production because it prevents OTIO from being over-promoted as a Resolve-native project archive.

Guardrail:

```text
DRT_RESOLVE_NATIVE_ROUNDTRIP != OTIO_CROSS_APP_EDITORIAL_INTERCHANGE
```

### Resolve 19 expanded OTIO scripting

Blackmagic Design's Resolve 19 New Features Guide documents Scripting API support for importing OpenTimelineIO timelines with custom import options.

Primary source:

- Blackmagic Design — DaVinci Resolve 19 New Features Guide
- https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_19_New_Features_Guide.pdf

This means a future automation lane may be possible for bounded OTIO imports.

It does **not** prove that arbitrary imported OTIO effects or vendor metadata become editable cross-application parameters.

```text
SCRIPTABLE_OTIO_IMPORT != EFFECT_SEMANTICS_PORTABLE
```

## OpenTimelineIO release truth

OpenTimelineIO's version table lists:

```text
v0.18.1
release date: 2025-11-08
```

Primary source:

- Academy Software Foundation / OpenTimelineIO `VERSIONS.md`
- https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/main/VERSIONS.md

Important discovery during Run38:

Current development `main` has already moved some serialization shapes beyond the latest released tag.

Observed:

```text
v0.18.1 stable:
  Clip.2
  Marker.2

current development main observed during Run38:
  Marker.3
```

Therefore the neutral fixture is pinned to **released v0.18.1 serialization authority**, not current development main.

```text
LATEST_DOCS_DEV_VERSION != CURRENT_RELEASE_VERSION
```

This prevented a subtle mistake where a 2026 development schema could have been emitted into a fixture claimed to represent the current released OTIO version.

## OTIOZ file-bundle truth

The OpenTimelineIO v0.18.1 `otioz.py` and `file_bundle_utils.py` implementation establishes the bundle layout used by this run:

```text
version.txt        -> 1.0.0
content.otio
media/<basename>
```

Additional implementation details retained by the fixture:

- paths inside the bundle use `/` separators;
- media basenames must be unique;
- `content.otio` points to bundle-relative `media/...` references;
- `version.txt` and `content.otio` are ZIP_DEFLATED;
- media is ZIP_STORED.

Primary sources:

- https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/v0.18.1/src/py-opentimelineio/opentimelineio/adapters/otioz.py
- https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/v0.18.1/src/py-opentimelineio/opentimelineio/adapters/file_bundle_utils.py
- https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/v0.18.1/src/py-opentimelineio/opentimelineio/url_utils.py

Run38 deliberately does not add another ZIP library. The fixture generator uses Python's standard `zipfile` to match this documented structure.

## Resolve vendor metadata boundary

A particularly useful upstream OpenTimelineIO sample, `tests/sample_data/effects.otio`, contains Resolve-origin data under:

```text
metadata.Resolve_OTIO
```

The sample demonstrates that Resolve may serialize built-in effect information such as Transform/Dynamic Zoom parameters and keyframes into application-specific metadata.

This is useful evidence that Resolve OTIO can preserve more than bare cuts in some Resolve-origin cases.

But it is not standardized cross-NLE effect semantics.

The canary therefore separates:

```text
STANDARD OTIO EDITORIAL CORE
!=
RESOLVE_OTIO VENDOR METADATA
!=
THIRD_PARTY OFX PORTABILITY
```

Guardrails:

```text
RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS
RESOLVE_NATIVE_EFFECT_SERIALIZED != STANDARD_OTIO_EFFECT_PORTABILITY
OTIO_EFFECT_RECORD != OPENFX_EFFECT_ROUNDTRIP
```

The optional vendor-effect probe is intentionally secondary and cannot decide the core canary PASS.

## Machine-readable implementation

Added:

```text
motion-studio/src/data/resolveOTIOInterchange.ts
```

It records:

- released OTIO version coordinate;
- stable fixture schema authority;
- Resolve OTIO version history coordinate;
- capability matrix;
- standard/editorial vs media vs vendor boundaries;
- runtime canary `DV21-OTIO-INTERCHANGE-01`;
- fail-closed evidence template;
- optional secondary Resolve vendor-effect observation.

Runtime steps are exactly:

```text
plain-otio-import
otioz-import
editorial-core-readback
human-late-edit-save-reopen
resolve-otio-export-readback
roundtrip-reimport
```

## Neutral fixture

Added:

```text
motion-studio/scripts/prepare-resolve-otio-fixture.mts
```

It creates only synthetic/non-private media:

- 320x180 30fps generated video A;
- 320x180 30fps generated video B;
- 48kHz stereo PCM synthetic tone;
- standards-only `.otio`;
- standards-only `.otioz`;
- Human Master editorial inventory;
- hashable PREPARED manifest.

The source OTIO intentionally contains no `Resolve_OTIO` metadata.

That gives the runtime canary a clean question:

```text
WHAT_DID_RESOLVE_ADD_OR_DROP?
```

rather than mixing application metadata into the test input.

## Fixture validation

Added:

```text
motion-studio/scripts/validate-resolve-otio-fixture.mts
```

It validates:

- PREPARED manifest;
- file existence + SHA-256;
- `Timeline.1` root;
- `Clip.2` only, no legacy Clip.1;
- stable `Marker.2`, no development `Marker.3`;
- expected Video/Audio tracks;
- expected Gap/Transition/Marker;
- 30fps RationalTime rate;
- plain OTIO uses exact external `file:` media references;
- OTIOZ exact ZIP entry set;
- OTIOZ bundle version `1.0.0`;
- bundle-relative `media/...` URLs;
- compressed/uncompressed entry policy matching v0.18.1 adapter;
- no `Resolve_OTIO` vendor metadata in neutral input;
- Human Master release authority and inventory boundaries.

```text
FIXTURE_VALID != RESOLVE_IMPORTED
```

## Resolve-export inspector

Added:

```text
motion-studio/scripts/inspect-resolve-exported-otio.mts
```

A local agent can run it on Resolve's exported OTIO to automatically report:

- SHA-256;
- serialized schema counts;
- tracks;
- clips;
- gaps;
- transitions;
- markers;
- effects;
- exact paths where `metadata.Resolve_OTIO` exists.

This removes a major human-friction point without claiming that metadata presence equals portability.

```text
INSPECTION_REPORT != CLEAN_REIMPORT_PROOF
```

## Runtime evidence semantics

Added:

```text
motion-studio/scripts/validate-resolve-otio-evidence.mts
```

Promotion for one execution requires:

- result PASS;
- exact OTIO step set all PASS;
- both required inputs present with SHA-256;
- completed human review;
- Resolve-produced `OTIO_EXPORT` artifact;
- SHA-256 on the Resolve-produced OTIO artifact.

Render evidence is deliberately rejected for this canary because render success cannot prove editorial or effect portability.

```text
RENDER_SUCCESS != EDITORIAL_PORTABILITY
```

Even a fully eligible one-run PASS remains:

```text
ONE_PASS != REPRODUCED
```

Two independent executions remain required before canonical promotion.

## Immutable local Session

Added:

```text
motion-studio/scripts/prepare-resolve-otio-session.mts
```

Flow:

```text
prepare synthetic fixture
-> validate fixture
-> hydrate exact OTIO / OTIOZ hashes
-> compile runtime plan
-> create NOT_RUN evidence
-> validate fail-closed evidence
-> write immutable Session
```

The builder never launches Resolve.

```text
SESSION_READY != CANARY_PASS
```

## Why OTIO is useful for this project

OTIO should be treated as an additional lane, not as a replacement for all other handoffs.

Practical routing after Run38 research:

```text
Palmier motion/source-specific timeline
  -> Palmier FCPXML canary first

Resolve-native reusable visual control surface
  -> DRFX / Fusion Macro

Lottie animation
  -> native Lottie/OGraf route

Resolve <-> Resolve editable timeline
  -> DRT

Cross-application editorial core
  -> OTIO / OTIOZ when supported

Unsupported destination / specific XML ecosystem need
  -> FCPXML/XML/AAF as appropriate
```

This is reuse-before-build at the interchange-format level.

## Current boundary

Run38 still does not prove Resolve 21 runtime behavior.

No Resolve GUI/runtime was launched in this GitHub-side run.

Still pending:

- plain OTIO import mapping;
- OTIOZ extraction/link behavior;
- transition mapping;
- marker mapping;
- source-range fidelity;
- bounded native late edit;
- save/reopen;
- Resolve OTIO export contents;
- clean reimport;
- optional Resolve vendor-effect metadata behavior.

```text
OTIO_SPEC_KNOWN != RESOLVE_21_RUNTIME_VERIFIED
PREPARED_SESSION != ACTUAL_EXECUTION
```

## Next highest-value work

After focused CI passes:

```text
prepare immutable OTIO Session
-> Resolve Actual A
-> inspect Resolve-exported OTIO
-> evidence validation
-> Resolve Actual B
```

This runtime step requires a local agent on a machine with DaVinci Resolve 21 installed.

`RESEARCH_SATURATED_PRE_RUNTIME = near_true` for this OTIO lane once CI is green.
