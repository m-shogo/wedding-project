# Rurubu WEDDING — C6D reverse microcopy / print-production learning

Date: 2026-08-24

## What new knowledge changed the decision

This run rotated from recent content-truth, photo-sequence and navigation studies into print-production behavior: trapping, overprinting, knockout/reverse type and registration tolerance.

The live V7 C6C screenshot was not visually broken, but its `12.5 px` regular-weight white deck on a saturated cobalt field represented a different production risk from ordinary dark text on cream. Instead of styling the cobalt panel further, the decision changed to test whether the same semantic role could become more print-robust without disturbing hierarchy.

## Experiment

C6C `2409:2` → C6D `2413:2`.

Only `TEXT / V7_INSIDE_DECK` changed:
- `12.5 px → 14 px`;
- copy unchanged;
- Noto Sans JP Regular unchanged;
- line-height `21 px` unchanged;
- box/position/color unchanged.

## Result

- 500 px: PASS;
- 1400 px: PASS and clearer;
- 1587×1123: PASS for DESIGN QA;
- text collisions `0`;
- edge risks `0`;
- Japanese font mismatch `0`;
- current-root overlap `0`.

C6D promoted as current V7 1DAY candidate. C6C preserved as hidden rollback.

## Important boundary

This is **not** evidence that `14 px` is print-safe or a universal minimum. Exact press, paper, color separation, trapping/RIP and physical proof remain unknown. The learning therefore remains `TESTED_LOCAL / PRINT-PROOF-BLOCKED`.

The productive change in judgment was: screen readability is not the final authority for small reverse process-color text.

## Asset / scope truth

No image generation, Drive write, new master, image hash, photo/crop, V6 or V8 production change occurred.
