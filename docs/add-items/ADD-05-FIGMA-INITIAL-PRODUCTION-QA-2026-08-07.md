# ADD-05 Figma Initial Production QA — 2026-08-07

Authority: GitHub `main`
Start main SHA: `9867632b60fca7fe5326ab81bebaabe8addd03f5`
Write-preflight main SHA: `4a02df9e1878ead1823ea9fdbf05737615ee67e0`

## Scope

ADD-05 サンキュータグ / プチギフトタグ。RURUBU / るるぶ領域は read/write していない。

## Live authority cross-check

- GitHub SPEC: 50 × 80 mm portrait master, 45 × 70 mm comparison, fixed copy `Thank you for traveling with us.`, `Have a safe trip home.`, `2026.10.24`.
- Drive production folder live readback: `ADD-05_サンキュータグ_プチギフトタグ`, folder ID `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV`.
- Drive production raster remains intentionally unchanged; no raster need was demonstrated.

## Figma production authority

- File: `Wedding Paper ADD 05`
- File key: `kAdkOMuAMcFQtTSP8NtWil`
- Page: `ADD-05_THANK_YOU_GIFT_TAGS`
- Production nodes:
  - `FRAME_TAG_FRONT_50X80` — `1:2`
  - `FRAME_TAG_BACK_50X80_OPTIONAL` — `1:12`
  - `FRAME_TAG_FRONT_45X70_COMPARE` — `1:19`
  - `QA_ACTUAL_SIZE_ROLLBACK_PROOF` — `1:29`

## Actual design change

Created a quiet luggage-note / last-stop treatment rather than a miniature boarding pass. The 50 × 80 front uses a physical punch hole at the upper-left axis, restrained vertical silver-like rule, asymmetric gratitude block, single journey line, one mint endpoint, and a calm lower field. All copy remains native editable text. The optional back uses the approved safe-trip sentence without introducing names, venue, gift, QR, social handle, gate/seat/barcode data, or fabricated facts.

The 45 × 70 comparison is a separate editable frame rather than an imposed sheet. Production and QA proof remain separate.

## Screenshot QA

Whole-front screenshot captured at 500 × 800 natural canvas resolution after the write. Visual readback confirmed:

- punch hole does not collide with gratitude copy;
- primary hierarchy reads `Thank you` → secondary line → route/date;
- route is subordinate to typography;
- no dense icon row, badge collage, gradient, shadow, flag, fake barcode, or passport-stamp treatment;
- negative space remains intentionally generous.

## Structure QA readback

`FRAME_TAG_FRONT_50X80`:

- size `500 × 800` (10 px/mm working scale for 50 × 80 mm);
- 3 native text nodes;
- hidden `GUIDE_SAFE` and `GUIDE_PUNCH_CLEARANCE` retained;
- visible overflow: 0.

`FRAME_TAG_BACK_50X80_OPTIONAL`:

- size `500 × 800`;
- 2 native text nodes;
- hidden safe / punch-clearance guides retained;
- visible overflow: 0.

`FRAME_TAG_FRONT_45X70_COMPARE`:

- size `450 × 700`;
- 3 native text nodes;
- hidden safe / punch-clearance guides retained;
- visible overflow: 0.

Rollback proof `1:29` preserves the 50 × 80 front structure separately.

## Figma file hygiene

The following additional blank Draft files were created during file-creation retries and are explicitly **NON_AUTHORITY_EMPTY_DRAFT**. They must not be used as Current or production sources:

- `OrgdEOHMxNnpE3wDeRjtDG`
- `dWSSu5RhqhyOFX3lz0csyP`
- `jh7twwNgYMfOdTud8PrWKm`
- `imGUxVu3ZEMNAy10RTrmnr`
- `WD3Dd97RQwXND4hTRrAD4m`

Only `kAdkOMuAMcFQtTSP8NtWil` is ADD-05 production authority. Cleanup/trash of the empty Draft files is `DEFERRED_FINALIZATION` because the available Figma connector does not expose file deletion/trash.

## Drive changes

None. The Drive register intentionally has no production raster at this stage; native Figma vectors/text remain authoritative.

## Status

`FIGMA_INITIAL_PRODUCTION_CREATED / WHOLE_ITEM_SCREENSHOT_QA_PASS / STRUCTURE_QA_PASS / NATIVE_EDITABLE_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

The design can continue without waiting for physical production inputs. `DESIGN_QA_PASS_WITH_PLACEHOLDERS` is not declared yet because actual-size attachment behavior and 45 × 70 editorial reflow should receive one final evidence-driven QA pass before retirement.

## DEFERRED_FINALIZATION

- final stock thickness;
- actual punch diameter/offset and punching tolerance;
- string/ribbon/twist-tie width and attachment method;
- rotation/hiding behavior on the real petit gift;
- final printer bleed/template/profile;
- 100% physical print proof;
- optional back adoption decision based on the real attachment method;
- cleanup/trash of the explicitly listed non-authority blank Figma Drafts.
