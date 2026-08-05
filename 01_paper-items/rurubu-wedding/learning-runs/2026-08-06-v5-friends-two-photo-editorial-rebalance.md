# Rurubu V5 — Friends two-photo editorial rebalance

Date: 2026-08-06
Status: `VERIFIED / ADOPTED`
Scope: Rurubu WEDDING V5 outer candidate only

## Source and visible problem

Live Figma node `77:18` was reviewed after the verified duplicate-photo module subtraction. The remaining Friends & Family module used two unique photo roles, but the pair still read as two small leftover cards separated by excessive empty space rather than a deliberate editorial composition.

## Anti-legacy question

Would this two-photo arrangement still be chosen if it did not already exist?

No. The duplicate subtraction was correct, but preserving the old three-card coordinates left the surviving pair visually under-scaled and accidental.

## Hypothesis

A bounded asymmetric two-photo composition using the existing semantic photo and caption nodes would make the reduction look intentional, improve photo legibility at print scale, and preserve rollback and editability without adding decoration.

## Expected improvement

- stronger Friends & Family hierarchy
- larger and more legible photo crops
- less accidental whitespace between surviving modules
- clearer reading sequence from title to Friends 01 and Friends 02
- no new cards, shadows, gradients, or generated assets

## Possible regression

- captions could collide with enlarged photos
- the hidden subtitle could become obstructed or redundant
- the pair could become too visually heavy relative to the journey route below
- resizing could weaken the existing crop

## Figma changes

Rebalanced existing visible nodes:

- `77:39` BACK_VISUAL_FRIEND_2_PHOTO
- `77:41` BACK_VISUAL_FRIEND_2_CAP_BG
- `77:42` BACK_VISUAL_FRIEND_2_CAP
- `77:43` BACK_VISUAL_FRIEND_3_PHOTO
- `77:45` BACK_VISUAL_FRIEND_3_CAP_BG
- `77:46` BACK_VISUAL_FRIEND_3_CAP
- `77:92` / `77:93` Friends 01 tab
- `77:94` / `77:95` Friends 02 tab
- `77:104` / `77:105` bounded tape accents

The redundant subtitle `77:34` was hidden non-destructively after screenshot QA showed it competing with the enlarged module.

No image fill, image hash, semantic name, text content, frame hierarchy, or source identity was changed.

## Three-scale QA

### Whole-item / thumbnail

- The Friends & Family block now reads as a deliberate two-photo feature rather than a partially deleted three-card row.
- The back page remains subordinate to the dominant cover.
- The route module below retains sufficient separation and visual weight.

### Reading / page

- Reading order remains: section ribbon → Friends & Family title → Friends 01 → Friends 02 → captions → Our Journey Route.
- The redundant subtitle was removed from the visible hierarchy instead of being squeezed between title and photos.
- No caption/photo overlap or empty module hole remains.

### Detail / actual-size plausibility

- Captions remain native Figma text and readable.
- Existing non-destructive IMAGE fills and crops remain active.
- No clipping, mask exposure, text collision, or new shadow/card effect was introduced.
- Hidden legacy nodes remain available for rollback.

## Result

`ADOPTED`

The asymmetric two-photo rebalance is a verified improvement over retaining coordinates derived from the old three-photo composition.

## Gate impact

This is an editorial-layout improvement only. It does not close Drive ID → node ID → image hash provenance for either surviving photo, and it does not change `INTENDED_SOURCE_APPLIED`, `PHOTO_ROLE_PASS`, the V5 completion gate, or the V6 start gate.

## Next application

Prioritize the blocked dominant-image and role provenance workflow. Do not continue decorative micro-polish merely to create activity. When a module loses an item through verified subtraction, re-evaluate the surviving composition as a new editorial problem instead of preserving the old grid coordinates.