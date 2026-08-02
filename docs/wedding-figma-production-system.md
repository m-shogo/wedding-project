# Wedding Figma Production System

Date: 2026-08-02
Status: `CURRENT PROJECT-WIDE AUTHORITY`
Scope: every present and future wedding design made in Figma

## Purpose

This document promotes the lessons from the Rurubu V5/V6 work into a project-wide production system.

It applies to:

- Rurubu-style profile books, including V5 and V6
- passport-style menu / seating booklets
- boarding-pass escort cards
- ticket-style Mintia labels
- invitations, table items, signs, cards, maps, itineraries, tags, favors, and future wedding printables
- digital previews and production-ready print exports

The core skill is not operating Figma quickly. It is making correct editorial, typographic, asset, layout, and production decisions while preserving evidence and rollback safety.

---

## 1. Authority order

When sources disagree, use this order:

1. live Figma state
2. verified Google Drive assets and file IDs
3. item-specific evidence ledger
4. item-specific Current Status
5. this project-wide production system
6. item roadmap and old checklists
7. chat statements and assumptions

A checkbox, generation result, upload attempt, or IMAGE fill never overrides live evidence.

---

## 2. Mandatory lifecycle

Every generated or selected visual asset follows:

`ROLE_BRIEF`
→ `MASTER_GENERATED_OR_SELECTED`
→ `MASTER_VISUAL_QA`
→ `DRIVE_MASTER_SAVED`
→ `DRIVE_READBACK_VERIFIED`
→ `FIGMA_DERIVATIVE_CREATED`
→ `DERIVATIVE_QA`
→ `EXACT_FIGMA_NODE_APPLIED`
→ `SCREENSHOT_QA`
→ `STRUCTURE_QA`
→ `LEDGER_UPDATED`
→ `GITHUB_COMMIT_AND_READBACK`
→ `ROLE_COMPLETE`

No stage may be silently collapsed into another.

Important distinctions:

- generated does not mean accepted
- saved to Drive does not mean applied to Figma
- an IMAGE fill does not prove the intended source
- a successful import does not prove visual quality
- a Figma design pass does not prove print readiness

---

## 3. Drive-first asset policy

All accepted generated masters are saved to a version-specific Drive folder before Figma placement.

Folder pattern:

```text
<ITEM>_<VERSION>_<DATE>/
  00_RESEARCH_AND_REFERENCE_LINKS/
  10_GENERATED_MASTERS/
  20_FIGMA_DERIVATIVES/
  30_FINAL_REAL_ASSETS/
  90_REJECTED_AND_ARCHIVE/
```

Rules:

- masters and Figma derivatives are separate files
- transfer compression never overwrites a master
- rejected generations go to archive only when their failure is educational; otherwise they may be discarded
- published reference imagery is not copied into production folders unless licensing permits it
- exact Drive IDs are recorded in the asset register

---

## 4. Figma file architecture

### Pages

Use clear pages by item or version. Do not place unrelated final candidates on one unstructured canvas.

Recommended:

```text
00_README_AND_GUIDES
01_RURUBU_V5
02_RURUBU_V6_HAWAII
03_PASSPORT_BOOKLET
04_ESCORT_TICKET
05_MINTIA_TICKET
90_COMPONENTS_AND_STYLES
99_ARCHIVE
```

Actual page names may differ, but the separation principle is mandatory.

### Frame names

Use:

```text
<ORDER>_<ITEM>_<SIDE_OR_SPREAD>_<VERSION>_<STATE>
```

Examples:

- `01_RURUBU_OUTER_V5_CURRENT_CANDIDATE`
- `02_RURUBU_INSIDE_V5_CURRENT_CANDIDATE`
- `01_ESCORT_CARD_FRONT_V2_QA_CANDIDATE`
- `02_ESCORT_CARD_BACK_V2_QA_CANDIDATE`

### Semantic node names

Photo, text, route, and production roles must remain understandable without looking at the canvas.

Examples:

- `IMG_COVER_HERO`
- `TXT_MAIN_COVER_LINE`
- `PROFILE_GROOM_PHOTO`
- `ROUTE_START_MARKER`
- `PRINT_FOLD_GUIDE_PROVISIONAL`

Do not flatten the document into a screenshot or rename meaningful roles to generic `Rectangle 123`.

---

## 5. Figma execution rules learned from real failures

- read the current Figma-use guidance before every write call
- work incrementally; validate after each small batch
- return every mutated or created node ID
- switch page with `setCurrentPageAsync` at most once per invocation
- load current text fonts before editing any text property
- clone and reassign fill, stroke, and effect arrays
- use only alphanumeric characters, `_`, or `.` in shared-plugin-data namespaces
- failed Figma scripts are atomic; read the error and correct the method instead of blindly retrying
- preserve rollback frames before structural changes
- use non-destructive image fills and editable crops
- prefer native text and editable vectors over rasterized labels
- do not use plugin-operation success as evidence of visual success

---

## 6. Design planning before Figma polish

Every item begins with an item brief:

- guest/user purpose
- emotional objective
- physical or digital format
- trim size
- bleed
- safe area
- fold or perforation
- front/back/page order
- required content
- dominant visual
- reading order
- final real assets versus temporary dummies
- production vendor/template status

Do not polish decoration before the item brief is explicit.

---

## 7. Editorial hierarchy

Every page, face, card, or spread defines:

- one primary focus
- one or two secondary focuses
- supporting micro-information
- intentional quiet space

Use size, placement, spacing, crop, and contrast before adding containers.

For magazine-like items:

- one dominant photograph or map
- two or three supporting modules
- captions, numbers, routes, or notes as micro-information

For tickets/cards:

- one clear identity/purpose
- one primary name or destination
- one date/location/seat hierarchy
- supporting codes and labels visually subordinate

No surface should contain six equally loud elements.

---

## 8. Typography system

Every item defines at least five levels when the content supports them:

1. display / primary identity
2. section or destination heading
3. article or module heading
4. body / factual information
5. caption / note / folio / code

Rules:

- Japanese carries essential meaning; English acts as atmosphere, category, or authentic format language
- do not compensate for weak hierarchy by making everything bold
- test dates, numerals, Latin text, Japanese punctuation, brackets, and symbols consistently
- run short, expected, and 130–150% long-copy tests
- inspect actual print size, not only zoomed Figma views
- apply Japanese line-breaking and punctuation checks based on JLREQ principles

---

## 9. Image and crop system

Before creating an image, define:

- semantic role
- final aspect ratio
- dominant subject
- desired eye or visual direction
- text-safe area
- acceptable crop range
- color and lighting relation to adjacent assets
- human-presence rule
- prohibited artifacts

Crop rules:

- protect faces, hands, landmarks, horizon lines, products, tickets, and meaningful objects
- keep important content away from fold, trim, and perforation zones
- beautiful source imagery that cannot survive the target crop is rejected
- final-photo replacement must trigger a new crop and contrast QA

---

## 10. AI and generated-asset boundaries

Generated assets may support:

- destination atmosphere
- backgrounds
- decorative still life
- maps and route inspiration
- abstract texture
- non-identifying travel moments
- temporary dummy photography

Final production should prioritize real photographs for:

- the couple
- family
- friends
- the dog
- identifiable personal memories

Generated recognizable people must never be presented as the real couple, family, or guests.

All generated images must avoid:

- readable baked-in text
- logos and brands
- watermarks
- malformed hands or objects
- impossible architecture
- copied proprietary layouts
- false identity

---

## 11. Components, styles, and variables

Create reusable systems only where repetition is real.

Appropriate component candidates:

- folio/page marker
- section ribbon
- destination marker
- profile label
- ticket field row
- route pin
- photo caption relation
- print guide annotation

Do not componentize every unique editorial composition into rigid cards.

Use shared styles/variables for:

- core colors
- text colors
- paper/background colors
- type hierarchy
- repeated stroke/effect values
- spacing and safe-area references where practical

A design system should improve consistency without forcing every item into the same geometry.

---

## 12. Anti-template and anti-Web-UI review

Warning signs:

- every paragraph inside a rounded white box
- repeated pills for unrelated information
- shadows around every object
- equal card sizes despite unequal content
- decorative English with no editorial meaning
- too many gradients
- identical cinematic treatment on all generated photos
- fake randomness through rotation, tape, and stickers
- excessive color variety with equal intensity
- a new version created only by recoloring the old layout

Correction order:

1. clarify hierarchy
2. remove unnecessary elements
3. improve photography and crop
4. improve typography and spacing
5. add only the minimum semantic decoration

---

## 13. Three-scale QA

Every major candidate is reviewed at:

### Thumbnail / whole item

- dominant focus
- silhouette
- visual balance
- color distribution
- magazine/print authenticity versus UI-card appearance

### Reading scale

- reading order
- heading hierarchy
- grouping
- photo-caption relationship
- fold and trim safety

### Detail / actual-size print scale

- Japanese line breaks
- small text
- image sharpness
- fine rules
- alignment
- punctuation
- contrast

A candidate cannot pass by looking good at only one scale.

---

## 14. Print-production gates

Keep these states separate:

1. `DESIGN_QA_PASS`
2. `REAL_CONTENT_EDITORIAL_QA_PASS`
3. `PRINT_TEMPLATE_APPLIED`
4. `PDF_PREFLIGHT_PASS`
5. `PHYSICAL_PROOF_PASS`
6. `PRINT_READY`

Before `PRINT_READY`:

- printer and product are verified
- exact template is applied
- bleed, trim, fold, perforation, page order, and safe areas are verified
- final image resolution is calculated from physical placed size
- fonts, links, overset text, color, and PDF export settings are checked
- an actual-size proof is reviewed
- names, dates, table numbers, captions, and critical details are checked by at least two people

---

## 15. Versioning and clean-room variants

Use iteration when the concept remains the same.

Use a clean-room version when the direction is structurally different.

A clean-room version may inherit:

- design knowledge
- asset workflow
- typography checks
- QA methods
- production rules

It may not automatically reuse:

- previous generated photographs
- image hashes
- hero composition
- card geometry
- crop decisions
- decorative density

Preserve the previous candidate as rollback/comparison evidence.

---

## 16. Learning loop

Every meaningful mistake or rejected change is converted into:

1. observation
2. root cause
3. reusable design or Figma principle
4. process change
5. actual file change
6. verification
7. promotion into this system only when broadly reusable

Do not turn every one-off preference into a permanent rule. Test and generalize carefully.

---

## 17. Item-specific application

### Rurubu V5

- current V5 remains governed by its asset ledger and Current Status
- project-wide knowledge applies immediately
- continue dominant-photo repair, card reduction, Japanese typography, and screenshot QA

### Rurubu V6 Hawaii

- separate Drive structure and clean-room assets
- two structurally different outer concepts before full production
- no V5 photograph or hero-composition reuse

### Passport booklet

- passport authenticity supports, but does not override, legibility and wedding information
- page order, fold, safe area, menu/seating density, and writable/editable text are mandatory

### Boarding-pass escort card

- clear guest name, table/seat destination, date, venue, and boarding-pass hierarchy
- avoid fake airline branding or scannable codes that imply real transport validity
- test real-size readability and cutting tolerance

### Mintia ticket label

- account for product dimensions, adhesive area, curvature, cut tolerance, and small-text limits
- visual authenticity must not reduce date/name readability

---

## 18. Mandatory start checklist

Before any wedding Figma task:

- read this file
- read `docs/wedding-asset-generation-memory.md`
- read the item-specific Current Status and asset ledger
- inspect live Figma and Drive
- identify the one highest-impact improvement
- preserve rollback
- make an incremental change
- screenshot-QA the result
- record only verified progress
