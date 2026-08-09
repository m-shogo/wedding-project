# WEDDING PASSPORT — Cover Pair Clean-Room Editorial QA

Date: 2026-08-10
State: `VISUAL_REOPENED / FRONT_V2_CREATED / BACK_V3_CREATED / STRUCTURE_QA_PASS / PRODUCTION_NOT_YET_PROMOTED`

## Live authorities

- Start/latest observed `main`: `4a22528f92b657ed412b10b3b7eb2f7fd2595cf7`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Current status at write: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Page: `01_OUTSIDE / 1:2`
- Existing production front cover: `18:2 / FRAME_FRONT_COVER`
- Existing production back cover: `18:46 / FRAME_BACK_COVER`
- Prior back-cover comparison: `92:2 / QA_BACK_COVER_CLEANROOM_V2_EDITORIAL_2026_08_09`
- New front-cover comparison: `95:2 / QA_FRONT_COVER_CLEANROOM_V2_EDITORIAL_2026_08_10`
- New back-cover comparison: `97:2 / QA_BACK_COVER_CLEANROOM_V3_EDITORIAL_2026_08_10`
- Drive authority folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

## Why this run reopened the covers again

The production front cover still presents as a generic passport template at thumbnail scale: mechanically centered English title, centered globe/emblem, literal travel-device decoration, fake `PASSPORT No. 1024`, and fake credential-style footer. The prior back-cover V2 removed fake itinerary/MRZ/stamp signals successfully, but its large empty field and concentric rings still read too close to sparse template minimalism when judged against the reopened sellable-art-direction bar.

The goal of this run was therefore not micro-polish. It was to create a materially different cover-pair language that would plausibly be selected from scratch.

## New front-cover clean-room V2 — `95:2`

Created natively without touching production.

Art direction:

- strong asymmetric two-field composition: deep navy editorial index rail + warm ivory main field;
- narrow burgundy separator and restrained gold rules;
- Japanese-first hero title `旅のはじまり` in Noto Serif JP;
- verified date/location isolated in the left rail rather than treated as passport credentials;
- booklet contents described directly (`料理と飲みもの`, `席次のご案内`) instead of fake transport metadata;
- old globe, airplane, fake passport number, fake validity language, fake machine-readable cues removed from the clean-room direction;
- initial concentric target-like ring field was visually rejected during the same run and replaced with irregular native SVG contour/route linework with three small route anchors;
- lower-left Japanese editorial note provides rhythm without equal-card/web-UI structure.

### Front screenshot QA

Whole/reading scale showed materially stronger hierarchy than production `18:2`: the cover no longer depends on a centered badge/emblem and can be recognized from thumbnail scale by its Japanese title and asymmetric rail.

Actual-size render at native `1480 × 2100` was also inspected. Japanese title/body/date/index/footer remain legible; the contour field stays subordinate to typography; the burgundy separator is visually crisp; no fake passport-number or credential string remains.

This is a serious clean-room comparison, not yet production promotion evidence.

## New back-cover clean-room V3 — `97:2`

Created natively without touching production or deleting prior V2 `92:2`.

Art direction:

- mirrored cover-family logic: warm ivory main field + deep navy right rail + burgundy separator;
- Japanese-first `旅のつづきへ` title and thank-you copy;
- verified date/location only in the rail;
- no MRZ, fake itinerary, entry stamp, passport number, fake validity text, airplane icon, gradient, shadow, or web-card layout;
- irregular route/contour field replaces the prior V2 concentric-ring motif;
- `この冊子はここまで。` acts as the closing rail cue without inventing event facts.

### Back screenshot QA

Whole/reading scale shows a substantially more deliberate pair with the new front cover than prior V2. The page is still restrained, but it is no longer visually dependent on empty space + circles; the rail, large Japanese title, thank-you block, contour field, and footer form a clear editorial sequence.

Actual-size render at native `1480 × 2100` was inspected. Main thank-you copy, note text, route linework, date/location rail and footer remain readable with no visible overlap or clipping.

## Structure readback

Front clean-room `95:2`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `16`
- IMAGE-fill nodes: `0`
- raster image nodes: `0`
- text overflow outside frame: `0`
- native vector/boolean nodes: `9`
- production node `18:2` untouched

Back clean-room `97:2`:

- frame: `1480 × 2100`
- `clipsContent=true`
- native text nodes: `13`
- IMAGE-fill nodes: `0`
- raster image nodes: `0`
- text overflow outside frame: `0`
- native vector/boolean nodes: `7`
- production node `18:46` untouched
- prior comparison `92:2` preserved for rollback/comparison history

All variable/finalization-sensitive copy remains native editable text. No names, QR values, room directions, guest data, or unverified venue facts were invented.

## Image-generation workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

The scheduled execution environment did not expose the image-generation tool in this run, so no claim is made that new imagery was generated. The run continued with high-value native Figma art direction instead of stopping. No previously generated generic travel image was force-adopted because the current cover defects were primarily composition, typography and literal passport-template signals, and the available prior candidates would have reintroduced generic travel-stock/airplane/stamp cues.

- newly generated candidates: `0`
- adopted generated assets: `0`
- rejected/forced uploads: `0`

## Drive

Drive authority folder was live-read before design continuation and again before Git evidence write.

- Drive folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- Drive changes this run: `0`
- reason: no generated or other raster asset met the adoption bar; native Figma work closed the highest-value visual defect without polluting the asset folder.

## Decision

`VISUAL_COMPARISON_ADVANCE / COVER_PAIR_CLEANROOM_CREATED / STRUCTURE_QA_PASS / PRODUCTION_NOT_YET_PROMOTED`

Do **not** mark the WEDDING PASSPORT covers `SELLABLE_VISUAL_QA_PASS` yet. The clean-room direction is materially stronger than production, but one more comparison run should check optical density and whether the front index copy / lower-left note can be tightened further before production promotion.

Next safe target inside WEDDING PASSPORT:

1. compare `95:2` vs production `18:2` and `97:2` vs production `18:46` at identical thumbnail/reading scales;
2. if the new pair still wins, preserve explicit rollback frames and promote the semantic production identities carefully;
3. after cover promotion, verify all four Passport production pages as one spread family before moving to BOARDING PASS.

`NOT_PRINT_READY` remains until physical/vendor proof exists.