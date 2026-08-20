# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_HB_PREFERRED / PROFILE_QA_GZ_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_GR_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / CURRENT_CHANGED_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer HB `2010:2`; back `2010:3`; front `2010:52`; x `272000`, y `0`.
- Profile / Q&A GZ `2004:2`; Q&A right `2004:49`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; guide right `2003:24`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; Cafe left `2012:3`; Table right `2012:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan GR `2007:2`; left `2007:3`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 HB + GZ/GW + GY MEMORY SPOTS + HC CAFE & TABLE + GR 1DAY PLAN · V7 HOLD`

Rollback state:

- GV `2006:2` hidden rollback for HB.
- GL `2000:2` hidden rollback for HC.
- GU `1975:2` remains older Outer rollback.
- GQ `1968:71` hidden rollback for GR.
- HA `1996:99` hidden rollback for GZ.
- Memory predecessor `1976:2` remains hidden rollback for GY.
- GX `2002:2` remains hidden rejected experiment.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — HB Outer reader-facing copy + minor-beat hardening

### Visible problem

GV was structurally clean, but two finish defects remained visible when all six spreads were compared at the same scale:

1. front/back support labels such as `YOKOHAMA ISSUE 2026`, `PHOTO / FOOD / MEMORY`, `TRAVEL LOG`, and `YOKOHAMA MEMORY ROUTE / 6 SCENES` still read like generic template tokens rather than a finished Japanese travel-magazine issue;
2. back chronology `02 / お出かけ` and `04 / 同棲` were intentionally subordinate but became too visually weak at actual size compared with 01/03/05/06.

### Bounded test

Rollback-safe duplicate from GV changed only native text and minor-beat typography:

- `TRAVEL LOG` → `旅の記録`;
- back editorial note → `横浜で集めた / 6つの景色`;
- front issue label → `横浜・ふたり旅 / 2026`;
- front issue metadata → `景色・食・思い出`;
- front hero/bottom microcopy → Japanese reader-facing captions;
- `02 / 04` ordinals increased from `20px → 28px` and labels from `15px → 16.5px` while staying clearly below major 01/03/05/06 scale;
- no photo, crop, image hash, fact, palette, card, shadow, gradient, generated asset or page count change.

### Failure / correction

The first HB candidate failed visual/structure QA and was not promoted:

- `04` wrapped vertically because the enlarged ordinal inherited an insufficient text box;
- after widening the box, 02/04 contacted nearby labels in three places.

The ordinal boxes were widened and both minor beats were repositioned before re-QA.

### Verification

- whole spread `1200×849`: PASS and more reader-facing than GV;
- actual-size back `2010:3 / 794×1123`: PASS;
- actual-size front `2010:52 / 794×1123`: PASS;
- front same-parent text collisions: `0`;
- back same-parent text collisions: `0`;
- front/back 18px text safe-area risks: `0`;
- new image hashes: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Same-run verified progress — HC Cafe/Table reader-facing Japanese microcopy

### Visible problem

GL's composition and photography were already acceptable, but multiple small labels still read like internal or stock template role names at actual size: `YOKOHAMA / CAFE GUIDE`, `CAFE NOTE`, `VIEW & WALK`, `TABLE & TALK`, `TABLE NOTE`, `CHECK! / 2 FAVORITES`, and English-heavy utility copy. The layout therefore looked slightly more like an AI editorial template than a finished Japanese travel-information spread.

### Bounded test

Rollback-safe duplicate from GL kept all photography, image hashes, geometry, color fields and native content hierarchy unchanged. Only small native labels were rewritten for the reader:

- `YOKOHAMA / CAFE GUIDE` → `横浜 / カフェ案内`;
- `CAFE NOTE / 01` → `休日カフェ / 01`;
- `VIEW & WALK` → `景色とさんぽ`;
- `CAFE CHECK / 3 PICKS` → `3つのカフェメモ`;
- `TABLE & TALK / FAVORITE` → `食卓 / ふたりの定番`;
- `03 / TABLE & TALK` → `03 / 食卓の時間`;
- `TABLE NOTE / 04` → `旅の余韻 / 04`;
- `CHECK! / 2 FAVORITES` → `ふたりの定番 / 2つ`;
- the utility summary was rewritten as Japanese `カフェ / 食卓 / おすすめ / 気分` reader information;
- folios and closing metadata were changed from generic English role labels to Japanese editorial wording.

### Verification

- whole spread `1200×849`: PASS and more finished than GL;
- Cafe actual-size `2012:3 / 794×1123`: PASS;
- Table actual-size `2012:33 / 794×1123`: PASS;
- Cafe visible native text: `20`;
- Table visible native text: `22`;
- same-parent text collisions: `0` on both pages;
- 18px text safe-area risks: `0` on both pages;
- image geometry/hash changes: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read Rurubu base feed and neutral non-Rurubu feed under the scope firewall;
- consumed only neutral methods, never non-Rurubu item-specific production nodes/assets/state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- HB gives additional local evidence for existing RSL-133 (minor information must remain legible at actual size) and RSL-153 (reader-facing Japanese utility/microcopy), without creating a duplicate rule;
- HC gives another materially different Rurubu spread verification for the same reader-facing microcopy principle: role/schema labels that have no brand or factual job should be rewritten for the reader before adding visual decoration;
- failure fingerprint observed in HB: `TYPE_SCALE_WITH_STALE_TEXTBOX_WRAP_OR_CONTACT`; changing type scale requires box/flow and collision revalidation.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Latest run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HB adopted + visually verified: YES;
- HC adopted + visually verified: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- rollback states preserved: YES;
- V7 touched: NO.

Photo-pool repetition remains a quality ceiling rather than a numerical target. Do not reduce counts with semantically false photography.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 HB + GZ/GW + GY + HC + GR = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before choosing the next defect.
4. Prioritize remaining dead-space/hierarchy problems before adding containers.
5. Keep reader-facing Japanese microcopy where generic template labels remain, while preserving deliberate brand/genre English where it has a real role.
6. Keep minor editorial beats subordinate but still legible at actual size.
7. Keep variable Q&A/profile copy in native Auto Layout with fresh realistic Japanese long-copy stress after material type/layout changes.
8. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
9. Do not chase photo-diversity counts with semantically false assets.
10. Keep generated section masters unadopted until quality-preserving transport materially improves.
11. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.