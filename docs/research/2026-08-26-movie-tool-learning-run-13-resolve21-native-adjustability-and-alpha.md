# Movie Tool Learning Run 13 — Resolve 21 native adjustability / alpha / reuse-before-build

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

Run 12 made human adjustability explicit. This run checks whether Resolve 21 already has native Edit-page controls that should be preferred over custom Fusion graphs, and separates alpha import/compositing/export from generic visual portability.

## 1. Resolve 21 manual authority

Blackmagic Design published the DaVinci Resolve 21 Manual on 2026-07-10. Going forward:

- Resolve 21 Manual = operation/reference authority,
- Resolve 21 New Features Guide = discovery authority for new capability,
- Support Center / release notes = patch-coordinate authority,
- shipped Developer/Scripting docs = API authority,
- runtime Wedding canary = promotion authority.

Guardrail:

`DISCOVERY_DOC != OPERATION_AUTHORITY != RUNTIME_TRUST`

A feature mentioned in the New Features Guide must still be mapped to the normal operating path and runtime canary before Trusted promotion.

## 2. Native Picture in Picture is a strong wedding framing primitive

Resolve 21 New Features Guide documents a Picture in Picture Resolve FX with Inspector controls for:

- source Zoom / Pan / Tilt,
- Position X/Y,
- Width / Height,
- Rounding,
- Rotation,
- Opacity,
- Border + width/color/opacity,
- Fill + color/opacity,
- Drop Shadow + strength/color/angle/distance/expand/blur,
- Use Alpha.

This covers a large portion of common wedding-photo card treatments without custom Fusion.

Preferred route for simple framed-photo motion:

`Edit clip -> Resolve FX Picture in Picture -> Inspector keyframes`

before:

`custom Fusion graph -> Macro -> .setting/.drfx`

Use custom Fusion only when the Human Master requires behavior the native effect cannot express (complex masks, procedural reveals, multi-layer relationships, custom retime logic, etc.).

Guardrails:

`NATIVE_INSPECTOR_CAPABILITY > CUSTOM_GRAPH` when visual intent is equivalent.

`REUSE_BEFORE_BUILD` applies to Resolve FX, not just external libraries.

## 3. Human adjustability consequence

For a simple photo card, native PiP should normally score higher than a custom Fusion template on human adjustability because the user can see and edit meaningful controls directly in the Inspector with no hidden node graph.

Candidate adjustability classification:

- photo position/size/rounding/border/shadow: `EASY_INSPECTOR`,
- animation: `EASY_TIMELINE` if keyframed from Edit page,
- dependency burden: low if no custom assets/plugins are involved,
- portability burden: lower than a custom `.drfx` graph, but timeline/project portability still needs DRT/DRA runtime verification.

Do not claim visual parity with a Palmier edge-rounding implementation until a runtime render comparison is performed. Similar control names are not semantic proof.

Guardrail:

`SIMILAR_CONTROL_NAME != SEMANTIC_PARITY`

## 4. Alpha needs a three-stage trust model

Resolve 21 documentation exposes alpha-aware features, including Use Alpha in PiP and alpha-capable imported assets such as Lottie/OGraf. This does not prove every media/cache/render path preserves alpha.

Track alpha in three independent stages:

1. `ALPHA_IMPORT` — source is decoded with expected alpha.
2. `ALPHA_WORKING_PATH` — timeline/effect/cache/proxy path preserves alpha while editing.
3. `ALPHA_EXPORT` — chosen deliver codec/container writes alpha correctly.

Guardrail:

`ALPHA_IMPORT_OK != ALPHA_CACHE_OK != ALPHA_EXPORT_OK`

For Remotion assets, ProRes 4444 and VP9 WebM alpha remain candidates, but Wedding Trusted status requires Resolve 21 runtime import, compositing, save/reopen, cache/proxy, and export canaries.

## 5. New canaries

### DV21-NATIVE-PIP-01 — reuse-before-build

Create a photo-card reference with position, scale, rounding, border, shadow and alpha. Reproduce it using only Resolve 21 Picture in Picture. Compare against a custom Fusion version and record:

- visual parity,
- number of exposed controls,
- edit time for a human,
- copy/paste behavior,
- save/reopen,
- render parity,
- dependency count.

Prefer PiP if visual parity is acceptable and human editability is better.

### DV21-ALPHA-3STAGE-01

For each candidate alpha asset type (Lottie/OGraf, Remotion ProRes 4444, Remotion VP9 alpha):

- clean import,
- composite over checker/background,
- save/reopen,
- enable representative cache/proxy path where applicable,
- render to an alpha-capable deliver target,
- inspect output alpha against a reference matte.

Promote import, working-path and export independently.

### DV21-PICTURE-LATE-EDIT-01

A human who did not build the effect must be able to:

- replace the photo,
- move/resize it,
- change rounding,
- change border/shadow,
- shorten the clip,
- reduce animation intensity,
- render the result,

without opening Fusion.

This is a Wedding usability canary, not merely a feature test.

## 6. Compiler routing update

For simple wedding image framing:

1. Resolve native Transform / Crop / Composite controls.
2. Resolve FX with clear Inspector controls (PiP is now a first-class candidate).
3. Text+/native title controls.
4. generated Fusion Macro/Edit Template/.drfx.
5. guided Fusion rebuild.
6. alpha bake + Human Master sidecar.

This order minimizes hidden complexity while preserving editability.

## Trust-state changes

- Resolve 21 Manual authority: official/evidence-backed.
- Resolve 21 PiP control surface: official/evidence-backed, Wedding Runtime Pending.
- PiP as preferred simple wedding photo-frame route: compiler candidate, not yet Trusted.
- three-stage alpha model: policy/verification rule promoted; asset-specific runtime state remains pending.

## Evidence

Primary:

- Blackmagic Design — DaVinci Resolve 21 Manual, published 2026-07-10.
- Blackmagic Design — DaVinci Resolve 21 New Features Guide, Picture in Picture Resolve FX / alpha-aware controls.

No community source is required for the claims promoted in this run.
