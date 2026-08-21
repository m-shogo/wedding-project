# Rurubu WEDDING V6 — JC Outer postcard collage QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

After JB promotion, a fresh 500 px preferred-set comparison showed IU Outer as the next macro weakness. Its front cover had a strong full-height Yokohama hero and large native Japanese typography, but the composition still resolved mainly as `masthead → one hero → one lower support photo`, closer to a clean travel brochure than an energetic Japanese travel-information magazine cover.

## Root-cause hypothesis

The remaining weakness was not lack of visual quality in the hero. It was insufficient **photo-role variety** on the front: one dominant full field and one large support block left the middle-right area visually under-articulated. A single smaller, physical-postcard-like city beat could create a deliberate three-scale photo rhythm without restoring a grid/card system.

## Bounded rollback-safe test

- duplicated preferred IU `2124:2` → JC `2148:2`;
- back cover preserved unchanged;
- front hero hash preserved;
- retained dining support, rotated only `1.2°` for asymmetric editorial rhythm;
- added one small photo postcard `2148:108` at roughly `x=1290 y=405 w=255 h=205`, rotation `-2.5°`, using existing verified skyline hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- used a 5 px warm-white stroke as a physical-photo edge, not a rounded UI container;
- moved the existing native `02 出会いから今日まで / ふたりの旅年表` caption onto the skyline postcard;
- widened the existing Feature 01 rule to strengthen the visual handoff toward the new postcard;
- no new copy facts, generated image, shadow, gradient, rounded card, or flattened page.

An initial café-photo version was visually tested at 500 px but rejected because the photo had no coherent semantic relation to Feature 02. The postcard source was switched to the existing skyline image and the existing Feature 02 caption was attached to it before final QA.

## Three-scale evidence

- whole outer / 500 px: PASS; front cover reads more clearly as a layered travel-magazine cover than IU.
- reading / 1400 px: PASS; postcard, hero, and dining support remain distinct in scale and the postcard caption is legible.
- actual spread / native `1587×1123`: PASS; each half is effectively viewed near native page scale and no crop/text failure was observed.

## Structure QA

Final JC readback:

- visible native text nodes: `35`;
- visible IMAGE-fill nodes: `5`;
- text intersections: `0`;
- 18 px text safe-area risks: `0`;
- whole-page flattening: NO;
- native text preserved: YES;
- new postcard image hash: NO; reused existing verified `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- visible image hashes include existing back/hero/dining/masthead plus reused skyline.

## Promotion

- JC `2148:2` → `PREFERRED / V6_OUTER_JC_FRONT_PHOTO_POSTCARD_COLLAGE_2026_08_21`, live `x=272000 y=0`.
- IU `2124:2` → hidden rollback `ROLLBACK / V6_OUTER_IU_FULL_BLEED_EDITORIAL_COVER_2026_08_21`, `x=295500 y=0`.

Decision: `JC ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Asset / Drive evidence

Drive V6 root reverified before promotion:
`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This experiment: generated `0`, adopted generated `0`, Drive saves `0`, derivatives `0`, uploads `0`, new hashes `0`.

## Completion boundary

This is a locally verified dummy-design improvement, not print-ready completion. Final legitimate photos/copy, printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.