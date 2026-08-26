# Movie Tool Learning Run 46 — Remotion Typography Elements shared kit

Date: 2026-08-27

## Goal

Move from a one-off Mask Reveal Element canary to a repeatable Motion Zukan → Remotion Element path without duplicating motion implementations.

## Implementation

- Added `scripts/lib/typography-element-kit.mts` as the shared Studio-facing generator.
- The generator extracts the existing canonical `TypographyRevealEngine` block from `engines.tsx`.
- Mask Reveal now uses the shared kit instead of maintaining a bespoke source generator.
- Added a second Element candidate: `type-char-stagger` using canonical `mode="stagger"`.
- Both Elements expose the same useful Studio surface: text, intensity, color, translate, scale, rotate, opacity.
- Both use canonical `exitAnimation="fade"`; no wrapper-only motion implementation is introduced.
- Added a shared artifact validator and CI rendering of both standalone generated Element sources.

## Why Character Stagger next

`type-char-stagger` is already a render-verified Motion Zukan treatment and is useful in both Opening and Profile movie titles/captions. It exercises a materially different canonical branch (per-character reveal) while reusing the same engine, which is a stronger proof than adding another mask-like preset.

## Honesty boundary

CI proves source extraction, payload validation, schema structure and standalone rendering only.

`Studio install / Inspector control mutation / undo-redo / reload-restart` remain `NOT_RUN` until a real Mac Studio Actual is performed.

Guardrails:

- `SHARED_ELEMENT_KIT != SHARED_MOTION_IMPLEMENTATION`
- `ELEMENT_PAYLOAD_VALID != STUDIO_INSTALL_VERIFIED`
- `SECOND_ELEMENT_RENDERABLE != STUDIO_UX_VERIFIED`
- `DERIVED_SOURCE != SECOND_MOTION_IMPLEMENTATION`

## Next implementation target

After this PR is green and merged, add the next high-value typography treatment through the same kit (prefer `type-type-on-rhythm` / `word-stagger`) and begin a small machine-readable Element catalog so Motion Zukan can distinguish `ELEMENT_CANDIDATE` from ordinary Remotion-preview-only records without overstating Studio Actual verification.
