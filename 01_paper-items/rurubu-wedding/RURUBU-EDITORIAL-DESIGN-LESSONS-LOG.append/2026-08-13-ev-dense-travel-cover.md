# EV lesson — dense travel cover without UI panels

- Problem: EU still carried a destination-poster / campaign-banner reading because the second line and feature labels behaved as modules rather than magazine typography.
- Principle: let one dominant place-name, a bounded exact destination postcard, thin color rules, direct-on-photo type, and unequal photo scales do the hierarchy. Remove broad color fields before adding anything.
- Expected improvement: at 500px, the cover reads as a Japanese travel-information magazine before it reads as a wedding pamphlet.
- Regression risk: small exact derivatives can look soft when enlarged; keep them bounded and inspect actual-size glyph/image fit.
- Rejected state: first EV structure QA found three absolute text intersections and a 16px left safe-area breach on the giant `横浜`; corrected before adoption.
- Evidence: EV `1139:2`, Review `1140:2`; native text 37; IMAGE 7; absolute text intersections 0; bounded 18px safe-area risks 0; thumbnail, whole-item and 794×1123 front QA PASS.
- Exact destination evidence: Drive `1aVp34U5qUTqd9FR3AILmJggdWwY1lAJb` → Figma `1139:189` → hash `644f449c3bf2001a94d4b822d2b55e2614c11042`.
- Dominant hero remains OPEN: `1139:134`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`; Q60 master is verified in Drive but the external upload host still fails DNS before mutation.
- Adopted: YES. Best is `EV outer / EO inside`; Current untouched.
- Navigation lesson: always re-read Start Here after promotion. Its body/status had drifted to older ER/ET references even though newer comparator work existed; EV promotion reconciled that drift.