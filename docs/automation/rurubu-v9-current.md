# Rurubu WEDDING V9 — Current Production Checkpoint

Updated: 2026-08-27
Scope: Rurubu WEDDING V9 only

## Live authorities

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Drive asset pool/reference authority: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup / RURUBU_V9`
- GitHub base observed before this pass: `769901eb6c19178962e63dae2f3e2998adb1e7d9`

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

Removed the redundant `BEST SHOT / PHOTO SPOT / TRIP` pill row, gallery guide, page badge and navigation-like bottom helper. Retained photo indices, functional photo captions, the main `メモリースポット` title, `OUR FAVORITE`, memory lead/note and the useful category tags `PLACE / PEOPLE / FOOD`.

Result: the image grid remains dense, but the lower half has controlled breathing room and clear reader hierarchy.

### 1DAY + Cafe/Table

Removed `DAY SCHEDULE / DRESS CODE / MENU`, top-right Cafe pill, food helper chips, photo/food ID badges, page/footer navigation chips and the boxed Trip Memo container/badge. Added one simple editorial rule:

- `2709:289` — `V9 / DAY TRAVEL NOTE RULE / EDITORIAL`

Retained the actual time-route dots/line because they perform a functional itinerary-binding role, plus all five photos, native Japanese stop copy, `1DAYプラン` and `CAFE & TABLE` section title.

Result: stronger timetable → photo → food-section scan path with less dashboard/pill grammar.

## Rollback evidence

Before the main cleanup, hidden rollback duplicates were created for all six production frames:

- `2708:2`, `2708:84`, `2708:164`
- `2709:2`, `2709:94`, `2709:182`

They remain hidden and are not production candidates.

## Structural QA after cleanup

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

`VERIFIED_LOCAL`: selective subtraction of redundant pills/cards improved all six pages in screenshot QA while preserving the legitimate magazine-specific devices: layered section titles, photo hierarchy, photo labels where they carry semantic value, and the functional Story/1DAY route structures.

Do not turn this into a blanket rule to remove all labels. Retain a line, tag or container only when it performs a visible editorial, binding, indexing or physical role.

## Next implementation target

Continue with publication-level refinement rather than new asset generation:

1. compare the six pages together at whole-publication scale for density/pacing;
2. refine photo crop/relative scale and Japanese headline/body spacing where the current visual rhythm is weakest;
3. selectively use existing Drive artwork only if it solves a concrete role;
4. generate missing assets later as one batch only after the assembled six pages expose specific gaps.

Final real-content / print-ready remains blocked on final real photography/copy and printer bleed/trim/preflight/physical proof.