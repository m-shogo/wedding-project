# 2026-08-16 — Rurubu V6 P + BA/AZ feedback

Scope: Rurubu WEDDING only
Result: `P + BA/AZ PREFERRED / V7 HOLD / NOT_PRINT_READY`

## Starting point

Live preferred before this pass:

- Outer P `1397:64`
- Profile/Q&A AX `1406:2`
- Story/chronology AS `1392:2`

System-level screenshot review showed two concrete remaining weaknesses:

1. AX Q&A still behaved like six separately placed questionnaire modules despite no visible cards.
2. AS Story had a strong hero but became comparatively quiet and explanatory in its lower half.

No generated section master was retried because the known external submit failure had no material capability/environment change.

## Experiment 1 — AY rejected

AY `1408:2` tested a native vertical `INTERVIEW` editorial anchor on the Q&A photo.

Expected:

- increase magazine energy without card geometry.

Observed:

- the large vertical word became decoration/noise on top of the photograph;
- it did not solve the repeated-question reading structure.

Decision:

- `REJECTED_VISUAL`
- hidden and preserved as comparison evidence.

Learning:

- decorative display type is not a substitute for editorial hierarchy.

## Experiment 2 — BA adopted

BA `1411:2` rebuilt only the Q&A reading flow using existing native text and replaceable photography.

Changes:

- Q01–Q03 = compact left interview flow;
- Q04 = feature question;
- Q05/Q06 = vertical continuation rather than another row;
- dining memory photo = stronger independent right anchor;
- closing native pullquote = bridge between text and photo;
- lower support photo moved upward;
- no new card, shadow, gradient, generated decoration or binary asset.

Three-scale result:

- whole spread 500 px: PASS
- reading spread: PASS
- actual Q&A 794×1123: PASS

Structure result:

- native text `24`
- replaceable IMAGE `2`
- text collision `0`
- safe-area risk `0`
- outside visible nodes `0`
- image intrinsic gate PASS.

Fresh dynamic-copy proof:

- `1412:2 / QA_EVIDENCE / V6_BA_LONG_ANSWER_STRESS_2026_08_16`
- six realistic Japanese answers
- collision `0`
- accidental image collision `0`
- safe-area risk `0`
- page overflow `0`
- actual-size screenshot PASS.

Decision:

- BA adopted as current preferred Profile/Q&A spread.

## Experiment 3 — AZ adopted

AZ `1409:2` changed only the Story page; chronology remained inherited from verified AS.

Changes:

- Story hero `700×470`;
- skyline support `220×202`;
- cafe support `430×330`;
- two-line native story anchor enlarged to `38 px` and used to bridge photo/copy;
- utility-like visible note removed;
- weak decorative `01` trial removed after screenshot review;
- no new decoration asset.

Three-scale result:

- 500 px whole spread: PASS
- reading spread comparison vs AS: PASS
- actual Story 794×1123: PASS

Structure result:

- native text `11`
- replaceable IMAGE `3`
- text collision `0`
- safe-area risk `0`
- outside-page text `0`
- all images remain within source intrinsic dimensions.

Decision:

- AZ adopted as current preferred Story/chronology spread.

## Asset lifecycle truth

- generated: `0`
- Drive writes: `0`
- new Figma binary placement: `0`
- existing verified image recomposition: `YES`
- native text preserved: `YES`
- generated/fixed decoration adopted: `NO`
- rollback-safe comparison: `YES`
- V7 changed: `NO`.

## Current takeaway

The best improvement in this pass came from **changing reading structure**, not adding decoration:

- repeated Q&A became an interview flow + visual anchor;
- quiet Story space became a continuous photo field + native headline bridge;
- visually weak decorative type was explicitly removed rather than defended.

Next review should judge Outer P + BA/AZ as one magazine system and target only concrete remaining incoherence.
