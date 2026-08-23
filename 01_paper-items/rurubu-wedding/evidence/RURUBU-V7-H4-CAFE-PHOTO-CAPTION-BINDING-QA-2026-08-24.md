# RURUBU V7 H4 Cafe/Table — Photo/Caption Binding QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Baseline: H3 `2311:2`
Current: H4 `2401:2`
Drive authority: `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`

## Professional research observation

This pass rotated to magazine/DTP information grouping rather than reusing the recent cover, photo-truth or pagination references.

JAGAT DTP Expert material treats photograph + caption placement as an information-structure problem: the caption should read as belonging to the image rather than as unrelated decorative microcopy. Morisawa Japanese typesetting guidance likewise treats page measure, spacing and surrounding whitespace as part of readable composition, not as neutral leftover space.

Rurubu-specific hypothesis: H3's `11:40 / ひと休み` belongs semantically to the dominant cafe photograph. If it floats inside the cobalt title field, the page asks the title system to carry metadata that should be bound to the photograph.

This is an observed professional principle converted into a bounded local test, not a project-wide rule.

## Live baseline readback

H3 `2311:2` before the write:

- visible / parent `2052:2`;
- root `1587.4×1123`, x=`19500`, y=`13000`;
- dominant cafe photo `2311:3`, local `x=0 / y=0 / w=465 / h=565`;
- caption `2311:6`, `11:40 / ひと休み`, local `x=492 / y=290`, visually inside the cobalt title field;
- caption font: `Noto Sans JP Bold / 14px`;
- structural cafe/table photography remained dummy-only.

## Bounded H4 experiment

Rollback-safe H4 was cloned to `2401:2`.

Only the caption relationship was materially changed:

1. `11:40 / ひと休み` moved to local `x=40 / y=578`, immediately below the dominant cafe photo whose bottom is `y=565`.
2. Wording, font size, dominant photo size/crop, secondary photo, fixed display title, sensory copy and right-page food composition were preserved.
3. No card, pill, banner, new background strip, shadow, gradient, generated image, new image hash or whole-page rasterization was introduced.

### Caught failure and correction

The first H4 render exposed a context-dependent failure: the caption inherited the bright yellow fill that was legible on cobalt but became too weak after moving onto cream.

Direct style readback confirmed:

- `Noto Sans JP Bold / 14px`;
- inherited yellow ≈ `rgb(255,184,5)`.

The caption fill was then changed to the existing V7 navy ≈ `rgb(3,23,56)` while preserving the direct photo binding.

This failure is not assigned a new fingerprint. It matches the existing RSL-122 cause class `CONTAINER_SUBTRACTION_INHERITED_TEXT_CONTEXT_FAILURE`: changing the visual context requires fresh contrast/readability validation.

## Three-scale visual QA

- whole-item / `500px`: PASS; caption now reads as photo metadata and the cobalt title field becomes cleaner.
- reading / `1400px`: PASS.
- actual-size / `1587×1123`: PASS for DESIGN QA.

## Structure QA

H4 final:

- visible native text: `11`;
- visible IMAGE-fill nodes: `5`;
- text-text intersections: `0`;
- bounded 18px edge risks: `0`;
- Japanese font mismatch: `0`;
- page-level V7 current-root overlap after promotion: `0`.

Text/image intersection probe showed two existing intentional overlaps. Baseline H3 had the same two role-types, and H4 introduced no new text/image intersection.

## Six-viewpoint professional critique

### A. Art director

PASS. Removing floating metadata from the cobalt title field clarifies the left-page idea: dominant cafe moment → title voice → sensory after-image.

### B. Editorial designer

PASS. Time/cafe metadata now has an explicit visual owner. Reading order is clearer without adding containment.

### C. Book/editorial sequence

PASS. The left page now moves from image evidence to small metadata to sensory notes, then hands off to the right food/table page. The spread gains a more intentional tempo without imitating V8 restraint.

### D. Typographer

PASS after correction. `14px Noto Sans JP Bold` remains native/editable; navy on cream restores contrast after the context move.

### E. Photo editor

PASS for role binding only. The caption is now attached to the correct image role. The source photograph itself is still a STRUCTURAL PHOTO DUMMY and is not approved as final Hawaii photography.

### F. Print designer

DESIGN QA PASS only. No final printer template, bleed/trim/fold authority, effective final-photo resolution, PDF preflight or physical proof exists, so this is not print-ready.

## Promotion / rollback

- H4 `2401:2` promoted to current V7 Cafe/Table comparison at `x=19500 / y=13000`.
- H3 `2311:2` preserved as hidden rollback at `x=300000`, name `ROLLBACK / V7 H3 / CAFE+TABLE / PRE-PHOTO-CAPTION-BINDING / HIDDEN`.
- Current V7 set after promotion: `C8 + K2 + F3 + G4 + H4 + C6B`.
- V6 control unchanged.
- V8 unchanged.

## Learning disposition

- Reinforces existing **RSL-008**: visual furniture/placement should prove a real binding function; photo metadata should visibly belong to the photo when that is its editorial job.
- Reuses **RSL-122** for the temporary yellow-on-cream contrast failure rather than creating a duplicate failure fingerprint.
- No project-wide learning state is promoted by this single additional local reproduction.

## Asset / truth state

- image generation: `0`;
- Drive writes: `0`;
- new Drive masters: `0`;
- new image hashes: `0`;
- final Hawaii photography adopted: `0`;
- factual copy invented: `0`;
- native variable text preserved: YES.

Status: `H4 VERIFIED_LOCAL / DESIGN QA PASS / STRUCTURAL PHOTO DUMMIES / REAL-CONTENT-BLOCKED / NOT_PRINT_READY`.
