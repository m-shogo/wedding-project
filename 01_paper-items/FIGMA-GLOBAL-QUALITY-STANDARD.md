# Figma Global Quality Standard — Wedding Project

Status: `PROJECT_WIDE_MANDATORY / CURRENT`
Scope: every current and future Figma-generated item in `m-shogo/wedding-project`

## Authority

This document is the mandatory quality baseline for all Figma work in this wedding project.

It applies to:
- profile books
- passports
- boarding passes and tickets
- escort cards
- welcome boards
- signage
- menus
- seating charts
- decorative cards
- additional wedding items
- any future Figma file created for the wedding

Item-specific art direction still overrides visual tone. This standard supplies the quality method, not one universal visual style.

## Core rule: do not look AI-generated

A result must not feel like a generic prompt-to-design output.

Reject or rework designs that rely on:
- repeated equal cards with identical geometry
- perfectly symmetric layouts without editorial reason
- arbitrary gradients used as final art direction
- excessive rounded rectangles
- random floating badges or icons with no semantic purpose
- one shadow recipe applied to every object
- generic app-dashboard spacing in printed matter
- decorative filler that does not classify, explain, navigate, or support atmosphere
- inconsistent typography sizes created one-by-one
- default-looking stock layouts that ignore the specific wedding item
- whole-page raster generation with baked-in normal text
- visually polished previews that are not editable or replaceable

AI may accelerate exploration and production, but the final composition requires human editorial judgment, screenshot review, and evidence-driven correction.

## Human-quality principles

Every item must have:

1. **A specific art direction**
   - derived from the item itself, not from the previous Figma file
   - passport must feel like a passport
   - boarding pass must feel like a ticket
   - 青春ふたりきっぷ must feel like a railway label
   - るるぶWEDDING may use dense travel-magazine grammar
   - methodology may transfer; visual tone must not transfer blindly

2. **One dominant visual idea**
   - a clear hero, headline, route, stamp, photograph, or primary information block
   - supporting elements must be medium and small, not equal competitors

3. **Varied but intentional rhythm**
   - use large / medium / small modules
   - vary orientation, overlap, crop, angle, and whitespace only when the concept supports it
   - do not repeat the same geometry more than twice in succession without a strong reason

4. **Functional micro-detail**
   - every small detail must classify content, guide the eye, show page position, explain a photo, reinforce travel/location meaning, or create material realism
   - remove details that compete with reading order

5. **Material and scale awareness**
   - design for the physical product, fold, trim, adhesion area, and viewing distance
   - do not treat every item like a web screen

## Mandatory Figma workflow

### Phase 1 — Grounding

Before editing:
- read the item Current status, placement plan, asset register, copy data, and print constraints
- inspect the current live Figma file
- verify GitHub, Drive, and Figma state instead of relying on chat memory
- identify fixed assets, replaceable content, and prohibited transformations

### Phase 2 — Art direction

Define before detailed placement:
- design concept
- dominant visual
- hierarchy
- palette
- typography levels
- material references
- what intentionally varies
- what must remain systematic

Create at least two materially different layout directions when the winner is not already established.

### Phase 3 — Design system setup

Use local Figma styles or variables for repeated rules:
- core colors
- type hierarchy
- card and sticker effects
- spacing or layout-guide settings

Use components and Auto Layout only for semantic repetition and variable-length content:
- chips
- labels
- folios
- page markers
- micro notes
- repeatable information rows

Do not force hero composition, collage, scrapbook arrangements, or one-off route paths into rigid Auto Layout.

### Phase 4 — Editable production structure

Required:
- native Figma text for normal headings, names, dates, menu copy, table data, captions, and body copy
- semantic node names
- separate fixed decoration, text, and replaceable image roles
- non-destructive image fills, crop, or masks
- accepted Drive assets remain authoritative
- no flattening of people, text, and decoration into a single final raster

Fixed art may be PNG where required by the item, but changeable information must stay editable.

### Phase 5 — Visual refinement

Refine at three scales:
- whole item or spread
- individual page / face
- detail crop

Check:
- first visual impression
- reading order
- optical balance
- repeated geometry
- edge and fold proximity
- micro-detail usefulness
- type consistency
- photo and label contrast
- empty spaces that feel accidental
- overly dense areas that feel generated rather than edited

### Phase 6 — Screenshot QA

Screenshot QA is mandatory after every meaningful placement group.

Use screenshots to find concrete defects, then fix only supported defects:
- overlap
- clipping
- weak hierarchy
- duplicated labels
- hidden assets
- bad crop
- inconsistent shadows
- filler detail
- generic or repetitive composition

Do not declare completion based only on node creation or successful tool output.

### Phase 7 — Stress and physical QA

Before final:
- test long names and long copy
- test bright and dark real photos
- inspect crop and subject-safe positioning
- inspect at actual print size
- verify vendor bleed, trim, safe area, and folds
- export PDF and run final print QA
- perform physical proof or adhesion test where applicable

## Anti-AI visual review gate

Before promoting a Figma direction, answer all of the following:

- Does this item have its own art direction rather than a reused house template?
- Is there one unmistakable dominant visual?
- Are modules intentionally unequal where the content hierarchy differs?
- Is symmetry used only where the object demands it?
- Does every badge, icon, line, texture, and note have a job?
- Are colors and effects controlled by a small system rather than arbitrary samples?
- Are normal words still native editable text?
- Can every final photo be replaced and repositioned non-destructively?
- Has the design been reviewed in whole-spread and detail screenshots?
- Were unnecessary additions removed after screenshot review?
- Does it look designed for this physical wedding item rather than generated for a generic portfolio shot?

Any `no` blocks promotion.

## Shared Figma implementation baseline

Use as appropriate, not mechanically:
- hidden 8 px grid or item-appropriate base unit
- columns matching the physical format
- named paint, text, effect, and grid styles
- consistent but restrained shadow families
- Auto Layout for changing labels and repeatable information
- manual composition for expressive editorial layouts
- semantic image roles
- non-destructive crop and masks
- reusable components for repeated functions
- screen-shot driven evidence log

The `03_RURUBU_EDITORIAL_SYSTEM` page is a reference implementation of the method. Its bright travel-magazine styling is not a universal template.

## Item-specific non-transfer rule

Never copy a previous item's visual tone merely because its Figma system is mature.

Transfer:
- QA discipline
- semantic naming
- local styles
- reusable components
- non-destructive replacement
- hierarchy analysis
- screenshot correction
- Git documentation

Do not automatically transfer:
- palette
- typography personality
- density
- decorative motifs
- corner radius
- shadow strength
- photography treatment
- editorial voice

## Git and continuity rule

Every major Figma milestone must be recorded in GitHub with:
- Figma URL and page/frame names
- verified live state
- chosen direction and rejected alternatives
- exact assets placed
- screenshot defects found and fixed
- semantic roles preserved
- remaining content and print blockers
- honest readiness state

Future chats and agents must read this document before creating or materially redesigning any wedding Figma item.

## Definition of done

A Figma item is not done merely because it looks attractive.

It must be:
- concept-specific
- non-generic
- editable
- replaceable
- structurally audited
- screenshot-QA verified
- content complete
- print-spec verified
- physically reviewed when applicable

Until those conditions are met, use an honest status such as `DESIGN_QA_PASS / CONTENT_PENDING / NOT_PRINT_READY`.
