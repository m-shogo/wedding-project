# 2026-08-19 — Rurubu V6 FO Outer issue-panel subtraction

Scope: Rurubu WEDDING only. V7 untouched / HOLD.

## Visible problem

The front cover hero was strong, but the floating white `YOKOHAMA / ISSUE 2026` panel read as a separate UI/postcard card rather than magazine-native editorial information.

## Principle tested

Subtraction with binding-function check: if an existing legitimate image field provides both a readable dark region and semantic attachment for metadata, test native text directly on the image before keeping a separate container.

## Expected improvement

Increase hero-photo responsibility and reduce card/module reading while preserving native editable metadata.

## Regression risk

A future hero replacement may invalidate contrast or text-safe-zone assumptions.

## Experiment

- source FH `1854:2` / front `1854:51`;
- rollback-safe FO candidate `1891:18` / front `1891:68`;
- hid only `DECOR / FRONT_YOKOHAMA_ISSUE_TEXTURE_PANEL`;
- retained title/meta as native text and moved them to the upper-right hero area;
- subtle text-only shadow added for contrast;
- no photo/hash/crop/logo/back-cover changes.

Initial structure test found a 2px title/meta contact. The metadata was moved downward and QA rerun.

## Evidence

- whole spread ≈700px: FO stronger than FH;
- 1200px spread: PASS;
- actual-size front 794×1123: PASS;
- final front text collisions: 0;
- final 18px safe-area risks: 0;
- page-level stray issue nodes: 0;
- new image hashes: 0.

## Result

`ADOPTED / VERIFIED_LOCAL`.

FO `1891:18` is preferred. FH `1854:2` is hidden rollback.

During review-board reconciliation, stale visible V6 studies `1286:18`, `1624:18`, `1626:99`, `1671:18`, `1747:18`, `1846:18` were hidden, not deleted. The current six-spread review board remains visible and rollback-safe.

## Next application

Continue V6 only. Reassess other visible card/container treatments only when their binding/contrast/physical function is ambiguous; do not generalize this into blanket container removal.