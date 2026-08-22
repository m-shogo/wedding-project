# ADD-05 サンキュータグ — actual-size confirmed-copy legibility QA

Date: 2026-08-22
State: `ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS / CURRENT_REPAIRED / ROLLBACK_SAFE / NOT_PRINT_READY`
Start authority SHA: `75d083400b6c9bccb691af7e4cb75740dce1afdc`

## Live authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- Current 50×80 front: `31:2`
- Current 45×70 front: `31:10`
- Current optional 50×80 back: `31:18`
- exact Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- Drive write: `0`
- generated assets: `0`

## Visible / physical defect

The Current still looked balanced in live Figma screenshots, but a physical-unit audit exposed screen-only microtype in confirmed reader-facing copy.

Both tag canvases use a verified `10 px = 1 mm` working mapping:

- 50×80 front: `500×800 px = 50×80 mm`
- 45×70 front: `450×700 px = 45×70 mm`

Before repair:

- 50×80 body `for traveling with us.`: `20 px = 2.0 mm ≈ 5.67 pt`
- 50×80 date: `22 px = 2.2 mm ≈ 6.24 pt`
- 45×70 body: `18 px = 1.8 mm ≈ 5.10 pt`
- 45×70 date: `20 px = 2.0 mm ≈ 5.67 pt`
- optional back date: `22 px = 2.2 mm ≈ 6.24 pt`

The issue was not a universal minimum-point rule. These are confirmed semantic/factual roles on a tiny physical object that may be viewed under venue lighting and while attached/rotated on a gift. Their prior sizes were unnecessarily fragile despite looking acceptable on screen.

## Rollback-first bounded repair

Complete hidden rollback copies were created before changing Current:

- `34:2 / ROLLBACK / ADD-05 / PRE-ACTUAL-SIZE-MICROTYPE / 50X80 FRONT / 2026-08-22`
- `34:10 / ROLLBACK / ADD-05 / PRE-ACTUAL-SIZE-MICROTYPE / 45X70 FRONT / 2026-08-22`
- `34:18 / ROLLBACK / ADD-05 / PRE-ACTUAL-SIZE-MICROTYPE / 50X80 BACK / 2026-08-22`

Only confirmed body/date type size changed. Headline, ribbon/fold geometry, punch geometry, color fields, positions and copy did not change.

Final Current sizes:

- 50×80 front body `20 → 24 px` = `2.4 mm ≈ 6.80 pt`
- 50×80 front date `22 → 26 px` = `2.6 mm ≈ 7.37 pt`
- 45×70 front body `18 → 22 px` = `2.2 mm ≈ 6.24 pt`
- 45×70 front date `20 → 24 px` = `2.4 mm ≈ 6.80 pt`
- optional back date `22 → 26 px` = `2.6 mm ≈ 7.37 pt`

## Screenshot QA

Fresh native renders after repair:

### 50×80 front `31:2`

PASS. `Thank you.` remains first read; enlarged supporting line no longer feels screen-micro; date is clearer in the deep-ocean field without competing with the headline. Punch/ribbon/fold relationships are unchanged.

### 45×70 front `31:10`

PASS. The independent smaller-format reflow remains intact. Enlarged supporting line/date preserve clear separation from the fold and lower field.

### Optional back `31:18`

PASS. `Have a safe trip home.` remains dominant; enlarged date remains subordinate and readable.

## Structure readback

50×80 front `31:2`:
- native visible text `3`
- fixed-height `0`
- outside-root text `0`
- text-text collision `0`
- IMAGE fills `0`

45×70 front `31:10`:
- native visible text `3`
- fixed-height `0`
- outside-root text `0`
- text-text collision `0`
- IMAGE fills `0`

Optional back `31:18`:
- native visible text `2`
- fixed-height `0`
- outside-root text `0`
- text-text collision `0`
- IMAGE fills `0`

## Decision

`CURRENT_REPAIRED / ACTUAL_SIZE_CONFIRMED_COPY_LEGIBILITY_PASS`.

This independently reproduces the `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE` failure class in a materially different artifact category from ADD-12/13: a tiny gift tag rather than an A6 card. The transferable lesson is physical-unit QA for required/confirmed microcopy, not a universal minimum font size.

Remaining physical/vendor gates stay `NOT_PRINT_READY`: final tag size, real package/attachment method, final punch/tool, paper stock, printer bleed/safe template, duplex registration, venue-light proof and rub/ink proof.
