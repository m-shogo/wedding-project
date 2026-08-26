# Movie Tool Learning Run 03 — Remotion native routing / version authority

Date: 2026-08-26
Scope: Movie only. No Figma/Paper Item changes.

## Why this run exists

The Tool Learning Base already has a strong Palmier → DaVinci fidelity model, but the Remotion side was still under-modeled. This run audits whether recent Remotion Studio capabilities let us keep more motion editable/native instead of rebuilding custom controls or baking too early.

## Version authority correction

Current wedding-project lockfile resolves Remotion packages to **4.0.475**.

Do not equate the version field in `remotion-dev/skills` with the latest stable Remotion runtime. The official Remotion release page currently exposes **v4.0.508** as the latest stable release, while the Remotion Skills repo advertises skill version **4.0.509**. Those are separate version authorities.

Guardrail:

`SKILL_VERSION != RUNTIME_VERSION`

Any Trusted claim must record the actual installed package version from the lockfile/runtime, not infer it from an agent skill header.

## High-value changes after our installed 4.0.475

Official Remotion release evidence shows several Studio/native editing capabilities relevant to Motion Zukan:

- v4.0.501: border-radius controls.
- v4.0.503: custom editors in Studio.
- v4.0.506: cropping for `<Interactive.Div>`, fine-grained runtime value reactivity, Studio settings modal, sequence/default-prop subscriptions in browser studio, and deprecation of `visualControl()`.
- v4.0.507: SVG schema color control and auto-save settings to config.
- v4.0.508: 3D transform controls in Studio.

These capabilities are not automatically Wedding Verified. They are candidates for replacing custom UI/control plumbing when the underlying Human Master property maps cleanly to a native Remotion interactive/schema control.

## Compiler routing implication

For a motion property, choose the earliest native/editable layer that satisfies the Human Master intent:

1. **Remotion native schema / interactive control** when the property is code-defined and benefits from Studio editing.
2. **Shared Motion Zukan engine** when behavior is reusable but not representable by a built-in Studio control alone.
3. **Palmier** when timeline/clip editing and FCPXML handoff are the stronger path.
4. **DaVinci Edit/Text+/Fusion** when final finishing or native Resolve editability is required.
5. **Alpha render / bake** only as a portability fallback.

Guardrail:

`CUSTOM_ENGINE_OR_UI != DEFAULT`

Before adding another bespoke Motion Zukan editor, check whether current Remotion Studio already supplies the needed control semantics.

## Capability mapping candidates

### Border radius

Human Master: radius in px/percent, per-corner policy if needed.

Preferred Remotion route: native Studio border-radius controls when the target is an interactive element.

DaVinci handoff: rendered-alpha asset is portable but loses parameter-level editability; if final Resolve editability is mandatory, recompile the Human Master radius into Fusion/Edit rather than pretending the render is parametric.

### Crop

Human Master: crop box / focal region / timing.

Preferred Remotion route: `<Interactive.Div>` crop support for Remotion-native authoring.

Handoff fidelity to Resolve: `BAKE_OPTION` for direct rendered transport unless a sidecar Human Master is also delivered for Resolve-native reconstruction.

### 3D transform

Human Master: translate/rotate/scale axes, perspective/camera assumptions, easing.

Preferred Remotion route: Studio 3D transform controls for Remotion-native editing.

Resolve recovery: do not classify as EXACT from a flattened render. If the motion must remain editable in Resolve, preserve Human Master values and rebuild in Fusion/Edit according to the semantic target.

### SVG colors

Human Master: semantic color tokens, not just raw rendered pixels.

Preferred Remotion route: schema color controls for SVG-backed motion.

Packaging guardrail: keep source SVG + Human Master token values with the rendered artifact.

### Custom editors

Use only when the Human Master cannot be safely represented by standard schema/interactive controls. A custom editor increases maintenance cost and should justify itself with a repeated cross-scene need.

## Remotion → Resolve handoff model

A Remotion render can be visually exact while being non-parametric in Resolve. Therefore add the same separation already used for Lottie:

`VISUAL_PARITY != PARAMETRIC_EDITABILITY`

Recommended package for Remotion-generated elements:

- alpha render when transparency is required (e.g. ProRes 4444 or another verified alpha-capable delivery),
- Human Master JSON/sidecar,
- source dependency manifest (font, SVG/image/video assets),
- exact Remotion runtime version,
- render settings (fps, resolution, codec/container, color assumptions),
- optional Resolve rebuild recipe when editability is required.

## Canary backlog added by this run

### RM-NATIVE-01 — 4.0.508 Studio control canary

In a clean branch/project, upgrade all `remotion` and `@remotion/*` packages together to the same stable version. Verify:

- border radius is editable and persists after restart,
- crop edits persist and render correctly,
- 3D transforms persist and render correctly,
- SVG schema color changes persist,
- no existing wedding motion composition changes visually without an intentional edit.

Do not promote to Trusted based only on release notes.

### RM-HANDOFF-01 — alpha + sidecar → Resolve Free

Create one synthetic composition containing border radius, crop animation, 3D transform and SVG color. Export alpha media plus Human Master JSON. In Resolve Free:

- import the alpha render,
- verify alpha/composite,
- verify duration/fps/resolution,
- save/reopen,
- classify editability as clip-level only for the render,
- use the Human Master sidecar to manually/native-rebuild one property and compare rendered output.

### RM-UPGRADE-REGRESSION-01

Before changing production dependencies, render a fixed set of existing Motion Zukan golden frames on 4.0.475 and candidate stable version; compare for unexpected deltas. Upgrade is blocked if the visual baseline changes without explanation.

## Trust state

This run is **Evidence-backed but not Runtime Verified**. It changes routing/guardrails and backlog only. No wedding production dependency upgrade is authorized by this document alone.

## Research saturation

NO_CHANGE is false for this run. New actionable knowledge was found: version-authority correction plus native Studio capabilities that can reduce bespoke tooling. `RESEARCH_SATURATED` is therefore not applicable.

## Sources

- wedding-project `motion-studio/pnpm-lock.yaml` — installed Remotion 4.0.475.
- remotion-dev/remotion official GitHub Releases — v4.0.501, v4.0.503, v4.0.506, v4.0.507, v4.0.508 capability changes.
- remotion-dev/skills `remotion-upgrade` / `remotion-studio` skill headers — skill version 4.0.509, used only to establish that skill/runtime versions must not be conflated.
