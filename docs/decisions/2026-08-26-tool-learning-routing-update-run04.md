# Tool Learning routing update — Run 04

Date: 2026-08-26
Scope: Movie only.

## Decision

Until runtime canaries promote a stronger path, Resolve Free handoff/recovery should prefer routes that do not depend on the external Developer API.

Priority order:

1. Direct native import (Palmier Resolve-targeted FCPXML, Lottie/OGraf, ordinary media).
2. Native Edit/Text+ properties that survive interchange.
3. Generated Fusion `.setting` packaged as `.drfx` and installed through Resolve UI.
4. Human Master guided native rebuild.
5. Alpha render + sidecar as bake fallback.
6. External Python/Lua automation only when the actual Resolve edition/environment supports it and that exact mutation recipe is Runtime Verified.

## Version authority

- Resolve Actual baseline: 21.0.4.
- Remotion production lock: 4.0.475 until upgrade canary passes.
- Remotion candidate baseline: 4.0.508.

Do not infer runtime versions from agent-skill versions.

## New guardrails

- `READ_SCOPE_AVAILABLE != WRITE_CAPABILITY_AVAILABLE`
- `GENERATABLE_DRFX != RUNTIME_VERIFIED_TEMPLATE`
- `REMOTION_UPGRADE_IS_ATOMIC`
- `LOCKFILE_COHERENCE != MANIFEST_PINNING`
- `PATCH_UPDATE => REVALIDATE_DEPENDENT_CAPABILITIES_ONLY`

## Promotion requirements

`.drfx` becomes Trusted only for each tested category/recipe after clean install, Effects Library discovery, exposed-control edit, save/reopen, dependency check and render parity.

Resolve 21.0.4 `Timeline.GetSelectedClips()` improves bounded instruction scope for Studio automation, but it does not promote any write capability, especially Fairlight volume/fade.

## Evidence authority

See:

- `docs/research/2026-08-26-movie-tool-learning-run-03-remotion-native-routing.md`
- `docs/research/2026-08-26-movie-tool-learning-run-04-resolve-2104-drfx-and-remotion-version-coherence.md`
