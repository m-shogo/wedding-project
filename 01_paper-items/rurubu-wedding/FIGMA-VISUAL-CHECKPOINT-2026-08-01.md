# るるぶWEDDING — Figma Visual Checkpoint 2026-08-01

Status: `AUTHENTIC_RURUBU_EDITORIAL_SYSTEM_V4_QA_PASS / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

This checkpoint records only work verified against the live editable Figma file. It does not declare the item final or print-ready.

Detailed research and reusable rules:

`FIGMA-EDITORIAL-QUALITY-PLAYBOOK-2026-08-01.md`

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

## Current visual direction

The user requested:
- a closer match to actual Rurubu travel-guide visual grammar
- more detailed editorial design
- less repetitive placement
- more creative photo and module rhythm
- online research into Figma operation and layout quality
- preservation of the resulting knowledge in Git

The Current preferred variant therefore combines:
- bright Japanese travel-guide color
- dense but ordered information hierarchy
- large / medium / small module rhythm
- unequal cards rather than repeated grids
- staggered, angled, circular, and overlapping photo roles
- ribbons, page references, route motifs, micro labels, stickers, and editorial notes
- reusable Figma styles and Auto Layout components
- hidden alignment guides beneath the intentional visual irregularity

It does not directly trace one specific published issue.

## Creative layout V3 retained

### Front cover

- six equal feature boxes replaced by deliberately unequal large, tall, compact, and angled modules
- circular `旅のひとコマ` secondary photo role
- vertical `YOKOHAMA 2026` strip
- angled `編集部おすすめ!` sticker
- handwritten-style photo note
- route and page-reference detail inside the tall feature
- Logo A, date badge, masking tape, star, and `BEST SHOT` retained

### Back cover

- main-memory photo and text panel overlap at different angles
- three Friends & Family photos use different sizes, heights, and rotations
- translucent tape accents sit across photo edges
- caption cards rotate independently
- straight journey line replaced by a zigzag dashed route
- `BEST MOMENT` note and route microcopy added

### Inside left

- groom becomes the larger lead profile
- bride becomes the smaller circular-photo profile
- Q1 becomes the large main question
- Q2 and Q3 become side-by-side supporting articles
- vertical `LOVE Q&A` tab and shared-interests mini feature added

### Inside right

- four equal memory cards replaced by `1 large + 3 small`
- one large `BEST SPOT No.1` feature
- three compact supporting destinations with varied rotation
- branch-route treatment connects the lead destination to supporting spots

All 12 semantic photo replacement roles remain intact.

## Online-research-driven Editorial System V4

Current official Figma and Adobe editorial documentation was reviewed before this pass. The resulting system was implemented in the live file rather than kept as prose only.

New Figma page:

`03_RURUBU_EDITORIAL_SYSTEM` — node `68:2`

System frame:

`99_EDITORIAL_SYSTEM_V1` — node `68:23`

### Reusable local styles

Paint styles:
- 11 `RURUBU/Color/*` styles

Text styles:
- `RURUBU/Type/Display`
- `RURUBU/Type/Section`
- `RURUBU/Type/CardTitle`
- `RURUBU/Type/Body`
- `RURUBU/Type/Micro`
- `RURUBU/Type/Label`

Effect styles:
- `RURUBU/Effect/Card Lift`
- `RURUBU/Effect/Sticker Lift`

Layout-guide style:
- `RURUBU/Grid/8px + 12 Columns`

The hidden guide combines:
- 8 px uniform grid
- 12 stretch columns
- 16 px gutters
- 32 px outer offsets

It is applied to both Current production frames.

### Auto Layout components

Six reusable live main components were created:
- `RURUBU/Chip/Pink`
- `RURUBU/Chip/Blue`
- `RURUBU/Chip/Yellow`
- `RURUBU/Chip/Mint`
- `RURUBU/Folio`
- `RURUBU/MicroNote`

These use padding and hug-content behavior so short copy changes are less likely to break small editorial labels.

### Reusable micro vectors

Editable vector details:
- camera
- plane
- heart
- map pin

They are used only when they indicate photo, travel, relationship, or location meaning.

## V4 production refinements applied

### Outer spread

Added or standardized:
- page folios
- Auto Layout category chips
- camera and plane micro-icons
- low-opacity halftone texture
- dashed guide accents
- photo-point note
- photo/archive microcopy
- consistent card-lift and sticker-lift effect styles

### Inside spread

Added or standardized:
- profile/history page folios
- semantic profile chip
- camera, heart, plane, and pin micro-icons
- low-opacity halftone texture outside body-copy areas
- reusable history-photo note
- consistent effects across key profile, Q&A, and memory surfaces

## Screenshot-driven correction after V4

Whole-spread screenshots were reviewed after applying the system.

Removed after review:
- `EDITOR CHECK` note overlapping Q&A content
- redundant `MAP ROUTE` chip competing with the existing memory-map heading
- yellow dashed rule crossing the Q&A article area

These removals are part of the quality result. Detail count is not the goal; hierarchy, meaning, and editability are the goal.

Current visual read:
- fine details are visible without replacing the main hierarchy
- page references and icons improve navigation
- shadows are more consistent
- halftone texture remains subtle
- no major fold collision is visible
- no major text clipping is visible
- the layout remains intentionally irregular without losing its underlying grid

## Final live structural audit after V4

Production page:

`02_RURUBU_AUTHENTIC`

Audit result:
- visible nodes: `497`
- visible native text nodes: `162`
- live component instances: `9`
- editorial-detail nodes in production frames: `20`
- system main components: `6`
- local RURUBU paint styles: `11`
- local RURUBU text styles: `6`
- local RURUBU effect styles: `2`
- local RURUBU grid styles: `1`
- missing-font text nodes: `0`
- invalid non-line geometry: `0`
- semantic photo roles preserved: `12 / 12`

Zero-height LINE nodes are valid route/divider elements and are excluded from invalid-geometry checks.

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
- no accepted Current asset was regenerated
- no production SVG was introduced into the Rurubu path
- no AI transformation of the couple, guests, or dog
- normal headings, names, profile copy, Q&A, dates, captions, labels, and page references remain native editable Figma text
- photo roles remain replaceable and non-flattened
- dummy/gradient fills remain visibly provisional
- earlier comparison candidates remain available for rollback

## Remaining before final

1. Replace cover hero, profile, history, memory-spot, main-memory, and friends/family placeholders with selected real photos.
2. Replace dummy profile, Q&A, history, memory-spot, friends/family, shared-interests, and page-number copy with approved final content.
3. Re-run non-destructive crop and subject-safe-position QA after every photo replacement group.
4. Re-run text overflow, fold-proximity, and visual-density QA after every copy replacement group.
5. Review optical balance after real photographs introduce skin tones, scenery, and varying brightness.
6. Verify the exact current print product/template and final bleed/safe requirements immediately before ordering.
7. Apply the exact vendor template without inventing production-safe values.
8. Export the final PDF and run the repository final-print QA checklist.
9. Complete actual-size print and physical proof review.

## Declaration

The dedicated authentic-style Rurubu page now contains:
- the requested more creative, non-repetitive editorial composition
- a research-driven reusable Figma editorial system
- screenshot-driven removal of redundant detail
- a passing live structural audit

Current state:

`AUTHENTIC_RURUBU_EDITORIAL_SYSTEM_V4_QA_PASS / REAL_CONTENT_REPLACEMENT_PENDING / NOT_PRINT_READY`
