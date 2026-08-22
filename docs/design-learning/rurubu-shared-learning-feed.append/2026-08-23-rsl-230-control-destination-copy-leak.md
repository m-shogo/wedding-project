# RSL-230 — Control-destination copy can survive clean-room visual redesign

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-230-CONTROL-DESTINATION-COPY-LEAKS-INTO-CLEANROOM-DIRECTION`

## Visible failure

V7 Cafe/Table was explicitly a Hawaii clean-room direction, yet a reader-facing close still said `夜の横浜を、ゆっくり味わう。`. The spread could look visually coherent while still carrying semantic residue from the frozen V6 control.

## Root-cause hypothesis

Clean-room separation can fail at the copy layer even when composition and visual identity are materially different. Small reader-facing closes, captions, kickers and furniture can silently preserve the old destination/story.

## Corrected experiment

Rollback-safe H2 `2308:2` changed only the incorrect destination close to `夜のハワイを、ゆっくり味わう。`, retained all structural photo dummies and native editability, and passed 500 / 1400 / 1587×1123 visual QA with zero text intersections.

## Production lesson reinforced

The first clone attached to the plugin current page instead of the source page. The already-known parent-placement method was not repeated: explicitly resolve/set the target page, append the candidate, then require parent readback before continuing.

## Transfer hypothesis

Before promoting a clean-room version or destination change, audit reader-facing dominant photography, captions, closes, kickers and small furniture for control-version semantic residue. Do not reduce this to blind string replacement; verify the intended story/destination role.

Do not transfer: Hawaii wording, Rurubu palette, layout, photo roles or typography treatment.
