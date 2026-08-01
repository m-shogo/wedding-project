# るるぶWEDDING — Figma Visual Checkpoint 2026-08-01

Status: `AUTHENTIC_RURUBU_CREATIVE_V3_QA_PASS / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

This checkpoint records only work verified against the live editable Figma file. It does not declare the item final or print-ready.

## Current production review target

Dedicated Figma page:

`02_RURUBU_AUTHENTIC`

Current frames:
- `01_RURUBU_AUTHENTIC_OUTER` — node `59:2`
- `02_RURUBU_AUTHENTIC_INSIDE` — node `59:178`

Geometry:
- outer: `1587.4 × 1122.5`
- inside: `1587.4 × 1122.5`

The earlier `Cover A + Inside A + Back A` candidates remain preserved on `01_RURUBU_WEDDING` as editable comparison and rollback evidence.

The user requested a closer match to real Rurubu travel-guide visual grammar and then requested that the fine details and placement become more creative and less repetitive. The Current preferred variant therefore uses bright color, high information density, irregular editorial rhythm, short callouts, photo-led modules, ribbons, routes, stickers, staggered cards, and deliberately unequal visual hierarchy without directly tracing a specific published issue.

## Live-state repair retained

A previous GitHub checkpoint claimed that the authentic page and both frames existed, while a fresh live Figma inspection found the page empty. The live Figma state was repaired and the two required frames were restored on `02_RURUBU_AUTHENTIC`.

The dedicated page now contains live editable outer and inside frames, and GitHub documentation again matches the actual Figma state.

## Creative layout refinement V3

### Front cover — non-uniform editorial rhythm

The previous six equal feature modules were redesigned into an intentionally unequal composition:

- feature 01: large horizontal lead module
- feature 02: tall vertical feature module
- features 03 and 04: smaller angled modules
- feature 05: compact long module
- feature 06: narrow dark destination module

Additional live details:
- circular secondary `旅のひとコマ` snap role on the hero area
- vertical `YOKOHAMA 2026` edge strip
- angled `編集部おすすめ!` sticker
- handwritten-style white note: `この日の笑顔、永久保存版。`
- micro route and `P.04–05 LOVE HISTORY` treatment inside the tall feature box
- existing Current Logo A, date badge, masking tape, star, and `BEST SHOT` retained
- hero photo remains the dominant visual mass

Result: the cover no longer reads as a uniform two-column grid. It now has clear large / medium / small rhythm, varying angles, overlapping editorial notes, and multiple entry points similar to a dense travel-guide cover.

### Back cover — staggered photos and route movement

The back cover was changed from a repeated three-column card row into a more scrapbook-like editorial composition:

- main memory photo and scrapbook frame rotate slightly counter-clockwise
- memory text panel overlaps the photo edge and rotates slightly in the opposite direction
- duplicate `MEMORY 01` text found during QA was hidden
- a white `ここがふたりの BEST MOMENT!` note overlaps the main-photo area
- Friends & Family photos use three different sizes and vertical positions
- photos rotate in alternating directions
- captions use separately rotated memo-card backgrounds
- translucent tape accents are positioned across photo edges without covering the friend labels
- original straight route line is hidden
- five dashed segments create a zigzag six-stop journey route
- year and route copy remain native editable text

Result: the back cover remains quieter than the front but no longer repeats one fixed card template.

### Inside left — asymmetric profiles and Q&A hierarchy

Profile layout:
- groom profile becomes the larger lead card
- groom photo uses a tilted portrait-style role
- bride profile becomes a smaller secondary card
- bride photo becomes circular
- profile ribbons use different widths, positions, and rotations
- `MY STYLE` and `BEST VIEW` micro stickers add editorial detail

Q&A layout:
- question 01 becomes a large pink hero article
- question 02 becomes a compact blue mini article
- question 03 becomes a compact yellow mini article
- questions 02 and 03 sit side by side instead of repeating the same vertical row
- `MAIN QUESTION` pill identifies the lead item
- the side tab now reads vertically as `LOVE Q&A` with a heart marker
- separator lines from the previous uniform stack are hidden

Unused lower-page whitespace was converted into an editable micro feature:
- yellow `ふたりの共通点` tape
- short explanatory line
- three colored pills: `旅`, `写真`, `HAWAII`

Result: the profile and Q&A page has a clear lead / secondary hierarchy rather than four similarly weighted rectangles.

### Inside right — one large feature and three compact destinations

The four equal memory cards were replaced with:

- one large `BEST SPOT No.1` lead feature
- one large landscape photo role
- three compact destination cards stacked on the right
- different card rotations for the three compact spots
- one vertical dashed route trunk
- three colored branch lines and destination dots
- relocated page stickers and card bars matching the new geometry
- history-photo note: `ふたりの旅は、まだまだ続く。`

Result: the memory-map page now reads as `1 large + 3 small`, creating a strong focal destination and a more magazine-like route through the supporting spots.

## Screenshot-driven correction pass

Screenshots were captured after both the first mutation and the correction pass.

Issues found and corrected:
- back-cover friend tape initially covered the friend tabs
- tape size, position, and opacity were corrected
- duplicated back-cover memory label was removed
- Q&A helper copy initially competed with the hero panel border
- it was replaced by a compact `MAIN QUESTION` pill
- the vertical Q&A tab originally compressed its lettering
- the text was rebuilt as vertically readable `LOVE Q&A` with a heart marker
- the tall front-cover feature module initially had excess empty space
- a route micro-detail and page reference were added
- Q&A lower-page empty space was converted into a meaningful shared-interests feature

Final screenshots show no major cover/fold collision, no major text clipping, and no remaining repeated equal-card structure in the primary sections.

## Live structural audit after Creative V3

Audit scope: page `02_RURUBU_AUTHENTIC` only.

- outer frame: node `59:2`
- inside frame: node `59:178`
- visible nodes: `333`
- native text nodes: `172`
- new `AUTH_*` creative nodes: `58`
- visible rotated elements: `88`
- missing-font text nodes: `0`
- invalid non-line geometry: `0`

Zero-height LINE nodes are valid route/divider elements and are excluded from invalid-geometry checks.

### Semantic photo-role preservation

All 12 required photo roles still exist and remain visible/editable:

1. `IMG_HERO`
2. `BACK_VISUAL_MAIN_MEMORY_PHOTO`
3. `BACK_VISUAL_FRIEND_1_PHOTO`
4. `BACK_VISUAL_FRIEND_2_PHOTO`
5. `BACK_VISUAL_FRIEND_3_PHOTO`
6. `IA_PROFILE_A_PHOTO`
7. `IA_PROFILE_B_PHOTO`
8. `IA_HISTORY_MEMORY_PHOTO`
9. `IA_MEMORY_1_PHOTO`
10. `IA_MEMORY_2_PHOTO`
11. `IA_MEMORY_3_PHOTO`
12. `IA_MEMORY_4_PHOTO`

The creative refinement changed placement, scale, rotation, shape, and hierarchy without deleting the semantic replacement path.

## Current assets and boundaries

Current accepted decorative assets remain authoritative:
- Logo A
- `2026.10.24 SAT` date badge
- masking tape #9
- `PICK UP!`
- `BEST SHOT`
- feature-stamp star #14a
- scrapbook frame
- map pin
- small travel icons

Rules preserved:
- no accepted asset was regenerated
- no production SVG was introduced into the Rurubu path
- no AI transformation of the couple, guests, or dog
- normal headings, names, profile copy, Q&A, dates, captions, labels, and page references remain native editable Figma text
- dummy/gradient fills are layout-only and must not be mistaken for final photos
- earlier comparison candidates remain available for rollback

## Remaining before final

1. Replace cover hero, profile, history, memory-spot, main-memory, and friends/family placeholders with selected real photos.
2. Replace dummy profile, Q&A, history, memory-spot, friends/family, shared-interests, and page-number copy with approved final content.
3. Re-run crop, subject-safe-position, text overflow, fold-proximity, and visual-density QA after every replacement group.
4. Review optical balance after real photographs introduce skin tones, scenery, and varying brightness.
5. Verify the exact current print product/template and final bleed/safe requirements immediately before ordering.
6. Apply the exact vendor template without inventing production-safe values.
7. Export the final PDF and run the repository final-print QA checklist.
8. Complete actual-size print and physical proof review.

## Declaration

The dedicated authentic-style Rurubu page now contains the requested higher-detail, more creative, non-repetitive V3 layout in live editable Figma.

Current state:

`AUTHENTIC_RURUBU_CREATIVE_V3_QA_PASS / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
