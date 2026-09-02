# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / POST-BUILD_VISUAL_QA / 2026-09-02`

Purpose: prevent a technically clean, editable Figma rebuild from being called complete when it is still visually weaker than the page Visual Master.

This document is mandatory because P01 exposed two concrete failure modes:

1. the frame size, clipping, alpha, layer separation and factual text could all pass while the cover still diverged materially from the Visual Master; and
2. after a targeted REWORK improved the major identity anchors, several visible FIRST BUILD production assets were intentionally carried into CURRENT. The stale-layer scan passed, but the page still visually contained older design language.

The second failure is critical:

`CLEAN LAYER TREE ≠ VISUALLY FRESH PAGE`.

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

The manifest is necessary but not sufficient. A future agent must see the visual source, current polish/carry-over rules, and the execution/feedback process.

## Three different things must never be conflated

### Visual Master Lock
Answers: "Do we understand the intended page?"

Evidence:
- hierarchy mapped;
- objects mapped;
- geometry/relationships recorded;
- omission audit passed.

### Figma Structure Readiness
Answers: "Is the current file technically editable/rebuildable?"

Evidence:
- masks/clipping work;
- assets/layers exist;
- facts are source-controlled;
- photo swaps work;
- stale hidden graveyard is absent.

### Figma Visual Acceptance
Answers: "Does the current Figma actually preserve one coherent Visual-Master-level design language?"

Evidence:
- current Figma screenshot reviewed directly against the Visual Master;
- identity anchors match in character, not merely text value;
- representative photo/proxy semantics preserve the intended visual mass;
- anti-template/anti-UI check passes;
- **visible inherited production assets have passed the Visual Carry-over Audit**;
- editability and print checks pass only after visual fidelity passes.

A page may have `VISUAL_MASTER_LOCKED = YES` and `FIGMA_STRUCTURE_READY = YES` while `FIGMA_DESIGN_COMPLETE = NO`.

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

4. `VISUAL_CARRYOVER_PASS`
   - every material visible inherited asset has been explicitly requalified in the **current** composition;
   - no asset is implicitly grandfathered from an earlier build;
   - no unresolved mixed-generation design language remains.

5. `REFERENCE_DELTA_PASS`
   - current Figma screenshot compared directly against the Visual Master;
   - first impression, visual mass, hierarchy, editorial rhythm and current-page coherence pass.

6. `PHOTO_SWAP_PASS`
   - independent clipping/replacement proven.

7. `A5_PRINT_QA_PASS`
   - readability, safe area, effective image quality and export conditions checked.

8. `HUMAN_FEEDBACK_REVIEWED`
   - user/owner feedback has been reviewed;
   - systemic lessons are written back to root/page authority before the next page repeats the same method.

9. `FIGMA_DESIGN_COMPLETE`
   - only after all applicable gates above pass.

`FINAL_PHOTO_QA_PENDING` may remain when real final photos have not yet been provided. That does not permit skipping representative visual-proxy or carry-over QA.

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

## Visual Carry-over Audit — HARD RULE

This gate exists because P01 showed that a targeted REWORK can be **better overall** while still carrying visibly stale earlier assets.

### What this audit is NOT

It is not the hidden/stale-layer scan.

A stale-layer scan answers:
> "Did we leave hidden/rejected/obsolete nodes in LIVE Figma?"

A carry-over audit answers:
> "Did we intentionally reuse an older visible production asset that no longer matches the current page quality/design language?"

Both are required.

### Trigger conditions

Run the carry-over audit when any of these is true:
- REWORK reuses one or more assets from FIRST BUILD / prior candidate;
- an identity anchor or Hero is materially upgraded;
- owner feedback raises the page quality bar;
- some parts are regenerated while surrounding parts are intentionally retained;
- the user says old parts still look visible even though layer cleanup passed.

### Audit every visible inherited production asset

Do not search only for names containing `OLD`, `FIRST`, `V20`, `REJECTED` or hidden layers.

For each inherited asset, record:
- asset ID/path;
- which build it came from;
- current Figma node if applicable;
- isolated appearance when practical;
- appearance in current context;
- Visual Master comparison;
- coherence with newly improved neighboring assets;
- one decision: `KEEP_REQUALIFIED`, `REWORK_REQUIRED`, `REPLACE_REQUIRED`, `SUPERSEDED`;
- evidence/reason.

Until reviewed, status is `UNREVIEWED_CARRYOVER`.

### No grandfathering

`ADOPTED`, `PRODUCTION_RGBA`, prior PASS, or "unchanged" never grants permanent visual approval.

An inherited asset may be technically perfect and still fail because the surrounding page got better.

### Adjacency requalification

After a high-saliency improvement, reopen nearby support assets automatically.

Examples:
- new expressive masthead → recheck year badge, names ribbon, top route/floral ecology;
- new people-led Hero → recheck Feature scale/rhythm, Date ticket and lower-story balance;
- new bottom story vessel → recheck bottom flowers, stamp and page badge as one local system.

### `MAINTAINED` has a strict meaning

Do not report `PASS / MAINTAINED` because an asset was simply left unchanged.

`MAINTAINED` means:
- explicitly rechecked in CURRENT;
- still matches the Visual Master;
- still matches the **new current quality bar**;
- still coheres with adjacent reworked elements.

### Mixed-generation coherence test

Ask:
> "Does this look like one authored page, or like new high-quality anchors placed over older UI-like pieces?"

Fail if different production eras are visually legible through:
- inconsistent material depth;
- outdated card/vessel geometry;
- mismatched outline/shadow language;
- old compact UI rhythm beside newer expressive magazine art;
- support objects visibly cheaper than newly reworked anchors.

### Promotion vs completion

A REWORK can legitimately become **the best CURRENT** even if carry-over debt is discovered later.

When that happens:
- keep the better candidate as CURRENT;
- relabel status `PROMOTED_CURRENT_WITH_CARRYOVER_DEBT`;
- reopen final Reference Delta/coherence acceptance;
- do not roll back to the worse FIRST BUILD merely because debt exists;
- close debt by reworking/replacing/requalifying inherited assets.

This distinction prevents two opposite mistakes:
1. rejecting a real improvement because it is not yet perfect;
2. calling a real improvement fully complete while older visual language remains.

`VISUAL_CARRYOVER_PASS` is mandatory before final `REFERENCE_DELTA_PASS` / `FIGMA_DESIGN_COMPLETE`.

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
10. **new-vs-inherited asset coherence / carry-over debt**
11. micro accents

Any failure in items 1–5 or unresolved material carry-over/coherence failure blocks final `REFERENCE_DELTA_PASS` even if technical QA is green.

## Human Feedback Writeback — HARD RULE

When owner/user feedback reveals a systemic failure, do not fix only the current Figma page.

Classify the feedback:

### Page-specific
Write to the page manifest or page polish manifest.
Examples:
- P01 `Shogo & Shiori` must use expressive hot-pink script-like display treatment;
- P01 hero must visually read as a two-person people-led anchor;
- P01 2026 badge silhouette is a yellow cloud/burst, not a generic oval/circle;
- P01 Feature 1/2/3 must retain their measured local differences instead of becoming equal cards;
- P01 inherited Feature/Date/Story assets require carry-over requalification after major anchor improvements.

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
- **layer cleanliness is not the same as visual carry-over cleanliness**;
- `ADOPTED` does not mean permanently visually accepted;
- feedback must be propagated before the same method is used on later pages.

A newly discovered systemic issue creates/reopens `FEEDBACK_DEBT`. Do not proceed to the next production page until the debt is modeled and its required audit is resolved or explicitly deferred by the user.

## Small targeted regeneration rule

When a specific generated/prepared asset is weak, regenerate or revise that asset first while preserving the rest of the accepted page. Do not casually regenerate the whole page and lose already-correct relationships.

For image editing/generation prompts, specify both:
- what must change;
- what must remain unchanged.

Examples:
- change only masthead silhouette/letterform depth; preserve dimensions, palette and transparent canvas;
- change only names lettering to the reference's hot-pink script character; preserve ribbon geometry and placement;
- rebuild Feature vessel geometry/material while preserving the independently replaceable photo slot and approved heading/source-of-truth.

## P01 calibration history

### FIRST BUILD lesson
The first P01 rebuild was structurally valid but visually weak:
- `るるぶ` too generic;
- `Shogo & Shiori` heavy dark sans;
- unrelated object/travel Hero;
- weak year badge;
- UI-like Feature stack;
- weak/compressed Date and bottom story.

### PROMOTED REWORK lesson
The targeted REWORK correctly improved the major identity anchors and became a better CURRENT. Later direct live inspection showed several visible FIRST BUILD production assets were intentionally retained, especially Feature vessels, Date ticket and bottom story backing.

Therefore the correct state is not rollback. It is:

`BEST CURRENT PROMOTED`
+
`VISUAL CARRYOVER DEBT OPEN`
+
`FINAL PHOTO QA PENDING`.

This is the canonical example of why promotion and completion are different decisions.

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
