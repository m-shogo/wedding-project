# 2026-08-11 Rurubu WEDDING feedback — CK wide-hero clean-room

Scope: Rurubu WEDDING only. Current outer `77:18` and Current inside `77:290` remained untouched.

## Observation

The prior outer comparator CE improved editorial hierarchy but still showed visible hero softness at actual size. The source image hash `539c259be8036b481d06b4f76db9a39b407d90e8` is a verified `1356 × 560` waterfront derivative; placing it into a `793.7 × 700` FILL box made the geometry itself a quality defect because the source height was effectively enlarged and heavily cropped.

The lower feature area also retained too much quiet ivory relative to the user-requested Japanese travel-magazine density.

## Principle tested

Placed geometry is part of image QA. When an accepted raster looks weak because the layout forces enlargement or a hostile crop, test a role-appropriate/aspect-respecting frame before generating more decoration or lowering the quality bar.

For magazine density, prefer:
- one dominant photograph
- one dominant feature number/title
- unequal supporting photos
- intentional overlap
- direct native typography

over introducing another card, background field, badge, or shadow.

## Experiment and evidence

Safe duplicates progressed through CG `809:2`, CH `810:2`, CI `811:2`, CJ `812:2`, then CK `813:2`.

CK front `813:131` uses:
- wide hero `813:133`, `793.7 × 345`, hash `539c259...`
- secondary photo `813:153`, `368 × 252`
- large lower destination photo `813:167`, `698 × 386`
- native `01 >> 02/03` typography
- no new UI card system

Whole-item, page/reading and natural-size review were completed. Structure QA after a detected 2px feature-title/descriptor collision was repaired:
- visible native text `37`
- visible IMAGE fills `7`
- same-parent text intersections `0`
- fold `813:184`, visible, x `792.7`, `2 × 1122.5`

Status: **CK is the strongest outer comparator, not Current.** Inside comparator remains CC `801:2`.

## Important boundary

The wide hero source is the already verified history derivative, not the V5-01 cover Q60 derivative. It is legitimate for composition testing but does not satisfy cover-role provenance and must not advance `PHOTO_ROLE_PASS`.

This distinction is reusable beyond Rurubu:
> A visually successful asset reuse can prove layout geometry without proving semantic source correctness. Keep composition acceptance separate from asset-role completion.

## Binary-transfer learning

Fresh Q60 Drive readback remains exact: ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`, JPEG, `155,439 bytes`, known SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`.

Two newly tested paths did not mutate Figma:
- direct Drive URL with `figma.createImageAsync()` — API unsupported in this runtime, atomic failure
- manually transcribed large base64 chunk — encoded-length guard caught truncation before mutation

The existing `rurubu_v5_binary` namespace contains only partial historical Q60 chunks, so exact reconstruction is not yet possible from preserved data alone.

Reusable process lesson:
> Binary staging must originate from deterministic machine bytes and use small guarded segments. A hand-pasted long base64 payload is not an acceptable production transport boundary.

## State

- new image generation: `0`
- newly accepted generated master: `0`
- new external image binary placed: `0`
- existing verified image reused in CK geometry: YES
- CK placed and visually/structurally verified: YES
- exact Q60 placed: NO
- V5 complete: NO
- V6 started: NO
