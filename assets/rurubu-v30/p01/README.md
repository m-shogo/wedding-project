# V30 P01 production assets

Status: `P01_FINAL_REWORK_COMPLETE / CLEAN_STANDALONE_LAYOUT_PROXIES_ACTIVE / FINAL_PHOTO_QA_PENDING`

P01 is the V30 pilot page.

The final targeted REWORK stays CURRENT at Figma node `3535:7`. **Do not roll back to FIRST BUILD.** The contaminated Visual-Master-crop proxies and weak split modules have been removed from active Figma LIVE.

Current gates:
- `BEST_CURRENT = YES`
- `FIGMA_STRUCTURE_READY = YES`
- `CLEAN_PROXY_PASS = YES`
- `BUNDLED_DISPLAY_MODULE_PASS = YES`
- `VISUAL_CARRYOVER_PASS = YES`
- `REFERENCE_DELTA_PASS = YES / IMPROVED`
- `FIGMA_DESIGN_COMPLETE = YES`
- `FINAL_PHOTO_QA_PENDING = YES`
- `PRINT_READY = NO`

Required authority:
- `docs/RURUBU-CURRENT.md`
- `assets/rurubu-v30/manifest.json`
- `assets/rurubu-v30/visual-polish-manifest.json`
- `assets/rurubu-v30/p01/manifest.json`
- `assets/rurubu-v30/p01/polish-manifest.json`
- `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

## Direct P01 Visual Master rereview — 2026-09-02

The owner re-uploaded `P01.png` and the page was rereviewed specifically for production object boundaries.

Confirmed:
- fixed authored display modules may be complete generated/prepared assets;
- visible fixed short text does not need to remain editable in Figma;
- Hero + Feature 1–3 real-photo content remains separately replaceable;
- P01.png/page screenshots are comparison references only and may not be used as photo fills;
- large bottom flowers remain separate from Bottom Story where independent overlap is useful;
- left/right tropical/destination clusters, rings and airmail border remain independent page art.

The current owner-approved Date module text is:
- `WEDDING DATE`
- `2026.10.24`
- `SAT`

This current wording overrides the Visual Master's reference wording `Date / 2026.10.24 / Sat.` for final visible copy.

## Fixed display modules

Current module boundaries are authoritative in `p01/polish-manifest.json`.

Complete fixed modules include:
- `るるぶ`
- `WEDDING`
- `Shogo & Shiori` + yellow/blue ribbon
- `2026` + year burst/attached route ecology
- Date Ticket
- Feature 1 shell: `1 + ふたりのプロフィール + camera + vessel`
- Feature 2 shell: `2 + 旅の思い出 + airplane/route + vessel`
- Feature 3 shell: `3 + 家族と友達 + flower/leaf + vessel`
- Bottom Story: `ふたりの“楽しい!”を詰めこんだ / わたしたちの旅ストーリー`
- `OUR JOURNEY / TAKE A TRIP`
- `PAGE / 01`

Replaceable photos remain separate:
- Hero two-person photo
- Feature 1 couple/profile photo
- Feature 2 travel/place photo
- Feature 3 group/friends photo

`家族と友達` is a P01 cover teaser and does not alter P05's FRIENDS-only role.

## Visual-Master crop proxies — QA HISTORY ONLY

Do not actively use:
- `V30_P01_HERO_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`
- `V30_P01_FEATURE_1_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`
- `V30_P01_FEATURE_2_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`
- `V30_P01_FEATURE_3_VISUAL_PROXY_FROM_MASTER_CALIBRATION.png`

Reason: page decoration/background can be baked into those crops, duplicate real page assets and falsely improve Reference Delta.

Active clean standalone layout proxies in `final-rework/` are:
- Hero → two-person couple/wedding
- Feature 1 → couple/profile
- Feature 2 → travel/place
- Feature 3 → group/friends

## Visual carry-over resolution

Completed:
- kept/requalified WEDDING, tropical/destination clusters, bottom floral and airmail border;
- replaced Date, Feature 1–3 and Bottom Story with complete fixed modules;
- replaced names ribbon and 2026 with complete clusters;
- replaced OUR JOURNEY and PAGE 01 with complete modules;
- deleted superseded split text, badge and route layers from CURRENT.

`ADOPTED` or unchanged does not mean permanently visually accepted.

## Feature irregularity

Visual Master reference sizes:
- Feature 1 ≈ `310 × 180`
- Feature 2 ≈ `330 × 190`
- Feature 3 ≈ `320 × 180`

Do not normalize them into equal UI cards. Preserve differences in module size, photo size, spacing, icon placement and local overlap. Do not add formulaic/random rotation.

## Figma cleanup completed

Accidental TEMP:
- `3708:2` — `V30 P01 / CARRYOVER REWORK / TEMP`

`3708:2` was deleted on 2026-09-02.

Do **not** delete or overwrite real P02 `3535:9`.

## Drive traceability

- Source: [01_SOURCE_KEYED/P01](https://drive.google.com/drive/folders/1AIbUPb18DFdT035NW_3tSsCgp22Ct1-o)
- Production: [02_PRODUCTION_RGBA/P01](https://drive.google.com/drive/folders/1-zfSYIrxrPnwWQuAXO8-toHZEuz-zrNr)
- QA: [90_QA_EXPORT/P01](https://drive.google.com/drive/folders/1YQpvXrh8qHyv_LXLXoPYPC90dzQw3bAk)
- FIRST BUILD baseline: [P01_FIRST_BUILD_BASELINE](https://drive.google.com/drive/folders/1ggtQ4j0TCqBKm8O3hwVqkC0wbPDhZAKW)
- Promoted REWORK evidence: [P01_REWORK_CURRENT_QA_20260902](https://drive.google.com/drive/folders/1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d)
- Rejected: [99_REJECTED_DO_NOT_USE/P01](https://drive.google.com/drive/folders/1DXJ3gIlZalOiCeytBRnm425s3W9KO-bb)

## Next P01 production

When owner-approved final photographs are supplied, replace only the four photo fills while preserving the accepted masks, display modules, overlaps and CURRENT node `3535:7`.
