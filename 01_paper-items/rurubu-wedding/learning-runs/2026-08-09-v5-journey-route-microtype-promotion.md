# V5 OUR JOURNEY ROUTE microtype promotion — 2026-08-09

Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / V6_GATE_UNCHANGED`

## Authorities re-read before work

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`

Latest GitHub main was also checked before the write. The concurrent latest commit was unrelated ADD-item documentation, so this bounded Rurubu-only change did not touch those items.

## Visible problem

In the live V5 outer Current `77:18`, the six-stop `OUR JOURNEY ROUTE` at the bottom of the back cover used 10 px for both year/date and event text. At whole-item scale the route read correctly, but at natural back-cover scale those twelve strings were the weakest readable factual microtype on the page and approached decorative rather than editorial information.

This was selected instead of adding decoration or modifying photography. The cover hero remains the only active photo blocker and was not falsely counted complete.

## Hypothesis / tested principle

A one-step increase from 10 px to 11 px on only the six year/date labels and six event labels should improve actual-size legibility while preserving the route's subordinate hierarchy, spacing, native text, semantic node names, and editorial rhythm.

Possible regression: the wider 2026 dates could collide, wrap, or make the timeline too visually heavy relative to `FRIENDS & FAMILY` and the lead memory block.

Evidence required for adoption:

1. rollback-safe duplicate comparison;
2. whole outer screenshot;
3. back-cover reading/natural-size screenshot;
4. no wrap/collision/clipping;
5. structure and image-hash readback;
6. Current promotion only after the comparison wins.

## Safe prototype

Created comparison frame:

- `541:2 / V5_OUTER_JOURNEY_ROUTE_MICROTYPE_QA_2026_08_09`

Only these duplicated semantic nodes were changed from 10 px to 11 px:

- `BACK_VISUAL_HISTORY_1_YEAR` … `BACK_VISUAL_HISTORY_6_YEAR`
- `BACK_VISUAL_HISTORY_1_TEXT` … `BACK_VISUAL_HISTORY_6_TEXT`

No image, crop, card, badge, shadow, gradient, route geometry, fold guide, or factual text was changed.

## Result

`VERIFIED / ADOPTED`.

Whole-item and natural back-cover review showed clearer year/event readability without making the route compete with the `OUR JOURNEY ROUTE` heading. The long `2026.02.11` and `2026.10.24` dates remained inside their existing 94 px text boxes; event labels remained inside 86 px boxes. No visible wrapping, collision, clipping, or rhythm regression appeared.

## Current promotion

Promoted the same 10 → 11 px change into Current outer `77:18` on these exact live nodes:

- `77:50`, `77:51`
- `77:53`, `77:54`
- `77:56`, `77:57`
- `77:59`, `77:60`
- `77:62`, `77:63`
- `77:65`, `77:66`

All twelve read back as 11 px after the mutation.

Comparison `541:2` remains preserved as rollback/comparison evidence.

## Structure / provenance QA after promotion

Live Current outer readback after the change:

- native text nodes: `85`
- visible text nodes: `44`
- IMAGE-fill nodes: `14`
- fold guide `77:288 / PROVISIONAL_FOLD_GUIDE`: preserved and visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- comparison `541:2`: preserved

Verified unchanged important image hashes:

- `77:24 / BACK_VISUAL_MAIN_MEMORY_PHOTO`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
- `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- `77:148 / IMG_HERO`: `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`

Therefore this typography promotion did not mutate photo provenance or pretend to repair the hero.

## Drive / active blocker truth

The Q60 cover derivative was re-read from Google Drive during this run:

- file: `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID: `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME: `image/jpeg`
- bytes: `155,439`
- dimensions from raw readback: `1330 × 1220`
- SHA-256 from raw readback: `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

These values still match the recorded V5 authority. The derivative is healthy; the unresolved defect remains the quality-preserving binary path into live Figma. Known failed upload mechanisms were not repeated.

## Progress truth

No asset-ledger count changed in this run:

- intended source applied: `11 / 11 active`
- PHOTO_ROLE_PASS: `10 / 11 active`
- ROLE_COMPLETE: `10 / 11 active`
- dominant photo pass: `2 / 3`

The remaining active photo role is still:

- `V5-01 / 77:148 / IMG_HERO`

V6 production gate remains closed.

## Learning state

Source: live Figma screenshot and natural back-cover review.

Hypothesis: microtype one level below body copy can be raised by one step when it carries factual chronology and retains spatial separation.

Result: improved legibility with no observed hierarchy or geometry regression.

Failure: none in the adopted comparison; the pre-existing hero transport blocker remains intentionally untouched.

Status: `VERIFIED` for this V5 route. This is not yet a universal project rule for all microtype.

Next application: continue weakest-area review while preserving the hero as the only photo blocker; do not open V6 until the full V5 dummy-design gate is verified.
