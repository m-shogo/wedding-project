# RSL-233 — time + photo rhythm can make numbered timeline modules redundant

Date: 2026-08-23
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Professional observation

Fresh SWITCH Publishing / Coyote research was used in this run rather than reusing recent food/cover references. Coyote frames travel editorial around encounters and stories, and current features explicitly use `PHOTO STORY` structures. The `April` photo book (Kazumi Kurigami / Kaoru Kasai) also demonstrates that a journey archive can be sequenced through images and relational time rather than repeated information modules.

Observation only:

> Travel sequence can be carried by actual time, image order and unequal narrative beats; a separate numbered timeline component is not automatically required.

## Local failure

V7 1DAY C4 `2286:2` already had exact times and actions, but the right page also used four oversized `01 / 02 / 03 / 04` numerals as independent modules.

Visible symptom:

- order was encoded by time, vertical position, photos **and** large sequence numbers;
- the redundant numeric layer made the useful travel-information page read closer to a timeline UI/component than an authored magazine journey;
- facing-page rhythm was weaker because the left `4 PICKS` page legitimately needed big numbers while the right page unnecessarily repeated the same visual grammar.

Failure fingerprint:

`F-RSL-233-NUMBERED-TIMELINE-MODULES-REDUNDANTLY-ENCODE-SEQUENCE-ALREADY-CARRIED-BY-TIME-AND-PHOTO-RHYTHM`

## Corrected experiment

Rollback-safe C6 `2316:2`:

- retains exact `09:00 / 12:30 / 16:00 / 19:00` facts and action copy;
- removes only the four right-page oversized order numerals;
- uses the clock times themselves as navigation anchors;
- preserves an unequal opening / middle / closing cadence;
- enlarges the middle street-photo role so the sequence is photo-led rather than module-led;
- preserves the left-page numbered `4 PICKS` because numbering has a real editorial job there.

## Verification

C6 passed:

- 500 px whole-spread visual QA;
- 1400 px reading QA;
- 1587×1123 actual-size QA;
- native text `20`;
- IMAGE fills `6`;
- text intersections `0`;
- bounded 18 px safe risks `0`;
- accidental explicit one-character lines `0`;
- parent `2052:2`.

## Before / after learning check

Yes, the new professional knowledge changed the design decision. Without the photo-story research, the likely response would have been to restyle the four timeline modules. Instead the experiment asked whether the redundant module layer was needed at all while preserving useful data.

## Boundary

Do **not** generalize this as `remove numbers from timelines`.

Numbering remains appropriate when it genuinely provides navigation, cross-reference, priority or editorial identity. The transferable hypothesis is narrower:

> When exact time/position/photo sequence already carries order, test whether a second large numbered-module layer adds reader value or only UI-like redundancy.

Cross-item promotion requires materially different evidence outside Rurubu under the shared-learning system.
