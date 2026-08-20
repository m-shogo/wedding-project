# Rurubu V6 HK/HN design-learning feedback — 2026-08-20

Scope: Rurubu WEDDING only. V7 remained HOLD.

## HK — Profile photo-led opening

- Visible problem: GZ Profile still read as `cream header → image`, quieter and more template-like than Story/1DAY.
- Principle tested: give an existing semantically valid, source-safe photo more editorial responsibility before adding another header/container/asset.
- Expected improvement: stronger travel-magazine opening; less stacked-section reading.
- Regression risks: title/deck contrast, right safe-area, crop/source fidelity, variable-copy editability.
- Bounded change: extend existing Profile hero to the top, place native title/accent/deck within the photo field, preserve profile data/Q&A/replaceable snapshots.
- Whole/thumbnail evidence: 500px PASS; HK stronger than GZ.
- Reading evidence: 1200px PASS.
- Actual-size evidence: Profile 794×1123 PASS; Profile text collisions 0, safe risks 0; Q&A collisions 0, safe risks 0; image intrinsic violations 0.
- Figma: HK `2027:2`, Profile `2027:3`; GZ `2004:2` hidden rollback.
- Drive: no new write; root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified.
- GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HN-HK-PHOTO-LED-AND-REPEAT-SUBTRACTION-QA-2026-08-20.md`.
- Status: `ADOPTED / VERIFIED_LOCAL`.
- Next application: compare remaining cream-header openings before creating new decorative headers.

## HN — remove semantically weak repeated cafe photo from cover Feature 03

- Visible problem: HD front used a small repeated cafe photo despite a strong dining photo already carrying the lower cover's photographic mass; Feature 03 did not require that cafe photo as evidence.
- Principle tested: if a repeated support photo has no unique semantic/evidence role, test transferring responsibility to native typography rather than inventing another image.
- Expected improvement: less photo-card repetition; clearer asymmetric cover hierarchy; lower repeated-photo count without semantic falsification.
- Regression risks: over-subtraction, weak Feature 03 contrast, too much cream dead space.
- Bounded change: hide only repeated cafe image; enlarge native `03` and `ゲストと楽しむ / 旅のしおり`; retain narrow yellow binding rail and dining photo.
- Rejected state: Feature 03 inherited white text from former image-overlay context and became weak on cream; switched to established navy before adoption.
- Whole evidence: 1200px PASS; HN stronger than HD.
- Actual-size evidence: front 794×1123 PASS; front/back collisions 0, safe risks 0, image intrinsic violations 0.
- Preferred-set evidence: visible IMAGE roles 29→28; cafe hash repetitions 5→4; no new hash.
- Figma: HN `2029:2`, front `2029:63`; HD `2014:2` hidden rollback.
- Status: `ADOPTED / VERIFIED_LOCAL`.
- Next application: reduce photo repetition only where semantic truth permits; do not chase counts with unrelated destination images.

## Learning-state note

Combined transferable method recorded as `RSL-157 / VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific and non-transferable: exact Yokohama imagery, magenta/yellow/navy palette, cover numbering, title sizes/positions, image geometry and Rurubu editorial grammar.

Asset state for this run: generated 0 / adopted generated 0 / new Drive saves 0 / external binary placements 0 / new image hashes 0 / HK+HN adopted and visually verified YES.
