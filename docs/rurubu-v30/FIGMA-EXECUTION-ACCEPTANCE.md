# Rurubu WEDDING V30 — Figma Execution Acceptance Gate

Status: `CURRENT_V30_REQUIRED_READ / CROSS_PAGE_STYLE_FAMILY_AWARE / 2026-09-03`

Purpose: prevent a page from being called complete when its live Figma implementation disagrees with authority, its visual genre drifts away from the V30 publication family, its shared/common parts are inconsistent, page-specific ornaments reuse stale sources, or technical PASS hides a weaker visual result.

## Authority

Newest explicit owner feedback wins.

Current precedence:

`owner feedback → latest page-specific authority → publication display system / page ornament authority → global ornament art direction → visual-polish → TRUE-ALPHA policy → this Acceptance gate → older generic/root/page-main language`

A prior run-level PASS cannot override contradictory live Figma evidence.

## Required read set

1. `docs/RURUBU-CURRENT.md`
2. actual target-page Visual Master
3. `assets/rurubu-v30/manifest.json`
4. `assets/rurubu-v30/publication-display-system-manifest.json`
5. `assets/rurubu-v30/ornament-art-direction-manifest.json`
6. `assets/rurubu-v30/visual-polish-manifest.json`
7. target page manifest / polish manifest / latest page override
8. `docs/rurubu-v30/TRUE-ALPHA-ASSET-GENERATION-POLICY.md`
9. this document
10. page README/production evidence when relevant

## 1. Rurubu editorial DNA — HARD / FIRST

Before judging individual craft, confirm the page reads as Rurubu-style editorial material:

- strong first read;
- photo/information-led hierarchy;
- dense but readable clusters;
- mixed media under one art direction;
- decoration has an editorial job;
- tactile print character without generic stock/AI polish.

A beautiful standalone asset does not override a page-level editorial failure.

Gate: `RURUBU_EDITORIAL_DNA_PASS`.

## 2. V30 art direction / page role — HARD

The target page Visual Master controls local composition, hierarchy, photo count, density and page-specific motif relationships.

It does **not** authorize an unrelated illustration genre.

P01/P02 are current V30 style anchors, not layout templates.

Gates:
- `V30_ART_DIRECTION_PASS`
- `PAGE_ROLE_FIT_PASS`

## 3. Cross-page style family — HARD / BEFORE PAGE LOCK

Before `FIGMA_DESIGN_COMPLETE = YES`, compare the target page directly with locked P01 `3535:7` and P02 `3535:9`.

Do not copy P01/P02 composition. Compare the **art-direction family**.

### Active V30 family characteristics

- bright high-saturation travel-magazine energy;
- crisp printed/sticker-like silhouettes;
- strong dark outline or equivalent high-contrast edge definition on high-saliency display art;
- white/yellow/bright keylines and controlled dimensional shadows where useful;
- clean cream/white editorial paper instead of aged parchment;
- bold pink/blue/yellow/green/cyan relationships;
- tropical/travel motifs as lively editorial cutouts/stickers rather than watercolor illustration plates;
- restrained tactile print texture;
- mixed media allowed only within a bounded realism/texture range that still reads as one publication.

### HARD REJECT

Fail the page if a new high-saliency system drifts into:

- watercolor / painterly tropical illustration;
- vintage/sepia scrapbook or aged parchment;
- retro travel-poster art;
- fine-art botanical/church illustration;
- generic Canva/SVG icon family;
- simultaneous painterly-vintage and flat-flowchart genres on one page.

Important:

`ANTI_CANVA` does **not** mean “switch to watercolor/vintage.”

Correct target:

`P01/P02 V30 GRAPHIC FAMILY + TARGET PAGE'S OWN COMPOSITION`

Gate: `CROSS_PAGE_STYLE_FAMILY_PASS`.

## 4. Asset role classification — HARD

Classify by editorial role + mutability + saliency + reuse scope, not text-vs-image ideology.

Decision order:

1. cross-page recurring publication furniture → `SHARED_PUBLICATION_COMPONENT`
2. replaceable photography → `PHOTO`
3. page-specific decoration → `PAGE_SPECIFIC_ORNAMENT`
4. long/variable/TBD/personal/frequently changing copy → `NATIVE_TEXT`
5. short locked high-saliency authored lettering explicitly authorized by current page authority → `GENERATED_DISPLAY_ASSET`

Do not bake TBD/personal copy into generated art.

Gate: `DISPLAY_ROLE_CLASSIFICATION_PASS`.

## 5. Ecology / grouping quality — HARD

Do not over-fragment high-dependency regions into many isolated transparent assets.

Prefer larger authored ecologies when title, vessel, route, ornaments and local overlap visually depend on each other.

Typical ecology units:
- header system;
- paired question-paper family;
- story/timeline navigation system;
- bottom closure.

But do not flatten replaceable photos or long/pending copy into the ecology merely to reduce layers.

Reject:
- clipart assembly;
- separate SVG-like icons beside a route;
- five equal timeline cards;
- repeated micro-patching when the whole regional art direction is wrong.

Gate: `ECOLOGY_FIT_PASS`.

## 6. Anti-flowchart / anti-Canva / anti-clipart — HARD

A timeline, route or step sequence must read as editorial storytelling, not:

- flowchart;
- roadmap;
- presentation timeline;
- school poster;
- UI process diagram.

Reject:
- connector line as dominant grammar;
- independent little numbered stickers/icons assembled beside it;
- generic camera/palm/plane icons that look pasted after layout;
- equal step spacing chosen for diagram convenience rather than page rhythm.

Gates:
- `ANTI_FLOWCHART_PASS`
- `ANTI_CANVA_SVG_PASS`
- `ANTI_CLIPART_PASS`

## 7. Live role implementation — HARD

Manifest classification is not implementation proof. Inspect live Figma nodes/sources.

Required:
- generated role → approved authored asset installed;
- native role → wording separately controllable;
- shared role → actual common master/source provenance;
- page-specific ornament → page-specific or intentionally recurring source;
- photo role → stable replaceable role/mask.

Gate: `LIVE_ROLE_IMPLEMENTATION_PASS`.

## 8. Shared publication components — HARD

Recurring furniture is one system, not page-by-page lookalikes.

Confirmed current example:
`PAGE_BADGE_SHARED_MASTER = 3772:2`.

Page number changes by controlled property/value; design does not independently drift per page.

Gate: `SHARED_PUBLICATION_COMPONENT_PASS`.

## 9. Ornament family + fingerprint — HARD

Families share visual grammar, not major exact page-specific image bytes.

Before page lock:
- compare SHA/imageHash when exact carry-over is possible;
- declare intentional shared/repeating assets;
- reject undeclared identical major page-specific ornament sources.

Different hashes do not automatically prove stylistic coherence.

Gates:
- `ORNAMENT_FAMILY_COHERENCE_PASS`
- `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`
- `REUSE_INTENT_PASS`.

## 10. Ornament / display object quality

Only after higher-level editorial, cross-page style and ecology gates pass, judge the individual asset.

Require:
- publication-grade silhouette/line/detail;
- correct visual weight;
- no generic stock/clipart feel;
- no style seam against neighboring page systems.

A technically beautiful painterly illustration fails if the V30 page family is graphic/sticker-like.

Gates:
- `ORNAMENT_OBJECT_QUALITY_PASS`
- `DISPLAY_ART_QUALITY_PASS`.

## 11. Alpha / material integrity — HARD

For floating generated art:

`true alpha generation/export → immediate alpha preflight → Figma`

Verify outside transparency and intended inside opacity separately.

If one same-family opaque paper module fails, do one sibling sweep before closing alpha integrity.

Do not hide a broken source alpha with generic Figma rescue rectangles.

Gates:
- `TRUE_ALPHA_PREFLIGHT_PASS`
- `ALPHA_INTEGRITY_PASS` / `ALPHA_MATERIAL_PASS`.

## 12. Clean photos / copy / border

- Visual Master/page screenshot is never an active photo fill;
- replaceable photos use stable masks/roles;
- newest owner-approved copy wins;
- pending personal/body copy remains native/separate;
- default depth: `background → border/frame → photos → authored modules → foreground accents`.

## 13. Fast-fail regeneration

When a cheap asset-side problem is obvious:

`one quick discriminator → regenerate/re-cut → replace → delete superseded LIVE node → one integrated final QA`

Do not consume context on repeated diagnosis of the same cheap defect.

For aesthetic genre failure, regenerate the **whole affected ecology**, not a succession of tiny local icons.

## 14. Design-completion gate

Before `FIGMA_DESIGN_COMPLETE = YES`, inspect the current screenshot/live page and confirm applicable gates in this order:

1. `RURUBU_EDITORIAL_DNA_PASS`
2. `V30_ART_DIRECTION_PASS`
3. `CROSS_PAGE_STYLE_FAMILY_PASS`
4. `PAGE_ROLE_FIT_PASS`
5. `ECOLOGY_FIT_PASS`
6. `ANTI_FLOWCHART_PASS` when applicable
7. `ANTI_CANVA_SVG_PASS`
8. `ANTI_CLIPART_PASS`
9. `DISPLAY_ROLE_CLASSIFICATION_PASS`
10. `LIVE_ROLE_IMPLEMENTATION_PASS`
11. `SHARED_PUBLICATION_COMPONENT_PASS`
12. `ORNAMENT_FAMILY_COHERENCE_PASS`
13. `PAGE_SPECIFIC_ASSET_FINGERPRINT_PASS`
14. `ORNAMENT_OBJECT_QUALITY_PASS` / `DISPLAY_ART_QUALITY_PASS`
15. clean photo-proxy integrity
16. alpha/material integrity
17. copy safety/sync
18. border/edge/A5 readability
19. direct target Visual Master comparison
20. final P01/P02/target-page side-by-side publication-family comparison

A run report saying PASS cannot override contradictory live Figma evidence.

## 15. Fast close

For bounded corrections:

`fix reopened scope → one dependency/fingerprint check → one full-page/A5 review → one P01/P02/target cross-page comparison → protected-page check → one remote sync → close → STOP`

Do not restart unrelated prior-PASS audits unless the patch disturbed them.

## Current calibration

### P01

`DESIGN_LOCKED / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

Style anchor for V30 graphic/sticker/print energy. Not a layout template.

### P02

`DESIGN_LOCKED / FINAL_PHOTO_QA_PENDING / PRINT_READY_NO`

Style anchor for V30 inside-page paper/display/ornament treatment. Not a layout template.

### P03

`REOPENED_FOR_V30_STYLE_REALIGNMENT_AND_GROUPED_STORY_ECOLOGY`

Current live P03 fails `CROSS_PAGE_STYLE_FAMILY_PASS` because:
- grouped Header/Q3/Q4/Bottom drifted into painterly/vintage/parchment/botanical illustration language;
- preserved Timeline remained SVG/flowchart-like;
- the page therefore mixes two non-V30 genres.

Current P03 authority:
`assets/rurubu-v30/p03/polish-manifest.json`.

P03 must realign Header, Q3/Q4, Story Timeline + Wedding Day/date, and Bottom closure to the P01/P02 V30 graphic family while preserving P03's own composition, photo roles and pending native copy.

### P04-P08

Before broad ImageGen:
1. inspect target Visual Master for local composition;
2. inspect P01/P02 CURRENT for style-family calibration;
3. define grouped ecologies;
4. generate one calibration sample first;
5. fail immediately if it drifts into an unrelated art genre;
6. scale production only after `CROSS_PAGE_STYLE_FAMILY_PASS` direction is demonstrated.
