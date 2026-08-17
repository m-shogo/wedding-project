# Rurubu WEDDING V6 — AD / DC / DE visual QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Starting live state

- Outer AC `1614:2`
- Profile / Q&A DC `1618:2`
- Story / chronology DB `1615:2`
- V7: HOLD

## Experiment 1 — chronology title panel + photo cascade

### Visible problem

DB chronology was structurally valid but the lower page still read partly as an information UI: a large navy title panel separated the hero photograph from the page, while 02/04 sat in a left rail and 01/03/05 behaved like three rectangular modules.

### Root-cause hypothesis

The page needed less container hierarchy and stronger image-led editorial continuity. A dominant photograph can carry the title directly when contrast permits, and the major milestones can read as an intentional overlapping photo cascade while minor milestones remain quiet native notes.

### Bounded test

Rollback-safe candidate `1624:18` was cloned from DB.

- hid only `DECOR / TIMELINE_TITLE_NAVY_WASH`;
- kept `TRAVEL TIMELINE` and all factual/native chronology copy;
- moved title/deck directly onto the dominant photo in white native type with restrained shadow;
- enlarged/repositioned existing replaceable 01/03/05 image roles into an asymmetric cascade;
- kept 02/04 as quiet secondary notes;
- kept the WEDDING terminal strip;
- created no new image, Drive asset, card, gradient or external raster.

### First intrinsic audit failure

The first candidate enlarged Event 03 to `390×260` while its source is only `352×368`.

Status: `REJECTED_INTERMEDIATE / INTRINSIC_DISPLAY_ROLE_GATE_FAIL`.

The Event 03 role was corrected to `350×260` and its native number/date/title stack was re-aligned. No source/hash changed.

### Final DE QA

Promoted root: `1624:18 / PREFERRED / V6_INSIDE_DE_CHRONOLOGY_PHOTO_CASCADE_2026_08_17`
Timeline page: `1624:43`
Hidden rollback: DB `1615:2`

Three-scale / structure evidence:

- whole spread 1200×849: PASS;
- actual-size chronology 794×1123: PASS;
- visible native text: 31;
- text/text collisions: 0;
- 18px text safe-area risks: 0;
- visible raster roles: 5;
- intrinsic violations after correction: 0.

Intrinsic readback:

- timeline texture: display `230×540`, source `720×860`;
- hero: `801×430`, source `944×608`;
- Event 03: `350×260`, source `352×368`;
- Event 01: `515×260`, source `1356×560`;
- Event 05: `340×185`, source `732×498`.

Result: `VERIFIED_LOCAL / ADOPTED`.

## Experiment 2 — Q02/Q03 direct type on dining photo

A second bounded candidate `1626:18` removed DC's navy binding strip and placed Q02/Q03 as white native type directly on the dining photo.

Whole-spread review showed weak contrast over the bright table area. The candidate was renamed `REJECTED / V6_INSIDE_DF_QA_DIRECT_PHOTO_TEXT_LOW_CONTRAST_2026_08_17` and hidden.

Result: `REJECTED`. DC remains preferred. This is explicit evidence that subtraction is not automatically better when the retained strip performs a real contrast/binding function.

## Experiment 3 — Outer back-cover title field subtraction

Rollback-safe candidate `1626:99` was cloned from AC.

- hid the large `V6_A_BACK_NAVY_FIELD` only;
- kept the verified dominant travel flatlay and all lower photo/timeline roles;
- kept the yellow `TRAVEL LOG` kicker;
- changed native back title/subtitle to white type with restrained shadow and placed them directly on the flatlay;
- no image/hash/geometry changes to the three back-cover raster roles.

Promoted root: `1626:99 / PREFERRED / V6_OUTER_AD_BACK_TITLE_DIRECT_PHOTO_2026_08_17`
Back page: `1626:100`
Hidden rollback: AC `1614:2`

QA:

- whole outer 1200×849: PASS;
- back actual-size 794×1123: PASS;
- visible native text: 23;
- image roles: 3;
- text/text collisions: 0;
- 18px text safe-area risks: 0.

Result: `VERIFIED_LOCAL / ADOPTED`.

## Asset lifecycle truth

- new image generation: 0;
- new Drive save: 0;
- new external binary placement: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- existing replaceable image roles repositioned/resized: YES (DE chronology only);
- native text preserved: YES;
- Q&A DF generated/adopted: NO / REJECTED;
- rollback preserved: YES;
- V7 touched: NO.

## Decision

Current preferred V6 dummy-design set after this run:

`Outer AD + Profile/Q&A DC + Story/Chronology DE / V7 HOLD / NOT_PRINT_READY`.

Final photography, final personal copy, exact printer template, PDF preflight and physical proof remain separate completion gates.
