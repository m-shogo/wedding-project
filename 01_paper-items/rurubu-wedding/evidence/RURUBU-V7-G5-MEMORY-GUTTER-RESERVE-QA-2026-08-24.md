# Rurubu V7 G5 — Memory/Guide gutter-reserve QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## State

- source/current-before: G4 `2395:2`
- tested candidate/current-after: G5 `2418:2`
- changed semantic node: `2418:9 / TEXT / V7 MEMORY CAPTION`
- result: `DESIGN QA PASS / TESTED_LOCAL_TEMPLATE-BLOCKED`
- REAL PHOTO: blocked; all visible photography remains structural dummy unless separately verified
- PRINT TEMPLATE/PREFLIGHT: not verified
- PHYSICAL PROOF: not verified

## New professional research observation

This run rotated research to facing-page binding/gutter behavior rather than repeating recent photo sequencing, content-truth, folio, or reverse-type research.

Adobe InDesign's current facing-page margin model distinguishes inside from outside margins and explicitly supports additional inside margin space for binding. Adobe's booklet/imposition guidance likewise treats spacing, bleed and page relationship as dependent on the binding/output setup. Professional printer guidance also warns that material near a crossover can disappear into a gutter depending on binding and page count.

Project interpretation: a screenshot-visible spread center is not sufficient evidence of print-safe inside spacing. Before printer/template authority exists, center-fold proximity should be treated as a production-risk dimension, not as a fixed numeric safe-zone rule.

## Live observation

A read-only audit of the 12 current V7/V8 roots measured visible text/image bounds against each spread center (`x ≈ 793.7`).

G4's Hawaii memory caption was the clearest locally actionable text case:

- node `2395:9`
- copy unchanged: `ハワイ / プロポーズの記憶\nタンタラスもビーチも雨。`
- local x `505`
- width `270`
- right edge `775`
- distance to center `18.7 px`
- `Noto Sans JP Regular / 14 px / 23 px line-height`

This was not declared unsafe. Exact printer binding, creep, trim and template are unknown. The question tested was narrower: can the inside reserve be increased materially without weakening caption ownership or page rhythm?

## Bounded G5 test

Rollback-safe clone G5 `2418:2` changed only the caption x-position:

- x `505 → 465`
- width `270` unchanged
- right edge `775 → 735`
- center distance `18.7 → 58.7 px`
- characters unchanged
- font family/style/size/line-height unchanged
- photo roles, image hashes, crops and scale unchanged
- headlines/body/guide order unchanged
- palette and accent rules unchanged
- no card, box, badge, shadow, gradient, decorative English or new asset added

G4 was preserved as hidden rollback at `x=300000`.

## Three-scale QA

### Whole-item / 500 px
PASS.

The publication personality and high-energy guide rhythm remain unchanged. The moved caption still reads as the semantic caption for the small Hawaii/proposal image, while the spread center gains breathing room.

### Reading / 1400 px
PASS.

The caption remains optically attached to its photo and does not become an isolated microcopy block. No awkward dead space was introduced.

### Actual-size design / 1587×1123
PASS for DESIGN QA.

Copy, line breaks, body hierarchy and image rhythm remain stable.

## Structure QA

Before G4:
- visible native text `20`
- visible IMAGE fills `6`
- same-parent text intersections `0`
- bounded 18px outer-edge risks `0`
- caption center distance `18.7 px`

After G5:
- visible native text `20`
- visible IMAGE fills `6`
- same-parent text intersections `0`
- bounded 18px outer-edge risks `0`
- caption center distance `58.7 px`

Post-promotion page-level readback:
- all 12 V7/V8 current roots visible
- current-root pairwise overlap `0`
- G5 current `2418:2` at `x=10700 / y=13000`
- G4 rollback `2395:2` hidden at `x=300000`

## Professional critique

- **Art director:** no visual gimmick was added; V7 personality is unchanged.
- **Editorial designer:** caption ownership stays clear and reading order is unchanged.
- **Book designer:** the spread keeps the same tempo; the change adds inside reserve rather than new furniture.
- **Typographer:** Japanese copy, line breaks, type size, weight and leading are unchanged.
- **Photo editor:** photo source/crop remain structural dummy; the test does not claim photographic improvement.
- **Print designer:** local inside reserve is improved, but no exact binding-safe claim is valid until printer template, binding, creep and proof are known.

## Learning boundary

Learning candidate: `RSL-260 / F-RSL-260-INSIDE-EDGE-TEXT-RESERVE-IS-UNDER-SPECIFIED-BEFORE-BINDING-AUTHORITY`

State: `TESTED_LOCAL / PRINTER-TEMPLATE-BLOCKED`.

Do **not** transfer `58.7 px`, the current physical-size assumption, or G5's exact coordinates as a rule.

Transferable hypothesis: on a facing-page print study, identify non-crossing text that sits unusually close to the center/fold. If a small rollback-safe move adds meaningful inside reserve without breaking semantic ownership, alignment, hierarchy or rhythm, prefer the more robust local position while withholding press-safe claims until actual printer/binding authority exists.

## Asset truth

- image generation: `0`
- Drive write: `0`
- new Drive master: `0`
- new Figma image hash: `0`
- photo/crop change: `0`
- final place-specific photography adopted: `0`
- native/factual copy change: `0`
- V6 control change: `0`
- V8 production change: `0`
