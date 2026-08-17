# 2026-08-17 — Rurubu V6 AD / DE visual learning

Scope: Rurubu WEDDING only

## Visible problems

- Chronology DB still read partly like an information UI because a large navy title panel divided the hero photograph from the lower chronology and the major events remained rectangular modules.
- Outer AC back cover used another large navy title field over a valid dominant photograph, creating avoidable segmentation.
- Q&A DC still had a navy binding strip for Q02/Q03; this looked like a potential subtraction target but its contrast function was not yet proven redundant.

## Root-cause hypotheses

1. A valid dominant photograph can carry native editorial title copy directly when contrast is sufficient, reducing false section/container reading.
2. A chronology can become more magazine-like when major events are unequal overlapping photo beats and minor events remain quieter notes.
3. Subtraction must be evidence-based: a strip that provides necessary contrast/binding should remain even when other large fields can be removed.

## Bounded tests and results

### Chronology DE — adopted

Rollback-safe DB clone `1624:18`:

- removed only the large navy chronology title panel;
- placed title/deck as native white type directly on the verified hero photo;
- enlarged/repositioned existing replaceable 01/03/05 photos into an asymmetric cascade;
- preserved 02/04 as quiet notes and kept WEDDING as the final terminal beat.

Initial Event 03 enlargement failed the intrinsic role gate (`390×260` display against `352×368` source). It was corrected to `350×260` before adoption.

Final evidence:

- whole spread: PASS;
- chronology actual-size 794×1123: PASS;
- native text: 31;
- text collisions: 0;
- 18px text safe-area risks: 0;
- visible image roles: 5;
- intrinsic violations: 0.

Status: `VERIFIED_LOCAL / ADOPTED`.

### Q&A DF — rejected

A rollback-safe DC clone removed the Q02/Q03 navy strip and placed white native text directly on the dining photo.

The bright table area reduced contrast enough that the direct-photo version was weaker. The candidate was hidden as `REJECTED / V6_INSIDE_DF_QA_DIRECT_PHOTO_TEXT_LOW_CONTRAST_2026_08_17`.

Status: `REJECTED`; DC remains preferred.

### Outer AD — adopted

Rollback-safe AC clone `1626:99`:

- removed the large back-cover navy title field;
- retained the yellow TRAVEL LOG kicker;
- placed native title/subtitle directly on the existing travel-flatlay photo with restrained shadow;
- changed no image hash or back-cover photo geometry.

Final evidence:

- whole outer: PASS;
- back actual-size 794×1123: PASS;
- native text: 23;
- text collisions: 0;
- 18px text safe-area risks: 0.

Status: `VERIFIED_LOCAL / ADOPTED`.

## Asset / production truth

- image generation: 0;
- new generated asset adopted: 0;
- Drive saves: 0;
- external binary placements: 0;
- new raster bytes: 0;
- image hashes changed: 0;
- native copy remains editable;
- replaceable photo roles preserved;
- rollback preserved;
- V7 untouched / HOLD.

## Practical learning

The useful rule is not “remove dark panels.” It is:

- test whether the existing photo can carry native type at actual size;
- remove a field only when contrast, hierarchy and binding still work;
- retain a field when it performs a real contrast/binding role;
- when enlarging photos for editorial hierarchy, rerun the intrinsic-source gate before promotion.

Rurubu-specific colors, photos, overlap angles, milestone geometry and Japanese travel-magazine treatment must not transfer as literal solutions.

## Next application

Continue V6 as one magazine. Target the next region that still reads as a template, but make a bounded comparison first and preserve any field/rule that proves a real contrast, physical or semantic binding function.
