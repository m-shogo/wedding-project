# EU lesson — asymmetric destination postcard

- Problem: ET was photo-led, but the verified Yokohama-specific image was still visually minor and the second-line treatment retained a campaign-banner cue.
- Principle: treat exact destination evidence as a bounded editorial postcard, not a generic badge; combine it with very large native Japanese place-name typography, one shallow sharp strap, unequal photo scales, and full-bleed photography.
- Expected improvement: destination recognition survives thumbnail scale while the page reads as a Japanese travel-information magazine rather than a wedding landing page.
- Regression risk: a small derivative becomes visibly soft when oversized or is mistaken for the dominant provenance role. Keep it secondary and explicitly separate its evidence from the dominant hero.
- Rejected: first EU rendered `01` as a broken two-line glyph; subsequent structure QA found two text intersections. Both were repaired before adoption.
- Evidence: EU `1135:2`, Review `1137:2`; native text 36; IMAGE 7; text intersections 0; bounded 18 px safe-area risks 0; thumbnail, whole and natural-size whole-spread visual QA PASS.
- Exact destination evidence: Drive derivative `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1135:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`, visually verified.
- Dominant hero evidence remains OPEN: node `1135:134`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`; Q60 master Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr` was freshly read, but official upload failed on DNS before any Figma mutation.
- Adopted: YES. Best is `EU outer / EO inside`; Current untouched.
- Next application: preserve the exact/postcard evidence boundary and do not repeat a transport method with the same failed DNS fingerprint.