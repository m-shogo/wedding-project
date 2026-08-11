# 2026-08-11 — V5 BO/BP clean-room editorial-density run

Scope: Rurubu WEDDING only. No Passport / Boarding Pass / 青春ふたりきっぷ / ADD mutation.

## Authority and pre-write state

Fresh reads used before mutation:
- live Figma file `bfM0d4c9dCeBv5pCkJ3TNM`, page `01_RURUBU_WEDDING`
- Current outer `77:18`, Current inside `77:290` — intentionally unchanged
- `CURRENT-STATUS.md`
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- previous BM/BN feedback companion
- Google Drive Q60 cover derivative readback

Gate remains: `PHOTO_ROLE_PASS 9/10`, `DOMINANT_PHOTO_PASS 2/3`; cover hero is the only active V5 photo blocker. V6 production remains closed.

## Experiment A — BO outer

Visible problem:
- BM improved the cover hierarchy but the lower-left lead feature still read as a large rectangular content card.
- At whole-spread scale the back-cover Friends heading also had weak contrast over a busy image.
- The cover raster itself remains visibly soft/pixelated at actual size; that asset-quality defect is separate from layout quality.

Principle tested:
- further shrink and rotate the lead paper so it reads as pasted editorial matter rather than a UI panel;
- let 02/03 remain unequal, rotated photo-led supporting stories;
- fix over-photo text contrast directly rather than adding another container.

Live Figma evidence:
- outer `776:2 / V5_OUTER_RURUBU_CLEANROOM_BO_PASTED_LEAD_FEATURE_2026_08_11`
- front `776:131 / FRONT_COVER_BO_PASTED_LEAD_FEATURE`
- back `776:3`
- lead paper `776:174`: `392 × 236`, x `-18`, y `854`, rotation `-2.4°`
- support photo 02 `776:153`: x `466`, y `720`, rotation `-4.4°`
- support photo 03 `776:167`: x `504`, y `906`, rotation `4.8°`
- Friends heading `776:12`: existing native text retained, changed to white + restrained dark shadow after screenshot evidence showed low contrast.

Regression found and repaired:
- first structure QA found two real same-parent text intersections: feature 01 number/title (`4.86 px`) and feature 03 number/title (`2.03 px`).
- titles were optically separated; final QA returned `0` intersections.

Final BO structure QA:
- visible native text: `37`
- visible IMAGE fills: `8`
- same-parent visible text intersections: `0`
- fold guide `776:183`: x `792.7000122070312`, width `2`, height `1122.5`
- important preserved hashes:
  - back main `e3738476f760932bb5b09c9d60f174dd6c84049d`
  - friend cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - friend dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - support 03 old town `439a719d73f28e8dd2889f2026cccb15f345ec63`
- current BO hero hash remains `539c259be8036b481d06b4f76db9a39b407d90e8`; this is NOT the Q60 cover derivative and is still visibly inadequate at actual size.

Visual QA:
- whole outer spread: checked after repair
- front reading/actual-size: checked after repair
- back reading/actual-size: checked after contrast repair

Result: `ADOPTED_AS_BEST_STRUCTURE_CANDIDATE / NOT_CURRENT / HERO_ASSET_GATE_OPEN`.

## Experiment B — BP inside

Visible problem:
- BN right page still left a large pale-blue dead zone below the Memory Spots collage, reducing travel-magazine density.
- the left-page common-point yellow field was too tall and behaved like a broad UI/banner region.

Principle tested:
- compress the common-point strip into a flatter print-like tape;
- enlarge the dominant memory photograph;
- stagger the two support photos more tightly and use the lower page for captions rather than empty background;
- remove the stray map-pin icon after actual-size review showed it reading as UI chrome rather than useful editorial information.

Live Figma evidence:
- inside `777:2 / V5_INSIDE_RURUBU_CLEANROOM_BP_DENSE_MEMORY_2026_08_11`
- left `777:3 / INSIDE_LEFT_BP_PROFILE_STORY_TAPE`
- right `777:130 / INSIDE_RIGHT_BP_DENSE_MEMORY_EDITORIAL`
- left common tape `777:4`: `714 × 64`, x `30`, y `942`, rotation `1°`
- right lead memory `777:265`: `568 × 344`, x `18`, y `548`, rotation `1.1°`
- support 02 `777:266`: `236 × 152`, x `548`, y `538`, rotation `-3.1°`
- support 03 `777:267`: `258 × 166`, x `526`, y `768`, rotation `3°`
- decorative pin `777:201`: hidden after screenshot review.

Regression found and repaired:
- first BP reading-scale screenshot showed support-story 02 title/body squeezed under the rotated photo and partly covered by story 03.
- support 02 was shortened and given its own caption zone; story 03 was moved lower.
- final actual-size screenshot shows both support captions readable and the lower blue dead zone materially reduced.

Final BP structure QA:
- visible native text: `53`
- visible IMAGE fills: `6`
- same-parent visible text intersections: `0`
- fold guide `777:281`: x `792.7000122070312`, width `2`, height `1122.5`
- preserved hashes:
  - groom `a39dd297eb9de572317a5ce57f0af12e8597b156`
  - bride `2359f635b4926a83e22ca1f9214e75c709291152`
  - history `539c259be8036b481d06b4f76db9a39b407d90e8`
  - lead memory `adbb8e529451a81dd25e4eb29bf068655569ce25`
  - old town `439a719d73f28e8dd2889f2026cccb15f345ec63`
  - next destination `c09aa82e7b2ac75708707345c6f845452bf67663`

Visual QA:
- whole inside spread: checked
- right-page reading scale: checked
- right-page actual-size detail: checked after support-caption repair

Result: `ADOPTED_AS_BEST_INSIDE_STRUCTURE_CANDIDATE / NOT_CURRENT`.

## Q60 cover hero lifecycle state

Fresh Google Drive readback:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155439`
- local materialization SHA-256 reverified: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

Fresh Figma asset upload URL was obtained for BM hero `771:133`, but raw JPEG POST again failed before upload because this runtime could not resolve `mcp.figma.com`. No Figma mutation occurred from that attempt. The same external transport method was not repeated after this verified failure.

Strict state:
- generated this run: `NO`
- newly adopted generated image this run: `NO`
- Q60 Drive verified: `YES`
- Q60 materialized as exact JPEG bytes: `YES`
- Q60 placed in Figma: `NO`
- Q60 visual QA in Figma: `NO`
- BO/BP layout changes placed in Figma: `YES`
- BO/BP visually verified: `YES`

## Decision

BO is visually stronger than BM structurally because the cover exposes more photography and the lead feature reads as pasted editorial matter rather than a lower-page card. BP is visually stronger than BN because the Memory Spots page is denser and more continuously photo-led while preserving readable native captions.

Neither candidate is promoted to Current while the dominant cover-raster gate remains open. Current `77:18` / `77:290` remains untouched and rollback-safe.

Next highest-value work:
1. use a genuinely different binary-safe bridge for the exact Q60 asset rather than repeating the failed external upload path;
2. place Q60 first on the safe BO comparison hero and review crop at whole/front/actual size;
3. only after a quality-preserving hero is visually verified, run V5 final weakest-three / print-safe / semantic gate and decide whether BO/BP should replace Current;
4. keep V6 production closed until that gate is genuinely complete.
