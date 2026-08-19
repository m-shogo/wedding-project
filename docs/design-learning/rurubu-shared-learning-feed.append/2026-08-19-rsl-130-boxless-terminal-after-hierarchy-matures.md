# RSL-130 — Re-test a terminal container after surrounding hierarchy matures

Date: 2026-08-19
Source scope: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Failure fingerprint: `MATURE_EDITORIAL_HIERARCHY_WITH_STALE_TERMINAL_CONTAINER`

## OBSERVED

FQ chronology used photo-led/native-type hierarchy for the main journey, but its final WEDDING event still used a full-width dark container inherited from an earlier stage. At same-scale review the container looked more like a timeline/footer UI module than a final travel-magazine beat.

A separate authority observation in the same run found the six preferred review spreads split across two Figma pages despite a GitHub claim that they formed one live 3×2 board. That drift is an instance of the already-known F-10 authority-drift family, not a new visual rule.

## ROOT_CAUSE_HYPOTHESIS

A container can be useful when hierarchy is weak, but become redundant after surrounding native typography, spacing, numbering and photo responsibility mature. If the old container remains by inertia, it can reintroduce UI-like containment even though the page no longer needs it for contrast or grouping.

## TESTED_LOCAL

Rollback-safe FR duplicated FQ. Test was strictly bounded to the WEDDING endpoint:

- hide the full-width navy terminal field;
- retain a thin yellow terminal rule;
- preserve `06 / 2026.10.24 / WEDDING / closing copy` as native text;
- change box-dependent white text to dark navy on cream;
- add a small native magenta final-destination kicker;
- no photo, raster, generated asset, or image-hash changes.

Expected improvement: keep final-event dominance but remove the last UI-like module.

Regression risk: weakened closure/contrast, dead bottom space, safe-area pressure.

## VERIFIED_LOCAL

Three-scale evidence:

- whole/thumbnail: PASS; FR reads more consistently with the rest of the chronology than FQ;
- reading scale: PASS; 05 → terminal rule → WEDDING remains clear;
- actual `794×1123`: PASS; terminal copy remains legible and optically intentional.

Structure evidence:

- FR `1904:18`; chronology right `1904:44`;
- visible native text `32`;
- absolute text collisions `0`;
- 18px safe-area risks `0`;
- candidate page-level stray `0`;
- visible IMAGE roles `3`; hashes unchanged;
- FQ `1898:125` preserved hidden as rollback.

Drive evidence:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read;
- generated Profile/Q&A/Timeline/Memories masters still present and unadopted;
- Drive write `0`.

GitHub evidence:

- start main `bd8fde3e88d78dc29778192638c4ec2e9595cb7a`;
- dedicated FR QA evidence + feedback + Current Status update committed together after live Figma verification.

## Review-board authority repair

After FR adoption, FO/FP/FR were reparented into `845:2 / 00_RURUBU_START_HERE`. Fresh readback verified all six preferred spreads now truly share one 3×2 board. This does not promote a new learning state; it closes a repeated F-10 authority-drift instance.

## What must remain Rurubu-specific

Do not transfer:

- the exact cream/navy/magenta/yellow palette;
- `FINAL DESTINATION / 06` wording;
- WEDDING endpoint typography;
- chronology coordinates, numbering or page structure;
- any Rurubu photography or generated assets.

## Cross-item applicability

Candidate judgment only:

> When a mature editorial layout still contains a large terminal or section container, re-test whether that container still performs an indispensable contrast/grouping/physical job. If direct native hierarchy preserves legibility, semantic binding and closure at whole/read/actual scales, subtraction may improve editorial authenticity.

Do not interpret this as `remove all boxes`. A container that still provides necessary contrast, grouping, physical-paper semantics, or variable-copy protection remains valid.
