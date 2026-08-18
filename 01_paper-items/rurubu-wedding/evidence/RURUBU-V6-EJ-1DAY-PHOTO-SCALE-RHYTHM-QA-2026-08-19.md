# Rurubu WEDDING V6 — EJ 1DAY Photo Scale Rhythm QA

Date: 2026-08-19
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Source preferred: EI `1752:2`
Adopted candidate: EJ `1784:2`
Right page: `1784:29`

## Visible problem

EI had already removed the old route rail/markers, but the four right-page photos still read as a repeated vertical module stack. The information hierarchy was correct, yet the page still looked closer to a sequence of placed rectangles than to a Japanese travel-magazine photo diary.

## Root-cause hypothesis

The remaining template feeling came from insufficient scale contrast between otherwise legitimate replaceable photo roles. Stronger variation in photo size, position and light rotation could improve editorial rhythm without adding cards, decoration, generated assets or new photography.

## Bounded test

A rollback-safe duplicate was created from EI. Only the four existing right-page photo geometries and the positions of their already-native stop copy were changed.

- STOP 01 skyline stays small/supportive.
- STOP 02 cafe becomes the largest middle-page photo beat.
- STOP 03 street stays a narrower bridge image.
- STOP 04 dining becomes the closing wide feature.
- All `01–04`, time, title, copy and metadata remain native Figma text.
- All four photos remain independent replaceable IMAGE roles.
- No image source/hash, facts or final copy changed.

The first geometry enlarged the small skyline beyond its known source width. That state was not adopted. STOP 01 was corrected to `238×210`, within the verified ~`240×220` skyline source.

## Expected improvement

Reduce repeated-module reading, strengthen the photo-led travel-diary rhythm, and preserve clear 10:00 → 12:30 → 16:00 → 19:00 order without restoring a route UI.

## Regression risk

- rotated/enlarged photos can intrude into native copy;
- visual enlargement can exceed intrinsic source size even when the screenshot looks acceptable;
- too much overlap can obscure route order.

## Three-scale evidence

- whole spread / ~700px comparison: EJ stronger than EI; PASS;
- reading / ~900px whole spread: PASS;
- actual-size right page `794×1123`: PASS.

Final right-page structure:

- native visible text: `25`;
- replaceable photos: `4`;
- absolute text collisions: `0`;
- 18px text safe-area risks: `0`.

Final photo geometry:

- STOP 01 skyline: `238×210`, rotation ≈ `+1.2°`;
- STOP 02 cafe: `388×270`, rotation ≈ `-2.1°`;
- STOP 03 street: `277×220`, rotation ≈ `+1.1°`;
- STOP 04 dining: `420×242`, rotation ≈ `-1.0°`.

## Adoption / rollback

- EJ `1784:2`: `PREFERRED / V6_INSIDE_EJ_1DAY_STRONGER_PHOTO_SCALE_RHYTHM_2026_08_19`;
- EI `1752:2`: retained as hidden rollback;
- Start Here `845:27` updated to `+ EJ 1DAY PLAN`;
- V7 untouched.

## Asset lifecycle truth

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- image source changes: `0`;
- native variable text preserved: `YES`;
- replaceable photo roles preserved: `YES`.

Drive authority was re-read before status synchronization:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Result

`VERIFIED_LOCAL` and adopted. EJ improves travel-magazine photo rhythm without new decorative containment or source substitution. V6 remains `NOT_PRINT_READY` until final photography/copy, imposition, printer template, PDF preflight and physical proof are verified.
