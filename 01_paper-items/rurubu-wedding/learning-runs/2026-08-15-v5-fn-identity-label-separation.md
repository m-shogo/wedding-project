# 2026-08-15 — V5 FN identity-label separation

Scope: Rurubu WEDDING only.

## Visible problem

FM removed the unsafe recognizable-person imagery, but the native `SHOGO` / `SHI-CHAN` names were still overlaid directly on the replacement non-person atmosphere photos. At reading/detail scale that could still imply the raster depicts that named person.

## Root-cause hypothesis

Image-role safety is communicated by composition as well as metadata. A correct non-person source can regain person-like semantics if a real-person name is placed as a direct photo label.

## Bounded test

Created rollback-safe FN `1199:2` from FM without changing any raster hashes or factual copy.

- moved native `SHOGO` and `SHI-CHAN` out of the photo fields and onto the cream profile information plane;
- changed their text color from white photo-overlay treatment to deep navy editorial identity type;
- reflowed only the nearby native profile metadata/detail positions;
- kept the non-person profile image roles unchanged:
  - A hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
  - B hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- added no card, badge, shadow, gradient, generated asset, or external binary.

## Regression found and fixed

Initial FN structure QA found one absolute text-box overlap: `IA_PROFILE_A_META × IA_PROFILE_A_NAME`, overlap y=6px. The candidate was not promoted in that state. A-meta/detail were moved down, then structure QA was rerun.

## Evidence

- 500px inside spread: PASS; the names read as information labels rather than image captions.
- actual-size left page 794×1123: PASS.
- final visible native text: 52.
- visible IMAGE fills: 6.
- absolute text intersections: 0.
- 18px text safe-area risks: 0.
- fold unchanged.

## Result

FN promoted to `BEST_CLEANROOM_INSIDE_FN_IDENTITY_LABEL_SEPARATION_2026_08_15`.

FM preserved as hidden rollback. Current `77:18 / 77:290` remained untouched. Start Here reconciled to `FL outer / FN inside`.

## Reusable lesson

For a real-person semantic role, replacing an unsafe portrait with non-person imagery is necessary but not always sufficient. Also audit **label-to-image attachment**: a real name directly over a non-person raster can accidentally re-personify the image. Separate identity type from atmosphere imagery unless the photo identity is verified.

Status: `VERIFIED_LOCAL`, refinement evidence for RSL-011.

V5 complete: NO. V6 production started: NO.