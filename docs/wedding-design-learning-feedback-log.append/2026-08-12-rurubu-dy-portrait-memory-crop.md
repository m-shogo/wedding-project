# 2026-08-12 — Rurubu DY portrait-memory crop feedback

Scope: Rurubu WEDDING only.

Visible problem: DF's right-page support photography remained too horizontal/card-like relative to the dominant memory image, and actual-size review showed support copy visually intruding into the lead-photo region.

Tested principle: for a multi-photo editorial section, choose support-frame aspect ratios from the useful source crop and resolution budget before decorating the module. Use one dominant landscape photograph plus smaller portrait/compact satellites, with captions occupying their own reading bands.

Expected improvement: stronger photo-led hierarchy, less dashboard/card repetition, more believable Japanese travel-magazine rhythm, and better crop meaning at print detail.

Regression risks tested: over-narrow support crops, too much blank cream field, clipped enlarged numerals, accidental caption/photo collisions, and safe-area drift.

Evidence: DY `1012:2` was compared against DF `899:2` at 500px thumbnail, 1400px reading scale, and actual-size `794×1123` right-page scale. After iterative repair, DY retained 53 visible native text nodes and 6 accepted image fills with 0 same-parent text intersections and 0 text safe-area risks under 18px.

Adoption: DY adopted as best inside comparator; Review snapshot `1016:2`. DF Review `904:2` preserved hidden as rollback. Current remains untouched.

Reusable direction: source-aware crop geometry can remove UI/card feeling without adding decoration. Prefer materially different photo proportions and independent native captions over repeated same-ratio modules.

Project-rule status: evidence-backed Rurubu lesson; do not universalize the exact dimensions to other items without their own crop/actual-size QA.