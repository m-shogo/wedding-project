# Rurubu WEDDING V6 — T + BK/BH Photo-led Q&A QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authority / pre-write readback

- Live preferred before experiment: Outer T `1447:2`, Profile/Q&A BI `1458:2`, Story/chronology BH `1451:2`.
- Start Here before promotion: `V5 FU/FX · V6 T + BI/BH INSIDE STUDIES · V7 HOLD`.
- Drive V6 root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.
- Shared learning system + Rurubu feed + neutral non-Rurubu feed were read before writes.
- No non-Rurubu item-specific Figma, Drive, ledgers, assets, or GitHub paths were inspected or modified.

## Visible problem

BI's Q&A page was structurally valid but still read as two separate systems at thumbnail/reading scale:

1. `01–06` question list on the left;
2. large memories photography on the right.

The photography was not doing enough editorial work, and Q4 was not strong enough to create a second reading beat. The page was clean, but still closer to an arranged questionnaire than a Japanese travel-information-magazine interview page.

## Root-cause hypothesis

`ROOT_CAUSE_HYPOTHESIS`

The remaining template feeling was not caused by insufficient decoration. It came from weak semantic integration between the repeated Q&A text and the photographs.

Expected improvement: make the existing hero photo the dominant editorial field, move the existing editable pullquote onto the photo, and promote Q4 itself into a second large native-text beat. Keep Q1–03 compact, Q5–06 supportive, and retain the lower-right replaceable photo as the closing anchor.

Regression risks:

- long answers could collide after moving the blocks;
- rotated hero image bounds could intersect Q2/Q3;
- photo metadata could collide with the page deck;
- Q4 could become oversized and resemble a landing-page headline;
- editable/native-text and replaceable-photo contracts must remain intact.

## Bounded experiment

### BJ — intermediate photo-led composition

Created rollback-safe duplicate from BI:

- root `1462:128`;
- hero photo enlarged/repositioned;
- existing `QA_CLOSING_PULLQUOTE` placed on the hero image;
- Q1–03 kept as compact left rail;
- support photo enlarged in the lower-right;
- no new image asset, card, gradient, shadow, generated decoration, or binary transport.

Result: photography/pullquote integration improved, but Q4 area remained visually underpowered.

Status: `TESTED_LOCAL / SUPERSEDED_BY_BK`.

### BK — feature Q4 composition

Created from BJ:

- root `1462:191`;
- Q4 number enlarged to 72 px and Q4 question to 26 px;
- support photo enlarged to `348×290` and moved upward;
- Q5/Q6 tightened below Q4;
- hero/pullquote integration preserved;
- after structure inspection, hero x-position was shifted to remove tiny Q2/Q3 image intersections;
- photo metadata was moved to remove a deck collision.

Final BK QA page: `1462:222 / PAGE / QA_EDITORIAL_BK_FEATURE_Q4`.

## Three-scale evidence

### Whole-item / thumbnail

- `1462:191` at max dimension 500: PASS.
- Compared against BI and BJ.
- BK has a clearer two-beat editorial rhythm: `Q1–03 + hero story` → `Q4 feature` → `Q5/Q6 + closing image`.
- The large photo and native pullquote read as one unit rather than parallel content columns.

### Reading scale

- `1462:191` at max dimension 900: PASS.
- Q4 becomes a visible second anchor without adding UI cards or decorative geometry.
- Existing photography remains dominant.

### Actual size / detail

- Q&A page `1462:222 / 794×1123`: PASS.
- visible native text: `25`;
- visible replaceable IMAGE roles: `2`;
- absolute text/text collisions: `0`;
- accidental text/image collisions: `0`;
- 18 px text safe-area risks: `0`.

Intentional image/text relationships retained:

- `TEXT / QA_FOOT` over hero boundary;
- `TEXT / QA_CLOSING_PULLQUOTE` over hero;
- `TEXT / QA_CLOSING_NOTE` over hero.

## Long-copy stress

Dedicated proof:

- root `1463:2 / PROOF / V6_BK_LONG_ANSWER_STRESS_PASS_2026_08_16`;
- Q&A page `1463:33`;
- six realistic Japanese answers inserted as native `Noto Sans JP Regular` text;
- all answer fields expanded naturally to 39 px height;
- text/text collisions: `0`;
- accidental text/image collisions: `0`;
- 18 px safe-area risks: `0`;
- page overflow: `0`;
- actual-size screenshot `794×1123`: PASS.

Proof was hidden after verification.

## Active image roles / hashes

Profile page remains visually and structurally unchanged from BI:

- `PHOTO / PROFILE_MAIN_REPLACEABLE_EDITORIAL` `793.7×328`, rotation `-1.1°`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`, `FILL`;
- `PROFILE_SNAPSHOT_1` `410×280`, `-2°`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- `PROFILE_SNAPSHOT_2` `340×245`, `2.5°`, hash `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- `PROFILE_SNAPSHOT_3` `238×185`, `-1.5°`, hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

BK Q&A:

- `PHOTO / QA_MEMORY_HERO_REPLACEABLE` `458×438`, rotation `-1.3°`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, `FILL`;
- `PHOTO / QA_MEMORY_SUPPORT_REPLACEABLE` `348×290`, rotation `1.4°`, hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`, `FILL`.

No new asset or image hash was introduced.

## Promotion / rollback

Promoted:

- `1462:191 / PREFERRED / V6_INSIDE_BK_FEATURE_Q4_PHOTO_LED_QA_2026_08_16`.

Hidden rollback/evidence:

- BI `1458:2` → rollback;
- BJ `1462:128` → rollback comparison;
- BK long-answer proof `1463:2` → hidden PASS evidence.

Start Here after promotion:

`V5 FU/FX · V6 T + BK/BH INSIDE STUDIES · V7 HOLD`

## Asset lifecycle truth

- newly generated images: `0`;
- new Drive saves: `0`;
- new external binary placement: `0`;
- existing verified image hashes reused: `YES`;
- replaceable image roles preserved: `YES`;
- native editable copy preserved: `YES`;
- generated section decoration adopted: `NO`;
- whole/read/actual-size visual QA: `PASS`;
- dedicated long-answer stress: `PASS`;
- rollback state: `PASS`;
- V7 touched: `NO`.

## Learning status

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Local finding: when a repeated Q&A page still feels like a questionnaire after cards have already been removed, another decoration layer is not necessarily the answer. Existing photography can become the primary editorial field, an existing native pullquote can be bound to that photo, and one semantically important question can become a second typographic beat. This creates magazine rhythm while preserving editable copy and replaceable image roles.

Rurubu-specific and not transferable literally:

- exact question hierarchy `01–03 / 04 / 05–06`;
- colors, image crops, positions, font sizes, and Hawaii/travel art direction;
- the specific pullquote wording and photo assets.

Potential cross-item capability only: use semantic emphasis + photo/text binding before adding decorative containers to repeated information.

## Completion status

BK is a verified local dummy-design study, not final content and not print-ready. Final photography, final copy, exact printer template, PDF preflight, and physical proof remain separate gates.
