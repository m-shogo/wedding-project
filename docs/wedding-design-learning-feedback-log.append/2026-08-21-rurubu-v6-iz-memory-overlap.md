# Wedding design learning feedback — Rurubu V6 IZ Memory Spots

Date: 2026-08-21
Scope: Rurubu WEDDING only

## Problem observed

Memory Spots IV was locally competent but its left page still read as a strong hero followed by a separate lower module. The Spot 02 cafe image began after the hero boundary and did not help connect the page vertically.

## Test

Created rollback-safe IZ `2138:2` from IV `2127:2`. Kept the right page unchanged, reused the exact same verified photography, moved the cafe photo upward across the hero/paper boundary, narrowed adjacent Spot 01 copy, and rebalanced Spot 02 native text around the new image role.

Expected improvement: stronger photo-led editorial continuity and less section/module reading.

Regression risks considered: copy/photo collision, excessive overlap, weak raster exposure, safe-area loss, and decorative overlap without narrative purpose.

## Evidence

- 500 px whole spread: PASS and stronger than IV
- 1400 px reading scale: PASS
- native 794×1123 left page: PASS
- visible native text: 27
- IMAGE fills: 4
- same-parent text intersections: 0
- 18 px text safe-area risks: 0
- generated/adopted/Drive-saved/newly-placed assets: 0/0/0/0

## Decision

IZ adopted and promoted. IV preserved hidden as rollback.

Learning: RSL-180 `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`. Image boundaries alone can create false section ownership; a legitimate secondary photo can sometimes bridge that boundary if copy, z-order, source fidelity and physical readability remain sound.

Do not generalize the literal Rurubu layout, palette, crop, numbering, or image choices.