# V20 Parts System

Status: `CANONICAL_PARTS_ARCHITECTURE / CURRENT_PAGE_ROLES_2026-09-01`

Highest page-role authority:
- `V20-CURRENT-PAGE-ARCHITECTURE.md`
- `V20-PAGE-BY-PAGE-DESIGN-SPEC.md`

Purpose: create only the editorial parts the current pages actually need, without building a generic sticker/component library or reviving obsolete P05/P07 roles.

## Core rule

A part exists only when it has an editorial job.

It must help at least one:
- hierarchy
- grouping
- reading order
- photo framing/crop
- tactile print behavior
- page-specific story/memory meaning
- factual readability

If none apply, do not create it.

## Part classes

### STRUCTURAL
Mostly editable/native when simple:
- photo mask/frame
- section label
- mini fact marker
- simple rule
- page number/meta
- simple route only where current page needs it

### DISPLAY
Stronger personality:
- masthead/title backplate
- feature burst
- stamp shell
- ticket/tag
- tape/paper
- hand-drawn arrow/heart

### ILLUSTRATIVE / ATMOSPHERE
Page-specific generated/custom art:
- foliage/flower cluster
- airplane/camera/suitcase cue
- paper texture
- broad color/paper field

### CONTENT-SPECIFIC
Create only after current page manual requires it.

Examples:
- P04 travel-memory route or stamp family
- P05 SHOGO/SHIORI friend labels and photo backings
- P06 playful note/Q&A support
- P07 closing-message support
- P08 issue/barcode meta support

## Current minimal shared kit

Do not overbuild.

Useful shared DNA may include:
- original V20 masthead family
- 2–3 photo-print/backing families
- 2 label families
- one date/location meta family
- one small stamp family
- one ticket/tag family
- a few edge-decoration clusters
- one small travel-object cue family
- one handwritten arrow/heart family
- folio/issue metadata treatment

Everything else must be justified by a current page proof.

## Variation without template repetition

Related parts may have 2–4 meaningful variants.

Do not:
- create 12 near-identical variants
- reuse same frame at same size/angle on adjacent pages
- repeat same corner cluster in same location
- use one stamp as default filler

## Metadata contract

Every production part should eventually record:
- semantic name / partId
- class
- source
- source locator / Drive ID where applicable
- page/job
- editable fields
- intended physical size
- transparency requirement
- raster pixel dimensions when applicable
- provenance/license state
- `REFERENCE_ONLY` / `SUPERSEDED` classification when applicable

## Naming examples

Current examples:
- `V20_P01_MASTHEAD_UNIT_A`
- `V20_P02_QA_SHELL_TIDY_A`
- `V20_P03_EPISODE_EDGE_A`
- `V20_P04_TRAVEL_MEMORY_LABEL_A`
- `V20_P05_SHOGO_FRIENDS_LABEL_A`
- `V20_P05_SHIORI_FRIENDS_LABEL_A`
- `V20_P05_FRIEND_PHOTO_BACKING_A`
- `V20_P06_QA_SHELL_PLAYFUL_A`
- `V20_P07_CLOSING_MESSAGE_SUPPORT_A`
- `V20_P08_ISSUE_META_A`

Do not use old names such as P05 HAWAII HERO or P07 itinerary stop as current semantic roles.

## Native vs generated

Prefer native/editable when:
- geometry is simple
- exact text matters
- future editing is likely

Use generation/custom raster when:
- page-specific illustrated complexity materially improves quality
- tactile/organic visual behavior would look weak from primitives

Authoritative text remains native.

## Generation brief contract

Every generated part brief specifies:
- exact page/job
- intended physical size/aspect
- transparent vs opaque
- crop/overlap expectation
- no fake text
- no fake autobiographical people/memories
- visual family
- forbidden obsolete roles/assets
- z-order expectation

Never prompt only `make a Rurubu-style sticker`.

## Part-quality gate

Before promotion:
- clear current editorial job
- no duplicate function
- no incorrect/fake text
- clean alpha/mask edges
- adequate print resolution
- does not overpower page hierarchy
- intentional at A5 size
- provenance recorded
- removable without destroying information architecture

## Parts planned by current page

### P01
- masthead
- 1–2 cover-hook supports
- date/location support
- restrained edge/travel cluster
- optional support-photo frame

### P02
- profile title
- differentiated profile/photo backings
- fact labels
- tidy Q1/Q2 shell
- small annotations

### P03
- story title
- episode vessels
- emotional Q3/Q4 shell
- optional restrained progression thread

### P04
- travel title
- varied memory/destination labels
- 5–6-photo support ecology as source pool permits
- optional route BACK/FRONT
- ticket/stamp/edge accents

### P05 — FRIENDS ONLY
- `友達との思い出` title
- `SHOGO FRIENDS` label
- `SHIORI FRIENDS` label
- varied medium/small photo backings
- short caption vessels
- restrained friend-memory accents

Hard P05 restrictions:
- no family/FAMILY part
- no giant hero frame
- no HAWAII title system
- no proposal article vessel
- no arrival marker
- no mandatory center-spread route

### P06
- playful title
- best-shots/note/tape support
- Q5/Q6 playful shell
- small pet/food/fun cues only when grounded

### P07
- restrained closing phrase/message support
- at most one small final motif

Do not create guide/map/destination/timetable systems.

### P08
- quiet issue/meta support
- barcode support with native digits exactly `2026102400000`
- optional tiny edge mark

## Obsolete parts quarantine

Never treat these jobs as current merely because historical files exist:
- P05 Hawaii/proposal/arrival parts
- P05 family parts
- P05 giant hero
- old P04–P05 mandatory cross-fold route
- P07 itinerary stop marker
- P07 destination vessels / giant `11`
- P07 LOOK AROUND / EDITOR'S PICK
- old P08 closing stamp/message system

## Anti-bloat rule

Build from page proofs:
1. approve page silhouette
2. identify missing editorial jobs
3. create only those parts
4. place and A5-QA them
5. retire unused experiments

`PAGE NEED > LIBRARY COMPLETENESS.`