# るるぶWEDDING — Figma Editorial Quality Playbook 2026-08-01

Status: `RESEARCHED / APPLIED_TO_LIVE_FIGMA / REUSABLE`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Research date: 2026-08-01

## Purpose

This document records the Figma operation knowledge researched from current official documentation, the editorial-design principles inferred from that research, and the exact changes applied to the live るるぶWEDDING file.

It exists to prevent future work from returning to ad-hoc one-off placement. The goal is not to make every page mechanically uniform. The goal is to preserve creative asymmetry while making repeated details, typography, effects, spacing, and replacement workflows stable.

This playbook does not authorize direct tracing of a specific published Rurubu issue. It uses high-level travel-guide visual grammar—dense hierarchy, bright color, varied photo modules, ribbons, page references, route motifs, and editorial microcopy—to produce an original wedding profile book.

## Official sources reviewed

### Figma Design operation

- Auto layout guide: https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties
- Layout guides: https://help.figma.com/hc/en-us/articles/360040450513
- Layout guides and constraints: https://help.figma.com/hc/en-us/articles/360039957934-Combine-layout-guides-and-constraints
- Grid auto-layout flow: https://help.figma.com/hc/en-us/articles/31289469907863-Use-the-grid-auto-layout-flow
- Image crop: https://help.figma.com/hc/en-us/articles/360040675194-Crop-an-image
- Masks: https://help.figma.com/hc/en-us/articles/360040450253-Masks
- Blend modes: https://help.figma.com/hc/en-us/articles/360040667874-Apply-blend-modes-to-layers-fills-and-effects
- Styles: https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma-Design
- Components: https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma
- Component variants: https://help.figma.com/hc/en-us/articles/39636737843735-Components-collection-Variants-and-component-set-fundamentals
- Variables overview: https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes
- Text guide: https://help.figma.com/hc/en-us/articles/360039956434-Guide-to-text-in-Figma-Design

### Figma Plugin API

- LayoutGrid: https://developers.figma.com/docs/plugins/api/LayoutGrid/
- FrameNode and layoutGrids: https://developers.figma.com/docs/plugins/api/FrameNode/
- createComponent: https://developers.figma.com/docs/plugins/api/properties/figma-createcomponent/
- layoutMode: https://developers.figma.com/docs/plugins/api/properties/nodes-layoutmode/
- local styles API: https://developers.figma.com/docs/plugins/api/figma/

### Japanese editorial layout reference

- Adobe InDesign Japanese layout grids: https://helpx.adobe.com/indesign/desktop/layout-and-grid-tools/grids/create-customize-layout-grids.html
- Adobe InDesign document grids: https://helpx.adobe.com/indesign/desktop/layout-and-grid-tools/grids/use-a-document-grid.html
- Adobe paragraph and character styles: https://helpx.adobe.com/jp/indesign/using/paragraph-character-styles.html

## Source-derived operational conclusions

### 1. Use guides for consistency, not for visible uniformity

Figma layout guides are non-exported visual structure. The official guidance describes them as a way to align objects and reduce repeated layout decisions. Adobe's Japanese editorial grid guidance similarly treats grids as a typographic and page-structure foundation.

Applied interpretation:
- use an 8 px base grid for small optical decisions
- use 12 stretch columns for spread-level alignment
- hide guides during visual review and export
- allow intentional offsets and rotations only after the underlying alignment is stable

The grid is the invisible skeleton. It must not force all content into equal cards.

### 2. Use Auto Layout only where content length can change

Figma Auto Layout responds to label length, padding, spacing, and content insertion. It is ideal for badges, chips, folios, captions, and reusable micro-panels.

Applied interpretation:
- do not convert the entire creative magazine spread to Auto Layout
- use Auto Layout for repeating small components
- preserve manual absolute composition for hero photos, collage, angled cards, and overlapping editorial notes

This separates stable component mechanics from expressive page composition.

### 3. Use styles as the source of truth for repeated visual rules

Figma styles can manage paint, text, effects, and layout guides. Updating a style propagates changes to consumers.

Applied interpretation:
- colors, typography levels, card shadows, sticker shadows, and grid settings receive named local styles
- one-off decorative geometry may vary, but its fill, type, and effect should come from the shared system whenever practical
- new pages should reuse existing styles rather than sample arbitrary colors from screenshots

### 4. Use components for semantic repetition, not decorative cloning

Figma components are reusable linked objects. The system should componentize functions that repeat, not every visual object.

Componentize:
- category chips
- page folios
- micro editorial notes
- repeatable labels

Do not componentize:
- the entire cover composition
- unique hero-photo collage
- one-off route paths
- intentionally irregular scrapbook groupings

### 5. Keep photo edits non-destructive

Figma crop and mask operations preserve concealed image data. They allow the subject to be repositioned after replacement.

Applied interpretation:
- every final photo must remain a semantic image-fill or masked role
- do not flatten people, captions, frames, and decorations into one raster
- use FILL/CROP for main photos and adjust the subject-safe position after replacement
- use circular or irregular masks only where the layout needs a secondary snapshot
- never permanently crop away faces before actual print QA

### 6. Use blend modes and texture at low strength

Blend modes affect how overlapping colors combine. They are useful for print-like texture but can quickly reduce legibility.

Applied interpretation:
- use halftone-dot texture at approximately 7–10% opacity
- keep texture away from small body copy
- use MULTIPLY for subtle printed-paper integration
- remove texture when it does not provide hierarchy or atmosphere

### 7. Preserve Japanese editorial text consistency

Adobe's paragraph-style guidance emphasizes consistent formatting across a document. Figma text styles provide the equivalent foundation for this file.

Applied hierarchy:
1. Display
2. Section heading
3. Card title
4. Body
5. Label
6. Micro text

Creative variation comes from placement, color block, angle, and scale—not from random font settings on every label.

## Live Figma editorial system created

New page:

`03_RURUBU_EDITORIAL_SYSTEM` — node `68:2`

System frame:

`99_EDITORIAL_SYSTEM_V1` — node `68:23`

The page contains foundations, reusable Auto Layout components, micro icons, and production rules. It is separate from the production page so the actual spread remains visually reviewable.

### Local paint styles

11 styles under `RURUBU/Color/*`:
- navy
- pink
- blue
- yellow
- mint
- orange
- cream
- paleBlue
- paper
- ink
- white

### Local text styles

6 styles under `RURUBU/Type/*`:
- Display
- Section
- CardTitle
- Body
- Micro
- Label

### Local effect styles

2 styles:
- `RURUBU/Effect/Card Lift`
- `RURUBU/Effect/Sticker Lift`

### Local layout-guide style

`RURUBU/Grid/8px + 12 Columns`

Contents:
- hidden 8 px uniform grid
- hidden 12-column stretch grid
- 16 px gutters
- 32 px outer offsets

Applied to:
- `01_RURUBU_AUTHENTIC_OUTER`
- `02_RURUBU_AUTHENTIC_INSIDE`

### Auto Layout components

6 live main components:
- `RURUBU/Chip/Pink`
- `RURUBU/Chip/Blue`
- `RURUBU/Chip/Yellow`
- `RURUBU/Chip/Mint`
- `RURUBU/Folio`
- `RURUBU/MicroNote`

These components use padding and hug-content behavior so final copy changes are less likely to break the small UI-like editorial elements.

### Reusable micro icons

Editable Figma vector nodes:
- camera
- plane
- heart
- map pin

They are small navigational or semantic accents, not filler. Each must identify photo, travel, relationship, or location context.

## Research-driven production refinements applied

### Outer spread

Applied:
- reusable page folios
- Auto Layout category chips
- camera and plane micro-icons
- low-opacity halftone texture
- dashed editorial guide rules
- photo-point micro note
- consistent card-lift and sticker-lift effect styles
- back-cover archive labels and route microcopy

Screenshot QA found that the new elements remained readable and did not replace the existing major hierarchy.

### Inside spread

Applied:
- page folios for profile/history pages
- category chip for profile semantics
- camera, heart, plane, and pin micro-icons
- low-opacity halftone texture around non-body-copy areas
- reusable history-photo note
- consistent effects on profile, Q&A, and memory cards

Screenshot QA removed two additions that competed with existing content:
- an `EDITOR CHECK` note overlapping Q&A content
- a redundant `MAP ROUTE` chip competing with the existing memory-map heading

A dashed rule crossing the Q&A area was also removed.

This correction is important: design detail is not measured by node count. A detail survives only when it improves hierarchy, meaning, replacement workflow, or printed atmosphere.

## Current quality rules

### Hierarchy

- every spread must have one unmistakable dominant visual
- supporting modules must be medium and small, not equal clones
- one page may use `1 large + 3 small`; another may use staggered photos; another may use a vertical feature
- do not repeat the same card geometry more than twice in succession

### Micro detail budget

A micro detail must perform at least one function:
- classify content
- show page/section position
- direct the eye
- explain a photo
- reinforce travel/location meaning

Decorative filler with no function should be deleted.

### Spacing

- align most objects to the hidden 8 px / 12-column system
- intentional deviations should normally be 2–6 px or a visible angle, not accidental 1 px drift
- preserve breathing room around body copy even when the page is dense

### Effects

- card lift: content modules and photo-caption surfaces
- sticker lift: tabs, notes, labels, and intentionally floating micro-elements
- do not add shadows to every element
- avoid multiple different shadow recipes in the same spread

### Photo replacement

For each real-photo replacement group:
1. replace image fill without flattening the surrounding design
2. use crop/reposition non-destructively
3. check face and subject position
4. check fold distance
5. check contrast under labels
6. re-run screenshots at whole-spread and page-detail level

### Typography

- retain native Figma text for all normal copy
- use the six named text levels
- avoid introducing a new arbitrary font size unless a screenshot proves the current scale cannot solve the problem
- keep micro text above practical print size after the vendor template is known

## Final live audit after system application

Production page:

`02_RURUBU_AUTHENTIC`

Frames:
- `01_RURUBU_AUTHENTIC_OUTER` — node `59:2`
- `02_RURUBU_AUTHENTIC_INSIDE` — node `59:178`

Audit result:
- visible nodes: `497`
- visible native text nodes: `162`
- live component instances: `9`
- editorial-detail nodes in the audited production frames: `20`
- system components: `6`
- local RURUBU paint styles: `11`
- local RURUBU text styles: `6`
- local RURUBU effect styles: `2`
- local RURUBU grid styles: `1`
- missing-font text nodes: `0`
- invalid non-line geometry: `0`
- semantic photo roles preserved: `12 / 12`

## Boundary and remaining work

This research and implementation improve design quality and future editing reliability. They do not make the book print-ready.

Remaining:
1. replace all dummy image roles with selected real photos
2. replace all dummy copy with approved final copy
3. inspect actual photo brightness and skin-tone interactions with the current palette
4. re-run crop, text overflow, fold, and density QA
5. obtain the exact print-vendor template and bleed/safe specifications
6. apply the vendor template without inventing dimensions
7. export and review the final PDF
8. complete actual-size physical proof review

## Declaration

The Figma file now contains both:
- a higher-detail authentic-style production spread
- a reusable editorial design system based on current official Figma operation guidance and Japanese editorial grid practice

Future quality work should build on this system rather than creating unrelated one-off styles.