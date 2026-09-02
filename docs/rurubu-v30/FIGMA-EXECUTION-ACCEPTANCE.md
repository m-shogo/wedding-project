# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / POST-BUILD_VISUAL_QA / 2026-09-02`

Purpose: prevent a technically clean, editable Figma rebuild from being called complete when it is visually weaker, contaminated by reference-image crops, or mixed with stale production language.

P01 exposed four distinct failures:

1. technically valid/native Figma construction can still look generic;
2. a targeted REWORK can improve major anchors while carrying stale FIRST BUILD visual language;
3. a crop from the page Visual Master can contaminate a photo proxy with already-designed background/decorations and make page-part boundaries impossible to judge cleanly;
4. implementation can begin too early, before the newest feedback is written back into authority.

Hard summaries:

`CLEAN LAYER TREE ≠ VISUALLY FRESH PAGE`

`VISUAL MASTER CROP ≠ CLEAN PHOTO PROXY`

`EDITABLE ≠ BETTER DESIGN`

`FEEDBACK NOT WRITTEN BACK ≠ READY FOR FIGMA`

## Execution ownership / order

Current user-locked workflow:

- ChatGPT: feedback analysis, manifest/doc authority updates, contradiction cleanup, Codex handoff prompt, post-build review.
- Codex: production ImageGen, alpha/cutout preparation, Figma writes/cleanup, proxy installation, Figma/Drive/Git production evidence when instructed.

ChatGPT must not jump into direct production Figma/ImageGen while manifest/feedback debt is still open unless the user explicitly reassigns the work.

Before Codex production starts, the relevant systemic and page-specific feedback must already be represented in authority.

## Mandatory read set before any V30 production write

Read in this order:

1. `docs/RURUBU-CURRENT.md`
2. actual page Visual Master image
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. page manifest, e.g. `assets/rurubu-v30/p01/manifest.json`
6. page polish manifest when present
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. this document
9. page README if production already exists

Do not rely on an older chat report or older PASS statement when newer authority reopens a gate.

## Four things must never be conflated

### 1. Visual Master Lock
Answers: **Do we understand the intended page?**

Evidence:
- hierarchy/object identity mapped;
- geometry/relationships mapped;
- PASS A + PASS B omission audit passed;
- fixed display modules vs variable copy classified;
- clean photo-proxy roles classified.

### 2. Figma Structure Readiness
Answers: **Is the file technically replaceable/rebuildable?**

Evidence:
- masks/clipping work;
- real-photo slots remain independently replaceable;
- current assets/layers exist;
- stale hidden graveyard is absent.

### 3. Figma Visual Acceptance
Answers: **Does the actual page preserve the Visual Master-level design language?**

Evidence:
- clean photo proxies;
- correct bundled fixed display modules;
- identity anchors pass;
- inherited visible assets pass carry-over audit;
- current screenshot passes Reference Delta.

### 4. Final Photo / Print Acceptance
Answers: **Are final real photos and print assets ready at physical A5?**

This remains separate from design acceptance.

## Completion vocabulary — HARD

Use explicit states:

1. `FIGMA_STRUCTURE_READY`
2. `CLEAN_PROXY_PASS`
3. `BUNDLED_DISPLAY_MODULE_PASS`
4. `REPRESENTATIVE_VISUAL_PROXY_READY`
5. `IDENTITY_ANCHOR_PASS`
6. `VISUAL_CARRYOVER_PASS`
7. `REFERENCE_DELTA_PASS`
8. `PHOTO_SWAP_PASS`
9. `A5_PRINT_QA_PASS`
10. `HUMAN_FEEDBACK_REVIEWED`
11. `FIGMA_DESIGN_COMPLETE`
12. `FINAL_PHOTO_QA_PENDING` / `FINAL_PHOTO_QA_PASS`
13. `COMPLETE`

Do not use vague `FIGMA_COMPLETE` as shorthand for structure-only or locally improved work.

## Clean photo-proxy policy — HARD

There are two proxy jobs.

### STRUCTURAL_PROXY
Only for:
- clipping;
- swapping;
- fill/crop behavior;
- frame independence.

It must still be a **clean standalone photo**, but it does not need to match final subject semantics.

It cannot pass Reference Delta.

### VISUAL_PROXY
For:
- hierarchy;
- visual mass;
- crop;
- face/focal relationships;
- title/photo collision;
- Reference Delta.

It must match hierarchy-relevant properties:
- people/group/place/object role;
- subject count;
- orientation;
- subject scale;
- focal position;
- face/gesture density when people-led;
- major bright/dark mass where it affects hierarchy.

Allowed source order:
1. suitable user-provided real photo;
2. approved clean standalone representative photo;
3. clean generated standalone photo proxy that contains **no page-layout decoration**.

### Visual Master crop prohibition

Do **not** crop `P01.png` / `P02.png` / other page Visual Master images and place those crops inside real-photo slots.

Reason:
- page background/decorations may already be baked into the crop;
- flowers/titles/borders/frames/routes may duplicate separate page assets;
- it becomes unclear what is photo content and what is page decoration;
- Reference Delta can falsely improve because part of the target layout is hidden inside the proxy.

Hard reject proxy content:
- page border;
- page title or number;
- ticket/stamp/Q module;
- decorative flowers/stickers/routes copied from the page;
- already-designed frame/backing;
- screenshot of the page itself.

Proxy QA:
- inspect proxy alone;
- confirm it reads as photo content only;
- replacing the proxy must not remove any intended page decoration;
- no decorative element should appear both baked into the proxy and as a separate page layer.

## Bundled fixed display-module policy — HARD

When a short fixed visible element behaves as **one authored editorial object**, generate/prepare the complete visible object as one asset.

One module may include:
- short fixed text;
- numbers;
- background/vessel;
- badge shape;
- icon;
- route/doodle;
- flower/heart/sparkle;
- printed outlines/shadows;
- local fixed accents.

Examples:
- year badge;
- date ticket;
- Feature number + heading + icon + vessel;
- Q-number shell;
- story-hook vessel;
- stamp/postmark;
- PAGE number badge;
- masthead/title/name lockup when approved and fixed.

### Visible text editability

For approved fixed short display modules, **visible text does not need to remain editable in Figma**.

The exact approved string/number must instead be preserved in:
- canonical/page manifest; or
- production asset metadata.

A hidden duplicate native Figma text layer is optional, not required.

Keep separate/native:
- long body copy;
- Q&A answers/questions until copy-locked;
- personal/TBD facts;
- guest data;
- captions likely to change;
- any frequently changing text.

### Module boundary rule

Bundle only elements that move/scale together as one visual object.

Keep separate:
- replaceable real photos;
- independently movable overlapping decorations;
- long/variable text;
- a route/thread spanning several independent modules when the Visual Master requires independent layering.

Hard reject:
- generic ellipse + Inter text replacing an authored badge only for editability;
- turning an expressive fixed module into a collection of UI primitives;
- flattening a real-photo slot into the fixed display module;
- baking unapproved personal copy into generated art.

## Identity Anchor Gate

High-identity objects are not ordinary primitives.

Examples:
- `るるぶ`;
- `WEDDING`;
- `Shogo & Shiori` P01 lockup;
- `OUR STORY`;
- distinctive year/title/badge systems.

Compare:
- silhouette;
- letterform character;
- outline/stroke weight;
- depth/shadow;
- highlights/gloss where present;
- color proportions;
- relative scale;
- relation to neighboring art;
- authored irregularity.

Text correctness alone is not a visual pass.

## Anti-UI / anti-componentization Gate

Related editorial modules do not automatically become identical components.

Before reuse ask:
- same semantic job?
- predictable variation?
- does reuse preserve the Visual Master's local asymmetry and silhouette?

Check unwanted equalization of:
- module width/height;
- photo-slot size;
- padding;
- icon coordinates;
- local x/y offsets;
- overlap depth;
- tilt where the Visual Master actually supports it.

Do not add random rotation simply to look handmade.

## Tactile print finish Gate

Avoid flat digital/UI appearance, but do not solve it with global grain.

Suitable targets:
- paper vessels;
- tickets/postcards;
- ribbons/tapes;
- stamps/postmarks;
- expressive title/display modules;
- irregular print frames/backings.

Allowed when subtle:
- paper/matte feel;
- slight printed-edge irregularity;
- restrained local depth/shadow;
- small material differences between print objects.

Reject:
- dirty full-page grain;
- heavy fake vintage texture;
- texture across faces;
- texture that weakens A5 text;
- noise hiding poor generation.

## Floating-asset alpha verification

Checkerboard-looking preview is **not** proof of transparency.

Before adoption:
- actual alpha channel exists;
- outer canvas is transparent;
- no baked checkerboard;
- no key-color halo;
- no accidental holes;
- review over light and dark temporary backgrounds where useful.

## Visual Carry-over Audit — HARD

This is separate from stale-layer cleanup.

A clean current Figma tree can still visibly contain old design language if earlier production assets were intentionally reused.

Run when:
- a REWORK reuses older assets;
- identity anchor/Hero quality materially increases;
- some modules are regenerated while neighbors are retained;
- owner feedback raises the page quality bar;
- the user says old parts still look visible.

For each inherited visible asset record:
- provenance/build;
- current node;
- current-context appearance;
- Visual Master comparison;
- coherence with newly improved neighbors;
- decision: `KEEP_REQUALIFIED`, `REWORK_REQUIRED`, `REPLACE_REQUIRED`, `SUPERSEDED`.

Until checked: `UNREVIEWED_CARRYOVER`.

`ADOPTED`, `PRODUCTION_RGBA`, previous PASS, or unchanged status never grant permanent visual approval.

### Adjacency requalification

After a major anchor improves, reopen nearby support assets.

Examples:
- new masthead → recheck year/name/top decorations;
- new Hero → recheck Feature rhythm/Date/lower balance;
- new Bottom Story → recheck bottom flowers/stamp/page badge.

### Mixed-generation coherence question

> Does this look like one authored magazine page, or like new high-quality anchors placed over old UI-like pieces?

If different production eras are visible, carry-over fails.

A better candidate may stay CURRENT while debt is open, but use:

`PROMOTED_CURRENT_WITH_CARRYOVER_DEBT`

and do not claim final `REFERENCE_DELTA_PASS` / `FIGMA_DESIGN_COMPLETE`.

## Reference Delta Gate

Use the **current Figma screenshot**, not layer names or manifest claims.

Compare at matching aspect ratio in this order:

1. 3-second first impression
2. clean proxy integrity
3. fixed display-module fidelity
4. identity anchors
5. high-saliency photo subject/visual mass
6. title/photo ratio
7. occupied vs calm areas
8. asymmetric silhouette
9. overlap relationships
10. feature/module rhythm
11. background/frame/material character
12. new-vs-inherited coherence
13. micro accents

A material failure in proxy cleanliness, module fidelity, carry-over coherence, first impression, identity, Hero semantics or major scale blocks final `REFERENCE_DELTA_PASS`.

## Human Feedback Writeback — HARD

When feedback reveals a repeatable problem, do not fix only Figma.

Page-specific → page manifest/page polish manifest.

Systemic → root manifest + `visual-polish-manifest.json` + this guide.

A new issue reopens `FEEDBACK_DEBT` even if an earlier debt was closed.

Do not move to the next production page until the implementation-affecting debt has been modeled/resolved or the user explicitly defers it.

## Targeted regeneration rule

Fix the weak object/module, not the entire page, when possible.

A generation brief must say:
- what changes;
- what remains unchanged;
- exact fixed visible strings/numbers;
- intended module boundary;
- whether a replaceable photo must remain separate.

## P01 current calibration

The promoted P01 REWORK remains the better CURRENT at `3535:7`; do not roll back to FIRST BUILD.

But current debt includes:
- visible inherited Feature 1/2/3, Date and Bottom Story production language;
- requalification of names ribbon / lower stamp/page area;
- Visual-Master-crop Hero + Feature proxy method now deprecated and must be replaced with clean standalone proxy photos before closing visual acceptance.

Therefore P01 is currently:

`BEST CURRENT PROMOTED`
+
`CARRY-OVER DEBT OPEN`
+
`CLEAN-PROXY DEBT OPEN`
+
`FINAL PHOTO QA PENDING`.

## Print boundary

Before `A5_PRINT_QA_PASS` verify:
- A5 trim `148 × 210 mm`;
- 3 mm bleed where required;
- critical faces/text safe;
- generated fixed display text legible at actual size;
- effective final raster resolution around 300 ppi where practical;
- current links/assets/export proof;
- grayscale/thumbnail review.

Technical print readiness can only follow, never overrule, visual acceptance.
