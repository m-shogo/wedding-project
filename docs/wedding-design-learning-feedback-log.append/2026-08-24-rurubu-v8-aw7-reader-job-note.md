# Rurubu V8 AW7 — design-learning feedback

Date: 2026-08-24
Scope: Rurubu WEDDING only

## New researched knowledge

Interview/profile editorial research shifted the decision from styling a sparse Profile page to asking what information is allowed to establish the subjects' character. Strong interview design can let conversation/portrait material carry identity while typography and supporting copy serve reading.

## Live decision changed by that knowledge

AW5 correctly showed unresolved answers as native `回答待ち`, but still used `違うテンポで、同じ街を楽しむ。`, an unsupported personality/relationship characterization.

Two rollback-safe tests were run:
- AW6: remove the note → REJECTED because quiet space became unfinished absence.
- AW7: replace it with reader-facing editorial copy `答えを重ねて、ふたりの輪郭をたどる。` → ADOPTED.

This is not cosmetic copy polishing. The semantic responsibility changed from “describe the couple without authority” to “describe how this page should be read”.

## Verified result

AW7 `2439:2`:
- 500 / 1400 / 1587×1123 PASS for DESIGN QA
- native text `20`
- IMAGE `1`
- collisions `0`
- 18px edge risk `0`
- Japanese font mismatch `0`
- current V8 root overlap `0`

AW5 `2434:2` is hidden rollback. AW6 `2438:2` is hidden rejected evidence.

## Learning state

No new failure ID. Existing RSL-254 is strengthened by this reproduction. The system should not replace missing real answers with plausible atmospheric characterization.

## Production truth

Image generation `0`; Drive write `0`; new master `0`; new image hash `0`; final photography `0`; V6 change `0`; V7 production change `0`.

V8 remains REAL-CONTENT-BLOCKED and NOT PRINT READY.
