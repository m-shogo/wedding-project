# Rurubu WEDDING V6 EU — 1DAY lower editorial feature QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Preferred EQ `1803:2` had a strong photo-led upper half and a readable route page, but the lower half of the left page still read as a small `POINT + TRIP DATA` utility block floating in unused cream space. At same-scale six-spread review, it was the most obvious remaining template-like region.

## Hypothesis

The defect did not require another photo or card. The existing point copy and trip data could carry more editorial responsibility if their scale and spatial hierarchy were strengthened, while preserving native text and all existing replaceable photo roles.

## Bounded experiment

Created rollback-safe EU `1818:2` from EQ.

Changed only the lower left-page editorial hierarchy:

- added a large native `01` as a POINT anchor;
- strengthened native `寄り道、歓迎。` hierarchy;
- enlarged and reorganized the existing TRIP DATA values;
- added a native closing line `予定どおりじゃない時間も、旅の一部。` with small editorial metadata;
- preserved hero photo, right-page photos, route copy, image hashes and replaceable photo structure.

No new generated asset, raster, Drive save or binary placement was used.

## Rejection / repair evidence

Initial structure audit found two real native-text contacts:

1. `TEXT / PLAN_NOTE_TITLE` vs `TEXT / PLAN_NOTE`;
2. closing quote vs closing metadata.

The candidate was not promoted in that state. The point kick width and closing metadata position were corrected, then structure QA was rerun.

## Three-scale evidence

- whole spread 1000px: PASS and visibly stronger than EQ;
- left page actual-size `1818:3` at 794×1123: PASS;
- structure after repair: left visible native text 23, right visible native text 25;
- left text collision 0; right text collision 0;
- left 18px safe-area risk 0; right 18px safe-area risk 0;
- left IMAGE roles 1; right IMAGE roles 4; image sources unchanged.

## Adoption

- EU `1818:2` → `PREFERRED / V6_INSIDE_EU_1DAY_LOWER_EDITORIAL_FEATURE_2026_08_19`;
- EQ `1803:2` → hidden rollback;
- Start Here `845:27` updated to `... + EU 1DAY PLAN · V7 HOLD`.

Status: `VERIFIED_LOCAL`.

## Asset lifecycle state

- generated: 0
- adopted generated: 0
- Drive writes: 0
- external binary placements: 0
- new image hashes: 0
- native editable copy preserved: YES
- replaceable photos preserved: YES
- rollback preserved: YES
- V7 touched: NO

## Completion boundary

EU is a verified dummy-design study, not print-ready. Final photography/copy, imposition, printer template, bleed/trim/fold, PDF preflight and physical proof remain separate gates.
