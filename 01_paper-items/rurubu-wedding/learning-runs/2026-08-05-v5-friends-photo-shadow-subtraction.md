# V5 Friends & Family photo shadow subtraction

Date: 2026-08-05
Status: ADOPTED / LIVE FIGMA VERIFIED
Scope: Rurubu WEDDING V5 outer candidate only

## Source

- Live Figma file `bfM0d4c9dCeBv5pCkJ3TNM`
- Page `01_RURUBU_WEDDING`
- Candidate `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`
- Project-wide quality-over-legacy and anti-Web-UI rules

## Visible problem

The three Friends & Family photos used identical card-like drop shadows (`radius 10`, `offset 0,5`, alpha about 18%). After the back-main photo shadow had already been removed, these remaining shadows made the lower-left module read as three floating UI cards rather than an editorial photo sequence.

## Hypothesis

Removing only the redundant shadows, while preserving photo geometry, labels, captions, fills, crops, and semantic node names, would reduce Web-UI/card feel without weakening grouping or magazine rhythm.

## Expected improvement

- photographs feel printed directly on the page
- lower-left module becomes calmer and more editorial
- visual treatment becomes consistent with the adopted back-main-photo shadow removal
- no additional cards, borders, stickers, or color fields are introduced

## Possible regression

The three photographs could lose separation from the warm-white page or appear visually flat, especially at thumbnail scale.

## Experiment

Mutated live nodes:

- `77:35 / BACK_VISUAL_FRIEND_1_PHOTO`
- `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`

Change:

- effects: one visible drop shadow → `[]`

Preserved:

- node IDs and semantic names
- positions and dimensions
- IMAGE fills and crop behavior
- colored FRIENDS tabs
- native captions and section hierarchy
- V4 rollback frames

Observed image hashes after mutation:

- `77:35` → `2cfd19cf1701db58039a4fc645e4279832ec465a`
- `77:39` → `2005b91ce26ead7d8128f547c293fe4a510f5d24`
- `77:43` → `3abe9ce228d2252b847860ac895f2c178b6b3ddd`

## Result and QA

### Whole-item / thumbnail

PASS. The back cover remains clearly structured. The three-photo rhythm is still visible through unequal sizes, offsets, tabs, and captions. No visual hole appeared.

### Reading / page

PASS. FRIENDS & FAMILY remains a coherent section. Photo-to-caption relationships and reading order are unchanged. The lower-left region is less card-like and no longer competes with the main memory photo.

### Detail / actual-size plausibility

PASS for the design change. Photo edges remain legible against the page; there is no clipping, mask exposure, text collision, or missing caption. This does not validate the underlying dummy source quality.

### Structure

PASS. Only `effects` changed on the three semantic photo rectangles. IMAGE hashes, geometry, text, node names, and rollback evidence remain intact.

## Decision

ADOPTED.

This is a verified design-system cleanup, not a photo-role completion. `PHOTO_ROLE_PASS`, intended-source counts, and the V6 gate must not be advanced.

## Failure / limitation

The current Friends & Family images remain dummy assets, and at least one current hash duplicates another existing image source. The change improves editorial treatment only; it does not close Drive ID → node ID → image hash provenance or source-quality QA.

## Next application

Stop broad decorative subtraction on the outer spread. Prioritize the blocked Batch A/B image-placement and provenance path, then reassess the FRIENDS tabs and captions only after intended high-quality derivatives are present.

---

# V5 Memory Spots duplicate-source subtraction and reflow

Date: 2026-08-05
Status: ADOPTED / LIVE FIGMA VERIFIED
Scope: Rurubu WEDDING V5 inside candidate only

## Source

- Live Figma file `bfM0d4c9dCeBv5pCkJ3TNM`
- Page `01_RURUBU_WEDDING`
- Candidate `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
- Verified live image-hash inventory and whole-spread screenshot

## Visible problem

Memory Spots entries 02 and 03 displayed the same source image hash, `27ad4cfab8fd579b8452540ce954f8b36edc77fb`, in adjacent `88 × 92` photo roles. The repetition was visibly obvious and made the section look like duplicated placeholder content rather than an intentionally edited three-location narrative.

## Hypothesis

Because a distinct `NEXT DESTINATION` module already existed immediately below, subtracting the duplicated entry and moving the unique future-destination module into its position would improve editorial credibility without generating a replacement merely to create activity.

## Expected improvement

- remove a visibly duplicated image source
- reduce the module count from four to three clear narrative roles
- preserve the progression `first trip → familiar city → next destination`
- recover quiet space at the lower-right edge
- avoid introducing another unverified asset

## Possible regression

The shorter three-entry column could feel under-filled, and moving the final module could create an alignment or numbering defect.

## Experiment

Hidden, not deleted, for rollback:

- `77:445 / IA_MEMORY_3_CARD`
- `77:446 / IA_MEMORY_3_PHOTO`
- `77:447 / IA_MEMORY_3_PHOTO_LABEL`
- `77:448 / IA_MEMORY_3_NO_BG`
- `77:449 / IA_MEMORY_3_NO`
- `77:450 / IA_MEMORY_3_TITLE`
- `77:451 / DUMMY_LABEL__IA_MEMORY_3_CITY`
- `77:452 / IA_MEMORY_3_BODY`
- `102:25 / V5_SPOT_03_RULE`

Moved upward by `132 px`:

- `77:453` through `77:460`
- `102:26 / V5_SPOT_04_RULE`

Native number text:

- `77:457 / IA_MEMORY_4_NO`: `04 → 03`

The underlying moved photo hash remains `f8357056c1f50bc928066273ce9391f5feba02d2`.

## Result and QA

### Whole-item / thumbnail

PASS. The right page keeps a clear top history lead and lower Memory Spots composition. The three-entry column reads more deliberately and the removed fourth row creates useful quiet space rather than a visual hole.

### Reading / page

PASS. Reading order is now `01 はじめての旅行先 → 02 何度も歩いた街 → 03 次の目的地`. The duplicate `忘れられない景色` placeholder is no longer presented as a separate memory.

### Detail / actual-size plausibility

PASS for this bounded editorial change. Numbering is consecutive, text remains native, no label or image is clipped, and no visible rule or connector is orphaned.

### Structure

PASS.

- Current inside candidate remains `1587.4 × 1122.5`
- native text count: `94`
- non-native text replacements: `0`
- V4 rollback frames `59:2` and `59:178` still exist
- hidden duplicate nodes retain their original IDs and hash for immediate rollback
- moved module retains its original image fill and semantic structure

## Decision

ADOPTED.

This removes a concrete duplicate-source defect without claiming image provenance completion. `PHOTO_ROLE_PASS`, intended-source counts, and the V6 start gate remain unchanged.

## Failure / limitation

The remaining Memory Spots images are still dummy sources and their Drive ID → node ID → image hash evidence is not closed. The semantic node names of the moved module still contain `_4_` because renaming them would collide with the hidden rollback module; the visible numbering and reading order are correct.

## Reusable lesson

When adjacent editorial modules visibly reuse the same unverified source, subtraction and narrative consolidation can be safer and stronger than generating or substituting an arbitrary replacement. Preserve the rejected module hidden for rollback, reflow the unique content, and verify numbering, rules, connectors, and quiet space together.

## Next application

Resume the binary-safe intended-asset placement path. Do not use arbitrary existing Figma hashes to fill remaining roles. Reassess the three-entry composition only after verified Drive derivatives are available.
