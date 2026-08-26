# Movie Tool Learning Run 16 — Remotion alpha render -> Resolve 21 sidecar contract

Date: 2026-08-26
Scope: Movie Tool Learning only.

## New evidence

Remotion's current official source documentation for transparent video defines two distinct alpha routes:

- WebM: PNG frame rendering + VP8/VP9 + `yuva420p`.
- ProRes: PNG frame rendering + `prores` + profile `4444` or `4444-xq` + `yuva444p10le`.

The official Remotion documentation specifically positions ProRes with alpha as the more suitable route for another video editing program and names DaVinci Resolve as a supported consumer. It also records a known transparent-WebM Lambda failure mode: VP8/VP9 alpha may flicker at chunk boundaries because chunks are encoded independently. The official recommendation is ProRes alpha when that workflow supports it, or a one-pass local WebM render.

Current wedding-project already has matching local render commands in `motion-studio/package.json`, including:

- ProRes 4444 + PNG + `yuva444p10le` for stamp/cloud alpha assets.
- VP9 + PNG + `yuva420p` for WebM variants.

Therefore the Remotion source-side transparent render recipe is no longer merely hypothetical. The unresolved boundary is the Resolve 21 runtime path after import.

## Trust separation

Do not collapse these into one pass/fail:

1. `ALPHA_SOURCE_RENDER` — source artifact actually contains alpha.
2. `ALPHA_IMPORT` — Resolve 21 recognizes that alpha.
3. `ALPHA_WORKING_PATH` — compositing, cache/proxy, trim, save/reopen preserve intended alpha semantics.
4. `ALPHA_EXPORT` — a Resolve render using a selected alpha-capable format preserves the expected alpha.

Guardrail:

`ALPHA_SOURCE_RENDER != ALPHA_IMPORT != ALPHA_WORKING_PATH != ALPHA_EXPORT`

A valid Remotion ProRes 4444 file is not enough to claim a Resolve handoff pass.

## Container/codec routing

Preferred Wedding interchange candidate:

`Remotion -> MOV / ProRes 4444 / yuva444p10le -> Resolve 21`

Why:

- Remotion officially documents the route for use in NLEs and Resolve.
- Wedding-project already has exact commands for it.
- It avoids the documented VP8/VP9 Lambda alpha chunk-boundary failure mode.
- It is a better editing interchange candidate than browser-oriented transparent WebM.

WebM remains useful for browser preview and local utility outputs but should not become the default Resolve interchange solely because it is smaller.

Guardrail:

`BROWSER_ALPHA_FORMAT != NLE_INTERCHANGE_DEFAULT`

## Baked visual vs editable motion

A transparent ProRes handoff can preserve visual compositing while still collapsing Remotion's internal parameters into rendered pixels.

Candidate classification:

- Visual transport: `BAKE_OPTION`.
- Resolve editability: clip-level timeline/transform operations only unless rebuilt.
- Internal Remotion motion values: preserved only in Human Master / sidecar, not in the video bitstream.

Guardrail:

`ALPHA_RENDERED != PARAMETRIC_NATIVE`

## Sidecar implementation promotion

This run promotes the research into code:

- `motion-studio/src/data/resolveHandoff.schema.ts`
- `motion-studio/src/data/resolveHandoffPolicy.ts`

The sidecar contract records:

- Resolve 21 major + tested patch + edition + target page,
- timeline FPS/resolution/color/audio context,
- artifact kind/container/codec,
- alpha import/working/export states independently,
- Human Master controls and whether each remains editable in Resolve,
- dependency manifest,
- per-capability Handoff Fidelity,
- Human Adjustability,
- Automation Availability,
- Runtime evidence state,
- Expected vs Observed behavior,
- recovery/verification recipes,
- guardrails and high-impact decisions.

This is intentionally stricter than a render manifest. It is a recovery contract.

## New canary — RM-DV21-ALPHA-SIDECAR-01

1. Render the same transparent composition as ProRes 4444 using the existing Wedding command path.
2. Inspect the source file for alpha before Resolve import.
3. Generate a matching sidecar with exact composition id, source runtime version, codec/pixel format, FPS/resolution and Human Master values.
4. Import into a clean Resolve 21 project.
5. Composite over black, white, saturated color and checker backgrounds.
6. Trim, reposition and change opacity.
7. Save, close and reopen.
8. Test the configured proxy/cache path separately from full-quality playback.
9. Export using an alpha-capable delivery path and re-import the result.
10. Compare edge pixels/opacity against the Remotion source and record whether discrepancies are straight/premultiplied interpretation, codec, color, or Resolve working-path issues.

Do not promote Resolve runtime state above `PENDING_RUNTIME` until this canary passes.

## New failure fingerprints

- `source-alpha-implies-resolve-alpha`: source codec supports alpha, so import is called verified -> block.
- `import-alpha-implies-roundtrip-alpha`: viewer composite looks correct, so export is assumed correct -> block.
- `webm-preview-used-as-master`: browser-friendly WebM becomes NLE master without parity test -> route to ProRes interchange candidate first.
- `baked-alpha-called-editable`: clip transform editability is mistaken for internal motion editability -> classify separately.
- `render-without-sidecar`: alpha render leaves Remotion but Human Master/dependencies/runtime settings are not packaged -> incomplete handoff.

## Evidence authority

Primary:

- remotion-dev/remotion current official docs source: `packages/docs/docs/transparent-videos.mdx` at commit `acb85f7960c2ad7426aa9d02516bb38371eca166`.
- wedding-project current `motion-studio/package.json` alpha render commands.

Resolve runtime import/round-trip remains Wedding Runtime Pending.

## Saturation

NO_CHANGE is false. This run adds a source-backed alpha interchange route, a documented WebM failure mode, and promotes the Human Master/alpha/dependency model into a machine-readable sidecar contract.
