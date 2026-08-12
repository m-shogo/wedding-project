# Rurubu V5 — EF cover label-rhythm promotion — 2026-08-12

Scope: `RURUBU WEDDING ONLY`.

## Visible problem

ED was already photo-led, but the front cover still read as a relatively calm hero-plus-feature layout at thumbnail scale. The headline and feature hierarchy were stronger than legacy V5, yet the issue-label / cover-line rhythm was still timid compared with a real Japanese travel-information magazine. Feature 01 also relied on dark navy copy over a dark portion of the hero, which weakened actual-size contrast.

## Principle / capability tested

Subtraction first, then rebuild hierarchy from the existing verified photography and native Japanese typography rather than adding cards. EF keeps the existing hero, lower full-bleed street photo, and support-photo image hashes, but reorganizes the cover with:

- a thin magenta top rule and native `旅するWEDDING` masthead;
- a compact top-right `保存版` yellow issue label;
- oversized native `横浜 / ふたり旅。` headline;
- Feature 01 directly on the hero rather than in a panel;
- Feature 02 as one deliberately tilted photo plus a flat yellow caption band;
- Feature 03 directly on the lower full-bleed street photograph with one narrow yellow rule;
- no new rounded-card system, generic shadow field, dashboard grid, or baked text inside imagery.

Expected improvement: the cover should read as a Japanese travel-magazine cover at thumbnail scale before the user parses individual modules, while remaining editable and print-native at actual size.

Regression risk: additional cover-line energy could create overlap, poor contrast, or synthetic sticker clutter. The `保存版` label therefore remains one compact rectangular issue marker, and the new hierarchy was checked at thumbnail, spread-reading, and actual-size front scales.

## Experiment and repair

Clean-room comparator: `1053:2 / V5_OUTER_EF_COVER_LABEL_RHYTHM_CLEANROOM_2026_08_12`.

Initial EF actual-size QA found Feature 01 title copy too dark over the pier/water area. No background card was added. The existing native title `1053:173 / CE_FEATURE_1` was changed to solid white, preserving the image-led composition.

## Evidence

- thumbnail whole-item: `500 px` long-edge screenshot PASS;
- reading/spread: `1000 px` whole-spread screenshot PASS;
- actual-size front: `794 x 1123` screenshot PASS after Feature 01 contrast repair;
- back cover is inherited unchanged from visually verified ED;
- structural readback: `37` visible native text nodes, `6` visible IMAGE-fill nodes, `0` same-parent text collisions, `0` bounded front safe-area text risks;
- provisional fold guide preserved as `1053:184`;
- Current outer `77:18` and Current inside `77:290` were not modified.

## Selection

`ADOPTED / PROMOTED`.

EF was selected over ED because it is materially stronger at thumbnail scale while remaining cleaner at actual size: the page is driven by one large destination image, one tilted support photo, one full-bleed street image, and native Japanese type rather than a collection of card-like modules.

Review promotion:

- old ED Review snapshot `1048:2` → hidden rollback;
- new visible Best Outer `1054:2 / BEST OUTER — EF — source 1053:2`;
- Best Inside remains `1050:2 / EE`;
- Start Here updated to `EF outer / EE inside`.

## Asset / provenance classification

- generated this run: `0`;
- new generated asset adopted: `0`;
- new external binary placed: `0`;
- existing verified Figma photography reused: `YES`;
- Q60 exact Drive binary placed in Figma: `NO`;
- Q60 exact Drive binary visually verified in Figma: `NO`.

The cover-hero transport/provenance blocker is therefore still open and EF is not evidence of V5 completion.

## Next application

Keep using issue-label energy only where it improves editorial hierarchy. Prefer large photography + native Japanese type + one or two flat editorial anchors over multiple boxes. At actual size, test rendered contrast on the real crop; collision=0 alone is not sufficient.