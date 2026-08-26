# Decision — Human-adjustable Resolve template contract

Date: 2026-08-26
Status: Adopted for Movie Tool Learning / Motion Zukan candidates

## Decision

A reusable Wedding motion is not considered high quality only because it renders correctly. It must also be easy for a human to adjust in DaVinci Resolve 21 without opening the Fusion node graph for routine edits.

Preferred architecture:

`Canonical Motion Spec -> Resolve-native implementation -> curated Inspector controls -> safe duration behavior -> packaged reusable artifact`

## Required design rules

1. Expose only meaningful controls. Hide internal graph plumbing.
2. Rename technical parameter labels to human language.
3. Set sensible defaults and bounded minimum/maximum values where possible.
4. Prefer Edit-page media drop zones for replaceable photos/video.
5. Keep guest-visible copy native as Text+/MultiText when practical.
6. Explicitly choose duration policy:
   - proportional retime -> Anim Curves candidate,
   - fixed intro/outro + flexible hold -> Keyframe Stretcher candidate,
   - beat-locked/custom timing -> explicit keyframes; do not auto-stretch.
7. Routine edits should be possible from Edit/Cut Inspector or timeline.
8. Fusion remains an advanced escape hatch, not the default adjustment UI.
9. Save/reopen and clean-context package/import must preserve adjustability before Trusted promotion.

## Promotion rule

A template cannot receive the highest Motion Zukan trust grade unless Visual Fidelity, Runtime Evidence, Human Adjustability, and Portable Adjustability all pass independently.

## Guardrails

- `VISUAL_PARITY != HUMAN_ADJUSTABILITY`
- `TRIMMABLE != RETIME_SAFE`
- `INTERNAL_PARAMETER_COUNT != EXPOSED_CONTROL_COUNT`
- `DURATION_CHANGE_POLICY_MUST_BE_EXPLICIT`
- `REPLACEABLE_PHOTO => MEDIA_DROP_ZONE_FIRST`
- `OFFICIAL_HISTORICAL_RECIPE != CURRENT_RUNTIME_VERIFIED_RECIPE`
