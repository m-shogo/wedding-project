# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_HD_PREFERRED / PROFILE_QA_GZ_PREFERRED / STORY_CHRONOLOGY_HJ_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / CURRENT_CHANGED_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE` after the HJ promotion:

- Outer HD `2014:2`; x `272000`, y `0`.
- Profile / Q&A GZ `2004:2`; x `273800`, y `0`.
- Story / chronology HJ `2024:2`; Story left `2024:3`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 HD + GZ/HJ + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`

Rollback / comparison evidence:

- GW `1987:2` hidden rollback for HI/HJ.
- HI `2023:111` hidden rollback for HJ.
- earlier preferred/rejected studies remain hidden and preserved.

## Latest verified progress — HJ Story photo-led title + deeper support overlap

### Visible problem

When all six preferred V6 spreads were compared at the same scale, the Story left page was the clearest remaining hierarchy gap. GW opened as `cream title/deck field → hero image`, which was quieter and more template-like than the photo-led 1DAY spread. After the first photo-led correction, the small support photograph still sat as a separate module below the hero rather than helping bind the photo field into the paper transition.

### Root-cause hypothesis

The defect was not missing photography or missing decoration. The existing waterfront hero already had a credible text-safe sky and the existing source-safe support image could carry more editorial responsibility. Integrating native title/deck directly into the hero, then letting the support image cross the hero/paper seam, should increase magazine continuity without new assets or larger rasters.

### Bounded tests

#### HI — photo-led title field

Rollback-safe duplicate from GW:

- existing hero hash `539c259be8036b481d06b4f76db9a39b407d90e8` remained `820×520`; only y moved `132 → 0`;
- native `ふたりの旅は、ここから。` and deck moved onto the photo and changed to white;
- existing kick retained;
- native title/deck were re-appended above the photo in z-order;
- no image, hash, crop, page, card, shadow field, gradient or generated decoration was added.

Actual-size review found the old white hero caption had fallen onto the cream field after the hero moved. That candidate state was rejected. The caption was moved to `y=492` inside the hero and the cyan photo edge to `y=512` before HI was accepted locally.

#### HJ — deeper source-safe support overlap

Rollback-safe duplicate from HI:

- support photo hash `644f449c3bf2001a94d4b822d2b55e2614c11042` remained `238×216`, rotation unchanged;
- only y moved `424 → 360`, so it crosses the hero/paper seam more intentionally;
- its native caption moved with it to the image edge;
- no new image, hash, crop, card or decoration was introduced.

### Failure fingerprints / corrections

- `RECTANGLE_WIDTH_DIRECT_ASSIGN_READONLY`: first HI write tried direct `width` assignment on a rectangle and failed atomically. Immediate readback showed no mutation; method switched to `resize()`.
- `PHOTO_LED_TITLE_CAPTION_CONTEXT_DRIFT`: moving the photo changed the background under the existing white caption. Actual-size screenshot caught the white-on-cream regression before adoption; caption/edge were moved back onto the photo.

### Verification

HJ `2024:2`:

- whole spread `1200×849`: PASS and stronger than HI/GW;
- actual-size Story left `2024:3 / 794×1123`: PASS;
- visible Story native text: `12`;
- same-parent Story text collisions: `0`;
- Story 18px text safe-area risks: `0`;
- page-level stray text near the candidate: `0`;
- Story visible image hashes unchanged from GW/HI:
  - hero `539c259be8036b481d06b4f76db9a39b407d90e8`;
  - support 1 `644f449c3bf2001a94d4b822d2b55e2614c11042`;
  - support 2 `c1ada11205bc3978bf426b304d683f1c1566cac2`;
  - composed travel texture `691a6ceed471a5d8efa144052a10564eed177b4f`;
- chronology side inherited from GW and remained collision/safe-area clean in the HJ clone;
- new image hashes: `0`.

Decision: `HJ ADOPTED / VERIFIED_LOCAL`.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HJ placed as preferred: YES;
- HJ whole / actual-size visually verified: YES;
- GW and HI preserved hidden as rollback: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- V7 touched: NO.

## Shared learning

- Shared system, Rurubu feed and neutral non-Rurubu feed were read before writes.
- Only neutral principles/capabilities/failure fingerprints were consumed from non-Rurubu work; no non-Rurubu item-specific production data was inspected or edited.
- `RSL-156` records the HJ lesson: a source-safe, semantically valid support photo can bridge a photo-led hero/paper seam through controlled overlap without adding a new asset.
- State remains `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`; exact Yokohama photography, y-position, angle, headline, palette and Rurubu editorial grammar remain item-specific.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 HD + GZ/HJ + GY + HC + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and current main before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Prioritize remaining dead space, weak editorial hierarchy and repeated-photo roles before adding cards/containers.
5. Use controlled overlap only where photo semantics/source fidelity and actual-size text safety support it.
6. Keep variable Q&A/profile copy native and rerun realistic long-copy stress after material layout/type changes.
7. Never invent unresolved dates/details for visual completeness.
8. Do not chase photo-diversity counts with semantically false assets.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
