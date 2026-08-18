# Rurubu V6 EH — 1DAY asymmetric photo diary QA

Date: 2026-08-18
State: `VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Source problem

Live preferred EG `1739:2` had correct 1DAY information architecture, native practical metadata and replaceable photography, but the right page still read as four detached rectangular image modules beside a route rail. The visual rhythm remained closer to a layout template than a Japanese travel-magazine photo sequence.

## Root-cause hypothesis

The defect was not missing content or decoration. Repetition came from four photos sharing nearly the same unrotated rectangular treatment. Varied scale and subtle overlap/rotation could restore editorial energy without touching the semantic route structure.

## Bounded test

- Live EG existence and Start Here status were re-read before write.
- EG was cloned rollback-safe as EH `1744:2`.
- Only STOP photo geometry was changed; route rail, numbers, times, titles, copy, practical metadata and image hashes stayed intact.
- The first EH structural audit found STOP03/04 photo bounds touching native copy; this state was rejected.
- Photo positions/sizes were corrected and structural QA rerun.

## Expected improvement

Turn the right page from four stacked image modules into a photo diary/cascade while keeping the model-course sequence immediately scannable and fully editable.

## Regression risk

Rotation can create hidden bounding-box collisions, safe-area violations or make replacement crops fragile. Therefore the candidate required actual-size screenshot review plus text/photo collision QA after geometry changes.

## Three-scale evidence

- whole spread `1744:2`, ~900px: PASS;
- reading comparison: EH visually stronger than EG; photo rhythm is less modular while route readability remains intact;
- right page `1744:29`, actual `794×1123`: PASS;
- native text `25`;
- replaceable photo roles `4`;
- text/text collision `0`;
- unintended text/photo collision `0`;
- 18px text safe-area risk `0`.

## Evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- previous preferred: EG `1739:2`;
- adopted preferred: EH `1744:2`;
- EH right page: `1744:29`;
- Start Here: `845:27`;
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Adoption

EH is preferred. EG is preserved as hidden rollback. V7 was not edited.

## Asset lifecycle

Generated `0`; Drive writes `0`; external binary placements `0`; new image hashes `0`; native text preserved; existing photo roles remain replaceable.
