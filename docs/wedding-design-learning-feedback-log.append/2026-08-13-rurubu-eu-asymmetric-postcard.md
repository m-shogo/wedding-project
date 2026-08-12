# Rurubu EU design feedback — 2026-08-13

Scope: Rurubu WEDDING only.

Visible problem: ET had materially improved the travel-magazine grammar, but the exact Yokohama photographic evidence was still too small to carry destination specificity at thumbnail/reading scale, while the second-line yellow treatment still retained a campaign-banner signal. The dominant Q60 hero also remains blocked by binary transport, so visual work had to improve the verified composition without pretending that provenance gate was closed.

Capability/principle tested: safe clean-room duplicate + subtraction + much larger native Japanese destination type + a shallow sharp magenta strap + a larger exact-Q60-derivative destination postcard + stronger overlap between materially different photo scales + full-bleed lower street photography. No new rounded cards, generic shadows, gradients, rasterized final text, or unverified external images were added.

Expected improvement: faster Yokohama recognition, more unmistakable Japanese travel-information-magazine hierarchy, denser but clearer photo-led rhythm, and less generic wedding-pamphlet / campaign-banner feel.

Regression risk: enlarging a small verified derivative can expose softness or falsely imply dominant-role provenance. Mitigation: the exact derivative remains a bounded secondary postcard at 226 × 206 and is not represented as the dominant hero.

Rejected states: the first EU render wrapped the large `01` glyph into two lines. After fixing that, structure QA found two text-box intersections (`kicker × 横浜` and `01 × Feature 01 title`). Both states were rejected and corrected before promotion.

Evidence: EU working `1135:2`, Review `1137:2`; thumbnail/whole-item comparison PASS; natural whole-spread render about 1588 × 1123 PASS; native editable text 36; visible IMAGE fills 7; same-parent text intersections 0; bounded 18 px safe-area risks 0. Review comparison against Current was visually rechecked after promotion.

Asset evidence: exact Q60 derivative remains Drive ID `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb`, EU Figma node `1135:189`, image hash `644f449c3bf2001a94d4b822d2b55e2614c11042`; it is visibly verified in EU. Fresh master readback remains Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes. EU dominant hero `1135:134` still has image hash `539c259be8036b481d06b4f76db9a39b407d90e8` and is NOT exact Q60. A fresh official upload target was issued for the safe duplicate hero, but the byte POST failed on `mcp.figma.com` DNS resolution before mutation.

Adopted: YES. Best comparison is `EU outer / EO inside`. Current `77:18 / 77:290` was not touched.

Next application: do not repeat the failed DNS transport fingerprint. Preserve EU's stronger photo/type hierarchy and continue with another safe high-value visual defect or a genuinely different binary-safe bridge if the runtime capability changes. V5 remains incomplete and V6 production remains closed.