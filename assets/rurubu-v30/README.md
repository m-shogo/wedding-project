# Rurubu WEDDING V30 production assets

Status: `CURRENT_V30_PRODUCTION_ASSET_NAMESPACE / 2026-09-02`

New current production assets belong under this directory.

Do not copy V20/older generated decoration into V30 merely to preserve prior work.

Current execution authority is read in the order defined by `docs/RURUBU-CURRENT.md`.

## Tool boundary — HARD

### Codex owns production execution

Current user-locked workflow:
- ChatGPT = feedback / manifests / authority / handoff / review;
- Codex = production ImageGen / cutout-alpha / Figma writes-cleanup / proxy placement / production QA evidence.

Do not begin a new Figma/ImageGen cycle before relevant manifest feedback is written back.

### Canva is not a V30 production tool

Do not use Canva or Canva-style template construction as the visual source.

Reject Canva-like output even if Canva was not literally used:
- equal cards;
- generic wedding template;
- generic gradients;
- repeated rounded boxes;
- polished but flat symmetry;
- sticker-pack composition.

### Figma is compositor

Figma is for:
- clean real/proxy photo placement and masks;
- generated/prepared production assets/modules;
- z-order/scale/rotation/overlap;
- native **long/variable/TBD** text where editability is actually needed;
- page/spread/A5/print QA;
- editable final assembly at object/module level.

Figma is **not** required to keep every short fixed visible word editable.

## Fixed bundled display modules — HARD

A short fixed authored object may be generated/prepared as one production asset containing:
- fixed text;
- numbers;
- vessel/background;
- badge shape;
- icon;
- route/doodle;
- local flower/heart/sparkle;
- print outline/shadow;
- attached fixed decoration.

Visible fixed text does **not** need to remain editable in Figma.

Exact approved strings/numbers must be recorded in:
- Root/page manifest; or
- asset metadata.

QA visible generated spelling/numbering against that source.

Examples:
- `2026` + badge;
- complete date ticket;
- Feature number + heading + icon + vessel;
- Q-number shell;
- short story-hook vessel;
- OUR JOURNEY-style stamp;
- PAGE number badge;
- fixed masthead/title/name lockup.

Keep separate:
- replaceable real photos;
- long body copy;
- unapproved/TBD personal copy;
- frequently changing text;
- independently movable decorations when the Visual Master requires separate overlap.

## ONE PART = ONE IMAGE — CURRENT DEFINITION

**ONE INDEPENDENT EDITORIAL OBJECT = ONE PRODUCTION IMAGE FILE.**

A bundled fixed display module counts as **one editorial object**, even when its internal design contains several text/icon/background elements.

This is allowed:
- date ticket + its fixed date labels + postal lines as one module;
- Feature number/heading/icon/vessel as one module, while the photo remains separate;
- PAGE + number + badge as one module.

This is forbidden:
- unrelated title + stamp + ticket packed into one PNG;
- four independent photo frames on one production bitmap;
- several unrelated stickers used as one sprite;
- P01/P04/P05 unrelated parts packed together;
- replaceable photo flattened into fixed display art;
- multi-page production sheets used directly in Figma.

Proof/contact sheets may contain many items but remain `REFERENCE_PROOF` only.

## Replaceable photo-slot contract — HARD

Every real-photo slot:
- dedicated replaceable clipped/masked container;
- image content separate from display module/frame/decoration;
- non-destructive crop;
- `clipsContent = true` when using clipping-frame implementation;
- no spill beyond mask;
- photo replacement must not rebuild surrounding page art;
- replacing photo must not remove a flower/badge/frame/title that belongs to the page design.

Conceptually:

`PHOTO SLOT / REPLACEABLE / CLIPPED`
- `IMAGE / SWAP THIS`

with display module/frame/decoration outside that image content as required.

P05 current hard requirement:
- `SHOGO FRIENDS`: 4 independent photo slots
- `SHIORI FRIENDS`: 4 independent photo slots
- total 8.

## Photo proxy contamination — HARD REJECT

Visual Master page PNGs are **reference/comparison images, not photo sources**.

Never:
- crop `P01.png`, `P02.png`, etc. and place that crop inside a photo slot;
- use a page screenshot as proxy photo;
- use a proxy containing page border/title/badge/ticket/stamp/Q shell/flower/route/frame/background decoration;
- use a proxy whose baked decoration duplicates a separate page asset.

Reason:
- photo vs page-decoration boundaries become ambiguous;
- decoration can appear twice;
- swapping the proxy can accidentally remove intended page design;
- Reference Delta can falsely pass.

Allowed proxy sources:
1. user-provided real photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy containing no page-layout decoration.

VISUAL_PROXY must match hierarchy-relevant semantics. STRUCTURAL_PROXY may be looser but still must be clean standalone photo content.

## Proxy admission QA

For every active proxy:
- view proxy alone;
- confirm it reads as photo content only;
- no page-layout text/decorations baked in;
- replace with a different clean image and confirm page decorations remain;
- verify crop/mask behavior;
- visual proxy subject count/orientation/focal mass is appropriate.

## Production asset admission pipeline

A generated isolated/bundled visual asset enters production only through:

`PAGE AUTHORITY READY`
→ `MODULE/PART BRIEF`
→ `SOURCE_KEYED`
→ `PYTHON CUTOUT`
→ `ALPHA QA PASS`
→ `PRODUCTION_RGBA`
→ `DRIVE/GIT TRACEABILITY`
→ `FIGMA ADOPTED`.

Before generation, require:
- Visual Master reviewed;
- PASS A/PASS B complete where required;
- bundled module boundary classified;
- exact fixed visible strings/numbers known;
- variable/native copy classified;
- replaceable photo relationship known;
- clean proxy role classified;
- implementation-affecting feedback debt written back.

## Key-background generation

For title/modules/paper/tickets/stamps/ribbons/tape/frames/ornaments needing alpha:
- one independently movable object/module per image;
- removable flat key background;
- key color must not overlap artwork colors;
- leave clean connected margin around object;
- do not use scenic/gradient/textured background behind an object intended for cutout;
- preserve intentional interior whites/creams/colors;
- treat deliberate shadow as part of alpha silhouette and QA it.

## Python alpha cutout

Use edge-connected background removal rather than naive global color deletion.

Preferred behavior:
- know/sample key color;
- find key region connected to outer edges/corners;
- remove connected background with controlled tolerance;
- preserve similar colors inside artwork;
- preserve intended interior holes/colors;
- clean key halo/fringe;
- output true RGBA PNG.

## Mandatory alpha QA

Before adoption:
- real alpha channel exists;
- outer canvas transparent;
- no baked checkerboard;
- no key-color halo;
- no accidental holes;
- intentional interior colors preserved;
- no unwanted opaque rectangle;
- edges reviewed enlarged;
- test on light/dark temporary background where useful.

A checkerboard-looking generation preview is **not evidence of alpha**.

## Source + production states

### `SOURCE_KEYED`
Original generated source with removable key background.

### `PRODUCTION_RGBA`
- true transparent production PNG;
- alpha QA passed;
- Figma placement source.

Other useful states:
- `REFERENCE_ONLY`
- `CANDIDATE`
- `ADOPTED`
- `SUPERSEDED`
- `REJECTED`.

## Asset metadata / provenance

Each adopted asset/module should record as applicable:
- asset ID / semantic filename;
- page/job;
- render mode;
- source/provenance;
- generation prompt/version;
- **exact fixed text/numbers baked into visible module**;
- variable fields that remain outside;
- photo relationship;
- intended physical size/aspect;
- canvas dimensions;
- visual bounds / transparent padding;
- alpha mode;
- SHA-256 when available;
- adoption/current/carry-over status.

Avoid `image1.png`, `final2.png`, `new.png`.

## Visual carry-over admission

A production file being `ADOPTED` does not permanently approve its design.

After a REWORK, every inherited visible asset must be requalified:
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

Until rechecked:
`UNREVIEWED_CARRYOVER`.

Do not preserve old asset because generation effort was already spent.

## Repeated asset anti-template rule

One-part-one-image does not mean stamp the same PNG everywhere.

Avoid obvious repeated production PNGs across unrelated page jobs.

Use meaningful variants only where repetition would otherwise feel templated.

Do not manufacture unnecessary near-identical variants just to increase count.

## No hidden Figma graveyard

`V30_FINAL_PRODUCTION` holds current production, not archive.

Rejected/superseded assets belong in:
- Git history;
- Drive rejected area;
- non-production reference/history surface.

Do not leave rejected candidates as hidden live siblings where future agents may rediscover them.

## No destructive rescue scaling

If generated asset aspect/physical behavior is wrong:
- regenerate/rebuild;
- preserve natural proportions;
- do not non-uniformly stretch tactile art as convenience.

## No generic Figma rescue

If a page-specific generated module is weak/missing:
- improve/regenerate it;
- keep a clean placeholder if blocked;
- continue other safe work;
- record blocker.

Do not silently patch identity gaps with generic rectangles/pills/SaaS shadows.

## Visual checkpoints

After meaningful page/spread changes, save comparison evidence rather than trusting memory.

Relevant QA may include:
- page render;
- spread render;
- 8-page contact sheet;
- A5-size render;
- grayscale;
- before/after comparison;
- proxy-isolation proof;
- module comparison.

Use traceable timestamp/Git SHA when practical.

## Current Google Drive production root

Canonical V30 Drive root:

- `V30_FINAL_PRODUCTION`
- folder ID: `1_WTIl18wz8oB8IhPaOKPJv3A4H00KLr8`

Subfolders:

### `00_REFERENCE_PROOF`
ID: `1hL7swXxXOAVXRmJ88yiKEMTyhfeRv0YM`

Visual Masters/contact sheets/page proofs only.

**Do not use reference-page crops as photo proxies.**

### `01_SOURCE_KEYED`
ID: `1qMzUwsLe3QRzKDmDImj_przF42nl4sTN`

Generated keyed sources.

### `02_PRODUCTION_RGBA`
ID: `1A5sxBbehwF68mUnaHkjwVYWzbI-oSH_G`

Alpha-QA-passed generated production assets/modules.

### `03_REAL_PHOTO_SOURCE`
ID: `1spYUE-TAgvOCZSmF_sOSUZcE-5Op3lJ3`

Verified real photos / **clean standalone approved proxies** / final replacements.

Do not place Visual Master page crops here as active photo proxies.

### `90_QA_EXPORT`
ID: `1Jfml45i7VyjwOloWaqpurGuxE13TeFXs`

Page/spread/contact/A5/print/proxy/module QA evidence.

### `99_REJECTED_DO_NOT_USE`
ID: `1DKoaR3EONXxufU_8-IhL_1KwEZHvedyb`

Rejected/checkerboard-baked/halo/fake-text/wrong-role/superseded production assets.

## Drive guardrails

- no new V30 production assets in old V20 folders;
- files are not current merely because they exist;
- `SOURCE_KEYED → cutout → alpha QA → PRODUCTION_RGBA → Figma`;
- rejected asset never sits ambiguously beside current production authority;
- semantic page/job naming;
- no unrelated packed production sheets;
- historical Visual-Master-crop calibration files may remain as QA history but cannot regain active proxy authority.

## Current production acceptance

A page asset set is not ready merely because:
- layers exist;
- alpha passes;
- photos swap;
- filenames say `ADOPTED`.

Current acceptance requires, where applicable:
- `CLEAN_PROXY_PASS`
- `BUNDLED_DISPLAY_MODULE_PASS`
- `IDENTITY_ANCHOR_PASS`
- `VISUAL_CARRYOVER_PASS`
- `REFERENCE_DELTA_PASS`
- `PHOTO_SWAP_PASS`
- A5/print QA.

Current production authority:
`docs/RURUBU-CURRENT.md`
