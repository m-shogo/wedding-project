# Rurubu WEDDING V9 — Current Production Checkpoint

Updated: 2026-08-27
Scope: Rurubu WEDDING V9 only

## Live authorities

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Drive asset pool/reference authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup / RURUBU_V9`
- GitHub base observed before latest rhythm pass: `bd80e53caa4ef6e461667915a5e5156741421ce4`

## Six current production frames

- `2601:3` — Cover
- `2601:4` — Back Cover
- `2601:5` — Profile + Q&A
- `2601:6` — Story + Timeline
- `2601:7` — Memory + Gallery
- `2601:8` — 1DAY + Cafe/Table

All six remain `794×1123`.

## 2026-08-27 editorial cleanup

Goal: improve readability, hierarchy, balance and publication rhythm before generating more assets. Existing Drive assets are optional design material, not an inventory that must be consumed.

### Cover

Removed redundant UI-like navigation/chip layers from the live composition, including the duplicate mini masthead, vertical category tabs, travel-issue / MUST SEE chips, secondary save chips and issue/page micro badges. Retained the layered `るるぶ WEDDING` title, issue marker, Japanese subhead, hero, three supporting images/captions, date, names and strong cover color fields.

Result: the hero/title/photo hierarchy now carries density rather than stacked pills.

### Back Cover

Removed the four navigation pills, guide chip, route dots/line and redundant page/save micro-badges. Retained the `WEDDING GUIDE` title, lead, 3-photo editorial group, `SPECIAL CONTENTS`, four content rows/descriptions and footer route/date treatment.

Result: reads more like a print contents/back-cover page and less like a web navigation screen.

### Profile + Q&A

Removed the intro card container, three rounded Q&A card containers, GROOM/BRIDE pills, BEST5 and navigation-like helper chips. Added three simple colored editorial rules under the three Q&A rows:

- `2708:234` — rule 01
- `2708:235` — rule 02
- `2708:236` — rule 03

Restored only the useful bottom category tags `TRAVEL / FOOD / PHOTO`; removed the floating `COUPLE TALK` and page badge.

Result: native Japanese question/answer typography is the hierarchy, while the generated Profile title remains the visual anchor.

### Story + Timeline

Removed the left-side helper pills, the three mini event pills, four rounded event cards, four event-tag pills and page/photo badges. Retained the layered `ふたりのこと` title, hero + small photo, Japanese lead, `TIMELINE` title, year rail, event titles/captions and colored route markers.

Result: the timeline is now open editorial typography on the cream field instead of a stack of UI cards.

### Memory + Gallery

Removed the redundant `BEST SHOT / PHOTO SPOT / TRIP` pill row, gallery guide, page badge and navigation-like bottom helper. Retained functional photo captions, the main `メモリースポット` title, `OUR FAVORITE`, memory lead/note and the useful category tags `PLACE / PEOPLE / FOOD`.

Result: the image grid remains dense, but the lower half has controlled breathing room and clear reader hierarchy.

### 1DAY + Cafe/Table

Removed `DAY SCHEDULE / DRESS CODE / MENU`, top-right Cafe pill, food helper chips, photo/food ID badges, page/footer navigation chips and the boxed Trip Memo container/badge. Added one simple editorial rule:

- `2709:289` — `V9 / DAY TRAVEL NOTE RULE / EDITORIAL`

Retained the actual time-route dots/line because they perform a functional itinerary-binding role, plus all five photos, native Japanese stop copy, `1DAYプラン` and `CAFE & TABLE` section title.

Result: stronger timetable → photo → food-section scan path with less dashboard/pill grammar.

## 2026-08-27 publication rhythm pass

A second whole-publication pass focused on scan path and dead-space balance rather than new asset generation.

### Cover — editorialize the 3-photo strip

The three bottom supporting-photo captions were changed from rounded UI-style pills into direct editorial captions with thin color rules. The mini photos remain independent replaceable masks with frame overlays above them.

New editorial rule nodes:

- `2721:84` — Cover mini rule 1
- `2721:85` — Cover mini rule 2
- `2721:86` — Cover mini rule 3

Hidden rollback snapshot: `2721:2`.

Result: the cover still feels dense and colorful, but the lower strip now reads like magazine captions rather than navigation buttons.

### Back Cover — strengthen top-band hierarchy

The layered `WEDDING GUIDE` title (`2702:79` / `2702:80` / `2702:81`) was enlarged and repositioned within the cyan top band. The Japanese lead remains the primary left-side message, while the English title now has enough presence to function as the section identity.

### Profile + Q&A — remove empty helper shape

Removed the unused yellow Q&A helper background `2604:15`. The generated Profile title, two replaceable portraits, native Q&A typography, colored answer rules and the three functional bottom category tags remain.

### Story + Timeline — major proportion rebalance

The blue year rail was narrowed from `276` to `220` px and the cream editorial field was expanded. The hero photo pair (`2601:81` + `2669:485`) was widened to `512` px and shifted left; lead copy, small photo, timeline title, year markers, route line, event titles/captions and footer copy were shifted/rebalanced to use the reclaimed width.

The layered `ふたりのこと` title was reduced to 31 px so it fits cleanly in the narrower blue rail without an orphaned final character.

Hidden rollback snapshot: `2718:2`.

Result: materially less dead blue space, stronger hero dominance and a clearer year → event reading path while retaining the functional chronology rail.

### Memory + Gallery — remove visible empty shells

Removed decorative shapes whose text/content had already been hidden and which rendered as empty pills/circles:

- `2604:23` — empty top-right chip background
- `2633:309` — empty lower helper background
- `2640:128`, `2640:130`, `2640:132` — empty lower photo-index circles
- `2643:212`, `2643:214`, `2643:216` — empty upper photo-index circles

The six photos, frame-over-photo structure, functional captions, `OUR FAVORITE`, memory close copy and category tags remain.

Result: the gallery is visually quieter without losing useful photo labeling.

### 1DAY + Cafe/Table — remove empty helper shape

Removed the unused top-right yellow helper background `2604:27`. The actual itinerary route, stop dots, time/headline/body structure, five replaceable photos and Cafe/Table lower-band composition remain.

## Rollback evidence

Earlier cleanup rollbacks remain hidden:

- `2708:2`, `2708:84`, `2708:164`
- `2709:2`, `2709:94`, `2709:182`

Latest rhythm-pass rollback snapshots:

- `2718:2` — Story before proportion rebalance
- `2721:2` — Cover before caption editorialization

All rollback nodes remain hidden and are not production candidates.

## Structural QA after latest rhythm pass

PASS across all six current production frames:

- A4 size: `794×1123` × 6
- visible replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding visible frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- photo/frame geometry mismatch: 0
- visible node overflow outside page bounds: 0
- visible text below 9.5 px: 0
- visible rollback nodes: 0
- pages remain editable; no whole-page flattening was introduced

## Current design decision

`VERIFIED_LOCAL`: selective subtraction plus proportion rebalancing improves V9 more reliably than adding more decorative assets at the current stage. Magazine density should come from photo scale, headline hierarchy, asymmetric editorial grouping and functional labels—not from exhausting the Drive asset inventory.

Do not turn this into a blanket rule to remove all labels. Retain a line, tag, frame or container when it performs a visible editorial, binding, indexing or physical role.

## Next implementation target

Continue with publication-level refinement rather than new asset generation:

1. compare Cover / Back / Profile / Story / Memory / 1DAY together for intentional `dense → calm → dense` pacing;
2. refine the remaining weakest photo crops and Japanese headline/body spacing at actual print-reading scale;
3. reduce or replace any remaining web-UI-looking shape only where screenshot QA shows a concrete problem;
4. selectively use existing Drive artwork only when it solves a concrete editorial role;
5. generate missing assets later as one batch only after the assembled six pages expose specific gaps.

Final real-content / print-ready remains blocked on final real photography/copy and printer bleed/trim/preflight/physical proof.