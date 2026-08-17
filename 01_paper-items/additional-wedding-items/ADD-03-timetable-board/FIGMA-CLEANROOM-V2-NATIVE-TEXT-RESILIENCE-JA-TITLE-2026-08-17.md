# ADD-03 当日タイムテーブル — Clean-room V2 native-text resilience / Japanese-first title QA

Status: `CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / VARIABLE_NOTE_AUTOHEIGHT_PASS / REALISTIC_LONG_COPY_STRESS_PASS / JAPANESE_FIRST_TITLE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `36da72ca1b37bd429d6b99037ab0fd3aa29621d8`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- selected A2 clean-room V2: `14:2 / CLEANROOM_V2_ADD03_DAY_INDEX`
- selected A3 clean-room V2: `15:40 / CLEANROOM_V2_ADD03_A3_DAY_INDEX_REFLOW`
- A2 long-copy proof: `15:2 / QA_ADD03_CLEANROOM_V2_LONG_COPY_STRESS`
- A3 long-copy proof: `15:72 / QA_ADD03_A3_CLEANROOM_V2_LONG_COPY_STRESS`
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`

Legacy production was not changed in this run. Existing clean-room V2 rollback/comparison history remains preserved.

## Visible / structural issue

Fresh actual-size and structure readback found that the selected clean-room V2 looked correct with current short placeholders, but the three genuinely variable guidance roles were still authored as fixed-height native text:

- `TXT_EVENT_01_NOTE`
- `TXT_TRANSFER_LABEL`
- `TXT_EVENT_02_NOTE`

That meant a screenshot could look healthy while future authoritative guidance could be clipped or visually compressed. The existing A2 long-copy proof exposed the important case: after converting the Reception note to natural height, its two-line stress copy ended exactly at `RULE_EVENT_02`, leaving `0px` clearance.

A second visual issue was also verified at whole-item scale: `OUR WEDDING JOURNEY` functioned mainly as generic English template copy. The item is a Japanese wedding-day timetable, and the rest of the layout already carries the travel concept through chronology and physical-paper structure.

## Bounded repair

Rollback-safe hidden copies were created before the native-text change.

Only the three variable guidance roles in A2/A3 selected frames and their long-copy proofs were changed to `textAutoResize=HEIGHT`. Large time numerals, fixed index labels, date numerals, event labels and other deliberately fixed display typography were not blanket-converted.

Observed natural-height changes included:

- A2 selected Ceremony note `36 → 38px`
- A2 selected transfer guidance `30 → 34px`
- A2 selected Reception note `39 → 42px`
- A2 long-copy Reception note `39 → 84px`
- A3 long-copy Reception note `25.5 → 58px`

Because the A2 long-copy Reception note reached the divider with `0px` clearance, only the A2 Reception divider and duration label were moved down `24px` in both selected and stress variants:

- `RULE_EVENT_02 y 1514 → 1538`
- `TXT_EVENT_02_DURATION y 1550 → 1574`

The footer and closing field were not moved.

Separately, a rollback-safe Japanese-first title comparison was built and visually reviewed. It replaced the generic English kicker with native `本日の旅程` using Noto Sans JP Medium while preserving the existing top rule, date/location and overall clean-room composition. The Japanese-first result was clearer and less template-like, so the same title treatment was adopted in selected A2/A3 and their stress proofs. Temporary comparison clones were hidden after adoption.

## QA

### Whole / reading / actual size

- A2 selected: whole/read PASS; fresh native `1400×1980` screenshot PASS.
- A3 selected: fresh `990×1400` screenshot PASS.
- The first-glance order remains `date/context → 14:10 → 14:40–15:00 TBD → 15:00 / 17:30 → closing note`.
- `本日の旅程` now reads as the quiet top-level item label without competing with the time hierarchy.
- No card/UI treatment, new decorative asset, generated raster, shadow or gradient was added.

### Long-copy stress

A2 long-copy proof was temporarily revealed and visually inspected at native `1400×1980`, then hidden again.

Final variable-note clearances:

- A2 selected Reception note → divider: `66px`
- A2 stress Reception note → divider: `24px`
- A3 selected Reception note → divider: `53px`
- A3 stress Reception note → divider: `24px`

Final structure readback across selected + stress frames:

- all three variable guidance roles: `textAutoResize=HEIGHT`
- visible text outside root: `0`
- A2/A3 image fills added: `0`
- no variable wording baked into vector/raster assets
- A2/A3 stress proofs returned to hidden state after QA

## Drive / assets

Drive authority metadata was read back before the Figma change. No Drive write was required because the defect was native text resilience and editorial language, not missing imagery.

Image generation: `NOT_REQUIRED_THIS_CHANGE`.

## Decision

`CLEANROOM_V2_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains valid and is now better supported by the live Figma structure.

The selected clean-room family is more resilient to future authoritative guidance, and the top-level language is more Japanese-first without changing the item's established chronology grammar.

Still deferred: final transfer/activity wording, printer template/bleed, font embedding/output proof and physical viewing-distance proof.