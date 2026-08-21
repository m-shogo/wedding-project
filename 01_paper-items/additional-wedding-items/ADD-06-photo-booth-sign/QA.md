# ADD-06 フォトブースサイン — QA

Status: `CURRENT / FAMILY_DIVERSITY_PROMOTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / PREVIOUS_FRAME_POP_V6_V3_LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-21
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current Figma authority

- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- stable Current root: `45:2 / CURRENT / ADD-06 / PHOTO STRIP DOORWAY / FAMILY-DIVERSE 2026-08-21`
- family-diversity study page: `46:2 / FAMILY_DIVERSITY / ADD-06 PHOTO BOOTH / 2026-08-21`
- selected independent mature candidate retained: `47:2 / FAMILY-DIVERSE VNEXT / ADD-06 / PHOTO STRIP DOORWAY / SELECTED`
- long-copy proof: `47:19 / QA / FAMILY-DIVERSE ADD-06 / PHOTO STRIP LONG COPY STRESS` — hidden after QA
- immediately previous FRAME POP Current preserved: `47:36 / ROLLBACK / ADD-06 / FRAME POP / PRE-FAMILY-DIVERSITY 2026-08-21` — hidden
- previous selected V6 preserved: `42:2`
- former V3 preserved: `25:3`
- retained V2 comparison: `23:3`
- retained legacy production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- exact Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

Current evidence:

- `FAMILY-DIVERSITY-PHOTO-STRIP-PROMOTION-QA-2026-08-21.md`
- prior professional-vNext evidence retained: `PROFESSIONAL-VNEXT-FRAME-POP-QA-2026-08-21.md`

## Current direction — PHOTO STRIP DOORWAY

Family-scale audit found that the previous FRAME POP, while individually strong, reused a suite-level dominant grammar of deep-navy field plus oversized coral / lagoon / yellow rounded shapes.

A new clean-room pass used only verified A3 size and semantic copy/date/location roles. Three blank-frame directions were authored without copying the current/legacy visual construction:

1. `46:3 / CONTACT SHEET CLUB`
2. `46:19 / PHOTO STRIP DOORWAY`
3. `46:34 / FLASH PAPER POSTER`

`PHOTO STRIP DOORWAY` was selected because the sign now derives its identity from a physical photography artifact rather than the suite's repeated generic large-shape vocabulary.

Current reading hierarchy:

1. large native `写真撮影はこちら`;
2. native `フォトブース` role;
3. native guidance;
4. date `2026.10.24` and unresolved `[会場内設置場所]`;
5. small native emotional footer.

Fixed art is a deep-plum photo-strip stock, three rectangular white photo frames with yellow/coral/lagoon exposure fields, and one small coral tape gesture. No giant orb/capsule/sweep, fake camera UI, lens reticle, viewfinder, generated people, or stock photography is used.

## Three-scale visual QA

Current `45:2` / mature candidate `47:2`:

- whole-item / 500px: PASS;
- reading scale: PASS;
- actual working canvas `990×1400`: PASS;
- post-promotion actual-size screenshot: PASS.

Professional Design Council score: `92/100`; no Executive Creative Director, Japanese Editorial Designer or Print Production Director veto.

## Long-copy / structure QA

Stress proof `47:19` used:

- `撮影スペースの場所をご確認のうえ、順番にゆっくりお進みください`;
- `[会場内のフォトブース設置場所・長い案内名称]`.

Initial screenshot caught a fixed-decoration/copy failure that text-only collision checks missed: a short coral rule crossed the last line of expanded guidance. The nonfunctional rule was removed from selected and stress, then the stress screenshot passed.

Post-correction stress:

- guide bottom `840`;
- location bottom `1242`;
- footer bottom `1308`;
- frame bottom `1400`;
- visible text outside root `0`;
- text-vs-text collisions `0`.

Current structure:

- `990×1400`, `clipsContent=true`;
- visible native text `7`;
- every visible text role `textAutoResize=HEIGHT`;
- IMAGE fills `0`;
- variable information baked into image/SVG `0`.

## Hybrid authoring / asset decision

- variable/factual copy: native editable Figma text;
- fixed visual support: simple native geometry with a real photo-strip/paper role;
- editable SVG: not required;
- generated/composed raster: not required;
- replaceable image role: not required;
- Drive write: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the diagnosed problem was family-scale shape repetition. Generated cameras, people, tropical imagery or stock-like photography would not solve that defect and would weaken wayfinding.

## Deferred finalization

Keep `NOT_PRINT_READY` until:

- final booth wording and exact installation location;
- actual stand/board/mounting method and venue sightline;
- printer template/profile and final bleed/safe area;
- physical print, contrast and venue-lighting proof.

## Next

Family-scale audit `ADD-07 エスコートカード案内ボード`. Rebuild only when its dominant grammar materially repeats another selected item; do not redesign solely for activity.