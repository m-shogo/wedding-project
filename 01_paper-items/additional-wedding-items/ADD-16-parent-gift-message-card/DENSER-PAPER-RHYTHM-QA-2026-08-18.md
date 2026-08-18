# ADD-16 Parent Gift Message Card — Denser Paper Rhythm QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `9aa78fb70668fae614ee4d0bc12a86fd17ea5785`

## Authority
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected front: `18:3`
- selected back: `18:14` (unchanged)
- hidden long-copy front: `18:26`
- retained legacy production: `1:2 / 1:13` (unchanged)
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`

## Visible problem
Fresh actual-size review of selected front `18:3` showed a false-premium emptiness pattern: the semantic content ended near the upper-middle, while the horizon/origin device sat at y≈720 and the date/signature at y≈900. The visual grammar was strong, but the lower half felt underused rather than intentionally quiet.

## Bounded comparison
A rollback-safe comparison `32:2 / QA / ADD16 / FRONT / DENSER PAPER RHYTHM / 2026-08-18` changed only lower vertical rhythm:
- `DECOR_HOME_PORT_ROUTE`: y `720 → 625`
- `DECOR_ORIGIN_MARK`: y `713 → 618`
- `TXT_PARENT_DATE`: y `900 → 820`
- `TXT_COUPLE_SIGNATURE`: y `900 → 820`

Recipient, gratitude headline, optional metaphor, line length, colors, typography, paper field, native editability and all semantic copy stayed unchanged.

The denser candidate was stronger at whole-item and native-size review: the page still feels quiet, but the horizon now participates in the text composition rather than floating in a large empty lower field.

## Rollback / adoption
Before selected-family mutation, hidden rollback copies were saved:
- selected front rollback: `32:13`
- long-copy front rollback: `32:24`

The same y-shift was applied to hidden long-copy front `18:26`. Comparison `32:2` was hidden after adoption.

## Structure / stress evidence
Post-write readback:
- selected optional line bottom: `462`
- selected horizon y: `625`
- selected date y: `820`
- selected signature bottom: `848`
- stress optional line bottom: `494`
- stress horizon y: `625`
- stress date y: `820`
- stress signature bottom: `876`
- visible text outside root: `0` selected / `0` stress
- text-to-text collision: `0` selected / `0` stress
- IMAGE fills added: `0`

The long-copy variant preserves at least 131 px between the longer optional metaphor and the horizon, and 160 px from horizon to date row. No variable-copy capacity was reduced.

## Image / Drive decision
`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_POLISH`.
The defect was paper rhythm, not missing imagery. Drive metadata was live-read and matched the exact ADD-16 authority folder; Drive writes: `0`.

## Result
`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid. This polish specifically closes `FALSE_PREMIUM_EMPTY_LOWER_FIELD` without changing the selected clean-room visual grammar or any legacy production.
