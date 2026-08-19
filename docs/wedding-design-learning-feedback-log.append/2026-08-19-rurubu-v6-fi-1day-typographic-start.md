# Rurubu V6 FI — 1DAY typographic-start feedback

Date: 2026-08-19
Scope: Rurubu WEDDING only

## Visible problem

FA's 1DAY right page remained slightly modular because STOP01 still had its own small skyline photo, giving all four stops photo-attached treatment and repeating a limited image source.

## Experiment

Rollback-safe FI `1863:18` hid only STOP01's skyline photo and promoted the existing native `10:00` into the visual opening beat. STOP01 title/copy/meta remained native; STOP02/03/04 photos and hashes were unchanged.

## Expected improvement

Reduce repeated-photo mass and equal-module rhythm while retaining route clarity and editability.

## Regression risks checked

- dead cream space after photo removal;
- timetable/UI feeling from enlarged time;
- text collisions;
- trim/safe-area pressure;
- stray node containment;
- accidental changes to remaining photo hashes.

## Result

Adopted. FI reads more like a magazine itinerary opening than FA while preserving chronology. The removed support photo was not needed for destination proof because the spread already has a dominant waterfront photograph.

Three-scale evidence:
- 900px whole: PASS;
- 1200px whole: PASS;
- right `1863:49` actual-size 794×1123: PASS;
- native right-page text 25;
- collisions 0;
- 18px safe-area risks 0;
- visible page-level STOP strays 0.

State distinction:
- generated: NO;
- Drive saved: NO;
- newly placed binary: NO;
- adopted in Figma: YES;
- visually verified: YES;
- locally verified learning: YES;
- cross-item verified: NO.

Next application: continue same-scale V6 review; reduce photo repetition only where the photo is not essential evidence, and do not substitute semantically unrelated imagery merely to improve diversity counts.
