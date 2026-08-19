# 2026-08-20 — Rurubu V6 GP Wedding terminal typography

Scope: Rurubu WEDDING only.

## Visible problem

GO chronology had a strong 01→03→05 reading rhythm, but `06 / WEDDING` ended as a small lower-left block. The lower-right paper field read as unfinished rather than as intentional breathing room.

## Test

Rollback-safe GP redistributed only native event-6 typography and the existing yellow terminal rule across the page. No image role, photo, crop, hash, card, generated decoration, or earlier event changed.

Expected improvement: make the final wedding event read as the page's final destination while staying boxless and editable.

Regression risk: moving variable copy toward the footer could create collision or trim/safe-area failure under longer Japanese text.

## Evidence

- source GO: `1958:2`;
- candidate/adopted GP: `1961:2`;
- chronology: `1961:28`;
- hidden long-copy proof: `1962:2 / 1962:28`;
- 500px whole PASS;
- 1200px whole PASS;
- actual-size 794×1123 PASS;
- normal copy: collision `0`, safe risk `0`, overflow `0`;
- long copy: collision `0`, safe risk `0`, overflow `0`.

## Result

ADOPTED. GP is visually stronger than GO because the page ending now has enough editorial mass to close the chronology without adding a UI-like container or another repeated photo.

What remains Rurubu-specific: exact yellow rule, event-number sizes, Yokohama/Hawaii travel-magazine grammar, copy, colors, page coordinates.

Next application: continue six-spread equal-scale review; only apply the method where an ending is semantically complete but physically under-resolved.
