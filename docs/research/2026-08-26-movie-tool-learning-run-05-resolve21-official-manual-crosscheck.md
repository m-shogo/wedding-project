# Movie Tool Learning Run 05 — Resolve 21 official manual cross-check / native template routing

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Purpose

Re-check the Palmier / Remotion -> DaVinci handoff against current Blackmagic Design primary sources with **DaVinci Resolve 21 as the major-version baseline**. Patch versions are treated as runtime evidence coordinates, not as a replacement for the product baseline.

## 1. Version authority policy

Product baseline: **DaVinci Resolve 21**.

As of 2026-08-26, Blackmagic Design's official Support Center lists **DaVinci Resolve 21.0.4**, released 2026-08-05. The Japanese Support search surface can lag another Blackmagic locale, so latest-patch checks must not rely on one localized page only.

Rules:

- User-facing and architecture docs say `DaVinci Resolve 21` unless a patch-specific behavior is being discussed.
- Runtime evidence records the exact patch (`21.0.4`, etc.).
- Before every Resolve Actual canary, re-check official Blackmagic Support for a newer 21.x patch.
- Patch changes invalidate only patch-dependent claims, not unrelated exporter/manual evidence.

Guardrails:

`PRODUCT_BASELINE = RESOLVE_21`

`PATCH_VERSION = RUNTIME_EVIDENCE_COORDINATE`

`LATEST_PATCH_CHECK = MULTI_LOCALE_OFFICIAL_SUPPORT`

## 2. Resolve 21 Lottie / OGraf is a first-class native route

The official DaVinci Resolve 21 New Features Guide documents native import of OGraf `.json` and Lottie `.lottie` on macOS and Windows. They can be added to the Media Pool or directly to the timeline, are recognized as animation clips, and alpha transparency is maintained. Fusion 21 also adds `OGrafLoader` for loading OGraf/Lottie inside a composition.

Therefore Palmier Lottie should not default to bake or manual recreation.

Preferred route:

`original .lottie/.json asset -> Resolve 21 native import -> edit/trim/readback canary -> bake only if a specific unsupported behavior is demonstrated`

Still pending runtime proof:

- trim semantics,
- speed / retime behavior,
- save/reopen persistence,
- internal parameter editability versus clip-level editability,
- font/image dependency portability,
- alpha/color parity against source render.

## 3. Fusion Macro Editor makes editable Wedding templates more valuable

Resolve 21's New Features Guide documents a substantially improved Fusion Macro Editor. Multiple nodes can be repackaged as self-contained macros/groups, only selected controls need to be exposed to the user, and the editor now provides a live Inspector preview and control reordering.

This changes the preferred recovery design for Palmier properties that FCPXML loses.

Instead of generating opaque Fusion graphs, generate **Wedding Motion Macros** whose Inspector exposes only Human-Master-relevant controls, for example:

- Text background: color, padding, corner radius, opacity.
- Crop/mask: left/right/top/bottom, softness, rounding.
- Title transform: scale, rotation, anchor/position.
- Photo card: border, radius, shadow, image fit.
- Route/map motion: progress, line width, marker size.

Then package the macro/template in `.drfx` for Resolve-native reuse.

Preferred route:

`Canonical Motion Spec -> Fusion graph -> curated Macro controls -> .setting -> .drfx -> Resolve 21 UI install`

This is stronger than a raw `.setting` because it optimizes post-handoff human editability.

Guardrail:

`NATIVE_EDITABILITY > GRAPH_DUMP`

## 4. Fairlight Animator is useful, but it does not solve audio automation writes

Resolve 21 introduces the **Fairlight Animator** modifier in Fusion. The official guide shows it driving Fusion parameters from an audio clip analysis such as Level, with scale/offset controls.

This is useful for music-reactive Wedding graphics (pulse, particles, glow, scale, turbulence), and it should be added to the visual-motion library as a Resolve-native audio-reactive option.

However it is the opposite direction from the unresolved Palmier problem:

- Fairlight Animator: `audio analysis -> visual parameter`.
- Palmier lost audio keyframes/fades: `desired audio gain automation -> Fairlight/Edit audio property`.

Therefore Fairlight Animator must **not** be cited as proof that audio volume/fade curves are script-writable.

Guardrail:

`AUDIO_DRIVES_VISUAL != AUDIO_GAIN_WRITE_API`

## 5. Native Resolve 21 routing matrix

For every Human Master capability, evaluate these routes before inventing a custom workaround:

1. FCPXML native transport to Edit/Text+.
2. Resolve 21 direct asset import (Lottie/OGraf/media/stills/audio).
3. Fusion Macro / `.setting` / `.drfx` native reusable template.
4. Fusion composition reconstruction when a graph is the natural representation.
5. Edit/Text+/Color/Fairlight guided native rebuild using Human Master values.
6. Alpha-capable render + sidecar as explicit bake fallback.
7. Studio scripting only when edition/execution availability and the exact mutation surface are runtime verified.

This is a **reuse-before-build** rule for DaVinci itself: prefer Resolve-native mechanisms introduced or strengthened in 21 before adding external glue.

## 6. New canaries from the manual cross-check

### DV21-LOTTIE-01 — native Lottie lifecycle

On Resolve 21 current patch:

- import a synthetic `.lottie` with alpha and a known duration,
- place over a checker/background clip,
- trim head/tail,
- duplicate and retime if supported,
- save/reopen,
- render alpha/composite samples,
- compare known frames against a source render,
- record what is editable in Edit vs Fusion/OGrafLoader.

### DV21-MACRO-01 — editable Wedding Motion Macro

Create a simple photo-card macro from Background + Rectangle/Mask + Transform + Merge, expose only border radius / softness / scale / rotation, package as `.drfx`, then verify:

- clean install,
- Effects Library visibility,
- Inspector control names/order/defaults,
- manual mutation,
- save/reopen,
- render parity,
- uninstall/reinstall.

### DV21-FAIRLIGHT-ANIM-01 — audio-reactive visual

Use Fairlight Animator to drive one obvious Fusion property from a known audio envelope. Verify deterministic response, scale/offset behavior and save/reopen. This can become a native Wedding effect recipe if stable.

### DV21-AUDIO-WRITE-01 — keep separate

Re-check the current Resolve 21 Scripting README/API/runtime for any actual audio gain/fade automation write surface. Do not promote from ASSISTED_REBUILD unless an exact write/readback test succeeds.

## 7. Broader Wedding production implications

Resolve 21 is not only a finishing target. With native Lottie/OGraf, improved Macro Editor, `.drfx`, Fusion and Fairlight Animator, it can host an editable **Wedding Motion Library**.

That suggests a three-tier deliverable for reusable motion:

- **Source Master**: Canonical Motion Spec / Remotion or Palmier source.
- **Resolve Native Master**: `.drfx` + exposed controls + dependency manifest.
- **Compatibility Master**: alpha video or flattened render + sidecar timing metadata.

Each effect should be promoted independently; one failing feature must not force the entire movie into baked video.

## 8. Evidence authority

Primary sources checked for this run:

- Blackmagic Design official Support Center — Resolve 21.0.4 release listing (2026-08-05).
- Blackmagic Design DaVinci Resolve 21 New Features Guide — OGraf/Lottie native support and `OGrafLoader`.
- Blackmagic Design DaVinci Resolve 21 New Features Guide — improved Fusion Macro Editor.
- Blackmagic Design DaVinci Resolve 21 New Features Guide — Fairlight Animator.

Secondary/community evidence is allowed only to generate hypotheses/canaries, never to override official capability claims.

## Trust changes

- Product baseline wording: **DaVinci Resolve 21**.
- Current patch coordinate: **21.0.4 as of 2026-08-26 official check**.
- Lottie/OGraf native import + alpha: **officially documented / Wedding Runtime Pending**.
- Fusion Macro Editor as editable-template architecture: **officially documented / generated Wedding artifact pending**.
- Fairlight Animator for audio-reactive visuals: **officially documented / Wedding Runtime Pending**.
- Audio gain/fade programmatic write: **unchanged; PENDING/ASSISTED**.

`RESEARCH_SATURATED = false` because Resolve 21 runtime canaries and template generation remain high-value open work.
