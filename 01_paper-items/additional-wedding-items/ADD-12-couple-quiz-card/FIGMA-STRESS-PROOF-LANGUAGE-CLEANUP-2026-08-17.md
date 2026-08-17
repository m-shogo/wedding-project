# ADD-12 Couple Quiz Card — hidden stress proof-language cleanup

Date: 2026-08-17
State: `CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / STRESS_EVIDENCE_GUEST_COPY_CLEAN / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `dac4d2c2ae9ab799ff134c2cb2baeda83e937cb1`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- selected clean-room authority: `CLEANROOM-V3-EDITORIAL-QUADRANTS-QA-2026-08-16.md`
- prior guest-copy cleanup: `CLEANROOM-V3-GUEST-COPY-CLEANUP-2026-08-17.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected production: front `26:3`, back `26:4`
- hidden long-copy stress: front `27:51`, back `27:83`
- Drive authority: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## Fresh defect

Live programmatic readback found that selected production was already guest-copy clean, but the hidden long-copy stress evidence still contained authoring/proof vocabulary such as `LAYOUT DUMMY`, `EDITORIAL NOTE`, and an internal finalization note.

This did not affect production output, but it made the retained QA evidence inconsistent with the now-promoted rule that unresolved semantic roles should remain explicit without printing internal authoring vocabulary.

## Bounded Figma change

Only the hidden stress nodes were changed. Selected production `26:3 / 26:4` and retained legacy production were not mutated.

Front stress:

- answer-method stress copy kept the same long semantic role but removed `· LAYOUT DUMMY`;
- `TRAVEL TRIVIA · EDITORIAL NOTE` was hidden.

Back stress:

- answer-method, long-name, and long-message stress strings kept their long-copy purpose but removed `· LAYOUT DUMMY`;
- the internal finalization note was hidden.

No geometry, font size, choice layout, writing area, production placeholder, factual value, image role, or legacy node was changed.

## Structural readback

After cleanup:

- selected front `26:3`: `620×875`, visible native text `18`, IMAGE fills `0`, proof-language matches `0`, outside visible text `0`;
- selected back `26:4`: `620×875`, visible native text `9`, IMAGE fills `0`, proof-language matches `0`, outside visible text `0`;
- stress front `27:51`: `620×875`, visible native text `18`, IMAGE fills `0`, proof-language matches `0`, outside visible text `0`;
- stress back `27:83`: `620×875`, visible native text `9`, IMAGE fills `0`, proof-language matches `0`, outside visible text `0`.

The stress frames retained their existing fixed stress geometry and remain valid overflow evidence. No production geometry was altered.

## Drive / assets

Drive folder metadata was read back successfully: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ` / `ADD-12_新郎新婦クイズカード`.

Drive writes: `0`.
Image generation: `0`; this was an evidence-consistency defect, not an imagery defect.

## Decision

ADD-12 remains `CLEANROOM_V3_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

The meaningful advancement is that both live production and its retained long-copy QA evidence now satisfy the same guest-facing semantic-placeholder boundary. Final quiz question/choices, answer method, collection policy and physical print proof remain deferred.