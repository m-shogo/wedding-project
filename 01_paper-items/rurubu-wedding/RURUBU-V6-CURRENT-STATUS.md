# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AG_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_DR_PREFERRED_MIDDLE_FEATURE / DESTINATION_INFORMATION_ROLE_VERIFIED / PRACTICAL_INFO_DENSITY_REFINED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Fresh post-promotion readback confirms:

- Outer AG `1676:2` — `PREFERRED / V6_OUTER_AG_CHRONOLOGY_SUBTRACTION_2026_08_18`;
- Profile / Q&A DN `1675:2` — `PREFERRED / V6_INSIDE_DN_QA_PHOTO_BOUND_Q04_2026_08_18`;
- Story / chronology DO `1679:2` — `PREFERRED / V6_INSIDE_DO_SIDE_TRIP_RAIL_SUBTRACTION_2026_08_18`;
- Memory Spots DR `1689:2` — `PREFERRED / V6_INSIDE_DR_MEMORY_SPOTS_TRAVEL_INFO_DENSITY_2026_08_18`.

Start Here `845:27`:

`V5 FU/FX · V6 AG + DN/DO + DR MEMORY SPOTS · V7 HOLD`

Immediate rollback:

- Outer AF `1655:2` — hidden rollback;
- Profile / Q&A DL `1659:2` — hidden rollback;
- Story / chronology DM `1665:2` — hidden rollback;
- Memory Spots DQ `1686:2` — hidden rollback;
- Memory Spots DP `1685:2` — older hidden rollback;
- earlier comparisons remain preserved;
- V7 was not edited.

## DR — Memory Spots travel-information density refinement

### Visible problem

DQ successfully added the missing destination/spot-guide middle-feature role, but the right-page closing region still used one large deep-navy field. The module was structurally valid yet read more like a generic closing card than compact travel-guide information.

### Bounded test / result

DR was cloned rollback-safely from DQ and changed only the right-page closing information role:

- the former `744×138` navy field became one `744×5` functional rule;
- `TRAVEL NOTE / FAVORITE MOMENTS` became native `CHECK! / 4 SPOT GUIDE`;
- one small yellow CHECK label was added as simple functional geometry;
- native closing title became `4つの景色、4つの楽しみ方。`;
- closing body became compact native metadata for `BEST TIME / MOOD / PHOTO / CAFE / NIGHT / TABLE`;
- all four photos, crops, image hashes, spot headings and body copy stayed unchanged;
- no new generated asset, Drive save, external binary placement or raster/image hash.

### DR photo roles / hashes

Unchanged from DQ:

- lead — `840×610` — `539c259be8036b481d06b4f76db9a39b407d90e8`;
- SPOT 02 — `405×335` — `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- SPOT 03 — `315×465` — `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- SPOT 04 — `455×318` — `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

The lead intentionally bleeds beyond its page frame; other roles are bounded. All remain independently replaceable.

### DR QA

- whole spread / 1200px: PASS;
- right page `1689:24` actual-size `794×1123`: PASS;
- left page `1689:3`: visible native text `13`, absolute text collisions `0`, 18px text safe-area risks `0`;
- right page `1689:24`: visible native text `14`, absolute text collisions `0`, 18px text safe-area risks `0`.

A lower-dimension remote screenshot path intermittently dropped raster fills / returned transport errors and was excluded from visual evidence rather than being treated as a design defect.

Result: `DR VERIFIED_LOCAL / PREFERRED_MIDDLE_FEATURE_STUDY`.

## DO — chronology preferred

DO remains the verified preferred Story/chronology spread. Its rail subtraction is still valid at whole, reading and actual-size scale; native chronology copy and replaceable photos remain intact.

## AG — outer preferred

Outer AG remains the verified preferred outer spread. No speculative change was made merely to consume runtime.

## DN — Profile/Q&A preferred

Profile/Q&A DN remains the verified preferred interview spread. Q04 stays bound to the existing lower memory photo without sacrificing native variable copy or photo replaceability.

## Drive / generated section masters

Fresh Drive readback confirms V6 root:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

Previously generated Profile/Q&A/Timeline/Memories masters remain stored and unadopted. No materially improved quality-preserving external binary-placement capability was established, so known failed transport methods were not repeated.

## Asset lifecycle truth for this run

- newly image-generated assets: 0;
- newly adopted generated assets: 0;
- new Drive saves: 0;
- new external binary placements: 0;
- new raster/image hashes: 0;
- existing verified Rurubu image fills reused: YES;
- new simple functional geometry: one small yellow CHECK label;
- native text preserved: YES;
- replaceable photography preserved: YES;
- whole / actual-size visual QA: PASS;
- structural collision/safe-area QA: PASS;
- rollback preserved: YES;
- V7 touched: NO.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DO-DR-MEMORY-SPOTS-TRAVEL-INFO-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-dr-memory-spots-travel-info-density.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-091-practical-info-density-without-closing-card.md`.

Latest learning:

- RSL-090 — recognizable publication genres depend on a complete editorial role set; a travel booklet needs an actual destination-information feature before more surface styling: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-091 — when a closing/info field has no proven physical/binding function, compact native practical metadata plus one purposeful marker can increase travel-guide scanability while reducing UI-like mass: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific coordinates, colors, masthead, Yokohama wording, metadata labels, photo choices, four-spot count and layout geometry do not transfer.

## Completion gate

Do not call V6 complete or print-ready until:

- AG + DN/DO + DR are reconciled with final legitimate photography and final personal/location copy;
- final copy receives fresh actual-size / realistic-copy stress where wrapping changes;
- replacement photography revalidates crop, semantic role, contrast and intrinsic quality;
- final physical page count/imposition confirms whether DR belongs in the printed booklet;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 AG + DN/DO + DR = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / DESTINATION_INFORMATION_MIDDLE_FEATURE_ADDED / PRACTICAL_INFO_DENSITY_REFINED / PHOTO_LED_MAGAZINE_HIERARCHY_VERIFIED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare AG + DN/DO + DR as one publication at whole-item, reading and actual-size scales.
3. Keep DR as a preferred middle-feature study until final page count/imposition is known; do not pretend physical pagination is settled.
4. Prefer final legitimate destination photography/copy when available, then revalidate DR crop/contrast/semantics and practical metadata.
5. Keep generated section masters unadopted until quality-preserving placement plus actual-size QA are possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.