# Rurubu WEDDING V8 — Memory/Guide K QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Previous Memory/Guide F `2164:25` used generated `CONTOUR_ATLAS` image `2164:29` (Drive `1hmk0-lnk_c7KmurWPAsUMUFB5NpKT1GC`, hash `697d4482da8936670e772bf4668d4de0ccb436f5`) plus a small solid block. The orbit/atlas metaphor had nominal semantic ownership, but the visible result still read as image-shaped abstraction rather than a specific memory or destination. It weakened the otherwise increasingly defensible V8 editorial system.

## New professional research applied

- Monocle's editor-in-chief describes issue-making as repeated choices about photography selects, headline rewriting, and the pace/rhythm of the whole magazine, followed by a final page-sequence `flip` before press. The transferable decision is to judge an image by what it contributes to the publication sequence, not merely whether it can be explained conceptually.
- Veronica Ditting describes building books through image editing, rhythm/tension, text relationships, tactile choices, and deliberately breaking a self-imposed system when the exception improves the book. The transferable decision is that a strict book system should permit a different page grammar when the content role needs it.

These are research observations, not permanent project rules.

## Bounded test

Created rollback-safe candidate `2181:30 / V8 CLEANROOM K / BOOK EDITION / MEMORY+GUIDE / MEMORY ESSAY + INDEX` from the current Memory/Guide only. V6 and V7 were not reused or mutated.

Changes:

- hid generated `CONTOUR_ATLAS` image and the unrelated small solid image-like block;
- retained the left-page role as a memory essay rather than making it another profile/cafe type-only composition;
- rewrote only existing dummy/editorial copy into a short sensory memory sequence, without inventing factual names/dates;
- added a compact `4 SCENES` native-text score to connect morning/day/evening/night memory beats;
- retained the right page as a four-part guide/index, with increased vertical breathing room;
- preserved native editable text and the spine/folio system.

## Failure and method switch

First write attempt failed before candidate creation because existing text used `Noto Sans JP Bold` and the plugin tried to change `characters` without loading that exact font.

Fingerprint: `F-RSL-192-FIGMA-TEXT-WRITE-WITHOUT-LOADING-EXISTING-FONT-STYLE`.

Corrected method: scan all text nodes in the source root, deduplicate their `fontName` values, `await figma.loadFontAsync(...)` for every used family/style, then perform text mutations. The corrected attempt succeeded immediately. Future Figma text writes should consult this fingerprint rather than retrying the same unloaded-font mutation.

## Three-scale QA

Candidate/current K `2181:30`:

- whole-item / 500px: PASS;
- reading / 1400px: PASS;
- actual-size / 1587×1123: PASS;
- visible native text: `21`;
- visible IMAGE fills: `0`;
- text intersections: `0`;
- 18px text safe-area risks: `0`;
- whole-page flattening: `0`.

The prior F `2164:25` is preserved as hidden rollback and renamed accordingly.

## Decision

K `2181:30` is promoted as current Memory/Guide. This does **not** mean `no images` is the V8 rule. It means an abstract generated visual should not survive merely because a semantic explanation can be written for it. A future role-specific destination/memory photograph or genuinely informative visual may beat K and should be compared independently.

Learning status: `RSL-192 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Design fingerprint: `F-RSL-192-ABSTRACT-IMAGE-WITH-NOMINAL-SEMANTIC-OWNER-BUT-WEAK-EDITORIAL-PAYOFF`.

Transferable hypothesis: when a generated/composed visual has a named concept but still contributes less specific meaning, atmosphere, evidence, or navigation than native editorial structure, compare a rollback-safe non-image treatment before preserving the asset merely because it is technically legitimate.

Do not transfer: V8's exact typography, copy, spacing, four-scene structure, colors, or Rurubu Memory/Guide composition.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- prior Drive master remains historical rollback provenance only

## Completion state

`DESIGN_QA_PASS / VERIFIED_LOCAL / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
