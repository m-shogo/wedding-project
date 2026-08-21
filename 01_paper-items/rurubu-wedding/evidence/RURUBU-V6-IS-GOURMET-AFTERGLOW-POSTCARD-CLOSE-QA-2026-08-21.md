# Rurubu WEDDING V6 — IS Gourmet / Cafe Afterglow Postcard Close QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority order used: live Figma → verified Drive → Rurubu GitHub evidence/status

## Source problem

After IR promotion, a fresh 500px common-scale review of `IQ + IP + IR + IH + IN + IM` identified Gourmet / Cafe IN `2091:2` as the next weakest spread. Its right page already had a strong dining hero, but the lower close reverted to footer/dashboard grammar: multiple horizontal rules, a small support image, a full-width utility block, and three evenly repeated micro items.

## Root-cause hypothesis

The information itself was useful; the visible scaffolding was the problem. Removing every lower element would lose the dense-but-readable magazine rhythm, while keeping the rules preserved a web/footer feeling. A stronger composition should subtract the nonfunctional scaffolding, enlarge the existing 04 afterglow image into a real second photo beat, and repack the useful native copy as a compact editorial memo.

## Bounded clean-room test

Rollback-safe IS `2110:2` was duplicated from IN and rebuilt only on the Gourmet/Table right page `2110:33`; the left Gourmet/Cafe page was preserved.

Final right-page changes:

- retained dining hero hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` as the dominant opening image;
- hid the lower `BELOW_RULE`, `TABLE_NOTE_RULE`, and `CHECK_RULE` rather than restoring a footer frame;
- kept 03 as a native text beat on cream;
- enlarged existing 04 support image hash `e3738476f760932bb5b09c9d60f174dd6c84049d` into an approximately 390×320 angled postcard-like photo field;
- moved large native `04` onto the photo field and kept the 04 kicker/title/copy adjacent below;
- restored the useful native `ふたりの「また行きたい」。` memo and its compact descriptive copy on the lower left without restoring its old rule/container system;
- retained the three small 01/02/03 cues as a vertical editorial index instead of an equal horizontal footer row;
- introduced no new raster, image hash, card, shadow, gradient, Drive upload, or generated asset.

## Failed intermediate and correction

IS pass 1 removed the lower rules **and** too much supporting information. At 500px and 1400px this created a large dead cream field: cleaner than IN, but not convincingly magazine-like. That pass was rejected as over-subtraction.

Correction:

- preserved the scaffolding subtraction;
- restored the existing native reader-facing memo copy in a compact lower-left editorial block;
- kept 04 as the enlarged visual beat;
- structure QA found two text-box contacts around 03 and the large 04 numeral; the 03 title/copy were returned to a clean gap and the 04 numeral was moved fully onto the photo field;
- final structure QA returned zero intersections and zero 18px safe risks.

## Expected improvement

- preserve the strong dining hero while avoiding a web/footer ending;
- turn 04 into a genuine second photo beat rather than a small thumbnail;
- keep useful reader-facing information density without UI-like rule scaffolding;
- produce a more asymmetric, print-native `03 text / memo / 04 photo` closing rhythm.

## Regression risks checked

- subtraction creating empty paper rather than intentional breathing space;
- 04 numeral colliding with 03 copy;
- angled support image reducing crop plausibility;
- memo copy becoming too small or detached;
- safe-area regression in the stacked 01/02/03 cues;
- accidental loss of image replaceability or native text editability.

## Three-scale evidence

### Whole item / thumbnail

IS `2110:2` at 500px: PASS after the over-subtraction repair. The right page reads as dining hero → 03 information → 04 postcard close, not a footer panel.

### Reading scale

IS `2110:2` at 1400px: PASS. The restored memo, 03 headline/copy, 04 photograph and 04 afterglow copy remain independently readable.

### Actual-size/detail

Right page `2110:33` at ~794×1123: PASS. The 04 image remains plausible at print-reading scale; native Japanese copy is readable; the lower cream field reads as breathing room around two editorial blocks rather than an empty section.

## Structure QA

Final effective-visible structure on IS Gourmet/Table right page:

- visible native text nodes: `20`;
- visible IMAGE-fill nodes: `2`;
- text intersections: `0`;
- 18px text safe-area risks: `0`;
- whole-page flattening: `NO`;
- native variable text preserved: `YES`;
- replaceable photo fills preserved: `YES`.

Visible right-page image hashes preserved:

- dining hero `2110:35`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- 04 afterglow support `2110:46`: `e3738476f760932bb5b09c9d60f174dd6c84049d`.

## Promotion / rollback

- IS `2110:2` → `PREFERRED / V6_INSIDE_IS_GOURMET_AFTERGLOW_POSTCARD_CLOSE_2026_08_21`, visible at x=`273800`, y=`1300`.
- IN `2091:2` → `ROLLBACK_HIDDEN / V6_INSIDE_IN_GOURMET_DINING_AFTERGLOW_PHOTO_BIND_2026_08_21`, hidden at x=`279200`, y=`1300`.
- no previous rollback/comparison frame was deleted.

Decision: `IS ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset lifecycle evidence

Drive V6 root was reverified immediately before promotion:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This experiment did not require image generation or transport:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`.

## Learning

Locally verified lesson: subtracting UI-like rules and footer frames is not enough; the useful information density they carried must be distinguished from the scaffolding itself. If subtraction creates dead paper, keep the scaffolding removed but rehouse existing native information as a smaller editorial memo or index rather than restoring the dashboard/footer geometry.

Cross-item state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What remains Rurubu-specific: food/travel photography, exact 03/04 hierarchy, postcard angle, Japanese travel-magazine density, magenta/cyan/yellow cues, wording and crop geometry.

## Completion boundary

IS improves V6 dummy-design quality but does not make V6 print-ready. Final photography/copy, printer template, confirmed bleed/trim/fold/safe-area specification, PDF preflight and physical proof remain separate gates.
