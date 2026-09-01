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

Current production authority:
`docs/rurubu-v30/README.md`
