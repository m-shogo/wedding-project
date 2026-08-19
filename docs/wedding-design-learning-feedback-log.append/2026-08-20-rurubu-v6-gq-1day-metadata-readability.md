# 2026-08-20 — Rurubu V6 GQ 1DAY metadata readability

Scope: Rurubu WEDDING only.

## Visible problem

GD right page had a strong route composition, but its four fixed travel metadata rows were 10px and nearly disappeared at actual-size review.

## Hypothesis

The page did not need more cards, photos or accent bars. A small native type-mass increase could keep the rows subordinate while making them useful reader-facing guide information.

## Test

Rollback-safe GQ increased only STOP01–04 metadata from `10 → 11.5px`. No photo, geometry, time, title, body copy, hash or left-page role changed.

## Evidence

- source GD: `1938:2 / 1938:33`;
- candidate/adopted GQ: `1964:2 / 1964:33`;
- 500px whole PASS;
- actual-size 794×1123 PASS;
- right native text `25`;
- collision `0`;
- safe-area risk `0`;
- overflow `0`.

## Result

ADOPTED. GQ is more legible at actual size without flattening the major/minor hierarchy.

This corroborates RSL-133 rather than creating a new visual rule.

What remains Rurubu-specific: exact metadata wording, 11.5px size, stop composition, colors, photography and 1DAY route treatment.
