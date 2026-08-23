# RURUBU V7 C6D — Reverse Microcopy Print-Robustness QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Trigger

A live audit of all current V7/V8 comparison roots found one unusually small reverse-text role in V7 C6C:

- root `2409:2`
- node `2409:7 / TEXT / V7_INSIDE_DECK`
- copy `見るだけじゃなく、\n食べて、歩いて、話す旅。`
- `Noto Sans JP Regular / 12.5 px / line-height 21 px`
- white text on a saturated cobalt field.

The issue was not a screen collision or Japanese line-break defect. It was a prepress-risk hypothesis: reverse/knockout microcopy over a multi-ink/process-color field may be less forgiving of press/paper registration than screen rendering suggests.

## New professional research

This run deliberately rotated to print production rather than repeating recent photo/content/grid research.

Primary/high-quality references consulted:

- Adobe InDesign current trapping guidance: trapping compensates for press misregistration by creating controlled overlaps; service-provider/press conditions matter.
- Adobe InDesign current overprint guidance: 100% process black normally overprints by default to reduce registration gaps for small black text over colored areas, while non-black/reverse knockout behavior differs.
- Adobe output/separation guidance: overprint/separation behavior must be previewed and final output settings coordinated with the print provider.

Project interpretation: do not create a universal minimum text size from this research. Instead, identify locally fragile reverse-text roles, improve them without breaking hierarchy, and leave final press approval blocked until printer/template/separation/physical-proof authority exists.

## Bounded experiment

Source:
- C6C `2409:2`

Candidate/current:
- C6D `2413:2`

Changed role:
- C6D deck `2413:7`

Single bounded change:
- font size `12.5 px → 14 px`.

Preserved exactly:
- copy;
- Noto Sans JP Regular;
- line-height `21 px`;
- text box `248 × 42`;
- x/y position;
- white reverse color;
- cobalt field;
- photos/crops;
- daypart truth gate;
- route-map spatial-truth gate;
- all factual/reader-facing copy;
- page dimensions and overall composition.

No new card, pill, badge, shadow, gradient, decorative English, asset, Drive write, image hash or photo change was introduced.

## Three-scale visual QA

### 500 px whole-item

PASS.

The reverse deck is more reliably legible but remains clearly subordinate to `ふたりで叶える、4つのごほうび。`. The V7 high-energy hierarchy and photo rhythm do not change.

### 1400 px reading scale

PASS.

Compared with C6C at the same scale, C6D improves the small reverse deck's clarity without increasing its semantic weight or changing line breaks.

### 1587×1123 actual-size design screenshot

PASS for DESIGN QA.

This is not physical press proof.

## Structure QA

C6D:
- visible native text `20`;
- visible IMAGE fills `6`;
- text-text intersections `0`;
- bounded 18 px edge risks `0`;
- Japanese font mismatch `0`;
- deck `2413:7` = `Noto Sans JP Regular / 14 px / line-height 21 px`;
- page parent `2052:2`;
- current V7+V8 pairwise root overlap `0`.

C6C rollback:
- root `2409:2`;
- `visible=false`;
- `x=300000`;
- name `ROLLBACK / V7 C6C / ISLAND PICKS+1DAY / PRE-REVERSE-MICROCOPY-ROBUSTNESS / HIDDEN`.

## Six-view professional critique

A. Art director — PASS. Publication personality and V7 energy are unchanged.

B. Editorial designer — PASS. Supporting text becomes easier to pick up without competing with the dominant promise.

C. Book/publication designer — PASS. Page tempo and spread sequence are unchanged.

D. Typographer — PASS for design. Japanese semantic line breaks, font family/style and line-height are unchanged; only local reverse-text size was adjusted.

E. Photo editor — NO CHANGE. Existing photography remains structural dummy where already declared.

F. Print designer — BLOCKED beyond local design improvement. Printer, paper, process, ICC/output intent, trapping/RIP behavior, exact template and physical proof are not yet authoritative.

## Anti-AI / authenticity gate

PASS.

The experiment did not add a UI module, generic decoration, arbitrary badge, fake label, decorative English, random sticker/rotation, or template repetition. It changed only a reader-facing typographic property for a specific production reason.

## Decision

Promote C6D as current V7 1DAY comparison candidate because it is visually stronger and structurally regression-free.

State:
`TESTED_LOCAL / PRINT-PROOF-BLOCKED / NOT_PRINT_READY`

Do **not** treat `14 px` as a global or even Rurubu-wide minimum. Final reverse-text production decisions must be rechecked after exact printer/template/output conditions are known.

## Learning

Candidate fingerprint:
`F-RSL-259-SMALL-REVERSE-MICROCOPY-IS-SCREEN-LEGIBLE-BUT-PREPRESS-FRAGILE-ON-SATURATED-PROCESS-FIELD`

Learning state:
`TESTED_LOCAL / PRINT-PROOF-BLOCKED`

## Asset truth

- image generation `0`;
- Drive write `0`;
- new Drive master `0`;
- new image hash `0`;
- photo/crop change `0`;
- final Hawaii photography `0`;
- V6 mutation `0`;
- V8 mutation `0`.
