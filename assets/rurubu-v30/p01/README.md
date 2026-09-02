# V30 P01 production assets

Status: `P01_PROMOTED_CURRENT_WITH_CARRYOVER_PROXY_AND_MODULE_DEBT / FINAL_PHOTO_QA_PENDING`

P01 is the V30 pilot page.

The targeted REWORK remains materially better than FIRST BUILD and stays CURRENT at Figma node `3535:7`. **Do not roll back to FIRST BUILD.**

However, final acceptance is reopened because:
- visible FIRST BUILD production art was intentionally carried into CURRENT;
- Hero + Feature 1–3 active proxies were cropped from the P01 Visual Master and are now deprecated;
- fixed display objects need to be rebuilt/requalified as complete modules rather than generic Figma text/shapes.

Current gates:
- `BEST_CURRENT = YES`
- `FIGMA_STRUCTURE_READY = YES`
- `CLEAN_PROXY_PASS = NO`
- `BUNDLED_DISPLAY_MODULE_PASS = NO`
- `VISUAL_CARRYOVER_PASS = NO`
- `REFERENCE_DELTA_PASS = REOPENED`
- `FIGMA_DESIGN_COMPLETE = NO`
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

Next proxies must be clean standalone photos:
- Hero → two-person couple/wedding
- Feature 1 → couple/profile
- Feature 2 → travel/place
- Feature 3 → group/friends

## Visual carry-over debt

Current direction:
- keep/requalify accepted WEDDING, tropical/destination clusters and airmail border;
- replace old Date/Feature 1–3/Bottom Story visual language with complete fixed modules;
- requalify names ribbon backing;
- rework/requalify OUR JOURNEY and PAGE 01;
- recheck bottom floral cluster after Bottom Story changes.

`ADOPTED` or unchanged does not mean permanently visually accepted.

## Feature irregularity

Visual Master reference sizes:
- Feature 1 ≈ `310 × 180`
- Feature 2 ≈ `330 × 190`
- Feature 3 ≈ `320 × 180`

Do not normalize them into equal UI cards. Preserve differences in module size, photo size, spacing, icon placement and local overlap. Do not add formulaic/random rotation.

## Known Figma cleanup — CODEX ONLY

Accidental TEMP:
- `3708:2` — `V30 P01 / CARRYOVER REWORK / TEMP`

Codex must delete `3708:2` at the start of the next P01 production pass.

Do **not** delete or overwrite real P02 `3535:9`.

## Drive traceability

- Source: [01_SOURCE_KEYED/P01](https://drive.google.com/drive/folders/1AIbUPb18DFdT035NW_3tSsCgp22Ct1-o)
- Production: [02_PRODUCTION_RGBA/P01](https://drive.google.com/drive/folders/1-zfSYIrxrPnwWQuAXO8-toHZEuz-zrNr)
- QA: [90_QA_EXPORT/P01](https://drive.google.com/drive/folders/1YQpvXrh8qHyv_LXLXoPYPC90dzQw3bAk)
- FIRST BUILD baseline: [P01_FIRST_BUILD_BASELINE](https://drive.google.com/drive/folders/1ggtQ4j0TCqBKm8O3hwVqkC0wbPDhZAKW)
- Promoted REWORK evidence: [P01_REWORK_CURRENT_QA_20260902](https://drive.google.com/drive/folders/1WCUtnm_trU9tEeuZ3tMFjN-PP0KEGw4d)
- Rejected: [99_REJECTED_DO_NOT_USE/P01](https://drive.google.com/drive/folders/1DXJ3gIlZalOiCeytBRnm425s3W9KO-bb)

## Next P01 production — CODEX ONLY

After authority handoff, Codex should:
1. delete TEMP `3708:2` only;
2. replace four contaminated page-crop proxies with clean standalone proxies;
3. rebuild/requalify fixed display modules according to `p01/polish-manifest.json`;
4. preserve all replaceable photo slots;
5. capture fresh CURRENT screenshot;
6. run `CLEAN_PROXY → BUNDLED_DISPLAY_MODULE → IDENTITY_ANCHOR → VISUAL_CARRYOVER → REFERENCE_DELTA`;
7. report remaining debt before moving to P02.

`BEST CURRENT ≠ FINAL COMPLETE.`
