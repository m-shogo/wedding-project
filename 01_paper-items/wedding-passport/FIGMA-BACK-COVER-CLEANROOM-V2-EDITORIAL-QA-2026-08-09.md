# WEDDING PASSPORT — Back Cover Clean-Room V2 Editorial QA

Date: 2026-08-09
State: `VISUAL_REOPENED / CLEANROOM_V2_CREATED / STRUCTURE_QA_PASS / PRODUCTION_NOT_YET_PROMOTED`

## Live authorities

- Start `main`: `b15d2738e783c36e8875e02d94bf92bca62d665b`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `01_OUTSIDE / 1:2`
- Existing production back cover: `18:46 / FRAME_BACK_COVER`
- Clean-room comparison: `92:2 / QA_BACK_COVER_CLEANROOM_V2_EDITORIAL_2026_08_09`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Visible defect in current production

The live production back cover reads as a themed passport mock rather than premium wedding stationery. The highest-value issues are:

- fake itinerary-style English schedule (`CEREMONY / RECEPTION / ARRIVAL AT OUR NEXT CHAPTER`);
- large circular entry-stamp treatment;
- fake machine-readable-document label and MRZ-like string;
- decorative English thank-you copy;
- travel-theme literalism dominating the page instead of Japanese typography and editorial rhythm.

These are exactly the kinds of fake transport-data / stamp / decorative-English signals disallowed by the reopened visual-quality authority.

## Clean-room V2

Created a materially different native comparison without mutating production:

- warm paper field with one narrow navy bind edge;
- Japanese-first title `旅のつづきへ` in Noto Serif JP;
- Japanese subtitle and thank-you copy as editable native text;
- verified date/location retained as separate native text;
- three very light contour rings used as abstract editorial structure rather than a fake stamp or passport credential;
- small Japanese marginal note `余韻の記録 / 今日の記録はここまで。旅は、つづく。`;
- no MRZ, no machine-readable-document fiction, no fake itinerary, no entry stamp, no airplane icon, no gradient, no shadow, no web-card containers.

Initial V2 used `FIELD NOTE / A day to remember. A journey to continue.`. Whole-item screenshot QA showed that this was decorative English without functional value, so it was removed in the same run and replaced with concise Japanese copy.

## Screenshot QA

Whole-item / thumbnail and reading-scale screenshot of `92:2` after refinement shows:

- clear Japanese-first hierarchy;
- no fake passport-control or transport-data impression;
- materially less template / AI-theme decoration than production `18:46`;
- strong asymmetry between title/body and the right-side contour field;
- large negative space used as editorial pacing rather than an empty card grid;
- the contour rings remain subordinate to text and do not behave like a stamp;
- footer and deferred-finalization note remain inside the page.

This is a serious comparison candidate but is **not yet promoted to production**. Actual-size detail and longer-copy stress should be closed before promotion.

## Structure readback

Clean-room V2 `92:2`:

- frame: 1480 × 2100
- `clipsContent=true`
- native text nodes: 10
- IMAGE-fill nodes: 0
- raster / flatten replacement: 0
- text nodes outside frame bounds: 0
- all text nodes: native editable auto-height

No generated image was forced into this page. The diagnosed problem is fake transport-theme art direction and typography/composition, not a missing hero image.

## Drive

Drive authority folder was live-read at start and immediately before Git write.

- Drive changes: 0
- generated assets adopted: 0
- reason: no concrete image role was necessary for the back-cover correction; native editorial structure produced the higher-value change.

## Decision

`CLEANROOM_V2_CREATED / STRUCTURE_QA_PASS / VISUAL_COMPARISON_ADVANCE / PRODUCTION_NOT_YET_PROMOTED`

Before production promotion:

1. run actual-size/detail QA on title, body, date/location, marginal note and footer;
2. run longer Japanese thank-you-copy stress while preserving trim/safe-area plausibility;
3. compare V2 against production `18:46` at the same scale;
4. only if V2 still clearly wins, preserve rollback and promote without changing the production semantic identity accidentally.

`NOT_PRINT_READY` remains until physical/vendor proof exists.
