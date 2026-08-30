# Rurubu WEDDING V10 — Page Manual Authoring Method

Status: `CANONICAL_SPEC_FIRST_METHOD`

Purpose: define how every Rurubu V10 page is designed before Figma execution.

Core principle:

> Figma is not asked to invent the page. The page is first authored as a detailed editorial manual. Figma then assembles, places, masks, edits and QA-checks that authored plan.

---

# 1. Required workflow

For every page, follow this sequence exactly:

1. confirm live page role in Figma;
2. read the canonical visual reference plate;
3. write a one-sentence page job;
4. define FIRST / SECOND / THIRD read;
5. divide the page into editorial zones;
6. decide photo roles and relative scale;
7. decide required reusable parts;
8. decide what stays native/editable;
9. decide what may be raster/generated;
10. define overlap and z-order;
11. define density peak and calm zone;
12. define edge/bleed behavior;
13. define anti-patterns for that page;
14. define completion checks;
15. only then issue Figma placement instructions.

Never begin from a generic prompt such as “make this page more Rurubu-like.”

---

# 2. Mandatory page-manual schema

Every page specification must contain all of these sections.

## A. PAGE JOB
What must a guest understand or feel within 3 seconds?

## B. READING PATH
Define:
- FIRST READ
- SECOND READ
- THIRD READ
- USEFUL INFO
- MICRO DISCOVERY

## C. ZONE MAP
Describe approximate page regions in both percentage and practical language.

Example:
- top 0–16%: title band;
- left-center 12–58%: hero photo cluster;
- right-center 20–55%: main text/data cluster;
- lower 58–92%: support stories/photos;
- corner/bleed zones: decorative foliage/travel accents.

This is guidance, not a rigid grid.

## D. PHOTO PLAN
For every photo role specify:
- semantic role;
- approximate width/height or visual area;
- aspect tendency;
- crop behavior;
- rotation range;
- frame treatment;
- overlap partner;
- replaceable mask requirement;
- whether proxy imagery is acceptable during production.

## E. TITLE / TYPOGRAPHY PLAN
Specify:
- title silhouette;
- native vs composed asset;
- subtitle role;
- body-copy field;
- caption behavior;
- important copy that must remain editable.

## F. PARTS INVENTORY
List all reusable parts needed, such as:
- title ribbon;
- date stamp;
- label;
- frame;
- callout;
- route;
- flower corner;
- camera;
- airplane;
- passport/ticket;
- arrows/hearts;
- map marker.

Mark each as `EXISTING`, `NEEDS_SEARCH`, or `NEEDS_GENERATION` during execution.

## G. COLOR JOBS
Define:
- dominant color;
- support color;
- surprise accent;
- body field;
- approved text/background pairing.

Do not simply list all palette colors.

## H. OVERLAP / Z-ORDER
Explicitly describe which objects cross boundaries.

Typical stack:
background
→ background/edge decoration
→ replaceable photo source
→ photo mask
→ frame artwork
→ title/ribbon
→ native text/captions
→ foreground accents.

## I. DENSITY MAP
State:
- highest-density region;
- medium-density region;
- calm reading region;
- intentional empty area, if any.

## J. EDGE TENSION
State which decorative objects may enter bleed or trim-edge zones.
Critical copy must remain safe.

## K. EDITABILITY CONTRACT
Classify every major object:

`NATIVE_EDITABLE`
- names;
- dates;
- profile facts;
- Q&A;
- schedule times;
- captions;
- venue facts;
- guest-facing body copy.

`REPLACEABLE_IMAGE`
- couple photos;
- travel photos;
- venue photos;
- food photos.

`COMPOSED_DISPLAY_ASSET`
- hero logo;
- expressive title treatment;
- stamp;
- decorative illustration;
- complex travel/tropical embellishment.

Never flatten an entire page.

## L. PAGE-SPECIFIC ANTI-PATTERNS
List what would make this page look like AI/UI/template design.

## M. FIGMA EXECUTION INSTRUCTIONS
Only after A–L are complete, translate them into direct placement instructions.

The Figma instruction should say where and how to place parts, not ask Figma to decide the composition.

## N. QA GATE
Check:
- 3-second scan;
- title silhouette;
- photo hierarchy;
- asymmetry;
- scale variation;
- overlap;
- reference-level density;
- body readability;
- editability;
- print safe area;
- no dummy/reference promoted as final.

---

# 3. Figma's role

Figma is responsible for:
- frame creation;
- placement;
- masks;
- crop adjustment;
- layer ordering;
- native text;
- image replacement surfaces;
- reusable components where repetition is genuinely useful;
- final spacing;
- actual-size review;
- print-prep structure.

Figma is NOT responsible for inventing:
- the page concept;
- the reading hierarchy;
- the page's visual rhythm;
- which decorative vocabulary is appropriate;
- whether a page should be a grid, route, cluster or collage.

Those choices must already exist in the page manual.

---

# 4. When to use image generation

Image generation is valuable for:
- expressive title art;
- sticker-like decorations;
- stamps;
- tropical illustration clusters;
- travel objects;
- complex decorative ribbons;
- background texture;
- compositional preview/reference images.

It should not become the authoritative source for:
- changing guest-facing text;
- dates/times;
- names;
- profile facts;
- long Japanese copy;
- final replaceable couple/travel photography.

A whole-page generated image may be used as a visual target or underlay, but not as the sole editable production master.

---

# 5. Iteration model

Each page is improved in four passes.

## PASS 1 — SKELETON
Title, hero image, major information regions.

## PASS 2 — EDITORIAL DENSITY
Support photos, labels, part clusters, secondary hierarchy.

## PASS 3 — CONTROLLED DISRUPTION
Add/selectively adjust overlap, tilt, cutout, edge crops, handwritten micro elements and scale contrast so the page stops feeling like UI.

## PASS 4 — PRINT / READABILITY
A5 actual size, line breaks, safe area, crop, resolution/proxy status, mask replacement, final contrast.

Do not jump to PASS 3 decoration while PASS 1 hierarchy is weak.

---

# 6. Adjacent-page rule

The book must have shared identity without repeated composition.

Adjacent pages should normally differ in at least four of these:
- hero position;
- title alignment;
- dominant color;
- density peak;
- photo count;
- photo-frame family;
- composition verb;
- overlap gesture;
- calm-zone location.

The goal is editorial rhythm, not a component showcase.

---

# 7. Canonical design chain

`CANONICAL REFERENCE PLATE`
→ `PAGE MANUAL`
→ `PARTS INVENTORY`
→ `FIGMA PLACEMENT INSTRUCTIONS`
→ `LIVE FIGMA`
→ `SCREENSHOT QA`
→ `PAGE MANUAL / PARTS IMPROVEMENT IF NEEDED`

The prompt is therefore an execution artifact, not the primary source of design intelligence.
