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
