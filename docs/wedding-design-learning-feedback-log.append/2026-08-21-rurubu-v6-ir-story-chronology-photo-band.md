# 2026-08-21 — Rurubu V6 IR Story / Chronology clean-room photo-band feedback

Scope: `Rurubu WEDDING only`
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Source preferred before experiment: IO `2095:18`
Adopted preferred: IR `2104:2`

## Visible problem

At the six-spread common scale, Story / Chronology was the next weak point. The left Story page already behaved like a travel magazine, but the Chronology right page still depended on a vertical rail and repeated event rows. The spread therefore changed visual language midway and read closer to a timeline UI than a photo-led editorial narrative.

## Principle / capability tested

Test whether chronology can remain understandable through numbering and grouping alone while the page is rebuilt into unequal editorial beats. The neutral cross-scope hypothesis consumed here was limited to method: a retained line/rail must prove a real binding function at whole-item scale. No opposite-item layout, asset, brand treatment, coordinates, or current-state conclusion was inspected or transferred.

## Root-cause hypothesis

The chronological rail had become the page's organizing visual rather than a supporting cue. Because the events were already numbered, the rail duplicated ordering while forcing similar visual weight across moments that should not be equal. Existing destination photography was strong enough to become a structural chapter instead.

## Bounded test

Rollback-safe IR `2104:2` preserved the left page and rebuilt only Chronology right `2104:28`:

- remove/hide the vertical route rail and node dots;
- keep the top hero as the opening field;
- group 01/02 as an opening beat;
- enlarge existing event-03 destination photo into a 552×286 middle chapter;
- keep event 04 as a small side-note;
- build 05/06 into a large typographic terminal;
- retain one cyan rule only because it visibly binds the photo chapter to the terminal beat;
- add no new image or container system.

## Expected improvement

A clearer `opening → destination → wedding terminal` eye path, less dashboard/list grammar, stronger photograph-to-typography hierarchy, and continuity with the photo-led left page.

## Regression risk

- chronology could become harder to follow after rail removal;
- 04 copy could become too narrow or cross into photography;
- 03 white copy could fail contrast;
- 05/06 large numerals could collide with dates/titles;
- the retained cyan rule could become meaningless decoration.

## Failure observed during test

The first IR pass pushed event-04 black copy into the event-03 photograph. Thumbnail energy improved, but reading-scale contrast failed. The overlap was rejected. Event 04 was narrowed and kept fully on cream. Structure QA then found two small number/title/date intersections, which were corrected before adoption.

Failure fingerprint: `F-RSL-173-CHRONOLOGY-ENERGY-BY-COPY-ON-PHOTO` — attempting to gain editorial energy by allowing dark utility copy to trespass into a photographic field without a proven contrast zone. Do not repeat cosmetically; use a side-note or explicitly verified text-safe region instead.

## Three-scale evidence

- 500px whole spread: `PASS`; right page no longer reads as a vertical list and the left/right editorial languages align better.
- 1400px reading scale: `PASS` after event-04 repair.
- actual-size right page ~794×1123: `PASS` after final event-06 adjustment.
- final right-page visible native text: `27`.
- final right-page visible IMAGE fills: `2`.
- text intersections: `0`.
- 18px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- IR preferred: `2104:2` at x=`275600`, y=`0`.
- Chronology right: `2104:28`.
- IO rollback: `2095:18`, hidden at x=`279200`.
- top hero hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`.
- event-03 destination hash: `439a719d73f28e8dd2889f2026cccb15f345ec63`.
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.
- detailed QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-IR-STORY-CHRONOLOGY-CLEANROOM-PHOTO-BAND-QA-2026-08-21.md`.

## Status

`ADOPTED / VERIFIED_LOCAL`

Cross-item learning status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

The 01–06 wedding chronology, travel/destination imagery, exact photograph crop, Japanese travel-magazine visual density, magenta/cyan/yellow cues, numeric scale, `入籍/WEDDING` endpoint, copy and route metaphor must not be transferred literally to another item.

## Cross-item applicability

Potentially transferable method only: when ordered information is already redundantly encoded by numbers or labels, independently test whether a visible rail/list scaffold can be removed and hierarchy expressed by unequal content beats. Any surviving separator must demonstrate a binding or physical function at whole-item scale. This is not yet a project rule.
