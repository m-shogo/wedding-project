# Rurubu WEDDING V11 — Clean-Slate Spec-First Production

Status: `CANONICAL_CLEAN_SLATE`
Date: 2026-08-30

## Why V11 exists

V11 is a deliberate reset.

It does **not** inherit the visual composition, page-role map, Figma geometry, old reference nodes, old composition verbs, old AI-look baseline or old page recipes from V10.

The new design authority is the user-approved 2026-08-30 reference image plus the V11 written specifications derived from it.

## What may carry over

Only stable factual/production constraints may be reused when independently still true:
- names: Shogo / Shiori;
- wedding date: 2026-10-24;
- venue: ART GRACE PORTSIDE VILLA / Yokohama, when confirmed;
- A5 portrait finished size if still the selected print format;
- printer/bleed/safe-area/output constraints that remain factually applicable;
- real source photos/assets themselves, after role/provenance review.

## What must NOT carry over automatically

Do not inherit:
- V10 page-role mapping;
- V10 node positions or frame geometry;
- V10 title placement;
- V10 photo-slot count;
- V10 palette dominance per page;
- V10 page recipes;
- V10 reference nodes `2771:*` or prior reference-match scores;
- V10 AI-look baseline/linter thresholds as aesthetic authority;
- old Auto Layout structures;
- old equal-card placeholder geometry;
- any design decision merely because it already exists in Figma.

An existing V10 element may be reused only after it is re-evaluated against the V11 role and reference. Reuse is optional, never presumptive.

---

# New canonical chain

`USER-APPROVED REFERENCE`
→ `V11 BOOK ARCHITECTURE`
→ `V11 PAGE MANUAL`
→ `V11 DESIGN TOKENS`
→ `V11 COPY CAPACITY`
→ `V11 PHOTO SLOT CONTRACT`
→ `V11 PARTS INVENTORY`
→ `V11 LAYOUT BLUEPRINT`
→ `V11 GENERATION PROMPTS WHEN NEEDED`
→ `V11 FIGMA PLACEMENT PROMPT`
→ `NEW V11 FIGMA PRODUCTION PAGE`
→ `V11 REFERENCE-BASED QA`
→ `V11 PRINT QA`

The prompt is downstream of the design specification.

---

# Core production philosophy

> Think and decide in language. Assemble and keep editable in Figma.

Figma is primarily:
- an assembly surface;
- a photo replacement surface;
- a native-text editing surface;
- a layering/crop/spacing surface;
- a QA and print-prep surface.

Figma is not asked to invent a complete magazine page from `make it more Rurubu-like`.

---

# Whole-page image rule

A generated whole-page image may be used as:
- visual reference;
- previsual;
- composition target;
- reconstruction underlay;
- QA comparison image.

It must not become the sole production master when the page contains:
- replaceable photos;
- names/dates/times;
- profile facts;
- Q&A;
- venue facts;
- captions;
- guest-facing text likely to change.

Final production remains hybrid and editable.

---

# Canonical files

## Core
- `rurubu-v11-manifest.json`
- `RURUBU-V11-REFERENCE-BIBLE.md`
- `RURUBU-V11-BOOK-ARCHITECTURE.md`
- `RURUBU-V11-DESIGN-TOKENS.md`
- `RURUBU-V11-COPY-CAPACITY.md`
- `RURUBU-V11-CONTENT-TRUTH.md`
- `rurubu-v11-photo-slots.json`
- `rurubu-v11-layout-blueprints.json`

## Page manuals
- `page-specs/P01-COVER.md`
- `page-specs/P02-WEDDING-JOURNEY.md`
- `page-specs/P03-PROFILE.md`
- `page-specs/P04-MEMORIES.md`
- `page-specs/P05-VENUE-GUIDE.md`
- `page-specs/P06-1DAY.md`
- `page-specs/P07-QA.md`
- `page-specs/P08-MESSAGE-BACK.md`

## Assembly / assets / generation / QA
- `RURUBU-V11-PARTS-LIBRARY.md`
- `RURUBU-V11-ASSET-NEEDS-MATRIX.md`
- `RURUBU-V11-GENERATION-PROMPT-TEMPLATES.md`
- `RURUBU-V11-FIGMA-EXECUTION-PROMPT.md`
- `RURUBU-V11-QA-GATE.md`
- `RURUBU-V11-PRINT-SPEC.md`

If an authority conflicts with this clean-slate boundary, this README wins until explicitly superseded by a later dated V11 authority.