# Rurubu WEDDING — CURRENT POINTER

Status: `CURRENT_POINTER / V30_ONLY / 2026-09-01`

The only current Rurubu WEDDING production version is **V30**.

Read first, in this order:
1. `docs/rurubu-v30/README.md`
2. `assets/rurubu-v30/README.md`

The second file is not optional: it contains the current production-asset, replacement-mask, one-part-one-image, Canva-ban, and accident-prevention gates that must be applied during execution.

Current Git branch:
`rurubu/v30-final-production-20260901`

Current Figma page:
`V30_FINAL_PRODUCTION`

Current Figma board:
`V30 / FINAL PRODUCTION / 2026-09-01` — node `3535:2`

## V30 HARD PRODUCTION OVERRIDES

These rules are mandatory even if an older note or current proof is ambiguous:

- Real-person / friend / couple / pet photography may use **dummy/proxy photos during layout**, because final photos will be replaced later.
- Every replaceable photo slot must be built as an **easy-swap non-destructive Figma mask/clipped frame** from the beginning.
- The photo image remains separate from its decorative frame/backing.
- Replacing a photo must require only swapping/replacing the image inside the existing slot; surrounding editorial art must not need rebuilding.
- **The photo must never visually extend outside its intended frame/mask bounds.** Use a real mask or a clipping frame with `clipsContent = true`; verify no pixel spills outside the slot after crop/scale/rotation.
- Decorative frames/backings may intentionally overlap outside the photo slot, but the underlying photo itself stays clipped to its own mask.
- For P05, keep exactly **4 SHOGO FRIENDS photo slots + 4 SHIORI FRIENDS photo slots = 8 independently replaceable masked photo slots**.
- **ONE PART = ONE IMAGE is mandatory for generated/editorial assets.** One production part must be delivered as one independent image file.
- Never pack multiple separate production parts into one generated PNG/canvas/contact sheet/sprite merely to save generations or uploads.
- If a page needs title + tape + stamp + ticket + frame, those are separate image files unless they are intentionally one inseparable semantic editorial unit approved as a single part.
- A proof/contact sheet may show several candidates together for review, but it must never become the production asset used in Figma.
- Canva is not part of the V30 production design chain.
- Photo replaceability must be **tested by an actual swap**, not accepted from layer naming alone.
- Before guest-facing export, production/stale markers such as `TBD`, `DUMMY`, `REAL PHOTO`, `PHOTO SWAP`, `V20`, `VOL.20`, `V21`, `V31` must have zero visible hits.
- Do not keep rejected/obsolete hidden assets inside the live `V30_FINAL_PRODUCTION` page as a graveyard; move them to history/reference or `99_REJECTED_DO_NOT_USE`.
- Do not non-uniformly stretch generated editorial art to rescue the wrong aspect ratio; regenerate/rebuild for the intended physical size.
- Repeating the exact same PNG across multiple unrelated jobs/pages is an anti-template risk; use meaningful variants when repetition becomes visible.
- Generated assets enter live Figma only after `SOURCE_KEYED → Python cutout → alpha QA → PRODUCTION_RGBA → traceability` passes.
- After meaningful visual changes, save contact/page/spread/A5 checkpoints to `90_QA_EXPORT` for regression comparison.
- Faces, eyes, expressions, gestures, names, answers and other critical content must remain safe from trim/fold/decoration; P05's eight photos must remain recognizable at A5.
- **CONTENT ROLE LOCKED / VISUAL EXECUTION UNLOCKED**: page roles stay fixed, but weak geometry may be rebuilt from zero.
- Do not patch a missing/weak image-generated editorial unit with generic Figma cards/rectangles merely to make a page look finished.

## Balanced visual-production doctrine — IMPORTANT CLARIFICATION

Do not interpret `ImageGen-first` as `everything must be raster-generated`.

The best V30 split is:

`IMAGE GENERATION = MAGAZINE PERSONALITY`

`FIGMA NATIVE = PRECISION / EDITABILITY / COMPOSITION`

Use ImageGen / Imagen-class image generation for page-specific visual units whose value comes from authored irregularity, tactile print character or distinctive magazine personality, such as:
- masthead/title art;
- paper/backing objects;
- irregular frames;
- tickets;
- stamps;
- ribbons/tape clusters;
- Q&A/caption vessels;
- editorial ornaments;
- page-aware texture/atmosphere when genuinely useful.

Use precise native Figma geometry/text for things that benefit from accuracy rather than generative personality, such as:
- masks/clipping frames;
- simple rectangles;
- simple rules/lines/separators;
- basic route lines when no authored illustration is needed;
- trim/bleed/safe/fold guides;
- decorative barcode construction/text;
- exact dates/names/body copy/Q&A/captions;
- simple alignment/support geometry.

Do not rasterize precision merely to satisfy an image-generation quota.

Do not use Figma native primitives to invent the publication personality. Use them where precision and editability are the actual job.

## Definition of ONE PART = ONE IMAGE

This rule means:

**ONE INDEPENDENT EDITORIAL OBJECT = ONE IMAGE FILE.**

It does **not** mean every trivial technical primitive must become an image file.

Examples that should normally remain independent generated images:
- title art;
- ticket;
- stamp;
- irregular photo frame/backing;
- editorial paper vessel;
- tape/ribbon cluster;
- ornamental cluster that is genuinely one inseparable visual object.

Examples that may remain native Figma when simple/technical:
- one straight line;
- simple rectangle/background field;
- mask shape;
- clipping frame;
- safe-area guide;
- simple separator;
- barcode bars/text when precision is more important than texture.

The prohibition is against packing several independently positionable editorial objects into one production bitmap.

`NO PACKED PRODUCTION SHEETS / NO SPRITES / NO MULTI-OBJECT CONVENIENCE PNGS.`

## Photo-first design rule

Do not finish decoration first and hope the photos fit later.

Before generating page-specific final art:
1. place real photos or realistic dummy/proxy photos;
2. establish approximate final orientation/crop behavior;
3. identify faces/focal points/empty zones;
4. establish the main reading path and photo-size hierarchy;
5. then generate titles/frames/paper/stamps/tape/other editorial parts that respond to that actual composition.

Generated art should respond to the real/proxy photographs, not look like a generic sticker kit dropped on top afterward.

Photo wells are not the finished design, but photographs must influence the design before production parts are locked.

## Two valid page-production modes

Do not force every page through the exact same creation sequence.

### Mode A — ART-DIRECTION-FIRST
Best for pages whose visual concept is the main challenge, especially strong feature/cover/back-cover exploration.

Typical candidates:
- P01
- P04
- P08 when necessary

Flow:
`WHOLE-PAGE VISUAL EXPLORATION / PROOF`
→ `APPROVE VISUAL DIRECTION`
→ `DECOMPOSE INTO INDEPENDENT EDITORIAL OBJECTS`
→ `GENERATE PRODUCTION PARTS`
→ `FIGMA LAYERED RECONSTRUCTION`

Whole-page generated output remains reference/proof only, never the final flattened master.

### Mode B — STRUCTURE-FIRST
Best for pages where photo count, information role and reading path are already constrained.

Typical candidates:
- P02
- P03
- P05
- P06
- P07

Flow:
`PHOTO ROLES / CONTENT ROLES`
→ `ROUGH FIGMA STRUCTURE / MASKS / READING PATH`
→ `IDENTIFY ONLY THE MISSING MAGAZINE-PERSONALITY OBJECTS`
→ `GENERATE THOSE OBJECTS`
→ `LAYERED FIGMA ASSEMBLY`

Do not generate unnecessary page proofs or large asset batches when the structure is already clear.

## Final preferred page workflow

Use this as the default decision loop:

1. Lock the current page role.
2. Place real/dummy proxy photographs in replaceable clipped masks.
3. Check the page silhouette at thumbnail scale.
4. Define the page's reading path and photo hierarchy.
5. Decide whether Mode A or Mode B is appropriate.
6. Identify roughly 4–8 important authored editorial objects when needed; do not force a quota if fewer are enough.
7. Generate only the objects that genuinely create magazine personality.
8. For isolated generated assets: safe solid key background → Python alpha cutout → alpha QA → Drive/Git traceability.
9. Assemble from background to foreground in Figma.
10. Keep factual/personal text native and editable.
11. Review page, spread, full 8-page contact sheet and A5 actual-size readability.
12. Regenerate/rebuild only the weak object or weak structural relationship.

Do **not**:
- mass-generate generic assets before page need is known;
- build an asset warehouse and then search for places to use it;
- finish decoration before understanding the photographs;
- make every page follow the same visual template;
- use image generation for simple precision geometry;
- use Figma cards/rounded boxes to replace missing magazine personality;
- flatten the page to hide structural weakness.

## Anti-AI principle — do not standardize the life out of the book

The eight pages must share publication DNA, but they must not look like eight instances of one component.

Human-edited magazine energy may include:
- one page with a very large title;
- another with denser photo clustering;
- another with a calmer reading field;
- different local frame geometries;
- different collision patterns;
- different active-edge behavior;
- deliberately different page silhouettes.

Do not enforce identical decoration counts, identical title geometry, identical photo counts, identical frame recipes or identical spacing across pages merely for consistency.

The rule system exists to prevent accidents, fabrication and template drift — **not to make every page obey the same visible formula**.

## Core quality target

The target is not `maximum ImageGen`.

The target is:

`REAL PHOTOS`
+
`PAGE-SPECIFIC AUTHORED IMAGE-GENERATED ART`
+
`PRECISE NATIVE FIGMA COMPOSITION / MASKS / TEXT`
+
`EDITORIAL HIERARCHY`
+
`LAYERED EDITABILITY`
+
`A5 / SPREAD / CONTACT-SHEET QA`.

`QUALITY > ASSET COUNT.`

`MAGAZINE PERSONALITY FROM GENERATED ART; PRECISION FROM FIGMA.`

`1 INDEPENDENT EDITORIAL OBJECT = 1 IMAGE.`

`1 PHOTO SLOT = 1 REPLACEABLE CLIPPED MASK.`

`STRICT PROCESS + LOCKED CONTENT ROLE + FREE HIGH-QUALITY VISUAL EXECUTION.`

`docs/rurubu-v20/` and `assets/rurubu-v20/` are frozen historical/reference material only and must never be treated as current production authority.

Do not create V31 unless explicitly requested by the user.

**CURRENT = V30. V20 = FROZEN HISTORY.**
