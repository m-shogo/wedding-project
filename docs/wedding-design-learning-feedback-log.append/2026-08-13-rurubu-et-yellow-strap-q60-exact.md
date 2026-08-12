# Rurubu ET design feedback — 2026-08-13

Scope: Rurubu WEDDING only.

Visible problem: the current travel-magazine cover was photo-led but still over-dependent on one broad magenta headline block, producing a campaign-banner signal at thumbnail scale.

Capability/principle tested: sharp print-native color strap + very large native Japanese destination type + overlapping photography with different scales; no new rounded card, shadow, gradient, or rasterized text.

Expected improvement: stronger Japanese travel-information-magazine recognition, faster visual hierarchy, more purposeful dense rhythm.

Regression risk: extra color can become sticker clutter. Mitigation: only one yellow second-line strap and one yellow Feature 02 caption strip, both sharp edged and shallow.

Evidence: ET working `1132:2`, Review `1133:2`; 500px whole-item PASS; actual-size front/back PASS; native text 36; IMAGE 7; absolute text intersections 0; bounded 18px safe-area risk 0; fold x=792.7 width 2.

Asset evidence: exact Drive derivative remains Figma node `1132:189`, Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, image hash `644f449c3bf2001a94d4b822d2b55e2614c11042`. Dominant hero remains `Q60_EXACT_PENDING`, so V5 is not complete.

Adopted: YES. Start Here = `ET outer / EO inside`.

Next application: preserve the photo/type hierarchy; solve the remaining dominant-image provenance through a materially different binary-safe path, not repeated failed transport.