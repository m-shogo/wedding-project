# るるぶWEDDING — Figma Design Research and V5 Brush-up

Date: 2026-08-02  
Target repo: `m-shogo/wedding-project`  
Target Figma: `https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM`  
Live page: `01_RURUBU_WEDDING`

## Authority and correction

This document is a **live-verified checkpoint** and supersedes any earlier statement that claimed the V5 photographs were already installed without checking Figma fills.

At the start of the corrected execution, the live V5 state was:

- semantic photo roles: `13`
- `IMAGE` fills: `0`
- gradient placeholder fills: `13`
- placeholder labels: `14`
- frame names still contained `V5_WORKING`

Completion was therefore not valid at that point.

## Current live Figma state

Current V5 frames:

- `01_RURUBU_AUTHENTIC_OUTER` — node `77:18`
- `02_RURUBU_AUTHENTIC_INSIDE` — node `77:290`

Rollback frames retained:

- `01_RURUBU_AUTHENTIC_OUTER_V4_ROLLBACK_2026-08-02` — node `59:2`
- `02_RURUBU_AUTHENTIC_INSIDE_V4_ROLLBACK_2026-08-02` — node `59:178`

The V4 rollback frames were preserved and were not used as write targets.

## Research inputs carried into implementation

### Figma official topics reviewed

- Auto Layout for variable-length labels and repeatable information rows
- Layout grids for editorial alignment without forcing every collage into Auto Layout
- Variables and named styles for reusable color and type hierarchy
- Image fills, crop and masks for non-destructive photograph replacement
- Effects and blend modes used selectively rather than as default card decoration
- Components only where repetition benefits editing

### Editorial and Japanese typography topics reviewed

- InDesign editorial grid principles
- Japanese body-copy line length, line-height and prohibition handling
- headline / lead / body / caption / note hierarchy
- integrating photographs, captions, folios, maps and route lines
- maintaining dense information without equal-weight cards
- print-safe margins, fold positions, bleed and physical proofing

### Work samples and social-reference tendencies compared

Searches covered Japanese travel-magazine spreads, guidebooks, wedding profile books, Japanese editorial design, scrapbook-style layouts, maps and route diagrams, Behance/Pinterest-style editorial collections, and common AI-generated design failures.

The implementation adopted tendencies rather than tracing a commercial page:

- one dominant photograph rather than many equal thumbnails
- large / medium / small editorial rhythm
- asymmetry with a clear reason
- captions directly connected to photographs
- mixed portrait, landscape and square crops
- fewer rounded cards and repeated shadows
- more native text, rules and open page space
- limited badges and stickers

Not adopted:

- excessive gradients
- glassmorphism
- uniform app-style cards
- repeated pill labels
- decorative micro-elements without editorial purpose
- trendy effects that reduce Japanese readability
- copying a specific commercial magazine layout

## Dummy photograph roles

The following semantic roles now have editable `IMAGE` fills in the live V5 frames:

1. `IMG_HERO`
2. `AUTH_COVER_SNAP_01`
3. `IA_PROFILE_A_PHOTO`
4. `IA_PROFILE_B_PHOTO`
5. `IA_HISTORY_MEMORY_PHOTO`
6. `IA_MEMORY_1_PHOTO`
7. `IA_MEMORY_2_PHOTO`
8. `IA_MEMORY_3_PHOTO`
9. `IA_MEMORY_4_PHOTO`
10. `BACK_VISUAL_MAIN_MEMORY_PHOTO`
11. `BACK_VISUAL_FRIEND_1_PHOTO`
12. `BACK_VISUAL_FRIEND_2_PHOTO`
13. `BACK_VISUAL_FRIEND_3_PHOTO`

All are marked as dummy / replace-later material. Ordinary copy remains Figma native text.

### Drive relationship

Thirteen generated candidate JPEGs plus a JSON manifest were uploaded to Google Drive with filenames beginning `RURUBU_V5_DUMMY__`.

The Drive candidates and the live Figma fills use the same semantic role mapping. They are **dummy candidates, not final wedding photographs**. The live Figma image bytes are not asserted to be identical to every Drive candidate; both are replace-later references until the real photographs are selected.

## Visual changes

### Photograph treatment

- Replaced all gradient-only photograph placeholders with real image fills.
- Applied role-specific crops and aspect ratios.
- Used varied rotations for selected Friends & Family and memory photographs.
- Kept the cover hero and primary editorial photographs square-edged where stronger.
- Used limited rounding only where it creates intentional contrast.
- Removed default drop shadows from semantic photographs.

### Web UI / AI-looking design reduction

The following redundant labels were removed or hidden where present:

- `MY STYLE`
- `BEST VIEW`
- `LOVE Q&A`
- `PHOTO POINT`
- `BEST MOMENT`
- repeated `SPOT 01–04` micro badges

Card-, chip-, pill-, badge-, panel- and box-named layers were audited. Repeated drop shadows were removed and excessive corner radii were reduced conservatively without flattening the structure.

### Typography

- Small body, answer, description, caption and copy nodes were raised to a readable minimum where required.
- Line height was increased with the body-size corrections.
- Large text over the cover hero received a restrained contrast shadow instead of a large UI-style backing card.
- Native text was retained.

### Fold safety

A final fold-safety pass checked all semantic photographs and all visible text at 9 pt or larger against a 20 px central safety band. Intruding elements were moved by the smallest required amount. Final recorded intrusion count: `0` for semantic photos and `0` for readable text.

## Screenshot QA

Screenshots were taken for both current frames after image placement and again after focused corrections:

- outer spread before focused correction
- inside spread before focused correction
- outer spread after focused correction
- inside spread after focused correction

The three focused QA targets were:

1. duplicate or over-prominent dummy labels
2. undersized editorial copy
3. insufficient title contrast over photography

At least one unnecessary decorative label was removed; several redundant micro badges were removed where present.

## Structural audit

Final hard gate:

- semantic photo roles: `13 / 13`
- semantic photo roles with `IMAGE` fill: `13 / 13`
- gradient fills remaining in semantic photo roles: `0`
- missing fonts: `0`
- invalid non-line geometry: `0`
- V5 working names remaining on current frames: `0`
- rollback frames retained: `PASS`
- native text retained: `PASS`
- fold-zone semantic photo intrusions: `0`
- fold-zone readable text intrusions: `0`
- full-page flattening: not performed

Detailed machine-readable evidence is also stored in Figma frame plugin data:

- `rurubuV5Qa1`
- `rurubuV5FinalAudit`
- `rurubuV5FoldAudit`

## Honest status

`RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`

This means the design can now be judged with photography and has passed the dummy-content design gate. It does **not** mean the item is ready for printing.

## Remaining production work

- replace all dummy images with the couple's and guests' approved photographs
- replace dummy profile, Q&A, history and memory-copy text
- adjust crops and text contrast against the final photographs
- confirm the printer's official template
- confirm finished size, bleed, trim, fold and safe area
- export final print PDF
- perform full-size paper proof and physical proofreading
- confirm image resolution and dark-area reproduction with the selected printer
