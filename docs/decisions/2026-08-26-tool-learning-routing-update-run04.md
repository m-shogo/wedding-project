# Tool Learning routing update — Run 04

Date: 2026-08-26
Scope: Movie only.

> **Run 33 correction (2026-08-26):** the earlier `Resolve Actual baseline: 21.0.4` statement was not supported by reproducible runtime evidence and conflicts with Blackmagic Design's current Support Center, which lists DaVinci Resolve 21.0.3 (2026-07-22) as the current Resolve 21 update. Treat `21.0.3` as the current planning target and keep the actually tested patch unset until a local runtime canary records it. Any 21.0.4-specific claim below is superseded unless independently reproduced.

## Decision

Until runtime canaries promote a stronger path, Resolve Free handoff/recovery should prefer routes that do not depend on the external Developer API.

Priority order:

1. Direct native import (Palmier Resolve-targeted FCPXML, Lottie/OGraf, ordinary media).
2. Native Edit/Text+ properties that survive interchange.
3. Generated Fusion `.setting` packaged as `.drfx` and installed through Resolve UI.
4. Human Master guided native rebuild.
5. Alpha render + sidecar as bake fallback.
6. External Python/Lua automation only when the actual Resolve edition/environment supports it and that exact mutation recipe is Runtime Verified.

## Version authority — corrected by Run 33

- Resolve planning target: **21.0.3**, based on the current Blackmagic Design Support Center listing dated 2026-07-22.
- Resolve actually tested patch: **unset / runtime capture required**.
- Remotion production lock: 4.0.475 until upgrade canary passes.
- Remotion candidate baseline: 4.0.508.

Do not infer runtime versions from agent-skill versions, bundle assumptions, old research notes, or a planning target.

Keep this distinction explicit:

```text
TARGET_PATCH != TESTED_PATCH
DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY
```

## New guardrails

- `READ_SCOPE_AVAILABLE != WRITE_CAPABILITY_AVAILABLE`
- `GENERATABLE_DRFX != RUNTIME_VERIFIED_TEMPLATE`
- `REMOTION_UPGRADE_IS_ATOMIC`
- `LOCKFILE_COHERENCE != MANIFEST_PINNING`
- `PATCH_UPDATE => REVALIDATE_DEPENDENT_CAPABILITIES_ONLY`
- `TARGET_PATCH != TESTED_PATCH`

## Promotion requirements

`.drfx` becomes Trusted only for each tested category/recipe after clean install, Effects Library discovery, exposed-control edit, save/reopen, dependency check and render parity.

The earlier Run 04 statement attributing `Timeline.GetSelectedClips()` specifically to Resolve 21.0.4 is withdrawn as Current authority. Selection/read-scope capability must be tied to the exact documented or live runtime version used by the canary before it influences automation policy. Regardless of availability, read scope does not promote any write capability, especially Fairlight volume/fade.

## Evidence authority

Historical context remains in:

- `docs/research/2026-08-26-movie-tool-learning-run-03-remotion-native-routing.md`
- `docs/research/2026-08-26-movie-tool-learning-run-04-resolve-2104-drfx-and-remotion-version-coherence.md`

Current version authority is superseded by:

- `docs/research/2026-08-26-movie-tool-learning-run-33-resolve-2103-version-truth-correction.md`
- live runtime evidence captured by a Resolve Canary Session

The Run 04 filename is historical and must not be interpreted as proof that Resolve 21.0.4 was an official/current or locally reproduced runtime.
