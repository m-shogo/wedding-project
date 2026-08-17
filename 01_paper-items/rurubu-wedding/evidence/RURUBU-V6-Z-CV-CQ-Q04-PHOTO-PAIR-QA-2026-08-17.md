# Rurubu WEDDING V6 — Z + CV/CQ Q04 Photo-Pair QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Status: `VERIFIED_LOCAL / PROMOTED_TO_PREFERRED / V7_HOLD / NOT_PRINT_READY`

## Authority readback before work

Fresh live Figma inspection found an authority drift that GitHub had not yet recorded:

- Outer Y `1542:2` was already `ROLLBACK` and hidden;
- Profile/Q&A CP `1567:18` was already `ROLLBACK` and hidden;
- Start Here read `V5 FU/FX · V6 Z + CU/CQ INSIDE STUDIES · V7 HOLD`;
- live visible Outer was Z `1576:160` — `PREFERRED / V6_OUTER_Z_EDITORIAL_BACK_MILESTONES_2026_08_17`;
- live visible Profile/Q&A was CU `1580:2` — `PREFERRED / V6_INSIDE_CU_Q04_SECOND_FEATURE_BEAT_2026_08_17`;
- live visible Story/Chronology was CQ `1569:2` — `PREFERRED / V6_INSIDE_CQ_EVENT03_PHOTO_BINDING_SIDE_NOTES_2026_08_17`.

Therefore no write was made to stale Y/CP.

## Visible problem

CU's Q&A page had strong top photography and a useful Q04 feature, but the lower support photograph began at `y=725` while Q04 began around `y=610`. At whole-item and page scale this left the central cream field reading as a placed-question template rather than one photo-led editorial beat.

## Root-cause hypothesis

The defect was not missing decoration. Q04 and the existing legitimate support photograph were semantically related but spatially detached. Binding them into one horizontal beat should increase magazine rhythm without introducing a new card, raster, shadow, gradient, or generated asset.

## Bounded test

CU was cloned rollback-safely to CV `1585:2`.

Only the Q&A page changed:

- existing support photo `PHOTO / QA_MEMORY_SUPPORT_REPLACEABLE` kept the same image hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- photo moved from approximately `28,725 / 430×300` to `24,610 / 455×370`;
- source readback is `732×498`, so the enlarged role remains intrinsic-safe;
- native Q04 moved into the same horizontal beat beside that photograph;
- Q05/Q06 were reflowed below the feature question without changing their wording or semantic role;
- the support caption/rule were re-bound immediately below the photograph;
- Q01–Q03, top hero image, composed route texture, Profile page, and all image hashes were preserved.

No new external or generated asset was used.

## Expected improvement

- reduce the dead/template-like cream gap;
- make Q04 read as a genuine secondary editorial feature rather than a floating form item;
- strengthen photo-led travel-magazine rhythm while preserving editable native copy and replaceable imagery.

## Regression risks

- enlarged support photo could exceed source fidelity;
- Q04–Q06 could collide after reflow;
- realistic longer answers could overflow or collide;
- larger image could make the page too bottom-heavy at thumbnail scale.

## Three-scale visual evidence

After correction and before promotion:

- whole-item thumbnail, `500×354`: PASS; the lower photograph now anchors the Q04–06 sequence without overwhelming the top hero;
- reading spread, `1200×849`: PASS; Q04 visually pairs with the support photograph and central dead space is reduced;
- Q&A actual-size, `794×1123`: PASS; type remains readable, photograph is acceptably sharp, and Q05/Q06 remain clear secondary beats.

## Structure / intrinsic QA

Q&A page `1585:42`:

- visible native text: `26`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- composed route texture `470×470` ≤ source `720×860`;
- top hero `478×330` ≤ source `944×608`;
- support photo `455×370` ≤ source `732×498`;
- photo image hashes changed: `0`.

## Realistic-copy stress

Hidden proof: `1586:2` / Q&A page `1586:42`.

Q04–Q06 answers were replaced with materially longer native Japanese copy and set to auto-height for proof:

- Q04 answer height: `42px`;
- Q05 answer height: `26px`;
- Q06 answer height: `39px`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`;
- actual-size screenshot `794×1123`: PASS.

The proof was returned to hidden state after QA.

## Promotion transaction

- CU `1580:2` → `ROLLBACK / ...`, hidden;
- CV `1585:2` → `PREFERRED / V6_INSIDE_CV_Q04_PHOTO_PAIR_2026_08_17`, visible;
- proof `1586:2` → `QA_STRESS_HIDDEN / ...`, hidden;
- Start Here → `V5 FU/FX · V6 Z + CV/CQ INSIDE STUDIES · V7 HOLD`.

Fresh post-promotion screenshot readback of CV passed.

## Asset lifecycle truth

- newly image-generated assets: `0`;
- newly adopted generated assets: `0`;
- new Drive saves: `0`;
- new binary placements: `0`;
- new raster bytes: `0`;
- existing replaceable photo roles recomposed: `YES`;
- image hashes changed: `0`;
- native variable text preserved: `YES`;
- screenshot verified: `YES`;
- structure verified: `YES`;
- rollback preserved: `YES`;
- V7 touched: `NO`.

## Result

`CV VERIFIED_LOCAL / PREFERRED`.

The improvement comes from semantic photo-copy binding and scale/rhythm, not added decoration. Final personal copy, final legitimate photography, exact printer template, PDF preflight, and physical proof remain outstanding, so V6 is not `PRINT_READY`.
