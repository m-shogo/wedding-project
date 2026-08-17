# RSL-083 — Subtraction can reveal when native hierarchy, not decoration, is missing

Date: 2026-08-18
Source scope: Rurubu WEDDING V6 Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

In preferred DH, Q04 was structurally correct and editable but still read as a quiet form item floating in the cream field beside the second photo. A bounded route texture occupied part of the area, but the core hierarchy problem remained.

## Root-cause hypothesis

The weak region did not need more ornament. It needed Q04 to become a deliberate semantic feature beat. Removing the route texture would reveal whether the texture was doing useful binding work or merely masking insufficient typography.

## Bounded tests

### DI — subtraction-only control

- hid the composed Q&A route texture;
- preserved all photos, hashes, copy and geometry otherwise.

Expected improvement: less scrapbook/template atmosphere.

Actual result: the page became cleaner but Q04 became too quiet and visually stranded. `REJECTED`.

### DJ — native hierarchy after subtraction

- kept the route texture removed;
- promoted Q04 ordinal/question scale using native text only;
- retained native auto-height answer behavior;
- added a small native editorial kick;
- added no new decoration geometry, raster, generated asset or photo.

Expected improvement: restore editorial energy through semantic hierarchy rather than ornamental fill.

Actual result: whole-spread and actual-size review both improved; Q04 reads as a purposeful second feature beat. `VERIFIED_LOCAL`.

## Regression risk and QA

Risks:

- larger variable question could wrap into its answer or adjacent content;
- subtraction could make the spread too empty;
- added type hierarchy could overpower Q01 or the photography.

Evidence:

- preferred DJ `1640:2`;
- Q&A actual-size `1640:42`, 794×1123 PASS;
- hidden realistic-copy proof `1641:2` PASS;
- text collisions 0;
- 18px text safe-area risks 0;
- long Q04 question height 112px and answer height 56px remained collision-free.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AD-DJ-DE-QA-NATIVE-Q04-FEATURE-2026-08-18.md`.

Drive state:

- V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read live;
- no new Drive write.

## What remains Rurubu-specific

Do NOT transfer:

- Q04 wording;
- `NEXT TRIP / FEATURE` wording;
- magenta/cyan/yellow/navy palette;
- exact font sizes;
- coordinates;
- photographs;
- the Rurubu Q&A composition.

## Cross-item applicability hypothesis

Potentially transferable principle only:

> When removing a low-value decorative layer makes a repeated-information region too quiet, do not automatically restore decoration. First test whether a semantically important native-text role can carry the missing hierarchy by itself, then stress-test realistic copy at actual size.

This remains a hypothesis outside Rurubu until independently reproduced.