# RSL-035 — Distribute repeated chronology facts spatially before adding timeline decoration

Date: 2026-08-16
Source scope/item: Rurubu WEDDING / V6 Story + chronology AS
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

AQ had already removed equal event cards, but the chronology still read as one vertical `01–05` list on the left with scene photos stacked on the right. At whole-page scale it remained closer to a process/timeline layout than a travel-feature spread.

## Root-cause hypothesis

Repeated chronological facts do not need to share one continuous visual rail merely because they are chronological. If sequence remains explicit in native numbers/dates, distributing event groups across an asymmetric page can preserve meaning while reducing diagram/list reading.

## Bounded test

On rollback-safe duplicate AS `1392:2`:

- retained every native event date/title/copy;
- retained all six replaceable IMAGE roles and the top feature-photo cluster;
- distributed events 01–05 across three unequal spatial columns instead of one vertical rail;
- kept only a few strong scene-photo anchors between event groups;
- preserved the full-width WEDDING endpoint;
- added no new card, sticker, raster decoration, shadow, gradient or binary asset.

A first pass briefly exceeded one verified image's intrinsic width (`245` display vs `240` source) and was corrected to `238×148` before promotion.

## Expected improvement

Make chronology read as a sequence of editorial travel moments rather than a flow diagram while keeping dates and wording fully editable.

## Regression risk

- sequence becomes ambiguous when event groups are scattered too aggressively;
- whitespace can become accidental rather than rhythmic;
- distributing blocks can create a dashboard-like multi-column grid if scale and spacing become too uniform;
- photo enlargement can exceed intrinsic source quality.

## Evidence

Figma:

- source AQ `1387:2` preserved as hidden rollback;
- adopted AS `1392:2`;
- chronology page `1392:21`;
- Start Here `845:27`: `V5 FU/FX · V6 O + AT/AS INSIDE STUDIES · V7 HOLD`.

Three-scale-oriented review:

- whole spread / ~794 px render: PASS and less rail/list-like than AQ;
- actual chronology `793.7×1122.5`: PASS;
- event sequence remains visually recoverable through native `01–06`, dates and WEDDING endpoint.

Structure:

- Story: native text `12`, IMAGE roles `3`, collision `0`, 18 px safe risk `0`;
- chronology: native text `32`, IMAGE roles `6`, collision `0`, 18 px safe risk `0`.

Drive authority re-read:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- generated Timeline v2 master `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8` remains Drive-verified but not adopted.

GitHub evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AT-AS-QA-2026-08-16.md`.

## Adopted / rejected status

`VERIFIED_LOCAL`: AS adopted as preferred Story/chronology study; AQ preserved as hidden rollback.

## What must remain Rurubu-specific

Do not transfer exact event coordinates, number colors, photo choices, WEDDING endpoint geometry, Yokohama imagery, typography scale, palette or Rurubu/travel-magazine art direction.

## Cross-item applicability hypothesis

For another print artifact with repeated chronological facts, independently test whether explicit native sequence markers allow the information to be distributed spatially rather than forced into a single visual rail. The receiving item must verify sequence comprehension at thumbnail and reading scale and reject the treatment if it becomes an arbitrary dashboard grid.
