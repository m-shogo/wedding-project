# 2026-08-19 — Rurubu V6 FT Memory Spots compact-flow experiment

Scope: Rurubu WEDDING only
Status: adopted after three-scale QA

## Visible problem

EW Memory Spots right page contained too much cream separation between Spot 03 and the dominant Spot 04 dining feature. At whole-spread scale the reading path broke into separate modules.

## Principle/capability tested

Test whether vertical cadence can be improved by compacting already-valid photo + native-text beats before adding new imagery, cards or decorative assets.

## Bounded change

FT duplicated EW. Spot 03 photo/copy and Spot 04 dining feature + guide information were moved upward; image dimensions and hashes were unchanged. No new generated/composed asset was introduced.

## Expected improvement

More continuous `03 → 04 → CHECK` travel-guide flow, less dead cream space, stronger photo-led magazine density.

## Regression risk

Over-compression could create text collisions, make Spot 03 cramped, or weaken the breathing space that separates distinct places.

## Evidence

- 500px whole: PASS;
- 1200px spread: PASS;
- right page actual-size `794×1123`: PASS;
- first structure check caught a 2px `03` number/title overlap; corrected before promotion;
- final left/right absolute text collision: `0 / 0`;
- final left/right 18px safe-area risk: `0 / 0`;
- image hashes unchanged; all 4 photos remain replaceable.

Figma:
- FT `1912:2`, right `1912:24` adopted;
- EW `1826:18` hidden rollback.

Drive:
- root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read;
- new Drive write `0`.

GitHub evidence:
- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FT-MEMORY-SPOTS-COMPACT-FLOW-QA-2026-08-19.md`.

## Rejected counterexample in same run

Cafe/Table FS `1909:2` tried to bind the source-safe 02 view photo and its title/copy more aggressively. Whole-spread review showed the beat became cramped and visually weaker than FN. FS was renamed `REJECTED_VISUAL` and hidden.

This prevents a false rule such as `always compress/bind local photo-copy clusters`.

## Adopted / rejected status

- FT: `VERIFIED_LOCAL / ADOPTED`;
- FS: `REJECTED`.

## Next application

Continue V6 only. On future dead-space defects, first distinguish between (a) excessive separation between already-strong beats and (b) healthy breathing room around a small role. Compact only the former, and re-run whole/read/actual-size QA after the move.