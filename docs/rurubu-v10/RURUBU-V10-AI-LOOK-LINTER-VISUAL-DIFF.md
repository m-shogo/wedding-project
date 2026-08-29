# Rurubu WEDDING V10 — AI-Look Linter + Reference Visual Diff

Status: `CANONICAL_V10_AI_ASSIST_QA`
Scope: Rurubu WEDDING V10 only

This QA exists to catch the failure mode where the correct semantic assets are present but the page still looks like an AI/Figma template rather than a professionally edited Japanese travel magazine.

It supplements — never replaces — the canonical reference fingerprint, page recipes, reader-first design system, print QA, and human visual judgment.

## Core principle

Do not ask only:

> Is the page clean and aligned?

Ask:

> Does the page reproduce the reference's editorial behavior — hierarchy, mixed image weight, asymmetry, useful density, title silhouette, edge tension, color jobs, and readable local order — without copying literal reference people/text/layout?

The linter detects suspicious structure. The visual diff diagnoses the largest reference-distance cause. Neither is allowed to solve a weak page by merely adding stickers.

---

## 1. Two QA modes

### A. `PREPROD_SKELETON`

Use when the frame still contains placeholders, empty masks, transport rectangles, or has no production text/image fills.

A skeleton may temporarily contain equal rectangles and repeated radii. These findings are **warnings about what must not survive into the asset-first 60–80% state**, not proof that the final page already failed.

Required result in this mode:

- identify repeated-template risk;
- identify which page signatures are too similar;
- name the structural correction that must happen during asset placement;
- do not award a fake final reference-match score.

### B. `PRODUCTION_CANDIDATE`

Use once a page has meaningful title, image, copy, and editorial clusters.

At this stage fatal AI tells are real failures. A page cannot pass because it is technically aligned, valid Figma, or colorful.

---

## 2. Structural AI-Look Linter

Canonical implementation:

- `scripts/rurubu-v10/figma-ai-look-linter.js`
- config: `docs/rurubu-v10/rurubu-v10-ai-look-linter-config.json`

Run it against live Figma page `09_RURUBU_V10_A5_8P_PRODUCTION` (`2787:2`).

### Fatal tells in production mode

The following are structural fail conditions when visibly dominant in a production candidate:

1. `EQUAL_MODULE_GRID`
   - repeated same-size modules dominate a content region;
   - classic 2×2 / 3×N dashboard grammar.

2. `UNIFORM_CORNER_RADIUS`
   - one rounded-card radius dominates most information surfaces;
   - page begins to read as app cards rather than editorial clusters.

3. `CENTERED_EVERYTHING_TEXT`
   - almost all text uses centered alignment without an editorial reason.

4. `ADJACENT_PAGE_CLONE`
   - two pages share essentially the same normalized composition signature despite different page jobs.

5. `SAME_PHOTO_SYSTEM_EVERYWHERE`
   - same photo size/aspect/frame rhythm repeats across a page or adjacent pages.

6. `REFERENCE_OR_DUMMY_AS_PRODUCTION`
   - `REFERENCE_` or `DUMMY_` visual content is promoted as final production art.

7. `FAKE_GENERATED_TEXT`
   - generated gibberish/signage is treated as authoritative copy.

A fatal tell means: **repair structure before micro-polish**.

### Strong warnings

These are not automatically fatal, but must be reviewed:

- `WEAK_DOMINANT_GESTURE`
  - largest meaningful visual is not materially stronger than the next visual;
  - the 3-second reader cannot identify a first read.

- `NO_EDGE_TENSION`
  - all meaningful content floats politely inside a safe central grid;
  - no controlled crop, overlap, edge gesture, or bleed energy where the page role supports it.

- `ZERO_CONTROLLED_IMPERFECTION`
  - every meaningful shape is optically perfect, parallel, unrotated and evenly spaced;
  - use only when the page job genuinely calls for calm utility.

- `LOW_IMAGE_WEIGHT_VARIATION`
  - hero/support/micro relationship is weak.

- `MONOTONE_INFORMATION_WEIGHT`
  - all clusters carry equal visual weight.

- `TOO_MUCH_EMPTY_LUXURY_SPACE`
  - whitespace replaces useful editorial density rather than serving readability.

- `DECORATION_WITHOUT_JOB`
  - stickers/ornaments occupy holes but do not label, direct, frame, separate, explain, or create emotional emphasis.

- `BODY_COPY_SACRIFICED`
  - body/caption text becomes too small or low-contrast to preserve decoration.

---

## 3. Page Signature Similarity

The linter normalizes meaningful shape boxes by page width/height and compares page signatures.

Purpose: catch `same template, different content` before it becomes visually baked in.

Heuristic bands:

- `>= 85%` similarity: high-risk clone; structural divergence required unless two pages intentionally form one continuous spread.
- `70–84%`: review; compare page jobs and ensure hierarchy/crop/density peak differ.
- `55–69%`: informational warning only.
- `<55%`: no structural similarity concern by this heuristic.

In `PREPROD_SKELETON`, high similarity is expected evidence that placeholders must not dictate the final composition.

In `PRODUCTION_CANDIDATE`, `>=85%` between different page jobs should normally fail.

---

## 4. Reference Visual Diff

Closest reference mapping:

- P01 COVER → `2771:4`
- P02 PROFILE → `2771:2`
- P03 Q&A → `2771:2`
- P04 STORY → `2771:3` primary + `2771:2` secondary
- P05 TIMELINE + MEMORY → `2771:3`
- P06 MEMORY SPOTS + GALLERY → `2771:3`
- P07 1DAY + CAFE TABLE → `2771:3`
- P08 BACK COVER → `2771:4`

Do **not** literal-copy reference people, fake text, exact placements, protected identity elements, or AI artifacts. Compare editorial behavior only.

### Visual diff checkpoints

Compare current screenshot to closest reference at thumbnail and reading scale.

1. `FIRST_READ`
   - What is seen first in 3 seconds?
   - Is it unmistakably stronger than the second read?

2. `TITLE_SILHOUETTE`
   - Does the title have a recognizable shape from distance?
   - Is it more than default bold text in a rectangle?

3. `IMAGE_WEIGHT`
   - Is there a visible hero/support/micro hierarchy?
   - Are photo sizes/aspects/crops varied by role?

4. `COMPOSITION_ASYMMETRY`
   - Is the page globally asymmetrical while locally ordered?
   - Is it avoiding a web-card grid?

5. `EDITORIAL_CLUSTERS`
   - Do photo + label + caption / time + activity + photo / question + answer behave as meaningful units?
   - Or are they generic containers?

6. `USEFUL_DENSITY`
   - Are there several small but real reading destinations?
   - No invented filler facts.

7. `EDGE_TENSION`
   - Is there controlled edge/crop/overlap energy where appropriate?
   - Critical copy remains inside safe area.

8. `COLOR_JOBS`
   - 1 dominant + 1 support + 1 surprise accent;
   - body remains stable INK/PAPER or equivalent readable pair.

9. `CALM_ZONES`
   - Dense areas are balanced by intentional reading/rest zones;
   - not uniform full-page clutter.

10. `A5_READABILITY`
    - body, captions, labels, and Japanese line breaks survive actual-size review.

---

## 5. Region-based visual diagnosis

When the page still feels wrong, divide the page into a coarse 6×8 mental grid and diagnose **where visual weight differs**, not only which asset is missing.

Check:

- top-left / top-center / top-right title and supporting density;
- center-left / center / center-right hero and cluster mass;
- lower-left / lower-center / lower-right secondary information rhythm;
- edge activity on all four sides;
- large calm zone location;
- dominant color mass location.

Typical useful diagnosis:

> Reference has strong top-left title mass, central hero, and lower-right utility cluster. Current page spreads five equal modules across the center. Rebuild hierarchy before adding decoration.

Bad diagnosis:

> Needs more stickers.

---

## 6. Reading Path Map

Every production candidate must be explainable as:

`1 FIRST READ → 2 SECOND READ → 3 IMAGE / STORY → 4 USEFUL INFO → 5 MICRO DISCOVERY`

The five steps do not need to be physically linear, but a designer must be able to name them.

Fail if:

- all five points compete equally;
- the first read is ambiguous;
- a caption/label is visually detached from what it describes;
- the reader must hunt for where to continue.

---

## 7. Density Map + Calm Zone

Do not equate Rurubu density with filling every gap.

Target behavior, not a rigid percentage:

- one or two high-density editorial clusters;
- medium-density connective regions;
- at least one useful calm/reading zone;
- density peaks should move across adjacent pages.

A page with uniform density everywhere usually feels AI-collage-like.

---

## 8. Adjacent-page rhythm gate

Across neighboring pages, avoid repeating by default:

- same hero position;
- same title alignment;
- same dominant color;
- same photo count;
- same frame family;
- same density peak location;
- same overlap gesture.

The canonical page verbs remain:

- P01 `CROP + STACK + BURST`
- P02 `PAIR + LABEL + FACT`
- P03 `NUMBER + QUESTION + ANSWER`
- P04 `FLOW + MILESTONE + PHOTO`
- P05 `SEQUENCE + ANCHOR + INTERRUPTION`
- P06 `HERO + SATELLITES + DESTINATION`
- P07 `ROUTE + TIME + FOOD`
- P08 `RESOLVE + UTILITY + MESSAGE`

If adjacent pages read as the same verb, revise structure.

---

## 9. Blur / grayscale / silhouette tests

After the page has real visual content:

### Blur / thumbnail

At a size where body text cannot be read:

- first read should remain visible;
- hero should remain visible;
- page should not collapse into equal-strength rectangles.

### Grayscale

Remove hue mentally or through screenshot processing:

- hierarchy must still work;
- colored labels must not be the only semantic distinction;
- body contrast must remain legible.

### Silhouette

Treat images as tonal blocks and ignore words:

- the composition should still have a recognizable mass pattern;
- title / hero / supporting clusters should not become a uniform grid.

---

## 10. Reference Match Score integration

Use the canonical 100-point fingerprint score only in `PRODUCTION_CANDIDATE` mode:

- Hierarchy 20
- Composition / asymmetry 20
- Image behavior 15
- Editorial density 15
- Typography 15
- Color / contrast 10
- Texture / tactile character 5

Hard rules:

- fatal AI tell visible → FAIL regardless of numerical score;
- `<80` → do not micro-polish; make a structural correction first;
- `80–89` → credible, refine;
- `90+` → reference-level candidate, still requires A5/print QA.

Do not manufacture a flattering score for an empty skeleton.

---

## 11. Mandatory correction loop

After every meaningful page batch:

1. live-read Figma frame;
2. run structural linter;
3. capture screenshot;
4. select closest reference;
5. compare thumbnail + reading scale;
6. identify largest reference-distance cause;
7. fix **one structural cause** first;
8. rerun linter/diff;
9. only then adjust micro-spacing/decoration.

Priority correction order when a page is weak:

`hierarchy → crop/scale → image weight → composition → editorial cluster → title silhouette → density/calm → color job → decoration → micro-spacing`

Never reverse this by adding ornamental noise before hierarchy is fixed.

---

## 12. Required report fields

Every substantive V10 QA run reports:

- Figma frame ID / page job;
- QA mode (`PREPROD_SKELETON` or `PRODUCTION_CANDIDATE`);
- structural linter fatal tells;
- strong warnings;
- highest adjacent/page-signature similarities;
- closest reference node;
- reading path 1–5;
- largest reference-distance cause;
- structural correction made or next required correction;
- reference match score only if production candidate;
- actual-size readability result;
- LOW_RES / resolution warnings;
- mask/overflow warnings;
- semantic assets + Drive IDs actually placed.

A page is not improved merely because the linter warning count fell. Final authority remains the live screenshot compared against the reference quality floor and actual-size print/readability QA.
