# Image-Generation-Centered Visual Design Policy

State: `PROMOTED_PROJECT_RULE` by explicit user direction on 2026-08-27.

Scope: **non-Rurubu wedding Figma production only**. This policy does not grant permission to read, edit, QA, search, regenerate, or reuse Rurubu item-specific Figma/Drive/GitHub assets. The existing non-Rurubu scope firewall remains higher priority.

This policy strengthens—not replaces—`AI-FIGMA-HYBRID-AUTHORING-POLICY.md`.

## Goal

The goal is not to prove that Figma can recreate every visual element natively. The goal is to produce print-ready wedding editorial/graphic design with a level of finish comparable to strong professional references.

Use image generation and composed fixed artwork as a **primary production workstream** when that materially improves visual quality. Use Figma mainly for assembly, editable typography, replaceable image roles, masks, crop, z-order, layout adjustment, and final QA.

## Senior design role

Operate as a combined:

- Senior Editorial Art Director;
- Graphic Designer;
- Information Designer;
- Reader-focused Editor;
- Color / readability reviewer;
- Photo / asset selector;
- Print-output reviewer.

The quality bar is professional, sellable print design—not merely structurally valid Figma.

## Core authoring split

### Keep native in Figma

Keep later-changeable or factual copy as native editable text, including:

- names;
- dates/times;
- descriptions/body copy;
- Q&A;
- schedule/timeline facts;
- captions;
- venue/direction copy;
- table/guest information;
- QR destinations and other final factual values.

### Prefer generated/composed fixed art when it improves quality

Consider generation/composed artwork first for roles such as:

- large decorative title treatments;
- headline ornament/support;
- borders/frames;
- background graphics;
- editorial atmosphere fields;
- magazine-like visual clusters;
- collage fragments;
- travel/editorial visual motifs;
- decorative paper/background treatments;
- fixed visual groups that become cheap or mechanical when rebuilt from many Figma primitives.

Do **not** force these roles into low-value native rectangles/circles/rails simply to maximize editability.

### Prefer editable SVG when vector editability matters

Use editable SVG for reusable/recolorable flat graphics such as:

- logos/marks;
- icons/pictograms;
- route/line graphics;
- custom flat lettering silhouettes;
- reusable ornaments.

When needed, separate:

1. `High Fidelity SVG` = visual-truth reference;
2. `Clean Editable SVG` = working master;
3. `Final Candidate` = editable production asset refined toward visual truth.

### Replaceable photography/images

Any image expected to change later must live in a stable non-destructive mask/replaceable image role. Keep frame/mask and source image separate. Replacement should require crop/focal adjustment, not surrounding layout reconstruction.

## Required production flow

For each meaningful visual rebuild or image-led refinement:

1. live-check latest GitHub `main`, Current authority, exact item QA/status, exact Figma file/node, and exact Drive authority;
2. inspect current Figma at whole-item / reading / actual-size scales;
3. inspect the exact non-Rurubu Drive material library before generating anything;
4. establish the overall composition to roughly 60–80% before polishing one isolated asset to 100%;
5. create the required `FINAL MISSING ASSET LIST`;
6. write a role brief for each truly missing production asset;
7. when generation capability is available, generate materially different candidates—not near-identical micro-variants;
8. art-direct and reject weak candidates; generation itself is not progress;
9. save only adopted or serious comparison candidates to the exact Drive authority and read back ID/metadata;
10. place into Figma as a replaceable/non-destructive role;
11. verify mask/crop/z-order/contrast/resolution;
12. perform whole-item / reading / actual-size screenshot QA plus structure/editability/print QA;
13. write item-specific GitHub evidence and read it back.

Do not call an asset complete merely because it was generated, uploaded, or placed in Figma.

## FINAL MISSING ASSET LIST — required before generation

For every missing asset list entry record:

- item/page;
- semantic `ROLE`;
- what the asset must depict/do;
- final placement size in mm;
- final display size in px when known;
- aspect ratio;
- transparent background required or not;
- background required or not;
- focal subject position;
- text-safe zone;
- z-order;
- required print PPI;
- recommended source pixel dimensions;
- crop allowance;
- rotation allowance where relevant;
- bleed interaction;
- closest reference role/structural function;
- AI artifacts/styles to avoid;
- why an existing Drive asset cannot satisfy the role.

If no asset is actually missing, record that fact in item evidence when material to the decision and **do not generate decoration to satisfy a quota**.

## Resolution / print rule

For raster assets intended for print:

- `>=300 ppi` at final physical size: preferred;
- `250–299 ppi`: `RESOLUTION_WARNING`;
- `<250 ppi`: not acceptable for final production unless a specific documented exception exists.

For logos, fine lines, or raster imagery containing deliberate small graphic detail, prefer approximately `300–350 ppi` equivalent or use vector where appropriate.

Before generation/adoption, calculate required source pixels from the final physical size and include extra resolution for crop, rotation, and bleed.

Low-resolution proxy assets must never silently become production masters.

## Image-generation role brief

Before every generation batch, define:

- use case;
- exact item/page;
- final placement size;
- target crop/aspect ratio;
- required source resolution;
- transparent/background requirement;
- subject and focal position;
- text-safe area;
- palette;
- lens/lighting or illustration character as applicable;
- negative space;
- crop/rotation allowance;
- expected print appearance;
- negative constraints / prohibited AI traits.

When tool capacity permits, aim for roughly 2–4 **materially different** candidates so there is a real editorial choice. Do not spend credits/time on superficial micro-variations.

## Generated-asset quality gate

Reject a candidate when it shows any of the following:

- fake text or fake UI;
- broken geometry/architecture;
- obvious diffusion-model artifacts;
- stock-photo/stock-vector sameness;
- plastic/fantasy sheen inappropriate to the item;
- poor crop resilience or missing text-safe zone;
- insufficient source resolution;
- content that competes with or contradicts native factual copy;
- generic travel motifs with no item-specific role.

The accepted asset must have a specific job in the composition.

## Identity / documentary safety

Never AI-generate a bride, groom, family member, friend, guest, child, or dog and present it as the real person/animal. Do not generate fake documentary wedding moments as substitutes for real photography.

For a role that genuinely requires a real person/photo, keep it `BLOCKED_REQUIRED_INPUT` or use an explicit non-final dummy that cannot be confused with the real subject.

## Reference-image usage

Treat references as a **minimum quality bar and editing-structure reference**, not as assets to paste into production.

Analyze:

- title strength;
- image scale contrast;
- hierarchy;
- overlap;
- density waves;
- calm zones;
- eye movement;
- information clusters;
- color roles;
- editorial rhythm;
- what the reader sees next.

Do not merely copy decorative motifs.

## Anti-AI-template review

Treat the following as major warning signs:

- equal card grids;
- repeated 2×2 structures;
- excessive centering;
- uniform gaps everywhere;
- repeated equal photo sizes;
- repeated equal corner radii;
- one template repeated across unrelated items;
- filler stickers/badges/English;
- empty space mistaken for premium minimalism;
- weak title hierarchy;
- no clear photo/visual dominance;
- generic web/app containment in print artifacts.

Repair order:

1. hierarchy;
2. title strength;
3. image size contrast;
4. crop/scale;
5. composition;
6. information clustering;
7. density versus calm zones;
8. color;
9. decoration;
10. micro-adjustment.

## Color / readability

- body copy should normally use a sufficiently dark color;
- avoid long body text directly over photography;
- white text requires a reliably dark/quiet background;
- do not communicate essential meaning through color alone;
- do not use pale colors for small essential text;
- establish dominant / support / accent roles;
- hierarchy should remain understandable in grayscale.

## Figma mask / crop contract

- any image inside a visual frame must use a proper mask/clip role;
- do not destructively crop the source;
- keep frame/ornament above, image below, native text separate;
- preserve replaceability when the source ratio changes;
- intentional cutout/collage overflow is allowed only when the art direction explicitly requires it;
- verify focal point after replacement.

## Image generation is not mandatory per item

The policy is **image-generation-centered**, not image-generation-forced.

If screenshot diagnosis shows that the actual defect is typography, semantic copy, paper geometry, containment, crop, spacing, or hierarchy—and no missing hero/illustration/background asset exists—fix that problem directly instead of adding imagery.

A strong decision to generate `0` assets is valid when it is based on a real visual diagnosis.

## Evidence / reporting

Item-specific GitHub evidence should record, as applicable:

- start SHA;
- exact Figma file/node;
- exact Drive authority;
- clean-room facts/constraints used;
- native / SVG / generated / replaceable-role split;
- `FINAL MISSING ASSET LIST`;
- generation role brief and candidate count;
- adopted/rejected candidate reasoning;
- Drive IDs/metadata for adopted candidates;
- Figma placement/mask/crop state;
- whole / reading / actual-size screenshot QA;
- resolution/PPI status;
- structure/editability QA;
- rollback/reference state;
- learning status;
- next safe task.

Do not create filler evidence merely to occupy an hourly run.

## Relationship to existing authorities

This policy works together with:

- `docs/automation/non-rurubu-figma-quality-current.md`;
- `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`;
- `docs/design-learning/SHARED-DESIGN-LEARNING-SYSTEM.md`;
- `docs/design-learning/non-rurubu-shared-learning-feed.md`.

When these are used for the non-Rurubu hourly task, apply this policy as the explicit 2026-08-27 production-direction override: **visual finish first, image generation/composed artwork when justified, editable Figma where human editing/replacement actually matters, and no image-generation quota.**
