# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / POST-BUILD_VISUAL_QA / 2026-09-02`

Purpose: prevent a technically clean/editable rebuild from being called complete when it is visually weaker, contaminated, unintentionally translucent, clipped, or mixed with stale production language.

Hard summaries:

`CLEAN LAYER TREE ≠ VISUALLY FRESH PAGE`

`TRUE ALPHA ≠ CORRECT ALPHA`

`VISUAL MASTER CROP ≠ CLEAN PHOTO PROXY`

`EDITABLE ≠ BETTER DESIGN`

`FEEDBACK NOT WRITTEN BACK ≠ READY FOR FIGMA`

`CHEAP ASSET FAILURE ≠ LONG DIAGNOSIS`

## Execution ownership / order

Current user-locked workflow:

- ChatGPT: feedback analysis, Visual Master/current-screenshot review, manifest/doc authority updates, contradiction cleanup, Codex handoff prompt, post-build review.
- Codex: production ImageGen, alpha/cutout preparation, Figma writes/cleanup, proxy installation, screenshots/exports, Drive/Git production evidence.

ChatGPT must not jump into production Figma/ImageGen while manifest/feedback debt is open unless the user explicitly reassigns the work.

## Mandatory read set before any V30 production write

1. `docs/RURUBU-CURRENT.md`
2. actual page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/visual-polish-manifest.json`
5. page manifest
6. page polish manifest when present
7. `docs/rurubu-v30/VISUAL-MASTER-LOCK-AUDIT.md`
8. this document
9. page README when production exists

Newest explicit owner feedback reopens acceptance even if an older PASS exists.

## Completion vocabulary — HARD

1. `FIGMA_STRUCTURE_READY`
2. `CLEAN_PROXY_PASS`
3. `BUNDLED_DISPLAY_MODULE_PASS`
4. `ALPHA_INTEGRITY_PASS`
5. `EDGE_SAFETY_PASS`
6. `REPRESENTATIVE_VISUAL_PROXY_READY`
7. `IDENTITY_ANCHOR_PASS`
8. `VISUAL_CARRYOVER_PASS`
9. `REFERENCE_DELTA_PASS`
10. `PHOTO_SWAP_PASS`
11. `A5_PRINT_QA_PASS`
12. `HUMAN_FEEDBACK_REVIEWED`
13. `FIGMA_DESIGN_COMPLETE`
14. `FINAL_PHOTO_QA_PENDING` / `FINAL_PHOTO_QA_PASS`
15. `COMPLETE`

Do not use vague `FIGMA_COMPLETE` for structure-only or locally improved work.

## Clean photo-proxy policy — HARD

Visual Master is comparison authority, not photo-slot source material.

Never use:
- `P01.png` / `P02.png` / other page-master crops as active photo fills;
- page screenshots as photo fills;
- proxies containing page border/title/badge/ticket/stamp/Q shell/flower/route/frame/background decoration.

Allowed:
1. suitable user real photo;
2. clean standalone representative photo;
3. clean generated standalone photo proxy with no page-layout decoration.

VISUAL_PROXY must match role/count/orientation/focal mass. STRUCTURAL_PROXY may be semantically looser but still must be standalone photo content.

## Bundled fixed display-module policy — HARD

When short fixed text/numbers visually behave as one authored editorial object with their vessel/background/icon/accents, generate/prepare the complete visible module as one production asset.

Visible fixed text does not need to remain editable in Figma.

Keep separate:
- replaceable real photos;
- long body copy;
- unapproved/TBD/personal copy;
- frequently changing text;
- independently movable decoration when separate overlap is required.

## Alpha Integrity Gate — HARD

**An RGBA file can have a valid alpha channel and still be visually wrong.**

Alpha QA has two independent jobs:

### A. Outside transparency

The area outside a cutout module should be transparent where intended.

Reject:
- baked checkerboard;
- key-color halo;
- opaque rectangle;
- fringe;
- accidental external debris.

### B. Intended interior opacity

Paper, ticket, label, vessel, badge, ribbon or card surfaces that are intended to read as opaque printed material must remain opaque.

Default expectation:
- large interior paper/vessel areas: alpha normally `>= 0.95`, preferably `1.00`;
- partial alpha is normally limited to antialiased edge transitions;
- large translucent interiors require explicit Visual Master/page-authority evidence.

Mandatory QA:
- inspect the alpha channel itself;
- preview over white, mid-gray, black/dark and high-contrast backgrounds;
- inspect asset in isolation and on the current page;
- sample representative interior alpha values or produce an opacity-mask diagnostic when practical;
- confirm Hero/background pixels do not show through an intended opaque paper vessel;
- verify text/icon readability after compositing;
- compare material character at A5 size.

Hard reject:
- `alpha channel exists` used as the only pass condition;
- outer transparency passes while an intended white/cream paper interior becomes semi-transparent;
- key-background removal erases intended white/cream material;
- large unexplained internal alpha holes;
- reducing Figma layer opacity to hide bad source alpha;
- adding generic white rescue rectangles behind a broken module when that changes authored silhouette/overlap.

Repair the source/cutout alpha or regenerate only the affected module.

## Fast-fail regeneration rule — HARD

When a defect looks asset-side and the affected module is cheap to regenerate/re-cut, **do not spend prolonged time diagnosing it**.

Use this order:

1. Run **one quick discriminator** only:
   - inspect one representative alpha/mask sample or one high-contrast composite; and
   - if the source appears correct, check Figma opacity/blend/mask once.
2. If the source/RGBA/cutout is visibly or numerically wrong, **regenerate or redo cutout immediately**.
3. Replace only the affected module and delete the superseded LIVE node.
4. Run **one integrated final QA pass** after replacement.
5. Repeat diagnosis/QA only if the final pass still fails or a new blocker appears.

Decision rule:

> If diagnosis/context cost is likely to exceed regeneration/cutout cost, prefer regeneration/cutout.

Typical immediate-regeneration cases:
- paper/ticket/label interior translucency;
- key-color halo or lost white/cream material;
- broken/contaminated alpha;
- clearly degraded generated lettering/module rendering;
- wrong bundled-module treatment that is cheaper to regenerate than patch.

Do not waste time on:
- repeated midpoint screenshots for the same known defect;
- several rounds of identical alpha diagnosis;
- long status updates before fixing a cheap module;
- manual micro-patching of broken generated art when regeneration is faster;
- context-heavy reporting of every intermediate check.

Reporting rule:
- normally report once at the end with **cause → replacement → QA result → remaining debt**;
- interrupt mid-process only for a real blocker, destructive-risk decision, or repeated regeneration failure.

Speed never waives canonical copy/fact checks, destructive Figma safety, or the final integrated QA.

## Edge Safety Gate — HARD

Busy Rurubu composition may activate edges, but important labels/badges/text must not look accidentally clipped.

Check at full page and A5 size:
- left/right/top/bottom module clearance;
- whether crop/bleed is intentional or accidental;
- number-badge and heading legibility;
- border collision;
- relationship to Visual Master.

Hard reject:
- important number badge cut by the airmail border without reference basis;
- headings touching trim/border so tightly they read as accidental;
- formulaic reuse of the same edge offset across different modules.

## Identity Anchor Gate

Compare high-identity objects by:
- silhouette;
- letterform character;
- outline/stroke weight;
- depth/shadow;
- highlight/gloss where present;
- color proportions;
- relative scale;
- relation to neighboring art;
- authored irregularity.

Text correctness alone is not a pass.

## Anti-UI / editorial irregularity

Related modules do not automatically become identical components.

Check unwanted equalization of:
- module width/height;
- photo size;
- padding;
- icon coordinates;
- local x/y;
- overlap;
- tilt.

Do not add random scrapbook rotation simply to look handmade.

## Tactile print finish

Allowed when subtle:
- paper/matte feel;
- printed-edge irregularity;
- restrained local shadow/depth.

Reject:
- global dirty grain;
- heavy fake vintage texture;
- texture on faces;
- texture reducing A5 readability;
- noise hiding weak generation.

## Visual Carry-over Audit — HARD

A clean Figma tree can still contain stale visual language.

Every inherited visible asset after REWORK must be:
- `UNREVIEWED_CARRYOVER`
- `KEEP_REQUALIFIED`
- `REWORK_REQUIRED`
- `REPLACE_REQUIRED`
- `SUPERSEDED`

`ADOPTED`, `PRODUCTION_RGBA`, unchanged, or previous PASS is never permanent approval.

After a major anchor/module improves, reopen nearby support assets.

Question:
> Does this look like one authored magazine page, or like new high-quality anchors placed over an older draft?

## Reference Delta Gate

Use the **current screenshot**, not layer names or previous reports.

Compare in this order:
1. 3-second impression
2. clean proxy integrity
3. fixed display-module fidelity
4. alpha/material integrity
5. edge safety
6. identity anchors
7. high-saliency photo mass
8. title/photo ratio
9. occupied vs calm areas
10. asymmetric silhouette
11. overlap
12. module rhythm
13. background/frame character
14. carry-over coherence
15. micro accents

A material failure in proxy cleanliness, intended opacity, edge safety, identity, Hero semantics or major scale reopens `REFERENCE_DELTA_PASS`.

## Human Feedback Writeback — HARD

New owner feedback can reopen a previously closed debt.

Page-specific feedback → page manifest/page polish/README.

Systemic repeatable failure → Root/visual-polish/this guide.

Do not scale a newly found failure mode to later pages until it is modeled and the current affected page is rechecked or explicitly deferred.

## Targeted regeneration rule

Fix the weak object/module, not the entire page, whenever possible.

Do not create another P01 page merely for a micro-fix. Keep CURRENT node and replace only affected module(s).

For cheap asset-side defects, this rule is subordinate to the fast-fail rule above: **one quick discriminator, then regenerate/re-cut rather than prolonged diagnosis**.

## P01 current calibration — 2026-09-02 owner review

P01 CURRENT remains `3535:7` and the `c64b3c66...` final REWORK remains the accepted baseline.

Major work already accepted:
- clean standalone Hero/Feature proxies;
- bundled Date / Feature 1–3 / Bottom Story / Names / 2026 / Journey / Page modules;
- stale LIVE layers removed;
- photo swap structure preserved.

New owner-visible micro debt reopens final acceptance:

1. **Feature 1–3 label/vessel opacity**
   - current screenshot looks more translucent/washed than Visual Master;
   - inspect actual source alpha, not only Figma layer opacity;
   - intended white/cream paper must not reveal Hero/background;
   - if the quick alpha/composite check points asset-side, regenerate/re-cut immediately instead of prolonged diagnosis.

2. **Feature 1–3 left-edge safety**
   - number badges/labels are too close to the left airmail border;
   - tune local x/scale/visual bounds only, keeping their unequal rhythm.

3. **Top-left ring cluster fidelity**
   - current ring cue is weaker than Visual Master;
   - requalify/regenerate/reposition only the ring/diamond/sparkle cluster if necessary.

Therefore current status is:

`BEST_CURRENT = YES`

`FIGMA_STRUCTURE_READY = PASS`

`CLEAN_PROXY_PASS = PASS`

`VISUAL_CARRYOVER_PASS = PASS`

`ALPHA_INTEGRITY_PASS = REOPENED_FOR_FEATURE_1_3`

`EDGE_SAFETY_PASS = REOPENED_FOR_FEATURE_1_3`

`REFERENCE_DELTA_PASS = REOPENED_FOR_MICRO_POLISH`

`FIGMA_DESIGN_COMPLETE = NO`

`FINAL_PHOTO_QA_PENDING = YES`

P02 production remains blocked until this micro debt is resolved or explicitly deferred by the owner.

## Print boundary

Before `A5_PRINT_QA_PASS` verify:
- trim `148 × 210 mm`;
- 3 mm bleed where required;
- critical faces/text safe;
- generated fixed display text readable at actual size;
- final-photo effective raster resolution around 300 ppi where practical;
- current export evidence;
- grayscale/thumbnail review.

Technical print readiness never overrides visual acceptance.
