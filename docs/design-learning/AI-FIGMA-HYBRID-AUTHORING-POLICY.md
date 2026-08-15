# AI-assisted Figma Hybrid Authoring Policy

State: `PROMOTED_PROJECT_RULE` by explicit project-wide user direction on 2026-08-15.

Scope: all Figma-based wedding design work in `m-shogo/wedding-project`.

This policy defines a default authoring split for AI-assisted Figma work. It is a production capability and structure rule, not a visual-style template. Exact layouts, palettes, motifs, decorative density, photography, typography treatment, and item authority remain item-specific.

## Core principle

Do not require AI to construct every decorative detail as native Figma geometry.

Prefer a simple, readable, replaceable Figma document whose editable responsibilities are deliberate:

1. **Variable semantic copy stays native Figma text.**
2. **Fixed visual decoration may be authored/generated as a composed visual asset when that produces materially better design quality than fragile native micro-geometry.**
3. **Logos, marks, icons, lettering and suitable reusable flat graphics should use editable SVG when vector editability has real value.**
4. **Replaceable photography/images live in stable crop/mask containers so later replacement with a different source size/aspect ratio does not destroy the layout.**
5. **Figma remains the assembly, hierarchy, editability, replacement and final-QA surface—not necessarily the place where every visual flourish is manually reconstructed.**

The goal is not minimum Figma layer count and not maximum editability of every pixel. The goal is the smallest understandable editable structure that protects the things humans are likely to change later.

## 1. Native text boundary

Keep native/editable text for information that may change, must remain readable/searchable, or needs final typographic adjustment, including where applicable:

- names;
- dates/times;
- headings and subheads;
- captions;
- body copy;
- Q&A/profile content;
- timeline facts;
- venue/place labels;
- prices/numbers;
- directions/instructions;
- factual labels;
- any final text whose spelling or wording matters.

Do not bake critical or variable text into generated raster decoration merely to simplify Figma.

Generated assets may contain non-semantic visual marks or texture-like pseudo-letterform fragments only when they are clearly decorative and cannot be mistaken for authoritative copy. Fake AI text/signage should normally be rejected.

## 2. Generated/composed fixed-decoration boundary

When AI manipulation of many tiny Figma ornaments is slower, less stable, or visually weaker, it is acceptable and often preferable to create a composed fixed-decoration asset outside the editable text layer system.

Good candidates include:

- scrapbook/paper clusters;
- print texture;
- decorative borders/background fields;
- collage fragments that do not need independent editing;
- map-like atmosphere where exact semantic routes are not represented;
- fixed ornamental frames;
- decorative stamps that are not authoritative logos/marks;
- tropical/travel atmosphere clusters;
- fixed magazine-style non-text embellishment;
- visual texture whose internal pieces have no expected future edit role.

Do not use this rule as permission to rasterize an entire page by default. Keep semantic hierarchy, replaceable content, variable text and high-value reusable marks independently editable.

## 3. SVG boundary

Use the canonical conditional vector workflow when an asset benefits from real vector editability:

- `docs/design-learning/RASTER-TO-EDITABLE-SVG-FIGMA-WORKFLOW.md`

Strong candidates include:

- logos/wordmarks;
- custom lettering whose silhouette is the asset;
- icons/pictograms;
- route/line graphics;
- reusable stamps/seals;
- flat illustrations;
- simple reusable ornamental graphics.

Do not force continuous-tone photography or complex natural texture into SVG.

When converting raster/generated artwork to SVG, preserve the split between:

- High Fidelity SVG = visual truth/reference;
- Clean Editable SVG = working master;
- Final Candidate = clean structure refined toward visual truth.

## 4. Replaceable image / mask contract

Any image expected to be replaced later should be placed through a stable role container rather than positioned as an unstructured one-off bitmap.

Preferred structure:

`ROLE FRAME / MASK → IMAGE FILL OR CLIPPED IMAGE → optional native caption outside/above the image role`

The role container owns the intended composition; the source image owns only the crop/focal positioning inside it.

### Replacement resilience requirements

A replaceable photo/image role should:

- have an explicit target aspect ratio or physical box;
- use non-destructive crop/mask behavior;
- preserve the role frame when the source is replaced;
- allow a source with a different native size/aspect ratio to be swapped without moving surrounding layout;
- expose only focal-position/scale adjustment as the normal repair step;
- avoid placing irreplaceable text inside the bitmap;
- retain safe text zones where text overlaps photography;
- keep sufficient overscan/crop room around the intended focal subject where possible;
- avoid relying on exact edge content that disappears with a modest crop change.

### Replacement QA

For important templates, test at least one materially different dummy source ratio/size in a rollback-safe duplicate. The role passes only when replacement requires crop/focal adjustment rather than layout reconstruction.

For a final adopted source, still verify intrinsic/display resolution, crop integrity, provenance and actual-size visual quality.

## 5. Figma should stay human-readable

Prefer semantic top-level roles such as:

- `TEXT / ...`
- `PHOTO / ...`
- `MASK / ...`
- `VECTOR / ...`
- `DECOR / COMPOSED ...`
- `REFERENCE / ...`
- `ROLLBACK / ...`

Do not create hundreds of native ornament layers solely to claim editability when no future editor can understand them.

A person opening the file should be able to identify quickly:

- what copy can be changed;
- what image can be replaced;
- what is an editable vector asset;
- what decoration is intentionally composed/flattened;
- what is reference or rollback evidence.

## 6. Design-quality precedence

This policy exists because AI-driven Figma geometry can become mechanically correct but visually weak when forced to build all decoration natively.

When choosing between native micro-construction and a composed generated asset, compare:

- visual quality;
- editability actually needed later;
- replacement frequency;
- typography safety;
- source/provenance quality;
- print quality;
- Figma structural clarity;
- rollback safety.

Do not sacrifice strong editorial/art-direction quality merely to keep an ornament decomposed into many editable rectangles and circles.

Conversely, do not flatten information that humans will realistically need to update.

## 7. Generated-asset quality gate

Generation is not completion.

For any generated/composed fixed-decoration asset used in production:

`role brief → generate/select → visual QA → provenance/master save → role-sized derivative when needed → exact Figma placement → screenshot QA → structure/readability QA → ledger/evidence`

Reject:

- fake text/signage/UI;
- warped architecture or impossible objects when realism matters;
- obvious diffusion-model artifacts;
- generic stock/AI polish that weakens the intended editorial voice;
- decoration whose baked content conflicts with native text;
- assets without enough resolution for their final display/print role.

## 8. Three-scale QA remains required

Hybrid authoring does not reduce visual QA.

For meaningful design changes, inspect as applicable:

- whole item / thumbnail;
- reading/page scale;
- actual-size/detail/print scale.

Also verify:

- native text rendering and line breaks;
- mask/crop integrity;
- image replacement resilience for template roles;
- SVG/vector editability where applicable;
- intrinsic/display raster ratio;
- safe-area/fold/bleed requirements for print;
- visual cohesion between native text and composed decoration.

## 9. Item-specific art direction remains separate

This policy may be shared across Wedding Figma research, but it must not make all items look alike.

Transfer:

- authoring split;
- editability decision logic;
- mask/replacement contract;
- vector-vs-raster decision;
- QA methods;
- failure fingerprints.

Keep item-specific:

- layout;
- palette;
- decorative motifs;
- visual density;
- photo treatment;
- typography personality;
- Rurubu/editorial grammar;
- passport/ticket authenticity grammar;
- Hawaiian/tropical direction or any other concept-specific art direction.

## 10. Failure fingerprints

Normalize recurring failures:

- `NATIVE_DECOR_MICROGEOMETRY_OVERLOAD` — too many fragile Figma ornament layers reduce speed/clarity without meaningful future edit value;
- `RASTERIZED_VARIABLE_COPY` — editable factual text was baked into a raster/composed asset;
- `UNREPLACEABLE_IMAGE_GEOMETRY` — swapping a photo forces surrounding layout reconstruction;
- `MASK_CROP_FOCAL_FAILURE` — replacement survives structurally but loses the intended subject/focal point;
- `DECOR_TEXT_CONFLICT` — generated decoration contains fake/baked text that competes with authoritative native copy;
- `VECTOR_OVERENGINEERING` — a raster/continuous-tone asset was vectorized despite no meaningful editability benefit;
- `FLATTENED_SEMANTIC_ASSET` — a logo/icon/mark that should remain reusable/editable was unnecessarily rasterized;
- `HYBRID_STYLE_SEAM` — native text and generated/composed decoration look like unrelated systems rather than one design.

If the same method triggers the same fingerprint twice without material capability/environment change, change method rather than retrying cosmetically.

## 11. Default decision sequence

Before constructing a visual element in Figma, ask:

1. Will a human need to change the wording/value? → native text.
2. Will a human need to replace the image? → stable mask/role container.
3. Is the graphic a reusable/recolorable silhouette? → SVG/vector candidate.
4. Is it fixed visual decoration whose internal pieces have little future edit value? → composed/generated asset candidate.
5. Does flattening it destroy meaningful future control? → keep semantic/native structure instead.
6. Does native reconstruction materially weaken the design or create fragile complexity? → prefer composed asset, with rollback and QA.

This decision is role-based, not format ideology.

## Relationship to shared learning

This policy is a neutral Wedding-wide production rule. Rurubu and non-Rurubu owners may consume it without gaining permission to inspect or edit each other's item-specific production state.

Future item experiments should report when this hybrid split improves or harms:

- design quality;
- replacement resilience;
- human editability;
- typography safety;
- Figma structure simplicity;
- production speed;
- print/source fidelity.

Only the generalizable finding transfers. Literal decoration, assets and layouts remain in their original item scope.
