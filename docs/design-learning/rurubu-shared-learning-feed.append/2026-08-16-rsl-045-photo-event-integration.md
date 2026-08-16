# RSL-045 — Chronology milestones become more editorial when major text beats are spatially attached to photo anchors

Date: 2026-08-16
Source scope: Rurubu WEDDING V6
Source item: Story / chronology BE → BH
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The BE chronology had already removed most card/grid UI, but events 01–05 still occupied a central text field while the event photographs sat mainly as a separate lower strip. At whole-item scale the page still read partly as `timeline information + photo decoration` rather than a photo-led magazine story.

## Root-cause hypothesis

Removing cards is not sufficient when repeated facts and photographs remain spatially independent. For an editorial chronology, a few major milestones should share the same visual territory as their photographic anchors, while minor milestones can remain compact text bridges. This should make the reader follow editorial beats rather than scan a timeline UI.

## Bounded test

Rollback-safe BH duplicated BE and changed only the chronology page:

- 01 / 03 / 05 remained major milestones;
- 02 / 04 remained subordinate text beats;
- event 01 was paired with a larger waterfront photo;
- event 03 was paired with the small Yokohama photo;
- event 05 was paired with a wide dining/memory photo;
- the existing WEDDING terminal band remained the final endpoint;
- no new cards, shadows, gradients, generated decoration, or external image assets were introduced;
- all facts remained native text and all photos remained replaceable IMAGE roles.

A first pass enlarged the small Yokohama source to 250px width. Because its registered source width is 240px, the candidate was corrected to 238×148 before promotion. Visual improvement never overrides intrinsic-source QA.

## Expected improvement

- fewer detached information/photo zones;
- clearer major/minor chronology hierarchy;
- stronger travel-magazine reading rhythm at thumbnail scale;
- no loss of copy editability or photo replacement resilience.

## Regression risk

- photo enlargement beyond registered source dimensions;
- milestone text colliding with rotated photos;
- every event becoming a photo module again and recreating the original grid problem;
- decorative overlap making chronology order ambiguous.

## Three-scale evidence

### Whole-item / thumbnail

BE and BH compared at 500px: BH preferred. Major milestones and photographs read as the same sequence, and the detached bottom-photo-strip feeling is reduced.

### Reading scale

BH at 1200px: PASS. Event order 01→06 remains unambiguous and the existing feature hero still dominates the upper page.

### Actual size / detail

BH chronology `1451:21` at native 794×1123: PASS.

Structure QA:

- visible native text: 31
- visible replaceable IMAGE roles: 6
- absolute text/text collision: 0
- 18px text safe-area risks: 0
- event-03 small Yokohama photo: 238×148 against registered 240×220 source, PASS.

## Evidence

- Figma preferred: `1451:2 / PREFERRED / V6_INSIDE_BH_PHOTO_EVENT_INTEGRATED_CHRONOLOGY_2026_08_16`
- Figma chronology page: `1451:21`
- rollback: BE `1433:2` hidden
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`
- GitHub QA: `01_paper-items/rurubu-wedding/RURUBU-V6-T-BG-BH-PHOTO-EVENT-INTEGRATION-QA-2026-08-16.md`
- GitHub asset reconciliation: `01_paper-items/rurubu-wedding/RURUBU-V6-T-BG-BH-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

## What must remain Rurubu-specific

Do not transfer:

- the 01/03/05 selection itself;
- exact photograph roles, crops, colors, number sizes, rotations, or coordinates;
- the navy WEDDING endpoint treatment;
- Rurubu-like travel chronology art direction.

## Cross-item applicability hypothesis

For another Wedding item that has ordered factual information plus imagery, test whether major facts and image anchors can occupy the same editorial beat before adding cards or timeline diagrams. The transferable principle is spatial binding of meaning and imagery, not this chronology layout.

This remains a hypothesis outside Rurubu until independently reproduced.