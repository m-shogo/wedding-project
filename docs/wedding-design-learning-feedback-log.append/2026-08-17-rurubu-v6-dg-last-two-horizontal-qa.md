# 2026-08-17 — Rurubu V6 DG Q&A last-two horizontal closing beat

Scope: Rurubu WEDDING only
V7: HOLD

## Visible problem

DC's Q&A had already improved Q02/Q03 by binding them to the support photograph, but Q05/Q06 still continued as vertically stacked question rows on the right. At whole-page and actual-size scales, the end of the spread still felt like a questionnaire template rather than a deliberate magazine closing sequence.

## Principle tested

Preserve sequence, native text and the established photo anchor, but regroup the final repeated questions into one horizontal closing editorial beat before adding any new card/decor system.

## Bounded change

DG `1631:2`:

- reused the same replaceable support-photo source/hash;
- adjusted only its role geometry to `470×350`;
- moved Q05/Q06 below it as two horizontal columns;
- preserved Q01, Q02/Q03 navy photo binding, Q04 stack, upper hero and route texture;
- kept all question/answer copy native;
- no generated asset, Drive save, external binary or new raster.

## Expected improvement

- reduce vertical form rhythm;
- make the lower photo and final questions read as one editorial ending;
- preserve future copy editing and photo replacement.

## Regression risk

- ambiguous Q05/Q06 order;
- long native answers colliding;
- safe-area loss;
- lower photo overpowering Q04.

## Evidence

Three-scale / structural:

- whole spread 1400×990: PASS;
- Q&A page 794×1123 actual-size: PASS;
- native Q&A text: 26;
- text collision: 0;
- 18px safe-area risk: 0;
- overflow: 0.

Realistic-copy proof `1632:2`:

- Q05 long answer natural height: 39px;
- Q06 long answer natural height: 26px;
- collision: 0;
- safe-area risk: 0;
- actual-size screenshot: PASS.

## Decision

`DG VERIFIED_LOCAL / ADOPTED AS PREFERRED`.

- DG `1631:2` preferred and visible;
- DC `1618:2` renamed rollback and hidden;
- long-copy proof hidden after QA;
- Start Here: `V5 FU/FX · V6 AD + DG/DE INSIDE STUDIES · V7 HOLD`.

Generated / adopted / placed state:

- new generation: 0;
- generated asset adoption: 0;
- Drive save: 0;
- external binary placement: 0;
- image hash change: 0;
- existing replaceable photo reposition/resize: YES;
- visually verified: YES.

## Next application

Compare AD + DG/DE as one magazine and continue only if another clear, safe, high-value region still reads like a template. Do not advance V7. Preserve DG's closing relationship when final copy is introduced, then rerun targeted actual-size/long-copy QA.
