# Rurubu WEDDING V30 production assets

Status: `CURRENT_V30_PRODUCTION_ASSET_NAMESPACE`

New production assets for the current booklet belong under this directory.

Do not copy old generated V20 decorations into V30 merely to preserve prior work.

V20 assets are historical/reference only unless `docs/rurubu-v30/README.md` explicitly permits a verified source/provenance reuse.

## Visual creation tool boundary — HARD RULE

Previous Canva-based page/part construction reduced the visual quality and pushed the work toward generic wedding-template / card-layout aesthetics. V30 must not return to that production path.

### Canva is NOT a V30 production design tool

Do **not** use Canva, Canva templates, Canva page layouts, Canva-generated decoration packs, or Canva AI composition as the visual source for V30 production.

Do not:
- design/rebuild P01–P08 in Canva;
- create magazine layouts in Canva and import them into Figma;
- use Canva template geometry as a starting point;
- use Canva sticker/card/ribbon/gradient packs to establish the publication look;
- use Canva as an intermediate flattening/export step for production graphics;
- recreate an existing V30 page with Canva merely because it is faster.

A Canva-looking result is a reject condition even if Canva itself was not literally used: generic wedding template, evenly spaced cards, repeated rounded boxes, polished-but-flat symmetry, generic gradients and sticker-pack decoration must be redesigned.

### Generated visual art comes from image-generation models

For non-photographic editorial visuals that need authored personality, use an **image-generation model** such as the available ImageGen / Imagen-class workflow, following `docs/rurubu-v30/README.md`.

Generated visual candidates include:
- title/masthead art;
- paper/backing objects;
- photo frames;
- tickets;
- stamps;
- ribbons;
- tape;
- caption/Q&A vessels;
- editorial edge objects;
- page-aware ornaments;
- restrained texture/atmosphere when genuinely needed.

Generated visuals must still follow the V30 pipeline:

`PAGE INTENT`
→ `PAGE-SPECIFIC IMAGE-GENERATION BRIEF`
→ `SAFE SOLID KEY BACKGROUND`
→ `PYTHON ALPHA CUTOUT`
→ `ALPHA QA`
→ `02_PRODUCTION_RGBA`
→ `FIGMA LAYERED PLACEMENT`

Do not substitute generic Figma/Canva primitives when a page-specific generated visual unit is what creates the magazine quality.

### Figma remains compositor only

Figma is for:
- placing/cropping real photographs;
- masks and replaceability;
- placing QA-passed generated assets;
- z-order/scale/rotation/overlap;
- native authoritative text;
- page/spread/A5 QA;
- editable final assembly.

Figma is not the primary visual-asset generator. Canva is not part of the V30 production chain.

## Replaceable photo-slot contract — HARD RULE

Real photos may be dummy/proxy images during production because they will be replaced later, but **the Figma structure must already be final-quality and easy to swap**.

For every photo slot:
- create one dedicated replaceable photo container/mask;
- keep the image source as a separate child/layer from frame/backing/decoration;
- use a non-destructive mask or clipping frame;
- set/maintain clipping so the photo itself **never spills outside the intended frame**;
- in a clipping-frame implementation, `clipsContent = true` is mandatory;
- after any crop, scale, rotation or photo replacement, visually verify there are no exposed pixels outside the mask bounds;
- decorative frame/backing/tape may extend outside the photo slot, but those remain separate layers and do not change the photo's clipping boundary;
- replacing the photo should require only replacing/swapping the image content, not rebuilding the frame or editorial composition;
- do not bake a real/dummy photo together with its decorative frame into one flattened image.

Preferred conceptual structure:

`PHOTO SLOT / REPLACEABLE / CLIPPED`
- `IMAGE / SWAP THIS`
- separate frame/backing/foreground decoration outside the slot as needed

P05 is fixed at:
- `SHOGO FRIENDS`: 4 independent replaceable clipped photo slots
- `SHIORI FRIENDS`: 4 independent replaceable clipped photo slots
- total: **8 independent masks/slots**

`1 PHOTO SLOT = 1 INDEPENDENT REPLACEABLE CLIPPED MASK.`

## Generated asset granularity — ONE PART = ONE IMAGE — ABSOLUTE RULE

Every production editorial part must be independently generated, processed, stored and placed.

**ONE PART = ONE IMAGE FILE.**

Never place several unrelated/separately positionable production parts into one generated image merely to save generation calls, cutout work, uploads or Figma placements.

Forbidden examples:
- title + stamp + ticket + tape all packed into one PNG when they need independent placement;
- four photo frames exported on one canvas;
- several stickers/labels arranged as a sprite/contact sheet and then used as one Figma image;
- P05 SHOGO label + SHIORI label + caption vessels on one production bitmap;
- P01/P04/P05 parts from different jobs packed into a single generated sheet.

Required behavior:
- title = one image;
- stamp = one image;
- ticket = one image;
- tape = one image;
- frame = one image;
- caption vessel = one image;
- ornamental cluster = one image when the cluster is intentionally one inseparable visual object.

Exception is narrow:
A group may be one image only when it is intentionally designed as **one inseparable semantic editorial unit** that will always move/scale/replace together. Convenience alone is not an exception.

Proof/contact sheets may show many candidates together for review, but those proof sheets are `REFERENCE_PROOF` only and **must never be used as the production Figma asset**.

Each production image gets its own:
- semantic filename;
- SOURCE_KEYED source when applicable;
- PRODUCTION_RGBA output;
- alpha QA;
- page/job ownership;
- independent Figma placement.

`NO SPRITES / NO MULTI-PART PRODUCTION SHEETS / NO PACKED-ASSET PNGS.`

## Production accident-prevention gates — HARD RULES

These gates exist because recent V30 work exposed concrete failure modes: stale `VOL.20`, checkerboard-baked alpha, photo-well-only pages, template repetition, ambiguous replacement structure, and packed/generated asset risk.

### Gate 1 — real photo replacement test, not structure-by-claim

A photo slot is not accepted merely because its layer name says `REPLACEABLE`.

For every photo slot, test at least one actual replacement during production:
- replace the dummy/proxy image with a different image source;
- test a materially different crop/orientation when practical, especially portrait vs landscape behavior;
- verify the image remains clipped inside the intended frame;
- verify the decorative frame/backing/tape does not need rebuilding;
- verify crop/focal-point adjustment is enough to recover the composition;
- verify no unexpected gap/exposed background appears inside the slot.

For P05, all 8 friend-photo slots must independently pass replacement behavior before final design acceptance.

### Gate 2 — placeholder / stale-marker zero gate

Before a guest-facing export, scan the V30 production page for production-only or stale markers.

Examples that must not remain visibly guest-facing:
- `TBD`
- `TODO`
- `DUMMY`
- `PLACEHOLDER`
- `REAL PHOTO`
- `PHOTO SWAP`
- `SOURCE_KEYED`
- `V20`
- `VOL.20`
- `V21`
- `V31`
- obsolete page-role strings

A known production label may exist only in a hidden/non-export QA layer. Visible guest-facing hit = FAIL.

### Gate 3 — no hidden graveyard inside V30 production page

`V30_FINAL_PRODUCTION` must contain the current production state, not a hidden archive.

Do not keep rejected/obsolete production assets merely as `visible=false` siblings inside the live page because an agent may rediscover and reuse them.

Rejected or superseded candidates belong in:
- Git history when appropriate;
- Drive `99_REJECTED_DO_NOT_USE`;
- a clearly non-production historical/reference surface outside the current V30 production page.

Keep current production Figma intentionally clean.

### Gate 4 — no destructive rescue scaling

Do not rescue a badly sized generated part by stretching it non-uniformly until it fits.

If a title, ticket, frame, stamp, paper object or other generated unit has the wrong aspect ratio/physical behavior:
- regenerate or rebuild it for the intended physical size/aspect;
- preserve natural proportions unless deliberate distortion is part of the design;
- do not horizontally/vertically squash tactile editorial art as a convenience shortcut.

### Gate 5 — repeated PNG reuse is also an anti-AI/template risk

`ONE PART = ONE IMAGE` does not mean one approved PNG should be stamped everywhere.

Avoid repeating the exact same production PNG across adjacent pages or multiple unrelated jobs when the repetition becomes visually obvious.

Shared publication DNA is encouraged; literal copy/paste sameness is not.

For related parts:
- create about 2–4 meaningful variants when repetition would otherwise feel templated;
- vary geometry/job while preserving family resemblance;
- do not multiply near-identical variants merely to increase count.

P03 must not become repeated identical ticket/card units. P05 should not repeat one frame recipe eight times if that makes it look like a contact sheet/UI grid.

### Gate 6 — production-asset admission gate

A generated isolated part may enter the live Figma production composition only after the required pipeline state is satisfied:

`SOURCE_KEYED`
→ `PYTHON CUTOUT`
→ `ALPHA QA PASS`
→ `PRODUCTION_RGBA`
→ `DRIVE/GIT TRACEABILITY`
→ `FIGMA ADOPTED`

Immediate reject conditions include:
- checkerboard baked into pixels;
- key-color halo;
- opaque unwanted rectangle/background;
- accidental holes;
- fake or garbled text when text should be native;
- several independent parts packed into one bitmap;
- wrong page role;
- unknown provenance where provenance matters.

The Figma production layer name and Drive/Git production filename should be semantically traceable to the same page/job.

### Gate 7 — visual checkpoint after meaningful changes

After a meaningful page or spread change, create a comparison checkpoint rather than relying on memory.

Save appropriate QA outputs to Drive `90_QA_EXPORT`, especially after substantial changes to P01/P04/P05 or any page whose visual direction materially changed.

Checkpoint should include as relevant:
- 8-page contact sheet;
- affected page render;
- affected spread render;
- A5-size QA render.

Use a traceable name with date/time or Git SHA when practical.

Purpose: enable before/after comparison and prevent accidental regression where an older candidate was visually stronger.

### Gate 8 — face / focal-content safe zone

Bleed and edge crops may be energetic, but critical human content must remain protected.

Do not casually place near trim/fold or behind decoration:
- eyes;
- mouths;
- important facial expressions;
- meaningful hand/gesture details;
- friend faces on P05;
- names/dates/Q&A answers;
- P07 thank-you copy;
- P08 barcode digits.

For P05 specifically, each of the 8 final photos must remain recognizable at A5 actual-size review; merely fitting inside a mask is not enough.

### Gate 9 — content role locked / visual execution unlocked

P01–P08 current semantic roles are locked unless the user explicitly changes them.

However, current visual geometry is **not** protected by sunk cost.

Rule:
`CONTENT ROLE LOCKED / VISUAL EXECUTION UNLOCKED.`

If the current layout is weak, rebuild the visual execution from zero while preserving the correct current page role and factual constraints.

Do not preserve weak geometry merely because it already exists in Figma.

### Gate 10 — do not patch a weak generated-art gap with generic Figma shapes

If a page-specific generated title/frame/vessel/editorial object is weak or missing, do not silently patch the gap with generic rectangles, rounded cards, pills, SaaS shadows or template primitives merely to make the page look complete.

Preferred response:
- improve/regenerate the page-specific visual unit;
- keep a clean replaceable placeholder if generation is temporarily blocked;
- continue other safe production work;
- record the blocker if it materially prevents completion.

Figma may use simple native geometry for true technical/layout needs, but it must not become the emergency source of magazine personality.

## Quality philosophy

Do not add increasingly rigid aesthetic quotas merely to make the system feel controlled.

Keep strict:
- page roles;
- truth/factual boundaries;
- asset provenance;
- one-part-one-image;
- photo replaceability/clipping;
- production pipeline;
- QA/rejection gates.

Keep visually flexible:
- exact geometry;
- local asymmetry;
- title collision;
- page-specific part choice;
- photo hierarchy;
- editorial surprise;
- visual rebuilding when a stronger candidate emerges.

The target is:

`STRICT PROCESS + LOCKED CONTENT ROLE + FREE HIGH-QUALITY VISUAL EXECUTION.`

## Git page ownership

Preferred structure as assets are adopted:
- `p01/`
- `p02/`
- `p03/`
- `p04/`
- `p05/`
- `p06/`
- `p07/`
- `p08/`

## Canonical Google Drive production root

Use only this V30 Drive root for new Rurubu V30 production material:

- `V30_FINAL_PRODUCTION`
- folder ID: `1_WTIl18wz8oB8IhPaOKPJv3A4H00KLr8`

It is inside the existing `RURUBU` root.

Current V30 subfolders:

- `00_REFERENCE_PROOF`
  - ID: `1hL7swXxXOAVXRmJ88yiKEMTyhfeRv0YM`
  - contact sheets / page proofs / approved visual references only

- `01_SOURCE_KEYED`
  - ID: `1qMzUwsLe3QRzKDmDImj_przF42nl4sTN`
  - original generated assets with removable solid key background
  - never use as Figma production placement when an RGBA version is required

- `02_PRODUCTION_RGBA`
  - ID: `1A5sxBbehwF68mUnaHkjwVYWzbI-oSH_G`
  - Python-cutout, alpha-QA-passed transparent production PNGs
  - canonical generated-asset source for Figma placement

- `03_REAL_PHOTO_SOURCE`
  - ID: `1spYUE-TAgvOCZSmF_sOSUZcE-5Op3lJ3`
  - verified real-photo sources / approved proxies and final replacements
  - never mix generated autobiographical substitutes here

- `90_QA_EXPORT`
  - ID: `1Jfml45i7VyjwOloWaqpurGuxE13TeFXs`
  - contact sheets, spread proofs, A5 QA renders, print/export QA artifacts

- `99_REJECTED_DO_NOT_USE`
  - ID: `1DKoaR3EONXxufU_8-IhL_1KwEZHvedyb`
  - rejected/checkerboard-baked/halo/fake-text/wrong-role assets
  - nothing in this folder has production authority

## Drive guardrails

- Do not upload new V30 production assets into the old `RURUBU_V20_*` folders.
- Do not treat files in old RURUBU folders as current merely because they exist.
- `01_SOURCE_KEYED` → Python cutout → alpha QA → `02_PRODUCTION_RGBA` → Figma is the default generated-asset path.
- A rejected asset must never remain next to approved production assets without explicit rejected classification.
- Use semantic V30 page/job names; never anonymous `final2.png`, `new.png`, etc.
- Store one production part per file; never upload packed production sheets to `02_PRODUCTION_RGBA`.

Current production authority:
`docs/rurubu-v30/README.md`
