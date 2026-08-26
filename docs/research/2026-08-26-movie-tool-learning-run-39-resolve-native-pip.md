# Movie Tool Learning Run 39 — Resolve 21 Native Picture in Picture / Wedding Photo Card

Date: 2026-08-26  
Scope: Movie Tool Learning only  
Runtime state: PENDING

## Why this run exists

A wedding photo card often needs only:

- crop/framing;
- position and size;
- rounded corners;
- a border;
- a soft drop shadow;
- small rotation/opacity changes;
- easy late edits by a human.

If Resolve 21's native Picture in Picture Resolve FX can do this from the Edit Inspector, a custom Fusion graph or DRFX is unnecessary complexity for the ordinary case.

Compiler preference:

```text
native Inspector path
> custom Fusion/DRFX
```

only when the visual intent is equivalent and runtime evidence confirms the native path is available and understandable.

## Primary evidence

Blackmagic Design, **DaVinci Resolve 21 New Features Guide**, Resolve FX / Picture in Picture, pages 97–99.

The guide documents:

- apply Picture in Picture to the upper clip on Cut/Edit;
- adjust parameters in the Inspector;
- move, change ratio and scale with the Open FX Overlay;
- Content: Zoom, Pan, Tilt;
- Position: Position X/Y, Width, Height;
- Style: Rounding, Rotation, Opacity;
- Border: enable, Width, Color, Opacity;
- Fill Matches Border;
- Fill: Color, Opacity;
- Drop Shadow: Strength, Color, Drop Angle, Drop Distance, Expand, Blur;
- Use Alpha.

The same guide defines Rounding from right angles (`0`) to circle (`1`).

Blackmagic's current Resolve 21 What's New page also describes the new PiP Resolve FX as a fast floating-frame route with size, placement, frame rounding and drop shadow.

## Expected behavior vs observed behavior

### Expected from official docs

The controls above should exist in the Resolve 21 PiP Resolve FX family.

### Still runtime-pending

Do not infer without Actual:

- Free vs Studio availability in the exact installed build;
- exact Effects Library category/name in that build;
- watermark/restriction behavior;
- exact numeric units/ranges except documented Rounding 0..1;
- PiP-specific keyframe affordances and which controls expose them;
- save/reopen persistence in the tested project;
- rendered visual parity;
- whether a normal editor finds the workflow easier than a custom Fusion template.

## Canary

`DV21-NATIVE-PIP-01`

Synthetic inputs only:

- 640×360 moving test-pattern top source;
- 1920×1080 neutral background;
- 6 seconds / 30fps;
- no wedding/private media;
- Human Master sidecar.

Core runtime steps:

1. effect availability by exact edition;
2. Inspector control inventory;
3. style a neutral photo card;
4. perform bounded human late edits;
5. classify animation affordance separately;
6. save/reopen and render.

## Human adjustability contract

The core route must stay in normal Edit-page controls.

Promotion requires machine-readable evidence that:

```text
effect-availability.available = true
style-photo-card.fusionOpened = false
human-late-edit.fusionOpened = false
save-reopen-render.postReopenPersisted = true
save-reopen-render.renderVisualMatch = true
```

This prevents a PASS that secretly depended on Fusion graph editing.

## Alpha boundary

The neutral PiP source is intentionally opaque. `Use Alpha` may be inventoried, but this canary cannot prove alpha preservation.

Use the dedicated alpha/Lottie canaries for alpha behavior.

```text
OPAQUE_SOURCE_USE_ALPHA_CONTROL != ALPHA_PRESERVATION_PROOF
```

## Animation boundary

Static Inspector editability and animation capability are separate.

The core photo-card PASS does not require a keyframed PiP animation. If obvious keyframe affordances exist, record one bounded animation observation; otherwise classify animation as unavailable/unclear for that runtime without degrading the static usability result.

```text
STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY
```

## Promotion boundary

One execution can become internally promotion-eligible only with:

- exact live Resolve identity;
- all six runtime steps PASS;
- exact hashed fixture inputs;
- completed human review;
- no Fusion use for the core styling/late-edit route;
- save/reopen persistence;
- a hashed short render that visually matches the post-reopen Inspector state.

Canonical `REPRODUCED` still requires two independent executions.

```text
ONE_PASS != REPRODUCED
```

## Compiler consequence if runtime passes

For ordinary wedding photo cards, prefer:

1. native Edit Transform/Crop if sufficient;
2. native Picture in Picture Resolve FX for framed/rounded/bordered/shadowed cards;
3. custom DRFX/Fusion only for behavior the native path cannot express.

Do not promote PiP as a replacement for complex masks, procedural reveals, relational layouts, title systems or Palmier-specific motion until those visual intents are separately compared.

## Guardrails

```text
NATIVE_INSPECTOR_CAPABILITY > CUSTOM_GRAPH_WHEN_VISUAL_INTENT_EQUIVALENT
EFFECT_LISTED_IN_DOCS != EFFECT_AVAILABLE_IN_TESTED_EDITION
SIMILAR_CONTROL_NAME != SEMANTIC_PARITY
PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE
STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY
OPAQUE_SOURCE_USE_ALPHA_CONTROL != ALPHA_PRESERVATION_PROOF
ONE_PASS != REPRODUCED
```
