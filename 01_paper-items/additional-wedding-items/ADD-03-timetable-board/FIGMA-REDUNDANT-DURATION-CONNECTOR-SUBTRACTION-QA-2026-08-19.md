# ADD-03 当日タイムテーブルボード — Redundant Duration / Connector Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `e73841d6234a6e28a3052c68df9435c2e22af382`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- Figma file: `woFUHUqZcvNkih8o42xeH4`
- A2 selected: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX`
- A3 selected: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW`
- A2 long-copy proof: `15:2` (hidden after QA)
- A3 long-copy proof: `15:72` (hidden after QA)
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

## Visible problem

Fresh A2/A3 screenshots confirmed the Japanese-first chronology remains strong, but small English timing microcopy still survived from an earlier chart-like treatment:

- A2 `30 MIN` after the ceremony;
- A2 `UNTIL` above `17:30`;
- A2 `2 H 30 MIN` below the reception;
- A3 `UNTIL` above `17:30`.

All authoritative start/end times are already printed directly (`14:10–14:40`, `14:40–15:00`, `15:00–17:30`). The tiny English labels therefore add no new operational information. In A2 they also create a data-dashboard flavor that is absent from the cleaner A3 reflow.

## Bounded change

Preserved unchanged:

- `本日の旅程` title;
- date/location;
- giant pale `24` atmosphere numeral;
- authoritative event times;
- Japanese `挙式 / 披露宴` labels;
- `TBD` transfer status;
- native semantic guidance placeholders;
- timeline axis, event nodes, divider rules and color hierarchy;
- native auto-height/long-copy behavior.

Hidden only:

- A2 selected `14:23 / TXT_EVENT_01_DURATION / 30 MIN`
- A2 selected `14:33 / TXT_EVENT_02_TIME_CONNECTOR / UNTIL`
- A2 selected `14:36 / TXT_EVENT_02_DURATION / 2 H 30 MIN`
- A3 selected `15:65 / TXT_EVENT_02_TIME_CONNECTOR / UNTIL`
- matching A2 stress `15:23 / 15:33 / 15:36`
- matching A3 stress `15:97`

Rollback copies created before mutation:

- `29:2 / ROLLBACK_ADD03_PRE_DURATION_CONNECTOR_SUBTRACTION_A2_SELECTED_2026-08-19`
- `29:40 / ...A3_SELECTED...`
- `29:72 / ...A2_STRESS...`
- `29:110 / ...A3_STRESS...`

All rollback copies are hidden.

## Three-scale QA

A2 selected:

- whole / 500–700px: PASS; the first read is still `本日の旅程 → 14:10 → 14:40–15:00 → 15:00 → 17:30`;
- reading scale: PASS;
- actual/native `1400×1980`: PASS; removal reduces chart-like micro-label noise without weakening chronology.

A3 selected:

- whole / 700px: PASS;
- the smaller reflow remains balanced and `17:30` stays visually attached to the reception block without the English connector.

Long-copy:

- A2 stress was temporarily shown at large scale after the change and remained visually stable;
- A2/A3 stress proofs returned to hidden state after QA.

## Structure readback

After adoption:

- A2 selected: visible native text `19`, outside visible text `0`, residual visible `UNTIL/MIN` microcopy `0`;
- A3 selected: visible native text `19`, outside visible text `0`, residual visible `UNTIL/MIN` microcopy `0`;
- A2 stress: visible native text `19`, outside `0`, residual `0`, hidden;
- A3 stress: visible native text `19`, outside `0`, residual `0`, hidden;
- IMAGE fills added: `0`;
- generated assets required: `0`;
- Drive writes: `0`.

## Decision

`ADOPTED`.

The change removes only redundant English timing metadata. It does not translate or remove artifact labels that carry unique meaning, and it does not change any confirmed schedule fact.

## Learning status

This is a local application of already established Japanese-first / non-semantic microcopy subtraction principles. No additional shared-learning entry is warranted from this single change.
