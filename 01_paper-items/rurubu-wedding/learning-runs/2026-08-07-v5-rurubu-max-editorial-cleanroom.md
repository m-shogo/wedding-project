# V5 Rurubu MAX editorial clean-room prototype

Date: 2026-08-07
Status: `DISCOVERED → PROTOTYPED / CURRENT_NOT_CHANGED / USER_DIRECTION_ALIGNED`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer: `77:18`
Prototype: `374:2 / V5_OUTER_RURUBU_MAX_EDITORIAL_TEST_2026_08_07`

## Authorities read before action

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- `RURUBU-V5-ASSET-EVIDENCE-LEDGER.json`
- `RURUBU-MAGAZINE-EDITORIAL-DESIGN-KNOWLEDGE-BASE.md`
- `RURUBU-EDITORIAL-DESIGN-LESSONS-LOG.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- V6 current status, reference analysis, and asset queue

## New user direction

The desired target is not minimalist or merely clean. The direction is closer to authentic Japanese `るるぶ` travel-editorial density:

- visibly busy and exciting
- multiple entry points and micro-information
- photos, headings, rules, labels, issue markers and callouts can overlap or compete intentionally
- strong visual consistency underneath the apparent busyness
- no obligation to preserve the current V5 composition, hero placement, teaser grid or decorative language
- the desired state is `edited busyness`, not random clutter and not Web/UI cards

This direction supersedes any interpretation that subtraction itself is the primary aesthetic goal. Subtraction remains a QA method, not a visual destination.

## Visible problem

The Current outer cover and the earlier clean-room reduction prototype remained too orderly and sparse. They looked like a tidy wedding/travel booklet rather than a Japanese mass-market travel guide. The six lower cover teasers still behaved like a structured UI/index, and the cover lacked the dense hierarchy, secondary reading axes and controlled visual interruptions typical of Rurubu-style editorial design.

## Hypothesis

A materially different outer-cover concept can feel more authentic if it uses:

- a larger dominant hero image
- a strong coral framing field for the main promise
- a vertical side issue axis
- a yellow `保存版` issue marker
- a blue category label
- six supporting teasers with unequal geometry and color-coded rules rather than equal cards/circles
- additional native microcopy that creates scan paths
- the existing palette used as a system: coral = primary promise, blue = travel/navigation, yellow = issue/emphasis, aqua = supporting destination accent, navy = reading text

Expected improvement:
- stronger immediate `るるぶ` recognition
- more exciting cover density
- more varied reading paths
- better unity than random stickers because each accent color has a stable role

Possible regression:
- cover could become noisy without a clear hero
- strong coral field could compete with masthead or destination image
- microcopy may become too small at actual print size
- reused low-quality hero remains unsuitable for final V5 photo-role completion

Evidence needed before any adoption:
- whole-item screenshot comparison against Current
- reading-scale review of hierarchy and scan paths
- actual-size detail check for native Japanese text and microcopy
- structure audit for native text, fold guide, semantic roles and rollback preservation
- no promotion of hero asset state until the intended high-quality derivative passes the separate asset lifecycle

## Experiment 1 — failed coordinate assumption

A first write attempted to move deep nested nodes using coordinates as if they were top-level. The result would have been incorrect because `IMG_HERO` remained inside clipped `FRONT_COVER`, and teaser text remained inside a nested enhancement frame.

The initial Figma write also hit an unsupported `sendToBack()` call. That failed script was atomic and made no file changes.

Process lesson:
- for a material clean-room re-layout, first inspect parent coordinate systems
- reparent only the bounded nodes that need independent composition, then set explicit coordinates
- do not assume browser-like layer APIs such as `sendToBack()` exist in the Figma Plugin API runtime

## Experiment 2 — corrected clean-room prototype

Created:
- `374:2 / V5_OUTER_RURUBU_MAX_EDITORIAL_TEST_2026_08_07`

The prototype keeps Current `77:18` untouched and preserves V4 rollback.

Front-cover changes in the prototype include:
- hero resized/recomposed to `650 × 650` and reparented for independent placement
- legacy equal feature-number circles hidden in the prototype
- six cover-line texts redistributed into unequal groups
- new `MAX_ED_MAIN_HOOK_FIELD` coral promise field
- new `MAX_ED_TOP_BLUE_TAG` category label
- new `MAX_ED_SAVED_BURST` yellow issue marker
- new `MAX_ED_CORAL_SIDE_RAIL` vertical issue axis
- six unequal color-coded teaser rules
- new native microcopy for Yokohama/travel scan paths
- masthead and date kept as stable cover anchors

No Current node was promoted or replaced.

## Current visual result

Whole-item screenshot shows a materially denser front cover than Current:
- the hero is again dominant and visible
- the coral main promise creates a strong secondary focus
- the vertical coral rail, yellow issue marker and blue category label create additional Rurubu-like reading axes
- lower teaser content is no longer represented as six identical circular UI entries
- palette use is more systematic while the surface feels busier

The prototype is intentionally **not yet VERIFIED**. It still needs a dedicated front-cover page/detail review and likely another pass to make the busyness feel more organic and less block-composed. The back cover has not yet received the same clean-room density treatment.

## Asset truth

No photo-role ledger count changed.

Current ledger remains:
- active Current roles: `12`
- intended source applied: `2`
- photo-role pass: `1`
- role complete: `1`
- dominant role pass: `1 / 3`

The prototype currently uses the existing V5 hero only as layout evidence. It does not upgrade or validate `V5-01 / IMG_HERO`.

## Decision

`PROTOTYPED / KEEP FOR COMPARISON / DO NOT PROMOTE TO CURRENT YET`

The direction is accepted for further development because it aligns with the explicit user preference for a more authentic, busy-but-coherent Rurubu aesthetic. The exact geometry is not yet accepted.

## Next application

1. Push the front cover one step further toward controlled asymmetry: vary teaser scale, introduce one meaningful angled/overlapping callout, and reduce block-like alignment without losing the invisible grid.
2. Build a materially different back-cover treatment with stronger photo/article density rather than leaving it as the legacy calm composition.
3. Create a matching inside-spread clean-room concept using the same color-role system and `1 + 2 + micro` hierarchy.
4. Compare Current, previous minimal clean-room `367:2`, and Rurubu MAX `374:2` at whole-item, reading, and actual-size scales.
5. Keep dominant-photo asset repair running as a separate evidence track; do not confuse concept quality with photo-role completion.
