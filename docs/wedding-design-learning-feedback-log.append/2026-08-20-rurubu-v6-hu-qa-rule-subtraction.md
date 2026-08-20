# 2026-08-20 — Rurubu V6 HU Q&A rule subtraction

Scope: Rurubu WEDDING only
Status: ADOPTED / VERIFIED_LOCAL

## Visible problem

HK Q&A already had strong photo-led Q01/Q04 beats, but four thin separator rules still made the page read partly like a questionnaire/form component.

## Principle tested

Retire decorative separators only after native type + photo hierarchy can preserve sequence and grouping without them.

## Bounded test

HU `2044:2` duplicated from HK `2027:2`. Hidden only four legacy rules around Q01, Q02/Q03, the support photo, and Q05/Q06. Kept the yellow section kicker and cyan hero-photo caption field because they still provide real category/contrast function.

## Evidence

- whole spread: HU preferred over HK;
- actual-size Q&A `2044:49 / 794×1123`: PASS;
- native text `29`;
- replaceable photos `2`;
- collision `0`;
- 18px safe-area risk `0`;
- stray text `0`;
- image geometry/hash changes `0`;
- generated/Drive/binary/new-hash activity `0`.

## Decision

Adopt HU as live Profile/Q&A preferred. Preserve HK hidden as rollback. V7 remains HOLD.

## Shared-learning relation

This is a second independent Rurubu-local replication of RSL-159. The state remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; it is not cross-item verification.
