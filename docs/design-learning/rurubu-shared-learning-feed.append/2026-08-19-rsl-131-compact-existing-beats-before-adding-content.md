# RSL-131 — Compact existing strong beats before adding content to dead fields

Date: 2026-08-19
Source scope: Rurubu WEDDING V6
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Failure fingerprint: `DEAD_FIELD_BETWEEN_VALID_EDITORIAL_BEATS`

## OBSERVED

Memory Spots EW right page had valid Spot 03 and Spot 04 content, but too much vertical cream separation made them read as disconnected modules. The temptation was to fill the field with another photo, decorative object or helper block.

In the same run, Cafe/Table FS tested the opposite treatment too aggressively: a small source-safe 02 photo and its copy were bound more tightly, but the result became cramped and weaker than the existing preferred.

## ROOT_CAUSE_HYPOTHESIS

An apparently empty field can have different causes:

1. two already-strong editorial beats are spaced too far apart, creating accidental dead space; or
2. a small/support role genuinely needs breathing room, and compressing it creates congestion.

The correct method is to test cadence before adding content, then reject compression when the local role becomes crowded.

## TESTED_LOCAL

Rollback-safe FT duplicated EW. Bounded change only:

- moved Spot 03 photo + native number/title/copy/meta upward without resizing or changing hash;
- moved Spot 04 dining feature and its native title/copy/label upward;
- moved the existing CHECK guide block upward proportionally;
- added no card, raster, generated asset, photo, hash or factual copy;
- preserved the entire left page.

Expected improvement: continuous `03 → 04 → CHECK` travel-guide flow and less accidental cream dead field.

Regression risk: compressed copy, lost separation between places, safe-area pressure, collision.

Counter-test FS on Cafe/Table attempted stronger local photo/copy binding. It became cramped at whole-spread scale and was rejected/hidden.

## VERIFIED_LOCAL

FT evidence:

- whole / 500px: PASS;
- reading / 1200px: PASS and stronger than EW;
- actual right `1912:24` = `794×1123`: PASS;
- first structural pass caught a 2px Spot 03 number/title overlap; corrected before promotion;
- final left/right native text `12 / 14`;
- final absolute text collisions `0 / 0`;
- final 18px safe-area risks `0 / 0`;
- all four image hashes unchanged and remain independent replaceable roles.

Figma:
- FT `1912:2` adopted;
- EW `1826:18` hidden rollback;
- FS `1909:2` hidden rejected comparison.

Drive:
- Rurubu V6 root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read;
- Drive write `0`;
- generated section masters remain stored/unadopted.

GitHub:
- evidence `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FT-MEMORY-SPOTS-COMPACT-FLOW-QA-2026-08-19.md`;
- feedback `docs/wedding-design-learning-feedback-log.append/2026-08-19-rurubu-v6-ft-memory-spots-compact-flow.md`.

## What must remain Rurubu-specific

Do not transfer:

- exact Spot 03/04 positions;
- cream/navy/magenta/yellow palette;
- Yokohama photography;
- Memory Spots page role;
- exact spacing values or copy.

## Cross-item applicability

Candidate method only:

> When a print artifact has an empty field between two already-valid content beats, first test a rollback-safe cadence compression before adding another image/card/decoration. Adopt only if whole/read/actual scales preserve breathing room, semantics, source fidelity and variable-copy safety.

The FS counterexample is part of the rule: compacting a support role can be worse than leaving breathing room. Do not interpret this as `reduce all whitespace`.

## Next receiving-item experiment

A materially different wedding print artifact may test this method when fresh screenshot evidence shows accidental dead space between already-strong regions. Do not copy Rurubu geometry or editorial treatment.