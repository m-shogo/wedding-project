# ADD-17 子ども向けミニカード / ぬりえ — Design QA

Updated: 2026-08-14
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Reopened visual-pass start main SHA: `f2d66130863f2b15705243d3b261217b8d2d9b9c`

## Current status

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V5_PRODUCTION_POLISHED / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

This status applies to the age-independent neutral editable template only. Final adoption remains blocked until authoritative child-attendance/count/age and activity-use information exists.

## Current live authority — verified 2026-08-14

### Figma

- file key: `PAvkRggJiRuXVypi3RgZCN`
- production page: `01_PRODUCTION`
- front: `2:2` — `ADD17/A6_FRONT/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- back: `2:5` — `ADD17/A6_BACK/BLEED_111x154mm__PRINT_SCALE_10PX_PER_MM`
- format: A6 trim 105 × 148 mm, 3 mm bleed model
- front live readback: 1110×1540, 6 native text, 0 image-fill nodes, `clipsContent=true`
- back live readback: 1110×1540, 7 native text, 0 image-fill nodes, `clipsContent=true`
- all variable copy remains native editable text
- drawing / contour / writing fields remain native vector
- no child names, ages, count, interests, venue services, QR, or other guest facts were invented

### Google Drive

- folder: `ADD-17_子ども向けミニカード_ぬりえ`
- Drive ID: `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB`
- no raster/image asset is required by current production

## Current production art direction — V5

The historical V4 audit below remains evidence of the first material clean-room redesign, but **V4 is no longer the live production art direction**.

V5 replaced V4 on 2026-08-11 after a fresh screenshot comparison showed that V4's hard rectangular drawing area still read too much like a worksheet. V5 keeps the generous activity space while shifting the visual grammar toward a softer field-journal / observation-page composition:

- Japanese-first editorial hierarchy;
- narrow teal binding rule and restrained rust registration accents;
- asymmetric pale observation field with native contour rings on the front;
- open curved writing baselines on the back rather than repeated rigid rules;
- small optional sketch area remains secondary;
- no generated people/children/animals, fake UI, generic travel motif, gradient, shadow, or raster decoration.

V5 promotion authority:

- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/FIGMA-V5-PROMOTION-2026-08-11.md`
- V4 rollback before V5 promotion: `15:2` / `15:14`
- production root IDs remained stable at `2:2` / `2:5`

## Placeholder hierarchy polish — 2026-08-13

Fresh A6 screenshots showed that the V5 prompt placeholders were visually valid but the literal `LAYOUT DUMMY` suffix still competed too strongly with the field labels. Production was polished rollback-safely without changing semantics:

- front prompt `15:43 / TXT_PROMPT` — `[お題 · LAYOUT DUMMY]`
- back prompt `15:61 / TXT_PROMPT` — `[ひとこと案内 · LAYOUT DUMMY]`
- only the literal `LAYOUT DUMMY` suffix was demoted to a smaller warm-gray auxiliary hierarchy
- rollback nodes: front `21:2`, back `21:19`
- no semantic copy, child facts, geometry, image content, or physical format changed

Evidence: `docs/automation/add-17-children-mini-card-placeholder-hierarchy-2026-08-13.md`

## Fresh screenshot QA — 2026-08-14

Production front/back were re-rendered at their native 1110×1540 canvas size.

Front:

- Japanese title remains dominant;
- pale observation field and contour rings read as one integrated editorial field rather than a UI card;
- activity area remains large and usable;
- `LAYOUT DUMMY` is visually subordinate to `[お題]`;
- no clipping, fake controls, stock travel imagery, or generated-person imagery is visible.

Back:

- curved writing baselines keep a quieter field-journal rhythm;
- optional sketch corner is secondary and does not collide with the nearby label;
- `えでもOK` and `小さな絵も、ここに。` remain readable and separated;
- optional-name field remains native and editable;
- `LAYOUT DUMMY` is visually subordinate to `[ひとこと案内]`.

Result: fresh visual inspection still supports `SELLABLE_VISUAL_QA_PASS` for the neutral template.

## Structural readback — 2026-08-14

Front `2:2`:

- 1110×1540
- 6 native text / 6 visible
- 0 image-fill nodes
- `clipsContent=true`

Back `2:5`:

- 1110×1540
- 7 native text / 7 visible
- 0 image-fill nodes
- `clipsContent=true`

No flattening or raster replacement was introduced.

## Image generation / asset decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported quality problems for ADD-17 were composition and proof-metadata hierarchy, both solved natively. Adding generated decoration would not materially improve the item and would reduce editability. No Drive asset was added or changed.

## Historical reopened visual audit — V4, 2026-08-10

The pre-V4 production was structurally valid but too sparse and worksheet-like to count as sellable visual evidence. A materially different native clean-room comparison was created on `99_QA`:

- section `10:2` — `QA_ADD17_CLEANROOM_VISUAL_V4_2026_08_10`
- front `10:3` — `QA_ADD17_CLEANROOM_V4_FRONT`
- back `10:15` — `QA_ADD17_CLEANROOM_V4_BACK`

V4 introduced Japanese-first editorial hierarchy, a narrow teal binding rule, restrained rust accents, asymmetric drawing/writing composition, native semantic text, and no raster decoration.

### V4 long-copy stress

- section `10:33` — `QA_ADD17_CLEANROOM_V4_LONG_COPY_STRESS_2026_08_10`
- front `10:34` — `QA_ADD17_V4_STRESS_FRONT`
- back `10:46` — `QA_ADD17_V4_STRESS_BACK`

Stress content used explicit `LAYOUT DUMMY` semantics and tested a multi-line activity prompt, longer margin/footer guidance, a multi-line back prompt, and a longer optional-name label. Screenshot QA passed without collisions or clipped text. This remains valid structural/long-copy evidence; it is **not** the current visual-completion proof by itself.

## Deferred / blocked finalization

Final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative information confirms whether children attend and, if so, approximate count/age range and whether this activity is wanted or venue-provided.

Final paper/printer template, production PDF/export profile, physical 100% proof, pen/crayon usability, edge/bleed verification, and real-use handling remain `DEFERRED_FINALIZATION`.

Do not repeatedly redesign this neutral template while those inputs are missing. If later confirmed unnecessary, resolve it as `NOT_REQUIRED`; otherwise replace only confirmed semantic copy/operation fields and perform final physical print proof.
