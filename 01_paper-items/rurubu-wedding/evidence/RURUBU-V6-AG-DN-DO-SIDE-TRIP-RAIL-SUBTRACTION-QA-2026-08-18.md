# Rurubu WEDDING V6 — AG + DN/DO QA

Date: 2026-08-18
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Starting authority

Live Figma before the experiment:

- Outer AG `1676:2` — preferred;
- Profile/Q&A DN `1675:2` — preferred;
- Story/chronology DM `1665:2` — preferred;
- V7 — HOLD.

Drive root re-readback:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Visible problem

DM's chronology page had the right semantic distinction between major photo events and the small `02 / 04` side-trip notes, but the long vertical `SIDE_TRIP_BINDING_RAIL` plus two ticks pulled the left margin back toward a timeline/diagram UI at whole-page and actual-size review.

## Root-cause hypothesis

The rail once helped bind 02 and 04, but after the ordinal/date/title hierarchy had matured, order and grouping were already carried by native text and spatial placement. The long line had become redundant scaffolding rather than a necessary binder.

## Bounded test

Rollback-safe duplicate:

- candidate `1679:2` — initially `QA / V6_INSIDE_DO_SIDE_TRIP_RAIL_SUBTRACTION_2026_08_18`;
- changed only visibility of:
  - `DECOR / SIDE_TRIP_BINDING_RAIL`;
  - `DECOR / SIDE_TRIP_TICK_02`;
  - `DECOR / SIDE_TRIP_TICK_04`;
- retained `寄り道メモ / 02・04`, all native event text, photo roles, image hashes, Story page, WEDDING terminal and page geometry;
- no new image, card, shadow, gradient or generated decoration.

## Expected improvement

Reduce diagram/timeline UI reading while preserving 02/04 as quiet secondary notes and keeping 01/03/05/WEDDING as the dominant photo-led beats.

## Regression risk

Without the rail, 02/04 could appear to be accidental leftover content or the chronology order could become ambiguous.

## Three-scale evidence

- whole spread / 900px render: PASS; cleaner than DM and less diagram-like;
- chronology reading scale: PASS;
- chronology actual-size `1679:28` at `794×1123`: PASS;
- visible native text: `31`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible-node overflow: `0`;
- visible IMAGE roles: hero + event 1/3/5 photos + bounded composed texture; no new image bytes.

At actual size, `02` and `04` remain clearly readable beneath `寄り道メモ / 02・04`, while the page reads more as a photo feature than a process diagram.

## Adoption

- DO `1679:2` promoted to `PREFERRED / V6_INSIDE_DO_SIDE_TRIP_RAIL_SUBTRACTION_2026_08_18`;
- DM `1665:2` renamed to rollback and hidden;
- Start Here `845:27` updated to `V5 FU/FX · V6 AG + DN/DO INSIDE STUDIES · V7 HOLD`;
- Outer AG and Profile/Q&A DN were not modified;
- V7 was not modified.

Status: `VERIFIED_LOCAL / ADOPTED`.

## Asset lifecycle truth

- newly generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- external binary placements: 0;
- image hash changes: 0;
- native text preserved: YES;
- replaceable photo roles preserved: YES;
- rollback preserved: YES.

## What remains Rurubu-specific

Exact chronology geometry, `寄り道メモ` wording, palette, photo choices, page density, Japanese travel-magazine grammar and coordinates.

## Cross-item applicability hypothesis

When a repeated-information rail originally served a binding function but mature hierarchy and spacing now carry the relationship on their own, independently test removal at whole-item, reading and actual-size scales before keeping the scaffold by inertia. This is a QA method, not a rule to remove rails globally.
