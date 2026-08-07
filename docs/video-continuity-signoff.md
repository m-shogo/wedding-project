# AI Video Continuity Sign-off

## Purpose

Adopting a generated clip is not the same as approving the final cut. The last AI-looking failures often appear at AI↔real or AI↔AI edit boundaries, so movie-dashboard keeps Palmier handoff available for rough placement while requiring a separate continuity sign-off before the edit is considered FIX-ready.

## Authority

A continuity PASS is stored in project production data by appending a line to a scene note:

```text
video-continuity=passed / reviewedAt=<ISO> / fingerprint=<v1-hash> / warnings=<n> / transitions=<n>
```

The sign-off is movie-scoped. `All Movies` mode can inspect/export continuity, but cannot record one combined PASS.

## Fingerprint invalidation

The fingerprint includes the inputs that can materially change continuity:

- scene order/context and duration
- adjacent real photo/video asset IDs
- adopted AI video Prompt/model/preset
- selected authoritative generated result
- selected result path and known actual duration/resolution/fps
- current automatically detected continuity issues

Writing the PASS itself does not change the fingerprint. If any continuity-relevant input changes afterward, the previous PASS remains in history but becomes stale automatically.

## FIX-ready rule

`編集FIX Ready = PASS` only when:

1. every video Prompt routes to `edit` (adopted result authority is settled),
2. Decision Record warnings are zero, and
3. the current continuity fingerprint is either not required or has a current human PASS.

Palmier handoff is intentionally still available before FIX-ready so clips can be placed and reviewed in their real timeline context. The handoff does not authorize paid generation.

## Human review

Before recording PASS, replay the actual Palmier/CapCut timeline and use the displayed checklist for exposure/color, camera cadence, sharpness/grain/depth, framing/caption space, transitions, audio cut points, and edge-frame morphing/settling. Automatic warnings are decision support, not a substitute for this playback review.
