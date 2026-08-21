# Rurubu WEDDING V8 — Six-role Editorial Monograph QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Decision: `6_OF_6_STUDY_COMPLETE / PROMISING / NO_GLOBAL_WINNER / NOT_PRINT_READY`

## Design premise

V8 is not a recolor or refinement of V7. It starts from a materially different book-design premise: slower pacing, serif-led reading, folios/indexes, long-form text rhythm, controlled image fields and a muted palette. It deliberately avoids V7's coral/cyan/yellow high-energy grammar and does not reuse V7 image hashes.

New professional evidence used:

- JAGDA 2026 Book & Editorial Design selection: Kazunari Hattori, `here and there Vol. 1 – Vol. 13.5`;
- Pentagram, `Sight and Sound`: visible grids, typography-led identity and contrast in pace/image treatment;
- W3C JLReq / Japanese Script Resources for Japanese layout structure.

## Six-role structural QA

| Role | Root | Native text | IMAGE | Text intersections | 18 px safe risks |
|---|---|---:|---:|---:|---:|
| Outer | `2158:62` | 18 | 1 | 0 | 0 |
| Profile/Q&A | `2158:86` | 23 | 1 | 0 | 0 |
| Story/Chronology | `2159:54` | 26 | 0 | 0 | 0 |
| Memory/Guide | `2159:90` | 21 | 1 | 0 | 0 |
| Cafe/Food | `2159:119` | 18 | 1 | 0 | 0 |
| 1DAY | `2159:144` | 21 | 1 | 0 | 0 |

No V8 role root currently has a visible native-text collision or 18 px text safe-area risk.

## Three-scale visual QA

### 500 px whole-spread family scale

All six roles were visually inspected at 500 px. V8 reads as one publication family without repeating a card template. The six roles have different visual tempos but a coherent muted serif/sans voice.

### Reading scale

Story/Chronology was rechecked at 1400 px. Text rhythm, chronology spine, line breaks and folio system remained legible. Outer/Profile were previously inspected at higher reading scale during creation.

### Actual-size representative pages

- front cover `2158:64`: `794×1123` PASS structurally; abstract ocean-light image reads as an intentional essay field rather than faux photography;
- Q&A `2158:88`: `794×1123` PASS; no card grammar, readable Japanese line lengths and spacing;
- Story `2159:55`: `794×1123` PASS; intentional quiet pacing, but risks losing travel energy;
- Memory `2159:91`: `794×1123` PASS; contour-atlas image is semantically readable but still destination-neutral;
- Cafe `2159:120`: `794×1123` PASS; table-study field is more coherent than V7 field-note, still not final food art;
- 1DAY `2159:145`: `794×1123` PASS; foldout/time-density concept reads, still abstract.

## New V8 generated/composed raster roles

- ocean-light essay `be21a846e961b3a13c24c7476f6a01b12b8d07ff`
- contact-proof essay `10b2245252d959dfeebc8df8fa9502fcba1e848d`
- contour atlas `697d4482da8936670e772bf4668d4de0ccb436f5`
- table essay `3a5d3c11226a9d1e9a25bc8a77adce86fe99be28`
- day foldout `70798387bd485cda028fc58b5dbeadaf1a76ca7b`

These are fixed/generated visual roles only. Names, dates, Q&A copy, schedule times and other variable/factual content remain native editable Figma text.

## Drive evidence

V8 root folder:

`1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo / RURUBU_V8_EDITORIAL_MONOGRAPH_2026-08-21`

Master counterparts:

- ocean-light `1L5bMXy7IhPWGgIH6yDJ9mzOpveFYTZYB`
- contact-proof `1MsisJ-qed1vYjGbMFiylN2DI6Lim_1Ko`
- contour-atlas `1hmk0-lnk_c7KmurWPAsUMUFB5NpKT1GC`
- table-essay `1aqjC7cMXymK7r5MqABiNHjL207OY3XKP`
- day-foldout `1KxMoNigZn6yKVu8e1MP9xt7Z-MaQzn-q`

Exact Figma/Drive byte identity is not asserted.

## Six-view professional critique

### Art director

V8 has the clearest single editorial idea of the new clean-room systems: a keepsake book rather than a decorated travel handout. Stronger professional-authenticity signal than V7.

### Editorial designer

Strong reading order, consistent folios/index logic and deliberate density variation. The system does not depend on equal modules.

### Book designer

Strongest of V6/V7/V8 in sequence/pacing as currently observed. Quiet spreads contribute to the publication as a whole instead of competing for attention.

### Typographer

Serif/sans hierarchy and Japanese line lengths read intentionally at actual size. Real final-copy stress remains pending.

### Photo/illustration editor

Still incomplete. Abstract essay/atlas/table/foldout images are more defensible than V7's faux-photo geometry, but final destination-specific photography/illustration is required before professional finish.

### Print designer

Only structural safe-area/readability is verified. Printer template, bleed/trim/fold, PDF preflight, effective image resolution and physical proof remain unverified.

## First V6 / V7 / V8 live comparison

V6 preferred roots were freshly re-screenshotted at 500 px after V8 completion.

- **V6**: strongest travel desire, photographic atmosphere and Rurubu-like density; weaker than V8 in book pacing and restraint.
- **V7**: useful high-energy hierarchy experiments, but generated image craft is the weakest; no overall win.
- **V8**: strongest current typography, pacing and professional book-design signal; risk is becoming too quiet, destination-neutral and insufficiently Rurubu/travel-guide-like.

Decision: do not promote a global winner yet. The next high-value experiment is to add genuinely strong destination-specific imagery to V8 while preserving its sequence/pacing, then repeat the role-by-role comparison.
