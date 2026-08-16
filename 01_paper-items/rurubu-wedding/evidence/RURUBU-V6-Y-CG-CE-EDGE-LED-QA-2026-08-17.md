# Rurubu WEDDING V6 — Y + CG/CE Edge-led Q&A QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

## Result

`VERIFIED_LOCAL / CG_PROMOTED / CF_ROLLBACK_PRESERVED / V7_UNTOUCHED / NOT_PRINT_READY`

Preferred live set after this pass:

- Outer Y `1542:2` — unchanged.
- Profile/Q&A CG `1545:2` — promoted as `PREFERRED / V6_INSIDE_CG_EDGE_LED_QA_2026_08_17`.
- Story/chronology CE `1535:78` — unchanged.
- Previous Profile/Q&A CF `1538:2` — hidden rollback.

## Visible problem

CF was structurally safe but its Q&A page still read as a cream information rail plus two separately framed photos. At whole-spread scale the white photo borders and detached placement preserved a template/form feeling instead of a continuous travel-magazine page.

## Root-cause hypothesis

The page did not need more cards or new generated decoration. The existing verified photo roles were strong enough, but their visual mass was underused. Letting the two photos become edge-led page fields, while keeping the six questions as native editable text in one narrow asymmetric interview rail, should create stronger editorial continuity.

## Bounded test

CG duplicated CF and changed only the Q&A page:

- hero photo `e3738476f760932bb5b09c9d60f174dd6c84049d` enlarged to about `493.7×482` and moved to the right edge;
- support photo `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` enlarged to about `463.7×392` and moved to the lower-right edge;
- both white 6px photo strokes were removed;
- existing composed route texture `691a6ceed471a5d8efa144052a10564eed177b4f` was reduced to `20%` opacity and kept bounded to the question rail;
- 01 and 04 remained dominant native-number beats; 02/03/05/06 remained compact support beats;
- all questions and answers remained native text;
- no new raster source, card system, shadow, gradient or generated asset was introduced.

The first CG pass exposed one real collision between the page deck and the cyan `MEMORIES FROM OUR JOURNEY` caption. The candidate was not promoted in that state. The caption was moved into the hero-photo field and re-QA'd.

Q4 was also visually too large at actual size. Its native question size was reduced from 26px to 21px and the answer position was corrected before promotion.

## Three-scale evidence

- whole spread / 500px: PASS; CG reads more photo-led than CF and the right page no longer looks like two bordered cards.
- reading / 1200px spread: PASS; interview rail, hero image and lower memory image retain a clear hierarchy.
- actual-size Q&A / 794×1123: PASS after caption and Q4 corrections.

## Structure evidence

Profile page retained from CF:
- native text: `18`;
- IMAGE roles: `4`;
- absolute text collision: `0`;
- 18px text safe-area risk: `0`.

Q&A CG:
- native text: `26`;
- visible IMAGE fills: `3` (`2` replaceable photos + `1` composed texture);
- absolute text collision: `0`;
- 18px text safe-area risk: `0`;
- hero photo hash unchanged: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- support photo hash unchanged: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- route texture hash unchanged: `691a6ceed471a5d8efa144052a10564eed177b4f`.

## Asset lifecycle truth

- new ImageGen output: `0`;
- new Drive save: `0`;
- new external binary placement: `0`;
- image hashes changed: `0`;
- existing verified photo roles recomposed: `YES`;
- native variable copy preserved: `YES`;
- replaceable photo semantics preserved: `YES`;
- generated section master newly adopted: `NO`;
- rollback preserved: `YES`;
- V7 edited: `NO`.

## Adoption decision

CG is adopted over CF for V6 dummy-design study because it improves the page at thumbnail, reading and actual-size scales without reducing text editability or image replacement resilience.

This is not a print-ready declaration. Final legitimate photography, final copy stress, exact printer template, PDF preflight and physical proof remain open.
