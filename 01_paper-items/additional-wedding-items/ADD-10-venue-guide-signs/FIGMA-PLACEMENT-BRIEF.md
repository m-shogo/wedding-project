# ADD-10 会場案内サイン — FIGMA PLACEMENT BRIEF

Status: `PREPARED_FOR_FIGMA`
Date: 2026-08-02

## Figma execution boundary
Current authority says `Figmaを使用しない`; therefore this document is a future execution contract, not evidence that a Figma file or canvas was created.

When Figma work is permitted:
- one item = one production Figma file = one URL
- do not edit the four completed production files
- preserve native editable destination/direction roles
- inspect existing semantic nodes before every write
- build incrementally and screenshot each meaningful group

## Recommended page structure
- `00_README`
- `01_SYSTEM`
- `02_A4_MAJOR_JUNCTION`
- `03_A5_NEAR_FIELD`
- `04_OPTIONAL_NARROW`
- `99_QA`

## System page
Create only the reusable primitives needed by confirmed routes:
- color swatches and text styles
- arrow geometry and optical correction notes
- destination node
- route rule
- Japanese / English typography specimen
- safe-area and bleed guides

Do not build a large generic icon library before requirements are confirmed.

## A4 composition
Use an asymmetric, directional layout:
- functional arrow occupies roughly one side of the visual field
- destination typography occupies the opposing field
- Japanese destination dominates
- English destination aligns as support, not as a second equal title
- small destination node may bridge arrow and title
- leave an intentionally quiet field around the direction of travel

The layout should feel like a high-quality hotel or port wayfinding sign, not an airport-themed party template.

## A5 landscape reflow
Recompose rather than scale down:
- arrow uses the leading edge
- Japanese and English stack or align according to text width
- floor/room label sits near the destination, never near the arrow tip
- remove secondary route decoration if it reduces near-field clarity

## Direction-specific editorial adjustments
### Left
Weight the title slightly rightward so the arrow has room to pull the eye left.

### Right
Reverse the reading tension but do not mirror typography mechanically; rebalance for actual title width.

### Forward
Use vertical movement and stronger upper breathing space. Avoid making it look like a decorative compass.

### Stairs / elevator
Use only after venue requirements confirm them. Pair the directional cue with an explicit native text label rather than relying on an ambiguous pictogram.

## Semantic nodes
Use the exact contract from `SPEC.md`, adding destination/direction/size suffixes. Keep temporary venue assumptions under `NOTE_ADD10_TBD_REMOVE_BEFORE_EXPORT` and exclude them from final export.

## Screenshot-driven refinement loop
1. Build one confirmed A4 prototype.
2. Capture screenshot.
3. Inspect arrow dominance, Japanese readability, empty-field balance, and accidental UI/card appearance.
4. Correct only evidence-supported defects.
5. Build left/right/forward variants.
6. Capture grouped screenshot and correct optical imbalance.
7. Reflow to A5 and repeat.
8. Perform physical proof before declaring complete.

## Completion threshold
ADD-10 may move beyond `PREPARED_FOR_FIGMA` only when:
- venue route facts are confirmed,
- production Figma work is explicitly permitted,
- screenshot QA and corrections are recorded,
- 100% physical proof passes,
- final PDFs are stored in the registered Drive folder.
