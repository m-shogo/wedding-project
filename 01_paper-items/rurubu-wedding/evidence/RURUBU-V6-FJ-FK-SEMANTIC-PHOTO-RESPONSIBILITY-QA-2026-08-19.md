# RURUBU V6 — FJ / FK Semantic Photo Responsibility QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
V7: HOLD

## Source problem

The current six-spread V6 set was visually stronger than earlier drafts, but two repeated-photo roles still behaved like generic modules rather than carrying necessary editorial evidence:

1. Cafe/Table FB used a small `04` support photo below an already dominant dining photo.
2. Story/chronology EN used the same dining image for event 05 `入籍`, even though that dining image did not evidence the milestone itself.

The goal was not to reduce photo counts mechanically. The bounded question was whether each photo had enough semantic/editorial responsibility to justify being a visible role.

## Bounded test A — Cafe/Table FJ

Source: FB `1843:2` / Table `1843:29`.
Candidate/adopted: FJ `1866:2` / Table `1866:29`.

Change:

- hide `PHOTO / TABLE_NOTE_SUPPORT_REPLACEABLE`;
- retain the dominant dining hero;
- convert `04` into a native typographic feature using number, kicker, rule, headline and native body copy;
- add no image, raster, generated asset or image hash.

Initial structural QA detected one number/title collision. The candidate was not adopted in that state. The title/copy positions were repaired and QA was rerun.

Final evidence:

- whole-spread screenshot: PASS;
- reading/page screenshot: PASS;
- Table actual-size `794×1123`: PASS;
- visible native text: `22`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- hidden support photo confirmed;
- direct page-level TABLE_NOTE stray nodes: `0`.

Visual result: the lower-right area reads as a second editorial beat rather than another small photo card. Magazine density remains because the dominant food photograph still carries the visual evidence.

## Bounded test B — chronology FK

Source: EN `1773:2` / chronology `1773:28`.
Candidate/adopted: FK `1870:2` / chronology `1870:28`.

Change:

- hide `PHOTO / EVENT_5_REPLACEABLE_EDITORIAL` for `05 / 入籍`;
- preserve native date, event number, title and body copy;
- promote event 05 into a native typographic milestone;
- preserve the existing hero, event 03 photo and final WEDDING terminal;
- add no replacement image, raster, generated asset or image hash.

Initial structural QA detected one event-number/title collision. The candidate was not adopted in that state. The event-05 native auto-height stack was moved and QA was rerun.

Final evidence:

- whole/read context: PASS;
- chronology actual-size `794×1123`: PASS;
- visible native text: `31`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- event-05 photo hidden confirmed.

Visual result: event 05 now reads as a major milestone instead of an unrelated food-photo module. The chronology keeps photo-led rhythm through the hero and event 03 while using typography where photography has no evidentiary authority.

## Cross-spread image-role readback after adoption

Current live preferred roots audited:

- FH Outer `1854:2`
- FG Profile/Q&A `1851:2`
- FK Story/chronology `1870:2`
- EW Memory Spots `1826:18`
- FJ Cafe/Table `1866:2`
- FI 1DAY Plan `1863:18`

Readback:

- visible IMAGE-fill roles: `30`;
- unique image hashes: `8`;
- dining-image repetition: `5` visible roles after FK;
- waterfront repetition: `5`;
- cafe repetition: `5`;
- travel texture repetition: `5`;
- flatlay repetition: `3`;
- street repetition: `3`;
- skyline repetition: `3`.

These numbers are diagnostic only. No image will be removed merely to reduce a repetition count; semantic truth and visual responsibility remain the gate.

## Asset lifecycle / evidence truth

This run:

- newly generated images: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- FJ adopted and visually verified: YES;
- FK adopted and visually verified: YES;
- native variable text preserved: YES;
- remaining replaceable-photo roles preserved: YES;
- rollback roots preserved: YES;
- V7 touched: NO.

Drive authority re-read:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

No Drive write was required because no new asset was created or adopted.

## Adoption / rollback state

Preferred:

- FJ `1866:2` — `PREFERRED / V6_INSIDE_FJ_TABLE_NOTE_TYPOGRAPHIC_FEATURE_2026_08_19`
- FK `1870:2` — `PREFERRED / V6_INSIDE_FK_CHRONOLOGY_EVENT5_TYPOGRAPHIC_MILESTONE_2026_08_19`

Rollback preserved:

- FB `1843:2` — hidden
- EN `1773:2` — hidden

Start Here `845:27`:

`V5 FU/FX · V6 FH + FG/FK + EW MEMORY SPOTS + FJ CAFE & TABLE + FI 1DAY PLAN · V7 HOLD`

## Status

`VERIFIED_LOCAL_DUMMY_DESIGN_STUDY / NOT_PRINT_READY`

This evidence does not close final photography, final copy, page count/imposition, exact printer template, bleed/trim/fold/safe requirements, PDF preflight or physical proof.