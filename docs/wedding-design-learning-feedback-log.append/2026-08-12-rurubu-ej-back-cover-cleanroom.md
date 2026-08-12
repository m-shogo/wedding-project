# 2026-08-12 — Rurubu EJ back-cover clean-room

- **Visible problem:** EI's front was destination-led, but the back still felt like stacked scrapbook modules and weakened the whole outer spread.
- **Principle tested:** make one photograph the page field, overlap only two supporting photos at different scales, and reserve one compact cream field for the travel log. Let Japanese type and photography create hierarchy instead of cards.
- **Expected improvement:** stronger thumbnail silhouette, more authentic travel-magazine continuity, less AI/UI modularity, denser but more intentional editorial rhythm.
- **Regression risk:** photo enlargement could crush the timeline/footer; inherited nested micro labels could survive subtraction; Q60 provenance could be accidentally conflated with the existing hero proxy.
- **Evidence:** EJ `1072:2`; 500px whole PASS; 794×1123 front PASS; 794×1123 back PASS after timeline/footer repair and removal of `1072:72 / 1072:74`; structure 35 visible native text / 6 image fills / 0 same-parent text intersections / 0 bounded safe-area text risks.
- **Status:** ADOPTED. Review snapshot `1076:2`; previous EI `1069:2` preserved hidden rollback. EG inside unchanged.
- **Next application:** use full-bleed photo field + one information field as a stronger clean-room grammar; actual-size rendered review must explicitly catch nested decorative labels and bottom-edge clipping that structure checks can miss.
- **Asset note:** Q60 role560 Drive readback succeeded; Figma createImage/base64 path failed atomically and was not repeated. Exact Q60 placement remains OPEN.
