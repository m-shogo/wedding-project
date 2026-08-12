# Rurubu EV design feedback — 2026-08-13

Scope: Rurubu WEDDING only.

Visible problem: EU was materially better than legacy V5, but the cover still read as a large destination poster with feature modules placed on top. The magenta second-line treatment and wide feature labels retained campaign/UI signals, while the exact Yokohama Q60 derivative was still visually secondary.

Principle tested: safe clean-room duplicate + subtraction of banner/panel cues + very large native Japanese place-name typography + one thin cyan editorial rule + larger exact Yokohama postcard + unequal image scales + direct-on-photo feature type. The dominant unverified hero was explicitly renamed as a non-Q60 history derivative rather than allowed to imply exact provenance.

Expected improvement: stronger Japanese travel-information-magazine recognition at thumbnail scale, more destination specificity, less landing-page geometry, and a clearer 01/02/03 editorial reading rhythm.

Regression risk: enlarging the verified 240×220 derivative may expose softness; bounded use at 286×262 was visually checked at actual size. Large typography can also collide with feature copy; structure QA caught three intersections and a 16px safe-area violation, all repaired before promotion.

Evidence: EV working `1139:2`, Review `1140:2`; 500px thumbnail PASS; whole-item PASS; actual-size front `794×1123` PASS; visible native text 37; visible IMAGE fills 7; absolute text intersections 0; bounded 18px safe-area risks 0. Exact derivative remains Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1139:189` → image hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.

Dominant Q60 status: master Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, 155,439 bytes was freshly materialized. A fresh official upload target was issued for EU hero before EV work, but POST again failed on `mcp.figma.com` DNS resolution before mutation. EV dominant hero `1139:134` remains hash `539c259be8036b481d06b4f76db9a39b407d90e8` and is NOT exact Q60.

Adopted: YES. Best comparison is `EV outer / EO inside`. Current `77:18 / 77:290` was not touched. Start Here drift was also corrected from stale ER/ET references to EV/EO.

Next application: do not retry the same DNS transport fingerprint. Continue visual work only where a clearly stronger clean-room result exists; V5 remains incomplete until dominant hero provenance and final print/fold/ledger reconciliation close.