# V5 Rurubu-authentic MAX EDITORIAL clean-room experiment

Date: 2026-08-07
Scope: Rurubu WEDDING V5 only
Status: `DISCOVERED → PROTOTYPED / CURRENT_UNCHANGED / FURTHER_QA_REQUIRED`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `01_paper-items/rurubu-wedding/RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `01_paper-items/rurubu-wedding/RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `01_paper-items/rurubu-wedding/RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `01_paper-items/rurubu-wedding/RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `01_paper-items/rurubu-wedding/POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- V6 current status, Hawaii reference analysis, research matrix, and asset queue

## User feedback / visible problem

The live V5 Current was judged too clean and still visually weak. The desired direction is closer to a real Japanese `るるぶ` travel guide: intentionally dense, lively, colorful, asymmetric and rewarding to inspect, while still feeling like one editorial system rather than random decoration.

The existing V5 was therefore no longer treated as the compositional starting point. Its verified content, semantic roles, native text, assets/provenance, fold guide, and rollback history remain useful; its hero placement, card geometry, spacing, teaser arrangement, decorative density, and color distribution do not receive sunk-cost protection.

## Hypothesis

A clean-room composition using controlled abundance can outperform both the legacy-derived Current and the earlier over-minimal clean-room direction when it combines:

- one dominant photograph or story per page;
- large / medium / small information scales;
- unequal image ratios and intentional overlap;
- semantic stickers, tape, PICK UP / BEST SHOT devices, category numbers and route markers;
- a small number of repeated accent colors with stable jobs;
- an invisible grid under deliberately irregular placement;
- native Japanese text and editable Figma structure.

The goal is **edited clutter**, not minimalism and not random clutter.

## Expected improvement

- stronger immediate `るるぶ` / Japanese travel-guide recognition;
- more discovery and visual energy at whole-item and reading scales;
- less resemblance to a clean corporate/profile booklet;
- richer wedding-as-travel storytelling;
- stronger distinction between primary, supporting and micro information even with higher density.

## Possible regression

- overlap may reduce legibility;
- stickers/tape may become scrapbook-like rather than editorial;
- too many colors may lose system coherence;
- microcopy may become too small at actual print size;
- clean-room movement may break nested local coordinate systems;
- re-enabled decoration may accidentally duplicate meaning.

## Evidence required before adoption

- Current versus clean-room whole-item screenshots;
- page/reading-scale screenshots;
- actual-size detail screenshots for teaser text, body copy, captions and micro labels;
- structure audit for native text, semantic nodes, fold guide and image fills;
- no false generated-person identity;
- no new photo-role completion claim without the full asset lifecycle;
- Current and V4 rollback preserved;
- editorial scorecard with no critical criterion below the project threshold.

## Outer clean-room prototype

Frame:
- `368:2 / V5_RURUBU_AUTHENTIC_MAX_EDITORIAL_CLEANROOM_2026_08_07`

Current preserved:
- `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

Main structural experiments:

### Front cover

- enlarged the hero to a near-full-page photographic field;
- kept the masthead/date as the stable top silhouette;
- used a strong yellow main-promise field over the hero;
- introduced semantic `PICK UP!` and `BEST SHOT` devices;
- restored a circular travel snap with tape as a distinct secondary story;
- rebuilt the six cover lines into unequal density bands instead of six equal UI-like rows;
- kept a thin folio strip at the bottom.

### Back cover

- promoted the verified travel flat-lay into a scrapbook/editorial lead-image treatment;
- enlarged and slightly overlapped the two Friends & Family images;
- restored low-opacity tape only as an attachment cue;
- retained the journey route as a lower narrative lane;
- preserved native content and semantic roles.

## Failure caught during outer prototype

### Failure

The first front-cover pass used spread-level x coordinates on nodes that are children of the nested `FRONT_COVER` / `RURUBU_MAGAZINE_ENHANCEMENT_V2` frames. Those coordinates are local to their parent, so the front-cover elements moved outside the visible page and the right page appeared almost blank.

### Root cause

The script assumed all duplicated descendants shared the top-level spread coordinate system.

### Response

- Current was untouched because the experiment was isolated in `368:2`;
- the failed result was screenshot-detected immediately;
- a structure inspection recorded each node's parent and absolute/local coordinates;
- the front-cover nodes were corrected using local 0–793-ish coordinates;
- the same incorrect coordinate method will not be reused blindly.

### Lesson candidate

For editorial spread automation, inspect parent hierarchy before large compositional moves. A top-level duplicate does not imply descendants use top-level coordinates.

Status: `PROTOTYPED / FAILURE_CAUGHT / METHOD_CORRECTED`.

## Outer visual result

After coordinate correction and a second density pass, the outer prototype is visibly more Rurubu-like than Current:

- the hero is more dominant;
- the cover contains multiple editorial rewards without six identical cards;
- accents cluster around semantic roles rather than being uniformly distributed;
- the back-cover lead image and Friends grouping have more scrapbook/editorial energy.

However, the lower cover-line area still needs typography, collision and actual-size detail QA. The outer prototype is therefore **not promoted to Current yet**.

## Inside clean-room prototype

Frame:
- `371:2 / V5_RURUBU_AUTHENTIC_MAX_EDITORIAL_INSIDE_CLEANROOM_2026_08_07`

Current preserved:
- `77:290 / 02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`

Main structural experiments:

### Profile / Q&A page

- increased and varied profile-photo scale and rotation;
- restored small travel-icon punctuation near the header;
- made question 01 the dominant interview block and questions 02/03 compact secondary stories;
- used pink, blue and yellow rules as a controlled editorial system;
- used one tape-style `ふたりの共通点` label plus direct colored microtype;
- retained a direct-type Travel Note but added a small semantic closing stamp.

### History / Memory page

- enlarged the history photograph;
- restored the yellow chronology kicker because it now has a visible navigation role in the denser grammar;
- tightened the timeline and history-photo relationship;
- rebuilt Memory Spots as a denser lead-image + two small-story cluster;
- restored a blue `PICK UP!` route/map cue and a map pin;
- kept a thin bottom folio.

## Failure caught during inside prototype

The first bride-profile arrangement produced overlap between `IA_PROFILE_B_NAME`, `IA_PROFILE_B_META`, `IA_PROFILE_B_DETAIL` and the vertical blue rule.

A node audit identified the complete profile-B family. The prototype was corrected by moving the rule and separating detail → name → metadata vertically, then enabling the existing `BEST VIEW` sticker as a bounded editorial label. Current remained unchanged.

Status: `PROTOTYPED / COLLISION_CAUGHT_AND_CORRECTED`.

## Inside visual result

The corrected inside prototype is materially denser and closer to the intended travel-guide personality than Current, especially on the history/memory page. It preserves a clear dominant photograph while adding route, kicker, map and micro-story detail.

It is not yet VERIFIED because:

- the history source itself is still an open V5 photo role;
- actual-size microcopy QA has not passed;
- Japanese line-break/long-copy stress QA has not been rerun on the new geometry;
- the prototype still requires an unbiased Current-vs-clean-room scorecard.

## Asset-ledger impact

None.

The authoritative V5 counts remain:
- active Current photo roles: `12`
- intended source applied: `2`
- photo-role pass: `1`
- role complete: `1`
- dominant-role pass: `1 / 3`

No clean-room IMAGE fill, duplicate, decoration, screenshot or layout movement is counted as photo-role progress.

## V6 impact

None. V6 production remains blocked until V5 reaches the verified `RURUBU_V5_DUMMY_PHOTO_DESIGN_QA_PASS` gate.

V6 research reinforces that authentic travel-guide density is not produced by equal cards or generic tropical decoration; it comes from a dominant image, unequal hierarchy, useful numbers/maps/routes/captions, controlled color and dense-but-edited detail.

## Decision

- **Adopt the clean-room direction as the active comparison direction.**
- **Do not promote `368:2` or `371:2` to Current yet.**
- **Reject the assumption that minimal/subtractive styling is automatically the quality target for Rurubu WEDDING.**
- Keep subtraction as a QA technique, but judge it against the intended dense travel-magazine voice.
- Semantic stickers/tape/badges may be reintroduced when they improve navigation, category, recommendation, annotation, date/issue identity or scrapbook/travel-guide storytelling.

## Next application

1. run high-resolution actual-size typography and collision QA on `368:2` and `371:2`;
2. repair the weakest cover-line cluster and any small-copy failure;
3. compare Current versus MAX EDITORIAL using the same 10-part editorial rubric;
4. keep the stronger structural direction without merging weak legacy geometry back in;
5. in parallel, continue the V5 history and cover-hero asset lifecycles;
6. do not advance V6 production until the V5 photo/design gate is verified.
