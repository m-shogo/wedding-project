# ADD-12 新郎新婦クイズカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPEN_QUADRANTS_POLISH_PASS / OPEN_MESSAGE_FIELD_POLISH_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The older V4.1 legacy-production authority is superseded for the reopened clean-room visual pass. The selected current design is the independently built clean-room V3 documented in:

- `CLEANROOM-V3-EDITORIAL-QUADRANTS-QA-2026-08-16.md`
- `CLEANROOM-V3-GUEST-COPY-CLEANUP-2026-08-17.md`
- `FIGMA-STRESS-PROOF-LANGUAGE-CLEANUP-2026-08-17.md`
- `CLEANROOM-V3-OPEN-QUADRANTS-POLISH-2026-08-18.md`

Live authority:

- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- selected page: `26:2 / SELECTED / CLEANROOM / ADD-12 / V3 EDITORIAL QUADRANTS / 2026-08-16`
- selected front: `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3`
- hidden long-copy front: `27:51`
- hidden long-copy back: `27:83`
- retained legacy production: `1:2 / 1:26` — comparison / rollback history only
- Drive folder: `ADD-12_新郎新婦クイズカード`
- Drive ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`

## Current visual direction

Front uses Japanese-first hierarchy, `Q.01` + native semantic `[設問]`, and four equal A–D response roles in a 2×2 editorial field. It does not use a radio-button list, rounded cards, shadows, pills, quiz-show icons, ticket/passport grammar or AI-person imagery. Each answer keeps native editable text and a short handwriting-selection rule.

On 2026-08-18 the four complete quadrant border strokes were removed because spacing + A–D labels + writing rules already carried the functional grouping; the boxes added unnecessary UI-card feel at thumbnail scale.

Back keeps the mint opening field, native `[回答方法]`, `[記名欄]`, `[メッセージ]` roles and one large open handwriting surface. It has no raster/image dependency.

## Fresh visual QA — 2026-08-18

Front `26:3` was reviewed at 500px whole-item scale and native `620×875` reading/detail scale. The open-quadrant version retains equal answer weighting while reading less like a dashboard/form.

Back `26:4` was also reviewed at 500px and native `620×875`. A remaining full rectangular stroke around `FIELD / OPEN MESSAGE AREA` made the large handwriting region read like a web form textarea even though the surrounding spacing, `ひとこと` label, semantic `[メッセージ]` role, faint writing hint and mint corner marker already communicated the area.

### Open message-field bounded test

Rollback-safe comparison:

- `35:2 / QA_ADD12_BACK_OPEN_MESSAGE_FIELD_2026_08_18`
- only the visible border stroke of `FIELD / OPEN MESSAGE AREA` was removed;
- writing-area geometry stayed `536×216`;
- the faint `自由に書いてください` hint and mint corner marker stayed intact;
- no message text, name field, answer method, page field, size or spacing was changed.

The borderless candidate was stronger at 500px and native `620×875`: it reads as stationery / open handwriting space instead of a form control while retaining a clear writable region.

Before mutation, hidden rollback copies were saved:

- `35:19 / ROLLBACK_ADD12_BACK_PRE_OPEN_MESSAGE_FIELD_2026_08_18`;
- `35:36 / ROLLBACK_ADD12_BACK_STRESS_PRE_OPEN_MESSAGE_FIELD_2026_08_18`.

The same border subtraction was applied to hidden long-copy back `27:83` so the QA evidence matches selected production.

Post-write stress verification:

- outside visible text: `0`;
- text-to-text collision: `0`;
- message-area geometry unchanged;
- stress returned to hidden QA state after native-size screenshot review.

Result: `OPEN_MESSAGE_FIELD_POLISH_PASS`.

## Structure / editability

- front root: `620×875`
- back root: `620×875`
- IMAGE fills: `0`
- question / choices / answer method / name / message remain native editable semantic text
- answer roles: 4 equal semantic roles
- back semantic handwriting area remains `536×216`; only its decorative border stroke was removed
- retained legacy production overwritten/deleted: `NO`

Long-copy roots `27:51 / 27:83` remain current stress authority. The 2026-08-18 front change altered only quadrant frame strokes; the back change altered only the open message-area stroke. Neither change reduces variable-copy capacity.

## Rollback / QA evidence

- front open-quadrant comparison: `33:2 / QA / ADD12 / OPEN QUADRANTS / 2026-08-18`
- front rollback: `34:2 / ROLLBACK / ADD12 / FRONT / PRE_OPEN_QUADRANTS / 2026-08-18`
- front stress rollback: `34:34 / ROLLBACK / ADD12 / STRESS FRONT / PRE_OPEN_QUADRANTS / 2026-08-18`
- back open-field comparison: `35:2 / QA_ADD12_BACK_OPEN_MESSAGE_FIELD_2026_08_18`
- back rollback: `35:19`
- back stress rollback: `35:36`

Older rejected clean-room V2 and retained legacy production remain intact.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The defect was unnecessary containment, not missing imagery. Exact Drive authority was live-read and matched `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`. Drive writes for this polish: `0`.

## BLOCKED_REQUIRED_INPUT

Final content still requires authoritative question/correct answer, final choice count, response collection/deadline, named vs anonymous participation, prize rules if any, result timing, whether QR is used, and final back-side wording. Do not fabricate these values.

## DEFERRED_FINALIZATION

Printer/vendor A6 template and bleed, trim/safe-area, duplex orientation, line-weight/handwriting proof, physical print proof, final PDF/export and Drive storage remain deferred.

## Result

- clean-room independence: `PASS`
- sellable visual: `PASS`
- open-quadrant UI-subtraction polish: `PASS`
- open message-field stationery polish: `PASS`
- native semantic editability: `PASS`
- long-copy evidence: `PASS`
- rollback safety: `PASS`
- Drive authority: `PASS`
- legacy preservation: `PASS`
- final factual/content verification: `BLOCKED_REQUIRED_INPUT`
- print readiness: `NO`
