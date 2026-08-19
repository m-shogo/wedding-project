# Rurubu Shared Learning Append — RSL-128 / RSL-129

Date: 2026-08-19
Source scope: Rurubu WEDDING

## RSL-128 — A photo-less role can become an intentional closing feature through native typography

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Visible problem: a legitimate photo-less `03 / NEXT DESTINATION` role on the Profile page looked like a missing third photo slot because it had too little visual responsibility relative to the two large adjacent photo roles.

Root-cause hypothesis: absence of photography was not the defect. The role lacked enough native editorial hierarchy to signal an intentional ending.

Bounded test: on rollback-safe FP, preserve all photo roles and facts, then replace the weak 03 treatment with a narrow photo-safe native closing column: large native ordinal, small kicker, Japanese headline/body, and one thin functional rule. The first wider treatment was rejected because it invaded the neighboring photo; the narrower version passed.

Expected improvement: make the no-photo role read as deliberate editorial cadence without generating or repeating another image.

Regression risk: a typography-only role can still look like an empty placeholder if scale/position is weak; if made too wide, it can collide with existing photography or safe area.

Evidence: whole spread 1000px PASS; Profile actual size `1895:19` 794×1123 PASS; native text 26; collisions 0; final 18px safe risks 0; new image hashes 0.

Figma evidence: preferred FP `1895:18`; rollback FG `1851:2` hidden.
Drive evidence: V6 authority folder `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` re-read; no new Drive asset.
GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-FP-FQ-NATIVE-CLOSING-AND-EVENT5-TYPOGRAPHY-QA-2026-08-19.md`.

What must remain Rurubu-specific: exact `03` size, copy, magenta rule, coordinates, photo overlap, palette and travel-magazine styling.

Cross-item applicability: another print artifact with an intentionally image-free closing/support role may independently test whether native typography can carry the role before adding a repeated or semantically weak image.

## RSL-129 — A milestone without a legitimate photo can be strengthened by typographic responsibility instead of decorative texture

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Visible problem: chronology event 05 `入籍` was correct semantically but weaker than the neighboring event-03 photo beat and final WEDDING terminal. A bounded travel texture existed behind/around it but did not meaningfully improve the page.

Root-cause hypothesis: the milestone did not need more background decoration. It needed a clearer visual role in the event hierarchy.

Bounded test: first strengthen/reposition the existing texture; reject it after whole-spread comparison showed almost no improvement. Then hide that texture and compose `05 + date + 入籍 + native body + one thin yellow rule` as a boxless typographic feature directly beneath the event-03 image.

Expected improvement: bridge the photo event into the final WEDDING terminal while preserving factual chronology and avoiding a semantically weak replacement photo.

Regression risk: enlarged ordinal/title can create collision or safe-area problems; parent resizing does not guarantee child text widths also shrink, so child bounds require explicit QA.

Evidence: whole spread 1000px PASS; chronology actual size `1898:151` 794×1123 PASS; native text 31; collisions 0; final 18px safe risks 0; new image hashes 0.

Figma evidence: preferred FQ `1898:125`; rollback FL `1874:2` hidden. Initial font-size mutation failed atomically before mutation because existing `Noto Sans JP Bold` had not been loaded first; corrected by following the canonical font-load-before-mutate recipe.
Drive evidence: V6 authority folder re-read; no new Drive asset.
GitHub evidence: same FP/FQ QA document above.

What must remain Rurubu-specific: chronology event content, exact number scale, yellow rule, event placement, final WEDDING treatment and travel-magazine grammar.

Cross-item applicability: when a print milestone legitimately has no distinct image, independently test whether stronger native hierarchy is preferable to adding weak decorative texture or an unrelated photo. Verify actual child text bounds after resizing structural containers.
