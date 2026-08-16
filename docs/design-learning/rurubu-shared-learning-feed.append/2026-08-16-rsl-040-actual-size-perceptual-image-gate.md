# RSL-040 — Intrinsic-safe does not mean visually sharp; actual-size perceptual QA still gates photo adoption

Date: 2026-08-16
Source scope: Rurubu WEDDING / V6 Q&A BB
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The BA Q&A hero was structurally correct and technically inside its intrinsic source size:

- display `465×480`
- source `732×498`

However, actual-size `794×1123` review still showed perceptual softness in the dining image relative to the native typography and surrounding photographs.

## ROOT_CAUSE_HYPOTHESIS

Intrinsic pixel dimensions only prove that a role is not being enlarged beyond the source canvas. They do not prove that the source itself is crisp enough for the final role. Source blur, compression, lens softness, focus, contrast, and crop character can still make an intrinsic-safe image look weak at actual use size.

Therefore the image-quality gate should be:

`intrinsic/display check → actual-size perceptual sharpness + semantic-fit check → adoption`

rather than treating intrinsic safety as completion.

## TESTED_LOCAL

Rollback-safe BB `1415:2` cloned BA with one bounded change only:

- kept the Q&A hero role at exactly `465×480`;
- kept the same native text, question geometry, masks, support photo and closing copy;
- replaced only the hero IMAGE fill with an already verified Rurubu travel-flatlay source:
  - hash `e3738476f760932bb5b09c9d60f174dd6c84049d`
  - intrinsic `944×608`.

No new generation, Drive write, binary upload, decoration, card, shadow or gradient was introduced.

## Expected improvement

- increase actual-size edge clarity;
- improve travel-information-magazine semantic fit through camera/map/travel-object imagery;
- preserve replaceability and all successful BA text geometry.

## Regression risk

- a sharper image can still be semantically worse;
- repeated use of one dummy photo may become visible across a study;
- object photography can feel less personal than a real memory photograph.

Therefore this is not a rule to always choose the numerically sharper source. Visual and semantic comparison remains required.

## VERIFIED_LOCAL evidence

BA dining hero:

- geometry/intrinsic gate: PASS
- actual-size hierarchy: PASS
- actual-size perceptual sharpness: weaker than surrounding page.

BB travel-flatlay hero:

- display `465×480`
- intrinsic `944×608`
- intrinsic gate: PASS
- 500 px whole-spread screenshot: PASS
- 794×1123 actual Q&A screenshot: PASS
- native text geometry unchanged from BA
- text/text collision `0`
- 18 px safe-area risk `0`
- replaceable image role preserved.

Decision:

- `BB > BA` for the current dummy-design study.
- BA preserved as hidden rollback.

GitHub evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-P-BB-AZ-PHOTO-TYPE-QA-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-P-BB-AZ-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## What must remain Rurubu-specific

Do not transfer:

- exact image hash;
- flatlay/camera/map subject matter;
- 465×480 geometry;
- Q&A layout;
- Rurubu palette and editorial voice.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> After an intrinsic/display-size gate passes, review the image at actual use size for perceptual sharpness and semantic fit. If the source remains visibly weak, first test a stronger source inside the same replaceable role before redesigning the surrounding layout.

Receiving items must verify the principle in their own context before adoption.
