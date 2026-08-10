# ADD-12 新郎新婦クイズカード — Reopened Visual QA 2026-08-10

Status: `CLEANROOM_COMPARISON_CREATED / SELLABLE_VISUAL_QA_PENDING / DESIGN_QA_PASS_WITH_PLACEHOLDERS`

## Live authority

- Start latest main: `dbd8b1ff3629fd7d3d84254c60826308ab49832f`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `oZ24SbwGkeAfFJcXlbxCoD`
- Production: front `1:2`, back `1:26`
- Drive folder ID: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ`; live metadata readback name `ADD-12_新郎新婦クイズカード`

## Reopened visual diagnosis

The existing production is structurally strong but the second-pass screenshots show a restrained field-note template with a generic English kicker, large unused lower field, and a thin mint edge. It remains functional, but the reopened sellable gate requires a materially different comparison before re-adoption.

## Clean-room comparison

Created rollback-safe section `2:2` — `QA_ADD12_REOPENED_EDITORIAL_BALLOT_V2_2026_08_10` without changing production.

- front `2:3` — `QA_ADD12_FRONT_V2_BALLOT_EDITORIAL`
- back `2:28` — `QA_ADD12_BACK_V2_BALLOT_EDITORIAL`

Direction: Japanese-first editorial ballot / travel notebook rather than quiz-show UI. Warm ivory remains, but the visual grammar changes to a narrow deep-navy book-edge rail, rust editorial kicker/rule, stronger Japanese headline, and compact ballot rhythm. No planes, passport stamps, quiz-show icons, gradients, shadows, rounded web cards, or generated people.

The first V2 screenshot exposed a real defect: the initial 96 px navy rail clipped the title/question area and alternating mark colors weakened answer-choice fairness. Both were corrected in the same run: rail reduced to 18 px and all four marks returned to identical teal treatment.

## Screenshot QA

Final front screenshot confirms:

- Japanese headline `ふたりのこと、どれだけ知ってる？` leads at thumbnail/reading scale;
- question hierarchy remains `Q 01 → question → short rust rule → A–D → answer method`;
- all four answer marks are equal 28 × 28 and visually identical;
- no button/card UI or fake quiz-show treatment;
- the lower negative space reads as a physical A6 ballot/card field rather than a centered web hero.

Final back screenshot confirms:

- `回答と、ひとこと` establishes a clearer paired role;
- answer instructions, name line, and message writing area remain distinct;
- rust is used as print hierarchy rather than badge decoration;
- no unconfirmed operational facts were introduced.

## Structure readback

- candidate front: 620 × 875, native text 10, IMAGE fills 0, clipsContent true
- candidate back: 620 × 875, native text 7, IMAGE fills 0, clipsContent true
- answer marks A–D: all 28 × 28 after correction
- production `1:2 / 1:26` unchanged; existing long-copy structural evidence remains authoritative
- no flatten/raster replacement introduced

## Image generation / Drive

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_COMPARISON`. The screenshot-supported bottleneck is typography/composition, not missing hero imagery. Drive changes: 0.

## Decision

Do not promote V2 yet. The candidate is materially different and visually stronger in Japanese hierarchy, but production should only be replaced after a direct whole-pair comparison plus candidate long-copy stress confirms that the stronger headline and reduced vertical spacing do not compromise the existing structural resilience.

Next: run V2 long-copy stress and pair comparison; if it remains structurally safe and clearly wins, preserve a production rollback duplicate, promote to `1:2 / 1:26`, then set `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` and continue to ADD-13.
