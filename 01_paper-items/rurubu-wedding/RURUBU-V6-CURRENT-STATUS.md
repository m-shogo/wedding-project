# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_HN_PREFERRED / PROFILE_QA_HK_PREFERRED / STORY_CHRONOLOGY_HJ_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / CURRENT_CHANGED_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / PHOTO_REPETITION_REDUCED_WITHOUT_FALSE_ASSET / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE` after HK and HN promotion:

- Outer HN `2029:2`; x `272000`, y `0`.
- Profile / Q&A HK `2027:2`; Profile left `2027:3`; x `273800`, y `0`.
- Story / chronology HJ `2024:2`; Story left `2024:3`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 HN + HK/HJ + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`

Rollback / comparison evidence:

- HD `2014:2` hidden rollback for HN.
- GZ `2004:2` hidden rollback for HK.
- GW `1987:2` and HI `2023:111` remain hidden rollback/comparison for HJ.
- earlier preferred/rejected studies remain hidden and preserved.

## Latest verified progress — HK photo-led Profile opening

### Visible problem

The Profile left page still opened as `cream title field → 328px photo`, while the newer Story and 1DAY pages already used dominant photography as the page-opening field. At whole-spread scale this made Profile read more like a template section than a travel-magazine opener.

### Root-cause hypothesis

The problem was not missing imagery. The existing Profile hero hash already had enough intrinsic headroom and a usable text-safe map/camera area. Extending that legitimate photo upward and moving existing native title/deck into it should remove the false header section without generating or transporting another asset.

### Bounded test

Rollback-safe duplicate HK `2027:2` from GZ:

- hero `2027:11`, hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, changed from `793.7×328 / y=140 / -1.1°` to `793.7×480 / y=0 / 0°`;
- intrinsic source verified `944×608`, so display remains source-safe;
- native title `ふたりのこと、` and magenta accent `もっと。` moved into the photo-led opening;
- native deck moved into a clear top-right text-safe zone;
- native profile name/quote remained editable;
- lower route texture and two replaceable snapshots remained independent roles;
- Q&A page was not redesigned in this test.

### Verification

HK `2027:2`:

- 500px whole spread: PASS and stronger than GZ;
- 1200px whole spread: PASS;
- actual-size Profile `2027:3 / 794×1123`: PASS;
- Profile visible native text: `26`;
- Profile text collisions: `0`;
- Profile 18px text safe-area risks: `0`;
- Q&A visible native text: `29`;
- Q&A text collisions: `0`;
- Q&A 18px text safe-area risks: `0`;
- visible Profile image intrinsic violations: `0`;
- new image hashes: `0`.

Decision: `HK ADOPTED / VERIFIED_LOCAL`.

## Latest verified progress — HN cover repeated-photo subtraction + text-led Feature 03

### Visible problem

HD front already had a strong Yokohama hero and a large dining support photo, but a second small cafe photograph was still used for Feature 03. Across the current six preferred spreads the same cafe source was already repeated heavily, and this particular cover role carried no unique location/factual evidence. It made the lower cover feel like another photo-card collage rather than an intentionally edited feature hierarchy.

### Root-cause hypothesis

The cover did not need a replacement photograph. Feature 03 could carry its role through native Japanese typography while the large dining photo retained photographic mass. This should reduce repeated-photo/card feel without introducing a semantically false alternate asset.

### Bounded test

Rollback-safe HN `2029:2` from HD:

- hid only the front cafe support photo formerly at HD `2014:65` / HN clone `2029:76`, hash `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- preserved the dining support image and all other cover photography/crops/hashes;
- promoted native `03` to a large yellow ordinal;
- promoted native `ゲストと楽しむ\n旅のしおり` to a navy text-led feature on cream;
- retained a narrow yellow binding rail;
- no new photo, card, generated decoration, image hash, or factual copy was introduced.

Initial HN inherited a white Feature 03 title from the previous photo-overlay role, causing low contrast on cream. That state was rejected. The title fill was changed to the existing cover navy and reverified.

### Verification

HN `2029:2`:

- 1200px whole spread: PASS and stronger than HD;
- actual-size front `2029:63 / 794×1123`: PASS;
- front visible native text: `13`;
- back visible native text: `26`;
- front/back text collisions: `0`;
- front/back 18px safe-area risks: `0`;
- front/back image intrinsic violations: `0`;
- new image hashes: `0`.

Current preferred-image audit after HN + HK:

- visible IMAGE roles: `28`;
- unique hashes: `8`;
- cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2`: `5 → 4` roles;
- waterfront hash `539c259be8036b481d06b4f76db9a39b407d90e8`: `5` roles;
- dining hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`: `5` roles;
- composed texture hash `691a6ceed471a5d8efa144052a10564eed177b4f`: `4` roles.

Decision: `HN ADOPTED / VERIFIED_LOCAL`.

## Failure fingerprints / corrections

- `READ_ONLY_QA_SCRIPT_SCOPE_TYPO`: one read-only HK structure-audit script referenced an undefined local variable and failed atomically; no Figma mutation occurred. Script was corrected before use.
- `PHOTO_LED_TITLE_TEXT_SAFE_AREA_DRIFT`: the first HK deck position extended into the 18px right safe area even though the screenshot looked acceptable. Deck moved to a verified top-right photo-safe zone before promotion.
- `TEXT_ROLE_CONTEXT_COLOR_DRIFT`: HN Feature 03 inherited white text from its former photo-overlay context after the photo was removed. Actual-size screenshot caught the white-on-cream regression; existing navy fill was restored before adoption.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

`10_GENERATED_MASTERS / 1pkkf4BX3ugKdR1rTkgXdp8xTaNGrQD1p` still contains the existing Rurubu V6 section masters, including Profile/Q&A/Timeline/Memories v2. They remain saved but unadopted in the current preferred spreads; no transport-only state is counted as visual progress.

This run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HK placed as preferred: YES;
- HN placed as preferred: YES;
- HK/HN whole and actual-size visually verified: YES;
- GZ/HD preserved hidden as rollback: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- Only neutral principles/capabilities/failure fingerprints were consumed from non-Rurubu work; no non-Rurubu item-specific Figma, Drive, asset, ledger, or production path was inspected or edited.
- `RSL-157` records the combined HK/HN lesson: when a semantically legitimate existing photo has enough intrinsic headroom and a text-safe zone, test giving it more editorial responsibility before adding a header/container; when a repeated support photo carries no unique evidence, test transferring that role to native typography rather than inserting a false alternate image.
- State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.
- Exact Yokohama imagery, cover numbering, magenta/yellow/navy palette, title positions, photo sizes and Rurubu editorial grammar remain item-specific.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 HN + HK/HJ + GY + HC + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and current GitHub main before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Continue reducing semantically weak repeated-photo roles without replacing them with false destination imagery.
5. Prefer legitimate existing photo fields + native Japanese typography over new header/card containers where actual-size contrast and source fidelity permit.
6. Keep variable Q&A/profile copy native and rerun realistic long-copy stress after material layout/type changes.
7. Never invent unresolved dates/details for visual completeness.
8. Keep generated section masters unadopted until quality-preserving transport materially improves.
9. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
