# Rurubu V6 — GE Memory Spot 03 direct photo beat feedback

Date: 2026-08-20
Scope: Rurubu WEDDING only

## Visible problem

Memory Spots FT had one remaining conspicuous small photo-card treatment at Spot 03: a 6px white frame, separate yellow edge and detached text block. Spot 04 already behaved as a dominant direct-photo editorial feature, so the two roles did not feel like one mature spread.

## Principle / capability tested

Test whether the frame/edge still performs an actual binding or contrast function before retaining it. If native ordinal/title hierarchy is already sufficient, let the legitimate source photo sit directly on the page and move editorial responsibility into native typography instead of adding more containment.

## Bounded experiment

GE `1941:2` duplicated FT `1912:2`.

Changed only Spot 03:

- preserved image fill/hash and 238×218 geometry;
- removed white stroke;
- hid yellow edge;
- retained slight rotation;
- enlarged native `03` to 72px;
- grouped title/copy/meta visually beside the direct photo.

No changes to Spot 04, left page, Drive assets, other Rurubu spreads, or V7.

## Expected improvement

Reduce UI/card reading and align Spot 03 with the photo-led Japanese travel-magazine grammar already established by Spot 04.

## Regression risk

Loss of separation from the cream background, weaker title binding, text collision, or accidental flattening of Spot 03/04 hierarchy.

## Evidence

- whole spread: GE stronger than FT;
- right page 794×1123: PASS;
- initial structure QA found a 4px `03` / title contact; fixed before adoption;
- final native text count: 14;
- final text collisions: 0;
- final 18px safe-area risks: 0;
- visible image roles: 2;
- page-level stray nodes: 0.

## Decision

`ADOPTED / VERIFIED_LOCAL`.

GE promoted to the review-board Memory Spots slot. FT preserved hidden rollback.

## Next application

Do not mechanically remove borders elsewhere. On each small image role, first determine whether the border/edge performs a real separation, contrast, caption-binding or physical-print function. Only test direct-photo treatment where that function is already supplied by the surrounding semantic hierarchy.
