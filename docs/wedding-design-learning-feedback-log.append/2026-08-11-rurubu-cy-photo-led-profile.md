# 2026-08-11 — Rurubu CY photo-led profile

- Visible problem: CX still read as a safe heading-band + portrait-block + questionnaire sequence at whole-item and actual-size scales.
- Principle tested: make production photography the page field, use materially unequal portrait scale/overlap, overlay native Japanese headline text in the photo-safe zone, and subtract the redundant Q1 horizontal rule instead of adding another module.
- Expected improvement: stronger Japanese travel-magazine silhouette, less form/UI geometry, more immediate photo-led hierarchy at thumbnail scale.
- Regression risk: overlay title contrast/layer order and enlarged Q1 typography could collide; dominant photo expansion could disturb fold/crop integrity.
- Evidence: CY `859:2`, left `859:3`, right `859:132`, fold `859:283`; 54 visible native text nodes; 6 production image fills; 0 same-parent text intersections; whole-spread + 794×1123 actual-size left-page QA PASS; six production hashes preserved.
- Status: CY ADOPTED as strongest inside comparator; CX moved to Studies with node ID preserved; Review snapshot `861:2` and Start Here updated to CV/CY.
- Q60 status: exact Drive JPEG re-materialized and fresh official upload target issued, but DNS failed before byte POST; therefore NOT PLACED / NOT VISUALLY VERIFIED.
- Next application: use photo as the editorial field when a text-safe zone exists; do not rebuild heading cards above photos. Outer progress remains gated by a truly high-quality cover hero, not more decoration around the proxy.
