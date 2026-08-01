# WEDDING PASSPORT — Figma Visual Checkpoint 2026-08-01

Status: `LIVE_REBUILT / DESIGN_QA_PASS / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor

## Live inconsistency found

GitHub documentation stated that four production pages and semantic frames had been built. Fresh live inspection found:

- pages `00_README`, `01_OUTSIDE`, `02_INSIDE`, and `99_QA` existed
- all four pages had zero child nodes
- therefore the documented completion state and live Figma state were inconsistent

The file was rebuilt from Current semantic contracts rather than from chat memory.

## Rebuilt live frames

- `FRAME_FRONT_COVER` — node `18:2`
- `FRAME_BACK_COVER` — node `18:46`
- `FRAME_MENU_DRINK` — node `18:90`
- `FRAME_SEATING` — node `18:131`

All ordinary copy remains native editable Figma text.

## Item-specific art direction

The Rurubu visual tone was not reused.

The passport direction uses:
- formal navy and gold cover
- centered official-document hierarchy
- passport-style globe / route emblem
- restrained guilloche-like line work
- document number and machine-readable-style microcopy
- ivory interior paper treatment
- muted immigration-stamp accents
- formal table-grid structure where regularity is authentic to the item

## Screenshot-driven three-area brush-up

The first full screenshots identified three weak areas.

### 1. Front-cover emblem

Initial issue:
- generic concentric-circle composition read as generated geometry rather than a passport identity

Correction:
- old ring pattern hidden
- editable globe meridians and latitude lines added
- travel route and plane cue added
- restrained laurel marks added
- `PASSPORT No. 1024` microcopy added

Result:
- the cover now has a more authentic travel-document identity while remaining editable

### 2. MENU / DRINK lower-page whitespace

Initial issue:
- the upper copy fit correctly but the lower half felt unfinished rather than intentionally quiet

Correction:
- added a restrained `CULINARY ENTRY VISA` panel
- native purpose/status/entries fields
- muted-red approval stamp
- retained negative space around the panel

Result:
- the page now uses the physical-passport metaphor without becoming decorative or magazine-like

### 3. SEATING final row

Initial issue:
- TABLE 10 and TABLE 11 were left-aligned with an empty third slot, reading as missing content

Correction:
- final two tables centered as a deliberate last row
- small `ZONE A–D` operational labels added to each table
- an additional final-row label and dashed line were tested
- screenshot QA showed that the label competed with the preceding row, so both were removed

Result:
- the final row reads intentional without unnecessary explanation

## Current semantic structure

### Outside

Front cover includes:
- `BG_COVER_NAVY`
- `DECOR_COVER_EMBLEM_V2`
- `TXT_WEDDING_PASSPORT`
- `TXT_COVER_DATE`
- `TXT_COVER_LOCATION`
- `TXT_COVER_SUBTITLE`

Back cover includes:
- `TXT_BACK_TITLE`
- `TXT_BACK_ITINERARY`
- `TXT_BACK_THANK_YOU`
- `DECOR_BACK_STAMP`
- machine-readable-style native text

### Inside

MENU / DRINK includes:
- native menu and drink headings
- editable dummy copy containers
- `DIVIDER_MENU_DRINK`
- `MENU_VISA_PANEL`

SEATING includes:
- `GROUP_HEAD_TABLE`
- `GROUP_TABLE_01` through `GROUP_TABLE_11`
- native table labels and guest names
- no rasterized seating chart

## QA result

Screenshots captured for:
- front cover before and after correction
- back cover
- menu/drink before and after correction
- seating before and after correction

Verified:
- all four production frames exist live
- no major text clipping visible
- cover hierarchy is stable
- menu/drink dummy copy fits
- all 11 seating groups fit at proof scale
- final-row alignment is intentional
- normal copy remains editable

## Remaining

1. Place remaining accepted Current Drive assets only where they improve the Current design.
2. Replace dummy venue menu and drink copy.
3. Replace all 11 table guest blocks and final table names.
4. Run longest-name and longest-line stress QA.
5. Verify actual room geometry before final seating placement.
6. Apply exact current printer template and page order.
7. Review navy/gold output and small text at actual size.
8. Export final PDF and complete physical proof review.

## Declaration

The live WEDDING PASSPORT file has been honestly rebuilt from an empty production state and passed the first design screenshot-QA pass.

Current state:

`LIVE_REBUILT / DESIGN_QA_PASS / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
