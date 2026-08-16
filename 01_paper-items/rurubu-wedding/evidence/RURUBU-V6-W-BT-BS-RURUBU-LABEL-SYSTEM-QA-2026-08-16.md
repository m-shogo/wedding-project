# Rurubu WEDDING V6 — W / BT / BS Editorial Label System QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
State: `VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / V7_HOLD / NOT_PRINT_READY`

## Source problem

The previous preferred V6 set — Outer V `1477:2`, Profile/Q&A BR `1482:2`, Story/Chronology BQ `1468:2` — had already removed much of the card/dashboard geometry and passed structure QA, but the system still read too beige, sober and template-like at 500px whole-item scale. The remaining defect was not lack of information or lack of photographs; it was weak thumbnail-scale editorial anchoring.

## Root-cause hypothesis

A Japanese travel-information-magazine reading can be strengthened without returning to card UI if a small number of high-contrast flat color fields are attached to real editorial roles only: section kickers, major event numbers, photo captions and terminal milestones. Repeating full cards or adding generic stickers/shadows would increase decoration without necessarily improving reading hierarchy.

## Bounded experiment

Rollback-safe duplicates were created from the then-live preferred frames:

- Outer W `1491:2` from V `1477:2`;
- Profile/Q&A BT `1488:2` from BR `1482:2`;
- Story/Chronology BS `1486:81` from BQ `1468:2`.

No new image was generated, uploaded or saved. Existing verified Figma image hashes and native text were retained. Added visual devices were deliberately limited to flat magenta/cyan/yellow/navy labels/rules attached to meaningful editorial roles.

### Outer W

Front cover is visually unchanged from V. Back cover changed only the chronology/editorial hierarchy:

- `TRAVEL LOG` becomes a yellow editorial tab on the existing navy field;
- chronology heading gains magenta/cyan binding rules;
- major dates use compact magenta/cyan/yellow flat fields while support dates stay native;
- WEDDING terminal receives a yellow top edge;
- all three back photographs remain existing replaceable IMAGE roles.

### Profile/Q&A BT

Profile:

- magenta profile kicker tab;
- one yellow title rule;
- three short cyan/magenta/yellow row rules attached to the existing two-column native profile data;
- all profile copy remains native/editable;
- all four profile images remain replaceable.

Q&A:

- yellow Q&A kicker tab;
- Q01 and Q04 become the two major numbered beats with compact flat blocks;
- memory hero receives a cyan editorial caption tag;
- lower support photograph receives a magenta closing rule;
- six questions/answers remain native text and the two photographs remain replaceable.

### Story/Chronology BS

Story:

- magenta story kicker;
- existing hero and support photographs are made slightly more dominant without changing image authority;
- cyan/yellow editorial accents bind photograph and travel-note regions;
- native travel-note metadata is enlarged for actual-size readability.

Chronology:

- yellow `TRAVEL TIMELINE` kicker;
- navy title band binds the native chronology title to the existing feature photograph;
- events 01/03/05 use compact magenta/cyan/yellow number fields;
- 02/04 stay support beats with narrow rules instead of containers;
- WEDDING terminal receives a yellow top edge;
- generated timeline decoration remains hidden; no new generated decoration was adopted.

## Failure and correction during the test

The first BS script failed atomically because a Figma query selector contained `/` in an unquoted layer name. No Figma mutation occurred from that failed call. The implementation switched to scoped `findOne` name lookup before continuing.

Pre-promotion structure QA then found real visual/structural regressions:

- BS Story: two text safe-area risks, anchor/anchor collision, and anchor/support-caption collision;
- BT Q&A: Q01 and Q04 number bounding boxes collided with adjacent native question/answer text.

Those states were not promoted. Text widths/positions and corresponding flat fields were corrected, then structure QA was rerun.

## Three-scale evidence

### Whole item / thumbnail

- Outer W: 500px whole spread PASS and materially stronger than V at thumbnail scale.
- Profile/Q&A BT: 500px whole spread PASS and less wireframe/template-like than BR.
- Story/Chronology BS: 500px whole spread PASS; major chronology beats remain readable at thumbnail scale.

### Reading scale

- Outer W: 1200px/reading comparison PASS.
- BT: 1200px spread PASS.
- BS: 1200px spread PASS.

### Actual-size/detail

- Outer W back `1491:3`: 794×1123 PASS.
- BT Profile `1488:3`: 794×1123 PASS.
- BT Q&A `1488:33`: 794×1123 PASS.
- BS Story `1486:82`: 794×1123 PASS.
- BS Timeline `1486:100`: 794×1123 PASS.

## Final structure QA

### Outer W

Back `1491:3`:

- visible native text: `18`;
- visible IMAGE fills: `3`;
- 18px text safe-area risks: `0`;
- absolute text/text collisions: `0`.

Front `1491:34`:

- visible native text: `12`;
- visible IMAGE fills: `5`;
- 18px text safe-area risks: `0`;
- absolute text/text collisions: `0`.

### Profile/Q&A BT

Profile `1488:3`:

- visible native text: `17`;
- visible IMAGE fills: `4`;
- 18px text safe-area risks: `0`;
- absolute text/text collisions: `0`.

Q&A `1488:33`:

- visible native text: `25`;
- visible IMAGE fills: `2`;
- 18px text safe-area risks: `0`;
- absolute text/text collisions: `0`.

### Story/Chronology BS

Story `1486:82`:

- visible native text: `11`;
- visible IMAGE fills: `3`;
- 18px text safe-area risks: `0`;
- absolute text/text collisions: `0`.

Timeline `1486:100`:

- visible native text: `30`;
- visible IMAGE fills: `5`;
- 18px text safe-area risks: `0`;
- absolute text/text collisions: `0`.

## Promotion and rollback state

Promoted preferred:

- Outer W `1491:2 / PREFERRED / V6_OUTER_W_RURUBU_BACK_LABEL_SYSTEM_2026_08_16`;
- Profile/Q&A BT `1488:2 / PREFERRED / V6_INSIDE_BT_RURUBU_LABEL_SYSTEM_2026_08_16`;
- Story/Chronology BS `1486:81 / PREFERRED / V6_INSIDE_BS_RURUBU_EDITORIAL_DENSITY_2026_08_16`.

Hidden rollback:

- Outer V `1477:2`;
- Profile/Q&A BR `1482:2`;
- Story/Chronology BQ `1468:2`.

Start Here `845:27` was updated to:

`V5 FU/FX · V6 W + BT/BS INSIDE STUDIES · V7 HOLD`

Final live readback confirmed W/BT/BS visible and V/BR/BQ hidden.

## Asset lifecycle truth

- newly generated images: `0`;
- new Drive saves: `0`;
- new external binary placement: `0`;
- existing verified Figma image hashes reused: `YES`;
- native editable copy preserved: `YES`;
- replaceable photo roles preserved: `YES`;
- generated section decoration newly adopted: `NO`;
- whole/read/actual-size visual verification: `YES`;
- structure/safe-area verification: `PASS`;
- rollback frames preserved: `YES`;
- V7 touched: `NO`.

Drive V6 root was freshly read back before these writes:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Adoption judgment

W/BT/BS are preferred because the change is visible at whole-item scale: the system now has stronger travel-magazine signposting and event hierarchy without reintroducing evenly repeated cards, shadows, gradients or rasterized copy. The literal palette, label geometry, chronology layout and photo choices remain Rurubu-specific.

This is still dummy-design verification, not completion. Final photography, final personal copy, exact printer/product template, bleed/trim/fold verification, PDF preflight and physical proof remain mandatory before `PRINT_READY`.