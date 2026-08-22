# ADD-06 フォトブースサイン — QA

Status: `CURRENT / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PROMOTED / DEVELOPED_PRINT_CUE_PASS / CORAL_TAPE_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / JAPANESE_SEMANTIC_BREAK_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-23
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- stable Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / DEVELOPED PRINTS / TAPE-SUBTRACTED 2026-08-23`
- family-diversity study page: `46:2 / FAMILY_DIVERSITY / ADD-06 PHOTO BOOTH / 2026-08-21`
- selected independent mature candidate retained: `47:2 / FAMILY-DIVERSE VNEXT / ADD-06 / PHOTO STRIP DOORWAY / SELECTED`
- long-copy proof: `47:19 / QA / FAMILY-DIVERSE ADD-06 / PHOTO STRIP LONG COPY STRESS`
- fixed-art comparison: `50:2 / QA / ADD-06 / PHOTO STRIP / ABSTRACT DEVELOPED PRINTS / 2026-08-23`
- tape-subtraction comparison: `51:2 / VERIFIED / ADD-06 / NO AMBIGUOUS CORAL TAPE / 2026-08-23`
- pre-tape-subtraction rollbacks: `51:33 / 51:64`
- pre-developed-print Current rollback: `50:33`
- pre-developed-print long-copy rollback: `50:49`
- previous FRAME POP rollback: `47:36`
- previous V6: `42:2`
- former V3: `25:3`
- V2 comparison: `23:3`
- legacy: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

Current evidence:

- `FIGMA-CORAL-TAPE-SUBTRACTION-QA-2026-08-23.md`
- `FIGMA-DEVELOPED-PRINT-CUE-POLISH-2026-08-23.md`
- `FAMILY-DIVERSITY-PHOTO-STRIP-PROMOTION-QA-2026-08-21.md`
- prior `PROFESSIONAL-VNEXT-FRAME-POP-QA-2026-08-21.md` remains retained history.

## Current direction — PHOTO STRIP DOORWAY / DEVELOPED PRINTS

The main identity remains a physical photo strip rather than a generic colorful poster.

Reading hierarchy:

1. native `写真撮影はこちら`;
2. native `フォトブース`;
3. native guidance;
4. date `2026.10.24` and unresolved `[会場内設置場所]`;
5. small native emotional footer.

The left strip contains three clipped fixed-art developed-print scenes:

- abstract sunrise / horizon / water;
- abstract flash-paper exposure;
- abstract night-water exposure.

These are non-person, non-documentary decorative prints. They contain no authoritative copy and do not represent the actual couple or guests.

The former top `DECOR / CORAL TAPE` is now hidden. A rollback-safe comparison proved that it did not visibly attach a photo, bind text/image regions, or represent a trim/mounting/physical requirement. Removing it improved whole-item hierarchy while preserving the photo-strip artifact reading. No fake camera UI, lens reticle, viewfinder, barcode, generated people or stock photography is used.

## Three-scale visual QA

Current `45:2`:

- whole-item / thumbnail: PASS — the photo-strip artifact remains immediate and the top field is calmer after tape subtraction;
- reading scale: PASS — left fixed art supports rather than competes with the Japanese hierarchy;
- actual `990×1400`: PASS;
- long-copy proof remains synchronized with the same tape subtraction.

The previous Professional Design Council score remains valid as the semantic composition/hierarchy did not regress; the bounded fixed-art changes improve item specificity and reduce meaningless decoration.

## Long-copy / Japanese typography QA

Stress proof: `47:19`.

Fresh post-promotion screenshot review previously caught existing stress-contract line-break defects:

- mechanical `ご確認の / うえ` split;
- mechanical `お進みく / ださい` split;
- mechanical `設置場 / 所` split.

The first bounded repair was still too narrow and was rejected. Final proof uses:

- guide width `570`, native auto-height;
- semantic grouping `撮影スペースの場所をご確認のうえ、 / 順番にゆっくりお進みください`;
- location grouping `[会場内のフォトブース / 設置場所・長い案内名称]`.

Fresh screenshot: PASS. Type was not reduced merely to force the stress to fit.

## Structure / hybrid QA

Current `45:2`:

- visible native text `7`;
- auto-height `7/7`;
- fixed-height visible text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- `DECOR / CORAL TAPE` hidden.

Stress `47:19`:

- visible native text `7`;
- auto-height `7/7`;
- fixed-height visible text `0`;
- outside visible text `0`;
- IMAGE fills `0`;
- `DECOR / CORAL TAPE` hidden.

Responsibility split:

- variable/factual copy: native editable Figma text;
- developed-print fixed art: clipped native vector/shape composition;
- SVG: `0`;
- generated raster: `0`;
- replaceable image role: `0`;
- Drive writes for this pass: `0`.

The tape decision is a `VERIFIED_LOCAL` application of the existing binding-function QA method: a bar/rule/tape is retained only when whole-item review proves a real binding, physical, or semantic job. It is not a new blanket subtraction rule.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

Do not reopen solely to create activity. Reopen only for a new screenshot-supported visual/physical defect or authoritative final input.