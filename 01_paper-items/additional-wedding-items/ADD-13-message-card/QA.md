# ADD-13 メッセージカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V6_SELECTED / BACK_PROMPT_COUNTERPOINT_PASS / ACTUAL_SIZE_SECONDARY_READABILITY_HARDENED / LONG_COPY_STRESS_PASS / HANDWRITING_AREA_55_PERCENT_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-20
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The older portrait production authority previously described in this file is now retained legacy / rollback history only for the reopened clean-room program. The selected current design is clean-room V6 Postal Field.

Canonical current evidence:

- `FIGMA-CLEANROOM-V6-POSTAL-FIELD-QA-2026-08-17.md`
- `FIGMA-CLEANROOM-V6-PLACEHOLDER-STATUS-CLEANUP-2026-08-17.md`
- `FIGMA-CLEANROOM-V6-GUEST-MICROCOPY-CLEANUP-2026-08-17.md`
- `FIGMA-CLEANROOM-V6-INLINE-PROOF-COPY-CLEANUP-2026-08-17.md`
- `CLEANROOM-V6-BACK-PROMPT-COUNTERPOINT-2026-08-18.md`
- `FIGMA-V6-SECONDARY-COPY-READABILITY-QA-2026-08-20.md`

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
- back: large left Japanese theme title + small upper-right native prompt counterpoint + broad open writing field;
- no rounded UI cards, shadows, gradients, travel icons, fake stamps, product-label English filler or rasterized variable copy;
- unresolved values remain short guest-facing native semantic placeholders;
- fixed decoration is limited to restrained rules/edge accent;
- no image fill is required.

Fresh 2026-08-20 screenshots reconfirmed the selected front/back at whole-item and native actual size after secondary-copy readability hardening. The writing action remains the dominant read and the page does not depend on decorative density to feel complete.

## Back prompt counterpoint refinement — 2026-08-18

Fresh actual-size review found `[テーマ]` floating near the upper-center of the selected back. It was structurally valid but visually detached from the large left title and the handwriting field.

Rollback-safe bounded comparisons:

- `40:18 / QA_ADD13_BACK_PROMPT_RIGHT_COUNTERPOINT_V2_2026_08_18` — small upper-right prompt counterpoint;
- `40:34 / QA_ADD13_BACK_PROMPT_UNDER_TITLE_V2_2026_08_18` — prompt beneath left title.

The under-title direction was rejected because the existing realistic long-title stress occupies the same vertical region and would reduce copy resilience. The upper-right counterpoint preserved the full writing field and improved intentional asymmetry.

Before selected mutation, realistic stress candidate `40:50` verified the same upper-right treatment with long prompt copy. The treatment was adopted in selected `27:4` and hidden stress `27:51`. Existing rollback `41:2 / 41:18` remains preserved.

Result: `BACK_PROMPT_COUNTERPOINT_PASS`.

## Actual-size secondary-copy readability — 2026-08-20

Fresh native `1400×993` review applied the already `VERIFIED_CROSS_ITEM` non-Rurubu method that explicitly audits the smallest meaningful reader-facing copy. V6 was visually strong at whole/read scale, but the instruction/name/date roles remained fragile at physical A6 scale.

Rollback-safe selected comparisons:

- `45:2 / QA_ADD13_V6_FRONT_SECONDARY_READABILITY_2026-08-20`;
- `45:20 / QA_ADD13_V6_BACK_SECONDARY_READABILITY_2026-08-20`.

Dedicated long-copy comparisons:

- `46:2 / QA_ADD13_V6_FRONT_STRESS_SECONDARY_READABILITY_2026-08-20`;
- `46:19 / QA_ADD13_V6_BACK_STRESS_SECONDARY_READABILITY_2026-08-20`.

Adopted selected sizes:

### Front `27:3`
- `お名前`: `20→24px`;
- `2026.10.24`: `18→22px`;
- `自由にメッセージをご記入ください`: `18→22px`.

### Back `27:4`
- upper-right `[テーマ]`: `18→22px`;
- `お名前`: `19→23px`;
- `日付`: `17→22px`.

The same semantic-role sizes were applied to hidden long-copy roots. Stale QA-only helper text inherited by stress evidence (`MESSAGE CARD`, `POSTCARD FOR TWO`, and the internal final-copy note) was hidden; stress title/prompt/name length was not reduced.

Pre-change hidden rollbacks:

- `46:34 / ROLLBACK_ADD13_V6_FRONT_BEFORE_SECONDARY_READABILITY_2026-08-20`;
- `46:52 / ROLLBACK_ADD13_V6_BACK_BEFORE_SECONDARY_READABILITY_2026-08-20`;
- `46:68 / ROLLBACK_ADD13_V6_FRONT_STRESS_BEFORE_SECONDARY_READABILITY_2026-08-20`;
- `46:85 / ROLLBACK_ADD13_V6_BACK_STRESS_BEFORE_SECONDARY_READABILITY_2026-08-20`.

Comparison roots are hidden after adoption. Final selected/stress readback remains outside text `0`, collisions `0`, proof-language `0`, IMAGE fills `0`.

Result: `ACTUAL_SIZE_SECONDARY_READABILITY_HARDENED`.

## Structure / handwriting-area QA

### Front `27:3`

- working size: `1400×993`
- visible native text: `5`
- IMAGE fills: `0`
- visible text outside root: `0`
- text-to-text collisions: `0`
- semantic writing area: `900×870`
- writing-area ratio: `56.32%`

### Back `27:4`

- working size: `1400×993`
- visible native text: `4`
- IMAGE fills: `0`
- visible text outside root: `0`
- text-to-text collision: `0`
- semantic writing area: `1240×650`
- writing-area ratio: `57.98%`
- native prompt remains editable and is not baked into decoration.

Both faces remain above the SPEC minimum handwriting-area requirement of 55%.

## Long-copy / editability

Hidden stress roots `27:35 / 27:51` remain current long-copy authority. Dynamic header roles use native auto-layout / auto-height behavior.

Post-readability-hardening stress state:

- front outside `0`, collisions `0`, proof-language `0`, IMAGE `0`, writing ratio `56.32%`;
- back outside `0`, collisions `0`, proof-language `0`, IMAGE `0`, writing ratio `57.98%`;
- enlarged long back prompt grows to its natural height without colliding with the name/date row.

All variable/factual copy remains native editable text. No flattening or raster replacement was introduced.

## Legacy preservation

Legacy production `1:3 / 1:13` remains untouched. It was used only after V6 had been independently built and stress-tested, for retained comparison. Do not use legacy production as the selected-current editing target.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The item role is handwriting-first and the concrete 2026-08-20 bottleneck was actual-size typography rather than missing imagery. Exact Drive folder metadata was live-read on 2026-08-20 and matched `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl`. Drive writes: `0`.

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
- back prompt counterpoint: `PASS`
- actual-size secondary readability: `PASS`
- handwriting-area >=55%: `PASS`
- native semantic editability: `PASS`
- long-copy / internal-collision stress: `PASS`
- legacy preservation: `PASS`
- Drive authority: `PASS`
- generated/image assets required: `0`
- final content/physical proof: `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`
- print readiness: `NO`
