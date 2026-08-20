# Rurubu WEDDING V6 — HU Q&A rule subtraction QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Visible problem

HK Q&A had a strong photo-led hierarchy, but four thin separator/binding rules remained from earlier iterations. At actual size they were no longer required for Q01→Q06 reading order and preserved a residual worksheet/UI feel.

## Bounded test

Rollback-safe HU `2044:2` from HK `2027:2`.

Hidden only:
- `DECOR / QA_Q02_Q03_PHOTO_BINDING_NAVY`;
- `DECOR / QA_SUPPORT_MAGENTA_RULE`;
- `DECOR / QA_LAST_TWO_YELLOW_RULE`;
- `DECOR / QA_Q01_PHOTO_BINDING_MAGENTA_RULE`.

Kept because they still perform real contrast/category work:
- yellow Q&A section kicker field;
- cyan hero-photo caption field.

No text, answer copy, image geometry, image hash, or photo role changed.

## Three-scale evidence

- whole spread: HU visually preferred to HK;
- reading/page scale: Q01→Q06 hierarchy remains clear without the four rules;
- actual-size Q&A `2044:49 / 794×1123`: PASS;
- visible native text: `29`;
- text collisions: `0`;
- 18px safe-area risks: `0`;
- page-level stray text: `0`;
- visible replaceable photo roles: `2`;
- hero/support image hashes unchanged.

## Decision

`HU ADOPTED / VERIFIED_LOCAL`

- preferred spread: `2044:2 / PREFERRED / V6_PROFILE_QA_HU_RULE_SUBTRACTION_2026_08_20`;
- Q&A page: `2044:49 / PAGE / QA_EDITORIAL_HU_RULE_SUBTRACTION`;
- HK `2027:2` preserved hidden as rollback;
- V7 untouched / HOLD.

## Asset lifecycle state

- generated: `0`;
- adopted generated: `0`;
- new Drive saves: `0`;
- new binary placements: `0`;
- new image hashes: `0`;
- native text preserved: YES;
- replaceable photos preserved: YES.
