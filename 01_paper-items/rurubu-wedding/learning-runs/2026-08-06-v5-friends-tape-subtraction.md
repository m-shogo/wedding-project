# V5 Back Cover — Friends Tape Subtraction

Date: 2026-08-06
Item: Rurubu WEDDING V5
Figma root: `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

## Source

- live Figma state and whole-item screenshot
- project-wide quality-over-legacy and subtraction-first rules
- current V5 authority and rollback state

## Visible problem

The two Friends & Family photo tabs already identify their modules as `FRIENDS 01` and `FRIENDS 02`, but each tab also had a translucent decorative tape strip behind it. The tape supplied no distinct navigation, factual content, contrast requirement, or provenance value and added another scrapbook effect to an already busy photo module.

## Hypothesis

Hiding only the two decorative tape strips while retaining the colored native-text tabs should reduce decorative density without weakening photo identification, reading order, contrast, editability, or rollback safety.

## Change

- `77:104 / AUTH_FRIEND_TAPE_2`: `visible true → false`
- `77:105 / AUTH_FRIEND_TAPE_3`: `visible true → false`
- nodes were not deleted; rollback remains immediate
- tabs `77:92–77:95`, photos, captions, and section heading were preserved

## Verification

### Whole-item / thumbnail

The Friends & Family module reads more cleanly as two editorial photo notes. The tabs remain visible, but the secondary translucent strips no longer create a double-layer sticker silhouette.

### Reading / page

The sequence remains:

`main memory photo → FRIENDS & FAMILY → FRIENDS 01 / FRIENDS 02 photos and captions → OUR JOURNEY ROUTE → footer`.

### Detail / actual-size and structure

- `77:39 / BACK_VISUAL_FRIEND_2_PHOTO` remains visible with image hash `2005b91ce26ead7d8128f547c293fe4a510f5d24`
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO` remains visible with image hash `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
- fold guide `77:288` remains visible
- V4 rollback nodes `59:2` and `59:178` remain present
- outer native text count: `85`
- outer visible text count: `48`
- outer IMAGE-fill node count: `14`
- no text content, crop, image fill, image hash, semantic name, hierarchy, photo geometry, or footer geometry changed

## Failure / regression check

No visual or structural regression was observed. This does not establish a blanket ban on tape: it may remain when it provides a necessary attachment metaphor or composition cue. Here it was redundant because the tab itself already carried the full locator role.

## Decision

`PROTOTYPED → VERIFIED / ADOPTED FOR V5 CURRENT`

No asset-evidence counts or V5/V6 gates changed. The dominant-image placement and provenance closure remain separate and unresolved.

## Next application

Continue auditing decorative overlays only where they duplicate a semantic locator. Do not remove unique labels, factual copy, or contrast devices.