# RSL-147 — Replace a shared dark Q&A band with native cream interview beats only after preserving contrast and variable-copy growth

Source scope/item: Rurubu WEDDING
Date: 2026-08-20
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

V6 Profile/Q&A GT used a single filled navy band to bind Q02 and Q03. It was legible and structurally safe, but at whole and actual size the shared filled container read like a reusable UI/status component rather than two compact magazine interview beats.

## Root-cause hypothesis

A filled container can remain visually UI-like after the surrounding page has matured into photo-led editorial composition. If the two text groups already have strong native ordinals, headings, readable body copy and an adjacent photographic anchor, the container may no longer be doing enough binding work to justify its visual mass.

## Principle tested

Before adding or preserving a large filled band around repeated text, test whether the same grouping can be expressed with:

1. native typographic hierarchy on the paper field;
2. one minimal functional rule;
3. an adjacent legitimate replaceable photo;
4. native Auto Layout for realistic variable-copy growth.

Do not remove the filled container if its contrast or binding function cannot be replaced.

## Bounded test

Rollback-safe HA `1996:99` duplicated GT `1981:111` and changed only Q02/Q03 plus the existing dining support-photo beat:

- navy 455×112 field → 430×3 rule;
- Q02/Q03 copy moved to cream paper and kept as native text;
- Q02/Q03 question/answer pairs converted to vertical native Auto Layout stacks;
- existing dining support photo kept the same hash and remained replaceable, with a shallower `545×255` crop field to reserve copy-growth space;
- no new image, generated decoration, card, shadow or gradient.

## Expected improvement

Reduce component/UI reading, strengthen print-native interview rhythm, and keep Q02/Q03 editable without making long Japanese answers collide with the adjacent photo.

## Regression risk

- removing a dark field can leave inverse white text unreadable;
- Auto Layout copy can grow into the adjacent photo if physical vertical reserve is not reallocated;
- too much subtraction can make Q02/Q03 visually unrelated to the page;
- reducing the support-photo height can weaken the photographic beat.

## Three-scale evidence

- 500px whole spread: PASS and cleaner than GT;
- 1200px whole spread: PASS;
- actual-size Q&A `1996:146 / 794×1123`: PASS;
- preferred native visible text: 29;
- visible text collisions: 0;
- 18px safe-area risks: 0;
- realistic long-copy proof `1998:49`: both Q02/Q03 stacks grew to 100px with collisions 0 and safe-area risks 0;
- long-copy stack-to-photo minimum clearance: 13px.

## Figma / Drive / GitHub evidence

- preferred: HA `1996:99`;
- Q&A page: `1996:146`;
- hidden rollback: GT `1981:111`;
- hidden long-copy proof: `1998:2` / right `1998:49`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`;
- QA: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HA-Q02-Q03-CREAM-EDITORIAL-BEAT-QA-2026-08-20.md`.

## Failure fingerprints

`BAND_SUBTRACTION_INHERITS_INVERSE_TEXT_COLOR`

Removing the dark field while retaining its white inverse copy made Q02/Q03 too faint on cream. The method was corrected by restoring the existing navy reader text color.

`AUTOHEIGHT_GROWTH_REACHES_ADJACENT_PHOTO`

After Auto Layout was introduced, realistic long copy grew to y-bottom 597 while the photo still began at y 595. The method was corrected by reallocating vertical space: photo y 610, height 255, leaving 13px stress clearance.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Exact cyan/yellow numbering, navy rule, question wording, photo selection/crop, coordinates, font sizes, travel-magazine density, and the decision that Q02/Q03 specifically belong on cream.

## Cross-item applicability hypothesis

On another print artifact with a mature repeated-information section, independently test whether a large shared filled container is still necessary. If native hierarchy plus a legitimate adjacent visual anchor can preserve grouping and contrast, a minimal rule may be enough. Variable-copy sections must be tested with native Auto Layout and realistic long copy before promotion. Reject the method where the original container is still required for contrast, physical grouping, navigation, or brand function.
