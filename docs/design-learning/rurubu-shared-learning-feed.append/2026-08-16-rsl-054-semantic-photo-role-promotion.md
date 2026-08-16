# RSL-054 — Promote an existing photo into the semantic milestone before adding decoration

Source scope/item: Rurubu WEDDING / V6 chronology BX

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The chronology had a visually detached support photo near its title while event 03 itself used a weaker low-resolution photo and its copy occupied a largely empty cream region. The page was already structurally correct but the middle chronology still read partly as layout residue rather than an authored travel-magazine beat.

## Root-cause hypothesis

The defect was not missing decoration. The stronger existing photograph had the wrong semantic role. Reassigning it from generic support to the milestone that needed visual authority could improve continuity while reducing asset count and preserving replaceability.

## Bounded test

On rollback-safe BX `1508:2`:

- repurposed the verified support photo hash `439a719d73f28e8dd2889f2026cccb15f345ec63` as event-03 feature photography;
- display `300×220` against intrinsic `352×368`;
- hid the old weaker event-03 skyline role;
- rearranged 02/03/04 to descend visually into event 05 and the WEDDING terminal;
- added no card, shadow, gradient, generated asset, or new raster bytes.

An initial collision between event-02 copy and the event-03 number was detected and repaired before adoption.

## Expected improvement

Reduce the feeling of text placed into leftover space, bind milestone copy to a meaningful photo anchor, and increase travel-editorial rhythm without decorative accumulation.

## Regression risk

Role reassignment can create semantic mismatch, duplicate a story already told elsewhere, expose insufficient source resolution, or cause copy/photo collisions. Intrinsic-size and three-scale QA remain mandatory.

## Evidence

- whole spread 1200px: PASS and stronger than BV in the 02/03/04 region;
- actual chronology 794×1123: PASS;
- native text `30`;
- visible IMAGE roles `4`;
- final text collision `0`;
- 18px safe-area risk `0`;
- visible image intrinsic violations `0`.

Figma:

- adopted BX `1508:2` / chronology `1508:26`;
- hidden rollback BV `1498:159`.

Drive authority freshly confirmed:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BW-BX-EVENT03-PHOTO-BEAT-QA-2026-08-16.md`

## What must remain Rurubu-specific

Do not transfer the exact chronology geometry, event numbers, travel-photo choices, cream/navy/magenta/cyan/yellow palette, Japanese headline treatment, or wedding terminal design.

## Cross-item applicability hypothesis

When another print artifact has a visually detached support image while a nearby semantic section is weak, independently test whether reassigning that already legitimate image into the semantic role improves hierarchy before generating another asset or adding a container. Transfer the method only; do not copy the Rurubu layout or imagery.
