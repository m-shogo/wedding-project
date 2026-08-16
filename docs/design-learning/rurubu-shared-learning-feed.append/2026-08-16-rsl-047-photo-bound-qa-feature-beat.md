# RSL-047 — Bind repeated Q&A to photography before adding containers

Date: 2026-08-16
Source scope: Rurubu WEDDING V6
Source item: Profile / Q&A BI → BJ → BK
State: `CROSS_ITEM_CANDIDATE`

## State progression

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

V6 BI Q&A had already removed generic cards, but at whole-item and reading scales it still looked like a questionnaire list beside unrelated photography. The page was structurally clean yet the text and images behaved as two parallel systems.

## Evidence before change

- BI root: `1458:2`;
- Q&A page: native text `25`, replaceable IMAGE roles `2`;
- existing whole/read/actual-size QA was valid;
- visible weakness was editorial integration, not correctness.

## Root-cause hypothesis

Repeated information can retain a form/list feeling even without card geometry when all semantic beats have similar weight and photography is treated as a separate column.

A stronger editorial result may come from:

1. making an existing photo the dominant editorial field;
2. binding an existing native pullquote directly to that field;
3. selecting one semantically meaningful question as a second strong typographic beat;
4. keeping the remaining questions compact/supportive;
5. not adding decorative containers merely to increase density.

## Bounded test

- BJ `1462:128`: hero enlarged, pullquote placed on hero, Q1–03 compacted, support photo strengthened.
- BJ improved photo/text integration but Q4 remained weak.
- BK `1462:191`: Q4 promoted to 72 px number + 26 px question; lower support photo strengthened; Q5/Q6 tightened.
- Small structural intersections found by absolute-bounds inspection were corrected before promotion.
- No new image asset, generated decoration, card, shadow, gradient, or external transport was introduced.

## Expected improvement

- reduce questionnaire/list feeling;
- create a clear magazine reading sequence at thumbnail scale;
- increase editorial density using semantic hierarchy rather than decorative count;
- preserve native copy and replaceable photography.

## Regression risks

- Q4 could become a landing-page-style headline;
- long answers could collide after compaction;
- hero rotation could intersect left-rail text;
- text over photography could reduce readability;
- excessive photo dominance could weaken question hierarchy.

## Three-scale evidence

### Whole / thumbnail

BK `1462:191`, 500 px render: PASS and preferred to BI/BJ.

Reading sequence is now visibly:

`Q1–03 + hero/pullquote → Q4 feature → Q5/Q6 + closing photo`.

### Reading / spread

BK, 900 px render: PASS.

The photo/pullquote reads as one editorial unit and Q4 provides the second beat without a new container.

### Actual size / detail

BK Q&A `1462:222 / 794×1123`: PASS.

- native text `25`;
- replaceable IMAGE roles `2`;
- text/text collision `0`;
- accidental text/image collision `0`;
- 18 px safe-area risk `0`.

Dedicated long-answer proof `1463:2 / 1463:33`:

- six realistic Japanese answers;
- natural answer height up to 39 px;
- text/text collision `0`;
- accidental text/image collision `0`;
- safe-area risk `0`;
- page overflow `0`;
- actual-size visual check PASS.

## Figma / Drive / GitHub evidence

Figma:

- promoted BK root `1462:191`;
- BK Q&A page `1462:222`;
- long-copy proof `1463:2` hidden after PASS;
- BI `1458:2` and BJ `1462:128` retained hidden as rollback/comparison.

Drive:

- V6 root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- no new Drive asset was needed.

GitHub:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-T-BK-BH-PHOTO-LED-QA-2026-08-16.md`.

## Status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## What must remain Rurubu-specific

Do not transfer literally:

- the `01–03 / 04 / 05–06` grouping;
- exact positions, font sizes, crops, colors, and photo choices;
- Hawaii/travel visual language;
- the pullquote wording.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> When repeated information still looks like a form after container subtraction, first test whether semantic emphasis and direct photo/text binding can create editorial rhythm before adding another decorative layer.

Receiving items must test this independently in their own rollback-safe scope before adoption.
