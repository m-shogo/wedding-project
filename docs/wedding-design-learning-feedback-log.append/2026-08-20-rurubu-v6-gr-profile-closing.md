# Rurubu V6 GR — Profile closing typography

Date: 2026-08-20
Scope: Rurubu WEDDING only

## Visible problem

GN's Profile 03 closing role no longer had a third photo, but the large separated `03`, long vertical rule and widely spaced copy still implied an unfinished third-photo slot.

## Principle tested

Before adding a filler photo, let native typography carry the closing role completely and remove decoration that reinforces the missing-placeholder reading.

## Expected improvement

A visibly complete magazine closing beat with no new photo repetition and preserved editability.

## Regression risk

Japanese title clipping, number/title collision, or insufficient text width after compaction.

## Result

- first GR geometry: rejected because title clipped;
- second geometry: not promoted because structure QA found one number/title contact;
- final GR `1971:2`: adopted;
- 500px whole: PASS;
- 1200px reading: PASS;
- Profile 794×1123: PASS;
- visible native text: 26;
- text collision: 0;
- 18px safe-area risk: 0;
- new image/generated/Drive/binary/hash: 0.

## Next application

Continue judging V6 at equal scale. Treat an intentionally omitted photo as complete only when the remaining native editorial role no longer visually promises an empty image slot.
