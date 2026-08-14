# ADD-08 メニュー補助サイン — Deeper Closing Rhythm QA

Date: 2026-08-15
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DEEPER_CLOSING_RHYTHM_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- starting/latest main before write: `442149477cbc6ee39d4a0779da10feaac05ba2ad`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` → `ACTIVE / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- production: `01_PRODUCTION / 1:3 / FRAME_MENU_SUPPORT_A4`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive parent: `0ADXt8irGMFGnUk9PVA`

## Visible problem

Fresh three-scale review found that the current culinary-editorial direction was still sellable, but the main ivory field ended its large closing CTA at `y=1120`, leaving the lower half visually underused. The page risked reading as premium-by-emptiness rather than intentionally paced editorial print.

The right navy marginalia, Japanese hero, allergy/dietary hierarchy, semantic placeholders, footer and color system were not the problem. No image-generation role was justified.

## Rollback-safe clean-room test

A full native comparison was created on `99_QA`:

- `15:2 / QA_ADD08_DEEPER_CLOSING_RHYTHM_2026_08_15`
- only `TXT_STAFF_CTA` moved from `y=1120` to `y=1390`
- no copy, typography, color, right-rail structure, rule, footer or semantic role changed

Whole-item 500 px, reading 1000 px and actual-size 1400×1980 review showed a stronger three-zone vertical rhythm: hero / functional guidance / large closing CTA. The design felt less top-heavy and less dependent on blank lower space.

Before production mutation a full hidden rollback was saved:

- `16:2 / ROLLBACK_ADD08_PRE_DEEPER_CLOSING_RHYTHM_2026_08_15`

The first deeper candidate was promoted briefly for verification, but it was not accepted as final until long-copy stress was rerun.

## Long-copy regression found

A dedicated native stress proof was created:

- `16:26 / QA_ADD08_DEEPER_CLOSING_RHYTHM_LONG_CTA_2026_08_15`

Stress CTA:

`気になることがございましたら、 / どうぞお近くのスタッフへ / お気軽にお声がけください。`

At `y=1390`, the stress text auto-height expanded to `470 px`, producing:

- CTA bottom: `1860`
- footer y: `1810`
- actual collision/overrun at actual-size review

Therefore the visually attractive `y=1390` treatment was **rejected as the final production value**. Previous long-copy evidence was not reused blindly because the spatial edit changed bottom-edge tolerance.

## Corrected production value

The same stress proof was moved to `y=1260` and rerendered.

Result:

- stress CTA height: `470 px`
- stress CTA bottom: `1730`
- footer y: `1810`
- remaining gap: `80 px`
- no footer collision or clipping in the 1400×1980 render

Production `4:54 / TXT_STAFF_CTA` was therefore set to:

- final y: `1260`
- normal-copy height: `188 px`
- normal-copy bottom: `1448`

This retains a deeper closing rhythm than the original `y=1120` while preserving realistic long-copy tolerance.

## Final screenshot QA

Fresh production screenshots after the corrected value:

- whole item / thumbnail: PASS
- reading scale: PASS
- actual-size 1400×1980: PASS

Observed improvement:

- Japanese hero remains the first read;
- staff-help body remains clearly subordinate;
- the large closing CTA occupies the lower field intentionally instead of ending too early;
- footer remains isolated and credible as printed ephemera metadata;
- right marginalia remains unchanged and functional;
- no new decoration, fake UI, generic travel motif or raster art was introduced.

## Final structure readback

Production `1:3`:

- canvas: `1400 × 1980`
- `clipsContent=true`
- native text: `15`
- visible native text: `13`
- IMAGE fills: `0`
- visible text outside production root: `0`
- `4:54 / TXT_STAFF_CTA`: `y=1260`, `height=188`, bottom `1448`
- clean-room comparison `15:2`: hidden after promotion
- rollback `16:2`: hidden
- long-copy stress `16:26`: hidden after verification

No flattening or raster replacement occurred.

## Drive / image decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The visible defect was vertical information rhythm, not missing hero/photography/illustration. Drive writes: `0`.

Exact Drive metadata was re-read live before the Figma write:

- ID: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`
- name: `ADD-08_メニュー補助サイン`
- type: folder
- parent: `0ADXt8irGMFGnUk9PVA`

## Decision

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / DEEPER_CLOSING_RHYTHM_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Physical proof and final operational copy remain deferred.