# Rurubu V6 ER / EQ Editorial Beat QA — 2026-08-19

Scope: Rurubu WEDDING only. V7 remained HOLD. No non-Rurubu production scope was inspected or edited.

## Start state

Live preferred before this run: EO Outer `1780:2`, EK Profile/Q&A `1762:2`, EN Story/chronology `1773:2`, EM Memory Spots `1767:2`, EP Cafe/Table `1796:2`, EJ 1DAY Plan `1784:2`.

Drive root readback: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## EQ — 1DAY Plan left-page second editorial beat

Visible problem: EJ right page had strong asymmetric photo rhythm, but the left lower half still read as a quiet remainder containing POINT and TRIP DATA.

Hypothesis: without adding a photo or card, the existing reader-facing note can become a second editorial beat through native typography, while TRIP DATA can become more readable at actual size.

Bounded test: rollback-safe EQ `1803:2` from EJ. Photos, right page, image hashes and hero geometry were unchanged. `POINT!` became `POINT / 01`; native `寄り道、歓迎。` became the lead note; a native body line was restored beneath it; TRIP DATA values were raised to 14px.

Failure caught: the first new note-body node was created at the Figma page root rather than the physical page. Parent readback caught it and it was reparented to `1803:3`. First long-copy proof also showed the existing `RULE / TRIP_DATA` visually crossing enlarged value text. That proof was rejected/hidden and the rule was moved to y=868 between the section kick and values.

Final evidence: whole-spread screenshot PASS; actual-size left `1803:3` 794×1123 PASS; left native text 20; right native text 25; text collision 0; 18px safe-area risk 0. Corrected long-copy proof `1805:68 / 1805:69` PASS with collision 0, safe risk 0, and rule/text contact 0. First failed proof remains hidden as evidence.

Adopted: EQ `1803:2`. Rollback: EJ `1784:2` hidden.

## ER — Cafe 02 bound photo beat

Visible problem: EP Cafe left page still read as a strong 01 feature followed by a separate small photo + 02 text module.

Hypothesis: the existing source-safe 238×218 Yokohama view can remain small but gain stronger editorial responsibility when the photo, large native 02 and title are bound into one asymmetric beat.

Bounded test: rollback-safe ER `1805:134`; left page `1805:135`. Existing view photo remained 238×218 and changed only to x=36, y=686, rotation≈-2.5°. Native `02`, title, copy and metadata were repositioned; no image source/hash or right Table page content changed.

Failure caught: first ER structure QA found a 25×54px native text intersection between `02` and the title. The text stack was moved right to x=370 while retaining an intentional 24×76px photo/number overlap.

Final evidence: whole-spread screenshot PASS; actual-size Cafe page `1805:135` 794×1123 PASS; native text 17; visible image roles 2; text collision 0; 18px safe-area risk 0. View photo remains 238×218, source-safe and replaceable.

Adopted: ER `1805:134`. Rollback: EP `1796:2` hidden.

## Asset lifecycle

- newly generated assets: 0
- adopted generated assets: 0
- new Drive saves: 0
- new external binary placements: 0
- new image hashes: 0
- image-source changes: 0
- native text preserved: YES
- replaceable photos preserved: YES
- rollback states preserved: YES
- V7 touched: NO

## Result

Preferred set after this run: EO + EK/EN + EM + ER Cafe/Table + EQ 1DAY Plan. State remains `VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / V7_HOLD / NOT_PRINT_READY`.