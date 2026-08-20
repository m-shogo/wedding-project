# Rurubu V6 IP — Profile / Q&A earlier-support-photo + Q04 bind QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

Common-scale review of the current V6 preferred set showed that IK's Q&A right page still had a noticeable cream transition band between the dominant Q01 photo and the lower support photo. Q02/Q03 were readable, but the support image arrived late enough that the page briefly returned to a stacked section rhythm.

## Root-cause hypothesis

The defect was not missing imagery. The lower support photo already had the correct semantic role, but its vertical start was too low. Pulling that existing image upward and slightly enlarging it should keep photographic continuity through the page while preserving a readable cream-side Q04 column.

## Bounded test

- duplicated IK `2084:2` rollback-safely to IP `2096:2`;
- left profile page was preserved;
- Q&A support photo `2096:63` kept existing image hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- support photo moved from the IK role `x=18, y=610, 545×255` to `x=18, y=552, 555×300`;
- Q02/Q03 were moved up slightly so their cream bridge remained compact;
- an initial full-width photo-overlay Q04 experiment reduced legibility and was rejected inside the candidate;
- final treatment restored Q04 to the cream reading column, hid the redundant Q04 micro-kicker, and retained the large native `04` as the editorial anchor;
- no new raster, generated image, Drive save, upload, shadow, gradient, card, or whole-page flattening was added.

## Expected improvement

Reduce the false section break, maintain a photo-led travel-magazine rhythm, and let Q04 read as a bound continuation of the support photograph instead of a detached module.

## Regression risk

- moving the support photo earlier can crowd Q02/Q03;
- enlarging the photo can expose crop weakness;
- overlaying Q04 copy on the image can hurt contrast, which is why the first overlay variant was rejected;
- the large `04` must not collide with the Q04 heading.

## Three-scale evidence

- whole spread / 500px: PASS; lower photo arrives earlier and the right page reads more continuously than IK;
- reading spread / 1400px: PASS;
- actual-size Q&A right `2096:49`, 794×1123: PASS;
- visible native text across spread: `54`;
- visible IMAGE fills across spread: `5`;
- Q&A-right same-parent text intersections: `0`;
- Q&A-right 18px text safe-area risks: `0`;
- whole-page flattening: NO;
- replaceable image roles preserved: YES.

## Asset / provenance evidence

No asset lifecycle change in this experiment.

Existing image hashes retained:

- profile main: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- profile snapshot 1: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- profile snapshot 2: `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- Q&A hero: `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- Q&A support: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

Drive V6 authority was re-read before writes:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Promotion / rollback

- IP `2096:2` → `PREFERRED / V6_PROFILE_QA_IP_EARLIER_SUPPORT_PHOTO_Q04_BIND_2026_08_21`, canonical x=`273800`, y=`0`, visible;
- IK `2084:2` → `ROLLBACK_HIDDEN / V6_PROFILE_QA_IK_CLEANROOM_PHOTO_COLUMN_2026_08_21`, hidden and preserved.

Decision: `IP ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Learning

The locally verified principle is that when a print page has two legitimate photo beats separated by a shallow text bridge, a false section break can sometimes be removed by advancing the second existing photo and keeping the intervening copy compact. Do not automatically move copy onto the image: the rejected overlay variant showed that photo continuity is not worth sacrificing text contrast.
