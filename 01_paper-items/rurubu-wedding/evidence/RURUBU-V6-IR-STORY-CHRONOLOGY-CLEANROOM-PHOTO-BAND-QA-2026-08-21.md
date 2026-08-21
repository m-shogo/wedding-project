# Rurubu WEDDING V6 — IR Story / Chronology Clean-room Photo Band QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority order used: live Figma → verified Drive → Rurubu GitHub evidence/status

## Source problem

Common-scale review of the six live preferred V6 spreads found Story / Chronology IO `2095:18` to be the next weakest spread. The left Story page was already strongly photo-led, but the Chronology right page still fell back to a cream-field ordered list around a vertical route rail. At thumbnail scale the right page read more like a timeline UI than a Japanese travel-magazine page, weakening the spread after the strong left page.

## Root-cause hypothesis

The weakness was not missing photography. IO already contained two semantically useful, technically adequate images on the Chronology page. The problem was that the vertical rail and evenly sequenced event treatment made six moments feel like one repeated list. A stronger macro-composition should keep the same facts and image fills while converting the chronology into three unequal editorial beats: beginning, destination-photo chapter, and wedding terminal.

## Bounded clean-room test

Rollback-safe candidate IR `2104:2` was duplicated from IO and rebuilt only on the Chronology right page. The Story left page remained unchanged.

Changes on right page `2104:28`:

- retained the top camera / travel-object hero image but normalized it into a 793.7×390 photographic opening field;
- retained native title/deck over the hero;
- hid the vertical functional route rail and six node dots so the page no longer depended on a list-like spine;
- grouped 01 and 02 as a compact beginning beat on cream;
- promoted existing event-03 destination image hash `439a719d73f28e8dd2889f2026cccb15f345ec63` into a 552×286 structural middle photo band;
- placed 03 title/copy natively over the dark text-safe portion of that photograph;
- moved 04 into a narrow cream side-note beside the destination image rather than another rail row;
- grouped 05 `入籍` and 06 `WEDDING` into a broad typographic terminal beat;
- reused one existing cyan rule as a functional binder between the middle photo beat and the 05/06 terminal, rather than adding a new decorative container;
- kept alternate event photos, texture modules, number blocks and old rail devices hidden and rollback-safe;
- introduced no new raster, generated asset, Drive upload, external binary, or image hash.

## Failed intermediate and correction

The first IR pass allowed event 04 black copy to extend into the event-03 photograph. It looked more energetic at thumbnail scale but failed contrast/readability at reading scale. The method was rejected locally rather than rationalized as intentional overlap.

Correction:

- narrowed event 04 into a 110px cream-side note;
- reflowed its native title/copy after loading the current Noto Sans JP fonts;
- structure QA then exposed two additional small text-box intersections around event numbers 04/06;
- event 04 label/stack and event 06 number were separated and QA was rerun at the final positions.

## Expected improvement

- replace list/dashboard chronology grammar with three intentionally unequal editorial beats;
- make the destination image a true second visual chapter rather than an illustration inside a list;
- preserve chronological order through numbering and copy without requiring a vertical rail;
- give 05/06 enough typographic weight to feel like a real narrative destination;
- retain factual content, native editability, non-destructive image fills and rollback history.

## Regression risks checked

- event 04 side-note becoming too narrow for Japanese copy;
- white 03 copy losing contrast over the image;
- 05/06 numbers colliding with dates/titles after repositioning;
- cyan binder becoming decoration without a real grouping function;
- safe-area pressure after moving large numbers;
- accidental loss of event sequence after removing the rail.

## Three-scale evidence

### Whole item / thumbnail

IR `2104:2` at 500px: PASS. The right page reads as photo-led chapter beats rather than a vertical ordered-list UI, while the left Story page remains intact.

### Reading scale

IR `2104:2` at 1400px: PASS after the event-04 side-note repair. Headline, 01/02 opening beat, 03 destination chapter, 04 side-note, 05 `入籍` and 06 `WEDDING` remain distinguishable and readable.

### Actual-size/detail

Right page `2104:28` at native ~794×1123: PASS after the final event-06 adjustment. Japanese copy remains readable, the 03 image crop remains plausible, and the horizontal binder separates rather than fragments the terminal beat.

## Structure QA

Final effective-visible structure on IR Chronology right page:

- visible native text nodes: `27`;
- visible IMAGE-fill nodes: `2`;
- text intersections: `0`;
- 18px text safe-area risks: `0`;
- whole-page flattening: `NO`;
- native variable text preserved: `YES`;
- replaceable photo fills preserved: `YES`.

Visible Chronology image hashes preserved:

- top travel-object hero `2104:31`: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- event-03 destination photo `2104:33`: `439a719d73f28e8dd2889f2026cccb15f345ec63`.

Story-left existing visible hashes were also preserved, including hero `539c259be8036b481d06b4f76db9a39b407d90e8`, support `644f449c3bf2001a94d4b822d2b55e2614c11042`, cafe support `c1ada11205bc3978bf426b304d683f1c1566cac2`, and existing travel texture `691a6ceed471a5d8efa144052a10564eed177b4f`.

## Promotion / rollback

- IR `2104:2` → `PREFERRED / V6_INSIDE_IR_STORY_CHRONOLOGY_CLEANROOM_PHOTO_BAND_2026_08_21`, visible at x=`275600`, y=`0`.
- IO `2095:18` → `ROLLBACK_HIDDEN / V6_INSIDE_IO_STORY_CHRONOLOGY_TALL_ROUTE_PHOTO_2026_08_21`, hidden at x=`279200`, y=`0`.
- no prior rollback/comparison frame was deleted.

Decision: `IR ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset lifecycle evidence

Drive V6 root was reverified during the run:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This experiment did not require image generation or transport:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`.

## Learning

Locally verified lesson: when a chronology already has adequate event photography but still reads as a repeated rail/list, do not assume the rail is necessary to communicate order. Test whether numbering plus three unequal editorial beats can preserve sequence while a meaningful mid-story photograph becomes the structural chapter. Any retained rule/line must still prove a binding function at whole-item scale.

Cross-item state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What remains Rurubu-specific: the 01–06 story, exact travel imagery, Japanese travel-magazine density, magenta/cyan/yellow palette, numeric scale, 05/06 terminal treatment, crop geometry, wording and route/travel metaphor.

## Completion boundary

IR improves V6 dummy-design quality but does not make V6 print-ready. Final photography/copy, printer template, confirmed bleed/trim/fold/safe-area specification, PDF preflight and physical proof remain separate gates.
