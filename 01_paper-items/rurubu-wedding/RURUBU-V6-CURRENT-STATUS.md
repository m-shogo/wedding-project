# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_GU_PREFERRED / PROFILE_QA_GZ_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_GL_PREFERRED / ONE_DAY_PLAN_GQ_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / ALL_12_CURRENT_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh final live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer GU `1975:2`; x `272000`, y `0`.
- Profile / Q&A GZ `2004:2`; Q&A right `2004:49`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; guide right `2003:24`; x `272000`, y `1300`.
- Gourmet / Cafe GL `2000:2`; Cafe left `2000:3`; Table right `2000:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GQ `1968:71`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 GU + GZ/GW + GY MEMORY SPOTS + GL CAFE & TABLE + GQ 1DAY PLAN · V7 HOLD`

Latest rollback / proof state:

- HA `1996:99` hidden rollback for GZ.
- GZ long-copy proof `2004:101` hidden evidence.
- GV `1976:2` hidden rollback for GY.
- GX `2002:2` hidden rejected experiment.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — GY Memory Spots reader-facing hierarchy

### Problem

GV right page was structurally clean but SPOT 03 still read as a small inserted module beside the stronger SPOT 04. It also retained generic English semantic labels at actual size.

### Adopted GY changes

- `4 PLACES / OUR YOKOHAMA` → `横浜 / 4つの寄り道`;
- SPOT 03 ordinal `72 → 82px`;
- SPOT 03 title `27 → 31px`;
- SPOT 03 body `12.5 → 13.5px`;
- `MINATOMIRAI / SUNSET / WALK` → `夕暮れどき / 水辺をさんぽ`, `10.5 → 11.5px`;
- `04 / TABLE & TALK` → `04 / 食卓の時間`;
- guide semantic labels changed to Japanese-first reader copy (`おすすめ時間 / 気分 / 写真 / カフェ / 夕景 / 食卓`);
- all photo roles, crops and image hashes unchanged.

Initial candidate had one real `GUIDE_DECK ↔ SPOT03_NUM` overlap ≈ `104×6px`; fixed before promotion.

Verification:

- whole spread 1200px: PASS;
- actual-size guide right `2003:24 / 794×1123`: PASS;
- visible text collisions: `0`;
- 18px safe-area risks: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Same-run verified progress — GZ Q&A actual-size secondary-copy hardening

Fresh actual-size audit of HA found meaningful reader-facing roles at `9–10.5px`. GZ raised only those roles to `11.5px`, including Q5 answer, Q6 kicker, support-photo caption and editorial notes. Primary Q&A hierarchy and all image roles remained unchanged.

Dedicated Q5 long-copy proof expanded the answer to `70px` height. First proof failed by `4px` against the bottom closing line; the candidate was not adopted in that state. Moving only the bottom closing line `y 995 → 1010` restored reserve.

Verification:

- whole spread 1200px: PASS;
- actual-size Q&A `2004:49 / 794×1123`: PASS;
- production collisions: `0`;
- 18px safe-area risks: `0`;
- long-copy proof after repair: collision `0`, safe risk `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Rejected same-run experiment — GX Outer texture reuse

GX reused the already-verified Cafe composed travel texture behind the back chronology at low opacity. It rendered correctly but did not materially improve chronology hierarchy and made unrelated sections feel more visually homogenized.

Decision: `REJECTED`.

Failure fingerprint:
`CROSS_SECTION_COMPOSED_TEXTURE_REUSE_GENERICITY`.

If chronology later needs composed support, prefer a chronology-specific role brief rather than cosmetic cross-section texture reuse.

## Final all-six QA

Fresh live audit after GY/GZ promotion:

- preferred spreads: `6` / physical pages: `12`;
- visible native-text collisions: `0`;
- 18px text safe-area risks: `0`;
- visible implementation/proof/placeholder leakage: `0`;
- visible IMAGE roles: `29`;
- unique image hashes: `8`.

Asset reconciliation:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GU-GZ-GW-GY-GL-GQ-ACTIVE-ASSET-RECONCILIATION-2026-08-20.json`

QA evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GY-GZ-READER-FACING-HIERARCHY-QA-2026-08-20.md`

Feedback:
`docs/wedding-design-learning-feedback-log.append/2026-08-20-rurubu-v6-gy-gz-reader-facing-hierarchy.md`

Learning:
`docs/design-learning/rurubu-shared-learning-feed.append/2026-08-20-rsl-149-151-reader-copy-and-texture-reuse.md`

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read the Rurubu base feed and neutral non-Rurubu feed under the scope firewall;
- consumed only neutral cross-scope methods, not non-Rurubu item-specific Figma/Drive/asset/layout state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- RSL-149 Japanese-first semantic microcopy: `VERIFIED_CROSS_ITEM` after independent Rurubu receiving-item reproduction of an already cross-item neutral method;
- RSL-150 meaningful secondary-copy actual-size hardening: `VERIFIED_CROSS_ITEM` after independent Rurubu reproduction including long-copy failure/retest;
- RSL-151 cross-section texture reuse genericity: `REJECTED`, not a project rule.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- GY adopted + visually verified: YES;
- GZ adopted + visually verified: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

Photo-pool repetition remains a quality ceiling rather than a numerical target. Waterfront, cafe and dining hashes still appear five times each. Do not reduce counts with semantically false photography.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 GU + GZ/GW + GY + GL + GQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ALL_12_CURRENT_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read exact live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Keep actual-size QA focused on meaningful reader-facing secondary copy; do not blindly enlarge decorative microcopy/folios.
5. Continue removing UI-like containers only where contrast/grouping can be replaced by native hierarchy and a legitimate visual anchor.
6. For variable Q&A/profile copy, retain native Auto Layout and fresh realistic Japanese long-copy stress after material type/layout changes.
7. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
8. Do not chase photo-diversity counts with semantically false assets.
9. Keep generated section masters unadopted until quality-preserving transport materially improves.
10. If a section needs composed decoration, prefer section-specific role briefs over repeated generic texture treatment.
11. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
