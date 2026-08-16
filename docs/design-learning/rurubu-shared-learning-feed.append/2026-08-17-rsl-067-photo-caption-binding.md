# RSL-067 — Bind photo clusters with native captions before adding decoration

Date: 2026-08-17
Source scope: Rurubu WEDDING / V6 Profile
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## OBSERVED

The CL Profile already had a dominant hero and three asymmetric replaceable snapshots, but the lower cluster still read partly as photographs placed for decoration rather than photographs edited into magazine content.

## ROOT_CAUSE_HYPOTHESIS

A photo cluster can gain editorial meaning from small native metadata captions without adding another container, sticker, raster decoration or UI-like frame.

## TESTED_LOCAL — attempt 1

Rollback-safe CN clone of CL activated the three existing hidden native snapshot-caption roles and placed them over the photographs.

Result: `REJECTED`.

Reason: 9px metadata lost contrast differently on each photo and felt like weak overlay text rather than deliberate magazine captioning.

Failure fingerprint:

`PHOTO_CAPTION_LOW_CONTRAST_OVER_IMAGE`

Stop condition: do not keep changing color/opacity over heterogeneous photo backgrounds unless the photo itself provides a stable text-safe zone.

## TESTED_LOCAL — attempt 2

The same native caption nodes were moved just outside the photo borders onto the cream page:

- `CAFE MEMORY / FAVORITE SCENE`;
- `NIGHT WALK / PHOTO NOTE`;
- `YOKOHAMA / NEXT VIEW`.

No photo geometry, image hash, card, border, generated decoration or Q&A geometry changed.

## Expected improvement

- make each snapshot read as an editorial scene;
- reduce generic collage/template feeling;
- preserve native copy editability;
- preserve independent image replacement;
- increase information-magazine density without adding a container.

## Regression risk

- micro-caption clutter;
- poor actual-size legibility;
- collision with rotated photo bounds or folio;
- treating dummy microcopy as final factual copy.

## Evidence

- Profile actual-size `794×1123`: PASS;
- Profile/Q&A whole spread ~1200px: PASS;
- visible Profile native text `22`;
- text collision `0`;
- 18px text safe-area risk `0`;
- visible overflow `0`;
- all four Profile photo roles intrinsic-safe;
- image hashes changed `0`.

Figma:

- CN preferred `1562:2`;
- Profile page `1562:3`;
- CL `1556:2` preserved as hidden rollback.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CN-CM-PROFILE-CAPTIONS-CHRONOLOGY-QA-2026-08-17.md`.

## What must remain Rurubu-specific

Do NOT transfer the exact English caption wording, exact photo layout, border treatment, colors, positions, or image choices to another item.

## Cross-item applicability hypothesis

When a legitimate replaceable-photo cluster is structurally sound but still feels like a generic collage, a receiving item may test a small native caption immediately outside each photo before adding decorative containers. Actual-size legibility and semantic truth must be independently verified.

## Next receiving-item experiment

Only where a different wedding item already contains a multi-photo cluster, compare `no caption` vs `native caption outside image` in a rollback-safe duplicate. Do not promote to a project-wide visual rule from the Rurubu result alone.