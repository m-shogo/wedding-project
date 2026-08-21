# RSL-197 — Chronology meaning should control rhythm, not equal rows

Date: 2026-08-22
Source scope/item: Rurubu WEDDING / V8 Story + Chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V8 chronology had no cards and no collisions, but 2019 / 2021 / 2024 / 2026 still used the same row height, rule structure, type scale and spacing. At whole-spread scale it read like a refined table or wireframe rather than an edited sequence of events.

The contradiction was especially visible because the page headline itself says `時間は、均等には進まない。` while the layout represented every event as equally weighted.

## Root-cause hypothesis

Removing cards does not remove template rhythm when semantically unequal events are still given equal visual weight. A chronology can remain AI/UI-like through uniform row cadence alone.

Fingerprint:

`F-RSL-197-CHRONOLOGY-EQUAL-ROW-CADENCE-IGNORES-SEMANTIC-WEIGHT`

## Professional principle tested

New research this run used editorial sources discussing deliberate pace change, tension and content-responsive art direction:

- Eye Magazine, `Change the pace` (Eye 107, 2025)
- Eye Magazine, `Mondo magazines`
- It's Nice That, W—E Studio / Office issue 21

The local test transferred only the principle that publication rhythm should change when content role changes. No literal design, typeface, grid, palette or branded treatment was copied.

## Bounded change

Rollback-safe V8 Story candidate `2196:2`:

- 2019 → large opening beat;
- 2021 + 2024 → compact middle pair;
- 2026 → large terminal beat;
- three equal inter-event rules hidden;
- single title/body binding rule retained;
- all factual event strings preserved as native text;
- no new imagery or decorative filler.

Previous Story F `2171:2` preserved hidden as rollback after promotion.

## Expected improvement

Make chronology structure express narrative meaning and page pace rather than merely organizing rows, while preserving fast scanning and factual clarity.

## Regression risk

Unequal weighting can become arbitrary drama if visual emphasis is not justified by content. It can also make middle events disappear or create false importance. Receiving items must identify real semantic roles before changing scale and rhythm.

## Three-scale evidence

- 500 px whole spread: PASS; opening / middle / terminal rhythm is immediately visible.
- 1400 px reading: PASS; all four events remain scannable and notes legible.
- 1587×1123 actual size: PASS.
- visible native text: `25`.
- IMAGE: `0`.
- text intersections: `0`.
- 18 px safe risks: `0`.
- one-character Japanese line-tail heuristic: `0`.

Evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-STORY-Q-UNEVEN-CHRONOLOGY-RHYTHM-QA-2026-08-22.md`

## Adopted status

`VERIFIED_LOCAL` and adopted as current V8 Story `2196:2`.

## What must remain Rurubu-specific

Do not transfer the rust/navy palette, exact year sizes, coordinates, `2019/2021/2024/2026` content, typography scale, folios, or two-page Story composition.

## Cross-item applicability hypothesis

On a materially different editorial or print item, when timeline/history/steps are rendered as equal rows, first classify entries by actual semantic role (opening, transition, climax, terminal, exception, etc.). Then compare a bounded version whose scale/spacing follows those roles. If scan clarity or factual neutrality regresses, reject the unequal treatment.

## Next receiving-item experiment

Test on a different chronology, itinerary, or ordered information artifact where cards are already absent but the sequence still feels mechanically even. Transfer the diagnostic method only, not the Rurubu layout.
