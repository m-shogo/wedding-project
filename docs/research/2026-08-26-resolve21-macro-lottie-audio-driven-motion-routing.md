# Resolve 21 Macro / Lottie / Audio-Driven Motion Routing

Status: EVIDENCE_VERIFIED / RUNTIME_CANARY_PENDING  
Date: 2026-08-26  
Scope: Movie Tool Learning Base

## Why this matters

Palmier -> DaVinci recovery should not only ask whether a lost property can be recreated. It should also choose the most reusable DaVinci-native packaging surface and identify new motion capabilities that are better authored in Resolve than transported through FCPXML.

## Official Resolve 21 evidence

Blackmagic Design's DaVinci Resolve 21 New Features Guide documents two relevant capabilities.

### 1. Fusion Macro Editor is a first-class reusable packaging path

Resolve 21's improved Macro Editor can bundle multiple interconnected Fusion tools into a self-contained macro or group, restrict which controls are exposed to users, set names/defaults/min/max values, preview the resulting Inspector UI live, and save the result as:

- Macro
- Group
- Edit Template
  - Title
  - Generator
  - Effect
  - Transition

This means deterministic Motion Zukan effects should not be modeled only as one-off `.setting` imports. When a rebuild recipe is reusable and human-adjustable, the preferred destination may be a constrained Fusion Macro / Edit Template with only canonical controls exposed.

Official source:
- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Fusion: Improved Macro Editor, pp. 112-115.

### 2. Lottie / OGraf direct import remains the shortest native route

Resolve 21 supports OGraf `.json` and Lottie `.lottie` directly in the Media Pool or timeline on macOS and Windows, preserving alpha. Fusion also adds `OGrafLoader` for composition-level use.

Therefore Palmier FCPXML omission of Lottie should continue to route:

```text
retain original .lottie
-> direct Resolve import first
-> verify alpha / duration / trim / scale / save-reopen
-> use OGrafLoader only when node-level control is actually required
-> bake only as lower-editability fallback
```

Official source:
- Blackmagic Design, DaVinci Resolve 21 New Features Guide, Support for OGraf HTML Graphics and Lottie Animations, pp. 67 / 116.

## New capability: Fairlight Animator is for audio-driven visual motion, not audio editing

Resolve 21 adds a Fairlight Animator modifier in Fusion. It analyzes timeline/media-pool audio and can drive numerical Fusion controls from audio level analysis.

This is useful for Motion Zukan patterns such as:

- beat/level-reactive scale
- audio-reactive glow/intensity
- waveform-like graphic motion
- subtle title pulse linked to music energy

But it does **not** solve Palmier -> DaVinci audio volume/fade reconstruction. It consumes audio analysis to drive visual parameters; it is not evidence of a scripting surface for writing Fairlight clip volume, fade handles, or automation curves.

### Guardrail

`FAIRLIGHT_ANIMATOR != FAIRLIGHT_AUDIO_AUTOMATION_WRITE`

Do not use the existence of Fairlight Animator to upgrade audio Volume/Fade recovery from assisted/manual to AUTO_REBUILD.

## Compiler routing update

| Capability | Preferred native route | Packaging | Current trust |
|---|---|---|---|
| Reusable text background / reveal / mask effect | Fusion graph | Macro or Edit Template when repeatable | official packaging capability; runtime recipe pending |
| One-off deterministic Fusion rebuild | Fusion comp | `.setting` / `ImportFusionComp()` | API surface observed; runtime pending |
| Lottie overlay | direct `.lottie` import | retain source asset + sidecar provenance | official capability; runtime handoff pending |
| Node-controlled Lottie | Fusion `OGrafLoader` | Fusion comp/macro | official capability; runtime pending |
| Audio-reactive visual motion | Fusion Fairlight Animator | macro/template candidate | official capability; Wedding recipe pending |
| Audio clip volume/fade rebuild | Fairlight/Edit assisted route until write API proven | Human Master exact values + verification | still unverified for automation |

## Instruction Pattern update

When Codex/DaVinci is asked to rebuild a lost visual effect, do not default to a raw Fusion graph. Use this decision order:

```text
1. Can an Edit-page native property preserve the same meaning and editability?
2. If not, can a Fusion graph reproduce it deterministically?
3. Is this graph reusable across scenes?
   - yes -> package as Macro / Edit Template with only canonical controls exposed
   - no  -> use bounded Fusion composition / .setting
4. If the source is Lottie, prefer direct source re-import before reconstructing nodes.
5. If motion is intentionally audio-reactive, evaluate Fairlight Animator.
6. Never treat Fairlight Animator as an audio-volume/fade mutation mechanism.
7. Verify readback, save/reopen, clean-context import/install, dependencies, and render parity.
```

## Version sensitivity

Blackmagic's current support page lists DaVinci Resolve 21.0.3 (2026-07-22) as the current Resolve 21 update and specifically notes improved keyframe editing. Fusion Studio 21.0.3 also improved `.drfx` asset handling.

Therefore reusable packaging evidence must record the exact patch version. A `.drfx` or template that works on one patch must not silently certify another patch.

## Next high-value canaries

### `macro-template-portability-01`

Create one deterministic text-background/reveal graph, then:

1. expose only Human Master controls (duration, direction, softness, intensity)
2. save as Macro
3. save as Edit Effect/Title template where semantically appropriate
4. install/load in a clean Resolve 21.0.3 context
5. verify dependencies resolve
6. edit exposed controls
7. save/reopen
8. render fixed checkpoints
9. compare against the raw Fusion composition result

### `fairlight-animator-motion-01`

Use deterministic test audio and one numeric visual control:

1. add Fairlight Animator modifier
2. bind to known audio source
3. record analysis mode, scale, offset and timing
4. verify visual response at fixed checkpoints
5. save/reopen
6. verify source relink behavior
7. classify as a Motion Zukan recipe only after a second scene reproduces it

### `lottie-portability-01`

Continue the existing Lottie canary with direct import first, then compare to OGrafLoader only if node-level control is needed.

## Research state

`RESEARCH_SATURATED = false`

Reason: this run adds a materially better packaging route (Macro/Edit Template) and a distinct audio-driven visual-motion capability, while clean Resolve runtime and portability canaries remain open.