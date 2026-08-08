# ADD-13 Message Card — Design QA

Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Authority verified 2026-08-09

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Start / pre-write main: `aa3b5ad2a2a21d04d72acf0cacf4fff1a71bfa87`
- Drive folder: `ADD-13_Message_Card` (`1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`), live folder currently empty.
- Production Figma: `8ad7bEPAc8I88gs1JxsWhe`
- Production nodes: front `1:3`, back `1:13`
- Rollback proofs: `99_QA` nodes `1:22`, `1:32`
- Long-copy QA: `99_QA` nodes `1:41`, `1:51`

## Design decision

Created a native-editable A6 front/back message-card system because no live production Figma or Drive asset existed. The direction is print/editorial rather than web-card UI: warm paper field, one restrained teal edge, Japanese serif hierarchy, thin rule, large writing space, and minimal secondary English. No rounded UI panels, badges, planes, stamps, gradients, shadows, fake transport data, QR, or raster imagery were introduced.

All unknown copy remains explicit semantic native-text placeholders. No real-looking guest/family names or invented event operations were added.

## QA evidence

- whole-item screenshots captured for front and back at natural 700x990 canvas;
- reading/detail screenshot captured for the long-copy front proof;
- production front/back are 700x990, clipsContent=true;
- 11 native production text nodes; image fills: 0; no flatten/raster replacement;
- QA-only long-copy duplicates use extended Japanese intro/body/signature copy and extended back instruction copy; structural audit reports no frame-bound overflow;
- production remained unchanged while stress copies were isolated under `99_QA`;
- rollback copies exist before any future material refinement.

## Deferred finalization

`DEFERRED_FINALIZATION`: final recipient/use-case policy, final message copy, final signer naming convention, final paper stock, printer template/profile, exact mm/bleed/export settings, and 100% physical proof.

The item is design-complete with placeholders but remains `NOT_PRINT_READY` until those physical/vendor/final-copy checks are completed.

## Next target

Proceed to ADD-14 二次会案内. Do not spend recurring runs on decorative micro-edits to ADD-13 unless new live evidence exposes a material defect.
