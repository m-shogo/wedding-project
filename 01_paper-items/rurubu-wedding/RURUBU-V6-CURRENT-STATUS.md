# るるぶWEDDING V6 — CURRENT STATUS

Date: 2026-08-18
Direction: Japanese travel-information magazine / Hawaii-tropical wedding editorial
Authority order: live Figma → verified Drive → Rurubu evidence → this status
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Production state: separate clean-room V6; V7 is HOLD

## Current declaration

`V6_LIVE_FIGMA_IN_PROGRESS / OUTER_AG_PREFERRED / PROFILE_QA_DN_PREFERRED / STORY_CHRONOLOGY_DO_PREFERRED / MEMORY_SPOTS_DQ_PREFERRED_MIDDLE_FEATURE / DESTINATION_INFORMATION_ROLE_VERIFIED / NATIVE_VARIABLE_TEXT_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / GENERATED_SECTION_MASTERS_DRIVE_VERIFIED_NOT_ADOPTED / V7_HOLD / NOT_PRINT_READY`

## Live Figma current state

Fresh post-promotion readback confirms:

- Outer AG `1676:2` — `PREFERRED / V6_OUTER_AG_CHRONOLOGY_SUBTRACTION_2026_08_18`;
- Profile / Q&A DN `1675:2` — `PREFERRED / V6_INSIDE_DN_QA_PHOTO_BOUND_Q04_2026_08_18`;
- Story / chronology DO `1679:2` — `PREFERRED / V6_INSIDE_DO_SIDE_TRIP_RAIL_SUBTRACTION_2026_08_18`;
- Memory Spots DQ `1686:2` — `PREFERRED / V6_INSIDE_DQ_MEMORY_SPOTS_MIDDLE_FEATURE_2026_08_18`.

Start Here `845:27`:

`V5 FU/FX · V6 AG + DN/DO + DQ MEMORY SPOTS · V7 HOLD`

Immediate rollback:

- Outer AF `1655:2` — hidden rollback;
- Profile / Q&A DL `1659:2` — hidden rollback;
- Story / chronology DM `1665:2` — hidden rollback;
- Memory Spots DP `1685:2` — hidden rollback;
- earlier comparisons remain preserved;
- V7 was not edited.

## DQ — Memory Spots middle feature

### Visible problem

AG + DN/DO had become much stronger, but V6 still lacked the editorial function most directly associated with a travel-information magazine: a destination/spot-guide middle feature. Profile/Q&A and chronology could carry travel styling, but they could not fully substitute for a page that actually introduces places as destinations.

The existing V6 Hawaii reference authority already calls for a Memory Spots spread with one lead destination, supporting stops, unequal image hierarchy, and direct captions/markers rather than a card grid.

### Clean-room test / result

- created DP `1685:2` from scratch without modifying AG/DN/DO;
- reused four already verified Rurubu image fills/hashes as independent replaceable photo roles;
- kept all meaningful headings, captions and copy as native text;
- used one dominant waterfront lead plus three unequal supporting spots;
- created no new generated asset, Drive save, external binary placement, shadow/card grid or new raster hash;
- refined DP into DQ after actual-size review;
- removed reader-visible production wording and replaced it with reader-facing editorial copy;
- strengthened SPOT 02 with native ordinal/headline/pullquote rather than another card;
- detected one SPOT 03 ordinal/title bounding collision, corrected it, and re-QA'd to zero collisions;
- promoted DQ and hid DP as rollback.

### DQ photo roles / hashes

- lead — `840×610` — `539c259be8036b481d06b4f76db9a39b407d90e8`;
- SPOT 02 — `405×335` — `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- SPOT 03 — `315×465` — `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- SPOT 04 — `455×318` — `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`.

The lead intentionally bleeds beyond its page frame; other roles are bounded. Image fills/hashes are reused, not newly created.

### DQ QA

- whole spread / 1200px: PASS;
- left page `1686:3` actual-size `794×1123`: PASS;
- right page `1686:21` actual-size `794×1123`: PASS;
- left visible native text: `13`;
- right visible native text: `14`;
- absolute text collisions: `0 / 0`;
- 18px text safe-area risks: `0 / 0`.

Result: `DQ VERIFIED_LOCAL / PREFERRED_MIDDLE_FEATURE_STUDY`.

## DO — chronology side-trip rail subtraction

DO remains the verified preferred Story/chronology spread. Its 02/04 rail subtraction is still valid at whole, reading and actual-size scale; native chronology copy and replaceable photos remain intact.

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
- new clean-room middle-feature spread: YES;
- existing verified Rurubu image fills reused: YES;
- native text preserved: YES;
- replaceable photography preserved: YES;
- whole / reading / actual-size visual QA: PASS;
- structural collision/safe-area QA: PASS after one detected SPOT 03 collision repair;
- rollback preserved: YES;
- V7 touched: NO.

## Latest evidence / learning

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DO-DQ-MEMORY-SPOTS-MIDDLE-FEATURE-QA-2026-08-18.md`;
- `docs/wedding-design-learning-feedback-log.append/2026-08-18-rurubu-v6-dq-memory-spots-middle-feature.md`;
- `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-18-rsl-090-travel-information-middle-feature-completes-editorial-role-set.md`.

Latest learning:

- RSL-089 — a rail that once performed a real binding function can become redundant after hierarchy matures: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`;
- RSL-090 — recognizable publication genres depend on a complete editorial role set; when a travel booklet still feels genre-ambiguous, verify whether it lacks an actual destination-information feature before adding more surface decoration: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

Rurubu-specific coordinates, colors, masthead, Yokohama wording, photo choices, four-spot count and layout geometry do not transfer.

## Completion gate

Do not call V6 complete or print-ready until:

- AG + DN/DO + DQ are reconciled with final legitimate photography and final personal/location copy;
- final copy receives fresh actual-size / realistic-copy stress where wrapping changes;
- replacement photography revalidates crop, semantic role, contrast and intrinsic quality;
- final physical page count/imposition confirms whether DQ belongs in the printed booklet;
- exact printer/product template is applied;
- bleed, trim, fold, safe area and page order are verified;
- exported PDF preflight passes;
- physical proof passes.

Current state:

`V6 AG + DN/DO + DQ = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / DESTINATION_INFORMATION_MIDDLE_FEATURE_ADDED / PHOTO_LED_MAGAZINE_HIERARCHY_VERIFIED / NATIVE_TEXT_EDITABILITY_PRESERVED / REPLACEABLE_PHOTOS_PRESERVED / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`.

## Next highest-value work

1. Continue V6, not V7.
2. Compare AG + DN/DO + DQ as one publication at thumbnail, reading and actual-size scales.
3. Keep DQ as a preferred middle-feature study until final page count/imposition is known; do not pretend physical pagination is settled.
4. Prefer final legitimate destination photography/copy when available, then revalidate DQ crop/contrast/semantics.
5. Keep generated section masters unadopted until quality-preserving placement plus actual-size QA are possible.
6. Keep printer-template/PDF/physical-proof gates separate from dummy-design QA.