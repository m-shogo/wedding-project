# ADD-04 受付サイン — QA

Status: `CURRENT / QA_CONTRACT_READY`
Authority: GitHub `main`
Date: 2026-08-02

## Current result

- specification completeness: `PASS`
- Drive folder existence: `PASS`
- raster necessity review: `PASS / NONE REQUIRED`
- live Figma visual QA: `NOT_RUN`
- print proof QA: `NOT_RUN`
- overall: `PREPARED_FOR_FIGMA / NOT_PRINT_READY`

## Pre-build checks

- [x] core pair is clearly defined
- [x] ADD-09 Guest Book scope is not duplicated
- [x] only confirmed facts are fixed
- [x] names and reception operation remain TBD
- [x] A5 primary size is declared provisional until vendor confirmation
- [x] raster generation is not forced

## Live Figma screenshot QA

Run separate screenshots for groom, bride and paired side-by-side view.

### Readability

- Japanese label is dominant and legible at 25% canvas zoom reference
- `新郎側受付` and `新婦側受付` cannot be confused by color alone
- English label remains secondary
- any optional surname is not more prominent than the side label
- no text clipping, widows or forced narrow glyph spacing

### Pair relationship

- pair looks related through typography, paper field and shared baseline
- composition is not a simple recolor duplicate
- groom and bride differ through route geometry and spacing, not gender clichés
- visual weights remain balanced when placed on the same reception table

### Print-object quality

- no Web UI card appearance
- no excessive rounded corners or drop shadows
- rules survive at actual A5 size
- safe area and trim are visible in QA overlay only
- provisional fields are visibly marked and excluded from final export

### Environment simulation

- inspect on light tablecloth and dark wood/table simulation
- inspect under warm indoor lighting approximation
- verify primary label from approximately 2 m
- check acrylic/wooden stand overlap and lower-edge occlusion

## Physical proof gate

Before `PRINT_READY`:

1. export with the exact vendor template;
2. print at 100%;
3. place both signs in the intended stands;
4. photograph paired signs from guest eye level and 2 m distance;
5. verify paper color, contrast, reflections and stability;
6. correct any stand-induced crop or glare;
7. archive proof photo in Drive.

## Reject conditions

- names or operational instructions invented before approval
- groom/bride distinction depends only on pale color differences
- Guest Book sign duplicated from ADD-09
- equal app-like cards with generic icons
- decorative travel elements compete with the Japanese label
- final export contains guides, TBD labels or placeholder copy
