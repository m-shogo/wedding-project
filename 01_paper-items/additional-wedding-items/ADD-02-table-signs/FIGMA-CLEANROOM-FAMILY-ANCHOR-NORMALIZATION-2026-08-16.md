# ADD-02 — Clean-room family anchor normalization

Date: 2026-08-16
State: `VISUAL_REOPENED / CLEANROOM_FAMILY_REVIEW_ADVANCED / SHARED_ANCHOR_NORMALIZED / PRODUCTION_NOT_PROMOTED / NOT_PRINT_READY`

## Authority readback

- latest observed `main` immediately before this evidence write: `fb69e75ac6baec258ecb6e6c0a7db240e60f42d7`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- QA page: `1:4 / 99_QA`
- clean-room family review section: `28:274 / QA_ADD02_FAMILY_AFTER_FOLIO_DETEMPLATE_2026_08_13`
- Drive authority folder live readback: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- Drive writes: `0`

## Why this change was made

The prior ADD-02 evidence explicitly left the sellable visual gate open until a whole-family thumbnail review was completed and shared anchors were selectively normalized without erasing destination-specific visual grammar.

A fresh whole-family screenshot of the eleven clean-room directions showed that the compositions are materially differentiated, but two semantic anchors varied for no destination-specific reason:

1. the small top `TABLE 01` ... `TABLE 11` labels used inconsistent font sizes;
2. the bottom folio alternated between `WEDDING JOURNEY · TABLE SERIES` and destination-specific strings such as `WEDDING JOURNEY / DESTINATION 07`.

Those inconsistencies weakened family recognition without contributing useful art direction.

## Figma mutation

Only the retained clean-room QA family in section `28:274` was changed. Production was not touched.

Across all eleven 1000×1480 candidate frames:

- top table labels were normalized to `24 px`;
- bottom folio copy was normalized to native editable text `WEDDING JOURNEY · TABLE SERIES`;
- bottom folio size was normalized to `16 px`.

Affected native text nodes:

- Hawaii: `28:288`, `28:294`
- Italy: `28:333`, `28:340`
- France: `28:351`, `28:357`
- Spain: `28:374`, `28:381`
- Taiwan: `28:402`, `28:408`
- Japan: `28:420`, `28:426`
- Hong Kong: `28:449`, `28:456`
- Singapore: `28:469`, `28:477`
- Bali: `28:494`, `28:501`
- Korea: `28:515`, `28:523`
- Maldives: `28:538`, `28:545`

Destination-specific title geometry, palette, illustration/vector treatment, Japanese title scale, notes, large table identifiers, and composition were deliberately left unchanged.

## Visual QA

Fresh whole-family screenshot after the mutation: PASS for family coherence.

Observed result:

- the eleven cards still read as different destination-specific pieces rather than equal template colorways;
- shared `TABLE xx` and folio anchors now behave as a quiet series system;
- the dominant destination titles and distinct visual fields remain the first-read elements;
- no new badge, icon, raster texture, fake travel data, Web-UI card, gradient, or shadow was introduced.

A fresh production-page thumbnail was also inspected only after the clean-room family review. The retained production remains untouched. The clean-room family is materially stronger as a coherent editorial series, but this run does not bulk-promote production because a family-level thumbnail comparison alone is insufficient evidence for final replacement of all eleven live production roots.

## Structure / hybrid-authoring QA

- 11 clean-room frames remain `1000 × 1480`.
- changed copy remains native editable Figma text.
- no generated/raster asset was introduced.
- no variable guest, menu, venue, QR, or other factual information was baked into artwork.
- destination-specific geometry was not flattened or homogenized.

`IMAGE_GENERATION_NOT_REQUIRED` for this bounded defect: the problem was series-anchor inconsistency, not missing imagery.

## Decision

`CLEANROOM_FAMILY_REVIEW_ADVANCED / SHARED_ANCHOR_NORMALIZATION_PASS / PRODUCTION_NOT_PROMOTED`

Next safe ADD-02 step is selective final comparison/promotion evidence for the eleven clean-room winners against their retained production counterparts at readable and actual-size scales. Do not redesign the family merely to create activity, and do not overwrite legacy production without that final per-sign evidence.
