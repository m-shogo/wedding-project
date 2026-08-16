# 2026-08-17 — Rurubu V6 Y + CF/CE feedback

## Source problem

Outer W's back cover was technically sound but still read as a strong upper image plus a detached lower chronology/info field. This made the back feel quieter and more template-like than the front and the preferred interior spreads.

## Root-cause hypothesis

The page-binding role of the existing cafe/memory photograph was too weak. Increasing legitimate photographic mass and attaching the memory headline directly to it should reduce the false section break without adding another card or generated ornament.

## Bounded experiment

- duplicate Outer W as rollback-safe Outer Y;
- enlarge only the existing verified cafe role;
- retain skyline near intrinsic size and create energy through overlap/rotation instead of enlargement;
- bind the native `みんなとの思い出` section to the photo;
- tighten the native chronology beneath it;
- keep the WEDDING terminal as final destination;
- do not alter CF/CE or V7.

## Expected improvement

More continuous back-cover reading and stronger consistency with the photo-led front/interior pages.

## Regression risk

- source softness from enlargement;
- timeline/title contrast failure on the photo edge;
- text collision from chronology compaction;
- low-resolution skyline enlargement.

## Evidence / result

Initial Y study failed actual-size review because `ふたりの旅年表` entered the enlarged cafe photograph. The photo was shortened from `552×344` to `552×320`, memory strip/title moved with it, and chronology start was returned fully to the cream field.

Final:
- whole-item 500px: PASS and preferred over W;
- back actual-size 794×1123: PASS;
- text collision 0;
- 18px safe-area risk 0;
- flatlay/cafe/skyline all within intrinsic dimensions;
- no new image hash or raster source;
- CF/CE unchanged;
- V7 untouched.

## Adopted / rejected

- ADOPTED: Outer Y `1542:2`.
- ROLLBACK: Outer W `1491:2` hidden.
- First Y geometry with chronology-on-photo overlap: REJECTED and corrected before promotion.

## Next application

Continue V6. Do not use new ornament merely to increase density. The largest remaining visual lever is final legitimate photography and final-copy replacement followed by fresh crop/contrast/long-copy QA.
