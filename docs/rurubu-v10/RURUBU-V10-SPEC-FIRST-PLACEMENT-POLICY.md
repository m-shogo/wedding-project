# Rurubu WEDDING V10 — Spec-First / Placement-Operator Policy

Status: `V10_CANONICAL_SUPPLEMENT / 2026-08-30`

Scope: Rurubu WEDDING V10 Figma production only.

Purpose: stop asking Figma/AI to invent a magazine page from a vague style request. The editorial design must be decided in language first. Figma is then used primarily as an editable assembly, placement, replacement and QA surface.

This document supplements, and does not replace:
- `RURUBU-V10-FIGMA-AI-DESIGN-SYSTEM.md`
- `RURUBU-V10-PAGE-RECIPES.md`
- `RURUBU-V10-FIGMA-AI-OPERATING-PROMPT.md`
- `RURUBU-V10-REFERENCE-FINGERPRINT-ANTI-AI-GATE.md`

---

## 1. Core production change

Previous weak pattern:

`short style request -> Figma/AI invents page structure -> generic cards/grid/whitespace -> decoration added to compensate`

Canonical V10 pattern from 2026-08-30:

`reference observation -> editorial language specification -> page composition contract -> part-role specification -> Figma placement -> screenshot QA -> one structural correction at a time`

The AI is not rewarded for novelty inside Figma. It is rewarded for faithfully executing a pre-decided editorial composition while preserving editability.

### One-sentence rule

> Think outside Figma; assemble inside Figma.

---

## 2. Role split

### A. Editorial/specification layer — decides before writing to Figma

Must decide:
- page job;
- emotional/editorial concept;
- first / second / third read;
- dominant image role;
- supporting image roles;
- density peak and calm zone;
- title silhouette;
- required editorial parts;
- which objects overlap;
- which objects rotate;
- which parts enter bleed/edge tension;
- native-text vs raster/composed-art boundary;
- image replacement behavior;
- z-order;
- anti-patterns;
- page-specific QA.

### B. Asset layer — supplies visual material

May supply:
- logo/title art;
- ornamental section-title art;
- stamps;
- badges;
- arrows;
- flowers/foliage;
- travel icons;
- camera/passport/ticket/suitcase motifs;
- map/route art;
- frame art;
- decorative handwritten phrases;
- generated non-authoritative visual texture.

### C. Figma layer — executes and keeps production editable

Figma should primarily:
- create/maintain page frames;
- place specified assets;
- keep body/changeable text native;
- keep photos inside independent replaceable masks;
- keep frames/decor separate from photos;
- position/scale/rotate/stack specified objects;
- maintain semantic layer names;
- perform actual-size, crop, bleed and visual QA.

Figma should NOT be asked to independently decide the entire page grammar from a sentence such as `make this more Rurubu-like`.

---

## 3. The prompt is downstream of the specification

A long prompt is not itself the source of quality.

The strongest prompt is a compiled execution instruction generated from four authorities:

1. `STYLE LANGUAGE` — what visual/editorial behavior defines the target;
2. `PAGE SPEC` — what this specific page is trying to do;
3. `PART CONTRACT` — what pieces exist and what job each one performs;
4. `EDITABILITY CONTRACT` — what must remain replaceable/native.

The execution prompt should contain almost no unresolved design questions.

### Weak prompt

`Make P06 more like Rurubu. Add more travel feeling, stickers and photos.`

### Strong prompt shape

`Keep P06 role as MEMORY SPOTS + GALLERY. Build one dominant travel-feature cluster, not equal cards. Place one 68–82 mm wide hero photo in the upper-left/center zone, with three smaller satellites of different aspect ratios. Keep destination captions native and bound to their photos. Add one numbered route/map device only if it links those destinations. Use 1–3 purposeful travel accents; do not fill gaps with stickers. Rotate at most two support photo frames by roughly 2–4 degrees. Keep all replaceable photos in masks with frame art separate. Preserve a calm light-field caption zone. Screenshot at thumbnail and reading scale; if it still reads as four equal cards, rebuild geometry before decoration.`

The second prompt is better because hierarchy, geometry, semantics, editability and failure conditions have already been decided.

---

## 4. Page specification schema

Every P01–P08 page must have these fields before structural Figma work:

| Field | Meaning |
|---|---|
| `PAGE_JOB` | What a guest should understand/feel |
| `EDITORIAL_CONCEPT` | The magazine-feature metaphor |
| `FIRST_READ` | Dominant first visual |
| `SECOND_READ` | Next intentional visual |
| `THIRD_READ` | Next useful information |
| `DENSITY` | quiet / medium / high / very-high |
| `DENSITY_PEAK` | where the page is deliberately busy |
| `CALM_ZONE` | stable reading area |
| `HERO_PHOTO` | hero image role and approximate scale |
| `SUPPORT_PHOTOS` | count + shape/scale variation |
| `EDITORIAL_PARTS` | title, badge, callout, stamp, map, arrows, etc. |
| `OVERLAP_PLAN` | which elements intentionally cross |
| `ROTATION_PLAN` | which objects may rotate and how much |
| `EDGE_TENSION` | elements allowed to approach trim/bleed |
| `NATIVE_TEXT` | authoritative/changeable text that stays editable |
| `RASTER_ART` | decorative/composed visuals that may be image assets |
| `REPLACEABLE` | photo/image masks that must survive source swaps |
| `Z_ORDER` | explicit layer order |
| `FORBIDDEN` | page-specific failure patterns |
| `QA` | observable acceptance checks |

If any critical field is unresolved, the AI should resolve it in the written spec before touching Figma rather than improvising during placement.

---

## 5. Editorial density model

The target reference is visually dense, but the density is clustered rather than uniform.

### Desired behavior

A strong page usually contains:
- 1 unmistakable hero/title entry;
- 1 large visual story anchor;
- 2–5 supporting images depending on page role;
- 2–4 information clusters;
- 2–6 purposeful editorial accents;
- at least one calm readable field;
- scale changes large enough to be visible at thumbnail size;
- selective edge pressure and overlap.

### Not desired

Do not mechanically maximize object count.

Reject:
- equal cards filling a grid;
- every gap filled with a sticker;
- identical 8 px/12 px rounded rectangles;
- every photo using the same border and angle;
- large luxury-style whitespace used to avoid making editorial decisions;
- five equally loud colored blocks;
- one reusable component repeated until the page looks like a dashboard.

### Density rhythm across the book

Recommended:
- P01: very high impact;
- P02: medium-high;
- P03: medium-high/playful;
- P04: medium, emotional/readable;
- P05: high, chronological;
- P06: high, photo-led travel feature;
- P07: high, itinerary/utility;
- P08: medium/quiet closing.

Do not force all pages to the same object count.

---

## 6. Controlled asymmetry

The target is not random collage. It is controlled asymmetry.

Use:
- one large item against several small items;
- one side carrying a density cluster while the other holds a calm reading area;
- overlapping frames with clearly different scale;
- occasional tilted support images;
- edge-touching decorative elements;
- title art that can partially overlap a photo or decorative border;
- irregular but intentional editorial clusters.

Avoid:
- perfect 50/50 symmetry unless the page content truly requires comparison;
- equal-width column cards;
- evenly spaced repeated boxes as the default grammar;
- arbitrary rotation on every object.

Rotation is seasoning, not structure. Typical support-frame rotation should remain subtle, roughly 1.5–4 degrees unless a specific asset calls for more.

---

## 7. Raster / native / replaceable boundary

### Raster/composed art is encouraged for

- expressive `RURUBU WEDDING` hero logo treatment;
- highly decorative section-title plates;
- stamps and travel badges;
- decorative handwritten phrases;
- flowers, foliage, travel motifs;
- non-authoritative icon clusters;
- frame artwork;
- ornamental map background;
- decorative ticket/passport/camera/suitcase elements.

### Native editable Figma text is required for

- names;
- dates;
- venue names;
- profile facts;
- story/body paragraphs;
- timeline dates and descriptions;
- destination names and captions;
- itinerary times and labels;
- Q&A questions/answers;
- guest messages;
- any copy likely to change;
- any factual/authoritative information.

### Replaceable masked images are required for

- all couple photos;
- travel/memory photography likely to be replaced;
- venue photographs;
- food/table photographs if final sources are still pending;
- any current proxy source.

### Absolute prohibition

Do not use one full-page raster image as the only production master when the page contains replaceable photos or changeable authoritative text.

A whole-page generated image may be used as:
- reference;
- previsual;
- composition target;
- underlay during reconstruction;
- visual-diff target.

It must not silently become the sole editable production surface.

---

## 8. Figma construction contract

Every replaceable image should follow this pattern:

`PHOTO SOURCE / semantic-name`
inside or clipped by
`PHOTO MASK / ROLE / REPLACEABLE`
with
`FRAME / semantic-name`
above it when a frame exists.

Text remains outside the raster photo source.

Recommended top-level group order:

1. `BACKGROUND`
2. `MAP / ROUTE / LARGE DECOR`
3. `PHOTO MASKS + PHOTO SOURCES`
4. `FRAMES`
5. `NATIVE TITLES / BODY / CAPTIONS`
6. `BADGES / STAMPS / ARROWS / MICRO DECOR`
7. `QA / REFERENCE` — hidden or on guide page, never export production

A future editor must be able to replace a photo without reconstructing the decorative frame or factual text.

---

## 9. Parts library philosophy

Do not build a design system that forces every page into the same template.

Build a vocabulary, not a component grid.

Useful part families:
- hero logo/title;
- section-title ribbon/brush/plate;
- short editorial kicker;
- burst badge;
- round seal;
- date stamp;
- travel stamp;
- arrow/hand-drawn marker;
- polaroid frame;
- white-border tilted photo frame;
- circular/organic photo frame;
- caption tape;
- `CHECK!` / `BEST` / `POINT` label;
- `DATA` box;
- route line;
- map pin + numbered marker;
- camera/passport/ticket/suitcase/plane motifs;
- floral corner/edge cluster;
- speech bubble;
- handwritten micro-comment.

A page may reuse the vocabulary while changing scale, combination, position and rhythm.

### Reuse test

A part is reusable if it retains meaning without forcing its parent page into the same composition as another page.

---

## 10. Reference-led QA loop

For each meaningful page pass:

1. read the written page spec;
2. place only enough objects to establish hierarchy;
3. screenshot at thumbnail scale;
4. identify first/second/third read;
5. compare visual weight to the approved reference behavior;
6. if geometry is wrong, fix geometry before adding decoration;
7. add support parts;
8. screenshot at reading scale;
9. verify body/caption readability;
10. verify editability/masks/layer semantics;
11. run existing AI-look linter and reference visual diff;
12. make one largest-distance correction;
13. only then micro-polish.

### Mandatory diagnosis language

Bad:
- `not Rurubu enough`;
- `needs more decoration`;
- `make it more fun`.

Good:
- `the title and all four photos have nearly equal visual weight; increase title dominance and create one 2x larger photo anchor`;
- `all support photos share one aspect ratio and one border; change two roles to circular/portrait/tilted frames`;
- `the lower third is empty while the center is overloaded; move utility cluster to lower-right and release center space`;
- `the page reads as six identical answer cards; vary question treatment while keeping answer fields native and readable`.

---

## 11. Execution-prompt compiler

Before asking Figma to change a page, compile a short page-specific instruction using this exact order:

1. `DO NOT CHANGE` — page/frame identity, authoritative content, assets that are already approved;
2. `PAGE JOB` — one sentence;
3. `READING ORDER` — first / second / third;
4. `GEOMETRY` — hero zone, support zones, calm zone;
5. `PART PLACEMENT` — exact semantic roles;
6. `OVERLAP / ROTATION / EDGE` — controlled gestures;
7. `EDITABILITY` — native text, masks, frame separation;
8. `FORBIDDEN` — 3–6 relevant failure patterns;
9. `QA` — screenshot + checks;
10. `REPORT` — observable changes only.

Do not include generic motivational prose in the execution prompt. Every line should either constrain, place, preserve or verify something.

---

## 12. Safety strategy for V10

V10 remains the production-safe master.

Major style experiments should be:
- additive;
- reversible;
- performed page-by-page or on a controlled branch/frame copy;
- compared visually before overwriting a stronger prior state.

Do not destroy the current V10 composition simply to prove the new process.

The policy change is primarily a change in *how decisions are made*: specification first, placement second.

---

## 13. Definition of success

This policy is working when:

- asking different AI agents to execute the same page spec produces materially similar hierarchy and part placement;
- a page no longer depends on one agent's vague taste interpretation;
- the publication looks like a dense Japanese travel/wedding editorial object rather than a UI kit;
- photos can still be replaced late;
- names/dates/body copy remain editable;
- style can be improved without regenerating a whole page;
- failures can be diagnosed in concrete editorial language;
- Figma becomes easier because it executes decisions instead of inventing them.
