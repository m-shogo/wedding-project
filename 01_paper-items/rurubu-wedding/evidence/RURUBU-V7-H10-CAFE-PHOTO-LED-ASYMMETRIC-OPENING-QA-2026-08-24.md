# RURUBU V7 H10 Cafe/Table — Photo-led asymmetric opening QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Research observation

New/deeper professional reference rotation for this pass focused on photo-led page construction rather than another microcopy/numbering pass.

- AIGA Eye on Design interview with MACK production manager/designer Morgan Crowcroft-Brown describes photobook design as a sequence of material, format, image and production decisions in service of the photographs; in studio sequencing, images are printed as thumbnails, shuffled, paired and taped into page structures before design is finalized.
- JAGAT DTP guidance states that photo placement materially changes a page's impression/expression and that the intended photograph/composition can itself determine design decisions.

Rurubu-specific hypothesis: V7 Cafe's left opening should not keep a near-even `photo field + cobalt title field` split merely because the dummy layout already exists. If the page role is photo-led travel appetite, let the dominant image visibly outweigh the title field while preserving the fixed title and all editable copy.

## Before

Current H9: `2454:2`

Left opening geometry:

- dominant structural photo `2454:3`: `x=0 / y=0 / w=465 / h=565`
- cobalt title field `2454:4`: `x=465 / y=0 / w=328.7 / h=565`
- fixed Cafe display title `2454:22`: `x=488 / y=110 / w=285 / h=150`

At whole-item scale the roughly `59% photo / 41% title field` split still read partly as two equal modules rather than a strongly photo-led travel-magazine opening.

## Bounded experiment

Rollback-safe H10 candidate: `2467:2`

Changed only the left-page opening role balance:

- dominant photo: `465 → 515 px` wide; height retained `565`
- cobalt field: starts `x=515`, width `278.7`
- small lead/kicker shifted with the field
- fixed Cafe display raster kept independent and editable-source-preserved; placed `x=532 / y=112 / w=250 / h=132`
- all reader-facing copy unchanged
- all photo hashes unchanged
- right Table page unchanged
- no card, pill, badge, gradient, shadow or extra decorative object added

The experiment intentionally preserves the current photo as `STRUCTURAL PHOTO DUMMY / NOT FINAL HAWAII`. It tests composition responsibility only, not real-photo quality.

## Three-scale QA

### Whole-item / 500px

PASS. Compared with H9, the first read is more clearly `photo → title field → lower sensory sequence`; the top no longer behaves like two equally weighted modules. V7 travel-magazine energy is stronger without adding decoration.

### Reading/page / 1400px

PASS. Cafe fixed display title remains legible inside the narrower cobalt field. Dominant image carries more visual weight; lower caption/sensory/transition sequence remains unchanged.

### Actual-size / 1587×1123

PASS for DESIGN QA. Fixed title, Japanese line breaks, caption binding and lower-page rhythm remain stable.

## Structure QA

H10 before promotion:

- parent: `2052:2`
- native visible text: `11`
- visible IMAGE fills: `5`
- text-text intersections: `0`
- 18px edge risks: `0`
- Japanese text assigned to Inter: `0`

No final-photo claim is made.

## Professional critique

- Art director: PASS — clearer photo-led idea, less modular equality.
- Editorial designer: PASS — reading order is stronger without losing Cafe/Table role distinction.
- Book designer: PASS for V7 sequence — creates a stronger high-energy beat while the right page remains its own photo-led food beat.
- Typographer: PASS — fixed title and native copy remain legible; no new awkward Japanese wraps.
- Photo editor: PASS only for role/composition; REAL PHOTO remains BLOCKED.
- Print designer: DESIGN QA PASS; final effective PPI/bleed/crop remain blocked until legitimate photography and printer authority exist.

## Promotion

Promoted current:

- H10 `2467:2`
- position `x=19500 / y=13000`
- current name: `V7 PRO STUDY H10 / CAFE+TABLE / PHOTO-LED ASYMMETRIC OPENING / CURRENT V7 CAFE COMPARISON / VERIFIED_LOCAL_DUMMY_DESIGN / REAL-PHOTO-BLOCKED / UNPAGINATED-STUDY / 2026-08-24`

Rollback:

- H9 `2454:2`
- `visible=false / x=300000`
- name: `ROLLBACK / V7 H9 / CAFE+TABLE / PRE-PHOTO-LED-ASYMMETRIC-OPENING / HIDDEN`

## Learning

No new failure ID is created. This is a materially different reproduction of existing RSL-006 (`Photo-role redistribution can outperform adding assets`).

Newly strengthened project-local interpretation:

> When a print/editorial spread has a role-owned dominant photograph, do not preserve a near-equal photo/decorative-field split by inertia. A rollback-safe redistribution of existing visual mass can create stronger hierarchy before adding or generating new assets. The exact ratio, color field and geometry remain item-specific.

State remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; this pass does not justify a universal ratio or a rule that photography must always dominate.

## Truth boundary

- image generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new Figma image hash: `0`
- final photography adoption: `0`
- V6 changes: `0`
- V8 changes: `0`
- H10 remains `REAL-PHOTO-BLOCKED / NOT PRINT READY`
