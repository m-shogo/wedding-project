# Rurubu WEDDING V7 C6 — 1DAY photo-story time flow QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority / rollback

- V6 control remained untouched: `JC + IX + JB + IZ + IT + JA`.
- Previous V7 1DAY C4: `2286:2` → hidden rollback.
- New V7 1DAY C6: `2316:2` → `CURRENT / VERIFIED_LOCAL`.
- Both roots were re-read with Plugin API-local parent/coordinates immediately before promotion.
- Current parent readback: `2052:2`.

## New professional research used

This run deliberately moved away from the recent Hawaii-food / cover-voice references and examined SWITCH Publishing / Coyote and the book `April`.

Observed professional principles:

1. Coyote defines travel editorial around new encounters and telling stories rather than speed/quantity of information alone.
2. Coyote treats travel as something that can exist in repeated daily life, not only a checklist of destinations.
3. Coyote No.89 explicitly structures a major feature as a `PHOTO STORY`, where images carry narrative time rather than acting as equal decorative modules.
4. `April` (photography: Kazumi Kurigami, art direction: Kaoru Kasai) turns a multi-place journey archive into a book-length sequence; the travel record is carried by relational/emotional chronology as well as location facts.

Rurubu-specific hypothesis tested:

> A useful V7 model-course page can preserve exact times/actions while reducing numbered timeline-component grammar. Let time + photography carry the sequence, with unequal beats, instead of redundantly encoding order through `01/02/03/04` modules.

This is not a rule that numbers are bad. Numbering remains useful on the facing `4 PICKS` page, where it has a different editorial job.

## C4 → C6 change

C4 right page retained all factual content but encoded order with four oversized numbered modules plus time/action labels.

C6 keeps:

- `09:00 / 海から始める`
- `12:30 / 甘いもの休憩`
- `16:00 / 街を歩く`
- `19:00 / 食卓で締める`
- all existing structural photo roles;
- main page title and footer;
- V7 palette and left-page Island Picks system.

C6 changes only the right-page editorial grammar:

- hides `01 / 02 / 03 / 04` timeline numerals;
- lets actual clock time become the navigation anchor;
- uses a large opening `09:00`, compact middle `12:30 / 16:00`, and larger closing `19:00` rhythm;
- enlarges/repositions the middle street photo to act as a real narrative beat rather than a small module;
- changes the kicker to reader-facing `一日の流れ / HAWAII`;
- does not invent or alter travel facts.

## Professional critique

### A. Art director
PASS. V7 keeps high-energy Japanese travel-magazine personality without relying on a generic timeline component.

### B. Editorial designer
PASS. Reading order remains unambiguous through exact times, actions and top-to-bottom photo sequence. Redundant order encoding is reduced.

### C. Book designer
PASS locally. The spread now changes tempo: left is numbered picks, right is a time-led journey. Facing pages have complementary jobs instead of repeating the same module grammar.

### D. Typographer
PASS. Japanese actions remain native text; no accidental one-character explicit lines were detected.

### E. Photo editor
PASS structurally only. Photo sizes now have unequal narrative roles. All current images remain structural dummies and are not legitimate Hawaii photography.

### F. Print designer
DESIGN QA PASS only. Exact printer template / bleed / trim / fold / final image PPI / physical proof remain unresolved and separate.

## Three-scale visual QA

- 500 px whole-spread: PASS — numbered UI residue is visibly reduced and travel sequence remains immediately legible.
- 1400 px reading: PASS — time/action hierarchy and photo rhythm read clearly; no dead module boxes were introduced.
- 1587×1123 actual-size: PASS — no new weak microtype or collision observed.

## Structure QA

Final readback for C6 `2316:2`:

- native visible text: `20`
- IMAGE-fill nodes: `6`
- text intersections: `0`
- bounded 18 px safe risks: `0`
- accidental explicit one-character lines: `0`
- parent page: `2052:2`

## Asset truth

- new image-model generation: `0`
- new Drive masters: `0`
- new production photo placements: `0`
- existing V7 photos in C6: structural dummies only
- V6 image authority changed: NO

## Decision

`C6 2316:2 = ADOPTED AS CURRENT V7 1DAY COMPARISON / VERIFIED_LOCAL DESIGN QA / NOT PREFERRED / NOT PRINT READY`

Failure learning: `RSL-233 / F-RSL-233-NUMBERED-TIMELINE-MODULES-REDUNDANTLY-ENCODE-SEQUENCE-ALREADY-CARRIED-BY-TIME-AND-PHOTO-RHYTHM`.
