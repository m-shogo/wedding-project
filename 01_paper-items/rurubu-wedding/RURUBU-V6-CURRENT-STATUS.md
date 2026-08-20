# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-20
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_HD_PREFERRED / PROFILE_QA_GZ_PREFERRED / STORY_CHRONOLOGY_GW_PREFERRED / MEMORY_SPOTS_GY_PREFERRED / GOURMET_CAFE_HC_PREFERRED / ONE_DAY_PLAN_HS_PREFERRED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_3X2_LIVE_VERIFIED / CURRENT_CHANGED_PAGES_COLLISION_AND_SAFE_AREA_CLEAN / V7_HOLD / NOT_PRINT_READY`

## Live Figma preferred set

Fresh live readback on `845:2 / 00_RURUBU_START_HERE`:

- Outer HD `2014:2`; back `2014:3`; front `2014:52`; x `272000`, y `0`.
- Profile / Q&A GZ `2004:2`; Q&A right `2004:49`; x `273800`, y `0`.
- Story / chronology GW `1987:2`; chronology right `1987:28`; x `275600`, y `0`.
- Memory Spots GY `2003:2`; guide right `2003:24`; x `272000`, y `1300`.
- Gourmet / Cafe HC `2012:2`; Cafe left `2012:3`; Table right `2012:33`; x `273800`, y `1300`.
- Yokohama 1DAY Plan HS `2019:2`; left `2019:3`; right `2019:33`; x `275600`, y `1300`.

Start Here `845:27`:

`V5 FU/FX · V6 HD + GZ/GW + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`

Rollback / rejected evidence:

- HB `2010:2` hidden rollback for HD.
- HD rejected background phrase `2015:2` remains hidden evidence.
- GR `2007:2` hidden rollback for HS.
- GV `2006:2` remains older Outer rollback.
- GL `2000:2` hidden rollback for HC.
- GQ `1968:71` remains older 1DAY rollback.
- HA `1996:99` hidden rollback for GZ.
- Memory predecessor `1976:2` remains hidden rollback for GY.
- GX `2002:2` remains hidden rejected experiment.
- prior comparisons/rollbacks remain preserved hidden.

## Latest verified progress — HD Outer denser back chronology

### Visible problem

All six preferred V6 spreads were re-read live and compared at the same scale before the write. HB's front remained strong, but the back cover had the clearest remaining quality gap: a confident full-width travel-object photograph above a lower cream chronology that still read as a sparse production study. The major ordinals were present, but most events carried too little editorial responsibility compared with the photographic upper half.

### Root-cause hypothesis

The defect was not missing photography or missing containers. Major chronology beats `01 / 03 / 05 / 06` could carry a short reader-facing native support line and a minimal binding mark without increasing photo repetition or returning to UI-like cards. `02 / 04` should remain subordinate.

### Bounded test

Rollback-safe duplicate HD was created from HB and only the back chronology was recomposed:

- `ふたりの旅年表` hierarchy strengthened;
- `01 / 03 / 05 / 06` retained as major beats;
- `02 / 04` retained as smaller bridge beats;
- short native support copy added only to major beats:
  - `ふたりの旅のはじまり。`
  - `景色が増えていく。`
  - `家族として、次の旅へ。`
  - `ここからも、旅はつづく。`
- chronology kicker localized to `6つの景色 / 01—06`;
- three short functional major-beat rules added for `01 / 03 / 05`;
- no new image, generated decoration, card, shadow, gradient, fact, page, crop or image hash was introduced.

### Failures / corrections

#### `TEXT_GEOMETRY_DIRECT_ASSIGN_READONLY`

The first edit script attempted to assign `TextNode.width` directly and failed with `node.width: read-only property on TEXT node`. The Figma write was atomic. Immediate readback verified the candidate was unchanged, then the method switched to `TextNode.resize()` after loading the existing fonts.

#### `DECORATIVE_BACKGROUND_TYPE_COLLIDES_WITH_SEMANTIC_COPY`

A separate bounded experiment added large low-opacity native background typography `旅は、つづく。` (`2015:2`) behind the chronology. It looked more energetic but structure QA found `11` overlaps with semantic chronology text. It was rejected and hidden rather than counted as progress. Redundant minor explanatory notes for 02/04 were also removed.

### Verification

Adopted HD:

- whole spread `500px`: PASS and stronger than HB at chronology scan level;
- whole / reading `1200×849`: PASS;
- actual-size back `2014:3 / 794×1123`: PASS;
- actual-size front structure revalidated and visually unchanged from HB;
- back visible native text: `26`;
- back same-parent text collisions: `0`;
- back 18px text safe-area risks: `0`;
- front visible native text: `13`;
- front same-parent text collisions: `0`;
- front 18px text safe-area risks: `0`;
- back dominant image hash remains `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- front image hashes unchanged from HB;
- new image hashes: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Same-run verified progress — HS 1DAY photo-led title field

### Visible problem

After HD was promoted, the six preferred spreads were compared again. GR's right-side model-course page was already strong, but the left page still opened with a large cream title/deck field above its destination photograph. At thumbnail and page scale it read as `paper header → hero module`, which was quieter and more template-like than the rest of the current V6 set.

### Root-cause hypothesis

The existing waterfront hero already had a credible sky/text-safe area and enough source capacity to carry the native title/deck. Integrating the heading into the photograph should create one dominant editorial field, strengthen magazine energy, and reclaim vertical rhythm without adding imagery or decorative containers.

### Bounded test

Rollback-safe duplicate HS was created from GR. Only the left page changed:

- existing waterfront hero `2019:9` moved from `y=285 / 793.7×395` to `y=70 / 793.7×560`;
- hero image hash remained `539c259be8036b481d06b4f76db9a39b407d90e8`;
- native `朝から夜まで、ふたりの横浜。` moved onto the image and changed to white;
- native deck moved onto the image and changed to white;
- subtle text shadow used only for contrast on the existing image;
- hero label moved to the lower image edge;
- `10:00 / 海辺から、旅を始める。` and lower native utility content moved upward into the reclaimed rhythm;
- right page, four-stop structure, right-page images, facts and image hashes were unchanged;
- no new photo, generated decoration, card, gradient, shadow field, page or fact was added.

### Failure / correction

#### `PHOTO_LED_TITLE_Z_ORDER_OCCLUSION`

The first screenshot after extending the photo showed the native title/deck hidden behind the image because the photo remained above them in z-order. This state was rejected.

A first correction attempt called unsupported `bringToFront()` and failed atomically. The candidate remained unchanged. The method switched to re-appending the existing title/deck/label nodes to their existing parent, which correctly ordered them above the photo without rebuilding or flattening the text.

### Verification

Adopted HS:

- whole spread / ~500px: PASS and materially more photo-led than GR;
- whole / reading `1200×849`: PASS;
- actual-size left `2019:3 / 794×1123`: PASS;
- left visible native text: `23`;
- left same-parent text collisions: `0`;
- left 18px text safe-area risks: `0`;
- right visible native text: `25`;
- right same-parent text collisions: `0`;
- right 18px text safe-area risks: `0`;
- right page image roles unchanged from GR;
- new image hashes: `0`.

Decision: `ADOPTED / VERIFIED_LOCAL`.

## Shared-learning / scope behavior

- read `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md` before writes;
- read Rurubu base feed and neutral non-Rurubu feed under the scope firewall;
- consumed only neutral methods, never non-Rurubu item-specific production nodes/assets/state;
- project-wide hybrid Figma authoring remains `PROMOTED_PROJECT_RULE`;
- NRSL/RSL binding-function lessons were used only as a hypothesis: the final HD retains three short rules because they bind major ordinal/copy groups; the large background phrase was rejected because it failed structure QA;
- RSL-154 records the locally verified major-beat editorial-responsibility treatment;
- RSL-155 records the locally verified photo-led title-field treatment;
- both remain `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`, not `VERIFIED_CROSS_ITEM`;
- Rurubu-specific ordinal colors, chronology geometry, waterfront crop, title placement, wording and travel-magazine styling do not transfer automatically.

## Drive / asset truth

Drive root reverified:

`1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This run:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- HD placed as preferred: YES;
- HD whole / reading / actual-size visually verified: YES;
- HS placed as preferred: YES;
- HS whole / reading / actual-size visually verified: YES;
- HB preserved hidden as rollback: YES;
- GR preserved hidden as rollback: YES;
- native variable text preserved: YES;
- replaceable photos preserved: YES;
- V7 touched: NO.

Photo-pool repetition remains a quality ceiling rather than a numerical target. Do not reduce counts with semantically false photography.

## Previous verified progress retained

- GZ Profile/Q&A remains preferred and retains actual-size readable reader-facing native copy, dynamic Q&A text safety, replaceable photography and rollback evidence.
- GW Story/chronology remains preferred and retains its photo-bound chronology structure, confirmed-date precision and native editability.
- GY Memory Spots remains preferred and retains destination/guide hierarchy and reader-facing utility information.
- HC Cafe/Table remains preferred and retains Japanese reader-facing microcopy with unchanged image geometry/hash.

These spreads were read live before writes and were not mutated in this run.

## Completion gate

Do not call V6 complete or print-ready until all are verified:

- final legitimate photography and final copy;
- final page count and imposition;
- exact printer/product template;
- bleed / trim / fold / safe-area requirements;
- exported PDF preflight;
- physical proof.

Current state:

`V6 HD + GZ/GW + GY + HC + HS = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / PHOTO_LED_TRAVEL_GUIDE_GRAMMAR / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / CURRENT_REVIEW_BOARD_LIVE_VERIFIED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Re-read live preferred IDs and parent page before every write.
3. Compare all six preferred spreads at the same scale before selecting the next defect.
4. Prioritize remaining dead-space/hierarchy problems before adding containers or repeated photography.
5. Keep major/minor editorial hierarchy readable at actual size; do not make support information disappear merely to increase contrast.
6. Treat support copy as reader-facing information, not filler. Remove it when it does not earn its space.
7. Prove any line/rule/container still has a binding, contrast, print or physical function before retaining it.
8. Treat photo-led title fields as conditional: re-check contrast, source-size, safe-area, z-order and replacement-photo variability before adoption.
9. Keep variable Q&A/profile copy in native Auto Layout with fresh realistic Japanese long-copy stress after material type/layout changes.
10. Keep unresolved facts at authoritative precision; never invent dates/details for visual completeness.
11. Do not chase photo-diversity counts with semantically false assets.
12. Keep generated section masters unadopted until quality-preserving transport materially improves.
13. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.
