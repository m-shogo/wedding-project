# Rurubu WEDDING V10 — Live AI-Look Baseline

Date: 2026-08-27 JST
Status: `VERIFIED_LIVE_BASELINE / PREPROD_SKELETON`
Scope: Figma `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`)

This is the first live run of the structural AI-look linter plus visual reference-distance review.

It is intentionally honest about the current state: the V10 page is still an **asset-placement skeleton**, not a production-design candidate. Therefore a flattering reference-match score is not assigned yet.

## Evidence read live

Production frames:

- P01 `2787:3` COVER
- P02 `2787:9` PROFILE
- P03 `2787:15` Q&A
- P04 `2787:22` STORY
- P05 `2787:28` TIMELINE + MEMORY
- P06 `2787:35` MEMORY SPOTS + GALLERY
- P07 `2787:42` 1DAY + CAFE TABLE
- P08 `2787:49` BACK COVER

Reference quality floor:

- `2771:2` PROFILE + Q&A reference behavior
- `2771:3` MEMORY + 1DAY reference behavior
- `2771:4` COVER + GUIDE/BACK reference behavior

A live whole-production screenshot showed the eight V10 frames as pale placeholder/mask geometry, while the three completed Rurubu references beneath them showed the intended high-density, high-hierarchy editorial behavior.

## Structural linter result

All 8 pages currently returned:

- `textCount = 0`
- `imageFillCount = 0`
- mode = `PREPROD_SKELETON`

This does **not** mean semantic assets are absent from node naming; several semantic transport/asset rectangles already exist. It means the live visible Figma production frames do not yet contain rendered production text/image fills and therefore cannot be judged as finished magazine pages.

### Fatal-template risks detected in current skeleton geometry

- P03 Q&A
  - `EQUAL_MODULE_GRID`
  - `UNIFORM_CORNER_RADIUS`
  - four same-size photo masks form a literal 2×2 grid.

- P05 TIMELINE + MEMORY
  - `UNIFORM_CORNER_RADIUS`

- P07 1DAY + CAFE TABLE
  - `UNIFORM_CORNER_RADIUS`

These are **skeleton risks** now. They become production failures if the final composition preserves the same equal-card grammar.

### Strong warnings

- P01: `WEAK_DOMINANT_GESTURE`
- P02: `ZERO_CONTROLLED_IMPERFECTION`, `NO_EDGE_TENSION`
- P03: `ZERO_CONTROLLED_IMPERFECTION`, `NO_EDGE_TENSION`
- P05: `ZERO_CONTROLLED_IMPERFECTION`
- P06: `ZERO_CONTROLLED_IMPERFECTION`, `NO_EDGE_TENSION`
- P07: `ZERO_CONTROLLED_IMPERFECTION`, `NO_EDGE_TENSION`

P04 and P08 currently have somewhat clearer large/small placeholder weight, but remain empty skeletons and are not production candidates.

## Page-signature similarity baseline

Highest normalized structural similarities:

| Pair | Similarity | Baseline interpretation |
|---|---:|---|
| P03 ↔ P07 | 98% | severe same-template risk if preserved |
| P01 ↔ P04 | 93% | severe same-template risk if preserved |
| P06 ↔ P07 | 87% | high-risk repeated module rhythm |
| P03 ↔ P06 | 86% | high-risk repeated grid rhythm |
| P04 ↔ P05 | 82% | review |
| P04 ↔ P08 | 81% | review |
| P01 ↔ P08 | 78% | review |
| P02 ↔ P04 | 75% | review |

This is useful evidence: the placeholder masks were deliberately created as a safe replaceable starting structure, but **they must not become the final visual grammar**.

## Visual reference-distance diagnosis

### Shared largest distance

Current skeleton:

- pale central rectangles;
- repeated safe margins;
- little or no edge energy;
- no visible title silhouette in rendered production;
- no real image crop hierarchy;
- no useful micro-information destinations;
- no color jobs;
- no foreground/background plane interaction.

Reference behavior:

- oversized Japanese display title with recognizable silhouette;
- hero/support/micro image scale contrast;
- asymmetrical but readable cluster placement;
- labels/captions/number markers attached to meaningful content;
- controlled edge crops and overlaps;
- colorful fields with stable text contrast;
- multiple useful reading destinations;
- different composition verb per page.

Therefore the largest reference-distance cause is **not missing decoration**. It is:

> placeholder geometry still controls composition instead of editorial hierarchy controlling the geometry.

## Required structural corrections before asset-first 80%

### P01 COVER

Closest reference: `2771:4`

Current risk: P01 and P04 are 93% structurally similar.

Required direction:

- make cover title/hero mass unmistakably cover-specific;
- let hero/title/crop establish the page silhouette;
- break the lower equal-slot rhythm with one stronger support image and smaller satellites/coverlines;
- add edge energy without moving critical text outside safe area.

### P02 PROFILE

Closest reference: `2771:2`

Required direction:

- profile pair should read as two people, not a large card + two small cards;
- title → faces/portrait pair → readable personal facts;
- use label/fact clusters rather than generic boxes;
- allow selective overlap/optical offset.

### P03 Q&A

Closest reference: `2771:2`

Current risk: 2×2 same-size grid; 98% similar to P07 skeleton.

Required direction:

- replace photo-card grid grammar with numbered question hierarchy;
- Q number, question, Shogo/Shiori answer areas become the semantic cluster;
- vary cluster width/height or interruption elements where useful;
- use small visual cues only when they reinforce the question.

### P04 STORY

Closest references: `2771:3` primary, `2771:2` secondary.

Required direction:

- flow/milestone logic must become the page spine;
- story anchors and photos should create directional movement;
- do not reuse cover-like title/hero/lower-satellites structure despite the current 93% P01 similarity.

### P05 TIMELINE + MEMORY

Closest reference: `2771:3`

Required direction:

- sequence/time is the structural spine;
- introduce one anchor moment plus interruption/memory visual;
- do not preserve rounded-card repetition as the timeline grammar.

### P06 MEMORY SPOTS + GALLERY

Closest reference: `2771:3`

Required direction:

- one large destination/hero image + satellites;
- mixed crop/aspect/frame families;
- destination labels attach directly to imagery;
- avoid the four-box gallery template.

### P07 1DAY + CAFE TABLE

Closest reference: `2771:3`

Current risk: 98% similar to P03 skeleton.

Required direction:

- route/time must form a vertical or directional information spine;
- food/cafe becomes a separate visual rhythm, not another equal card set;
- map/route/time/food each has a semantic visual job.

### P08 BACK COVER

Closest reference: `2771:4`

Required direction:

- resolve/utility/message rather than another hero + two small cards;
- calmer than cover but still magazine-like;
- useful closing information + final emotional message;
- avoid mirroring P01 structure despite current 78% similarity.

## Reference match score

Current result: `NOT_SCORED_PREPROD`.

Reason:

- no visible production body text;
- no visible production image fills;
- current frame is an intentional editable skeleton;
- scoring it 0–100 would create false precision rather than actionable design evidence.

Scoring begins when a page becomes `PRODUCTION_CANDIDATE` with meaningful title/image/copy/editorial clusters.

## Baseline completion state

```text
AI_LOOK_LINTER_IMPLEMENTED: YES
LIVE_STRUCTURAL_RUN:        YES
WHOLE_BOOK_SCREENSHOT_QA:   YES
REFERENCE_VISUAL_DIFF:      YES — baseline diagnosis
PRODUCTION_CANDIDATE_PAGES: 0/8
ASSET_FIRST_80:             0/8 verified
CURRENT_QA_MODE:            PREPROD_SKELETON
```

## Next exact target

Use the organized Drive semantic library to perform the asset-first pass, but **treat existing masks as replaceable containers, not as final composition authority**.

After each meaningful batch:

1. rerun `scripts/rurubu-v10/figma-ai-look-linter.js` through Figma;
2. capture live screenshot;
3. compare with the page's closest reference;
4. fix the largest structural distance first;
5. rerun before micro-polish.
