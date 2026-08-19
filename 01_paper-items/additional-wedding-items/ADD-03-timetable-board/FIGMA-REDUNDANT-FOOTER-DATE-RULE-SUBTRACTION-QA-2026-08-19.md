# ADD-03 当日タイムテーブル — redundant footer date/rule subtraction QA

Date: 2026-08-19
State: `VERIFIED_LOCAL / REDUNDANT_FOOTER_DATE_SUBTRACTION_PASS / ORPHAN_FOOTER_RULE_SUBTRACTION_PASS`
Start authority SHA: `c31bd3493177e577dc9ae9f91a3aa1898195d10f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- A2 selected: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX`
- A3 selected: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW`
- A2 long-copy proof: `15:2`
- A3 long-copy proof: `15:72`
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- retained legacy remains untouched.

## Visible problem

Fresh A2/A3 whole-item review found `2026.10.24 / YOKOHAMA` repeated as tiny footer microcopy even though the same authoritative date/location already appears prominently in the top-right header. The repeated footer did not add schedule information and read like template metadata.

Once the duplicate footer text was removed in a bounded study, the full-width `RULE_FOOTER` no longer bound any caption, physical edge, trim role or content region. It became an orphan decorative divider.

## Bounded comparisons

Production was not edited during comparison.

A2:

- `33:2`: hide only `TXT_FOOTER_DATE`;
- `33:72`: hide `TXT_FOOTER_DATE` + `RULE_FOOTER`.

A3:

- `33:40`: hide only `TXT_FOOTER_DATE`;
- `33:110`: hide `TXT_FOOTER_DATE` + `RULE_FOOTER`.

In both sizes, removing the duplicate text improved hierarchy. Removing the now-unbound rule also improved the paper composition: the timeline closes through the final blue event rule and vertical time axis instead of a second unrelated horizontal boundary.

## Promotion / rollback

Before promotion, full hidden rollback copies were created:

- `34:2` A2 selected;
- `34:40` A3 selected;
- `34:72` A2 long-copy proof;
- `34:110` A3 long-copy proof.

Promoted to A2/A3 selected and both long-copy proofs:

- `TXT_FOOTER_DATE` → hidden;
- `RULE_FOOTER` → hidden.

Preserved unchanged:

- top-right `2026.10.24 SAT / YOKOHAMA` authority;
- `14:10–14:40` ceremony timing;
- `14:40–15:00` unresolved transfer interval + native semantic guidance;
- `15:00–17:30` reception timing;
- event labels, event rules, timeline axis and nodes;
- pale `24` atmosphere numeral;
- auto-height variable guidance roles;
- legacy production.

All temporary comparison roots `33:2 / 33:40 / 33:72 / 33:110` were hidden after promotion.

## Three-scale / structure QA

Fresh A2 and A3 screenshots after promotion:

- whole/thumbnail: PASS;
- reading scale: PASS;
- actual-size composition: PASS for both reflows.

Structural readback:

- A2 selected: visible native text `17`, IMAGE fills `0`, outside visible text `0`;
- A3 selected: visible native text `17`, IMAGE fills `0`, outside visible text `0`;
- hidden A2 stress: visible native text within proof `17`, outside text `0`;
- hidden A3 stress: visible native text within proof `17`, outside text `0`;
- footer date + footer rule hidden in all four current roots;
- rollback copies hidden.

No schedule fact was removed. Date/location remain authoritative at the top of the artifact.

## Drive / generated asset decision

- image generation: `0`;
- Drive writes: `0`;
- Drive metadata live-read before the edit.

The defect was redundant metadata + orphan divider geometry, not missing imagery.

## Decision

`REDUNDANT_FOOTER_DATE_SUBTRACTION_PASS / ORPHAN_FOOTER_RULE_SUBTRACTION_PASS`.

ADD-03 remains `CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.
