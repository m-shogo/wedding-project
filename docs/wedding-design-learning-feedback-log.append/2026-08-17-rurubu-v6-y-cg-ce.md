# Rurubu V6 Y + CG/CE feedback — 2026-08-17

Scope: Rurubu WEDDING only. V7 untouched.

## Observed

Profile/Q&A CF was technically safe but the Q&A page still looked like a cream template with two independently framed photo cards. The border treatment and detached image placement weakened the intended travel-magazine continuity at whole-spread scale.

## Root-cause hypothesis

The page needed stronger use of existing photography, not another decorative system. Existing verified photo roles could act as page fields if their non-functional white borders were removed and the interview copy remained a narrow native-text rail.

## Tested local

Created rollback-safe CG `1545:2` from CF `1538:2`.

Changed only Q&A composition:
- larger hero and support photographs, both still replaceable;
- photographs moved to the right edge and white 6px strokes removed;
- existing composed route texture reduced and kept in the question rail;
- 01 and 04 preserved as major interview beats;
- all six questions/answers remained native text.

Initial CG was rejected as-is because the cyan image caption collided with the page deck. The caption was moved into the hero field. Q4 also wrapped too aggressively at actual size, so its native question type was reduced from 26px to 21px and the answer was repositioned.

## Expected improvement

A stronger photo-led magazine page, less form/card reading, preserved copy editability and preserved image replacement resilience.

## Regression risk

Narrower native-text columns need new long-copy stress when final answers arrive. Larger photos expose source quality more strongly. Border removal must remain conditional on the border having no real binding/print function.

## Evidence

- whole spread 500px: PASS;
- spread 1200px: PASS;
- Q&A actual-size 794×1123: PASS;
- Q&A native text: 26;
- visible IMAGE fills: 3 (2 replaceable photos + 1 composed texture);
- absolute text collisions: 0;
- 18px text safe-area risks: 0;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- preferred: CG `1545:2`;
- rollback: CF `1538:2` hidden;
- evidence file: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CG-CE-EDGE-LED-QA-2026-08-17.md`.

## Status

`VERIFIED_LOCAL / ADOPTED_CG / ROLLBACK_PRESERVED / NOT_PRINT_READY`

## Rurubu-specific boundary

Exact photo dimensions, rotations, question hierarchy, colors and Rurubu-like editorial grammar remain item-specific.

## Next application

Keep Outer Y and Story/chronology CE unchanged unless live comparison identifies a stronger concrete defect. For CG, the next required proof is final-real-copy stress when actual Q&A wording arrives; do not reuse dummy-copy safety as final-copy evidence.
