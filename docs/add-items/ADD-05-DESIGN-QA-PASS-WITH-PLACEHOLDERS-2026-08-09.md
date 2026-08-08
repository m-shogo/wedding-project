# ADD-05 Design QA Pass With Placeholders — 2026-08-09

Authority: GitHub `main`
Start main SHA: `42bbb1c95ce7049bbedf549334e0f44f3386262a`
Write-preflight main SHA: `42bbb1c95ce7049bbedf549334e0f44f3386262a`

## Scope

ADD-05 サンキュータグ / プチギフトタグ only. RURUBU / るるぶ was not searched, read, edited, QA'd, or written.

## Live authority cross-check

- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`.
- Figma production file: `Wedding Paper ADD 05`, file key `kAdkOMuAMcFQtTSP8NtWil`, page `ADD-05_THANK_YOU_GIFT_TAGS`.
- Drive production folder: `ADD-05_サンキュータグ_プチギフトタグ`, folder ID `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`.
- Drive was not changed because the demonstrated defect was typography/composition in native Figma, not a raster/material asset defect.

## Highest-value visible defect

The initial 50 × 80 and 45 × 70 fronts used a large Inter headline, a long vertical string-axis rule, a route-like horizontal line and endpoint dot. At actual-size screenshot scale this still read closer to a reduced web/editorial UI or travel-route motif than a finished premium physical gift tag. The optional back repeated the same long axis and oversized sans-serif line.

## Rollback-safe proof

Before material edits, three complete production duplicates were created on the same non-Rurubu page:

- `2:2` — `QA_PRE_EDITORIAL_REFINE_2026_08_09_FRONT_50X80`
- `2:12` — `QA_PRE_EDITORIAL_REFINE_2026_08_09_BACK_50X80`
- `2:19` — `QA_PRE_EDITORIAL_REFINE_2026_08_09_FRONT_45X70`

The earlier rollback proof `1:29` also remains untouched.

## Figma production changes

### 50 × 80 front `1:2`

- replaced the generic large Inter treatment with `Cormorant Garamond SemiBold` for the primary `Thank you` line;
- reduced the secondary line to a quieter Inter Regular supporting role;
- changed the date to small Inter Medium with controlled tracking;
- removed the long vertical string-axis rule from the visible composition without deleting it (`visible=false`);
- removed the route endpoint dot from the visible composition without deleting it;
- converted the former journey line into a short, restrained 1 px hairline near the date;
- enabled `clipsContent=true` for a stricter print-frame boundary.

### 45 × 70 comparison `1:19`

- independently reflowed the same hierarchy for the smaller physical format rather than scaling the 50 × 80 frame proportionally;
- used 60 px serif primary, 17 px secondary, 14 px tracked date;
- hid the long vertical axis and endpoint dot;
- shortened the hairline and retained hidden safe/punch guides;
- enabled `clipsContent=true`.

### Optional back `1:12`

- changed `Have a safe trip home.` into a deliberate two-line editorial rag (`Have a safe` / `trip home.`) with Cormorant Garamond SemiBold;
- reduced and tracked the date;
- hid the long vertical axis non-destructively;
- enabled `clipsContent=true`.

No new badge, plane, stamp, gradient, shadow, fake barcode, fake gate/seat/route data, or decorative filler was added.

## Screenshot QA

Fresh screenshots were captured after the edit at natural frame resolution:

- `1:2` — 500 × 800;
- `1:19` — 450 × 700;
- `1:12` — 500 × 800.

Visual readback confirms:

- the tag now reads as a restrained physical stationery object rather than a mini travel UI;
- primary / secondary / date hierarchy is clear at actual-size working scale;
- the punch hole remains visually isolated from text;
- 45 × 70 is a genuine editorial reflow, not a scaled copy;
- the optional back has a purposeful two-line rag and sufficient negative space;
- no visible collision or clipping is present.

## Structure QA readback

`FRAME_TAG_FRONT_50X80` `1:2`:

- 500 × 800, `clipsContent=true`;
- native text count 3;
- `GUIDE_SAFE` and `GUIDE_PUNCH_CLEARANCE` retained and hidden;
- image-fill count 0;
- visible overflow 0.

`FRAME_TAG_FRONT_45X70_COMPARE` `1:19`:

- 450 × 700, `clipsContent=true`;
- native text count 3;
- hidden safe and punch-clearance guides retained;
- image-fill count 0;
- visible overflow 0.

`FRAME_TAG_BACK_50X80_OPTIONAL` `1:12`:

- 500 × 800, `clipsContent=true`;
- native text count 2;
- hidden safe and punch-clearance guides retained;
- image-fill count 0;
- visible overflow 0.

All production copy remains native editable text/vector. No flattening or raster replacement was introduced.

## Completion state

`DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NATIVE_EDITABLE_PASS / ACTUAL_SIZE_QA_PASS / 45X70_REFLOW_PASS / NOT_PRINT_READY`

The design should not receive further hourly cosmetic polishing unless new live evidence demonstrates a major defect.

## DEFERRED_FINALIZATION

- final stock thickness;
- actual punch diameter/offset and punching tolerance;
- string/ribbon/twist-tie width and attachment method;
- rotation/hiding behavior on the real petit gift;
- final printer bleed/template/profile;
- 100% physical print proof;
- optional back adoption decision using the real attachment method;
- cleanup/trash of previously documented non-authority blank Figma Draft files.

These do not block progression to ADD-06.
