# V5 Friends & Family duplicate-module subtraction

Date: 2026-08-06
Scope: Rurubu WEDDING V5 only
Status: `PROTOTYPED → VERIFIED / ADOPTED_IN_LIVE_V5 / PHOTO_ROLE_PASS_UNCHANGED`

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/project-memory.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- live Figma page `01_RURUBU_WEDDING`
- current outer candidate `77:18`

The existing V4 rollback frames remain the authority for rollback safety.

## Visible problem

The Friends & Family section displayed three modules, but the first photo node `77:35` used the exact same Figma image hash as the dominant back-page memory photo `77:24`:

- `77:24` hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`
- `77:35` hash: `2cfd19cf1701db58039a4fc645e4279832ec465a`

This repeated the same scene at two visual scales on one page, weakened the editorial claim that the three Friends & Family modules represented distinct memories, and preserved an old three-card composition only because it already existed.

## Hypothesis

Removing the duplicate module as a complete semantic unit, then reflowing the two unique modules into a deliberate two-column composition, would improve truthfulness, visual rhythm, and quiet space without inventing a replacement asset or creating new decoration.

## Expected improvement

- eliminate visible same-page photo duplication
- reduce repeated-card density
- make the remaining two unique memories larger and easier to read as an intentional pair
- preserve native text, semantic nodes, image fills, crops, and rollback state

## Possible regression

- the section could look accidentally incomplete after moving from three modules to two
- excessive empty space could weaken the lower-page rhythm
- labels could retain stale numbering
- moved captions could collide with the journey section below

## Live Figma change

Duplicate module hidden, not deleted:

- `77:35 / BACK_VISUAL_FRIEND_1_PHOTO`
- `77:37 / BACK_VISUAL_FRIEND_1_CAP_BG`
- `77:38 / BACK_VISUAL_FRIEND_1_CAP`
- `77:90 / FRIEND_TAB_FRIENDS 01`
- `77:91 / FRIEND_TAB_TXT_FRIENDS 01`
- `77:103 / AUTH_FRIEND_TAPE_1`

Unique module 2 shifted left by 220 px:

- `77:39`, `77:41`, `77:42`, `77:92`, `77:93`, `77:104`

Unique module 3 shifted left by 110 px:

- `77:43`, `77:45`, `77:46`, `77:94`, `77:95`, `77:105`

Native labels were renumbered after loading their current fonts:

- `77:93`: `FRIENDS 02` → `FRIENDS 01`
- `77:95`: `FRIENDS 03` → `FRIENDS 02`

No image fill, crop, semantic node name, frame hierarchy, or source hash was modified.

## Verification evidence

### Whole-item / thumbnail scale

The outer-spread screenshot shows a clearer two-image rhythm and no obvious missing-card hole. The cover side and back-page dominant memory remain the primary visual anchors.

### Page / reading scale

Reading order remains:

`FRIENDS & FAMILY heading → FRIENDS 01 → caption → FRIENDS 02 → caption → OUR JOURNEY ROUTE`

The two modules are visibly distinct and separated by intentional quiet space.

### Detail / actual-size scale

- captions remain native text and readable
- no clipping, overlap, or mask exposure was observed
- numbering is sequential
- the moved modules do not collide with the journey section
- hidden nodes remain available for immediate rollback

## Result

`VERIFIED / ADOPTED`

The change is accepted as a bounded V5 editorial correction. It fixes a concrete duplicate-source defect without regenerating an image merely to create activity.

## Gate impact

No ledger or completion count is advanced:

- `INTENDED_SOURCE_APPLIED` unchanged
- `PHOTO_ROLE_PASS` unchanged
- V5 dummy-design gate unchanged
- V6 production gate remains closed

The hidden `77:35` semantic photo role still exists for future intended-source replacement and evidence closure.

## Reusable lesson

When one dominant image is repeated in a supporting module without editorial meaning, subtract the duplicate module before generating or adding a replacement. A smaller number of unique, truthful modules can outperform a legacy equal-card count. This remains a V5-verified lesson and is not promoted automatically to a project-wide rule.

## Next application

Return to Batch A binary-safe placement and Drive ID → node ID → image-hash closure. Do not recreate a third Friends module until a distinct, provenance-verified intended source exists and the three-module composition demonstrably beats the verified two-module version at all three QA scales.
