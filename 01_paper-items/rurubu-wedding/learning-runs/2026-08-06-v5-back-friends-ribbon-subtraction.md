# V5 Back Cover — Friends Ribbon Subtraction

Date: 2026-08-06
Item: Rurubu WEDDING V5
Figma root: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

## Source

- live Figma state
- project-wide quality-over-legacy and subtraction-first rules
- current V5 authority and asset ledger

## Visible problem

The back-cover Friends & Family section contained two stacked section labels for the same editorial role: the yellow ribbon `77:88–77:89` and the native section title `77:33`. The ribbon added another UI-like color field immediately above an already clear title and two-photo module.

## Hypothesis

Hiding the redundant ribbon while retaining the native title should reduce decorative density, strengthen the photo-led reading order, and avoid introducing a new layout dependency.

## Change

- `77:88 / FRIENDS_RIBBON`: `visible true → false`
- `77:89 / FRIENDS_RIBBON_TXT`: `visible true → false`
- nodes were not deleted; rollback remains immediate

## Verification

### Whole-item / thumbnail

The back-cover hierarchy is simplified by one horizontal yellow field. The section remains identifiable through `77:33 / BACK_VISUAL_FRIENDS_TITLE`.

### Reading / page

The sequence remains:

`main memory photo → FRIENDS & FAMILY → two supporting photos and captions → OUR JOURNEY ROUTE → footer`.

### Detail / actual-size and structure

- Friends title `77:33` remains visible and native text
- photos `77:39` and `77:43` remain visible IMAGE-fill nodes
- image hashes preserved:
  - `77:39`: `2005b91ce26ead7d8128f547c293fe4a510f5d24`
  - `77:43`: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
- fold guide `77:288` remains visible
- V4 rollback nodes `59:2` and `59:178` remain present
- outer visible text count after change: `48`
- no text, crop, image fill, semantic name, hierarchy, or footer geometry was modified

## Failure / regression check

No structural regression was observed. This does not prove that all section ribbons should be removed; the decision applies where a second native heading already carries the same section identity.

## Decision

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

No asset-evidence counts or V5/V6 gates changed. The dominant-image placement blocker remains separate and unresolved.

## Next application

Continue dominant-image evidence closure via a binary-safe transfer route. For remaining editorial cleanup, test only genuinely duplicated labels before subtracting them.
