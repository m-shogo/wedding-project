# Rurubu V6 visual feedback — Y + CP/CQ

Date: 2026-08-17
Scope: Rurubu WEDDING only

## Observation

At live Figma readback, `Y + CP/CO` was structurally sound but chronology CO still had one inconsistent editorial beat: Event 03 photo and its native text were spatially detached while Events 01/05 integrated photo + copy. Event 02/04 also occupied a support rail without an explicit guest-facing editorial role.

## Hypothesis

Bind major event copy to the photograph that carries it, and name the quiet support rail explicitly before adding any new decoration or asset.

## Bounded experiment

- clone CO `1566:2` → CQ `1569:2`;
- keep Story unchanged;
- keep all chronology photo hashes unchanged;
- move Event 03 native number/date/title/copy onto its existing replaceable photo;
- keep Event 02/04 on the existing texture rail and add native `寄り道メモ / 02・04`;
- add no external asset, generated image, Drive save, card, shadow, or gradient.

## Failures caught before adoption

1. Initial Event 03 title/copy sat under Event 05 due to vertical overlap. Rejected and corrected.
2. After correction, Event 03 number/date had a 6px text intersection. Rejected until corrected.

## Evidence

- CQ whole spread 500px: visually stronger than CO;
- reading scale ~1000px: PASS;
- chronology actual-size `1569:27` 794×1123: PASS;
- native text `31`;
- text collision `0`;
- 18px text safe-area risk `0`;
- text overflow `0`;
- visible image intrinsic violations `0`;
- photo hashes changed `0`.

## Decision

- CQ `1569:2`: **ADOPTED / VERIFIED_LOCAL / preferred**;
- CO `1566:2`: **hidden rollback**;
- Start Here: `V5 FU/FX · V6 Y + CP/CQ INSIDE STUDIES · V7 HOLD`.

## Asset-state truth

- generated this run: `0`;
- adopted generated assets: `0`;
- Drive saves: `0`;
- external binary placement: `0`;
- existing replaceable photo roles recomposed: `YES`;
- native text preserved: `YES`;
- visually verified: `YES`.

## Learning

RSL-070: a major photo milestone and its native explanatory copy should be tested as one editorial beat when they visibly separate into modules; secondary quiet information can be intentionally grouped/named rather than treated as leftover space. Exact layout and visual grammar remain Rurubu-specific.
