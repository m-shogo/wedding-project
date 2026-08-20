# ADD-08 Allergy / Dietary V2 — Japanese-first category label QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE`
Start/live authority SHA immediately before Figma write: `8caf2b2cb1b691ba9b649ada4c23ec63746addbc`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Allergy / Dietary V2: `18:19 / CLEANROOM_ADD08_V2_STRONG_A4_ALLERGY_DIETARY`
- long-copy proof: `18:64 / QA_CLEANROOM_ADD08_V2_A4_ALLERGY_DIETARY_LONG_COPY_STRESS_2026_08_15`
- exact Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- Drive metadata was live-read immediately before the Figma write; Drive writes: `0`.

## Visible problem

The selected V2 already had a strong Japanese headline and two clear Japanese information columns. The navy top field remained useful because an earlier bounded test proved that removing the category line entirely weakened the page-level binding. However, the field still read `ALLERGY / DIETARY INFORMATION` while all operational content below was Japanese-first.

At whole and reading scales this isolated English label behaved more like template decoration than necessary reader information. The defect was not the navy field itself; it was the language hierarchy inside that proven binding field.

## Bounded comparison

Production was not edited during evaluation.

- `48:2 / QA_ADD08_ALLERGY_V2_JAPANESE_CATEGORY_LABEL_2026_08_20`
- only `TXT_MENU_CATEGORY` changed from `ALLERGY / DIETARY INFORMATION` to `アレルギー・食事制限のご案内`;
- font remained native `M PLUS 1p Bold`, `28px`;
- navy binding field, main headline, top/bottom mint rules, two-column geometry, native semantic placeholders, staff guidance and date were unchanged.

The Japanese-first comparison was stronger because the upper field retained its proven grouping/contrast function without forcing a language switch before the Japanese headline and safety information.

This applies the already-established Japanese-first / generic-English-filler QA method only. It is not a rule to translate authentic artifact names, brands, codes or labels that carry unique semantics.

## Adoption / rollback

Before selected/stress mutation, full hidden rollback copies were preserved:

- `49:2 / ROLLBACK_ADD08_ALLERGY_V2_PRE_JAPANESE_CATEGORY_LABEL_2026_08_20`
- `49:16 / ROLLBACK_ADD08_ALLERGY_V2_STRESS_PRE_JAPANESE_CATEGORY_LABEL_2026_08_20`

Adopted native text:

- selected `18:24 / TXT_MENU_CATEGORY` → `アレルギー・食事制限のご案内`;
- stress `18:69 / TXT_MENU_CATEGORY` → same wording.

Comparison `48:2` was hidden after adoption.

## Three-scale / long-copy QA

Selected `18:19`:

- whole-item / 500px: PASS;
- reading / 1000px: PASS;
- native actual-size `1400×1980`: PASS.

Long-copy `18:64` was temporarily revealed and reviewed at native `1400×1980`, then returned to hidden QA state: PASS.

Post-adoption structural readback:

- selected/stress visible native text: `8 / 8`;
- visible text outside root: `0 / 0`;
- same-parent text collisions: `0 / 0`;
- visible proof-language: `0 / 0`;
- IMAGE fill nodes: `0 / 0`;
- selected/stress category copy both equal `アレルギー・食事制限のご案内`;
- long-copy proof returned hidden after review.

## Hybrid / image decision

- all operational and variable copy remains native editable Figma text;
- existing simple functional rules/fields remain native vector/geometry;
- generated asset required: `0`;
- IMAGE fill added: `0`;
- Drive writes: `0`.

Image generation was not used because the visible defect was isolated English template language, not missing imagery or fixed artwork.

## Decision

`ADOPTED / ALLERGY_JAPANESE_FIRST_CATEGORY_LABEL_PASS`.

The Allergy / Dietary V2 remains part of the current selected ADD-08 family and continues to hold `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS`.

The navy field is intentionally retained: prior subtraction evidence showed that it carries a real binding role. Only the non-essential language mismatch was corrected.