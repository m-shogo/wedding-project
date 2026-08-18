# ADD-05 サンキュータグ — punch-axis rule subtraction QA

Status: `CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PUNCH_AXIS_RULE_SUBTRACTION_PASS / PHYSICAL_CLEARANCE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `21b47dae253af09c69303253e5f5c0064c1cc077`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `kAdkOMuAMcFQtTSP8NtWil`
- selected 50×80 front: `9:2`
- selected 45×70 reflow front: `9:20`
- optional 50×80 back: `9:13` unchanged
- Drive authority: `1_V20y77VU1aGrJtqpl7U5XUpC-bQuTxV / ADD-05_サンキュータグ_プチギフトタグ`
- retained legacy production remains untouched.

## Visible issue

Fresh native-size review found that the selected fronts still printed a thin neutral `RULE_HOLE_AXIS` immediately below the physical punch hole while also retaining the purposeful green journey/registration line below the gratitude copy.

The punch itself already makes the physical attachment point obvious. The extra upper rule did not encode trim, punch clearance, fold, route, copy grouping or another reader-facing function. Together with the lower line it created two competing horizontal separators and made the top attachment zone feel more diagrammatic than like a finished gift tag.

## Bounded comparison

Rollback-safe comparisons were created independently for both physical sizes:

- `16:2 / QA / ADD-05 / 50x80 / NO PUNCH AXIS RULE / 2026-08-18`
- `17:2 / QA / ADD-05 / 45x70 / NO PUNCH AXIS RULE / 2026-08-18`

Only `RULE_HOLE_AXIS` was hidden. The real punch circle, hidden punch-clearance guide, gratitude copy, lower green `PATH_JOURNEY`, date, spacing and dimensions were unchanged.

Comparison result: both fronts read more immediately as physical tags. The punch remains unmistakable, while `Thank you → support copy → green line → date` becomes the only printed horizontal rhythm.

## Promotion / rollback

Adopted on selected fronts:

- 50×80 `9:6 / RULE_HOLE_AXIS`: hidden;
- 45×70 `9:24 / RULE_HOLE_AXIS`: hidden.

Hidden pre-change rollback:

- 50×80: `17:12`
- 45×70: `17:22`

Optional back `9:13` was not changed because it does not contain this redundant punch-axis rule.

## Three-scale / structural QA

50×80 selected:

- actual canvas `500×800`;
- visible native text `3`;
- visible IMAGE fills `0`;
- outside visible text `0`;
- punch `50×50`, x=225, y=55 preserved;
- lower journey line preserved;
- upper punch-axis rule hidden.

45×70 selected:

- actual canvas `450×700`;
- visible native text `3`;
- visible IMAGE fills `0`;
- outside visible text `0`;
- punch `50×50`, x=200, y=55 preserved;
- lower journey line preserved;
- upper punch-axis rule hidden.

The subtraction does not change safe/punch clearance geometry; hidden guides remain available for final physical proof.

## Drive / asset decision

Exact Drive authority folder was live-read before promotion/evidence write. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the defect was redundant printed geometry, not missing imagery.

## Decision

`PUNCH_AXIS_RULE_SUBTRACTION_PASS`.

ADD-05 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`; the family is simpler and more object-like without losing the physical punch anchor or the selected clean-room typography.

## Deferred finalization

Still `NOT_PRINT_READY` pending real gift/package dimensions, attachment/string choice, stock, printer bleed/safe requirements and 100% physical punch/rotation proof.
