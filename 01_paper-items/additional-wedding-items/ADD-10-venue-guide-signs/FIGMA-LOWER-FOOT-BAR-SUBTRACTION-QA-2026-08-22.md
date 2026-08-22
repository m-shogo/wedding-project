# ADD-10 会場案内サイン — lower foot-bar subtraction QA

Date: 2026-08-22
State: `VERIFIED_LOCAL / CURRENT_POLISH_APPLIED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`
Start main: `7b743d3c9b34f3bdcc036c93f2fcccedf57ac873`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- selected left/right/forward: `49:3 / 49:19 / 49:33`
- long-copy stress: `49:47`
- exact Drive authority read back live: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- Drive write: `0`

## Visible problem

After the earlier top-right decorative index was removed, the warm-paper guidance band still retained two short colored bars (`DECOR / CORAL FOOT` and `DECOR / LAGOON FOOT`). At whole-item scale they did not bind information, encode direction, mark trim/fold, or support the date/note relationship. They read as leftover generic accent furniture in an otherwise strong wayfinding composition.

This was not a reason to rebuild the selected `COLOR SIGNAL` system. The oversized coral direction vector, Japanese destination hierarchy, yellow divider, navy recognition field and warm guidance band all still performed clear roles.

## Bounded comparison

Rollback-safe comparison:

- `53:2 / QA / ADD-10 / LEFT / NO DECORATIVE FOOT BARS / 2026-08-22`

Only the two lower bars were hidden. Text, direction SVG, colors, date, guidance band, destination/floor geometry and safe areas were unchanged.

Whole-item comparison was cleaner without the bars: the lower guidance band became a quiet support field rather than a second decorative cluster, while the date and guidance copy remained fully legible.

## Promotion / rollback

Before current mutation, hidden rollback clones were created:

- left rollback `53:16`
- right rollback `53:30`
- forward rollback `53:44`
- long-copy rollback `53:58`

Then the lower decorative foot bars were hidden in:

- current left `49:3` (`49:15 / 49:16`)
- current right `49:19` (`49:31 / 49:32`)
- current forward `49:33` (`49:45 / 49:46`)
- stress `49:47` (`49:57 / 49:58`)

The comparison frame `53:2` was returned hidden after the decision.

## Three-scale QA

- whole / ~700 px left sign: PASS; first read remains destination → direction → guidance.
- reading / ~900 px comparison: PASS; removing the bars improves lower-band calm without weakening grouping.
- actual/detail / ~1400 px left sign: PASS; date and guidance remain clear and no new empty-space or alignment defect appears.

No image-generation or asset work was required because the defect was purposeless fixed decoration, not missing imagery.

## Learning status

This locally re-applies the already verified binding-function method: a retained line/bar should prove an information, physical, or binding function at whole-item scale. This run does **not** create a new blanket subtraction rule and does not change the meaning of the functional yellow divider or the direction SVG.

Do not transfer ADD-10's palette, arrow geometry, exact positions, or guidance-band layout to other items.

## Result

`VERIFIED_LOCAL / LOWER_GENERIC_ACCENT_SUBTRACTION_PASS / CURRENT_COLOR_SIGNAL_RETAINED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`
