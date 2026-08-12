# 2026-08-12 — Rurubu ED / EE editorial-density feedback

Scope: Rurubu WEDDING only.

## Problem observed
Even after the EC/DZ clean-room passes, two residual patterns still made the work feel less like a Japanese travel-information magazine than intended:
- the back-cover chronology relied on a decorative zig-zag route and small staggered dates, which read as infographic ornament;
- the inside Memory Spots section still behaved like a photo gallery followed by detached caption rows.

## Capability tested
Use scale hierarchy and subtraction as the primary editorial system:
- convert chronology to six compact type-led entries with narrow color rules;
- remove route ornament when it does not improve reading order;
- enforce dominant/support/accent photo ratios at thumbnail scale;
- allow only the smallest edge-attached caption strip when busy photography needs contrast.

## Result
ED outer and EE inside were both selected over their prior comparators after thumbnail, whole-spread, actual-size, and structural review. ED preserves EC's front and materially improves the back-cover travel-log rhythm. EE preserves DZ's profile/history structure and makes the right-page Memory Spots materially more photo-led and asymmetric.

## Regression caught
- ED initially had six year/label text-box overlaps. Repaired before adoption.
- EE initially crowded support-photo captions near the footer, then exposed one inherited Q1 text collision on the untouched left page. Both were repaired before promotion.

## Reusable rule
For print/editorial work, do not equate “more editorial” with adding more stickers or route decoration. Prefer:

`photo hierarchy → headline scale → compact information clusters → short rules → only then a minimal caption strip when contrast requires it`.

Always run structural QA over the whole duplicated spread, not only the visually edited page, because clean-room duplication can carry hidden inherited defects.

## Evidence
- ED Working `1046:2`, Review `1048:2`
- EE Working `1048:185`, Review `1050:2`
- Start Here `ED outer / EE inside`
- Current `77:18 / 77:290` unchanged
- new generated assets: 0
- new external binary placed: 0
- exact Q60 Drive→Figma provenance: still open