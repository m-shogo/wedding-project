# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / POST-BUILD_VISUAL_QA / 2026-09-02`

Purpose: prevent a technically clean, editable Figma rebuild from being called complete when it is still visually weaker than the page Visual Master.

This document is mandatory because P01 exposed a concrete failure mode: the frame size, clipping, alpha, layer separation and factual text could all pass while the actual cover still diverged materially from the Visual Master. The `るるぶ` masthead became simplified, `Shogo & Shiori` became a generic heavy sans treatment instead of the reference's expressive pink script, and the dominant couple hero was replaced by an unrelated object/travel proxy. Those are visual failures even though the Figma file remained structurally valid.

## Mandatory read set before any V30 page build

Read in this order before writing production Figma:

1. `docs/RURUBU-CURRENT.md`
2. the actual page Visual Master image
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. the page manifest, e.g. `assets/rurubu-v30/p01/manifest.json`
6. page polish manifest when present, e.g. `assets/rurubu-v30/p01/polish-manifest.json`
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. **this document** `docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`
9. the page `README.md` if production has already started

The manifest is necessary but not sufficient. A future agent must see both the visual source and the execution/feedback process.

## Two different things must never be conflated

### Visual Master Lock
Answers: "Do we understand the intended page?"

Evidence:
- hierarchy mapped;
- objects mapped;
- geometry/relationships recorded;
- omission audit passed.

### Figma Execution Acceptance
Answers: "Did the actual Figma result preserve that intent?"

Evidence:
- current Figma screenshot reviewed directly against the Visual Master;
- identity anchors match in character, not merely text value;
- representative photo/proxy semantics preserve the intended visual mass;
- anti-template/anti-UI check passes;
- editability and print checks pass only after visual fidelity passes.

A page may have `VISUAL_MASTER_LOCKED = YES` while `FIGMA_DESIGN_COMPLETE = NO`.

## Completion vocabulary — HARD RULE

Do not use vague `FIGMA_COMPLETE` for a build that has only passed structural QA.

Use these states:

1. `FIGMA_STRUCTURE_READY`
   - layers exist;
   - clipping/masks work;
   - photos are replaceable;
   - factual text sources are controlled;
   - no claim of visual fidelity yet.

2. `REPRESENTATIVE_VISUAL_PROXY_READY`
   - if real photos are unavailable, every high-saliency photo slot uses a semantically representative visual proxy;
   - unrelated objects/landscapes cannot stand in for a dominant people-based hero during visual QA.

3. `IDENTITY_ANCHOR_PASS`
   - masthead/logo-like display art;
   - primary title;
   - names lockup or other page-specific identity text;
   - year/date badge when visually prominent;
   all match the Visual Master closely enough in silhouette, typographic character, outline/depth, color, scale and relationship.

4. `REFERENCE_DELTA_PASS`
   - current Figma screenshot compared directly against the Visual Master;
   - first impression, visual mass, hierarchy and editorial rhythm pass.

5. `PHOTO_SWAP_PASS`
   - independent clipping/replacement proven.

6. `A5_PRINT_QA_PASS`
   - readability, safe area, effective image quality and export conditions checked.

7. `HUMAN_FEEDBACK_REVIEWED`
   - user/owner feedback has been reviewed;
   - systemic lessons are written back to root/page authority before the next page repeats the same method.

8. `FIGMA_DESIGN_COMPLETE`
   - only after all applicable gates above pass.

`FINAL_PHOTO_QA_PENDING` may remain when real final photos have not yet been provided. That does not permit skipping representative visual-proxy QA.

## Representative proxy policy

There are two different proxy jobs.

### STRUCTURAL_PROXY
Used only to test:
- clipping;
- swapping;
- fill/crop behavior;
- frame independence.

Any sufficiently different image can be useful here.

### VISUAL_PROXY
Used to judge:
- hierarchy;
- visual mass;
- crop;
- face/focal relationships;
- title/photo collision;
- overall Reference Delta.

A VISUAL_PROXY must match the Visual Master's important semantic and compositional properties:
- subject class: people / group / place / object;
- number of important subjects;
- portrait vs landscape orientation;
- approximate subject scale within the slot;
- focal position;
- bright/dark visual mass where it affects hierarchy;
- face/gesture density where the master is people-led.

Preferred sources, in order:
1. user-provided real photo suitable for the role;
2. a crop from the user-provided Visual Master used strictly as a temporary visual-calibration proxy;
3. another approved semantically matching proxy.

Hard reject:
- an object/place proxy validating a people-dominant hero;
- a single-person proxy validating a two-person hero where face mass matters;
- a generic landscape validating a group-memory thumbnail;
- claiming `REFERENCE_DELTA_PASS` from a STRUCTURAL_PROXY.

## Fixed short display text policy

Short fixed display text may use image-generated or prepared display art when its visual treatment is part of the page identity. This is **not limited to personal names**.

Examples:
- `るるぶ`
- `WEDDING`
- `OUR STORY`
- `OUR JOURNEY`
- `Q1`–`Q6`
- short fixed teaser titles
- short fixed page labels/badges

Rules:
- retain the approved exact string separately as native/source-of-truth data;
- QA visible spelling/numbering against that source;
- keep long-form body/Q&A/captions native/editable;
- do not accept a generic native rendering merely because it is easier to edit.

## Identity Anchor Gate

High-identity elements are not ordinary editable primitives.

Examples:
- `るるぶ` masthead;
- `WEDDING` display title;
- `Shogo & Shiori` lockup on P01;
- `OUR STORY` on P03;
- any page-specific signature badge/title whose shape defines the page silhouette.

For every identity anchor, compare:
- silhouette;
- letterform character;
- stroke/outline thickness;
- dimensional depth/shadow;
- highlight/gloss behavior when present;
- color proportions;
- relative scale;
- relation to neighboring art;
- authored irregularity.

Text correctness alone is not a pass.

### Editability vs fidelity

`editable` is not allowed to mean `generic`.

Preferred order:
1. native editable text/vector **if it passes visual fidelity**;
2. generated/prepared display art with editable factual source text kept separately when visual fidelity requires it;
3. never choose a visibly weaker generic Figma treatment solely because it is easier to edit.

For locked FACT display text, if the visible treatment must be display art, keep a separate native source-of-truth layer/value and QA the visible spelling against it. Do not bake long or frequently changing copy into raster art.

## Anti-UI / anti-componentization gate

Editorial similarity is not sufficient reason to make multiple modules identical components.

Before reusing a component/variant, ask:
- do the modules have the same semantic job?
- do they vary predictably?
- does reuse preserve the Visual Master's local asymmetry?

If not, keep them separate or use variants with explicit page-specific differences.

Check specifically for unwanted equalization of:
- module width/height;
- photo-slot size;
- padding;
- icon coordinates;
- local x/y offsets;
- overlap depth;
- rotation/tilt where the Visual Master actually shows it.

Do **not** add random tilt merely to look handmade. Irregularity must come from the Visual Master or improve direct Reference Delta.

Fail examples:
- three Feature modules made equal-height/equal-padding/equal-icon cards when the Visual Master staggers them;
- Q3/Q4 normalized into one mirrored card;
- repeated friend-photo frames stamped identically because reuse is convenient.

## Tactile print finish gate

Avoid the flat digital/AI-sticker look, but do not solve it with global grain.

Suitable targets:
- paper vessels;
- tickets/postcards;
- ribbons/tapes;
- stamps/postmarks;
- expressive display-title art;
- irregular printed frames/backings.

Allowed when subtle and reference-compatible:
- light paper/matte feel;
- slight printed-edge irregularity;
- restrained local shadow/depth;
- small material differences between paper objects.

Hard reject:
- heavy fake vintage grain;
- dirty full-page paper overlays;
- texture across faces;
- texture that weakens factual copy/A5 readability;
- noise used to hide weak generation.

If texture becomes one of the first things noticed at A5, it is too strong.

## Floating-asset alpha verification

A generator preview that visually resembles a checkerboard is not evidence of real transparency. Before adopting any floating PNG/RGBA asset, inspect the actual alpha channel; baked checkerboard pixels are a reject. Record alpha mode and dimensions in asset evidence, and review the placed asset on both light and dark fields when edge contamination is plausible.

## Reference Delta Gate — mandatory evidence

A direct current screenshot is required. Do not validate from layer names or manifest claims.

Compare Visual Master vs current Figma at matching aspect ratio in this order:

1. 3-second first impression
2. identity anchors
3. high-saliency photo subject/visual mass
4. title/photo size ratio
5. major occupied-vs-calm areas
6. asymmetric silhouette
7. overlap relationships
8. feature/module rhythm
9. background/frame/material character
10. micro accents

Any failure in items 1–5 blocks `REFERENCE_DELTA_PASS` even if technical QA is green.

## Human Feedback Writeback — HARD RULE

When owner/user feedback reveals a systemic failure, do not fix only the current Figma page.

Classify the feedback:

### Page-specific
Write to the page manifest or page polish manifest.
Examples:
- P01 `Shogo & Shiori` must use expressive hot-pink script-like display treatment;
- P01 hero must visually read as a two-person people-led anchor;
- P01 2026 badge silhouette is a yellow cloud/burst, not a generic oval/circle;
- P01 Feature 1/2/3 must retain their measured local differences instead of becoming equal cards.

### Systemic
Write to the root manifest / `visual-polish-manifest.json` and this execution guide.
Examples:
- unrelated dummy images cannot validate visual hierarchy;
- fixed short identity text may use generated/prepared display art with native source-of-truth;
- native/vector simplification cannot override identity-anchor fidelity;
- structural completion is not visual completion;
- screenshot-based Reference Delta is mandatory before completion;
- editorial irregularity must not be normalized into UI or randomized without reference evidence;
- tactile print character must be local/subtle rather than global grain;
- feedback must be propagated before the same method is used on later pages.

A systemic issue creates `FEEDBACK_DEBT`. Do not proceed to the next production page until the debt is written back to authority or explicitly deferred by the user.

## Small targeted regeneration rule

When a specific generated/prepared asset is weak, regenerate or revise that asset first while preserving the rest of the accepted page. Do not casually regenerate the whole page and lose already-correct relationships.

For image editing/generation prompts, specify both:
- what must change;
- what must remain unchanged.

Examples:
- change only masthead silhouette/letterform depth; preserve dimensions, palette and transparent canvas;
- change only names lettering to the reference's hot-pink script character; preserve ribbon geometry and placement.

## P01 first-build feedback — current calibration example

The first P01 rebuild is **not the acceptance target** despite being structurally valid.

Observed failures from direct Figma screenshot review:
- `るるぶ` masthead is too simplified/generic compared with the Visual Master;
- visible `Shogo & Shiori` uses heavy dark sans typography instead of the Visual Master's lively hot-pink script/hand-lettered treatment;
- dominant hero uses an unrelated object/travel image, so title-to-people hierarchy and face-safe composition were never actually validated;
- the 2026 badge silhouette/character is weaker than the reference;
- Feature 1/2/3 read more like compact UI modules than the irregular magazine teasers in the reference;
- date ticket and bottom story hook are visually weaker/compressed relative to the reference.

Therefore P01 should currently be treated as:

`FIGMA_STRUCTURE_READY / VISUAL_REWORK_REQUIRED / FINAL_PHOTO_QA_PENDING`

not `FIGMA_DESIGN_COMPLETE`.

## Print boundary

Visual acceptance does not replace print QA.

Before `A5_PRINT_QA_PASS`, verify at minimum:
- A5 trim `148 × 210 mm` intent;
- 3 mm bleed where required;
- critical text/faces safe;
- effective raster resolution at placed size, targeting about 300 ppi for final print graphics;
- current links/assets and export proof;
- grayscale/thumbnail readability.

Technical print readiness can only follow, never overrule, visual acceptance.
