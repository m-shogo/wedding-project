# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-16
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_W_CURRENT / INSIDE_BT_BV_PREFERRED_STUDIES / COMPOSED_STORY_DECORATION_PLUS_PHOTO_TYPO_HIERARCHY_VERIFIED / NATIVE_TEXT_AND_REPLACEABLE_IMAGE_ROLES_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

Live Figma and later evidence supersede older declarations.

## Live Figma current state

Start Here `845:27`:

`V5 FU/FX · V6 W + BT/BV INSIDE STUDIES · V7 HOLD`

Preferred:

- Outer W `1491:2 / PREFERRED / V6_OUTER_W_RURUBU_BACK_LABEL_SYSTEM_2026_08_16`
- Profile / Q&A BT `1488:2 / PREFERRED / V6_INSIDE_BT_RURUBU_LABEL_SYSTEM_2026_08_16`
- Story / chronology BV `1498:159 / PREFERRED / V6_INSIDE_BV_COMPOSED_STORY_EDITORIAL_2026_08_16`

Immediate hidden rollback/comparison:

- Outer V `1477:2`
- Profile/Q&A BR `1482:2`
- Story/chronology BS `1486:81`
- Story/chronology BU `1498:2` — texture-only intermediate

Older hidden comparison/proof frames remain preserved. V7 remains HOLD.

## Why BV replaced BS

W/BT/BS had already improved travel-magazine hierarchy with selective flat labels, but BS Story still read quieter and more Figma-assembled than the cover, Q&A and chronology. The lower-right Story field remained mostly cream space with native copy and small rules.

BV tests the project-wide hybrid-authoring boundary more literally:

- all factual/variable copy remains native;
- all Story photographs remain replaceable;
- fixed non-semantic travel texture is collapsed into **one composed raster decoration role**;
- temporary source artwork is not left as live ornament micro-geometry;
- existing photo roles are enlarged only within verified intrinsic source dimensions;
- the native Japanese anchor is strengthened across photo/texture space rather than adding card containers.

Intermediate BU proved that texture alone was not enough. BV combines the composed raster with a stronger photo/type relationship and is visibly stronger at whole-item and actual-size scales.

## Outer W

Unchanged in this pass.

Verified state remains:

- back native text `18` / IMAGE `3` / collision `0` / 18px safe risk `0`;
- front native text `12` / IMAGE `5` / collision `0` / 18px safe risk `0`;
- 500px whole, reading scale, and actual-size verification remain valid.

## Profile / Q&A BT

Unchanged in this pass.

Verified state remains:

- Profile native text `17` / replaceable IMAGE `4` / collision `0` / safe risk `0`;
- Q&A native text `25` / replaceable IMAGE `2` / collision `0` / safe risk `0`;
- representative Profile/Q&A values remain layout-evaluation dummy content, not final personal facts.

## Story / chronology BV

### Story `1498:160`

From BS, BV now uses:

- sunset hero `820×520`, source `1356×560`;
- skyline support `220×202`, source `240×220`;
- café support `475×325`, source `810×552`;
- one fixed textless composed travel-map/paper texture IMAGE role at `465×450`;
- composed decoration hash `691a6ceed471a5d8efa144052a10564eed177b4f`, intrinsic `720×860`;
- stronger native two-line Japanese anchor crossing the photo/texture transition;
- tightened body/travel-note metadata.

The composed raster was created from temporary artwork, exported at 2×, converted to a Figma IMAGE, then the temporary source geometry was deleted. The final file therefore keeps one fixed decoration image rather than a collection of live micro-ornaments.

Initial BV QA found one real text collision between the enlarged anchor and the support-photo caption. That state was not promoted. The caption was moved inside the support photo as small white metadata and QA rerun.

Final Story verification:

- native text `11`;
- replaceable photo IMAGE roles `3`;
- fixed composed decoration IMAGE roles `1`;
- text/text collision `0`;
- 18px text safe-area risk `0`;
- photo intrinsic-size violations `0`;
- 500px whole-item PASS;
- 1200px spread PASS;
- actual-size `794×1123` PASS.

### Chronology

Chronology is visually/structurally unchanged from BS and retains:

- yellow `TRAVEL TIMELINE` kicker;
- navy title band;
- selective major 01/03/05 beats;
- support 02/04 treatment;
- replaceable event photos;
- WEDDING terminal;
- generated Timeline module hidden.

Final chronology verification in BV:

- native text `30`;
- visible replaceable IMAGE roles `5`;
- text/text collision `0`;
- 18px text safe-area risk `0`;
- photo intrinsic-size violations `0`.

## Evidence

Latest combined evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-W-BT-BV-COMPOSED-STORY-EDITORIAL-QA-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-W-BT-BV-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

Latest learning:

- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-16-rsl-052-composed-raster-photo-typography.md`
- `docs/wedding-design-learning-feedback-log.append/2026-08-16-rurubu-v6-w-bt-bv.md`

Previous W/BT/BS evidence remains rollback/history evidence.

## Drive / generated section masters

Fresh Drive readback confirms V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Registered generated section masters remain authoritative-but-unadopted. The previously imported generated Profile hash is only `220×275` intrinsic and is not suitable for a large production role; the previously imported Timeline generated hash remains non-useful for the live chronology. Do not promote those assets merely because hashes exist.

Known external boundary remains:

`DRIVE_RAW_MASTER_REACHABLE / FIGMA_EXTERNAL_SUBMIT_PATH_UNCHANGED / NO_EXTERNAL_GENERATED_SECTION_MASTER_ADOPTION`.

Do not retry the unchanged failing external submit method without a material capability/environment change.

## Asset lifecycle truth of latest pass

- newly image-generated assets: `0`
- new Drive saves: `0`
- new external binary placements: `0`
- new in-Figma composed raster roles: `1`
- composed-raster temporary source geometry retained: `NO`
- existing verified Figma photo hashes reused: `YES`
- replaceable photo roles preserved: `YES`
- native editable copy preserved: `YES`
- whole/read/actual-size visual verification: `YES`
- structure/safe-area verification: `PASS`
- rollback comparisons preserved: `YES`
- V7 touched: `NO`.

## Learning

Latest local finding:

- `RSL-052` — fixed non-semantic decoration can be collapsed to one composed raster while native copy and replaceable photographs stay semantic/editable; however texture alone is not enough. Promotion requires a visible hierarchy gain from photo/type composition as well.

State:

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Failure fingerprint:

`COMPOSED_RASTER_WITHOUT_HIERARCHY_GAIN` — if texture changes only surface appearance and does not materially improve reading hierarchy, stop adding texture and change photo/type hierarchy instead.

Literal Rurubu texture, palette, photograph geometry, typography and Japanese travel-guide art direction remain Rurubu-specific.

## Completion gate

Do not call V6 complete or print-ready until:

- W + BT/BV cohere with final real content as one magazine system;
- final personal copy replaces dummy content and final-copy stress is rerun;
- real/final photography replaces remaining dummy/stand-in roles where applicable and crop/contrast are rerun;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- PDF preflight and physical proof pass.

Current state:

`V6 W + BT/BV = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Review W + BT/BV as one magazine system at whole-item and actual-size scales.
3. Keep fixed decoration as composed roles where it materially improves design; do not recreate live ornament micro-geometry.
4. Do not repeat the same composed texture everywhere; use it only where a specific visible defect justifies it.
5. Replace final Profile/Q&A dummy copy later and rerun realistic long-copy/safe-area proof.
6. Re-run chronology copy/crop QA whenever final event copy or replacement photos change.
7. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.