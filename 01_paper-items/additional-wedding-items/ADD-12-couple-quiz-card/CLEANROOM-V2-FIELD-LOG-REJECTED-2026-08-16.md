# ADD-12 Clean-room V2 — Field Log comparison — 2026-08-16

Status: `STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / POST_COMPARISON_VISUAL_CONVERGENCE / REJECTED / LEGACY_PRESERVED`

Start authority SHA: `c494304fa5118594983c8208784d6c8f6c858342`

## Clean-room build

A fresh A6 front/back pair was authored from blank frames in Figma file `oZ24SbwGkeAfFJcXlbxCoD` using only ADD-12 semantic / physical requirements from `SPEC.md`:

- A6 `620×875` front/back;
- Japanese-first hierarchy;
- semantic `QUESTION_01`, `CHOICE_A`–`CHOICE_D`, answer-method, name and message roles;
- ivory / navy / mint / silver palette;
- no AI person imagery;
- no aviation-ticket / passport / Rurubu visual reuse;
- no generated raster.

No retained production frame or production node was duplicated or used as an authoring source.

Fresh page created as:

- `23:2 / CLEANROOM / ADD-12 / V2 FIELD LOG / 2026-08-16`

After final comparison it was deliberately renamed:

- `23:2 / REJECTED / CLEANROOM / ADD-12 / V2 FIELD LOG / 2026-08-16`

Clean-room frames:

- `23:3 / ADD12/QuizCard/Front/CleanroomV2`
- `23:24 / ADD12/QuizCard/Back/CleanroomV2`
- hidden stress `24:23 / STRESS_ADD12_FRONT_V2_LONG_COPY`
- hidden stress `24:44 / STRESS_ADD12_BACK_V2_LONG_COPY`

## Visual direction tested

V2 used an `EDITORIAL FIELD LOG` direction:

Front:

- narrow mint field-log spine;
- Japanese serif headline `旅の途中で、ふたりを知る。`;
- large mint `Q.01`;
- open-circle answer marks with ruled choices rather than rounded UI cards;
- native answer-method placeholder.

Back:

- pale upper field;
- Japanese serif headline `答えを残して、旅をつづける。`;
- native answer-method placeholder;
- writable name line;
- four message rules;
- simple editable dotted travel route.

## Screenshot / structure QA before legacy comparison

Front whole/reading/actual-size review:

- Japanese-first hierarchy is immediate;
- question → choices → answer-method order is clear;
- no rounded-card / dashboard UI impression;
- all choice treatments are visually fair;
- all copy remains native editable text.

Back whole/reading/actual-size review:

- writable name/message roles are obvious;
- sufficient open writing area remains;
- no raster / IMAGE fill required.

Long-copy stress readback:

Front `24:23`:

- visible text outside root: `0`;
- long question bottom remains above choice A with ~47px gap;
- long choice rows remain separated;
- choice D remains above answer-method with ~40px gap.

Back `24:44`:

- visible text outside root: `0`;
- long answer-method text remains above the name field;
- extended name/message labels remain inside root.

Result before comparison: `STRUCTURAL_PASS / LONG_COPY_STRESS_PASS`.

## Post-completion retained-production comparison

Only after the clean-room pair and stress QA were complete, retained production was opened for comparison:

- front `1:2 / ADD12/QuizCard/Front`;
- back `1:26 / ADD12/QuizCard/Back`.

The comparison exposed an unacceptable visual-convergence risk.

Although no production nodes were copied, the clean-room V2 independently converged on several of the retained production's strong silhouette/grammar choices:

- narrow dark/colored left spine on the front;
- question-first open-ballot composition;
- open circular choice marks in a vertical list;
- back dominated by name/message writing lines.

Because the current clean-room mandate requires a materially independent visual direction — not merely independent node construction — this V2 is **not promoted**.

Failure fingerprint:

`POST_COMPARISON_VISUAL_CONVERGENCE`

Decision:

`REJECTED / COMPARE_ONLY / LEGACY_PRESERVED`.

The retained production was not edited, deleted, or overwritten.

## Next valid method

Do not polish this V2 or make a V3 by borrowing either retained production or rejected V2 geometry.

The next ADD-12 run should start again from semantic facts only and use a materially different paper grammar, for example a non-ballot composition where question/choices are not a left-spine + vertical radio-list silhouette. The fresh direction must be completed and stress-tested before retained production is opened again.

Drive authority remains `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`; Drive writes this run: `0`.
