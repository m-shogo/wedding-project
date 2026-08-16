# 2026-08-16 — Rurubu V6 AT/AS visual learning

Scope: Rurubu WEDDING only

## Observation

O + AR/AQ comparison showed a system-level mismatch: Outer O had stronger magazine energy, while AR profile ended in a tidy thumbnail row and AQ chronology still read as a vertical numbered rail beside photos.

## Hypotheses tested

1. Profile: bind the editable pullquote to the dominant hero and turn existing replaceable snapshots into one overlapping memory cluster before adding new decoration.
2. Chronology: preserve explicit native sequence markers, but spatially distribute event groups rather than forcing 01–05 into one rail.

## Bounded experiments

- AT `1392:95` cloned from AR `1389:2`.
- AS `1392:2` cloned from AQ `1387:2`.
- No new source images, generated decoration, Drive writes, cards, shadows or gradients.
- All factual/variable copy remains native text.
- All photography remains replaceable IMAGE roles.

## Result

AT and AS were both visually stronger at whole-spread and actual-page inspection and passed structure checks.

AT:

- native pullquote now participates in hero photography;
- lower 3-photo cluster has unequal scale/rotation/overlap;
- profile text collisions `0`, 18 px safe risks `0`;
- Q&A unchanged and remains collision/safe clean.

AS:

- chronology no longer reads as one left-side list;
- 01–05 are distributed across three spatial groups, scene photos act as anchors, WEDDING remains the endpoint;
- chronology collisions `0`, 18 px safe risks `0`.

Both tests exposed one small intrinsic-size overshoot on the shared `240×220` source; both were corrected before promotion.

## Decision

- AT promoted preferred; AR hidden rollback.
- AS promoted preferred; AQ hidden rollback.
- Start Here updated to `V5 FU/FX · V6 O + AT/AS INSIDE STUDIES · V7 HOLD`.
- V7 remains HOLD.

## Learning

Do not assume repeated facts require repeated boxes or a single rail. Sequence can stay native and explicit while spatial hierarchy becomes editorial. Likewise, when a strong hero already exists, a native quote and a few legitimate replaceable images can carry more magazine energy before adding decoration.

Generated section masters remain separate lifecycle state: Drive-verified, not adopted.

Evidence: `01_paper-items/rurubu-wedding/RURUBU-V6-O-AT-AS-QA-2026-08-16.md` and RSL-035 append.
