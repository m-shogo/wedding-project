# Rurubu V6 feedback — FP / FQ

Date: 2026-08-19

## FP Profile 03

Problem: lower-right photo-less 03 read like an unfilled image slot.

Tested principle: give a legitimate image-free role stronger native editorial responsibility before adding/repeating photography.

Rejected treatment: wide two-line headline/body overlapping the neighboring photo.

Adopted treatment: narrow right-side closing column with native `03`, kicker, Japanese headline/body, and one thin magenta rule.

Expected improvement: deliberate closing cadence without another image.

Regression risks checked: text/photo overlap, right safe area, stray page-level nodes.

Evidence: whole 1000px PASS; Profile actual 794×1123 PASS; collisions 0; final 18px safe risk 0; image hashes unchanged.

Next application: use the method only where the image-free role is semantically legitimate; do not use typography to disguise a truly missing required photo.

## FQ Chronology event 05

Problem: `入籍` was visually weak between the event-03 photo and final WEDDING terminal.

Tested principle: if a milestone has no legitimate distinct photo, strengthen native hierarchy before adding decorative texture or unrelated imagery.

Rejected treatment: stronger event-05 travel texture; little visible improvement.

Adopted treatment: hide event-05 texture and use large native `05`, date, title/body, plus one thin yellow rule.

Expected improvement: clearer progression 03 photo → 05 milestone → WEDDING.

Regression risks checked: font-load mutation order, child width after parent resize, right safe area, text collisions.

Evidence: whole 1000px PASS; chronology actual 794×1123 PASS; native text 31; collisions 0; final 18px safe risk 0; image hashes unchanged.

Next application: inspect other photo-less milestones only if a real visual defect remains; do not normalize every text-only event to this same layout.
