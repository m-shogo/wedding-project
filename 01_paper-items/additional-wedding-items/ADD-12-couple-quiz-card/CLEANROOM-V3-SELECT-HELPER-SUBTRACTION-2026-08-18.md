# ADD-12 新郎新婦クイズカード — V3 Select-helper Subtraction QA

Status: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS_MAINTAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `aa022c22b0dfcb20c36796eb9eeaf03b446e49fb`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- selected front: `26:3 / ADD12/QuizCard/Front/CleanroomV3`
- selected back: `26:4 / ADD12/QuizCard/Back/CleanroomV3` (unchanged)
- long-copy front: `27:51`
- Drive: `ADD-12_新郎新婦クイズカード` / `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`
- retained legacy production: `1:2 / 1:26` — unchanged

## Visible problem

After the complete answer-quadrant borders were removed on 2026-08-18, each A–D role still repeated a faint `選ぶ` helper next to its handwriting rule. At whole-item scale this made four already-equal answer roles read more like repeated form controls than editorial stationery.

The instruction above the answers already says `いちばん近いと思う答えを、ひとつ選んでください。`, so the four repeated helpers did not add necessary reader meaning.

## Bounded comparison

Rollback-safe comparison:

- `36:2 / QA / ADD12 / FRONT / NO_SELECT_HELPER / 2026-08-18`

Only the four `選ぶ` native text helpers were hidden. The following remained unchanged:

- `Q.01` and native `[設問]`;
- A / B / C / D labels;
- native `[選択肢]` fields;
- four handwriting-selection rules;
- overall 2×2 equal weighting and geometry;
- answer-method placeholder;
- palette, typography and trim guide.

The borderless + helperless candidate was stronger at whole-item and native-size review: A–D still read as four equal choices, but the repeated form-control microcopy disappeared.

## Adoption / rollback

Before selected mutation, hidden rollback copies were saved:

- `36:34 / ROLLBACK / ADD12 / FRONT / PRE_NO_SELECT_HELPER / 2026-08-18`
- `36:66 / ROLLBACK / ADD12 / STRESS FRONT / PRE_NO_SELECT_HELPER / 2026-08-18`

The four helper labels were then hidden in both selected front `26:3` and long-copy front `27:51`. Comparison `36:2` was hidden after adoption.

Back `26:4` and its long-copy stress were not changed.

## Three-scale / structure QA

Fresh selected front review after adoption:

- whole-item / thumbnail: PASS;
- reading/native 620×875: PASS;
- answer equality retained: PASS;
- visible native text: 14;
- IMAGE fills: 0;
- visible `選ぶ` helper count: 0;
- visible text outside root: 0;
- same-parent text-to-text collisions: 0.

Long-copy front `27:51` after matching subtraction:

- visible native text: 14;
- IMAGE fills: 0;
- visible `選ぶ` helper count: 0;
- visible text outside root: 0;
- same-parent text-to-text collisions: 0.

Result: `SELECT_HELPER_SUBTRACTION_PASS`.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_CHANGE`.

The screenshot-supported defect was repeated form-like helper microcopy, not missing imagery. Drive write: `0`.

## Deferred / blocked

Final question, answer set, correct answer, response method/deadline, prize/result policy, final back copy, printer template, duplex proof and physical print proof remain unresolved. No factual value was fabricated.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / OPEN_QUADRANTS_POLISH_PASS / OPEN_MESSAGE_FIELD_POLISH_PASS / SELECT_HELPER_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
