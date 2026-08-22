# 2026-08-23 — Rurubu V7 Cafe/Table H2 destination-copy correction

Scope: Rurubu WEDDING only.

- Source H `2296:2` contained reader-facing `夜の横浜を、ゆっくり味わう。` inside a Hawaii clean-room spread.
- H2 `2308:2` corrected the close to `夜のハワイを、ゆっくり味わう。` without changing structural photo dummies, layout, or factual/variable content.
- Three-scale visual QA: 500 / 1400 / 1587×1123 PASS.
- Text intersections: 0.
- Existing folio edge condition was unchanged from H and remains a separate print-template/safe-area gate.
- First clone landed on plugin current page `845:2`; switched immediately to explicit `setCurrentPageAsync(2052:2)` + `page.appendChild()` + parent readback. No repeated retry of the bad method.
- H2 promoted current; H hidden rollback.
- Learning: `RSL-230 / F-RSL-230-CONTROL-DESTINATION-COPY-LEAKS-INTO-CLEANROOM-DIRECTION`.
- New professional input this run: FLUX Hawaii's local/honest storytelling and photo/readability/paper-system thinking; used only to reinforce destination-semantic truth, not to copy visual style.
- New generated/adopted/Drive photography: 0 / 0 / 0. Current images remain structural dummies.
