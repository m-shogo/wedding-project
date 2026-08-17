# ADD-13 メッセージカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V6_SELECTED / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The older portrait production authority previously described in this file is now retained legacy / rollback history only for the reopened clean-room program. The selected current design is clean-room V6 Postal Field.

Canonical current evidence:

- `FIGMA-CLEANROOM-V6-POSTAL-FIELD-QA-2026-08-17.md`
- `FIGMA-CLEANROOM-V6-PLACEHOLDER-STATUS-CLEANUP-2026-08-17.md`
- `FIGMA-CLEANROOM-V6-GUEST-MICROCOPY-CLEANUP-2026-08-17.md`
- `FIGMA-CLEANROOM-V6-INLINE-PROOF-COPY-CLEANUP-2026-08-17.md`

Live authority:

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- selected clean-room page: `27:2 / CLEANROOM / ADD-13 / V6 POSTAL FIELD / 2026-08-17`
- selected front: `27:3`
- selected back: `27:4`
- hidden long-copy front: `27:35`
- hidden long-copy back: `27:51`
- retained legacy production: `1:3 / 1:13` — comparison/history only
- Drive folder: `ADD-13_Message_Card / 1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`

## Current visual direction

V6 uses the SPEC primary A6-landscape direction instead of the old portrait correspondence silhouette.

- front: narrow Japanese editorial copy column + dominant open writing field;
- back: compact theme/prompt header + broad open writing field;
- no rounded UI cards, shadows, gradients, travel icons, fake stamps, product-label English filler or rasterized variable copy;
- unresolved values remain short guest-facing native semantic placeholders;
- fixed decoration is limited to restrained rules/edge accent;
- no image fill is required.

Fresh 2026-08-18 screenshots reconfirmed the selected front/back at whole-item scale. The writing action remains the dominant read and the page does not depend on decorative density to feel complete.

## Structure / handwriting-area QA

### Front `27:3`

- working size: `1400×993`
- IMAGE fills: `0`
- visible text outside root: `0`
- semantic writing area: `900×870`
- writing-area ratio: `56.32%`

### Back `27:4`

- working size: `1400×993`
- IMAGE fills: `0`
- visible text outside root: `0`
- semantic writing area: `1240×650`
- writing-area ratio: `57.98%`

Both faces remain above the SPEC minimum handwriting-area requirement of 55%.

## Long-copy / editability

Hidden stress roots `27:35 / 27:51` remain current long-copy authority. V6 already repaired the failure where root-outside count was zero but long title/prompt text collided internally. Dynamic header roles now use native auto-layout / auto-height behavior and the stress copies pass without clipping or title/prompt collision.

All variable/factual copy remains native editable text. No flattening or raster replacement was introduced.

## Legacy preservation

Legacy production `1:3 / 1:13` remains untouched. It was used only after V6 had been independently built and stress-tested, for retained comparison. Do not use legacy production as the selected-current editing target.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The item role is handwriting-first and current bottlenecks are copy/finalization/physical proof rather than missing imagery. Exact Drive folder metadata was live-read on 2026-08-18 and matched `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`. Drive writes: `0`.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

- final title/theme/prompt copy;
- final signer/name/date policy;
- actual handwriting test with intended pen;
- paper stock;
- printer template/profile and exact bleed/export settings;
- 100% physical proof.

Do not invent final personal copy or signer details.

## Result

- clean-room independence: `PASS`
- sellable visual: `PASS`
- handwriting-area >=55%: `PASS`
- native semantic editability: `PASS`
- long-copy / internal-collision stress: `PASS`
- legacy preservation: `PASS`
- Drive authority: `PASS`
- final content/physical proof: `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`
- print readiness: `NO`
