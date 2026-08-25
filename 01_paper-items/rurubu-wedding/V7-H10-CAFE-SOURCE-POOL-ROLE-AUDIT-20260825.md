# V7 H10 Cafe/Table — Source-Pool Role Audit

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Production H10: `2467:2`
Photo art-direction authority: `2305:2`

## Why this audit exists

Professional food-editorial research changed the selection question from “is this a good Hawaii photograph?” to “does this photograph perform the exact editorial job required by Cafe/Table?” Food & Wine’s photography issue describes picture editing as a wall-review process in which photographs are judged together for time, place, context and repetition rather than selected only for isolated beauty. The Rurubu-specific hypothesis is therefore: **destination truth is necessary but not sufficient; exact editorial-role truth must also pass.**

## Source pool read

Drive folder: `1A6cea2UHMv3fiZ43PcCCj3BXxXKK-PyV / ハワイ写真`

Audited existing real-photo sources:

`001 / 003 / 004 / 005 / 007 / 010 / 014 / 015 / 016 / 018 / 022 / 023 / 028 / 031 / 035 / 036`

Direct raw review in this pass included `001, 003, 005, 010, 014, 015, 016, 018, 022, 023, 028, 031, 035`; `004 / 007 / 036` already have current Rurubu verified evidence and were included in the pool audit from that authority.

### Observed visual class

The audited pool consists of actual-couple portraiture plus beach / park / waterfront environmental frames. Representative examples include:

- `022.jpg` — vertical couple portrait under tropical tree canopy;
- `023.jpg` — wide environmental couple portrait under tree canopy;
- `028.jpg` — environmental couple portrait with palms / waterfront;
- `031.jpg` and `035.jpg` — broad waterfront/palm environmental portraits;
- `010 / 014 / 015 / 016 / 018` — beach/couple portrait variations;
- `001 / 003 / 005` — beach environmental / close couple variations.

These are legitimate Hawaii/couple images. That does **not** make them legitimate Cafe/Table images.

## H10 live role contract readback

H10 `2467:2` currently contains:

- `2467:3` — `STRUCTURAL PHOTO DUMMY / V7 CAFE DOMINANT / NOT FINAL HAWAII`, `515×565`;
- `2467:10` — `STRUCTURAL PHOTO DUMMY / V7 CAFE TRANSITION / NEXT-SHOP CONTEXT / NOT FINAL HAWAII`, `260×175`;
- `2467:16` — `STRUCTURAL PHOTO DUMMY / V7 TABLE DOMINANT / NOT FINAL HAWAII`, `705×460`.

The existing art-direction brief requires materially different jobs:

1. **Cafe dominant:** appetite + drink/food + table/window light + lived-in local trace;
2. **Transition:** the movement from the pause/table to the next shop/street context;
3. **Table dominant:** food-first shared dining, plate/hands/table/room atmosphere.

## Decision

**REJECT the audited couple/environment pool for H10 production placement.**

Reason: no audited image provides the required food/drink/plate/table/interior/shared-meal evidence. Using a verified Hawaii portrait merely because it is destination-correct would still be semantically wrong for the page role and would create a polished but editorially indefensible spread.

This is not a rejection of those photographs globally. They remain valid candidates for roles whose semantic job is actual couple / Hawaii environment / portrait evidence.

## Figma authority change

Updated `2305:2` only; production H10 `2467:2` remains unchanged.

Added:

- `2523:29 / SOURCE POOL`
- `2523:30 / SOURCE POOL AUDIT / BODY / ROLE-TRUTH GATE`

Hidden rollback before the write:

- `2523:2 / ROLLBACK / V7 CAFE-TABLE PHOTO ART DIRECTION / PRE-SOURCE-POOL-ROLE-AUDIT / HIDDEN`

Root after update:

- `2305:2 / V7 / PHOTO ART DIRECTION / CAFE-TABLE / GENERATION_READY + SOURCE-TRUTH + SOURCE-POOL ROLE GATE / NOT CURRENT / 2026-08-25`
- size `1200×1165`
- parent `2052:2`

## QA

Visual screenshot: PASS at native `1200×1165`.

Structure readback:

- visible text: `28`
- text intersections: `0`
- bottom reserve: `34px`
- rollback: hidden / `x=300000`
- V7/V8 current 12 roots: all parent `2052:2`, visible, pairwise overlap `0`

An initial audit-label geometry produced a label/body intersection; it was corrected immediately by returning the label to the existing 118px semantic-label width. No production spread was affected.

## Failed transport experiments observed in parallel

A separate attempt to make a screen-only Memory candidate from an audited Hawaii source failed atomically twice:

1. `figma.createImage` rejected a derived JPEG as unsupported;
2. a different inline-image attempt failed base64 decoding before mutation.

No current/candidate publication root was created or changed by those failures. Do not retry the same inline-binary method without a material implementation change.

## Learning state

RSL-270:
`F-RSL-270-DESTINATION-TRUE-PHOTO-POOL-IS-SEMANTICALLY-WRONG-FOR-LIVE-EDITORIAL-ROLE`

State: `TESTED_LOCAL (ASSET-AUDIT)`.

Do not promote to `VERIFIED_LOCAL` until a materially different, role-correct Cafe/Table photo set is tested against H10 and improves the spread without source-truth or print regressions.

## Asset truth

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- production H10 photo placement: `0`
- new Figma image hashes adopted into production: `0`
- final photography adoption: `0`

The useful progress is narrower but important: a tempting, destination-correct but editorially wrong asset pool is now explicitly excluded from H10.
