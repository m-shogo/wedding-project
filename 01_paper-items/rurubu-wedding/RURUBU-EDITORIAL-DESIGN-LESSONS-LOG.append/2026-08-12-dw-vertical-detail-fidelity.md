# 2026-08-12 — DW vertical destination collage detail-fidelity lesson

## Lesson
Editorial asymmetry must be validated against the resolution budget of the exact image role. A dramatic vertical crop can look substantially better at thumbnail scale while becoming materially worse at print detail.

## Evidence
- DW `1001:2` replaced the DV front hierarchy with a narrow cream text column, vertical magenta spine, stacked photographic anchors, and a tall destination-photo region.
- Thumbnail and whole-spread reading improved the Japanese travel-magazine signal.
- Native structure remained editable; after repair there were `0` same-parent text intersections and `0` front text safe-area risks.
- Natural-size front QA exposed severe blockiness in reused image hash `539c259be8036b481d06b4f76db9a39b407d90e8` when enlarged into the tall destination role.

## Rule to reuse
Before enlarging an existing image into a dominant editorial crop, compare required rendered pixels against the verified source/derivative and inspect at actual page size. If the source cannot support the crop, reject the layout even if its thumbnail hierarchy is stronger.

## Asset transport note
Q60 master Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` and 560×514 derivative ID `1YwRdAauE1-CtXV3VD08CEvn7b-lFYlGX` were re-read as the correct destination assets. Exact Figma transport remains open; failed or incomplete payloads must never be treated as placement.

## Outcome
DW rejected and preserved in Studies. Broken partial-transport duplicate removed. DV outer / DF inside authority unchanged. Current unchanged.
