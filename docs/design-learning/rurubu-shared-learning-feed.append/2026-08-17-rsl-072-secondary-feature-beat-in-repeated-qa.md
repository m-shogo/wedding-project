# RSL-072 — Secondary feature beat in repeated Q&A

Date: 2026-08-17
Source scope: Rurubu WEDDING V6 only
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The live V6 Q&A page in CT had already moved away from six equal cards, but Q02 / Q03 / Q04 still formed a visually even middle band. Q04 (`これから挑戦したいことは？`) carries more narrative importance than the surrounding support questions, yet its scale did not express that importance. At thumbnail and reading scale this preserved a repeated-template rhythm.

## Root-cause hypothesis

Repeated semantic items do not need equal visual weight. If the important midpoint item remains the same scale as its neighbors, removing cards alone is insufficient: the page still reads as a uniform questionnaire. A second editorial feature beat should create a midpoint anchor without adding new decoration or breaking native editability.

## Bounded test

Rollback-safe source: CT root `1576:2`.

Candidate: CU root `1580:2`, Q&A page `1580:42`.

Only Q04 was changed:

- `TEXT / QA_NUM_4` promoted to a large native number;
- `TEXT / QA_Q_4` promoted to a larger native question;
- `TEXT / QA_A_4` retained as native copy and changed to `HEIGHT` auto-resize;
- Q01 / Q02 / Q03 / Q05 / Q06 were not redesigned;
- photo roles, image hashes, composed texture, and replaceability were unchanged;
- no new card, shadow, gradient, raster, generated asset, or Drive asset was added.

Expected improvement: reduce uniform-questionnaire rhythm and create an intentional second interview beat in the middle of the page.

Regression risks: number/question collision, long-answer overflow into lower content, photo collision, 18px safe-area failure, or visual dominance strong enough to break the Q&A reading order.

## Evidence and corrections

Initial structural audit caught a real Q04 number/question overlap of roughly 9px × 52px. The candidate was not promoted in that state. The question and answer were shifted/narrowed, then re-read until text collision and safe-area checks returned zero.

A dedicated long-copy proof `1580:81` / Q&A `1580:121` replaced Q04's short answer with:

`まだ行ったことのない国内外の街を少しずつ巡って、その土地のごはんや景色を一緒に楽しみたい。`

With native auto-height enabled, the answer expanded without collision or page overflow. The proof was hidden after evidence capture.

Three-scale review:

- whole-item / thumbnail: ~500px PASS;
- reading spread: ~1000px PASS;
- actual Q&A page: ~794×1123 PASS.

Final structural result:

- visible Q&A text: 25 native text nodes;
- text/text collision: 0;
- 18px safe-area text risk: 0;
- long-copy stress collision: 0;
- long-copy stress safe-area risk: 0;
- photos remain independent replaceable roles;
- image hashes unchanged.

## Adoption

`VERIFIED_LOCAL` and adopted.

Live preferred after promotion:

- Outer Z: `1576:160`;
- Profile/Q&A CU: `1580:2`;
- Story/Chronology CQ: `1569:2`;
- Start Here status node `845:27`: `V5 FU/FX · V6 Z + CU/CQ INSIDE STUDIES · V7 HOLD`.

CT `1576:2` remains a hidden rollback. CU's long-copy proof remains hidden.

Drive authority was re-read before work: `RURUBU_V6_HAWAII_2026-08-02`, ID `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`. No Drive write occurred.

## Failure fingerprint

`UNIFORM_REPEATED_QA_HIERARCHY`

Symptom: repeated questions remain visually equal after card subtraction, causing a questionnaire/template rhythm.

Replacement method: promote only a semantically important question to a bounded secondary feature beat with native typography, then re-run realistic long-copy stress rather than adding ornamental containers.

## What must remain Rurubu-specific

Do not transfer the exact Q04 choice, wording, coordinates, coral/navy treatment, type sizes, photo selection, or page composition. Those decisions are specific to this Rurubu spread and its content.

## Cross-item applicability hypothesis

For repeated editorial content, a receiving item may test whether one semantically important midpoint item should become a secondary feature beat while the remaining items stay support-level. This remains a hypothesis outside Rurubu and must be tested in that item's own rollback-safe context with its own realistic-copy stress.
