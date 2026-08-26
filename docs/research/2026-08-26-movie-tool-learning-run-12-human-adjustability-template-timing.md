# Movie Tool Learning Run 12 — Human Adjustability / template timing / media drop zones

Date: 2026-08-26
Scope: Movie Tool Learning only. No Figma/Paper Item changes.

## Why this run exists

Previous runs established Human Adjustability as a first-class quality axis. This run turns that axis into concrete Resolve-native template design rules so a Wedding motion can remain sophisticated internally while still being easy for a human to retime, replace media, and tune without opening the Fusion node graph.

## 1. Resolve 21 Macro Editor is a UI compiler, not only a node packager

DaVinci Resolve 21 New Features Guide documents a substantially improved Fusion Macro Editor with a live Inspector preview. For every selected node parameter, the author can choose whether to export it, rename the user-facing control, and set default/minimum/maximum values. Controls can also be reordered in the live preview.

This changes the preferred compiler target for reusable Wedding motion:

`Canonical Motion Spec -> Fusion graph -> curated Macro controls -> Edit Template -> .setting/.drfx`

Human-facing controls should be intentionally designed, not merely whatever Fusion exposes by default.

Guardrails:

- `INTERNAL_PARAMETER_COUNT != EXPOSED_CONTROL_COUNT`
- `TECHNICAL_NODE_NAME != HUMAN_CONTROL_LABEL`
- `GENERATED_GRAPH != USABLE_TEMPLATE`

Recommended first-pass exposed controls for Wedding templates:

- Photo / Media
- Text / Copy
- Position
- Scale
- Motion Amount
- Duration-dependent speed/intensity control when semantically valid
- Primary Color
- Accent Color

Avoid publishing low-level controls that only exist to make the internal graph work.

## 2. Anim Curves is a preferred route for duration-responsive animation

The official Fusion Reference Manual documents Anim Curves as a modifier designed to dynamically adapt animation timing/value/acceleration when a Fusion template duration changes on the Edit/Cut timeline. It specifically identifies this as useful for templates whose animation should stretch or compress as the title/effect/transition duration changes.

This is a strong Human Adjustability pattern because a human can trim the template on the timeline instead of editing multiple keyframes manually.

Candidate route:

`Human changes clip duration -> Anim Curves adapts animation -> template still looks intentional`

Use it when the whole motion should scale proportionally with duration.

Guardrail:

`TRIMMABLE != RETIME_SAFE`

A template is not considered EASY_TIMELINE merely because Resolve lets the user trim it. The animation must remain visually valid after trim.

## 3. Keyframe Stretcher is preferred when intro/outro timing must stay fixed

The official Fusion Reference Manual documents Keyframe Stretcher as primarily intended for Resolve title templates. It stretches the hold/static region while preserving the timing of the initial animation-on and final animation-off sections.

This maps extremely well to Wedding templates where:

- entrance animation should always remain, for example, 12 frames,
- exit animation should remain 10 frames,
- only the readable hold duration should expand or shrink.

Canonical intent representation should therefore support three semantic timing regions:

- `introLockedFrames`
- `holdFlexible`
- `outroLockedFrames`

Compiler routing:

- whole motion scales with duration -> Anim Curves candidate
- intro/outro fixed, middle stretches -> Keyframe Stretcher candidate
- handcrafted timing tied to music beat -> explicit keyframes / assisted retime, do not silently stretch

Guardrail:

`DURATION_CHANGE_POLICY_MUST_BE_EXPLICIT`

Do not let Codex choose Anim Curves vs Keyframe Stretcher from vague language such as “make it longer.” Normalize the Human Master timing intent first.

## 4. Media Drop Zones are the preferred photo replacement UX

The Fusion Reference Manual documents media drop zones for Edit-page templates: when a MediaIn ClipName parameter is exported in a Macro/template, a user can drag media from the Media Pool directly into the Inspector’s media field to replace that template input.

This is preferable to requiring the human to open Fusion and replace a MediaIn node.

Wedding design rule:

`REPLACEABLE_PHOTO => MEDIA_DROP_ZONE_FIRST`

For reusable photo-card, postcard, film-frame, passport, boarding-pass, map-card, collage, and picture-in-picture motion, expose media replacement through an Edit Inspector drop zone wherever runtime confirms the behavior remains valid in Resolve 21.

Human Adjustability candidate: `EASY_INSPECTOR`.

Runtime is still required before Trusted promotion because the detailed recipe cited here is from the Fusion 18.6 manual while Resolve 21 compatibility has not yet been reproduced in the Wedding environment.

## 5. Text+ / MultiText are stronger late-edit targets in Resolve 21

Resolve 21 New Features Guide documents spell checking across text elements and improved Text+/MultiText support for emoji, color fonts and broader font behavior. Resolve 21 also improves MultiText position/pivot/alignment and CSV-based workflows.

For Wedding late edits this supports a stronger rule:

- final guest-visible copy should remain native text whenever practical,
- text should not be baked into generated image/video merely because the surrounding decoration is complex,
- generated art can provide decorative framing while editable copy remains Text+/MultiText.

Guardrail:

`DECORATION_COMPLEXITY != TEXT_BAKE_REQUIREMENT`

Late-edit verification must include Japanese copy, punctuation, line break changes, longer/shorter replacement copy, font substitution behavior, and save/reopen.

## 6. New Human Adjustability scorecard

Every reusable Resolve template candidate should be evaluated on independent dimensions:

1. `CONTROL_DISCOVERABILITY` — can a non-Fusion user find the important controls?
2. `MEDIA_REPLACEABILITY` — can photos/video be swapped from Edit Inspector/Media Pool?
3. `COPY_EDITABILITY` — is text native and editable?
4. `DURATION_RESILIENCE` — does trim preserve intended motion?
5. `SAFE_RANGE` — do defaults/min/max prevent destructive values?
6. `RESETABILITY` — can the user recover a sensible default quickly?
7. `FUSION_ESCAPE_HATCH` — advanced users may open Fusion, but normal adjustment must not require it.
8. `PORTABLE_ADJUSTABILITY` — do these controls survive .drfx/.drt/.dra movement and save/reopen?

A high visual-fidelity template can still fail promotion if these dimensions are poor.

## 7. New canaries

### DV21-ADJUST-TRIM-01 — Anim Curves duration resilience

Build a simple template whose motion should proportionally stretch. Test at 50%, 100%, 150%, and 200% duration. Confirm intro/middle/outro remain visually coherent and no keyframe surgery is required.

### DV21-ADJUST-STRETCHER-01 — Keyframe Stretcher locked intro/outro

Build a title/photo card with fixed intro/outro and flexible hold. Trim to four durations and verify intro/outro frame counts and visual timing remain stable while the hold absorbs the change.

### DV21-MEDIA-DROP-01 — photo replacement without Fusion

Expose one MediaIn as a media drop zone. In Resolve 21 Free, replace the image from the Media Pool using only the Edit page, save/reopen, export/import via the candidate template packaging route, and verify replacement remains editable.

### DV21-TEXT-LATE-01 — native copy replacement

Use Text+ or MultiText in a packaged Wedding template. Change Japanese copy length, line breaks, font, size, and color without Fusion. Save/reopen and render before/after reference frames.

### DV21-SAFE-CONTROLS-01 — defaults/min/max guardrail

Publish Motion Amount / Scale / Radius-like controls with bounded ranges. Attempt minimum, default, maximum, and out-of-range interactions. Confirm the template remains usable and Reset returns to the intended baseline.

## 8. Source authority and honesty boundary

Primary current source:

- Blackmagic Design DaVinci Resolve 21 New Features Guide — improved Macro Editor; exported parameters; user-facing names; defaults/min/max; Inspector preview; Text+/MultiText improvements.

Primary historical Fusion behavior source:

- Blackmagic Design Fusion 18.6 Reference Manual — Anim Curves, Keyframe Stretcher, Media Drop Zones.

The Fusion 18.6 behaviors are not automatically promoted to Wedding Runtime Verified on Resolve 21. They are high-value official candidates and require the canaries above.

Guardrail:

`OFFICIAL_HISTORICAL_RECIPE != CURRENT_RUNTIME_VERIFIED_RECIPE`

## 9. Research saturation

NO_CHANGE is false. This run converts Human Adjustability into concrete template compiler choices and adds three high-value native mechanisms — Anim Curves, Keyframe Stretcher and media drop zones — plus a measurable adjustability scorecard. Runtime backlog remains substantial, so RESEARCH_SATURATED does not apply.
