# Rurubu editorial lesson — EZ photo-field hierarchy

Date: 2026-08-13

- Visible problem: even a photo-led cover can still feel like a web page when cream header, hero, and lower feature photo read as separate horizontal sections.
- Tested capability: make the photo field continuous, pull Japanese destination type into the field, overlap one bounded destination postcard, and keep information clusters compact.
- Expected improvement: stronger Japanese travel-magazine rhythm at thumbnail and actual print size without forcing low-resolution images to carry more area than they can support.
- Regression risk: rotated caption geometry can create bounding-box collisions even when visual spacing appears adequate; large native display type can collide by only 1–2px.
- Evidence: EZ `1157:2`; 500px whole-item PASS; actual-size front `794×1123` PASS; absolute text intersections `0`; 18px safe-area risks `0` after repairs.
- Adopted/rejected: floating Feature 02 white caption and initial title overlap were rejected; cyan caption band + repaired title stack adopted.
- Next application: at every candidate, judge photo-field continuity before adding any new badge/card. Caption bands are allowed only when they attach to a photograph and solve contrast, not as generic UI containers.
