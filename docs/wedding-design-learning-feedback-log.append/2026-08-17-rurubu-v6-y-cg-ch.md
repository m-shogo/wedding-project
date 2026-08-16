# Rurubu V6 — Y + CG/CH visual feedback

Date: 2026-08-17
Scope: Rurubu WEDDING only

## Observation

CE Story was visually coherent but its two support-photo white frames added postcard/scrapbook containment that was weaker than the edge-led photo language already proven in Outer Y and Q&A CG.

## Hypothesis

If those Story support borders have no real image-caption or overlap-separation role, removing only the borders should make the page read more like a continuous travel-magazine photo spread without sacrificing editability.

## Bounded comparison

- CE `1535:78`: previous preferred.
- CH `1548:2`: removed 6px white strokes from Story support 1/2 only; native text, image fills, chronology and texture preserved.
- CJ `1549:2`: separately tested the same subtraction on the overlapping Profile snapshot cluster.

## Result

CH adopted:
- stronger photo-led continuity at 500px and 1400px;
- actual-size Story `794×1123` remains readable;
- native text `12`, IMAGE fills `4`, text collisions `0`, 18px safe-area risks `0`.

CJ rejected:
- the Profile snapshot borders visibly separate overlapping photographs;
- removing them made the cluster merge into a less readable mass;
- therefore the same subtraction is not applied globally.

## Decision

- promote CH as preferred Story/chronology spread;
- preserve CE as hidden rollback;
- hide CJ as rejected comparison;
- keep Outer Y and Profile/Q&A CG unchanged;
- V7 remains HOLD.

## Asset state

Generated `0`; Drive saves `0`; binary placements `0`; image hashes changed `0`; existing verified photographs recomposed only. Drive V6 root remains `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Learning

RSL-061: border/frame subtraction must be tested per overlap context. A frame can be redundant in one photo role and necessary as an optical separator in another.
