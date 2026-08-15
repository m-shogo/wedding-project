# RURUBU WEDDING V6 — AF / AG Inside Editorial QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
GitHub main before this evidence write: `1d734c98b174ae7d5f0cace6f8ae93ec80b420d8`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

V6 inside preferred studies were advanced from AC/AD to:

- `1355:2 / PREFERRED / V6_INSIDE_AF_ASYMMETRIC_PROFILE_QA_2026_08_16`
- `1356:2 / PREFERRED / V6_INSIDE_AG_PHOTO_CLUSTER_CHRONOLOGY_2026_08_16`

Previous preferred frames are preserved hidden as comparison:

- `1343:2 / COMPARISON / V6_INSIDE_AC_PHOTO_LED_PROFILE_QA_2026_08_16`
- `1348:2 / COMPARISON / V6_INSIDE_AD_TRAVEL_MAG_CHRONOLOGY_2026_08_16`

Start Here `845:27` now reads:

`V5 FU/FX · V6 M + AF/AG INSIDE STUDIES · V7 HOLD`

V7 was not advanced.

## AF — Profile / Q&A

### Visible problem in AC

AC was structurally clean but the Q&A still read as a regular 3 × 2 web-like grid, and the profile page kept too much template-like separation between hero, profile rows and snapshots.

### Bounded redesign

AF remains fully rollback-safe and keeps all copy native and all photography replaceable.

Profile page:

- larger dominant profile/travel photo;
- three smaller replaceable photos overlap the lower hero edge at unequal positions/angles;
- profile facts remain native text in a compact right-side column;
- quote becomes a distinct second editorial anchor rather than another card.

Q&A page:

- six question groups are staggered rather than equally gridded;
- no new rounded cards/shadows/gradients were introduced;
- question/answer copy remains native text;
- Memories finishes the page with one dominant replaceable photo plus one overlapping support crop.

### Three-scale visual QA

- 500 px whole-spread thumbnail: PASS — dominant photos and section distinction survive reduction.
- 1200 px whole spread: PASS — reading path is hero → facts/snapshots and Q&A → Memories rather than equal modules.
- actual-size profile page `1355:3`, 794 × 1123: PASS.
- actual-size Q&A page `1355:27`, 794 × 1123: PASS.

### Structure QA

Profile `1355:3`:

- visible native text: 18
- visible replaceable IMAGE roles: 4
- text/text intersections: 0
- 18 px text safe-area risks: 0
- outside-page visible nodes: 0

Q&A `1355:27`:

- visible native text: 22
- visible replaceable IMAGE roles: 2
- text/text intersections: 0
- 18 px text safe-area risks: 0
- outside-page visible nodes: 0

Image hashes were preserved from already verified reusable dummy roles; the layout did not flatten photography or semantic copy.

## AG — Story / chronology

### Visible problem in AD

AD successfully removed the diagrammatic route rail, but the top photo group still read as a large image plus two detached support tiles, while the six chronology events remained slightly too evenly distributed for the target travel-magazine density.

### Bounded redesign

AG preserves the left story page and rebuilds the right chronology hierarchy:

- top feature hero expanded to a dominant 620 × 350 role;
- two support photos overlap the feature zone at unequal sizes and rotations;
- event photos use materially unequal size, x/y and rotation;
- native `01–06` anchors sit near photo corners instead of acting like diagram nodes;
- WEDDING remains the semantic endpoint with a larger final photo and separate native date/title/copy;
- no route rail or milestone-dot diagram was restored.

Screenshot review exposed text collisions around events 3/4/6. Those were repaired before promotion and then re-audited structurally.

### Three-scale visual QA

- 500 px whole-spread thumbnail: PASS — photo hierarchy survives and chronology still scans in order.
- 1200 px whole spread: PASS.
- actual-size timeline page `1356:14`, 794 × 1123: PASS after collision repair.

### Structure QA

Story `1356:3`:

- visible native text: 7
- visible replaceable IMAGE roles: 3
- text/text intersections: 0
- safe text risks: 0
- outside-page visible nodes: 0

Timeline `1356:14`:

- visible native text: 27
- visible replaceable IMAGE roles: 9
- text/text intersections after final repair: 0
- 18 px text safe-area risks: 0
- outside-page visible nodes: 0

## Generated section asset / transport readback

High-resolution Drive masters remain valid and were re-read:

- Profile v2: `RURUBU_V6_PROFILE_SECTION_ROLE_v2.png`, Drive `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`, `2,308,995` bytes.
- Q&A v2: `RURUBU_V6_QA_SECTION_ROLE_v2.png`, Drive `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`, `1,990,587` bytes.

The raw Drive PNGs are not the visual-quality problem. In this fresh runtime the official `upload_assets` submit path again failed at `mcp.figma.com` DNS resolution. A materially different Plugin-runtime `fetch(Drive URL) → createImage` attempt was also tested once but the runtime has no global `fetch` (`ReferenceError: fetch is not defined`). No repeated retries were made.

AH `1359:2` was created as a rollback-safe generated-Q&A support experiment but, because no quality-preserving binary asset could be placed, it was renamed `BLOCKED_TRANSPORT / V6_INSIDE_AH_GENERATED_QA_SUPPORTS_2026_08_16` and hidden. Transport failure was not counted as visual progress.

## Outer masthead subtraction

`1298:2 / V6_OUTER_N_ORIGINAL_TRAVEL_MAG_MASTHEAD_STUDY_2026_08_15` was freshly compared against outer M. N only added a weak faux-magazine masthead treatment without improving photo hierarchy or editorial density. It was renamed:

`REJECTED_VISUAL / V6_OUTER_N_FAUX_MASTHEAD_WEAK_2026_08_16`

and hidden. V6 outer M `1241:2` remains the current outer study. Future masthead work should use an original standalone generated/vector asset rather than rebuilding protected branding or keeping this weak faux treatment.

## Status

`AF/AG = VERIFIED_LOCAL / PREFERRED V6 INSIDE STUDIES / ROLLBACK_SAFE / NOT_PRINT_READY`.

This is meaningful dummy-design progress, not V6 completion. Real content, final imagery, generated fixed-decoration transport where useful, exact print template/preflight and physical proof remain separate gates.