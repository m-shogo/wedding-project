# ADD-12 新郎新婦クイズ V3 — back writing-hint readability QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / ADOPTED / ACTUAL_SIZE_SECONDARY_COPY_HARDENED / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Start/live authority SHA before Figma write: `c5cc80c065d390d88b07e30fdb04924f1b7e43f4`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3`
- hidden long-copy back: `27:83 / STRESS / ADD12 / BACK / V3 LONG COPY`
- exact Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive metadata was live-read before the Figma work; Drive writes: `0`.

## Visible problem

Fresh native `620×875` review found the message-writing helper `自由に書いてください` at only `11px` in a very light grey (`≈0.67/0.69/0.70`). The back already had a deliberate open handwriting area, but at actual size the helper was close to disappearing and no longer reliably served its reader-facing guidance role.

This was different from previously removed internal proof/helper language: this sentence is legitimate guest-facing copy. The correct response was therefore to improve readability, not remove it.

The already `VERIFIED_CROSS_ITEM` non-Rurubu method “actual-size QA must audit the smallest meaningful reader-facing copy” was applied as a QA method only. Exact sizing and color remain ADD-12-specific.

## Bounded comparison

Production was not edited during evaluation.

- `49:2 / QA_ADD12_BACK_WRITE_HINT_READABILITY_2026_08_20`
- only `TEXT / WRITE HINT` changed:
  - font size `11 → 14px`;
  - text box width `170 → 220px`;
  - fill from very light grey to a darker neutral grey `rgb≈(0.36, 0.39, 0.41)`.

The comparison was stronger at native size: the hint remained clearly subordinate to the title/message roles but became reliably readable rather than appearing like near-invisible proof text.

No answer method, name role, message placeholder, handwriting geometry, typography hierarchy or page composition changed.

## Adoption / rollback

Before selected/stress mutation, full hidden rollback copies were preserved:

- `49:19 / ROLLBACK_ADD12_BACK_PRE_WRITE_HINT_READABILITY_2026_08_20`
- `49:36 / ROLLBACK_ADD12_BACK_STRESS_PRE_WRITE_HINT_READABILITY_2026_08_20`

Adopted in selected/stress:

- selected `26:47 / TEXT / WRITE HINT`: `14px`, width `220px`, darker neutral grey;
- stress `27:96 / TEXT / WRITE HINT`: same treatment.

Comparison `49:2` was hidden after adoption.

## Three-scale / long-copy QA

Selected back:

- whole / 500px: PASS;
- reading/native `620×875`: PASS.

Long-copy `27:83` was temporarily revealed at native `620×875`, reviewed, then returned to hidden state: PASS.

Structural readback after adoption:

- selected/stress visible native text: `8 / 8`;
- visible text outside root: `0 / 0`;
- same-parent text collisions: `0 / 0`;
- visible proof-language: `0 / 0`;
- IMAGE fills: `0 / 0`;
- selected/stress writing hint: `14px`, width `220px`, same darker neutral grey;
- long-copy root returned hidden after QA.

## Hybrid / asset decision

- all variable/factual copy remains native editable text;
- handwriting area remains semantic native geometry;
- generated assets: `0`;
- IMAGE fills added: `0`;
- Drive writes: `0`.

Image generation was not used because the defect was actual-size typography, not missing visual material.

## Decision

`ADOPTED / BACK_WRITE_HINT_READABILITY_PASS`.

ADD-12 V3 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`. This change improves a real reader-facing instruction without reintroducing form/UI containment or adding decoration.