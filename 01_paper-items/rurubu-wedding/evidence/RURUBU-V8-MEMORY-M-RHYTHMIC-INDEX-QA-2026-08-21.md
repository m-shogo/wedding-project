# Rurubu WEDDING V8 — Memory M Rhythmic Index QA

Date: 2026-08-21
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
V6 control: frozen `JC + IX + JB + IZ + IT + JA`
V7: preserved 6/6 study set

## Problem observed

Memory K `2181:30` had already removed the semantically weak generated contour image, but its right Guide/Index page still presented `01–04` as four equal rows divided by four rules. At whole-item and reading scale this made the page read like a refined table/wireframe rather than an authored book spread. The left Memory essay was not the defect and was preserved.

## New professional research applied

New research this run focused on Studio Yukiko / Flaneur. Their editorial process emphasizes deriving an idea for each piece from the editorial content rather than relying on one magazine template, while later Flaneur work intentionally tightens rules/grids/type systems so freedom happens inside a coherent publication system. The transferable principle tested here was therefore not a surface style: use fewer structural rules, then let the content role create materially different pacing inside that system.

Research references used in this run:

- It’s Nice That, `Ones to Watch 2018: Studio Yukiko` — editorial-specific ideas rather than default magazine flow.
- It’s Nice That, `Flaneur Issue 05` — simplified grids / three-typeface discipline while retaining freedom within constraints.
- MoMA, Irma Boom `SHV Think Book` — book structure itself can determine how readers move through information rather than treating navigation as a standard index/table convention.

## Root-cause hypothesis

The remaining AI/wireframe signal was not whitespace itself. It was **equal row rhythm + repeated rules + equal typographic weight**. Four memory scenes with different emotional roles had been forced into the same module. Removing the weak raster was only half the repair; the index also needed authored tempo.

## Bounded candidate

Created rollback-safe Memory M candidate `2186:31` by cloning current K only for a bounded local experiment.

Left page: unchanged.

Right page changes only:

- hid the four equal horizontal rules;
- kept all factual/native scene labels `01 朝 / 02 昼 / 03 夕 / 04 夜`;
- reorganized the right page into three tempo zones:
  - `01 朝` as the opening large beat;
  - `02 昼` + `03 夕` as a compact paired middle beat;
  - `04 夜` as the large closing beat;
- changed the reader-facing headline to `4つの寄り道。朝から夜へ、記憶をたどる。`;
- no cards, gradients, badges, decorative English, generated image, or V6/V7 asset was introduced.

Initial candidate had an unacceptable three-line headline break (`たど / る。`). This was rejected and fixed by widening the existing native text box to 620 px; copy and font remained native/editable.

## Promotion

After three-scale and structure QA, Memory M `2186:31` was promoted to the live Current position. Previous Memory K `2181:30` was renamed/moved as hidden rollback and not deleted.

Current root: `2186:31`
Rollback root: `2181:30`

## Three-scale QA

- whole-item / 500 px: PASS — right page no longer reads as four equal utility rows; opening/middle/closing rhythm remains legible.
- reading / 1400 px: PASS — large 朝/夜 anchors and compact 昼/夕 pair are readable without decorative containers.
- actual-size / 1587×1123: PASS.

## Structure QA

Final readback on `2186:31`:

- visible native text: `21`
- IMAGE fill nodes: `0`
- text intersections: `0`
- 18 px safe-area risks: `0`
- vector nodes: `0`
- variable/factual copy remains native text
- no whole-page flattening

## Anti-AI / professional critique

- Art director: stronger single idea — memory is recalled as a changing day, not four equal modules.
- Editorial designer: reading order remains explicit via `01–04`, while scale/rhythm now carries hierarchy.
- Book designer: the right page now adds a distinct tempo to the sequence instead of repeating another list/table spread.
- Typographer: the initial bad Japanese line break was rejected before promotion; final headline is two intentional lines.
- Photo editor: no unrelated image was substituted; current role remains deliberately type-led until a genuinely semantic image can beat it.
- Print designer: no text collision or 18 px safe risk at native spread size.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new Figma image placement: `0`
- V6/V7 image reuse: `0`
- V8 Drive authority folder remains `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

This run does not claim generation → Drive → Figma closure.

## Verdict

`MEMORY_M_PROMOTED / THREE_SCALE_PASS / STRUCTURE_PASS / PROFESSIONAL_AUTHENTICITY_IMPROVED / NOT_GLOBAL_WINNER / NOT_PRINT_READY`

Learning: `RSL-194 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
