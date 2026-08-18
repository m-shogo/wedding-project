# RSL-098 — Practical metadata can raise travel-guide density without adding cards

Date: 2026-08-18
Source scope/item: Rurubu WEDDING / V6 1DAY Plan
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred 1DAY Plan already had strong photo hierarchy, times and a route, but the STOP sequence still felt slightly too sparse to read as a useful travel-information spread at actual size.

## Root-cause hypothesis

The missing density was informational rather than decorative. Repeated beats can gain editorial usefulness from small reader-facing metadata without introducing cards, badges, more photography or a new visual system.

## Bounded test

On rollback-safe EC `1723:63`, added one compact native metadata line beneath each existing STOP copy. Existing photo hashes, route geometry, times, titles and descriptive copy were unchanged.

## Expected improvement

Increase scan density and travel-guide plausibility while keeping the page photo-led and avoiding dashboard/card containment.

## Regression risk

Micro-metadata can become unreadable, generic template filler or unverified factual claims. Final production text must remain reader-facing, native/editable and fact-checked when real itinerary data is known.

## Three-scale evidence

- whole spread 1200px: PASS;
- reading scale: PASS;
- right page actual size `794×1123`: PASS;
- right-page native text `25`;
- text collision `0`;
- 18px safe-area risk `0`.

## Figma / Drive / GitHub evidence

- Figma preferred EC: `1723:63`;
- right page: `1723:90`;
- rollback DX: `1714:2`, hidden;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-EC-1DAY-PLAN-PRACTICAL-METADATA-QA-2026-08-18.md`.

## Failure fingerprint observed during the test

`CLONED_TEXT_ESCAPED_TARGET_FRAME`

A cloned text node can be created successfully yet land outside the intended semantic frame. Creation success is not placement success. Parent/node readback is required before visual adoption.

The earlier invalid-selector attempt failed atomically and did not mutate Figma; the corrected placement was verified before promotion.

## What must remain Rurubu-specific

Do not transfer EC's exact metadata words, STOP geometry, route line, colors, typography scale, Yokohama theme or page composition.

## Cross-item applicability hypothesis

On another print artifact with repeated information beats that are readable but too sparse, independently test one layer of compact reader-facing native metadata before adding cards or more imagery. Adopt only when whole/read/actual-size QA shows improved usefulness without template/UI reading.
