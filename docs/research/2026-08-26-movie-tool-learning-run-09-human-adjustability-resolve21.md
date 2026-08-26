# Movie Tool Learning Run 09 — Human Adjustability as a first-class quality axis

Date: 2026-08-26
Scope: Movie Tool Learning only. DaVinci Resolve 21 major baseline.

## Why this run exists

A handoff can be visually correct and still be poor for a human editor. Wedding motion artifacts must therefore be evaluated on how easily a person can safely tune them after AI/Codex generation.

New principle:

`VISUAL_FIDELITY != HUMAN_ADJUSTABILITY`

A recipe is not top-tier merely because it renders correctly. It should expose the smallest useful set of controls in the page where the human already works.

## Official Resolve 21 evidence

Blackmagic Resolve 21 documentation and What's New material confirm:

- Fusion Effects can be adjusted directly from Cut/Edit Keyframe and Curve Editors, so a Fusion-backed template is not necessarily Fusion-page-only.
- Keyframe editing supports multi-clip selection, allowing humans to compare or tune several clips together.
- New easing modes include loop, ping-pong, relative behavior, step in/out, and four-point Bezier controls.
- Text+ and MultiText gained stronger text editing including character-level styling, font preview and multilingual spell checking.
- The full DaVinci Resolve 21 Manual dated 2026-07-10 is available and should be used as the operational authority alongside the New Features Guide.

## Human Adjustability taxonomy

Add an independent axis to every reusable motion capability:

- `EASY_INSPECTOR`: common creative controls are directly visible in Edit/Cut Inspector.
- `EASY_TIMELINE`: timing/keyframes can be changed in Edit/Cut Keyframe/Curve editor without opening Fusion.
- `GUIDED_FUSION`: advanced adjustment requires Fusion, but node groups and labels make the safe adjustment path obvious.
- `EXTERNAL_REBUILD`: adjustment requires regenerating an external artifact (Remotion/Palmier/Codex).
- `BAKED`: only clip-level trim/transform is adjustable; internal motion is rendered.

A second metric records cognitive load:

- `LOW`: 3-8 clearly named controls, bounded ranges, safe defaults.
- `MEDIUM`: 9-20 controls or mixed Edit/Fusion workflow.
- `HIGH`: raw node graph or dependency knowledge required.

## Wedding template control contract

Generated `.setting` / `.drfx` templates should expose only meaningful controls. Preferred common names:

- `Photo`
- `Text`
- `Position X / Y`
- `Scale`
- `Rotation`
- `Start / End`
- `Duration`
- `Motion Amount`
- `Ease`
- `Color`
- `Opacity`
- `Border Radius`
- `Softness`

Advanced implementation details must remain hidden unless changing them is genuinely useful.

Guardrail:

`EXPOSE_IMPLEMENTATION_DETAIL_ONLY_IF_EDITOR_NEEDS_IT`

## Control design rules

1. Group controls by human intent, not by Fusion node name.
2. Use units the editor understands: frames/seconds, %, degrees, pixels, dB.
3. Supply default/min/max where Fusion Macro supports them.
4. Avoid duplicate controls that modify the same visual result at different graph levels.
5. Prefer one `Motion Amount` master control for a family of internal values when exact independent control is unnecessary.
6. Preserve an escape hatch: advanced users may open Fusion, but normal wedding edits should not require it.
7. Asset replacement must be explicit and isolated from layout/timing controls.
8. High-impact actions such as deleting a photo, changing scene order or replacing final copy are not automatic controls.

## Multi-clip editing consequence

Resolve 21 can show/edit keyframes for multiple selected clips. This creates a new human-first recipe for repeated wedding motifs such as photo cards or route stamps:

- instantiate the same template on multiple clips,
- expose the same small control surface,
- select multiple clips,
- compare/tune curves together in Edit,
- retain per-clip overrides only where needed.

Candidate benefit: repeated scenes become faster to tune without converting them into one monolithic Fusion composition.

Guardrail:

`REUSE_TEMPLATE_INSTANCES > MONOLITHIC_COMP_WHEN_HUMAN_TUNING_BENEFITS`

## Text routing update

Resolve 21 Text+/MultiText improvements make native text more attractive for editable wedding copy than baking text into Remotion or images when the visual requirement can be met natively.

Preferred routing:

1. native Text+/MultiText when typography/layout is sufficient,
2. Fusion template with exposed text/style controls when motion or composition requires it,
3. Remotion/baked text only when the exact visual cannot be reproduced safely in Resolve.

This protects late copy changes.

## New Canaries

### DV21-HUMAN-01 — Inspector usability

Create a wedding photo-card `.drfx` with no more than eight exposed controls. Ask a user to change photo, scale, motion amount, duration and accent color without entering Fusion. Record completion time, wrong-control touches and whether labels were self-explanatory.

Promotion target: `EASY_INSPECTOR + LOW` only if the normal edit can be completed without Fusion.

### DV21-HUMAN-KF-01 — Edit-page keyframe usability

Apply one Fusion-backed template to three clips. Select all three, open Edit Keyframe/Curve editor, adjust timing/ease, save/reopen, and verify visual parity plus per-instance editability.

### DV21-TEXT-LATE-CHANGE-01

Create a title with mixed character styling, then perform a late copy change after the scene is otherwise locked. Verify styling remains editable and no external render/regeneration is required.

### DV21-CONTROL-RANGE-01

Stress every exposed Macro control at min/default/max. No value may corrupt the comp, reveal blank frames unexpectedly, or create a non-recoverable state.

## Trust implication

From this run onward, a reusable recipe cannot be promoted to top Wedding Verified status unless both visual/runtime verification and human adjustability are recorded.

Suggested promotion record:

- Handoff Fidelity
- Runtime Evidence
- Human Adjustability class
- Cognitive Load
- Exposed Controls
- Safe Range Verified
- Late-edit Verified
- Save/Reopen Verified

## Source authority

Primary:
- Blackmagic Design DaVinci Resolve 21 Manual, 2026-07-10.
- Blackmagic Design DaVinci Resolve 21 New Features Guide.
- Blackmagic Design Resolve 21 What's New.

No runtime claims are promoted by this document alone. The new canaries remain `PENDING_RUNTIME` until executed on a real Resolve 21 project.

## Research saturation

NO_CHANGE is false. Human adjustability is now a separate trust dimension and creates new runtime canaries and compiler-routing consequences.