# ADD-12 新郎新婦クイズカード — Clean-room V3 Back Header-field Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `7bc88e65204f667aac815a777885fdf46ed310b1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected page: `26:2 / SELECTED / CLEANROOM / ADD-12 / V3 EDITORIAL QUADRANTS / 2026-08-16`
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3`
- hidden long-copy back: `27:83`
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

The exact Drive authority was live-read before the Figma mutation. No Drive bytes were changed.

## Visible problem

Fresh whole / reading / native `620×875` review found that the back side still opened with a full-width `620×108` mint field behind `旅の余白に、ひとこと。`.

The rest of the back had already been deliberately simplified into an open stationery surface: the message border, non-semantic folio, and residual mint tab were removed, while the answer method, name, message and handwriting roles remained native and editable. Against that quieter body, the full-width color band read increasingly like a web-section/header block rather than a necessary print-artifact structure.

## Root-cause hypothesis

The mint color was useful as a semantic accent, but the large containment field was doing more visual work than the opening line required. Because no trim, fold, writing, navigation, or physical role depended on the rectangle, the color could move from containment geometry into native typography without reducing comprehension.

This is a bounded application of the existing binding-function / UI-containment QA method; it is not a project-wide rule that header fields should always be removed.

## Bounded comparisons

Three rollback-safe duplicates of selected back `26:4` were created without touching selected production:

1. `43:2 / QA / ADD12 / BACK / THIN_MINT_HEADER / 2026-08-19`
   - reduced the mint field to a `620×14` top rule;
   - moved the native opening line onto cream paper.
2. `43:19 / QA / ADD12 / BACK / VERTICAL_MINT_BINDING / 2026-08-19`
   - changed the field to a `14×875` left rail;
   - retained the same native opening line.
3. `43:36 / QA / ADD12 / BACK / TYPOGRAPHIC_OPENING_ONLY / 2026-08-19`
   - removed the field entirely;
   - retained `旅の余白に、ひとこと。` as native mint text.

The thin rule still behaved like an orphan separator. The vertical rail added a new binding motif that the artifact did not need. The typographic-only option was the strongest because it preserved the mint accent and Japanese editorial voice without inventing another structural device.

## Adopted Figma change

Before adoption, rollback copies were created:

- selected back rollback: `43:53 / ROLLBACK / ADD12 / BACK / PRE_TYPOGRAPHIC_OPENING / 2026-08-19`
- long-copy back rollback: `43:70 / ROLLBACK / ADD12 / BACK STRESS / PRE_TYPOGRAPHIC_OPENING / 2026-08-19`

Adopted on selected `26:4` and stress `27:83`:

- `DECOR / CORNER FIELD`: hidden;
- `TEXT / BACK KICKER / 旅の余白に、ひとこと。`: kept native/editable;
- opening text color changed to mint;
- opening text y adjusted slightly to `36` for optical top spacing.

No answer-method, name, message, handwriting geometry, trim/bleed guide, variable copy, or legacy production was changed.

## Three-scale visual QA

Selected back after adoption:

- whole / thumbnail: PASS — the back no longer begins as a separate web-like color section;
- reading scale: PASS — `旅の余白に、ひとこと。 → 回答とメッセージ → [回答方法] → お名前 → ひとこと` remains immediate;
- actual size / native `620×875`: PASS — mint opening text remains legible and the cream paper reads as one continuous surface.

The full-width field removal does not make the page depend on blankness alone: the navy rule, name line, message hierarchy, and handwriting area still provide functional structure.

## Long-copy / structure QA

Long-copy root `27:83` was temporarily revealed and visually reviewed at native `620×875`, then returned to hidden QA state.

Readback after adoption:

- selected visible native text: `8`;
- stress visible native text: `8`;
- selected IMAGE fills: `0`;
- stress IMAGE fills: `0`;
- outside visible text: `0 / 0`;
- text-to-text collisions: `0 / 0`;
- full-width mint field visible: `false / false`;
- semantic handwriting area remains `536×216`.

Variable and factual content remains native editable text. No flattening or raster replacement was introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was oversized containment, not missing imagery or fixed artwork. Drive writes: `0`.

## Result

`BACK_HEADER_FIELD_SUBTRACTION_PASS / TYPOGRAPHIC_OPENING_ADOPTED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED`

The overall item remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY` pending authoritative quiz content and physical/vendor finalization.
